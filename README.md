# Scripting Templates

![SheetXL](https://www.sheetxl.com/logo-text.svg)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Discord](https://img.shields.io/discord/1141404921246257223)](https://discord.gg/NTKdwUgK9p)

## Overview

This repository contains the source templates that appear in the SheetXL script editor's "New Script" wizard.

## Available Templates

Browse the [`templates/`](./templates/) directory to see all available templates:

### 🧮 Built-in Formulas

For additional examples and patterns, check out the **[Built-in Formulas](https://github.com/sheetxl/sheetxl/tree/main/packages/formulas)** - these follow the same TypeScript patterns as templates and showcase advanced formula implementations.

## Additional Resources

- ⭐ **[Main Github](https://github.com/sheetxl)** - Our main github.
- 💬 **[Join our Discord Community](https://discord.gg/NTKdwUgK9p)** - Get help and connect with the team.
- 🌐 **[Website](https://www.sheetxl.com)** - The official website for SheetXL.
- 📘 **[Developer Docs](https://www.sheetxl.com/docs)** - The official guides and tutorials.

## Usage

Templates added to this repo automatically available in the SheetXL script editor. No manual installation required.

## Publishing

There are two channels, one per branch. Each is type-checked against the SheetXL release on the same
npm dist-tag, since that is the script editor that loads it.

| branch | version | npm dist-tag | read by |
| --- | --- | --- | --- |
| `main` | `X.Y.Z` | `latest` | stable SheetXL |
| `beta` | `X.Y.Z-beta.N` | `beta` | SheetXL beta |

A push to either branch that changes `templates/` or `config/` type-checks the templates, builds the
manifest, bumps the version, publishes to npm, tags it and creates a GitHub release. Merging `beta`
into `main` promotes it: the next `main` publish drops the `-beta.N` suffix. To publish without a
template change, run the workflow from the Actions tab (**Run workflow**), or put `[publish]` in the
commit message.

To check locally: `npm run typecheck && npm run build`.

## Contributing

Want to add a new template? See our [Contributing Guide](CONTRIBUTING.md) for detailed instructions.

## License

MIT License - see [LICENSE](LICENSE) file for details.
