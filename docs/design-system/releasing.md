# Naira Design System Releases

`@naira/design-tokens` and `@naira/ui-svelte` have independent SemVer metadata.

## Version impact

- Patch: bug fix or visual correction without changing the public contract.
- Minor: backward-compatible component, token, pattern, or state addition.
- Major: incompatible prop, token meaning, export, or behavior change.

## Release checklist

1. Identify the affected package in `release/components.json`.
2. Run token, component, Storybook, accessibility, and browser checks.
3. Regenerate CSS and Dart outputs from the authored token source.
4. Add migration guidance for breaking changes or deprecations.
5. Review component stories and pilot consumers.
6. Validate the intended SemVer value without publishing automatically.
7. Record the release and changelog entry in the owning package workflow.

Deployment images must use SemVer plus Git SHA and must not use `latest`.
