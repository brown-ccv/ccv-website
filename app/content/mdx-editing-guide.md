# MDX Editing Guide

## What is MDX?

MDX files combine regular text with components (like buttons and headings). They're used for website content that needs to look good and be interactive beyond what regular markdown can offer.

## Available Components
All available components and their usage can be found in `/components/ui/mdx-styled-components.tsx`. 

## Commonly Used Components and Markdown Formatting

### Headings
```mdx
<StyledHeading
  title="Your Section Title"
  align="center"
/>
```

### Buttons
```mdx
<StyledButton href="https://example.com">
  Click here
</StyledButton>
```

### Regular Text
Just write normal text like this. You can use **bold** and *italic* formatting.

### Lists
- Use dashes for bullet points
- Like this
- And this

### Code Examples
```javascript
// You can include code blocks
console.log("Hello World");
```

## Example MDX File

```mdx
<StyledHeading
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
```

## Tips

1. **Keep it simple** - Use the styled components provided
  - ❌ Don't use HTML tags directly
  - ❌ Don't add complex styling or classes
2. **Test your changes** - Run `npm run dev` to see your changes