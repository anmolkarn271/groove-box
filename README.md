# The Groove Box — Setup Guide

A retro vinyl-styled song player that searches YouTube and plays full-length
songs through YouTube's own official embedded player.

## What's inside
- `index.html` — the app itself
- `manifest.json` — makes it installable ("Add to Home Screen")
- `service-worker.js` — caches the app shell
- `icon-192.png`, `icon-512.png` — app icons

## Why do I need to paste in an API key?
Searching YouTube requires the YouTube Data API v3, and Google requires
every app to use its own key so usage can be tracked and rate-limited per
developer — there's no keyless way around this. It's free for normal
listening use (the free daily quota is generous), just not automatic.
Playback itself (once you've picked a video) doesn't need the key at all —
it plays through YouTube's standard embedded player, same as embedding a
YouTube video on any website.

## Step 1 — Get your free YouTube API key (~2 minutes)
1. Go to https://console.cloud.google.com/ and sign in with any Google
   account.
2. Create a new project (top left project dropdown -> "New Project").
3. Go to **APIs & Services -> Library**, search for **"YouTube Data API
   v3"**, and click **Enable**.
4. Go to **APIs & Services -> Credentials -> Create Credentials -> API
   key**.
5. Copy the key it gives you.

That's it — no billing setup required for the free quota.

## Step 2 — Add the key to the app
Open the app, tap the gear icon (top right), paste your key, tap **Save**.
It's stored only in your browser's local storage on your device.

## Step 3 — Host it (for install / offline shell / APK)
Service workers and "Add to Home Screen" need **https** (or `localhost`) —
opening `index.html` directly by double-clicking it won't support those
parts, though search and playback will still work in a normal browser tab.
Free hosting options:

- **GitHub Pages**: upload these files to a repo, enable Pages in
  Settings -> Pages.
- **Netlify Drop**: https://app.netlify.com/drop — drag this folder in,
  get a live https URL instantly, no account needed.

## Step 4 — Install to your phone
Once hosted on https, open the URL in Chrome on your phone -> **menu ->
Add to Home screen**. It behaves like a native app from there.

## Step 5 (optional) — Real .apk file
Go to **https://www.pwabuilder.com**, paste your hosted https URL, then
**Package for Stores -> Android** to download an installable `.apk`. I
can't compile this myself in my current environment (no Android build
tools or live network access here), but PWABuilder does it for free.

## A note on how playback works
This app never downloads, extracts, or re-hosts audio from YouTube — it
loads YouTube's own player (with YouTube's ads, as YouTube's terms
require) for whichever video you pick from search results. That's the
same thing as embedding a YouTube video on a blog; it's just wrapped in
retro player styling here.
