# Design System Release Checklist

- Confirm the affected package in `release/components.json`.
- Decide patch, minor, or major SemVer impact.
- Regenerate token CSS and Dart outputs when token source changes.
- Run `task ui:check`, `task docs:check`, `task ui:a11y`, and `task ui:visual`.
- Run public, planner, admin, and Storybook browser checks.
- Review Storybook state matrix and pilot consumers.
- Add migration guidance for removed props, tokens, or components.
- Validate the manifest with `node --test scripts/release-components.test.mjs`.
- Do not tag, publish, or deploy from the validation command.
