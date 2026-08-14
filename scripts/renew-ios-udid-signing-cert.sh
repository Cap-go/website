#!/usr/bin/env bash
set -euo pipefail

# Issues or renews the Let's Encrypt cert used to sign the iOS UDID mobileconfig.
# Never contacts ACME unless the current public cert is missing or expires within
# UDID_CERT_RENEW_DAYS (default 30).

DOMAIN="${UDID_CERT_DOMAIN:-capgo.app}"
EMAIL="${UDID_CERT_EMAIL:-martin@capgo.app}"
RENEW_DAYS="${UDID_CERT_RENEW_DAYS:-30}"
WORKER_NAME="${UDID_CERT_WORKER_NAME:-capgo-website}"
LEGO_VERSION="${UDID_CERT_LEGO_VERSION:-4.35.2}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
COMMAND="${1:-check}"

CERT_SECRET_NAME="IOS_UDID_PROFILE_SIGNING_CERT_PEM"
KEY_SECRET_NAME="IOS_UDID_PROFILE_SIGNING_KEY_PEM"
CHAIN_SECRET_NAME="IOS_UDID_PROFILE_SIGNING_CHAIN_PEM"

write_pem() {
  local value="$1"
  local dest="$2"
  printf '%s' "$value" | sed 's/\\n/\n/g' | tr -d '\r' | sed -e '$a\' >"$dest"
}

cert_expiry() {
  local cert_file="$1"
  openssl x509 -in "$cert_file" -noout -enddate 2>/dev/null | sed 's/^notAfter=//'
}

cert_is_fresh() {
  local pem="${IOS_UDID_PROFILE_SIGNING_CERT_PEM:-}"
  if [[ -z "${pem//[[:space:]]/}" ]]; then
    echo "No existing UDID signing cert in GitHub secrets."
    return 1
  fi

  local tmp
  tmp="$(mktemp)"
  write_pem "$pem" "$tmp"
  if ! openssl x509 -in "$tmp" -noout -checkend "$((RENEW_DAYS * 86400))" >/dev/null 2>&1; then
    echo "UDID signing cert missing, invalid, or expiring within ${RENEW_DAYS} days ($(cert_expiry "$tmp" || echo unknown))."
    rm -f "$tmp"
    return 1
  fi

  echo "UDID signing cert is valid until $(cert_expiry "$tmp"). Skipping Let's Encrypt."
  rm -f "$tmp"
  return 0
}

set_output() {
  local key="$1"
  local value="$2"
  if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
    echo "${key}=${value}" >>"$GITHUB_OUTPUT"
  fi
}

check_cert() {
  if cert_is_fresh; then
    set_output renew false
    return 0
  fi
  set_output renew true
  return 0
}

install_lego() {
  local dest="$1"
  local arch
  case "$(uname -m)" in
    x86_64) arch=amd64 ;;
    aarch64 | arm64) arch=arm64 ;;
    *)
      echo "Unsupported architecture: $(uname -m)" >&2
      exit 1
      ;;
  esac

  local url="https://github.com/go-acme/lego/releases/download/v${LEGO_VERSION}/lego_v${LEGO_VERSION}_linux_${arch}.tar.gz"
  curl --proto '=https' --tlsv1.2 -fsSL "$url" | tar -xz -C "$dest" lego
}

restore_existing_material() {
  local lego_path="$1"
  local cert_dir="${lego_path}/certificates"
  mkdir -p "$cert_dir"

  if [[ -z "${IOS_UDID_PROFILE_SIGNING_CERT_PEM:-}" || -z "${IOS_UDID_PROFILE_SIGNING_KEY_PEM:-}" ]]; then
    return 0
  fi

  write_pem "$IOS_UDID_PROFILE_SIGNING_CERT_PEM" "${cert_dir}/${DOMAIN}.crt"
  write_pem "$IOS_UDID_PROFILE_SIGNING_KEY_PEM" "${cert_dir}/${DOMAIN}.key"
  if [[ -n "${IOS_UDID_PROFILE_SIGNING_CHAIN_PEM:-}" ]]; then
    write_pem "$IOS_UDID_PROFILE_SIGNING_CHAIN_PEM" "${cert_dir}/${DOMAIN}.issuer.crt"
  fi
}

issue_or_renew() {
  if [[ -z "${CLOUDFLARE_DNS_API_TOKEN:-}" ]]; then
    echo "CLOUDFLARE_DNS_API_TOKEN is required for DNS-01 (Zone.DNS Edit on capgo.app)." >&2
    exit 1
  fi

  local work
  work="$(mktemp -d)"
  trap 'rm -rf "$work"' EXIT

  install_lego "$work"
  restore_existing_material "$work"

  local lego_bin="${work}/lego"
  local cert_file="${work}/certificates/${DOMAIN}.crt"
  local key_file="${work}/certificates/${DOMAIN}.key"
  local common_args=(
    --accept-tos
    --email "$EMAIL"
    --dns cloudflare
    --domains "$DOMAIN"
    --key-type rsa
    --path "$work"
  )

  if [[ -f "$cert_file" && -f "$key_file" ]]; then
    echo "Renewing ${DOMAIN} via DNS-01 (threshold ${RENEW_DAYS} days)."
    "$lego_bin" "${common_args[@]}" renew --days "$RENEW_DAYS" --no-random-sleep
  else
    echo "Creating ${DOMAIN} via DNS-01."
    "$lego_bin" "${common_args[@]}" run
  fi

  if [[ ! -f "$cert_file" || ! -f "$key_file" ]]; then
    echo "lego did not write ${DOMAIN} certificate files." >&2
    exit 1
  fi

  local leaf="${work}/leaf.pem"
  openssl x509 -in "$cert_file" -out "$leaf"
  local chain="${work}/certificates/${DOMAIN}.issuer.crt"
  if [[ ! -s "$chain" ]]; then
    : >"$chain"
  fi

  push_github_secret "$CERT_SECRET_NAME" "$leaf"
  push_github_secret "$KEY_SECRET_NAME" "$key_file"
  push_github_secret "$CHAIN_SECRET_NAME" "$chain"

  push_worker_secret "$CERT_SECRET_NAME" "$leaf"
  push_worker_secret "$KEY_SECRET_NAME" "$key_file"
  push_worker_secret "$CHAIN_SECRET_NAME" "$chain"

  echo "UDID signing cert updated. Valid until $(cert_expiry "$leaf")."
}

push_github_secret() {
  local name="$1"
  local file="$2"
  if [[ -z "${PERSONAL_ACCESS_TOKEN:-${GH_TOKEN:-}}" ]]; then
    echo "PERSONAL_ACCESS_TOKEN is required to persist ${name}." >&2
    exit 1
  fi
  GH_TOKEN="${PERSONAL_ACCESS_TOKEN:-$GH_TOKEN}" gh secret set "$name" --repo "${GITHUB_REPOSITORY:?}" <"$file"
}

push_worker_secret() {
  local name="$1"
  local file="$2"
  if [[ -z "${CLOUDFLARE_API_TOKEN:-}" || -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
    echo "CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID are required to update worker secret ${name}." >&2
    exit 1
  fi
  (
    cd "${ROOT}/apps/web"
    bunx wrangler secret put "$name" --name "$WORKER_NAME" <"$file"
  )
}

case "$COMMAND" in
  check)
    check_cert
    ;;
  issue)
    if cert_is_fresh; then
      set_output renew false
      exit 0
    fi
    issue_or_renew
    ;;
  *)
    echo "Usage: $0 [check|issue]" >&2
    exit 1
    ;;
esac
