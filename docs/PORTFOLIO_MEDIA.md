# Portfolio preview media

Media prepared September 8, 2026; replacement workflow updated September 9. Every project entry points to one local MP4, one WebP poster and one WebVTT visual-description track in `public/media/projects`. `src/data/project-videos.ts` is the canonical media mapping. No third-party player, iframe, tracker or API key is required.

## Sources and editorial treatment

| Preview                 | Source                                                           | Treatment                                                                                                                                                                      |
| ----------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tow-N-Go website        | Public `https://www.towandgotrailers.ca/`, captured September 8  | 26-second scroll animation from actual viewport/full-page browser captures. The viewport capture preserves fixed hero imagery.                                                 |
| Crestline website       | Public `https://www.crestlinepainting.ca/`, captured September 8 | Same capture treatment, showing services, company, gallery and quote pathway.                                                                                                  |
| McKenzie House website  | Public `https://mckenziehousemassage.ca/`, captured September 8  | Same capture treatment, showing treatment imagery, services and booking pathway.                                                                                               |
| Tate’s TV interface     | Public `https://www.tatestv.ca/`, captured September 8           | 16-second crossfade between actual guide and cropped remote-control screens. Described as an interface preview, not a recording of successful streaming.                       |
| Tow-N-Go social content | Tate-supplied `Tow-N-Go-Trailers-Advert-TikTok(1).mp4`           | Original fleet education creative, converted from HEVC to H.264. Silent portfolio copy; original unchanged.                                                                    |
| McKenzie launch         | Tate-supplied `1000021184.mp4`                                   | Original before-and-after showcase, converted from HEVC to H.264. Silent portfolio copy; original unchanged. The earlier website is explicitly identified as the before state. |

The website scroll previews are rendered from real captured page images. They are not continuous recordings of pointer interactions, transactions, or application performance. No people, logos, business facts, reviews or client screens were generated for these previews. Visuals already supplied by Tate or published on the client websites remain as supplied.

## Playback and performance

- H.264 Main, yuv420p, MP4, 30 fps, fast-start metadata, two-second keyframes and bounded bitrate. No HEVC-only web delivery.
- Native play/pause, seeking and full-screen controls. Inline playback on supported mobile browsers, no autoplay or looping, and `preload="none"`.
- Starting an example pauses other project videos on that page. Posters and written project content remain available without client JavaScript.
- Each preview has a visible equivalent description and a WebVTT description track. These silent copies have no spoken audio requiring captions. Future narrated replacements must include accurate captions.
- Portrait content keeps its aspect ratio; landscape content is contained without cropping. The media link remains available if embedded playback fails.
- The existing same-origin media CSP is retained. No new third-party hosts are allowed.

## Capture limitation requiring follow-up

During the public Tate’s TV capture, the browser showed a video-format playback error and a programming-load error. The guide and remote UI could be inspected, but streaming was not verified. The interface preview must not be used as evidence that the live media engine works in every browser. Investigate the separate Tate’s TV project before making that claim. The advertisement retrieved for Tate’s TV contained entertainment footage rather than an application walkthrough and was not added to this website.

## Updating a preview

Use real approved footage. Replace the corresponding MP4, poster and description track together, update the typed dimensions, duration and copy in `src/data/project-videos.ts`, and rerun the quality gates. Keep paths stable only when the content is intended to replace that exact preview. Narrated replacements can set `hasAudio: true` and provide an accurate `captionsTrack`.

See [Replacing your portfolio videos](REPLACING_PROJECT_VIDEOS.md) for all six filenames, configuration instructions and suggested page-by-page recordings. The September 9 update retains the existing media: new interior-page captures could not be transferred for video export, so no fuller click-through recording is included.

`npm run validate` checks local media references. `npm run smoke` checks all six players, no autoplay, native controls, equivalent descriptions, all 18 current media assets and MP4 range requests. It also checks any captions files added to the rendered players. Codec, duration, fast-start layout and representative frames were checked with FFmpeg/ffprobe during preparation. Actual browser playback on the new build still needs device review; local and protected preview browsing was unavailable in this environment.

# Crestline: Other Design Options

The compact gallery appears only within the Crestline case study on
`/projects/web-builds#crestline`. It supplements the completed live-site example.
Gallery labels describe visual options without claiming client approval or a
sequence of client decisions.

- `public/images/projects/crestline-options/architectural-home.jpg`: homepage
  captured from `https://crestlinepreview.vercel.app/` on September 12, 2026.
- `public/images/projects/crestline-options/architectural-services.jpg`: services
  layout captured from `https://crestlinepreview.vercel.app/services` on the same date.
- `public/images/projects/crestline-options/colour-and-craft.png`: AI-assisted
  painting website design mockup created for this gallery. This is a studio
  exploration, not a separate client, deployed site or delivered Crestline build.

`src/data/projects.ts` owns the gallery descriptions, image paths, dimensions and
alt text. Replace an image at its exact path and update its dimensions when needed.
Images are lazy loaded in the gallery. Selecting one opens a native modal with
Escape, a close button and focus restoration; without JavaScript, its link opens
the original image. No third-party embed or gallery package is used.
