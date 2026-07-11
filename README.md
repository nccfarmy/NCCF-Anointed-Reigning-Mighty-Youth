# NCCF Anointed Reigning Mighty Youth — Website

A free, static website for the NCCF ARM Youth ministry, built to publish on **GitHub Pages**.

## 🚀 How to publish (one-time setup)

1. Go to [github.com](https://github.com) and log in (or create a free account).
2. Click **New repository**. Name it something like `armyouth-site` (public repo, free).
3. On the new repo page, click **uploading an existing file** (or use "Add file → Upload files").
4. Drag in **all the files and folders** from this project (`index.html`, `css/`, `js/`, `data/`, and the rest), then **Commit changes**.
5. Go to the repo's **Settings → Pages**.
6. Under "Build and deployment", set **Source** to `Deploy from a branch`, Branch = `main`, folder = `/ (root)`. Click **Save**.
7. Wait about 1 minute, then refresh — GitHub will show your live URL, something like:
   `https://yourusername.github.io/armyouth-site/`

That's it — free hosting, no expiration, no credit card.

## ✍️ How to add new content (day-by-day)

You don't need to touch any HTML/CSS. Just edit the files inside the `data/` folder, right from GitHub's website:

- **New weekly activity** → edit `data/activities.json`, add a new `{ "date": ..., "title": ..., "tag": ..., "description": ... }` entry.
- **New accomplishment** → edit `data/accomplishments.json` the same way.
- **New officer / new term** → edit `data/officers.json`.

To edit on GitHub directly:
1. Open the file in your repo (e.g. `data/activities.json`).
2. Click the pencil ✏️ icon (top right) to edit.
3. Copy an existing entry, paste it, and change the details. Keep the commas and brackets `{ }` matching.
4. Click **Commit changes** at the bottom.
5. Your live site updates automatically within a minute — no redeploy needed.

**Financial Report** and page text (like the hero on the Home page) are plain HTML — edit those files directly the same way if figures or wording change.

## 🎨 Design notes

- Colors and fonts are all defined once in `css/style.css` under `:root` — change a value there and it updates the whole site.
- Palette: deep navy (`--navy-deep`), muted gold (`--gold`), warm cream background (`--cream`).
- Fonts: Fraunces (headings) + Inter (body), loaded free from Google Fonts.

## 🌐 Optional: custom domain later

If the ministry ever wants `armyouth.org` instead of the `.github.io` address, buy the domain from any registrar (~$10–15/year), then add a `CNAME` file to the repo and point the domain's DNS to GitHub Pages. Ask if you want help with this step when the time comes.
