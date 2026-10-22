# Channel walkthrough videos

Three exports of the existing Capgo console animations, introduced on the empty Channels page by [Cap-go/capgo.app#3840](https://github.com/Cap-go/capgo.app/pull/3840).

## Visual source

Pinned source commit: `e7f7886b069ea737ced54690bff18f0fabf0238e` in [Cap-go/capgo.app](https://github.com/Cap-go/capgo.app/tree/e7f7886b069ea737ced54690bff18f0fabf0238e).

| Output | Source in `src/components/dashboard/` | Duration |
| --- | --- | --- |
| `default-routing.mp4` | `ChannelDefaultRoutingMockup.vue` | 12.00 s |
| `device-self-assignment.mp4` | `ChannelSelfAssignMockup.vue` | 20.20 s |
| `console-device-override.mp4` | `ChannelConsoleAssignMockup.vue` | 15.47 s |

The components were mounted with `embedded: true`, their English translations, the original theme stylesheet, and the original GSAP timelines. Capture uses the light theme at 1280 × 800, 30 fps. Only the replay/navigation controls were hidden, onboarding step labels were replaced with scene names, and the canvas height was set to 610 px. Each complete timeline is followed by a 2.5 s hold. No account or customer data was recorded.

To capture again, mount the pinned components in an isolated Vue/Vite page with their stylesheet, icons, translations, and `useOnboardingChannelAnimation` composable. In the capture copy of that composable, pause the result of `buildTimeline()` rather than playing it. Seek that timeline to `frame / 30` before each browser screenshot, keeping it at its final time for the hold. Encode the frames with FFmpeg using H.264 (`libx264`, CRF 20, `yuv420p`) and `-movflags +faststart`. Posters show each completed sequence.

## Music

- Track: **Dust on the Morning Keys**
- Collection/author: [Open Lo-Fi / btahir](https://github.com/btahir/open-lofi)
- Release: [v1.0.0](https://github.com/btahir/open-lofi/releases/tag/v1.0.0), `dust-on-the-morning-keys.mp3` inside `openlofi.zip`
- Catalog and license reference: commit [`49a4aa7266a5974ea721007db1349d5cde2a6c44`](https://github.com/btahir/open-lofi/tree/49a4aa7266a5974ea721007db1349d5cde2a6c44)
- License: **CC0 1.0 Universal**. The author states that these tracks were generated using Suno and donated to the public domain. The supplied dedication is preserved in `MUSIC-LICENSE.txt`.
- Edit: excerpt starting at 8 s; normalized to -25 LUFS, 0.7 s fade-in and 1 s fade-out; AAC at 48 kHz / 96 kbps. No narration.

For each silent export, the audio was added with:

```sh
ffmpeg -i scene-silent.mp4 -ss 8 -i dust-on-the-morning-keys.mp3 \
  -map 0:v:0 -map 1:a:0 -c:v libx264 -preset medium -crf 20 \
  -vf "scale=in_range=pc:out_range=tv,format=yuv420p" -color_range tv \
  -af "loudnorm=I=-25:TP=-3:LRA=7,afade=t=in:st=0:d=0.7,afade=t=out:st=END_MINUS_ONE:d=1" \
  -ar 48000 -c:a aac -b:a 96k -t DURATION -movflags +faststart scene.mp4
```

Use the export duration for `DURATION` and its duration minus one second for `END_MINUS_ONE`.

Assets live in the website's shared public directory. `apps/docs/scripts/sync_public.ts` copies the MP4s and posters referenced by the channel guide into the docs build. Players load on demand and do not autoplay.
