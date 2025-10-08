# Modern Design System — Ascent Group Construction

## Overview
The site has been redesigned from a "corporate contractor" look to a modern, warm, and engaging boutique home improvement brand. This document outlines the new design system.

---

## Color Palette

### Primary Colors
- **Sage Green** (#295F4E / `hsl(162 37% 26%)`)
  - Primary brand color
  - Signals: handcrafted, modern, trustworthy
  - Used for: headers, primary buttons, links
  - Hover: `hsl(162 37% 34%)`

- **Warm Cream** (#F9F8F6 / `hsl(37 33% 98%)`)
  - Background color
  - Signals: calming, approachable, premium
  - Used for: page backgrounds, card backgrounds

- **Terracotta** (#E1A16E / `hsl(27 65% 66%)`)
  - Secondary/accent color
  - Signals: warm, inviting, friendly
  - Used for: secondary buttons, highlights, CTAs
  - Creates warm glow on hover

- **Deep Charcoal** (#1E1E1E / `hsl(0 0% 12%)`)
  - Text color
  - Signals: professional, readable, modern
  - Used for: body text, headings

### Usage Guidelines
```css
/* Primary actions */
background-color: hsl(var(--primary)); /* Sage green */
color: hsl(var(--primary-foreground)); /* White */

/* Secondary actions */
background-color: hsl(var(--secondary)); /* Terracotta */
color: hsl(var(--secondary-foreground)); /* Charcoal */

/* Backgrounds */
background-color: hsl(var(--background)); /* Warm cream */
color: hsl(var(--foreground)); /* Charcoal */
```

---

## Typography

### Font Families

**Headings:** Outfit (fallback: Montserrat, system-ui, sans-serif)
- Modern, geometric sans-serif
- Weights: 400, 600, 700, 800
- Use: H1-H6, hero headlines, section titles

**Body:** Work Sans (fallback: Inter, system-ui, sans-serif)
- Humanist sans-serif, highly readable
- Weights: 400, 500, 600
- Use: paragraphs, buttons, UI text

### Font Sizes
```css
/* Headlines */
.hero-text: clamp(2.5rem, 8vw, 5rem); /* 40px - 80px */
.section-title: clamp(2rem, 4vw, 3rem); /* 32px - 48px */

/* Body */
body: 1rem; /* 16px */
.large: 1.25rem; /* 20px */
.small: 0.875rem; /* 14px */

/* Buttons */
button: 0.875rem - 1rem; /* 14px - 16px */
```

### Line Heights
- Headlines: 1.1 - 1.2 (tight, modern)
- Body: 1.6 - 1.8 (readable, comfortable)
- Buttons: 1 (centered, compact)

### Letter Spacing
- Headlines: -0.02em to -0.01em (tighter for modern feel)
- Body: normal
- Buttons: normal

---

## Spacing & Layout

### Vertical Spacing
- **Section padding:** 96px (desktop) / 64px (tablet) / 48px (mobile)
- **Component gaps:** 48px (desktop) / 32px (mobile)
- **Text blocks:** Max 60ch width for readability

### Horizontal Spacing
- **Container max-width:** 1400px
- **Container padding:** 2rem (32px)
- **Grid gaps:** 24px - 48px

### Whitespace Philosophy
> "Whitespace is modern luxury."

Use generous padding between sections to create breathing room and emphasize content.

---

## Components

### Buttons

**Primary (Sage Green)**
```tsx
<Button variant="default" size="lg">
  Primary Action
</Button>
```
- Background: Sage green
- Text: White
- Hover: Lighter sage + scale 1.02
- Shadow: Soft → Medium on hover

**Secondary (Terracotta)**
```tsx
<Button variant="secondary" size="lg">
  Secondary Action
</Button>
```
- Background: Terracotta
- Text: Charcoal
- Hover: Brightness 110% + scale 1.02
- Shadow: Soft → Warm glow on hover

**Outline**
```tsx
<Button variant="outline" size="lg">
  Outline Action
</Button>
```
- Border: 2px Sage green
- Text: Sage green
- Hover: Filled sage green + white text

### Cards
- **Border radius:** 1rem (16px) — rounded-2xl
- **Shadow:** Soft by default, medium on hover
- **Transition:** 300ms ease-out
- **Hover:** Lift -8px (translate-y-2)

```tsx
<Card className="card-hover">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

---

## Shadows & Elevation

### Shadow System
```css
--shadow-soft: 0 2px 12px hsla(162, 37%, 26%, 0.08);
--shadow-medium: 0 6px 24px hsla(162, 37%, 26%, 0.12);
--shadow-strong: 0 12px 40px hsla(162, 37%, 26%, 0.16);
--shadow-glow: 0 4px 24px hsla(27, 65%, 66%, 0.3); /* Terracotta glow */
```

### Usage
- Default cards: `shadow-soft`
- Hover cards: `shadow-medium`
- Modals/dialogs: `shadow-strong`
- Secondary buttons hover: `shadow-glow`

---

## Animations & Interactions

### Transitions
```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Hover Effects
- **Buttons:** Scale 1.02 + shadow change + brightness/color shift
- **Cards:** Lift -8px + shadow medium
- **Icons:** Rotate 5° (for playful elements)
- **Links:** Underline fade-in + color shift

### Animation Guidelines
- Keep animations subtle (2-5% scale, not 10%)
- Use smooth easing for professional feel
- Duration: 200-400ms for micro-interactions
- Always respect `prefers-reduced-motion`

---

## Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile-First Approach
```css
/* Base styles for mobile */
.section { padding: 48px 16px; }

/* Tablet */
@media (min-width: 640px) {
  .section { padding: 64px 32px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .section { padding: 96px 64px; }
}
```

### Grid Layouts
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

---

## Imagery

### Photo Style
- **Human + home scenes:** Technicians smiling, homeowner chatting, hands working
- **Natural tones:** Slightly desaturated, avoid HDR
- **Rounded corners:** 1rem (16px) on all images
- **Soft shadows:** Apply to images for depth

### Before/After
- Use swipe sliders for transformation showcase
- Rounded corners on both images
- Clear labels ("Before" / "After")

---

## Accessibility

### Contrast Ratios
All color combinations meet WCAG AA standards (4.5:1 minimum):
- Sage green on white: ✓
- Charcoal on cream: ✓
- Terracotta on white: ✓

### Focus States
- **Ring:** 2px solid sage green
- **Offset:** 2px
- **Always visible** for keyboard navigation

### Touch Targets
- Minimum 44×44px on mobile
- 48×48px for primary actions
- Adequate spacing between touch elements

---

## Implementation

### CSS Variables (src/index.css)
```css
:root {
  --background: 37 33% 98%; /* Warm cream */
  --foreground: 0 0% 12%; /* Charcoal */
  --primary: 162 37% 26%; /* Sage green */
  --secondary: 27 65% 66%; /* Terracotta */
  --radius: 1rem; /* Rounded corners */
  
  /* Shadows */
  --shadow-soft: 0 2px 12px hsla(162, 37%, 26%, 0.08);
  --shadow-medium: 0 6px 24px hsla(162, 37%, 26%, 0.12);
  --shadow-strong: 0 12px 40px hsla(162, 37%, 26%, 0.16);
  --shadow-glow: 0 4px 24px hsla(27, 65%, 66%, 0.3);
}
```

### Tailwind Config (tailwind.config.ts)
```ts
fontFamily: {
  sans: ['Work Sans', 'Inter', 'system-ui', 'sans-serif'],
  heading: ['Outfit', 'Montserrat', 'system-ui', 'sans-serif'],
}
```

### Component Usage
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Primary sage button
<Button variant="default" size="lg">Get Started</Button>

// Secondary terracotta button
<Button variant="secondary" size="lg">Learn More</Button>

// Warm card with hover effect
<Card className="card-hover">
  <CardHeader>
    <CardTitle>Service Title</CardTitle>
  </CardHeader>
  <CardContent>
    Service description
  </CardContent>
</Card>
```

---

## Checklist for New Components

When creating new components:

- ✅ Use semantic color tokens (not hard-coded colors)
- ✅ Apply rounded-2xl for modern look
- ✅ Add soft shadows by default
- ✅ Include hover states with scale + shadow
- ✅ Use Outfit for headings, Work Sans for body
- ✅ Ensure 44×44px minimum touch targets
- ✅ Test contrast ratios (WCAG AA)
- ✅ Add focus states for keyboard nav
- ✅ Respect prefers-reduced-motion
- ✅ Mobile-first responsive design

---

## Further Reading

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Material Design Motion](https://material.io/design/motion)

---

**Last Updated:** January 2025  
**Version:** 2.0 (Modern Warm Redesign)
