# Painting template screenshots

Put actual screenshots of the painting demo in this folder. Use lowercase filenames such as `home-desktop.webp`, `services-desktop.webp`, `projects-desktop.webp` and `home-mobile.webp`.

Add each image to `src/data/painting-demo.json`:

```json
{
  "url": null,
  "screenshots": [
    {
      "src": "/images/templates/pigment/home-desktop.webp",
      "alt": "Painting website homepage with cream and blue typography beside a sage living room",
      "caption": "Home / desktop",
      "width": 1440,
      "height": 1800
    }
  ]
}
```

Use the actual pixel dimensions of your file. Set `url` to the real HTTPS Vercel address after deployment, or run the supplied publisher to connect it. Do not copy the example JSON before adding its image.

The first screenshot is the main image. Visitors can select the others, scroll tall captures and open the original image. With no screenshots, the page shows a labelled native design preview. An empty demo URL never creates a dead live-demo button.

Run `npm run check`, `npm run build` and `npm run smoke` before committing new screenshots and the JSON file.
