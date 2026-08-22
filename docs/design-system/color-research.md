# Naira Color Research

- Status: Working direction accepted for foundation implementation
- Date: 2026-08-22
- Selected direction: Canopy

## Research question

Naira needs a color language that feels outdoor-native, warm, and trustworthy
without becoming a generic bright-green mobility brand. The palette must work
for both calm public discovery and dense planner/admin interfaces.

## Reference observations

- Gojek's public brand book uses multiple category colors for service
  verticals.
- Grab's brand centre is strongly centered on green identity.
- Airbnb protects a distinctive warm brand color and asks other brands to stay
  visually distinct.
- Spectrum and Primer both separate base colors from functional and component
  roles, including theme-aware values.
- WCAG requires color choices to be evaluated as testable contrast and
  non-text contrast relationships, not only as visual swatches.

These are directional references. Naira does not reuse their brand colors,
logos, assets, or component styling.

## Candidate directions

| Direction | Character                             | Core colors                                | Evaluation                                                 |
| --------- | ------------------------------------- | ------------------------------------------ | ---------------------------------------------------------- |
| Canopy    | Forest, moss, clay, sand, warm cream  | `#195C47`, `#7A9B62`, `#A94A27`, `#FAF8F1` | Selected; strongest balance of trust, warmth, and contrast |
| Ridge     | Pine, lichen, terracotta, stone, mist | `#214C3A`, `#6B8E63`, `#B85C39`, `#F2F0E9` | Calm and premium; lower action separation in dense UI      |
| Trailhead | Evergreen, fern, amber, earth, cloud  | `#0E4B45`, `#5A8B5A`, `#B66A00`, `#FBFAF6` | More energetic; amber needs careful dark-theme treatment   |

## Selected direction: Canopy

The Canopy direction uses one primary forest identity and one warm adventure
accent. Lichen and earth tones support visual storytelling but do not become
semantic status colors.

### Brand roles

| Role           | Value     | Usage                                                    |
| -------------- | --------- | -------------------------------------------------------- |
| Forest strong  | `#163B2C` | Deep brand surfaces and high-emphasis text               |
| Forest primary | `#195C47` | Primary action and brand identity                        |
| Lichen         | `#7A9B62` | Illustration, supporting accent, non-critical decoration |
| Adventure clay | `#A94A27` | Secondary action and outdoor emphasis                    |
| Warm cream     | `#FAF8F1` | Public canvas and warm neutral surface                   |
| Stone          | `#E7E4D8` | Subtle surface and decorative neutral                    |
| Ink            | `#1D2924` | Primary light-theme content                              |

### Semantic roles

Brand colors are not reused as status meanings.

| Role             | Light theme | Dark theme |
| ---------------- | ----------- | ---------- |
| Surface canvas   | `#FAF8F1`   | `#121A16`  |
| Surface elevated | `#FFFFFF`   | `#1C2821`  |
| Content primary  | `#1D2924`   | `#F2F5EE`  |
| Content muted    | `#53635A`   | `#B9C4BA`  |
| Border default   | `#6B7A70`   | `#799287`  |
| Action primary   | `#195C47`   | `#75D7A9`  |
| Action accent    | `#A94A27`   | `#F0A77A`  |
| Focus indicator  | `#B25F2D`   | `#F2B36A`  |
| Status success   | `#287A4D`   | `#75D7A9`  |
| Status warning   | `#9A5B00`   | `#F2C06B`  |
| Status danger    | `#B3261E`   | `#FF8A80`  |
| Status info      | `#176C8C`   | `#7DD3FC`  |

Status colors must be paired with text, icon, or shape. They must not be the
only signal for route difficulty, weather, synchronization, or safety.

## Data visualization direction

Data visualization uses independent semantic roles for route, elevation,
weather, progress, and category series. The first implementation will use
distinct hue and lightness separation plus labels and line/shape treatment.
Brand green will not be used as the default for every chart series.

## Decision criteria

The selected direction must:

1. Pass the required text and non-text contrast pairs in the contrast matrix.
2. Remain distinguishable without relying on hue alone.
3. Work on light and dark surfaces.
4. Support a comfortable public canvas and compact operational surfaces.
5. Remain visually distinct from the strongest mobility and travel references.
6. Preserve enough neutral space for imagery, maps, and data-heavy screens.

## References

- [Awesome Design Systems](https://github.com/alexpate/awesome-design-systems)
- [Gojek Brand Book](https://lelogama.go-jek.com/gojeks_brand_guideline.pdf)
- [Grab Brand Centre](https://merchant.grab.com/en-my/brand-centre/grab)
- [Airbnb Trademark Guidelines](https://www.airbnb.com/help/article/3233)
- [Adobe Spectrum design tokens](https://spectrum.adobe.com/page/design-tokens/)
- [GitHub Primer color usage](https://primer.style/product/getting-started/foundations/color-usage/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
