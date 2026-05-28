# U-Bogen Prototyp

Interaktiver HTML-Prototyp eines **barrierefreien Einzelfaltbogens** für eidgenössische Volksinitiativen — am Beispiel der fiktiven _Mobilitätsbon-Initiative_.

Der Prototyp zeigt, wie ein klassischer Unterschriftenbogen so umgestaltet werden kann, dass er auch von Personen mit Tremor, Sehbehinderung oder anderen motorischen Einschränkungen selbständig ausgefüllt werden kann — ohne dabei die rechtlichen Anforderungen des Bundesgesetzes über die politischen Rechte (BPR) zu verletzen.

## Live-Demo

**👉 [stiftung-fur-direkte-demokratie.github.io/u-bogen-prototyp](https://stiftung-fur-direkte-demokratie.github.io/u-bogen-prototyp/)**

So lässt sich der Prototyp testen:

- **Vorderseite / Rückseite** umschalten — beide Seiten des Bogens.
- **Tour starten** — geführte Erklärung der 12 Schlüsselelemente Schritt für Schritt.
- **Erklärungs-Punkte (Annotationen)** anklicken — Detailinfo zu jedem Element inklusive Rechtsgrundlage (Artikel BPR / VPR).
- **Vorgedruckte Daten** an-/ausschalten — zeigt den Unterschied zwischen Blanko-Bogen und personalisierter Variante.
- **Beispiel-Person** im Tweaks-Panel wechseln (Anna, Luca, Priska, …) — verschiedene Profile inkl. _Art. 18a VPR_-Modus (Unterzeichnung für schreibunfähige Stimmberechtigte).
- **QR-Codes** anklicken — Demo der Audio-Anleitung («Bitte umdrehen — Sie halten den Bogen falsch.»).
- **Druckvorlage (PDF)** öffnen — A4-Druckansicht der beiden Seiten zum tatsächlichen Ausdrucken bzw. Speichern als PDF.

## Was zeigt der Bogen?

Die wichtigsten Elemente (siehe Tour im Prototyp):

| # | Element | Zweck |
| --- | --- | --- |
| 1 | Initiative-Titel + BBl-Datum | Pflichtangabe nach Art. 68 Abs. 1 lit. b BPR |
| 2 | Vollständiger Initiativtext | Wortlaut der Verfassungsänderung + Strafhinweis (Art. 281/282 StGB) |
| 3 | Vorgedruckte Personendaten | Adresse, Geburtsdatum, Gemeinde — zulässig nach Art. 61 Abs. 2 BPR |
| 4 | Schreibzone Name (eigenhändig) | Vorname + Nachname von Hand — gesetzliches Minimum |
| 5 | Taktile Faltmarke | Geprägte/gestanzte Kante als Orientierungsanker für blinde Personen |
| 6 | Eigenhändige Unterschrift | Vollflächige Schreibzone (~30 mm hoch), auch bei Tremor nutzbar |
| 7 | Stimmrechtsbescheinigung | Wird durch das Komitee bei der Gemeinde eingeholt (Art. 62 BPR) |
| 8 | QR-Code Audio-Anleitung | Codiert Bogen-ID + Link zur gesprochenen Anleitung |
| 9 | Hinweise an Gemeinde + BK | Transparenz: Vorgedruckte Daten sind zulässig — verhindert «Streichstopp» |
| 10 | Geschäftsantwortsendung (GAS) | Kein Briefporto für die unterzeichnende Person |

Die rechtlichen Bezüge sind direkt in den Annotationen verlinkt (BPR, VPR, DSG, Konzept v0.4).

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

Auf jedem Push nach `main` wird die Seite via GitHub Actions auf GitHub Pages publiziert (siehe [.github/workflows/pages.yml](.github/workflows/pages.yml)).

**Einmalig nach Repo-Erstellung in den Repo-Settings:**
Settings → Pages → Source: **GitHub Actions**.

Die deployte Version ist erreichbar unter:
<https://stiftung-fur-direkte-demokratie.github.io/u-bogen-prototyp/>

## Struktur

- [index.html](index.html) — Einstiegspunkt (interaktiver Prototyp)
- [Druckvorlage.html](Druckvorlage.html) — separate Druck-Variante (A4, 2 Seiten)
- [app.jsx](app.jsx) — App-Orchestrierung, Tour-Steuerung, Tweaks
- [bogen-front.jsx](bogen-front.jsx), [bogen-back.jsx](bogen-back.jsx) — die beiden Bogenseiten
- [annotations-data.jsx](annotations-data.jsx) — Inhalte der Erklärungs-Punkte (inkl. Rechtsgrundlagen)
- [data.jsx](data.jsx) — Initiative-Daten + Beispielprofile
- [design-canvas.jsx](design-canvas.jsx), [tweaks-panel.jsx](tweaks-panel.jsx), [elements.jsx](elements.jsx), [extras.jsx](extras.jsx) — Design-Canvas-Framework
- [styles.css](styles.css), [wecollect.css](wecollect.css), [fontawesome.css](fontawesome.css) — Styles
- [assets/](assets/), [fonts/](fonts/) — Bilder, Logos, Schriften

## Status

Prototyp · Konzept v0.4 · ohne Backend, ohne echte Datenverarbeitung. Die Beispielpersonen und Bogen-IDs sind fiktiv.
