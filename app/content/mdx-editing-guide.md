# MDX Editing Guide for Non-Coders

This guide helps non-technical users edit MDX content files.

## What is MDX?

MDX files combine regular text (like a Word document) with special components (like buttons and headings). They're used for website content that needs to look good and be interactive.

## Basic Structure

Every MDX file starts with metadata at the top:

```mdx
export const title = "Your Page Title"
export const description = "A brief description of the page"
```

## Available Components

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
export const title = "My Service"
export const description = "Description of my service"

<StyledHeading
  title="Welcome to My Service"
  align="center"
/>

This is the main content of the page. You can write normal text here.

<StyledButton href="https://docs.example.com">
  Read Documentation
</StyledButton>

## Key Features

- **Feature 1** - Description of feature 1
- **Feature 2** - Description of feature 2
- **Feature 3** - Description of feature 3
```

## Tips

1. **Keep it simple** - Use the styled components provided
2. **Test your changes** - Run `npm run dev` to see your changes
3. **Ask for help** - If something doesn't look right, ask a developer
4. **Don't delete the exports** - The `export const` lines at the top are required

## Common Mistakes to Avoid

- ❌ Don't delete the `export const` lines at the top
- ❌ Don't use HTML tags directly (use the styled components instead)
- ❌ Don't add complex styling or classes
- ✅ Do use the provided styled components
- ✅ Do write clear, simple content
- ✅ Do test your changes before committing 