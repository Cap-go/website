---
title: Managing Credentials
description: Save and manage build credentials locally for iOS and Android builds
sidebar:
  order: 7
---

import { Steps, Aside } from '@astrojs/starlight/components';

Manage your iOS and Android build credentials locally for convenient cloud builds.

## Overview

Capgo CLI stores your build credentials **on your machine** — never on Capgo's servers. By default they live in one **global** file, `~/.capgo-credentials/credentials.json`, shared across all your projects. Pass `--local` to keep them **per-project** in `.capgo-credentials.json` instead. When you run a build, the saved credentials are used automatically and sent securely to Capgo, then deleted after the build completes.

<Aside type="tip" title="Need Help Getting Credentials?">
If you don't have your certificates and credentials yet, check these comprehensive guides:

**iOS:**
- [How to Get iOS Certificates](/docs/builder/ios/#how-to-get-ios-certificates-and-provisioning-profiles) - Step-by-step guide
- [iOS Certificates Guide](/docs/builder/ios/) - Detailed step-by-step tutorial
- [Blog: Automatic iOS Builds](https://capgo.app/blog/automatic-capacitor-ios-build-github-action/) - Complete CI/CD setup

**Android:**
- [Creating a Keystore](/docs/builder/android/#creating-a-keystore) - Step-by-step guide
- [Android Certificates Guide](/docs/builder/android/) - Detailed step-by-step tutorial
- [Blog: Automatic Android Builds](https://capgo.app/blog/automatic-capacitor-android-build-github-action/) - Complete CI/CD setup
</Aside>

<Aside type="caution" title="Security Guarantee">
**Your credentials are NEVER stored permanently on Capgo servers:**
- ✅ Used ONLY during the active build process
- ✅ Automatically deleted after build completion
- ✅ Apps are sent directly to App Store/Play Store - we store NOTHING
- ✅ Transmitted securely over HTTPS
</Aside>

## Commands

### Manage Credentials Interactively

The quickest way to work with your saved credentials is the interactive manager. It opens a TUI (the same one `build init` uses) where you can browse what's stored, see what's configured per app and platform, export a CI/CD-ready `.env` file, or delete a platform's credentials:

```bash
bunx @capgo/cli@latest build credentials manage
```

| Option | Description |
|--------|-------------|
| `--appId <appId>` | App to manage (prompts you to pick if omitted) |
| `--platform <ios\|android>` | Platform to manage (prompts if omitted) |
| `--local` | Use the per-project `.capgo-credentials.json` instead of the global file |

Prefer one-shot, scriptable commands? Use the individual commands below.

### Save Credentials

Store your build credentials locally for automatic use:

```bash
bunx @capgo/cli@latest build credentials save --platform <ios|android> [options]
```

### Update Credentials

Partially update existing credentials without re-providing everything:

```bash
bunx @capgo/cli@latest build credentials update --platform <ios|android> [options]
```

The `update` command uses **additive merge** for provisioning profiles — new profiles are merged with existing ones. To replace the entire provisioning map instead, add `--overwrite-ios-provisioning-map`.

Example — add an extension profile to existing credentials:

```bash
bunx @capgo/cli@latest build credentials update \
  --platform ios \
  --ios-provisioning-profile "com.example.app.widget=./widget_profile.mobileprovision"
```

The update command accepts the same options as `save` but all are optional — only the fields you provide are updated.

### List Credentials

View currently saved credentials (passwords are masked):

```bash
bunx @capgo/cli@latest build credentials list

# List credentials for a specific app
bunx @capgo/cli@latest build credentials list --appId com.example.app
```

### Clear Credentials

Remove saved credentials from your local machine:

```bash
# Clear all credentials
bunx @capgo/cli@latest build credentials clear

# Clear credentials for a specific app + platform
bunx @capgo/cli@latest build credentials clear --appId com.example.app --platform ios
```

### Migrate Credentials

Convert legacy single-profile format to the new multi-target format:

```bash
bunx @capgo/cli@latest build credentials migrate --platform ios
```

The migrate command detects old `BUILD_PROVISION_PROFILE_BASE64` credentials, converts them to `CAPGO_IOS_PROVISIONING_MAP`, and removes the legacy keys. See [Migration from Single Profile](/docs/builder/ios/#migration-from-single-profile) for details.

## Saving iOS Credentials

<Aside type="note">
**Don't have iOS certificates yet?** See the [iOS Builds guide](/docs/builder/ios/#how-to-get-ios-certificates-and-provisioning-profiles) for instructions on creating certificates and provisioning profiles.
</Aside>

### Complete Example

```bash
bunx @capgo/cli@latest build credentials save \
  --platform ios \
  --certificate ./cert.p12 \
  --p12-password "YourP12Password" \
  --ios-provisioning-profile "com.example.app=./profile.mobileprovision" \
  --apple-key ./AuthKey_ABC1234567.p8 \
  --apple-key-id "ABC1234567" \
  --apple-issuer-id "00000000-0000-0000-0000-000000000000" \
  --apple-team-id "TEAM123456"
```

### iOS Options

| Option | Description | Required |
|--------|-------------|----------|
| `--certificate <path>` | Path to .p12 certificate file | Yes (release) |
| `--p12-password <password>` | Password for the .p12 certificate | Yes (release) |
| `--ios-provisioning-profile <mapping>` | Provisioning profile mapping (`bundleId=path`). Repeatable for multi-target apps. If only one profile and no bundleId prefix, CLI auto-infers from the profile. | Yes (release) |
| `--apple-key <path>` | Path to App Store Connect API .p8 key | See note¹ |
| `--apple-key-id <id>` | App Store Connect API Key ID | See note¹ |
| `--apple-issuer-id <id>` | App Store Connect API Issuer ID (UUID) | See note¹ |
| `--apple-team-id <id>` | App Store Connect Team ID | Yes |
| `--apple-id <email>` | Apple ID email for app-specific password upload (alternative to the API key) | See note² |
| `--apple-app-specific-password <password>` | App-specific password (`xxxx-xxxx-xxxx-xxxx`) | See note² |
| `--apple-app-id <id>` | Numeric App Store Connect app ID (e.g. `1234567890`) | See note² |
| `--ios-distribution <mode>` | Distribution mode: `app_store` (default) or `ad_hoc` | No |
| `--output-upload` | Enable a time-limited Capgo download link for the build artifact | No (default: `false`) |
| `--output-retention <seconds>` | How long to keep build outputs (e.g. `3600s`) | No (default: `3600s`) |
| `--skip-build-number-bump` | Skip automatic build-number increment | No |

<Aside type="note" title="¹ App Store Connect API Key Requirements">
- **`app_store` mode** (default): All three API key options are **required** unless you pass `--output-upload` or `--skip-build-number-bump` (which bypass the need for API-driven submission).
- **`ad_hoc` mode**: These options are **not required** — no App Store submission takes place. See [Ad-Hoc Distribution Mode](/docs/builder/ios/#ad-hoc-distribution-mode) for details.
</Aside>

<Aside type="caution" title="² App-specific password (not recommended)">
**This method is discouraged and advised against.** It exists only as a compatibility path for teams migrating from Ionic Appflow. Prefer an App Store Connect API key (`.p8`), which is the recommended, more capable, and more secure option for CI/CD. If you must use it, all three options (`--apple-id`, `--apple-app-specific-password`, and `--apple-app-id`) are required together. The numeric `--apple-app-id` (App Store Connect → your app → App Information → Apple ID) lets the upload run without an interactive 2FA prompt; with this method the build number falls back to a timestamp because App Store Connect is not queried.
</Aside>

### What Gets Stored

When you save iOS credentials, the CLI:
1. Reads the certificate and provisioning profile files
2. Converts them to base64 encoding
3. Saves them to `~/.capgo-credentials/credentials.json` (or `.capgo-credentials.json` with `--local`)
4. Stores passwords and IDs as plain text (local files only)

The stored file structure:
```json
{
  "ios": {
    "BUILD_CERTIFICATE_BASE64": "...",
    "CAPGO_IOS_PROVISIONING_MAP": "{\"com.example.app\":{\"profile\":\"...\",\"name\":\"match AppStore com.example.app\"}}",
    "APPLE_KEY_CONTENT": "...",
    "P12_PASSWORD": "...",
    "APPLE_KEY_ID": "ABC1234567",
    "APPLE_ISSUER_ID": "...",
    "APP_STORE_CONNECT_TEAM_ID": "TEAM123456",
    "CAPGO_IOS_DISTRIBUTION": "app_store"
  }
}
```

## Saving Android Credentials

<Aside type="note">
**Don't have a keystore yet?** See the [Android Builds guide](/docs/builder/android/#creating-a-keystore) for instructions on creating a keystore and setting up Play Store credentials.
</Aside>

### Complete Example

```bash
bunx @capgo/cli@latest build credentials save \
  --platform android \
  --keystore ./release.keystore \
  --keystore-alias "my-key-alias" \
  --keystore-key-password "KeyPassword123" \
  --keystore-store-password "StorePassword123" \
  --play-config ./play-store-service-account.json
```

### Android Options

| Option | Description | Required |
|--------|-------------|----------|
| `--keystore <path>` | Path to .keystore or .jks file | Yes (release) |
| `--keystore-alias <alias>` | Key alias in the keystore | Yes (release) |
| `--keystore-key-password <password>` | Password for the key alias | Yes (release) |
| `--keystore-store-password <password>` | Password for the keystore | Yes (release) |
| `--play-config <path>` | Path to Play Store service account JSON | Yes (submission) |

### What Gets Stored

When you save Android credentials, the CLI:
1. Reads the keystore and service account JSON files
2. Converts them to base64 encoding
3. Saves them to `~/.capgo-credentials/credentials.json` (or `.capgo-credentials.json` with `--local`)
4. Stores passwords and alias as plain text (local files only)

The stored file structure:
```json
{
  "android": {
    "ANDROID_KEYSTORE_FILE": "...",
    "PLAY_CONFIG_JSON": "...",
    "KEYSTORE_KEY_ALIAS": "my-key-alias",
    "KEYSTORE_KEY_PASSWORD": "...",
    "KEYSTORE_STORE_PASSWORD": "..."
  }
}
```

## Using Saved Credentials

Once you've saved credentials, they're automatically used when you build:

```bash
# Credentials automatically loaded from ~/.capgo-credentials/credentials.json
bunx @capgo/cli@latest build request com.example.app --platform ios
```

You can also override saved credentials using environment variables:

```bash
# Environment variables take precedence over saved credentials
BUILD_CERTIFICATE_BASE64="..." \
P12_PASSWORD="different-password" \
bunx @capgo/cli@latest build request com.example.app --platform ios
```

**Precedence order:**
1. Environment variables (highest priority)
2. Saved credentials (`~/.capgo-credentials/credentials.json`, or local `.capgo-credentials.json`)
3. No credentials (lowest priority)

## Viewing Saved Credentials

List what credentials you have saved:

```bash
bunx @capgo/cli@latest build credentials list
```

Example output:
```
📋 Saved Build Credentials:

iOS Credentials:
  ✓ Certificate (base64)
  ✓ Provisioning Map (JSON)
  ✓ Apple Key Content (base64)
  ✓ P12 Password: ********
  ✓ Apple Key ID: ABC1234567
  ✓ Apple Issuer ID: 00000000-0000-0000-0000-000000000000
  ✓ Team ID: TEAM123456

Android Credentials:
  ✓ Keystore (base64)
  ✓ Play Store Config (base64)
  ✓ Keystore Alias: my-key-alias
  ✓ Key Password: ********
  ✓ Store Password: ********

Location: ~/.capgo-credentials/credentials.json

🔒 These credentials are stored locally on your machine only.
   When building, they are sent to Capgo but NEVER stored there.
   They are auto-deleted after build completion.
```

## Security Best Practices

### Local Storage Security

1. **File Permissions**
   ```bash
   # Global credentials directory + file
   chmod 700 ~/.capgo-credentials
   chmod 600 ~/.capgo-credentials/credentials.json
   # Local (per-project) credentials, if you use --local
   chmod 600 .capgo-credentials.json
   ```

2. **Never Commit Credentials**
   ```bash
   # Ignore the per-project credentials file (used with --local)
   echo ".capgo-credentials.json" >> .gitignore
   ```
   The global file lives in your home directory, outside the repo.

3. **Separate Credentials**
   - Use different credentials for local development vs CI/CD
   - Rotate credentials regularly
   - Don't share credentials between team members

### CI/CD Usage

For CI/CD environments, **prefer environment variables** over saved credentials.

#### Export a ready-to-use `.env` (recommended)

Instead of base64-encoding each credential file by hand (see [below](#preparing-base64-values)), let `build credentials manage` generate the file for you:

```bash
bunx @capgo/cli@latest build credentials manage
# pick your app → choose "Export to .env"
```

It writes a `.env.capgo.<appId>.<platform>` file (permissions `0600`) containing every saved credential as an environment variable — each line is one secret to add to your CI/CD provider. Both platforms are combined by default; add `--platform ios` or `--platform android` to scope it to one.

<Aside type="caution">
The exported file holds your signing secrets — add it to `.gitignore` and never commit it.
</Aside>

#### Complete Environment Variables Reference

The CLI reads the following environment variables for credentials:

**iOS Credentials:**

| Variable | Description | Format | Required |
|----------|-------------|--------|----------|
| `BUILD_CERTIFICATE_BASE64` | P12/PKCS12 certificate for code signing | Base64 | Yes (release) |
| `CAPGO_IOS_PROVISIONING_MAP` | JSON map of bundle IDs to provisioning profile data | JSON string | Yes (release) |
| `P12_PASSWORD` | Password for the P12 certificate | Plain text | Optional |
| `APPLE_KEY_ID` | App Store Connect API Key ID | String (e.g., "ABC1234567") | See note¹ |
| `APPLE_ISSUER_ID` | App Store Connect API Issuer ID | UUID string | See note¹ |
| `APPLE_KEY_CONTENT` | App Store Connect API key (.p8 file content) | Base64 | See note¹ |
| `APP_STORE_CONNECT_TEAM_ID` | Apple Developer Team ID | String (e.g., "XXXXXXXXXX") | Yes |
| `CAPGO_IOS_DISTRIBUTION` | Distribution mode: `app_store` (default) or `ad_hoc` | String | No |

**Android Credentials:**

| Variable | Description | Format | Required |
|----------|-------------|--------|----------|
| `ANDROID_KEYSTORE_FILE` | Keystore file for signing APK/AAB | Base64 | Yes (release) |
| `KEYSTORE_KEY_ALIAS` | Key alias within the keystore | String | Yes (release) |
| `KEYSTORE_KEY_PASSWORD` | Password for the key alias | Plain text | Yes* |
| `KEYSTORE_STORE_PASSWORD` | Password for the keystore file | Plain text | Yes* |
| `PLAY_CONFIG_JSON` | Google Play service account JSON | Base64 | Yes (submission) |

*If only one password is provided, it will be used for both `KEYSTORE_KEY_PASSWORD` and `KEYSTORE_STORE_PASSWORD`.

#### GitHub Actions Example

```yaml
# .github/workflows/build.yml
name: Cloud Build

on:
  push:
    branches: [main]

jobs:
  build-ios:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bunx @capgo/cli@latest build request com.example.app --platform ios
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
          BUILD_CERTIFICATE_BASE64: ${{ secrets.BUILD_CERTIFICATE_BASE64 }}
          CAPGO_IOS_PROVISIONING_MAP: ${{ secrets.CAPGO_IOS_PROVISIONING_MAP }}
          P12_PASSWORD: ${{ secrets.P12_PASSWORD }}
          APPLE_KEY_ID: ${{ secrets.APPLE_KEY_ID }}
          APPLE_ISSUER_ID: ${{ secrets.APPLE_ISSUER_ID }}
          APPLE_KEY_CONTENT: ${{ secrets.APPLE_KEY_CONTENT }}
          APP_STORE_CONNECT_TEAM_ID: ${{ secrets.APP_STORE_CONNECT_TEAM_ID }}

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bunx @capgo/cli@latest build request com.example.app --platform android
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
```

#### Preparing Base64 Values

To convert your credential files to base64 for CI/CD secrets:

```bash
# iOS Certificate (.p12)
base64 -i certificate.p12 | tr -d '\n' > certificate_base64.txt

# iOS Provisioning Profiles — use the CLI to generate CAPGO_IOS_PROVISIONING_MAP:
bunx @capgo/cli@latest build credentials save --platform ios \
  --ios-provisioning-profile "com.example.app=./profile.mobileprovision" \
  # ... other options
# Then copy CAPGO_IOS_PROVISIONING_MAP from ~/.capgo-credentials/credentials.json to your CI secrets

# iOS App Store Connect Key (.p8)
base64 -i AuthKey_XXXXXX.p8 | tr -d '\n' > apple_key_base64.txt

# Android Keystore (.keystore or .jks)
base64 -i release.keystore | tr -d '\n' > keystore_base64.txt

# Google Play Service Account JSON
base64 -i play-store-service-account.json | tr -d '\n' > play_config_base64.txt
```

<Aside type="tip">
The `tr -d '\n'` removes newlines to create a single-line base64 string, which is easier to store as a CI/CD secret.
</Aside>

#### Why Environment Variables Are More Secure

This approach is more secure because:
- Secrets are managed by your CI/CD platform
- No credential files on runners
- Easy rotation and access control
- Audit trails for secret usage

### Credential Rotation

Regularly rotate your credentials:

1. **iOS**: Generate new certificates and API keys yearly
2. **Android**: Change keystore passwords annually
3. **After team changes**: Rotate when team members leave

Update saved credentials:
```bash
# Re-run save command with new credentials
bunx @capgo/cli@latest build credentials save --platform ios --certificate ./new-cert.p12 ...
```

## Troubleshooting

### "No credentials found"

If the build says no credentials were found:

1. **Check if credentials are saved**:
   ```bash
   bunx @capgo/cli@latest build credentials list
   ```

2. **Save credentials if missing**:
   ```bash
   bunx @capgo/cli@latest build credentials save --platform ios ...
   ```

3. **Verify the credentials file exists**:
   ```bash
   ls -la ~/.capgo-credentials/credentials.json   # global
   ls -la .capgo-credentials.json                 # local (--local)
   ```

### "Permission denied" when reading credentials

Fix file permissions:

```bash
chmod 600 ~/.capgo-credentials/credentials.json   # global
chmod 600 .capgo-credentials.json                 # local
```

### Credentials not being used

Check that the correct platform is specified:

```bash
# Make sure --platform matches saved credentials
bunx @capgo/cli@latest build request com.example.app --platform ios  # Uses ios credentials
bunx @capgo/cli@latest build request com.example.app --platform android  # Uses android credentials
```

### Clear and re-save credentials

If credentials seem corrupted:

```bash
# Clear all credentials
bunx @capgo/cli@latest build credentials clear

# Save again
bunx @capgo/cli@latest build credentials save --platform ios ...
```

## Migration from Environment Variables

If you're currently using environment variables, you can migrate to saved credentials:

<Steps>

1. **Extract your current environment variables**
   ```bash
   echo $BUILD_CERTIFICATE_BASE64  # Verify they exist
   ```

2. **Decode base64 files back to original files** (if needed)
   ```bash
   echo "$BUILD_CERTIFICATE_BASE64" | base64 -d > cert.p12
   echo "$BUILD_PROVISION_PROFILE_BASE64" | base64 -d > profile.mobileprovision
   ```

3. **Save using the CLI**
   ```bash
   bunx @capgo/cli@latest build credentials save \
     --platform ios \
     --certificate ./cert.p12 \
     --ios-provisioning-profile ./profile.mobileprovision \
     --p12-password "$P12_PASSWORD" \
     --apple-key-id "$APPLE_KEY_ID" \
     --apple-issuer-id "$APPLE_ISSUER_ID" \
     --apple-team-id "$APP_STORE_CONNECT_TEAM_ID"
   ```

   If you have existing credentials saved in the old format (single `BUILD_PROVISION_PROFILE_BASE64`), run:
   ```bash
   bunx @capgo/cli@latest build credentials migrate --platform ios
   ```
   This converts the legacy single-profile to a `CAPGO_IOS_PROVISIONING_MAP` and removes the old `BUILD_PROVISION_PROFILE_BASE64` and `APPLE_PROFILE_NAME` keys.

4. **Test the build**
   ```bash
   bunx @capgo/cli@latest build request com.example.app --platform ios
   ```

5. **Remove environment variables** (optional)
   ```bash
   unset BUILD_CERTIFICATE_BASE64 BUILD_PROVISION_PROFILE_BASE64
   ```

</Steps>

## File Location

Credentials are stored in a single JSON file:
- **Global** (default): `~/.capgo-credentials/credentials.json` — shared across all your projects
- **Local** (with `--local`): `.capgo-credentials.json` in your project root — overrides the global file for that project

The file is created automatically the first time you save credentials. Add **`.capgo-credentials.json`** to your `.gitignore` so per-project credentials are never committed.

## Next Steps

- [Getting Started](/docs/builder/getting-started/) - Create your first build
- [iOS Builds](/docs/builder/ios/) - iOS-specific build configuration
- [Android Builds](/docs/builder/android/) - Android-specific build configuration
- [Troubleshooting](/docs/builder/troubleshooting/) - Common issues and solutions

## Need Help?

- 📚 [Troubleshooting guide](/docs/builder/troubleshooting/)
- 💬 [Discord community](https://discord.com/invite/VnYRvBfgA6)
- 📧 Email: support@capgo.app

## Keep going from Managing Credentials

If you are using **Managing Credentials** to plan CI/CD automation, connect it with [Capgo CI/CD](/ci_cd/) for the product workflow in Capgo CI/CD, [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds, [Capgo Integrations](/integrations/) for the product workflow in Capgo Integrations, [CI/CD Integration](/docs/getting-started/cicd-integration/) for the implementation detail in CI/CD Integration, and [GitHub Actions Integration](/docs/live-updates/integrations/github-actions/) for the implementation detail in GitHub Actions Integration.
