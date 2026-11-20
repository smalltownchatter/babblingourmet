# The Babbling Gourmet

Website for The Babbling Gourmet, Chef Andi Marcus's private chef, farmhouse dining and event catering business in the Ottawa Valley.

It's a plain HTML and CSS site with no build step. Open `index.html` in a browser to see it. It's hosted on Netlify, which publishes the repo as it is.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `experiences.html` | Experiences overview |
| `private-chef.html` | Private chef experience |
| `farmhouse-dining.html` | Farmhouse dining and celebrations |
| `event-catering.html` | Event catering |
| `our-food.html` | Our food, with sample menus |
| `about.html` | About Andi |
| `contact.html` | Contact and enquiry form |
| `thank-you.html` | Shown after an enquiry is sent |

Styles are in `assets/css/style.css`; the mobile menu, Experiences dropdown, fade-ins and form checks are in `assets/js/main.js`.

## Photos

All photos live in `assets/img/`. The current files are labelled placeholders. **See [IMAGES.md](IMAGES.md)** for the list of photos needed, which ones must be real, recommended sizes and crops, and Canva search ideas. To replace one, save the new photo as a JPG with exactly the same file name.

## Enquiry form

The form (on the Home and Contact pages) uses **Netlify Forms**, so enquiries are delivered without any extra service:

1. In Netlify, go to **Project configuration → Forms** and turn on **form detection**, then redeploy.
2. Under **Forms → Form notifications**, add an email notification to andi@thebabblinggourmet.com.
3. Send a test enquiry from the live site and check it arrives before launch.

Netlify's free plan includes 100 form submissions a month. Spam is filtered with a hidden "honeypot" field. Visitors who skip required fields (name, email, and "Tell us about your gathering") see a clear message next to each field.

Enquire buttons on each experience page link to `contact.html?experience=private-chef`, `farmhouse` or `event-catering`, which pre-selects that experience in the form.
