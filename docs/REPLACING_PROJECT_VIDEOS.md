# Replacing your portfolio videos

Each example already has a working video. Replace its files when your own recording is ready. The video paths and display details are now collected in **`src/data/project-videos.ts`**; project descriptions stay in `src/data/projects.ts`.

## Open the correct project folder

Use a current checkout of production `main`, or the **Release worktree** printed by the publication script. The script preserves the original `C:\Users\techn\landl-tech` checkout, so that folder may still contain an earlier version. All paths below are relative to the current project folder you open in VS Code.

## Drop-in file map

| Example                 | Replace this MP4 inside `public/media/projects/` | Matching poster           | Visual-description track |
| ----------------------- | ------------------------------------------------ | ------------------------- | ------------------------ |
| Tow-N-Go website        | `tow-n-go-website.mp4`                           | `tow-n-go-website.webp`   | `tow-n-go-website.vtt`   |
| Crestline website       | `crestline-website.mp4`                          | `crestline-website.webp`  | `crestline-website.vtt`  |
| McKenzie House website  | `mckenzie-website.mp4`                           | `mckenzie-website.webp`   | `mckenzie-website.vtt`   |
| Tate’s TV interface     | `tates-tv-interface.mp4`                         | `tates-tv-interface.webp` | `tates-tv-interface.vtt` |
| Tow-N-Go content        | `tow-n-go-content.mp4`                           | `tow-n-go-content.webp`   | `tow-n-go-content.vtt`   |
| McKenzie launch content | `mckenzie-launch.mp4`                            | `mckenzie-launch.webp`    | `mckenzie-launch.vtt`    |

1. Keep a copy of the existing three files before replacing them. Export a real screen recording as **MP4 with H.264 video**; use AAC if it has audio. A 1080p landscape recording is a useful website-tour master. MP4 is a container: an HEVC-only export is not the same as H.264.
2. Replace the matching MP4. Update the poster from the new recording, retaining its existing filename, or point `poster` at your own local image file.
3. In `src/data/project-videos.ts`, update that example’s title, description, `durationLabel`, `width` and `height`. Use `portrait: true` for vertical footage and omit it for landscape footage. Set `hasAudio: true` for a narrated or music-backed recording.
4. Update the matching `.vtt` visual-description track so it describes the new scenes and timing. The visible `description` should summarize what the viewer will see.
5. For narration, add an accurate English WebVTT captions file in the same folder and set `captionsTrack` to its public path. The native player displays a captions control when a track is provided.
6. Run the quality checks, play the video with sound/captions on desktop and phone, then commit the changed files. Publish through the repository’s normal branch/Quality/production workflow. A file saved locally does not update the live website until it is deployed.

Example additions for a narrated McKenzie replacement:

```ts
hasAudio: true,
captionsTrack: "/media/projects/mckenzie-website-captions.vtt",
durationLabel: "45 sec",
width: 1920,
height: 1080,
```

These lines are an example, not an active captions reference. Create the captions file before adding its path to the live mapping. No empty placeholder files are shipped.

## Suggested recordings

Aim for about **40–50 seconds**, with a few seconds to read each important view. These are editorial suggestions, not a claimed conversion benchmark. Start at the homepage, move deliberately and show two useful interactions. End on a clear next step without submitting a form or making a booking.

| Project                  | Suggested sequence                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Tow-N-Go                 | Homepage → Trailer Rentals → Enclosed Trailers → gallery photo → Request This Trailer, showing the prefilled enquiry                  |
| Crestline                | Homepage → Custom Homes service → Projects → Custom Homes gallery → a complete real project entry                                     |
| McKenzie House           | Homepage → Sensory Massage → treatment preview and pricing → Reviews → one or two client photo stories                                |
| Tate’s TV                | Channel guide → on-screen remote → an interaction you have verified works; keep programming availability and playback claims accurate |
| Tow-N-Go monthly content | A real approved Reel or short campaign example; preserve the distinction between customer loading and Tow-N-Go hauling                |
| McKenzie launch          | The existing before-and-after creative or a short edit of the actual on-site photography and treatment footage                        |

Close unrelated tabs, notifications and personal information before recording. Use the real site and supplied assets. Avoid exposing administrative screens, booking/customer data or private inboxes in a public portfolio clip.

## Playback behaviour

The player retains native controls, inline mobile playback, an accessible description, no autoplay and `preload="none"`. Starting one preview pauses the other examples on that page. Local media requires no new API key, embed provider or third-party tracking.

The September 9 update keeps the six approved media files unchanged. Interior pages were inspected, but the fuller browser captures could not be transferred for video export. No longer tour or continuous click recording is claimed as delivered in this update.
