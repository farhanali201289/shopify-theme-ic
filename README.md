# Inspired Comforts — Shopify OS 2.0 theme

A from-scratch Online Store 2.0 theme recreating the **v10.9 wireframe** design system
(cream/sand + sage-green accent, Cormorant Garamond + DM Sans).

## What's in this pass

| Area | Files |
|---|---|
| Foundation | `layout/theme.liquid`, `config/settings_schema.json`, `config/settings_data.json`, `locales/en.default.json`, `assets/base.css`, `assets/global.js` |
| Global UI | `sections/header.liquid` (mega-menu), `sections/footer.liquid`, `sections/announcement-bar.liquid`, `sections/cart-drawer.liquid` + `snippets/cart-drawer.liquid` |
| Homepage | `templates/index.json` → `hero-video`, `trust-bar`, `value-proposition`, `moments-carousel`, `kit-finder`, `offer-band`, `the-gap`, `patient-voices`, `image-with-text` (founder), `find-my-kit` |
| Collection | `templates/collection.json` → `main-collection` (faceted filters, sort, pagination) |
| Product | `templates/product.json` → `main-product` (gallery, variant picker, AJAX add-to-cart) + `featured-collection` cross-sell |
| Cart | `templates/cart.json` → `main-cart` (works as page; drawer is global) |
| Supporting | `templates/{search,page,404,list-collections}.json` + matching `main-*` sections |
| Shared snippets | `product-card`, `price`, `rating`, `icon`, `cart-drawer` |

The colour palette and type scale are theme-editor editable (Theme settings → Colors / Typography / Layout / Cart).

## Preview locally (Shopify CLI)

A Shopify theme can't run on a plain static server — Liquid must be rendered by Shopify.
Use the CLI against your store:

```bash
cd "Shopify Theme"
shopify theme dev --store YOUR-STORE.myshopify.com
```

First run opens a browser to authenticate. Then visit `http://127.0.0.1:9292` — hot reload is on.

To push it as an unpublished theme you can preview in admin:

```bash
shopify theme push --unpublished --store YOUR-STORE.myshopify.com
```

## Data the theme expects (set up in Shopify admin)

- **Navigation** → a menu with handle `main-menu`. Top-level items with children render as mega-menu columns (3 levels supported).
- **Collections** matching the homepage links: `dialysis`, `iv-infusions`, `mastectomy`, `post-surgery`, `chemotherapy`, `caregiver-gifts` (and `all`).
- **Storefront filters** (Search & Discovery app) for the collection page facets.
- **Product images** — cards/galleries use them; without images, placeholder SVGs render.
- Optional metafields: `custom.card_subtitle` (product card one-liner), `reviews.rating` + `reviews.rating_count` (stars).
- Images from the wireframe (`Pics/` folder) are uploaded via the theme editor per section (hero video, value image, founder image, moments) or as product/collection images — they are **not** bundled in the theme.

## Not in this pass (per "page by page" plan)

Persona hub pages (mastectomy/dialysis/chemo/IV stage pages), the Build-Your-Own kit builder,
gifting hubs, blog/article templates, customer account templates, and the bespoke surgery
journey pages. These are page-template + section work for following passes.

## Conventions

- Vanilla JS only (`assets/global.js`), progressive enhancement, no build step.
- All sections are block-based and theme-editor configurable with presets.
- CSS uses design tokens (`--accent`, `--cream`, …) injected from settings in `theme.liquid`.
