# The Babbling Gourmet

Website for The Babbling Gourmet, Chef Andi Marcus's private chef, farmhouse dining and event catering business in the Ottawa Valley.

It's a plain HTML and CSS site, so there is nothing to install or build. Open `index.html` in a browser to see it, or upload the whole folder to any web host.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `experiences.html` | Explore our experiences |
| `private-chef.html` | Private chef experience |
| `farmhouse-dining.html` | Farmhouse dining and celebrations |
| `event-catering.html` | Event catering |
| `our-food.html` | Our food (with sample menus) |
| `about.html` | About Andi and The Babbling Gourmet |
| `contact.html` | Contact us |

Page text comes from the "Website copy" document. Styles live in `assets/css/style.css`, and the small amount of JavaScript (mobile menu, fade-ins, enquiry form) is in `assets/js/main.js`.

## Adding photos

Every photo spot is currently a warm-toned placeholder labelled "Photo to come". To use a real photo, replace the placeholder, for example:

```html
<div class="photo photo--kitchen photo--arch" role="img" aria-label="Photo to come: Chef Andi Marcus">…</div>
```

with

```html
<img class="photo photo--arch" src="assets/img/andi.jpg" alt="Chef Andi Marcus in the farmhouse kitchen" style="object-fit: cover">
```

## Enquiry form

Until a form service is connected, pressing **Send Your Enquiry** opens the visitor's email app with their answers already filled in, addressed to andi@thebabblinggourmet.com. To have enquiries sent straight to Andi's inbox instead, sign up for a form service such as Formspree and add its address to the form, e.g. `<form class="form enquiry" action="https://formspree.io/f/XXXX" method="POST">`. The JavaScript steps aside automatically when the form has an `action`.

Enquire buttons on each experience page link to `contact.html?experience=private-chef`, `farmhouse` or `event-catering`, which pre-selects that experience in the form.
