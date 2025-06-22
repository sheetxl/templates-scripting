# Contributing to SheetXL Scripting Templates

Thank you for your interest in contributing to the SheetXL scripting templates! This guide will help you get started.

## 🚀 Quick Start

1. Fork and clone the repository
2. Create a new branch for your template
3. Add your template to the `templates/` directory
4. Test locally and submit a pull request

## 📝 Creating a New Template

### File Structure

Create a new `.ts` file in the `templates/` directory:

```text
scripts/
├── build-manifest.ts (generates metadata)
├── clean.js (cleanup utility)
templates/
├── myNewTemplate.ts
├── directory.json (auto-generated, for development)
dist/
└── manifest.json (auto-generated, for npm package)
```

### Template Format

```typescript
/**
 * Brief description of what your template does.
 * This appears in the template description.
 *
 * @summary Display Name for Template Picker
 * @param param1 Description of first parameter
 * @param param2 Description of second parameter  
 * @returns What the function returns
 */
export function myTemplate(param1: string, param2: number): boolean {
  // Your implementation here
  return true;
}
```

### Metadata Guidelines

- **@summary**: Keep it concise (2-4 words). This becomes the template title
- **Description**: First line should be clear and descriptive
- **Parameters**: Document all parameters with types and descriptions
- **Icon Assignment**: Icons are auto-assigned based on code patterns:
  - `autostart`: Functions with `export default` (run on workbook open)
  - `macro`: Sheet/range manipulation, styling, UI operations
  - `formula`: Pure calculation functions

### Code Standards

- Use TypeScript with strict typing
- Include comprehensive error handling
- Add inline comments for complex logic
- Follow existing naming conventions
- Provide sensible default parameter values

### Example Templates

Look at existing templates for inspiration:

- `fibonacci.ts` - Array generation and mathematical calculations
- `welcomeGreeting.ts` - Default export function with conditional logic
- `styleBorders.ts` - Sheet manipulation and styling
- `dadJoke.ts` - External API integration

## 🧪 Testing Your Template

### Local Testing

```bash
# Install dependencies
npm install

# Build manifest to test metadata extraction
npm run build

# Verify your template appears in the generated files
cat dist/manifest.json | grep "yourTemplate"
cat templates/directory.json | grep "yourTemplate"
```

### Validation Checklist

- [ ] Template compiles without TypeScript errors
- [ ] JSDoc metadata is properly formatted
- [ ] Function has appropriate parameter types and defaults
- [ ] Code includes error handling for edge cases
- [ ] Template appears correctly in generated `directory.json`

## 📋 Pull Request Process

1. **Create descriptive PR title**: "Add [template name] template"
2. **Include description**: Explain what the template does and its use case
3. **Test locally**: Ensure `npm run build` succeeds
4. **CI validation**: All checks must pass
5. **Review process**: Maintainers will review for quality and consistency

### PR Template

```markdown
## Template: [Name]

### Description
Brief description of what this template does.

### Use Case
When would someone use this template?

### Testing
- [ ] Builds successfully with `npm run build`
- [ ] Metadata extracted correctly
- [ ] Function works as expected
- [ ] Error handling included

### Type
- [ ] Formula (calculation function)
- [ ] Macro (sheet manipulation)
- [ ] Autostart (runs on workbook open)
```

## 🔄 Automated Publishing

Once your PR is merged:

1. CI automatically extracts metadata from your JSDoc comments
2. Template catalog is updated
3. New version is published to npm
4. Template becomes available in SheetXL editor

## 📚 Resources

- [SheetXL Documentation](https://docs.sheetxl.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JSDoc Documentation](https://jsdoc.app/)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on improving the template library for all users
- Follow existing code patterns and conventions

## ❓ Questions?

- Open an issue for template ideas or questions
- Check existing templates for examples
- Reach out to maintainers for guidance

Happy templating! 🎉
