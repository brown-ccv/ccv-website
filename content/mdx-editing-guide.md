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

<ContentSection> {/* DO NOT REMOVE THIS LINE */}

<SectionHeader
  title="Welcome to My Service"
  align="center"
/>

This is the main content of the page. You can write normal text here.

<StyledButton href="https://ccv.brown.edu">
  Read Documentation
</StyledButton>

## Key Features

- **Feature 1** - Description of feature 1
- **Feature 2** - Description of feature 2
- **Feature 3** - Description of feature 3

</ContentSection> {/* DO NOT REMOVE THIS LINE */}

```

## Tips

1. **Keep it simple** - Use the styled components provided
  - ❌ Don't use HTML tags directly
  - ❌ Don't add complex styling or classes
2. **Put all content except `<Hero />` within `<ContentSection></ContentSection>`** - It is needed for page formatting
3. **Test your changes** - Run `npm run dev` to see your changes