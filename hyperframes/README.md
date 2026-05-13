# Hyperframes compositions

HTML compositions rendered to deterministic MP4 by [hyperframes](https://github.com/heygen-com/hyperframes). The MP4s land in `../public/videos/hyperframes/` and are consumed by the Next.js app.

## One-time setup

```bash
cd hyperframes
npm install
```

## Author / preview

```bash
npm run preview   # live-reload browser preview
```

## Render

```bash
npm run render:hero       # hero-intro.mp4
npm run render:projects   # project-reel.mp4
npm run render:all
```

The output MP4s are written to `public/videos/hyperframes/` and served as `/videos/hyperframes/<name>.mp4` by Next.

## Files

- `compositions/hero-intro.html` — 6s animated intro shown subtly behind the hero text.
- `compositions/project-reel.html` — 10s project showcase header for the projects section.
- `assets/` — fonts, images, audio referenced by compositions.

## Kling clips

Kling-generated motion clips live in `public/videos/kling/` (sibling tree). See `public/videos/kling/README.md` for recommended prompts.
