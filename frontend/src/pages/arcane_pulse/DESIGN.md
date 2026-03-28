# Design System Specification

## 1. Overview & Creative North Star: "The Neon Observatory"
This design system is built to transform a standard price-tracking utility into a high-end digital concierge for the gaming community. The Creative North Star—**The Neon Observatory**—moves away from the cluttered, ad-heavy aesthetic of traditional "deal sites" and instead embraces an editorial, immersive experience.

By utilizing high-contrast typography, intentional asymmetry, and deep tonal layering, we create a sense of digital "atmosphere." We avoid the "template" look by treating the UI as a series of translucent, overlapping glass panes floating in a deep navy void. The goal is to make the user feel like they are looking through a high-tech HUD, where information is curated, not just displayed.

---

### 2. Colors & Surface Philosophy
The palette is rooted in a deep navy foundation, using vibrant violet and cyan accents to simulate the "glow" of high-end gaming hardware.

**The "No-Line" Rule**
Traditional 1px solid borders are strictly prohibited for sectioning. We define boundaries through background color shifts. To separate a main content area from a sidebar, use a transition from `surface` (#0b1326) to `surface_container_low` (#131b2e).

**Surface Hierarchy & Nesting**
Depth is achieved through the logical stacking of container tiers.
*   **Base:** `surface` (#0b1326)
*   **Secondary Sections:** `surface_container_low` (#131b2e)
*   **Interactive Cards:** `surface_container` (#171f33)
*   **Floating Modals/Popovers:** `surface_container_highest` (#2d3449)

**The Glass & Gradient Rule**
To achieve a premium "high-tech" feel, any element that sits "above" the main content (e.g., Navigation Bars, Hovering Tooltips) must use **Glassmorphism**:
*   **Background:** `surface_variant` (#2d3449) at 60% opacity.
*   **Effect:** `backdrop-filter: blur(12px)`.
*   **Signature Texture:** Main Call-to-Actions (CTAs) must use a linear gradient from `primary` (#d0bcff) to `secondary_container` (#0566d9) at a 135-degree angle to provide "visual soul."

---

### 3. Typography: Editorial Authority
We use **Inter** exclusively, relying on its clean, neutral architecture to ground our more aggressive visual effects.

*   **Display (Scale: 3.5rem - 2.25rem):** Used for "Hero" moments. Use `tight` letter spacing (-0.02em) and `bold` weights. This conveys the "Modern Tech" authority.
*   **Headlines (Scale: 2rem - 1.5rem):** Used for game titles and primary section headers. These should feel intentional and spacious.
*   **Body (Scale: 1rem - 0.875rem):** High readability is paramount. Use `body-lg` for game descriptions to maintain an editorial feel.
*   **Labels (Scale: 0.75rem - 0.6875rem):** Used for "Price Drop" tags or "Platform" badges. Always capitalized with `0.05em` letter spacing for a technical, data-driven look.

---

### 4. Elevation & Depth
We reject traditional "drop shadows" in favor of **Tonal Layering** and **Ambient Glows**.

*   **The Layering Principle:** A card should never have a shadow if it is simply sitting on a background. Instead, place a `surface_container_highest` card on a `surface_container_low` background. The color shift creates the "lift."
*   **Ambient Shadows:** For floating elements (like a price-comparison popover), use a diffuse shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow color should never be pure black; it should be a deep tint of the background color.
*   **The "Ghost Border":** If a separation is required for accessibility, use a "Ghost Border": `1px solid` using the `outline_variant` token (#494454) at **15% opacity**.
*   **Focus Glows:** Active inputs or primary buttons should emit a soft outer glow using the `primary` color (#d0bcff) with a 15px blur at 30% opacity.

---

### 5. Components

#### Buttons (The Command Center)
*   **Primary:** Gradient fill (`primary` to `secondary_container`), white text, `xl` (1.5rem) roundedness. On hover, increase the gradient intensity and add a subtle `primary` glow.
*   **Secondary:** Glassmorphic background with a `Ghost Border`.
*   **Tertiary:** No background. Text-only using the `primary` token.

#### Cards (The Game Tiles)
*   **Rule:** Forbid divider lines. Use `spacing.6` (2rem) of vertical white space to separate the game title from the price data.
*   **Style:** `surface_container` background, `md` roundedness. On hover, the card should scale slightly (1.02x) and the background should shift to `surface_container_high`.

#### Input Fields (The Search Interface)
*   **Style:** `surface_container_lowest` background. 
*   **States:** On focus, the border (Ghost Border) opacity increases to 40% and a `primary` glow is applied. This creates a "tuning in" effect.

#### Price Accordions (The Data Deep-Dive)
*   **Style:** Use a `surface_container_low` header that expands into a `surface_container` body. 
*   **Transition:** Animate the height and opacity to mimic a hardware interface unfolding.

#### Additional Component: The "Hype Pulse" Badge
*   For massive price drops, use a chip with a `tertiary` (#4ae176) background and a soft, rhythmic opacity animation (pulse) to draw the eye without using "loud" corporate reds.

---

### 6. Do’s and Don’ts

**Do:**
*   **Do** use asymmetrical layouts. A game image can "bleed" off the edge of a container to break the grid.
*   **Do** use generous spacing. If in doubt, use `spacing.10` (3.5rem) to let elements breathe.
*   **Do** use `backdrop-blur` on any element that overlaps another.

**Don’t:**
*   **Don’t** use 100% opaque borders. They feel "cheap" and corporate.
*   **Don’t** use pure black (#000000). Use the `surface` tokens to maintain the deep navy "atmospheric" depth.
*   **Don’t** use standard "Material Design" ripple effects. Use subtle opacity shifts or scaling for interaction feedback.
*   **Don’t** use dividers or lines to separate list items; use tonal shifts between `surface_container_low` and `surface_container_lowest`.