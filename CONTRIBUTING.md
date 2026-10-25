# Contributing

Thanks for your interest in contributing to **interactive-resume-template**!

## Getting Started

```bash
git clone https://github.com/clementbouly/interactive-resume-template.git
cd interactive-resume-template
npm install
npm run dev
```

## Development

- **Stack**: React 19, TypeScript 5, Vite 7, Tailwind CSS 4, Framer Motion
- **Lint**: `npm run lint`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Make your changes
4. Run `npm run build` to make sure everything compiles
5. Commit with a clear message (`feat: add ...`, `fix: resolve ...`)
6. Open a Pull Request

## Guidelines

- Keep PRs focused on a single change
- Follow the existing code style and conventions
- Update documentation if your change affects the user-facing config
- Test in both light and dark mode
- Test on mobile viewport

## Adding a New Tech to the Registry

If you want to add technologies to `src/data/tech-registry.ts`:

1. Use the official brand color (check the technology's brand guidelines)
2. Add it in the appropriate category section
3. Keep alphabetical order within each section

## Reporting Bugs

Use the [issue tracker](https://github.com/clementbouly/interactive-resume-template/issues) with the bug report template.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
