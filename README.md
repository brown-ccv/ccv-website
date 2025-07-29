This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## App Hosting

Hosted on Firebase App Hosting (Project ID: `ccv-website-next`). Secrets are
in [Google Cloud Secret Manager](https://console.cloud.google.com/security/secret-manager).

## Accessibility

### Pa11y

This repo uses [pa11y-ci](https://github.com/pa11y/pa11y-ci) in order to help to prevent accessibility issues reaching
production. You can run  ```next dev``` and then in a separate terminal run:

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