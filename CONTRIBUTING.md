# Contributing to SheetXL Scripting Templates

Thank you for your interest in contributing to the SheetXL scripting templates! This guide will help you get started.

## 🚀 Quick Start

1. Fork and clone the repository
2. Create a new branch for your template
3. Add your template to the `templates/` directory
4. Test locally and submit a pull request

## 📝 Creating a New Template

### File Structure

Create a new file in the `templates/` directory: `.ts` for TypeScript, `.py` for Python. The
extension is the template's language; the catalog records it, and the script editor puts the
template in a module of that language. A worksheet function can be written in both languages under
one name (`fibonacci.ts`, `fibonacci.py`); keep the two giving the same answers.

```text
config/
├── build.ts (reads the templates, writes dist/)
├── clean.ts
templates/
├── myNewTemplate.ts
├── myNewTemplate.py
dist/ (generated)
├── contents.json (listing of every file)
└── templates-scripting/
    ├── contents.json (the catalog the script editor reads)
    ├── myNewTemplate.ts
    └── myNewTemplate.py
```

### Template Format (TypeScript)

```typescript
/**
 * Brief description of what your template does.
 * This appears in the template description.
 *
 * @summary One line shown under the title
 * @icon formula
 * @param param1 Description of first parameter
 * @param param2 Description of second parameter  
 * @returns What the function returns
 */
export function myTemplate(param1: string, param2: number): boolean {
  // Your implementation here
  return true;
}
```

### Template Format (Python)

```python
def myTemplate(param1: str, param2: float = 1.0) -> bool:
    """Brief description of what your template does.

    This appears in the template description.

    Args:
        param1: Description of first parameter.
        param2: Description of second parameter.
    """
    return True
```

Every parameter and the return have a type hint (`float`, `int`, `str`, `bool`, `date`, `Any`,
`list[list[float]]` for a range, and the like); a function without them does not compile. The
summary and the `Args:` section (Google style) are what the function shows in a cell.

A Python function reaches the formula context as a TypeScript one does, under the same names:
`from sheetxl import FormulaContext`, then `FormulaContext.formatResults('0.00')`,
`FormulaContext.getRow()` and the like (`roundFmt.py`, `weekdayOfMonth.py`). Members that read other
cells of the workbook (`getValueAt`, `getReference`) are not available to Python yet.

A Python template can import numpy and pandas, besides Python's standard library; nothing else.
A parameter hinted `pd.DataFrame` receives the range as a DataFrame whose column names are its
first row, and a returned DataFrame spills its headers and values (not its index); `np.ndarray`
receives the range as a 2-D array, and a returned array spills (`groupTotals.py`, `trendLine.py`).
Such a template is Python only: it has no TypeScript form. Say in its description that the library
loads the first time the function is used.

### Metadata Guidelines

The first doc block in the file describes the template: the first JSDoc block of a TypeScript
template, the first docstring of a Python one. The tags below go in that block.

- **@name**: Optional title. Defaults to the file name, title-cased (`autoFillDown.ts` is "Auto Fill
  Down"); a formula's is upper-cased, as the function is called (`add.ts` is "ADD")
- **@summary**: One line shown under the title. Defaults to the first line of the description
- **@icon**: Specify the icon type: `formula`, `macro`, or `autostart`. Detected when not specified
  - `formula`: Pure calculation functions
  - `macro`: Sheet/range manipulation, styling, UI operations  
  - `autostart`: Functions with `export default` (run on workbook open)
- **@hidden**: Leaves the template out of the catalog, optionally with a reason
  (`@hidden Not finished yet.`)
- **Description**: First line should be clear and descriptive
- **Parameters**: Document all parameters with types and descriptions

### Code Standards

- Type everything: strict TypeScript, or Python type hints on every parameter and return
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
- `fibonacci.py`, `weekdayOfMonth.py`, `add.py`, `roundFmt.py` - The Python forms of the worksheet
  functions: a spilled result, a date with its format, a range, a number format
- `groupTotals.py`, `trendLine.py` - Python only: a table in and out with pandas, array math with
  numpy

## 🧪 Testing Your Template

### Local Testing

```bash
# Install dependencies
npm install

# Build the catalog; a template with a problem fails the build
npm run build

# Verify your template appears in the catalog
cat dist/templates-scripting/contents.json | grep "yourTemplate"
```

### Validation Checklist

- [ ] Template compiles without errors (`npm run typecheck` for TypeScript; for Python, open it in
      the script editor and save, or run SheetXL's `scriptTemplates.node.test.ts`)
- [ ] JSDoc metadata is properly formatted
- [ ] Function has appropriate parameter types and defaults
- [ ] Code includes error handling for edge cases
- [ ] Template appears correctly in the generated `dist/templates-scripting/contents.json`

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
