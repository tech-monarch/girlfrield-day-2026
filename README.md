# For My Constellation

A small universe, built for Mitchelle. React + Vite + Tailwind + Framer Motion.

## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

## Adding your content

1. Drop photos into `public/images/` following the filenames listed in
   `public/images/README.md`.
2. Drop your music file into `public/music/` as `perfect.mp3`
   (see `public/music/README.md`, there's a note there about licensing).
3. All of the written content, memories, reasons, timeline, and the love
   letter live in one place: `src/data/content.js`. Edit the text there and
   it updates everywhere it's used.
4. The password is `2025` (the year, per the hint on the lock screen). To
   change it, edit `CORRECT` in `src/components/PasswordGate.jsx`.

## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo to Vercel's dashboard and it will auto-detect
the Vite build (`npm run build`, output directory `dist`).

## What's built in this release

- Cinematic loading sequence into a password lock screen
- Hero chapter with the mirror selfie and opening lines
- Our Story, a real timeline built from your memories (the number, Kilimanjaro,
  Pleasure Park, the cinema)
- Moments I'll Never Forget, a tap-to-enlarge polaroid gallery
- Reasons I Love You, floating cards with a "tell me another reason" button
- A live relationship timer counting from December 4, 2025, 11:50 PM
- Heart Catch, a 30 second mini-game
- An interactive, envelope-opening love letter
- A signable Certificate of Forever with PNG download
- A grand finale closing sequence
- A persistent glass music player that never restarts across sections
- Mobile-first, keyboard-accessible, and respects reduced-motion settings

## What's next (from the original spec, not yet built)

The full spec describes an even bigger experience. These are the pieces
intentionally left for a focused follow-up pass, so each one gets the same
care as what's here rather than being rushed:

- Day / Night atmosphere toggle with a slow world transition
- Our Little Universe (the full interactive galaxy of stars and planets)
- Create-a-Star flow with a downloadable star certificate
- Love Quiz and Memory Match mini-games
- Custom cursor and ambient sound design
- Hidden easter eggs (keyboard secrets, idle messages, time-based greetings)
- Video memory cards in the gallery

If you'd like any of these added, just ask and they can be built into this
same project.

## Design system (v2)

This version replaced the original single pink/purple glassmorphism template
with a scene-driven system: every chapter now has its own palette, particle
language, and layout composition, defined in `src/components/Atmosphere.jsx`.
Typography moved to DM Serif Display / Cormorant Garamond (headings), Manrope
(body), and Great Vibes (handwriting). A film-grain overlay runs across the
whole site for texture, and the music player is now a real playlist
(Perfect, Photograph, Lost Stars) with shuffle, repeat, and a queue.
