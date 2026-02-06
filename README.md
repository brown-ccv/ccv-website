# CCV Website

This is the website for the Center of Computation and Visualization at Brown University.

## Getting Started

## 0. Create env.local in your project root:

```
MEILISEARCH_HOST=http://127.0.0.1:7700
MEILISEARCH_MASTER_KEY=myMasterKey123
MEILISEARCH_SEARCH_KEY=myMasterKey123
```

### 1. Install Dependencies

```bash
npm install
```

Meiliesearch

```bash
# For macOS
brew install meilisearch
```

Or download binary from https://www.meilisearch.com/docs/learn/getting_started/installation

### 2. Authenticate with Google Cloud

This project interacts with Google Cloud services (e.g., Google Cloud Secret Manager). To allow your local development
environment to access these services, we
use [Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/application-default-credentials).
ADC enables your application to automatically find credentials without requiring hardcoded keys.

You'll need the gcloud-cli (Google Cloud CLI) installed. If you don't have it, you can install it. For macOS/Linux
users, Homebrew is a convenient option:

```bash
# For macOS
# https://formulae.brew.sh/cask/gcloud-cli
brew install gcloud-cli
```

Once `gcloud-cli` is installed, log in to set up your Application Default Credentials for your user account:

```bash
gcloud auth application-default login
```

> [!IMPORTANT]
> Important Note on Service Accounts: While gcloud auth application-default login sets up user credentials for ADC, in
> production environments (like Firebase App Hosting), a dedicated service account is typically used for authentication.
> This ensures your application has only the necessary permissions and improves security. Your local setup emulates this
> access pattern.

### 3. Build

Before running the development server, it's recommended to build the project. This compiles the Next.js application for
production and can help catch configuration errors or issues early.

This step also copies images from the content folder into the public directory. You don't need to run this command every
time you develop locally, but if you make changes to images in the content folder, you'll want to rebuild.

```bash
npm run build
```

### 4. Run the Development Server

In a separate terminal, run:

```bash
# Load environment variables and start Meilisearch
export $(cat .env.local | xargs) && meilisearch --master-key="$MEILISEARCH_MASTER_KEY"
```

> Keep this terminal running while developing.

In your main terminal

```bash
# Build search index from MDX files
npm run search:build

# Upload to Meilisearch
npm run search:upload

# Or do both at once
npm run search:index
```

Then start the app

```bash
npm run dev
```

## Hosting

Hosting created from [CCV Hosting Preview Repo](https://github.com/brown-ccv/test-app-hosting-preview)

Containerized in Docker, stored in an image on Google Container Registry, and run via Google Cloud run (Project
ID: `ccv-website-next`).
Secrets are in [Google Cloud Secret Manager](https://console.cloud.google.com/security/secret-manager).

## Accessibility

### Pa11y

This repo uses [pa11y-ci](https://github.com/pa11y/pa11y-ci) in order to help to prevent accessibility issues reaching
production. You can run `next dev` and then in a separate terminal run:

```ssh
pa11y-ci --sitemap http://localhost:3000/sitemap
```

This accessibility tool is also run on every PR and comments on the PR with
any Pass/Fail information.

### Wave

[Wave](https://wave.webaim.org/extension/) is a web extension that we use to confirm page
hierarchy, tabbing, and dynamic content changes.

## Website Carbon Footprint

This site aims to be environmentally conscious. We use the [Website Carbon Calculator](https://www.websitecarbon.com/)
to measure our digital carbon footprint.

## Analytics

This project uses Google Analytics. The container name is ccv-website-next_1. Use
[Google Tag Manager](https://support.google.com/tagmanager/answer/14842872?hl=en&ref_topic=15191151&sjid=3017510881481598742-NA)
to set up and manage tags without managing the code further.
