# Leave Supabase Phase 1: Website register API handoff

Date: 2026-09-23

Repo: Cap-go/website (client done in this PR)

Blocker repo: Cap-go/capgo.app (endpoint not deployed yet)

## Status

The website register page no longer calls `supabase.auth.signUp` or the `is_not_deleted` PostgREST RPC.

It now POSTs to:

```http
POST https://api.capgo.app/auth/register
Content-Type: application/json
```

As of 2026-09-23, that route returns `404 Not found` on production. Signup will show a friendly error until capgo.app ships the handler.

## Request body

```json
{
  "email": "user@example.com",
  "password": "secret",
  "first_name": "Jane",
  "last_name": "Doe",
  "captcha_token": "optional-turnstile-token",
  "registration_device_type": "desktop",
  "registration_os": "macOS",
  "registration_browser": "Safari"
}
```

Fields mirror the previous GoTrue signup metadata from `register.astro`.

## Success response (200)

```json
{
  "user": {
    "id": "uuid"
  },
  "session": {
    "access_token": "jwt",
    "refresh_token": "jwt"
  }
}
```

The website redirects to:

```text
https://console.capgo.app/login/?access_token=...&refresh_token=...&to=/app
```

## Error responses

Use JSON shaped like existing Capgo API errors:

```json
{
  "error": "account_deleted",
  "message": "Account is in error, please contact support at support@capgo.app"
}
```

Suggested codes:

| HTTP | error code | When |
| --- | --- | --- |
| 400 | `invalid_request` | Validation failed (email, password, names) |
| 403 | `account_deleted` | Email belongs to a deleted account (`is_not_deleted` check) |
| 409 | `email_exists` | Email already registered |
| 422 | `captcha_failed` | Turnstile token missing or invalid |
| 500 | `registration_failed` | Unexpected server error |

Human-readable `message` values are shown directly in the signup toast.

## Server-side work in capgo.app

1. Add `POST /auth/register` on the Hono/CF API (no API key required).
2. Move `is_not_deleted` check server-side (stop exposing it to the website via PostgREST).
3. Create the user with the same behavior as today's GoTrue signup:
   - Store `first_name`, `last_name`, and registration device metadata in user metadata.
   - Honor Turnstile when `CLOUDFLARE_TURNSTILE_SECRET_KEY` is set.
   - Return access and refresh tokens for the console handoff.
4. Keep bcrypt password hashing compatible with Phase 2 better-auth import.

Phase 2 (better-auth) is out of scope for this website PR.

## Verification

After deploying capgo.app:

1. Open https://capgo.app/register/
2. Submit the form with a new email.
3. Confirm redirect to console with tokens and `/app` destination.
4. Confirm deleted-account and duplicate-email errors match the table above.
