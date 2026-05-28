# U-Bogen Prototyp

Barrierefreier Einzelfaltbogen — interaktiver HTML-Prototyp aus Claude Design.

## Lokal ansehen

Da die JSX-Dateien per `<script type="text/babel">` zur Laufzeit kompiliert werden, muss die Seite über einen HTTP-Server geöffnet werden (nicht direkt per `file://`):

```bash
npm install
npm start
# öffnet http://localhost:8000/ im Browser
```

Alternativ ohne Node:

```bash
python3 -m http.server 8000
```

## Deployment

Auf jedem Push nach `main` wird die Seite via GitHub Actions auf GitHub Pages publiziert (siehe `.github/workflows/pages.yml`).

**Einmalig nach Repo-Erstellung in den Repo-Settings:**
Settings → Pages → Source: **GitHub Actions**.

## Struktur

- `index.html` — Einstiegspunkt (umbenannt aus „U-Bogen Prototyp.html")
- `Druckvorlage.html` — separate Druck-Variante
- `*.jsx` — React-Komponenten (im Browser via Babel kompiliert)
- `styles.css`, `wecollect.css`, `fontawesome.css` — Styles
- `assets/`, `fonts/` — Bilder, Logos, Schriften
