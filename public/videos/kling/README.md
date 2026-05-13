# Kling motion clips

Drop Kling-generated MP4s here. The site references these exact filenames:

| Filename                  | Where it plays                | Suggested length | Aspect       |
|---------------------------|-------------------------------|------------------|--------------|
| `hero-backdrop.mp4`       | Hero section, behind text     | 6–10s, looping   | 16:9 / 1920x1080 |
| `nava-loop.mp4`           | Featured project card preview | 4–6s, looping    | 16:9         |

If a file is missing, the component renders nothing and the existing gradient/3D backdrop stays intact — so you can drop clips in incrementally without touching code.

## Recommended Kling prompts

### `hero-backdrop.mp4`
> Slow, cinematic flythrough of an indigo-violet abstract data nebula. Soft glowing nodes connected by thin neon lines, subtle particles drifting right. Deep navy background, no text, no people. Loopable. 16:9.

### `nava-loop.mp4`
> Stylised dating-app UI moving across a glassy purple-pink gradient. Soft card shuffles, gentle parallax. No text, no faces. Loopable.

## Tips

- Mute clips at export time so the site doesn't need `muted` JS hacks.
- Re-encode with H.264 + AAC at ≤2 Mbps for fast page loads:
  ```bash
  ffmpeg -i input.mp4 -c:v libx264 -crf 26 -preset slow -movflags +faststart -an output.mp4
  ```
- Target file size: ≤3 MB per hero clip. Anything bigger will hurt LCP.
