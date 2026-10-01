# Kongllective

Next.js source migrated from ChatGPT Sites version 13, preserving the brand assets and all four studio partners.

## Development

Run `npm ci`, then `npm run dev`. Checks: `npm run lint` and `npm run build`.
Netlify builds with `npm run build` on Node 22.

## Migration checkpoint

- GitHub branch: `codex/sites-to-netlify`; PR #1 is ready for review. Merge to `main` requires Alex's explicit approval.
- Netlify project: `kongllective` (`db1d37f2-5266-4ccd-ab07-cb5766eb4d6b`), Kong Designs team.
- On October 1, 2026, Netlify reported a ready production deploy for the initial `main` commit `7e1c40b78b790f7c730e500625fc875a931846c7`. That commit contains only the initial repository content; it is not the migrated website.
- A branch update was sent after Alex configured the GitHub connection to check automatic Deploy Preview generation. Preview generation and runtime validation remain pending.
- The contact API uses `CONTACT_WEBHOOK_URL`, configured as a secret in Netlify and connected to the existing active Kongllective Leads workflow in n8n. Never commit its value.
- `/exodo/saas` embeds the demo from Google Drive. Anonymous playback was verified in the browser (1:13 video, with visible frames and advancing playback).
- Remaining: verify automatic Deploy Preview generation, validate the homepage, contact API and public video playback, then obtain release approval before the domain cutover.
- Keep HeyReach in DRAFT and preserve its campaign link during migration.

Validation completed before connection: production build passes; lint has no errors and five existing image optimization warnings; nine contact API checks pass with outbound requests mocked. No live lead notifications were sent during testing.
