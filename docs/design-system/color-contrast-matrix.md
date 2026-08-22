# Naira Color Contrast Matrix

The ratios below were calculated with
`packages/design-tokens/src/contrast.ts`. Normal text requires at least 4.5:1
for AA; large text requires at least 3:1. Non-text focus and boundary signals
target at least 3:1 against the adjacent surface.

| Pair                           | Foreground | Background |   Ratio | Intended use               |
| ------------------------------ | ---------- | ---------- | ------: | -------------------------- |
| Primary content / light canvas | `#1D2924`  | `#FAF8F1`  | 14.17:1 | Body and heading text      |
| Muted content / light canvas   | `#53635A`  | `#FAF8F1`  |  5.99:1 | Supporting text            |
| Forest action / white content  | `#195C47`  | `#FFFFFF`  |  7.89:1 | Primary button             |
| Clay action / white content    | `#A94A27`  | `#FFFFFF`  |  5.68:1 | Adventure action           |
| Success / white content        | `#287A4D`  | `#FFFFFF`  |  5.27:1 | Status text or badge       |
| Warning / white content        | `#9A5B00`  | `#FFFFFF`  |  5.43:1 | Status text or badge       |
| Danger / white content         | `#B3261E`  | `#FFFFFF`  |  6.54:1 | Error text or badge        |
| Info / white content           | `#176C8C`  | `#FFFFFF`  |  5.90:1 | Informational status       |
| Focus / light canvas           | `#B25F2D`  | `#FAF8F1`  |  4.33:1 | Focus indicator            |
| Border / light canvas          | `#6B7A70`  | `#FAF8F1`  |  4.26:1 | Non-text boundary          |
| Primary content / dark canvas  | `#F2F5EE`  | `#121A16`  | 16.09:1 | Dark-theme body text       |
| Muted content / dark canvas    | `#B9C4BA`  | `#121A16`  |  9.85:1 | Dark-theme supporting text |
| Dark action / dark canvas      | `#75D7A9`  | `#121A16`  | 10.17:1 | Dark-theme action          |
| Dark border / dark canvas      | `#799287`  | `#121A16`  |  5.29:1 | Dark-theme boundary        |
| Dark focus / dark canvas       | `#F2B36A`  | `#121A16`  |  9.65:1 | Dark-theme focus indicator |

This matrix is a foundation gate, not a substitute for visual review. Map,
imagery, chart, disabled, hover, pressed, and selected states require specimen
review before their tokens are considered stable.
