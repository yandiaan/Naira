# Naira Content Guidance

Naira is Indonesian-first and localization-ready.

## Voice

- Warm without being overly excited.
- Clear without being clinical.
- Calm in warnings and safety-sensitive states.
- Helpful without blaming the user.
- Practical and specific about the next action.

## UI copy

- Use sentence case.
- Prefer active verbs: `Simpan`, `Coba lagi`, `Lihat detail`.
- Keep labels short and distinguish destructive actions.
- Avoid unexplained technical terms such as mutation, hydration, or conflict
  unless the audience needs them.
- Do not use color as the only meaning carrier.

## State copy

- Error: explain the problem, impact, and recovery action.
- Empty: explain what is absent and provide the first useful action.
- Offline: state what remains available and when sync will happen.
- Conflict: explain that two changes differ and provide a review action.
- Loading: describe the operation when a generic spinner is not enough.

## Localization

Consumer content must support text expansion, pluralization, date/time,
timezone, number, units, and future English translation without changing the
component API.
