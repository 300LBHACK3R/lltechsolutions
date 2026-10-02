# Adding and replacing social/content videos

Only the Tow-N-Go monthly content and McKenzie launch case studies use video. Website/software examples use screenshot galleries; update those through [Client showcase](CLIENT_SHOWCASE.md). The four retired website/software video sets are no longer in this build.

Work in the current `landl-tech/` checkout on your review branch. All paths below are relative to that project folder. Video paths and display details live in `src/data/project-videos.ts`; project descriptions stay in `src/data/projects.ts`.

## Active file sets

| Example                     | MP4 in `public/media/projects/`     | Matching poster                     | Visual-description track            |
| --------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| Tow-N-Go fleet education    | `tow-n-go-content.mp4`              | `tow-n-go-content.webp`             | `tow-n-go-content.vtt`              |
| Tow-N-Go Halloween campaign | `tow-n-go-halloween-2026.mp4`       | `tow-n-go-halloween-2026.jpg`       | `tow-n-go-halloween-2026.vtt`       |
| Tow-N-Go service promotion  | `tow-n-go-ready-for-whats-next.mp4` | `tow-n-go-ready-for-whats-next.jpg` | `tow-n-go-ready-for-whats-next.vtt` |
| McKenzie launch content     | `mckenzie-launch.mp4`               | `mckenzie-launch.webp`              | `mckenzie-launch.vtt`               |

1. Preserve the current files in Git history before replacing them. Export approved footage as MP4 with H.264 video and AAC if it has audio. MP4 is a container; an HEVC-only export is not equivalent to H.264.
2. Replace the matching MP4 and poster. Keep the existing paths when replacing that exact example, or update the mapping to the new local paths.
3. In `src/data/project-videos.ts`, update the title, description, `durationLabel`, `width` and `height` to match the actual export. Set `portrait: true` for vertical footage and `hasAudio: true` when audio is present.
4. Update the WebVTT visual-description track to match the scenes/timing and the visible description to summarize the clip. For narration, add accurate English WebVTT captions and set `captionsTrack` to that file's public path after the file exists.
5. Run the [quality gates](../README.md#commands), then check playback, sound, captions, seeking and the fallback media link on desktop and phone. Publish through the normal branch/review/deployment workflow; local file changes do not update the live website.

For example, a narrated replacement for McKenzie's launch might add `hasAudio: true` and `captionsTrack: "/media/projects/mckenzie-launch-captions.vtt"`. That captions path is illustrative and must not be added to the mapping until the real matching file exists. Always use the actual duration and dimensions.

## Add another promotional example

1. Put the web-ready MP4, its real-frame poster and matching visual-description VTT in `public/media/projects/`. Use a new descriptive filename; preserve the original export outside the public web folder.
2. Add its typed record to `src/data/project-videos.ts`: title, short category, description, paths, duration and actual dimensions. Preserve approved audio and set `hasAudio` correctly. Only wire a captions track after its audible content has been accurately transcribed; a visual-description track is not full audio captioning.
3. Add that record to `contentVideos` on `tow-n-go-digital` in `src/data/projects.ts`, in the desired display order. The existing `video` record remains the featured preview for homepage/services. There is no hard-coded card limit or separate gallery dataset.
4. Update the expected approved video count/paths in `scripts/smoke-check.mjs`, then run the quality gates and browser playback checks. No design/component change is needed for a fourth, fifth or sixth video.

The live gallery is `/projects/tow-n-go-digital`, reached through **Explore the monthly partnership** on Tow-N-Go's website case study. Its Facebook and TikTok links stay visible above the gallery. It shows three columns on wide screens, two on tablets and one on phones, with each clip playing in its own card. There is no modal to close or automatic playback.

## Content and playback

Use a real approved Reel or campaign example for Tow-N-Go, preserving the distinction between customer loading and Tow-N-Go hauling. For McKenzie, use the approved before-and-after creative or an edit of the actual on-site photography/treatment footage. Do not expose administrative screens, customer/booking data, notifications or private inboxes.

The player keeps native controls, inline mobile playback, an accessible description, no autoplay and `preload="none"`. Starting a preview pauses other project videos on the page. Local media requires no API key, embed provider or tracking script. See [Portfolio media](PORTFOLIO_MEDIA.md) for original sources and historical verification limits.
