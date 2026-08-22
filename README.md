# Rohan Bist — Portfolio Hero

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Before running

Add your profile photo at:
```
public/images/profile.jpg
```
Portrait orientation recommended (3:4 ratio). The photo will be cropped to center-top and fade out at the bottom.

## Customise

All personal content lives in `lib/data.ts` — update your real GitHub / Instagram / LinkedIn URLs there.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Framer Motion**
- **Fonts**: Clash Display + Sora via [Fontshare](https://www.fontshare.com)

## Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout — fonts, grain, cursor
│   ├── page.tsx            # Navbar + Hero
│   └── globals.css         # CSS vars, resets
├── components/
│   ├── nav/Navbar.tsx      # Sticky nav with scroll glassmorphism
│   ├── sections/Hero.tsx   # Layered hero (bg text → photo → bottom bar)
│   └── ui/
│       ├── GrainOverlay.tsx
│       └── CustomCursor.tsx
├── styles/fonts.css        # Fontshare @font-face
├── lib/data.ts             # Content — name, role, socials
└── public/images/          # profile.jpg goes here
```
