# CCV Website

This is the website for the Center of Computation and Visualization at Brown University.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Authenticate with Google Cloud
This project interacts with Google Cloud services (e.g., Google Cloud Secret Manager). To allow your local development environment to access these services, we use [Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/application-default-credentials). ADC enables your application to automatically find credentials without requiring hardcoded keys.

You'll need the gcloud-cli (Google Cloud CLI) installed. If you don't have it, you can install it. For macOS/Linux users, Homebrew is a convenient option:
```bash
# For macOS
# https://formulae.brew.sh/cask/gcloud-cli
brew install gcloud-cli
```

Once `gcloud-cli`` is installed, log in to set up your Application Default Credentials for your user account:
```
gcloud auth application-default login
```

[!NOTE] Important Note on Service Accounts: While gcloud auth application-default login sets up user credentials for ADC, in production environments (like Firebase App Hosting), a dedicated service account is typically used for authentication. This ensures your application has only the necessary permissions and improves security. Your local setup emulates this access pattern.

### 3. Build
```
npm run build
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## App Hosting

Hosted on Firebase App Hosting (Project ID: `ccv-website-next`). Secrets are in [Google Cloud Secret Manager](https://console.cloud.google.com/security/secret-manager).

## Website Carbon Footprint
This site aims to be environmentally conscious. We use the [Website Carbon Calculator](https://www.websitecarbon.com/) to measure our digital carbon footprint.