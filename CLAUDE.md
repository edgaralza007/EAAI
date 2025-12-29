# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based landing page for EA AI (formerly EAA Capital), an AI consulting firm. The site is built with Vite, React Router, TailwindCSS, Framer Motion for animations, and Lucide React for icons.

## Development Commands

### Run development server
```bash
npm run dev
# Opens at http://localhost:5173
```

### Build for production
```bash
npm run build
# Output: dist/
```

### Preview production build
```bash
npm run preview
```

### Testing
```bash
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with Vitest UI
npm run test:coverage # Run tests with coverage report
```

## Architecture

### Routing Structure
The app uses React Router with three main routes defined in `src/main.jsx`:
- `/` - Landing page (EAACapitalLanding.jsx)
- `/portfolio` - Portfolio page (Portfolio.jsx)
- `/about` - About page (About.jsx)

All pages share a common Header component with navigation.

### Component Organization
- **Page-level components**: `EAACapitalLanding.jsx`, `Portfolio.jsx`, `About.jsx`
- **Shared components**: `Header.jsx` (sticky navigation with mobile menu), `logo.jsx`
- **Inline components**: Many pages define small reusable components (Section, Container, Feature, etc.) locally rather than extracting them to separate files

### Styling Approach
- TailwindCSS for all styling via utility classes
- Custom gradient backgrounds and color scheme: indigo-600, blue-600, slate variants
- Responsive design with mobile-first breakpoints (sm:, md:, lg:)
- Framer Motion for entrance animations (opacity and y-axis transitions)

### Testing Setup
- Vitest configured with jsdom environment
- Testing Library for React component testing
- Test setup file: `src/test/setup.js` includes jest-dom matchers and automatic cleanup
- Test files follow the pattern `*.test.jsx` alongside their source files

### Public Assets
- `/public/team/` - Team member photos (Edgar.jpg, Clarem.jpg)
- `/public/services/` - Service feature images (process.jpg, website.jpg, saas.jpg, agents.jpg)
- `/public/logos/` - Client logos
- `/public/logo.png` - Company logo

### External Integrations
- **Amazon Connect Chat Widget**: Embedded in index.html for customer support chat
- **Formspree**: Contact form submission (endpoint: https://formspree.io/f/xqadveqj)
- **Calendly**: Scheduling link for consultations (https://calendly.com/edgar-eaacap/30min)

## Key Technical Details

### React Router Links
- Use `<Link>` from react-router-dom for internal page navigation (/portfolio, /about)
- Use `<a href="#section">` for same-page anchor navigation
- Use `<a href="/#section">` for cross-page anchor navigation (e.g., from /about to home page sections)

### Header Component Behavior
- Sticky positioning with border bottom
- Mobile menu toggles visibility with state
- Desktop nav hidden on mobile, hamburger icon shown instead
- Clicking mobile menu links closes the menu automatically

### Animation Patterns
Framer Motion is used consistently for page entrance animations:
```jsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: optionalDelay }}
>
```

### Form Handling
The contact form uses Formspree for server-side handling. Form fields:
- FullName (name="FullName")
- email (name="email")
- company (name="company")
- message (name="message")

## Content Updates

Primary content editing locations:
- Landing page copy: `src/EAACapitalLanding.jsx`
- About page team bios: `src/About.jsx` (PersonCard components)
- Portfolio items: `src/Portfolio.jsx` (currently minimal, placeholder for future content)
