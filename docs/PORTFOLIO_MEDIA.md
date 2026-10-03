# Portfolio preview media

Website and software case studies use real screenshot galleries. McKenzie’s launch page retains its local MP4, poster and WebVTT visual-description track. Tow-N-Go’s monthly page contains a short introduction and Facebook, Google and TikTok links, with no local video or campaign gallery. Its original social-content media record and poster remain for homepage/services previews. `src/data/project-videos.ts` owns retained media records; `src/data/projects.ts` owns case-study screenshots. See [Client showcase](CLIENT_SHOWCASE.md) for capture provenance and gallery editing. No third-party player, iframe, tracker or API key is required.

## Historical media provenance — September 8, 2026

| Preview                 | Source                                                           | Treatment                                                                                                                                                                      |
| ----------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tow-N-Go website        | Public `https://www.towandgotrailers.ca/`, captured September 8  | 26-second scroll animation from actual viewport/full-page browser captures. The viewport capture preserves fixed hero imagery.                                                 |
| Crestline website       | Public `https://www.crestlinepainting.ca/`, captured September 8 | Same capture treatment, showing services, company, gallery and quote pathway.                                                                                                  |
| McKenzie House website  | Public `https://mckenziehousemassage.ca/`, captured September 8  | Same capture treatment, showing treatment imagery, services and booking pathway.                                                                                               |
| Tate’s TV interface     | Public `https://www.tatestv.ca/`, captured September 8           | 16-second crossfade between actual guide and cropped remote-control screens. Described as an interface preview, not a recording of successful streaming.                       |
| Tow-N-Go social content | Tate-supplied `Tow-N-Go-Trailers-Advert-TikTok(1).mp4`           | Original fleet education creative, converted from HEVC to H.264. Silent portfolio copy; original unchanged.                                                                    |
| McKenzie launch         | Tate-supplied `1000021184.mp4`                                   | Original before-and-after showcase, converted from HEVC to H.264. Silent portfolio copy; original unchanged. The earlier website is explicitly identified as the before state. |

The four website/software video sets in this historical record have been removed from the build after screenshot galleries replaced them. The two original Tate-supplied social/content sets remain; only McKenzie’s launch has a player on its case-study page. The former scroll previews were rendered from real captured page images, not continuous interaction recordings or evidence of transactions/application performance. No people, logos, business facts, reviews or client screens were generated for those previews. The source record is retained for provenance.

## Retired Tow-N-Go gallery additions — October 2, 2026

| Gallery example       | Supplied original                                    | Web copy                                                                  |
| --------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------- |
| Halloween campaign    | `TikTok-Advert-Halloween-Chads-Tow-N-Go).mp4`        | 720 × 1280 H.264/AAC, 51.502 seconds; `tow-n-go-halloween-2026.mp4`       |
| Ready for what’s next | `0921Chad's-Tik-Tok-Advert-FACEBOOK-Tiktok-Reel.mp4` | 720 × 1280 H.264/AAC, 32.740 seconds; `tow-n-go-ready-for-whats-next.mp4` |

These Tate-supplied promotional edits were prepared as campaign creative. Posters were frames extracted from those actual videos; no footage, logo or campaign result was invented. Both source uploads were unchanged. The web versions preserved audio, used yuv420p and moved the MP4 index before the media for progressive playback. Visual descriptions reflected the footage and on-screen text; they were not a transcript of unverified audio. Original video/audio rights remain with their respective owners.

The campaign gallery and both promotional file sets were removed when the monthly page was simplified to its introduction and channel links. The table above is a historical provenance record, not an active asset list. Tow-N-Go’s website case study remains screenshot-only, and monthly partnership entry links remain. Current media replacement instructions are in [Replacing social/content media](REPLACING_PROJECT_VIDEOS.md).

## Current McKenzie launch playback

- H.264 Main, yuv420p, MP4, 30 fps, fast-start metadata, two-second keyframes and bounded bitrate. No HEVC-only web delivery.
- Native play/pause, seeking and full-screen controls. Inline playback on supported mobile browsers, no autoplay or looping, and `preload="none"`.
- Starting an example pauses other project videos on that page. Posters and written project content remain available without client JavaScript.
- The preview has a visible equivalent description and a WebVTT description track. The silent copy has no spoken audio requiring captions. Future narrated replacements must include accurate captions.
- Portrait content keeps its aspect ratio; landscape content is contained without cropping. The media link remains available if embedded playback fails.
- The existing same-origin media CSP is retained. No new third-party hosts are allowed.

## Capture limitation requiring follow-up

During the September 8 public Tate’s TV capture, the browser showed a video-format playback error and a programming-load error. The guide and remote UI could be inspected, but streaming was not verified. The interface preview must not be used as evidence that the live media engine works in every browser. Investigate the separate Tate’s TV project before making that claim. The advertisement retrieved for Tate’s TV contained entertainment footage rather than an application walkthrough and was not added to this website.

## Updating a preview

Use real approved footage. Replace the corresponding MP4, poster and description track together, update the typed dimensions, duration and copy in `src/data/project-videos.ts`, and rerun the quality gates. Keep paths stable only when the content is intended to replace that exact preview. Narrated replacements can set `hasAudio: true` and provide an accurate `captionsTrack`.

See [Replacing social/content videos](REPLACING_PROJECT_VIDEOS.md) for the active file sets and configuration instructions. Website/software examples should be updated through their screenshot galleries instead.

`npm run validate` checks local media references. `npm run smoke` checks McKenzie’s launch player, no autoplay, native controls, equivalent descriptions, media assets and MP4 range requests, plus any supplied captions. Tow-N-Go’s monthly-page checks cover the channel links and absence of a local player or detailed case-study sections. Website and software case studies use screenshot checks. Codec, duration, fast-start layout and representative frames were checked with FFmpeg/ffprobe during preparation. Browser and device playback still require separate review; source and HTTP checks do not establish that result.

## Crestline: Other Design Options

The compact gallery appears only within the Crestline case study on
`/projects/crestline`. It supplements the completed live-site example; the old category/hash link still reaches the Crestline index card.
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
