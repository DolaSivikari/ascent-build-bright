# Splash Overlay Documentation

## Overview

The enhanced splash overlay provides a polished entrance animation using GSAP, with asset preloading, accessibility features, and localStorage persistence.

## Features

- **GSAP Animations**: Smooth, hardware-accelerated animations with timeline control
- **Asset Preloading**: Waits for critical fonts and images before revealing content
- **Timeout Fallback**: Ensures splash never blocks for more than 3.5 seconds (configurable)
- **Skip Button**: Keyboard-accessible skip functionality
- **First-Visit Only**: Shows only once using localStorage (`ascent_splash_seen_v1`)
- **Accessibility**: ARIA labels, focus management, screen reader compatible
- **Analytics Ready**: `onFinish` callback for tracking

## Usage

### Basic Implementation

```tsx
import SplashOverlay from '@/components/SplashOverlay';

function App() {
  return (
    <>
      <SplashOverlay 
        waitImages={['/assets/hero-poster.jpg']} 
        onlyFirstVisit={true} 
        maxWait={3500}
      />
      {/* Your app content */}
    </>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `waitImages` | `string[]` | `[]` | Array of critical image URLs to preload |
| `onlyFirstVisit` | `boolean` | `true` | Show splash only on first visit (uses localStorage) |
| `maxWait` | `number` | `3500` | Maximum wait time in milliseconds before revealing content |
| `onFinish` | `() => void` | `undefined` | Callback fired when splash completes or is skipped |

### With Analytics

```tsx
<SplashOverlay 
  waitImages={['/assets/hero-poster.jpg']} 
  onFinish={() => {
    // Track splash completion
    analytics.track('splash_completed');
  }}
/>
```

## Configuration

### Disable Splash Overlay

To completely disable the splash:

```tsx
// Option 1: Remove the component
// Simply comment out or remove <SplashOverlay /> from App.tsx

// Option 2: Force it to never show
<SplashOverlay onlyFirstVisit={true} /> 
// Then set localStorage:
localStorage.setItem('ascent_splash_seen_v1', '1');
```

### Show on Every Visit

```tsx
<SplashOverlay onlyFirstVisit={false} />
```

### Customize Timing

```tsx
<SplashOverlay maxWait={5000} /> // Wait up to 5 seconds
```

### Add More Preload Assets

```tsx
<SplashOverlay 
  waitImages={[
    '/assets/hero-poster.jpg',
    '/assets/logo.svg',
    '/assets/background.webp'
  ]} 
/>
```

## Testing

### Run Unit Tests

```bash
npm test SplashOverlay.test.tsx
```

### Run E2E Tests

```bash
npx playwright test tests/e2e/splash.spec.ts
```

### Manual Testing Checklist

- [ ] Splash appears on first visit in a new browser/incognito window
- [ ] Skip button is visible and clickable
- [ ] Skip button is keyboard accessible (Tab to focus, Enter to skip)
- [ ] Splash does not reappear after being seen
- [ ] Splash times out after maxWait (3.5s) even if assets fail
- [ ] Main content is visible after splash completes
- [ ] No console errors during animation
- [ ] Smooth animation on both desktop and mobile

### Reset for Testing

To force splash to show again:

```javascript
// In browser console
localStorage.removeItem('ascent_splash_seen_v1');
// Then refresh page
```

## Accessibility

### Features

- **ARIA Labels**: Dialog role with descriptive label
- **Focus Management**: Skip button receives focus when splash is visible
- **Keyboard Navigation**: Full keyboard support (Tab, Enter)
- **Screen Reader**: Announces loading state and skip option
- **No Motion Preference**: Respects `prefers-reduced-motion` via CSS

### Testing with Screen Readers

Test with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)

Expected behavior:
1. Screen reader announces "Loading dialog"
2. Skip button is immediately focusable
3. User can activate skip with Enter or Space

## Performance

### Bundle Impact

- **GSAP**: ~50KB gzipped
- **Component**: ~2KB
- **Total**: ~52KB additional bundle size

### Optimization Tips

1. **Lazy Load GSAP**: Consider code splitting if not used elsewhere
2. **Optimize Assets**: Compress images in `waitImages` array
3. **Reduce maxWait**: Lower timeout for faster fallback
4. **Preload Selectively**: Only include critical above-the-fold assets

### Performance Budget

- **FCP (First Contentful Paint)**: < 1.5s (including splash)
- **LCP (Largest Contentful Paint)**: < 2.5s
- **CLS (Cumulative Layout Shift)**: < 0.05

## Architecture

### Component Lifecycle

```
1. Mount → Check localStorage
   ↓
2. If not seen → setVisible(true)
   ↓
3. GSAP entrance timeline starts
   ↓
4. Wait for fonts + images (or maxWait timeout)
   ↓
5. GSAP exit timeline starts
   ↓
6. Set localStorage key
   ↓
7. onFinish() callback
   ↓
8. Unmount
```

### Storage Key

- **Key**: `ascent_splash_seen_v1`
- **Value**: `"1"`
- **Storage**: localStorage (persists across sessions)
- **Version Suffix**: `_v1` allows resetting for major updates

To force all users to see a new splash version:
```javascript
// Update key in component
localStorage.setItem('ascent_splash_seen_v2', '1');
```

## Troubleshooting

### Splash Doesn't Appear

1. Check localStorage: `localStorage.getItem('ascent_splash_seen_v1')`
2. Verify `onlyFirstVisit` prop setting
3. Check console for errors
4. Ensure component is mounted in App.tsx

### Splash Stuck/Not Hiding

1. Check browser console for GSAP errors
2. Verify `maxWait` timeout is working (should auto-hide after 3.5s)
3. Test skip button functionality
4. Check if images in `waitImages` exist and are accessible

### Animation Not Smooth

1. Check for conflicting CSS animations
2. Verify GSAP is properly installed: `npm list gsap`
3. Test on different browsers
4. Check for performance issues in browser DevTools

### Skip Button Not Working

1. Verify focus is on skip button (should auto-focus)
2. Check keyboard event handlers
3. Test with different input methods (mouse, keyboard, touch)
4. Check browser console for JavaScript errors

## Migration from Old SplashScreen

The new `SplashOverlay` replaces the previous `SplashScreen` component:

### Key Differences

| Feature | Old (SplashScreen) | New (SplashOverlay) |
|---------|-------------------|---------------------|
| Animation | CSS keyframes | GSAP timeline |
| Storage | sessionStorage | localStorage |
| Preloading | None | Fonts + images |
| Skip Button | No | Yes |
| Timeout | Fixed | Configurable |
| Accessibility | Basic | Enhanced |

### Migration Steps

1. Replace `<SplashScreen />` with `<SplashOverlay />`
2. Remove sessionStorage logic
3. Add `waitImages` prop with critical assets
4. Install GSAP: `npm install gsap`
5. Test thoroughly

## Customization

### Change Animation Duration

Edit the GSAP timeline in `SplashOverlay.tsx`:

```typescript
// Faster entrance (default is 0.5s)
tl.fromTo(logoEl, { ... }, { duration: 0.3, ... });

// Faster exit (default is 0.8s)
out.to(el, { duration: 0.5, ... });
```

### Change Colors

Update CSS classes in `src/index.css`:

```css
.splash-overlay {
  background: hsl(var(--primary)); /* Change background */
}

.splash-skip {
  color: hsl(var(--accent)); /* Change skip button color */
}
```

### Replace Logo

Update the import in `SplashOverlay.tsx`:

```typescript
import logo from '@/assets/your-custom-logo.svg';
```

## Support

For issues or questions:
1. Check this documentation
2. Review test files for usage examples
3. Check main README.md
4. Open an issue on GitHub

## Version History

- **v1.0** (2024): Initial GSAP implementation with preloading and accessibility
