# MDX Editing Guide

## What is MDX?

MDX files combine regular text and Markdown formatting with React components (like buttons and section headers).

## Available Components

All available components are in the `/components` folder. To make them accessible in `.mdx` files, add them to `/mdx-components.tsx`. Import the component(s) at the top of the file and add it to the Global MDX Components section at the bottom. To request a new custom component, please add an issue to [github](https://github.com/brown-ccv/ccv-website/issues).

## Commonly Used Markdown Formatting

### Regular Text
Just write normal text like this. You can use **bold** and *italic* formatting.

### Lists
- Use dashes for bullet points
- Like this
- And this

[Follow this link to learn more about Markdown.](https://www.markdownguide.org/cheat-sheet/)

## Example MDX File

```mdx

<SectionHeader
  title="Welcome to My Service"
  align="center"
/>

This is the main content of the page. You can write normal text here.

<LinkButton href="https://ccv.brown.edu">
  Read Documentation
</LinkButton>

## Key Features

- **Feature 1** - Description of feature 1
- **Feature 2** - Description of feature 2
- **Feature 3** - Description of feature 3

```

## Tips

1. **Keep it simple** - Use the styled components provided and create an issue on github to request a custom component.
  - ❌ Don't use HTML tags directly
  - ❌ Don't add complex styling or classes
2. **Test your changes** - Run `npm run dev` to see your changes