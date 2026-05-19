title: Self-Hosting Capgo description: A complete guide to self-hosting Capgo with MinIO (S3), edge functions, and the Capacitor updater plugin.
Self-Hosting Capgo
This guide covers everything you need to run a fully self-hosted Capgo instance — including S3-compatible storage with MinIO, edge functions, and connecting your iOS/Android app to your own server instead of capgo.app.

Overview
A self-hosted Capgo stack consists of four main services:

Service	Purpose	Default port
Supabase (Postgres + Auth)	Database, authentication, row-level security	5432 / 54321
Supabase Storage or MinIO	Bundle file storage (S3-compatible)	9000
Edge Functions (Deno)	Update, stats, and channel API endpoints	54321
Capgo Web App (optional)	Dashboard UI	3000
Prerequisites
Docker and Docker Compose v2+
A domain name (or local IP) reachable by your mobile devices
Node.js ≥ 18 and the Capgo CLI (npm i -g @capgo/cli)
Step 1 — Clone and Configure Capgo
bash
git clone https://github.com/Cap-go/capgo.git
cd capgo
cp .env.example .env
Open .env and set at minimum:

env
# Your public domain or IP — must be reachable by devices
CAPGO_URL=https://capgo.yourdomain.com

# Supabase keys (generated in Step 2)
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
Step 2 — Start Supabase Locally
Capgo uses Supabase for its database and auth.

bash
# Install the Supabase CLI
npm install -g supabase

# Start the local Supabase stack
supabase start
After startup, the CLI prints your anon key and service_role key. Copy these into your .env.

Run migrations:

bash
supabase db push
Step 3 — Self-Host S3 Storage with MinIO
By default Capgo uses Supabase Storage. For production self-hosting, MinIO is the recommended S3-compatible replacement.

3a — Start MinIO with Docker Compose
Add this service to your docker-compose.yml:

yaml
services:
  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"   # S3 API
      - "9001:9001"   # Web console
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin   # Change in production!
    volumes:
      - minio_data:/data

volumes:
  minio_data:
bash
docker compose up -d minio
3b — Create the Capgo bucket
Open the MinIO console at http://localhost:9001, log in, and create a bucket named capgo.

Or use the MinIO CLI (mc):

bash
mc alias set local http://localhost:9000 minioadmin minioadmin
mc mb local/capgo
mc anonymous set download local/capgo   # allow public bundle downloads
3c — Point Capgo at MinIO
Add these variables to your .env:

env
S3_ENDPOINT=http://localhost:9000
S3_REGION=us-east-1          # MinIO ignores this but it must be set
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=capgo
S3_SSL=false                 # set to true if MinIO is behind HTTPS
Step 4 — Start Edge Functions
Capgo's update, stats, and channel logic runs as Supabase Edge Functions (Deno).

bash
supabase functions serve --env-file .env
This starts all functions locally on port 54321/functions/v1/. For production, deploy them:

bash
supabase functions deploy
What services are unavailable in self-hosted mode?

The following Capgo Cloud features are not available when self-hosting:

Managed CI/CD cloud builds (capgo build)
Capgo's global CDN for bundle delivery (you serve from your own MinIO/S3)
Dashboard usage analytics beyond what Supabase provides
Email notifications (you must configure your own SMTP — see Step 5)
Step 5 — Configure Email (SMTP)
Self-hosted Supabase does not send emails by default. Configure SMTP in supabase/config.toml:

toml
[auth.email]
enable_signup = true

[auth.smtp]
enabled = true
host = "smtp.yourdomain.com"
port = 587
user = "no-reply@yourdomain.com"
pass = "your-smtp-password"
admin_email = "admin@yourdomain.com"
sender_name = "Capgo"
Restart Supabase after changing this file:

bash
supabase stop && supabase start
Step 6 — Connect Your iOS/Android App
Install the Capacitor updater plugin if you haven't already:

bash
npm install @capgo/capacitor-updater
npx cap sync
Configure the plugin
In your capacitor.config.ts (or capacitor.config.json), point the plugin at your self-hosted instance:

typescript
// capacitor.config.ts
import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "My App",
  plugins: {
    CapacitorUpdater: {
      // Replace with your self-hosted Capgo URL
      updateUrl: "https://capgo.yourdomain.com/functions/v1/updates",
      statsUrl: "https://capgo.yourdomain.com/functions/v1/stats",
      channelUrl: "https://capgo.yourdomain.com/functions/v1/channel_self",
      // Your Capgo API key from the self-hosted dashboard
      defaultChannel: "production",
    },
  },
}

export default config
Tip: If you are running MinIO and Supabase on a local network (e.g. for development), use your machine's LAN IP rather than localhost — simulators and physical devices cannot reach localhost on your host machine.

Initialize the plugin in your app
In your app's main entry file (e.g. src/main.ts):

typescript
import { CapacitorUpdater } from "@capgo/capacitor-updater"

// Call this as early as possible so Capgo knows the app launched successfully
CapacitorUpdater.notifyAppReady()
Step 7 — Upload Your First Bundle
bash
# Log in using your self-hosted API key
npx @capgo/cli login YOUR_API_KEY --apikey YOUR_API_KEY \
  --host https://capgo.yourdomain.com

# Build your web assets
npm run build

# Upload the bundle
npx @capgo/cli bundle upload \
  --channel production \
  --host https://capgo.yourdomain.com
Step 8 — Verify Everything Works
Run the doctor command against your self-hosted instance:

bash
npx @capgo/cli doctor --host https://capgo.yourdomain.com
A healthy output shows all endpoints reachable, the bundle uploaded, and the channel active.

On your device or simulator, open the app and check the Supabase logs:

bash
supabase logs --follow
You should see a request hit the updates edge function within a few seconds of the app launching.

Troubleshooting
Bundle downloads fail / 403 errors from MinIO Make sure the capgo bucket policy allows anonymous downloads:

bash
mc anonymous set download local/capgo
Edge functions return 500 Check that all environment variables in .env are set and that Supabase can reach MinIO on the S3_ENDPOINT you configured. Run supabase functions serve --debug for verbose logs.

Device never receives updates Verify updateUrl in capacitor.config.ts uses your server's publicly reachable address (not localhost). Also confirm notifyAppReady() is called on every launch.

Emails not sending Double-check your SMTP credentials in supabase/config.toml and ensure port 587 is open on your mail server.

Summary
Step	What you did
1	Cloned Capgo and set environment variables
2	Started Supabase and ran migrations
3	Replaced Supabase Storage with self-hosted MinIO
4	Started edge functions (update / stats / channel APIs)
5	Configured SMTP for auth emails
6	Pointed the Capacitor updater plugin at your server
7	Uploaded your first bundle via the CLI
8	Verified the stack with capgo doctor
Your self-hosted Capgo instance is now fully operational. For further configuration options see the Plugin Configuration reference and the Self-Hosting auto-update guide.

