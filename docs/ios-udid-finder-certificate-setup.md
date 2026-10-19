# iOS UDID Finder certificate setup

This runbook explains how to finish the optional certificate-backed configuration for the `/tools/ios-udid-finder/` flow.

The tool works without extra configuration, but if you want:

- a public "Download trust certificate" button on the page
- a signed `.mobileconfig` response instead of a plain profile payload

then fill in the environment variables described below.

## What the page expects

The implementation uses these variables:

- `PUBLIC_IOS_UDID_CERTIFICATE_LINK`
- `IOS_UDID_PROFILE_SIGNING_CERT_PEM`
- `IOS_UDID_PROFILE_SIGNING_KEY_PEM`
- `IOS_UDID_PROFILE_SIGNING_CHAIN_PEM` (optional)

`PUBLIC_IOS_UDID_CERTIFICATE_LINK` is only used for the public button shown on the page.

The `IOS_UDID_PROFILE_SIGNING_*` values are server-only and are used to sign the downloaded `.mobileconfig`.

## Option 1: use an existing TLS certificate

If you already terminate HTTPS with a certificate you control and can export:

1. Export the certificate in PEM format.
2. Export the matching private key in PEM format.
3. If your provider gives you an intermediate certificate chain, export that in PEM format too.
4. Publish the public certificate file at a stable HTTPS URL.
5. Set:
   - `PUBLIC_IOS_UDID_CERTIFICATE_LINK` to the public certificate URL
   - `IOS_UDID_PROFILE_SIGNING_CERT_PEM` to the PEM certificate contents
   - `IOS_UDID_PROFILE_SIGNING_KEY_PEM` to the PEM private key contents
   - `IOS_UDID_PROFILE_SIGNING_CHAIN_PEM` to the concatenated intermediate certificates, if needed

## Option 2: export from Let’s Encrypt or another host

If your host manages certificates for you:

1. Find the PEM certificate file used by your HTTPS endpoint.
2. Find the matching PEM private key.
3. Copy the full chain PEM if one exists.
4. Upload the public certificate to a stable HTTPS location if you want the page button.
5. Set the environment variables with those PEM values.

## Example `.env`

```dotenv
PUBLIC_IOS_UDID_CERTIFICATE_LINK="https://example.com/certs/udid-finder.crt"
IOS_UDID_PROFILE_SIGNING_CERT_PEM="-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
IOS_UDID_PROFILE_SIGNING_KEY_PEM="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
IOS_UDID_PROFILE_SIGNING_CHAIN_PEM="-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
```

Keep the PEM values on the server only. Do not expose them in public client code and do not commit them to Git.

## How to verify the page

1. Start the site locally with the environment variables set.
2. Open `/tools/ios-udid-finder/`.
3. Confirm the page shows the "Download trust certificate" button if `PUBLIC_IOS_UDID_CERTIFICATE_LINK` is present.
4. Download the profile from `/api/tools/ios-udid-finder/profile`.
5. Confirm the response header is:
   - `Content-Type: application/x-apple-aspen-config`
6. Install the profile on a real iPhone or iPad. The device must be able to reach the host serving `/api/tools/ios-udid-finder/profile` and the optional `PUBLIC_IOS_UDID_CERTIFICATE_LINK`, so use a LAN-accessible hostname or IP address, or a tunnel such as ngrok or localhost.run, when testing from a local machine.
7. Confirm the device lands on `/tools/ios-udid-finder/result/` with the UDID and device details rendered.

## Notes

- The callback endpoint extracts the plist payload from the raw iOS response body server-side.
- The result page is intentionally `noindex` because it can contain device identifiers.
- If you want to hard-wire a specific certificate download link, send me that URL and I can drop it into the environment config for deployment.
