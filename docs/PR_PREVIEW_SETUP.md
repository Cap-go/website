# Pull Request Preview Setup

This repository includes GitHub Actions workflows that automatically deploy pull request previews to Cloudflare Pages, allowing you to preview changes before merging.

## How It Works

### Workflows

1. **`deploy.yml`** - Main deployment workflow that handles both production and PR previews
2. **`pr-preview.yml`** - Dedicated PR preview workflow with enhanced features

### Preview URL Structure

For each pull request, a unique preview URL is generated:
- Format: `https://pr-{PR_NUMBER}-{SANITIZED_BRANCH}.capgo-website.pages.dev`
- Example: `https://pr-123-feature-new-ui.capgo-website.pages.dev`

### Branch Name Sanitization

Branch names are automatically sanitized for URL compatibility:
- Special characters are replaced with hyphens
- Uppercase letters are converted to lowercase
- Multiple consecutive hyphens are collapsed
- Leading/trailing hyphens are removed
- Length is limited to fit Cloudflare's subdomain requirements

## Setup Requirements

### Cloudflare Configuration

You need the following secrets configured in your GitHub repository:

```bash
CLOUDFLARE_API_TOKEN      # Cloudflare API token with Pages:Edit permissions
CLOUDFLARE_ACCOUNT_ID     # Your Cloudflare account ID
```

### Cloudflare Pages Project

1. Create a Cloudflare Pages project named `capgo-website`
2. Connect it to your GitHub repository
3. Configure build settings:
   - Build command: `bun run build`
   - Build output directory: `dist`
   - Root directory: `/` (repository root)

### Environment Variables

The following environment variables are used during build:

```bash
BEARER_TOKEN                      # Your API bearer token
ORAMA_CLOUD_API_KEY              # Orama search API key
ORAMA_CLOUD_ENDPOINT             # Orama search endpoint
CLOUDFLARE_TURNSTILE_SITE_KEY    # Cloudflare Turnstile site key
```

## Features

### Automatic Deployment

- **PR Creation**: When a PR is opened, a preview is automatically deployed
- **PR Updates**: When commits are pushed to a PR, the preview is updated
- **PR Closure**: When a PR is closed/merged, cleanup is initiated

### Smart Comments

The workflow automatically creates and updates PR comments with:
- 🌐 Direct link to preview URL
- 🔧 Preview deployment ID
- 📝 PR number and commit information
- ⏰ Last updated timestamp
- ✅ Deployment status

### Concurrency Control

- Only one deployment per PR runs at a time
- New deployments cancel previous ones for the same PR
- Prevents resource conflicts and ensures latest changes are deployed

### Branch Protection

Previews are only created for PRs targeting the `main` branch, ensuring security and resource efficiency.

## Usage

### For Contributors

1. **Create a Pull Request**: Open a PR against the `main` branch
2. **Wait for Deployment**: The GitHub Action will automatically build and deploy
3. **Review Preview**: Click the preview URL in the automated comment
4. **Update Changes**: Push new commits to update the preview automatically

### For Maintainers

1. **Review PRs**: Use preview URLs to review changes in a live environment
2. **Test Features**: Verify functionality before merging
3. **Share Previews**: Share preview URLs with stakeholders for feedback

## Workflow Details

### Deploy Workflow (`deploy.yml`)

- Triggers on push to `main` and all PRs
- Builds the Astro site using Bun
- Deploys to Cloudflare Pages with branch-specific URLs
- Updates PR comments with deployment information

### PR Preview Workflow (`pr-preview.yml`)

- More specialized workflow specifically for PR previews
- Enhanced error handling and logging
- Automatic cleanup when PRs are closed
- Detailed preview information in comments

## Troubleshooting

### Common Issues

1. **Preview URL not working**
   - Check if build completed successfully
   - Verify Cloudflare API tokens are correct
   - Ensure project name matches in workflow

2. **Build failures**
   - Check if all required environment variables are set
   - Verify dependencies are properly installed
   - Review build logs in GitHub Actions

3. **Missing preview comments**
   - Ensure GitHub token has sufficient permissions
   - Check if workflow completed successfully
   - Verify PR is targeting the correct branch

### Debugging

To debug issues:
1. Check GitHub Actions logs
2. Verify Cloudflare Pages dashboard
3. Test build locally with same environment variables
4. Ensure all secrets are properly configured

## Security Considerations

- Preview deployments use the same environment variables as production
- Only PRs from trusted contributors should have access to sensitive data
- Consider using a separate set of API keys for preview environments
- Regular rotation of API tokens is recommended

## Customization

### Changing Preview URL Format

Edit the preview name generation in the workflow:

```bash
preview_name="pr-${pr_number}-${sanitized_branch}"
```

### Adding Additional Build Steps

Add steps before the "Deploy to Cloudflare Pages" step:

```yaml
- name: Run tests
  run: bun test

- name: Lint code
  run: bun run lint
```

### Custom Comment Format

Modify the comment body in the GitHub script section to customize the preview comment format.