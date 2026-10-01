# Excavation & Landscaping showcase screenshots

Add real captures of the earthworks demo to this folder. Suggested filenames include `home-desktop.webp`, `services-desktop.webp`, `projects-desktop.webp`, `process-desktop.webp` and `home-mobile.webp`.

Configure them in display order in `src/data/earthworks-demo.json`:

```json
{
  "url": null,
  "screenshots": [
    {
      "src": "/images/templates/earthworks/home-desktop.webp",
      "alt": "Excavation and landscaping template homepage showing its sample project imagery and navigation",
      "caption": "Home / desktop",
      "width": 1440,
      "height": 960
    }
  ]
}
```

Replace the example dimensions with the image's actual dimensions, and add an entry only after its real file exists. Preserve the verified public `url` after deployment. Filenames should use simple letters, digits and hyphens with a WebP, PNG or JPEG extension.

An empty screenshot list displays the labelled design cover. A configured, verified public URL displays **View live demo**; a missing URL omits that action. There is no second embedded “Try this design here” flow. This is a developer-managed gallery, not an upload form for visitors.

The sample imagery illustrates the design and is not proof of real client jobs. Personalization uses the customer's approved content and appropriately licensed assets. The seven-page starting template is regularly $600 CAD for Home, Services, Projects, Materials, Process, FAQ and Contact. Its temporary 20% sale is $480 CAD until midnight January 1, 2027 in Alberta (`2027-01-01T07:00:00Z`); regular pricing returns at expiry. Additional pages and customization are quoted by scope before work begins. See `docs/CURRENT_TEMPLATE_PRICING.md` for the current pricing policy.
