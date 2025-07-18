# MDX Editing Guide

## What is MDX?

MDX files combine regular text and Markdown formatting with React components (like buttons and section headers).

## Available Components

All available components can be found in `mdx-components.tsx`. 

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