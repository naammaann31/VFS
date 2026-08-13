# Vectra Foreign Services — Website

Marketing and lead-generation site for Vectra Foreign Services (immigration & visa consulting).
Live at <https://vectraforeignservices.com/>, hosted on Hostinger.

## Stack

| | |
|---|---|
| Framework | React 19 |
| Router | react-router-dom 7 (SPA, `BrowserRouter`) |
| Build | Vite (rolldown-vite) |
| Animation | framer-motion |
| Smooth scroll | lenis |
| 3D globe | three + react-globe.gl |
| Styling | Plain CSS, one file per component |
| Forms backend | `public/send_mail.php` (PHP `mail()` on Hostinger) |

## Getting started

```bash
npm install
npm run dev      # dev server
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

## Project layout

```
index.html            Vite entry, all SEO/OG meta tags
public/               Copied verbatim into dist/ at build time
  .htaccess           SPA rewrite rules (required for client-side routing)
  send_mail.php       Form endpoint — CORS lock, honeypot, rate limit, HTML email
  assets/globe/       Globe textures (referenced by absolute path)
  *_images/           Country hero slideshow images
  sitemap.xml, robots.txt, favicon.png, logo.webp, hero videos
src/
  main.jsx            createRoot entry
  App.jsx             Router + lazy-loaded routes + Footer/WhatsApp
  index.css           Global styles, CSS custom properties
  assets/             Imported (hashed) assets: logos, certification badges, bg video
  components/         Navbar, Footer, WhatsAppWidget, LoadingScreen,
                      ServiceCTA, GlobeTransition, SmoothScroll
  context/
    TransitionContext.jsx   Globe fly-to-country page transition
  data/
    countryData.js    All 7 country pages' content (copy, pathways, images)
  pages/              Home, About, Services, Resources, Contact,
                      CheckEligibility, CountryPage, ThankYou
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/resources` | Resources (language coaching) |
| `/contact` | Contact + FAQs |
| `/check-eligibility` | 5-step eligibility wizard |
| `/country/:countryName` | Country page (`canada`, `usa`, `uk`, `europe`, `nz`, `uae`, `australia`) |
| `/thank-you` | Post-submission confirmation |
| `*` | Redirects to `/` |

## Forms

Both the Contact form and the eligibility wizard `POST` JSON to `/send_mail.php`,
which emails `info@vectraforeignservices.com`. The endpoint enforces:

- Origin/referer allowlist for the production domain
- A `website` honeypot field (hidden; bots fill it, humans don't)
- Rate limiting: 5 submissions per IP per 10 minutes
- Server-side validation of name / email / phone

Because it depends on PHP `mail()`, forms only work on the Hostinger host —
not in local `npm run dev`.

## Deploying

`npm run build`, then upload the **contents** of `dist/` to `public_html/` on
Hostinger. `.htaccess` and `send_mail.php` are included in the build output
automatically (they live in `public/`).

The build also emits `.gz` siblings for JS/CSS via `vite-plugin-compression`.

## Provenance

The original source was lost; this repository was reconstructed in August 2026
from the deployed production bundle plus the live site. The build was verified
against production by rendering all 14 routes headlessly and diffing the
resulting DOM — visible text and applied CSS classes matched exactly on every
route, and every output chunk is within ~3% of the original's size.

Two deliberate differences from the original source:

- The UAE flag was an inline base64 data URI; it is now a real asset at
  `src/assets/UAE.webp`.
- The eligibility score used chained ternaries; it now uses lookup tables
  (`educationPoints`, `experiencePoints`, `languagePoints`) with identical results.

Original variable names and code comments could not be recovered from the
minified bundle, so names and comments here are new.
