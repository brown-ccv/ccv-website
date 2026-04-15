# CCV Website

This is the website for the Center of Computation and Visualization at Brown University.

## Getting Started

## Environment Variables

Create an env.local in your project root:

```text
NEXT_PUBLIC_MEILISEARCH_HOST=http://127.0.0.1:7700
MEILISEARCH_MASTER_KEY=myMasterKey123
NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY=myMasterKey123
```

This configuration is for local development. The master key is used to build and
upload the search index, while the search key is used by the frontend to query the
Meilisearch instance. It is okay for the master key and the search key to be the
same random value locally.

In production, these values will be overridden by secrets stored in Github.

### Install Dependencies

```bash
npm install
```

Meilisearch

```bash
# For macOS
brew install meilisearch
```

Or download the binary directly from
the [Meilisearch releases page](https://www.meilisearch.com/docs/learn/getting_started/installation).

### Authenticate with Google Cloud

This project interacts with Google Cloud services (e.g., Google Cloud Secret
Manager). To allow your local development environment to access these services,
we
use [Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/application-default-credentials).
ADC enables your application to automatically find credentials without
requiring hardcoded keys.

You'll need the gcloud-cli (Google Cloud CLI) installed. If you don't have it,
you can install it. For macOS/Linux users, Homebrew is a convenient option:

```bash
# For macOS
# https://formulae.brew.sh/cask/gcloud-cli
brew install gcloud-cli
```

Once `gcloud-cli` is installed, log in to set up your Application
Default Credentials for your user account:

```bash
gcloud auth application-default login
```

> [!IMPORTANT]
> Important Note on Service Accounts: While gcloud auth application-default
> login sets up user credentials for ADC, in production environments (like
> Firebase App Hosting), a dedicated service account is typically used for
> authentication. This ensures your application has only the necessary
> permissions and improves security. Your local setup emulates this
> access pattern.

### Build

Before running the development server, it's recommended to build the project. This
compiles the Next.js application for production and can help catch configuration
errors or issues early.

This step also copies images from the content folder into the public directory.
You don't need to run this command every time you develop locally, but if you
make changes to images in the content folder, you'll want to rebuild.

```bash
npm run build
```

### Run the Development Server

#### Testing Search Locally with Meilisearch

In a separate terminal, run:

```bash
# From the project root, remove old Meilisearch data
rm -rf -- ./data.ms
# Load environment variables and start Meilisearch
export $(cat .env.local | xargs) && meilisearch --master-key="$MEILISEARCH_MASTER_KEY"
```

> [!IMPORTANT]
> Replace `MEILISEARCH_MASTER_KEY` with the actual master key value from your
> `.env.local` file. This command starts a local Meilisearch instance with
> the specified master key, allowing you to test search functionality
> during development. This does not affect the production Meilisearch instance,
> which is hosted separately on Google Cloud Run.
> Keep this terminal running while developing!

In your **main** terminal:

```bash
# Build search index from MDX files
npm run search:build

# Upload to Meilisearch
npm run search:upload

# Or do both at once
npm run search:index
```

The `search:build` step parses all MDX content and generates a search index
file. The `search:upload` step takes that index and uploads it to your local
Meilisearch instance using the master key for authentication. The combined
`search:index` command performs both steps sequentially.

The build takes about 20 seconds to run, and the upload is usually very fast.
Once complete, you can test search functionality in your local development
environment.

#### Local Development

Start the app:

```bash
npm run dev
```

## Hosting

Hosting created from [CCV Hosting Preview Repo](https://github.com/brown-ccv/test-app-hosting-preview)

Containerized in Docker, stored in an image on Google Artifact Registry, and
run via Google Cloud run (Project
ID: `ccv-website-next`).
Secrets are in [Google Cloud Secret Manager](https://console.cloud.google.com/security/secret-manager).

## Meilisearch Deployment

This project uses a self-hosted Meilisearch instance on Google Cloud Run for
site-wide search functionality.

### Deploy Meilisearch

1. Go to the **Actions** tab in GitHub
2. Select **"Deploy Meilisearch"** workflow
3. Click **"Run workflow"** → **"Run workflow"** (green button)
4. Wait for deployment to complete (~2-3 minutes)
5. Copy the Meilisearch URL from the workflow logs (e.g., `https://meilisearch-xxxxx.a.run.app`)

### Add Meilisearch Host to Secrets

Add another secret with the deployed URL:

- **Name:** `MEILISEARCH_HOST`
- **Value:** The URL from step 3 (e.g., `https://meilisearch-xxxxx.a.run.app`)

### Generate Search API Key

Run the setup script locally to create a search-only API key:

```bash
# Update the host and master key in scripts/setup-search-key.ts first
npm run search:setup-key
```

This will output a search-only API key. Copy it for the next step.

### Add Search Key to Secrets

Add the final secret:

- **Name:** `NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY`
- **Value:** The key generated in previous step

## Verification

After setup, you should have these three secrets configured:

- ✅ `NEXT_PUBLIC_MEILISEARCH_HOST` - Cloud Run URL
- ✅ `MEILISEARCH_MASTER_KEY` - Master key for indexing
- ✅ `NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY` - Public search key for API

The next deployment will automatically:

1. Build a search index from all MDX content
2. Upload it to your Meilisearch instance
3. Enable search functionality in production

## Maintenance

### When to Re-run the Deployment Workflow

You typically only need to deploy Meilisearch **once**.

Re-run the workflow if you need to:

- **Upgrade Meilisearch version** - Edit the workflow to change the version tag
- **Scale resources** - Modify memory/CPU settings in the workflow
- **Change regions** - Deploy to a different GCP region
- **Disaster recovery** - Rebuild a corrupted or deleted instance

### Monitoring

Check your Meilisearch instance health:

```bash
curl $MEILISEARCH_HOST/health
```

View indexed documents:

```bash
curl $NEXT_PUBLIC_MEILISEARCH_HOST/indexes/pages/stats \
  -H "Authorization: Bearer $MEILISEARCH_MASTER_KEY"
```

### Cost Considerations

The Meilisearch instance runs on Cloud Run with:

- **2 GB RAM, 2 CPUs** (configurable in workflow)
- **Minimum 1 instance** (always running for fast search)
- Estimated cost: ~$15-30/month depending on traffic

To reduce costs, you can modify the workflow to use `--min-instances 0`, but
this will add cold-start delays to searches.

## Troubleshooting

### "Authorization header is missing" during build

Ensure all three secrets are set correctly. The build process needs `NEXT_PUBLIC_MEILISEARCH_HOST`
and `MEILISEARCH_MASTER_KEY` to upload the search index.

### Search returns no results

The index might not be populated. Manually trigger a reindex:

```bash
# From your local environment with secrets configured
npm run search:index
```

Or trigger via the API (requires master key):

```bash
curl -X POST $MEILISEARCH_HOST/api/search/sync \
  -H "Authorization: Bearer $MEILISEARCH_MASTER_KEY"
```

### Meilisearch instance is down

Check Cloud Run logs:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **Cloud Run** → **meilisearch** service
3. Check **Logs** tab for errors

Redeploy if needed using the GitHub Actions workflow.

## Accessibility

### Pa11y

This repo uses [pa11y-ci](https://github.com/pa11y/pa11y-ci) in order to help
to prevent accessibility issues reaching
production. You can run `next dev` and then in a separate terminal run:

```ssh
pa11y-ci --sitemap http://localhost:3000/sitemap
```

This accessibility tool is also run on every PR and comments on the PR with
any Pass/Fail information.

### Wave

[Wave](https://wave.webaim.org/extension/)
is a web extension that we use to confirm page hierarchy,
tabbing, and dynamic content changes.

## Website Carbon Footprint

This site aims to be environmentally conscious. We use
the [Website Carbon Calculator](https://www.websitecarbon.com/)
to measure our digital carbon footprint.

## Analytics

This project uses Google Analytics. The container name is ccv-website-next_1. Use
[Google Tag Manager](https://support.google.com/tagmanager/answer/14842872?hl=en&ref_topic=15191151&sjid=3017510881481598742-NA)
to set up and manage tags without managing the code further.
