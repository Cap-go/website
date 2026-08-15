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
  local key="${IOS_UDID_PROFILE_SIGNING_KEY_PEM:-}"
  if [[ -z "${pem//[[:space:]]/}" || -z "${key//[[:space:]]/}" ]]; then
    echo "No existing UDID signing cert/key in GitHub secrets."
    return 1
  fi

  local cert_file key_file
  cert_file="$(mktemp)"
  key_file="$(mktemp)"
  write_pem "$pem" "$cert_file"
  write_pem "$key" "$key_file"

  if ! openssl x509 -in "$cert_file" -noout -checkend "$((RENEW_DAYS * 86400))" >/dev/null 2>&1; then
    echo "UDID signing cert missing, invalid, or expiring within ${RENEW_DAYS} days ($(cert_expiry "$cert_file" || echo unknown))."
    rm -f "$cert_file" "$key_file"
    return 1
  fi

  local cert_modulus key_modulus
  cert_modulus="$(openssl x509 -noout -modulus -in "$cert_file" 2>/dev/null || true)"
  key_modulus="$(openssl rsa -noout -modulus -in "$key_file" 2>/dev/null || true)"
  if [[ -z "$cert_modulus" || -z "$key_modulus" || "$cert_modulus" != "$key_modulus" ]]; then
    echo "UDID signing cert and private key do not match."
    rm -f "$cert_file" "$key_file"
    return 1
  fi

  echo "UDID signing cert is valid until $(cert_expiry "$cert_file"). Skipping Let's Encrypt."
  rm -f "$cert_file" "$key_file"
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

strip() {
  local value="${1-}"
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  printf '%s' "$value"
}

require_issue_credentials() {
  CLOUDFLARE_DNS_API_TOKEN="$(strip "${CLOUDFLARE_DNS_API_TOKEN:-}")"
  CLOUDFLARE_API_TOKEN="$(strip "${CLOUDFLARE_API_TOKEN:-}")"
  CLOUDFLARE_ACCOUNT_ID="$(strip "${CLOUDFLARE_ACCOUNT_ID:-}")"
  PERSONAL_ACCESS_TOKEN="$(strip "${PERSONAL_ACCESS_TOKEN:-}")"
  GH_TOKEN="$(strip "${GH_TOKEN:-}")"
  if [[ -z "$PERSONAL_ACCESS_TOKEN" ]]; then
    PERSONAL_ACCESS_TOKEN="$GH_TOKEN"
  fi
  # Lego reads CF_DNS_API_TOKEN or CLOUDFLARE_DNS_API_TOKEN; export both.
  CF_DNS_API_TOKEN="$CLOUDFLARE_DNS_API_TOKEN"
  export CLOUDFLARE_DNS_API_TOKEN CF_DNS_API_TOKEN CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID PERSONAL_ACCESS_TOKEN GH_TOKEN

  if [[ -z "${CLOUDFLARE_DNS_API_TOKEN}" ]]; then
    echo "CLOUDFLARE_DNS_API_TOKEN is required for DNS-01 (Zone.Zone:Read and Zone.DNS:Edit on ${DOMAIN})." >&2
    exit 1
  fi
  if [[ -z "${CLOUDFLARE_API_TOKEN}" || -z "${CLOUDFLARE_ACCOUNT_ID}" ]]; then
    echo "CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID are required to update Worker secrets." >&2
    exit 1
  fi
  if [[ -z "$PERSONAL_ACCESS_TOKEN" ]]; then
    echo "PERSONAL_ACCESS_TOKEN is required to persist GitHub secrets after a successful Worker update." >&2
    exit 1
  fi
}

dns_token_hint() {
  echo "Create a Cloudflare API token with Zone.Zone:Read and Zone.DNS:Edit on ${DOMAIN}, then set GitHub secret CLOUDFLARE_DNS_API_TOKEN. The Worker deploy token cannot create _acme-challenge TXT records."
}

verify_cloudflare_dns() {
  local body code
  body="$(mktemp)"
  code="$(curl --proto '=https' --tlsv1.2 -sS -o "$body" -w '%{http_code}' \
    -H "Authorization: Bearer ${CLOUDFLARE_DNS_API_TOKEN}" \
    "https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}&per_page=1" || true)"

  if ! HTTP_CODE="$code" BODY_FILE="$body" DOMAIN="$DOMAIN" HINT="$(dns_token_hint)" python3 <<'PY'
import json
import os
import sys

code = os.environ["HTTP_CODE"]
domain = os.environ["DOMAIN"]
hint = os.environ["HINT"]
try:
    with open(os.environ["BODY_FILE"], encoding="utf-8") as fh:
        data = json.load(fh)
except Exception:
    data = {}
errors = data.get("errors") or []
err_txt = "; ".join(
    f"{item.get('code')}: {item.get('message')}" for item in errors if isinstance(item, dict)
) or "no Cloudflare error body"
if code != "200":
    print(f"Cloudflare zone lookup for {domain} failed: HTTP {code} ({err_txt}). {hint}", file=sys.stderr)
    sys.exit(1)
if not (data.get("result") or []):
    print(f"Cloudflare token cannot see zone {domain}. Scope it to that zone. {hint}", file=sys.stderr)
    sys.exit(1)
print(f"Cloudflare DNS token can read zone {domain}.")
PY
  then
    rm -f "$body"
    exit 1
  fi
  rm -f "$body"
}

issue_or_renew() {
  require_issue_credentials
  verify_cloudflare_dns

  local work
  work="$(mktemp -d)"
  # EXIT runs after locals are unset; expand the path now so `set -u` cannot trip.
  trap 'rm -rf -- '"$(printf '%q' "$work")" EXIT

  install_lego "$work"

  local lego_bin="${work}/lego"
  local cert_file="${work}/certificates/${DOMAIN}.crt"
  local key_file="${work}/certificates/${DOMAIN}.key"
  local common_args=(
    --accept-tos
    --email "$EMAIL"
    --dns cloudflare
    --domains "$DOMAIN"
    --key-type rsa2048
    --path "$work"
  )

  echo "Creating ${DOMAIN} via DNS-01."
  if ! "$lego_bin" "${common_args[@]}" run; then
    echo "Let's Encrypt DNS-01 failed. If Cloudflare returned 403/10000, the token lacks Zone.DNS:Edit on ${DOMAIN}." >&2
    dns_token_hint >&2
    exit 1
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

  push_worker_secret "$CERT_SECRET_NAME" "$leaf"
  push_worker_secret "$KEY_SECRET_NAME" "$key_file"
  push_worker_secret "$CHAIN_SECRET_NAME" "$chain"

  push_github_secret "$CERT_SECRET_NAME" "$leaf"
  push_github_secret "$KEY_SECRET_NAME" "$key_file"
  push_github_secret "$CHAIN_SECRET_NAME" "$chain"

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
