# VEGO VOC System

This repository contains VEGO website experience prototypes and a dynamic VOC collection dashboard for raised garden bed shoppers.

## Files

- `vego-voc-system.html` - VOC operations dashboard for collecting, filtering, tagging, and exporting customer feedback.
- `vego-3d-configurator-demo.html` - 3D raised garden bed configurator prototype.
- `PRODUCT.md` - Product context, audience, and principles.
- `DESIGN.md` - VEGO visual system and implementation guidance.

## VOC System

Open `vego-voc-system.html` in a browser. The dashboard includes:

- Channel configuration for owned site reviews, PDP Q&A, Amazon, social media, support, search, and post-purchase surveys.
- Weekly VOC metrics, sentiment breakdown, source health, topic trends, and action backlog.
- Search and filters for raw user voices.
- Manual VOC input for support notes, creator feedback, and offline observations.
- Simulated collection with local browser storage.
- CSV export for analysis and reporting.

## Data integration

The live page loads VOC items from `data/voc-items.json` first. If the data file is unavailable, it falls back to the built-in sample data.

To sync real data:

1. Export or publish channel data as CSV or JSON.
2. Use the shared fields in `data/example-voc-source.csv`: `source`, `sentiment`, `impact`, `tags`, `title`, `quote`, `date`.
3. Add a GitHub repository secret named `VOC_SOURCE_URLS`.
4. Put one or more CSV/JSON URLs in the secret. Use comma-separated URLs, or a JSON array.
5. Optionally append `#source=amazon`, `#source=support`, `#source=site-reviews`, or another supported source id to a URL when the file does not include a `source` column.
6. Run the `Sync VOC data` GitHub Action manually, or wait for the daily schedule.

Example `VOC_SOURCE_URLS` value:

```text
https://example.com/shopify-reviews.csv#source=site-reviews,https://example.com/gorgias-tickets.csv#source=support
```

The sync script writes normalized records into `data/voc-items.json`, then GitHub Actions commits the updated data back to the repository. The published page reads that file on load and when the user clicks `Sync latest data`.

Real platform notes:

- Shopify review data usually comes from the review app or customer review export used by the store.
- Gorgias support data can be exported or connected through its API, then mapped to the shared fields.
- Amazon SP-API data normally needs seller authorization and report configuration before it can be pulled.
- Search Console data can be exported from queries or connected through the Search Console API.
