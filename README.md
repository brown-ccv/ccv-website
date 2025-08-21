# CCV Website

This is the website for the Center of Computation and Visualization at Brown University.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

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

```
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

```bash
npm run dev
```

## App Hosting

Hosted on Firebase App Hosting (Project ID: `ccv-website-next`). Secrets are
in [Google Cloud Secret Manager](https://console.cloud.google.com/security/secret-manager).

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
