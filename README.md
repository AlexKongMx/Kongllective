# Kongllective

Next.js source migrated from ChatGPT Sites version 13, preserving the brand assets and all four studio partners.

## Development

Run `npm ci`, then `npm run dev`. Checks: `npm run lint` and `npm run build`.
Netlify builds with `npm run build` on Node 22.

## Migration checkpoint

- Release branch: `codex/sites-to-netlify`; PR #1. Alex explicitly authorized publishing to `main` on October 2, 2026 while requesting the final Éxodo showcase changes.
- Netlify project: `kongllective` (`db1d37f2-5266-4ccd-ab07-cb5766eb4d6b`), Kong Designs team.
- On October 1, 2026, Netlify reported a ready production deploy for the initial `main` commit `7e1c40b78b790f7c730e500625fc875a931846c7`. That commit contains only the initial repository content; it is not the migrated website.
- Automatic GitHub → Netlify Deploy Previews and Next.js runtime were verified on deploy `6abedb192e0eea000843a408` (commit `d041e42`). Homepage and demo returned 200; contact validation, honeypot and rate limiting passed without sending live lead notifications.
- The contact API uses `CONTACT_WEBHOOK_URL`, configured as a secret in Netlify and connected to the existing active Kongllective Leads workflow in n8n. Never commit its value.
- `/exodo/saas` now serves the demo directly from `/media/exodo/saas-demo-v1.mp4` with native controls, sound on user play, inline mobile playback and a poster. The original Drive file `1_waxqx3OR0Lui9SvqJGSMVUSQHV2_-4u` (104,746,763 bytes) was encoded as H.264 Main / AAC, 1280×720, 24 fps, yuv420p, faststart. Output: 9,182,978 bytes, 72.68 seconds. Original source remains in Drive. Mobile typography and video sizing stay within the viewport.
- `/exodo/casino` keeps all seven characters in one gallery, without the duplicate hero character. Samples open in a native modal with previous/next arrows, wraparound, horizontal touch gestures, keyboard arrows, Escape, close button and backdrop dismissal. The modal locks background scroll and restores focus. Both showcase pages contact Alex at WhatsApp `+1 672 472 1285`; neither links to the other or provides a separate direct-video link. JPG/MP4 media stays hosted as same-origin files.
- Before merging, validate the latest automatic preview. After merge, verify the production pages. Physical iPhone/Android testing and real contact-form lead delivery remain unverified. Domain/DNS changes and campaign launches are separate actions.
- Keep HeyReach in DRAFT and preserve its campaign link during migration.

Validation completed before connection: production build passes; lint has no errors and five existing image optimization warnings; nine contact API checks pass with outbound requests mocked. No live lead notifications were sent during testing.
