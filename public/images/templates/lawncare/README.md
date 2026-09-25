# Lawn Care showcase screenshots

Add real captures of the lawncare demo to this folder. Suggested filenames include `home-desktop.webp`, `services-desktop.webp`, `our-work-desktop.webp`, `contact-desktop.webp` and `home-mobile.webp`.

Configure them in display order in `src/data/lawncare-demo.json`:

```json
{
  "url": null,
  "screenshots": [
    {
      "src": "/images/templates/lawncare/home-desktop.webp",
      "alt": "Lawn care and maintenance template homepage showing its illustrative lawn imagery and navigation",
      "caption": "Home / desktop",
      "width": 1440,
      "height": 960
    }
  ]
}
```

Replace the example dimensions with the image’s actual dimensions, and add an entry only after its real file exists. Set `url` only after the standalone demo is deployed and its public URL is verified. Filenames should use simple letters, digits and hyphens with a WebP, PNG or JPEG extension.

An empty screenshot list displays the labelled design cover. A configured, verified public URL displays **View live demo**; a missing URL omits that action. This is a developer-managed gallery, not an upload form for visitors.

The four demo pages are Home, Services, Our Work and Contact. The sample business and imagery illustrate the design and are not proof of real client jobs. The demo contact page leads to L&L’s website enquiry with the lawncare design selected; it does not accept lawncare bookings or submit messages to a sample contractor. Personalization uses the customer’s approved content and appropriately licensed assets. The starting template is $499 CAD; additions and customization are quoted by scope before work begins.

The contact layout may display `hello@example.com` as plain text beside its **Demo email — example only** label. It must not create email or telephone actions for the sample business. Before a customer website launches, replace the example with the customer’s approved contact details and verify the real email and click-to-call links. Any form workflow is scoped separately.
