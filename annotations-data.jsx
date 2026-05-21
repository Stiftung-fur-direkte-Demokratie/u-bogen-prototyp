/* eslint-disable */
// Annotation content for A4 PORTRAIT layout.
// top/left in % of the bogen face. The portrait sheet is 794×1123 px.

const ANNOTATIONS_FRONT = [
  // ─── TOP STRIP ────────────────────────────────────────────────
  {
    id: 'qr-front',
    n: 1, top: 6, left: 8, side: 'right',
    tag: 'QR · Audio-Anleitung',
    title: 'QR-Code «Vorderseite oben»',
    body: [
      'Codiert die Bogen-ID, den Initiative-Titel und einen Link zur Audio-Anleitung. Eine Scanner-App erkennt: Bogen liegt korrekt (Schriftseite oben).',
      'Klicke ihn an, um die Audio-Anleitung als Demo zu öffnen.',
    ],
    lawref: 'Konzept v0.4 · Kapitel 7',
  },
  {
    id: 'title',
    n: 2, top: 6, left: 44, side: 'below',
    tag: 'Pflichtangabe',
    title: 'Initiative-Titel und BBl-Datum',
    body: [
      'Titel der Volksinitiative im Wortlaut sowie das Datum der Veröffentlichung im Bundesblatt.',
      'Ohne diese Angabe ist die ganze Liste ungültig.',
    ],
    lawref: 'Art. 68 Abs. 1 lit. b BPR',
  },
  {
    id: 'deadline',
    n: 3, top: 3, left: 85, side: 'left',
    tag: 'Sammelfrist',
    title: 'Ablauf Sammelfrist (18 Monate)',
    body: [
      '18 Monate nach Veröffentlichung im Bundesblatt müssen 100\u2019000 gültige Unterschriften eingereicht sein.',
      'Der Bogen muss früher bei der Gemeinde eingehen – die Stimmrechtsbescheinigung braucht Zeit.',
    ],
    lawref: 'Art. 71 Abs. 1 BPR',
  },
  {
    id: 'bogen-id',
    n: 4, top: 9, left: 85, side: 'left',
    tag: 'Pilot',
    title: 'Eindeutige Bogen-ID',
    body: [
      'Jeder personalisierte Bogen trägt eine eindeutige ID. Sie ermöglicht Rückverfolgbarkeit für das Komitee und die Bundeskanzlei – ohne Reidentifikation durch Dritte.',
      'Auch im QR-Code codiert.',
    ],
    lawref: 'Konzept v0.4 · §9 · DSG Art. 5 lit. c',
  },
  // ─── INITIATIVE TEXT ──────────────────────────────────────────
  {
    id: 'legal-preamble',
    n: 5, top: 22, left: 50, side: 'right',
    tag: 'Pflichttext',
    title: 'Vollständiger Initiativtext',
    body: [
      'Verbindlicher Wortlaut der Verfassungsänderung (Art. 87c Luftverkehrsabgabe + Übergangsbestimmung) sowie der Strafhinweis nach Art. 281/282 StGB.',
      'Fehlt einer dieser Bestandteile, sind alle Unterschriften auf der Liste ungültig.',
    ],
    lawref: 'Art. 68 Abs. 1 lit. b/d BPR',
  },
  // ─── VORGEDRUCKTE PERSONENDATEN ───────────────────────────────
  {
    id: 'preprint-band',
    n: 6, top: 36, left: 24, side: 'below',
    tag: 'Kernidee',
    title: 'Vorgedruckte Personendaten',
    body: [
      'Vorname, Nachname, Geburtsdatum, Wohnadresse, Politische Gemeinde und Kanton werden im Online-Formular erfasst und vorgedruckt.',
      'Das ist erlaubt – diese Angaben dürfen handschriftlich, maschinell oder digital ausgefüllt werden. Sie müssen NICHT eigenhändig sein.',
      'Personen mit Tremor oder Sehbehinderung leisten so nur noch das gesetzliche Minimum von Hand.',
    ],
    lawref: 'Art. 61 Abs. 2 BPR · Broschüre Stimmrechtsbescheinigung 2025, S. 12',
  },
  // ─── NAME ZONE ────────────────────────────────────────────────
  {
    id: 'name-zone',
    n: 7, top: 44, left: 50, side: 'right',
    tag: 'Eigenhändig',
    title: 'Schreibzone Vorname + Nachname',
    body: [
      'Über die ganze Bogenbreite, ca. 25 mm hoch. Hochkontrastig, ohne Pastellton.',
      'Vorname und Nachname MÜSSEN eigenhändig und leserlich geschrieben sein – andere Pflichtfelder dürfen vorgedruckt sein.',
      'Bei Schreibunfähigkeit übernimmt eine stimmberechtigte Person mit dem Zusatz «im Auftrag» (Art. 18a VPR).',
    ],
    lawref: 'Art. 61 Abs. 1 BPR · Art. 18a VPR',
  },
  // ─── FOLD MARK ────────────────────────────────────────────────
  {
    id: 'fold-mark',
    n: 8, top: 50, left: 30, side: 'left',
    tag: 'Taktile Faltmarke',
    title: 'Faltkante als Orientierungsanker',
    body: [
      'Die Faltkante wird im Druck als Prägung oder Stanzung ausgeführt – ertastbar mit dem Finger.',
      'Sie teilt die Schreibzone in zwei Hälften: oberhalb = Name, unterhalb = Unterschrift. Eine blinde Person orientiert sich selbständig ohne sehende Hilfe.',
      'Gleichzeitig dient sie als saubere Faltkante für den Selbstversand.',
    ],
    lawref: 'Konzept v0.4 · §4 / §5.2',
  },
  // ─── SIGNATURE ZONE ───────────────────────────────────────────
  {
    id: 'sig-zone',
    n: 9, top: 62, left: 50, side: 'right',
    tag: 'Eigenhändig',
    title: 'Eigenhändige Unterschrift',
    body: [
      'Volle Bogenbreite, ca. 30 mm hoch. Auch bei Tremor oder grobmotorischen Einschränkungen liesse sich darauf bequem unterschreiben.',
      'Die Unterschrift ist – wie der Name – immer eigenhändig zu leisten.',
    ],
    lawref: 'Art. 61 Abs. 1 BPR',
  },
  // ─── BESCHEINIGUNG & KOMITEE ─────────────────────────────────
  {
    id: 'bescheinigung',
    n: 10, top: 89, left: 28, side: 'above',
    tag: 'Gemeinde-Workflow',
    title: 'Stimmrechtsbescheinigung',
    body: [
      'Die Gemeinde trägt Ort, Datum, Unterschrift und Amtsstempel ein – wie bei jedem klassischen Bogen.',
      '«Anzahl: 1» ist vorbedruckt: ein personalisierter Einzelfaltbogen entspricht genau einer Person.',
    ],
    lawref: 'Art. 62 BPR · VPR Art. 19',
  },
  {
    id: 'komitee',
    n: 11, top: 89, left: 76, side: 'above',
    tag: 'Pflichtangabe',
    title: 'Initiativkomitee',
    body: [
      'Vollständige Liste der Komitee-Mitglieder mit Namen und Wohnort sowie die Rückzugsklausel.',
      'Adresse, an die der Bogen zurückgeschickt wird, steht ebenfalls hier.',
    ],
    lawref: 'Art. 68 Abs. 1 lit. c/e BPR',
  },
];

const ANNOTATIONS_BACK = [
  {
    id: 'qr-back',
    n: 1, top: 6, left: 94, side: 'left',
    tag: 'QR · Versandseite',
    title: 'QR-Code «Rückseite – bitte umdrehen»',
    body: [
      'Wer die Rückseite scannt, hört zuerst: «Bitte umdrehen – Sie halten den Bogen falsch.»',
      'Funktioniert auch, wenn der Bogen als zwei separate Blätter gedruckt wurde.',
    ],
    lawref: 'Konzept v0.4 · §7',
  },
  {
    id: 'hinweis-unterzeichnende',
    n: 2, top: 22, left: 84, side: 'below',
    tag: 'Hinweis · Unterzeichnende',
    title: 'Anleitung für Sie',
    body: [
      'Vier Schritte: vorgedruckte Daten prüfen, Vorname+Nachname schreiben, eigenhändig unterzeichnen, Bogen falten und mit Tesafilm zukleben.',
    ],
  },
  {
    id: 'hinweis-gemeinde',
    n: 3, top: 22, left: 50, side: 'below',
    tag: 'Hinweis · Gemeinde',
    title: 'Stimmrechtsbescheinigung',
    body: [
      'Erklärt der prüfenden Gemeinde transparent, dass die Daten zulässig vorgedruckt wurden.',
      'Verhindert Streichungen aus Verdacht «von gleicher Hand» (Code d) oder «nicht handschriftlich» (Code e).',
    ],
    lawref: 'Art. 61 Abs. 2 BPR',
  },
  {
    id: 'hinweis-bk',
    n: 4, top: 22, left: 16, side: 'below',
    tag: 'Hinweis · Bundeskanzlei',
    title: 'Schlusskontrolle',
    body: [
      'Pilotprojekt-Vermerk, Bogen-ID und Rechtsgrundlage für die Sektion Politische Rechte der BK.',
      'Erleichtert die verstärkten BK-Kontrollen seit 2024 («Streichstopp»).',
    ],
    lawref: 'Art. 18a VPR · Konzept v0.4 · §8.2',
  },
  {
    id: 'fold-mark-back',
    n: 5, top: 50, left: 70, side: 'right',
    tag: 'Faltmarke',
    title: 'Auch auf der Rückseite markiert',
    body: [
      'Die Faltkante ist auf beiden Seiten visuell und taktil sichtbar – egal, von welcher Seite die Person den Bogen faltet, sie trifft die Mitte.',
    ],
  },
  {
    id: 'sender',
    n: 6, top: 63, left: 76, side: 'right',
    tag: 'Absender:in',
    title: 'Ihre Absender-Angaben',
    body: [
      'Damit der Bogen bei Unzustellbarkeit zurückkommt – aus dem Online-Formular übernommen.',
    ],
  },
  {
    id: 'gas',
    n: 7, top: 65, left: 28, side: 'left',
    tag: 'Geschäftsantwortsendung',
    title: 'GAS-Stempel der Schweizerischen Post',
    body: [
      'Geschäftsantwortsendung: die unterzeichnende Person braucht keine Briefmarke. Die Post stellt zu und stellt dem Komitee die Portokosten in Rechnung.',
      'Senkt die Hemmschwelle – jeder Briefkasten genügt.',
    ],
    lawref: 'Schweizerische Post · GAS-Vertrag',
  },
  {
    id: 'recipient',
    n: 8, top: 80, left: 28, side: 'left',
    tag: 'Empfänger',
    title: 'Adresse des Komitees',
    body: [
      'Diese Adresse ist nach dem Falten auf der Aussenseite sichtbar – das Postpersonal liest sie direkt.',
      'Vorgedruckt aus den Stammdaten der Initiative.',
    ],
  },
];

window.ANNOTATIONS_FRONT = ANNOTATIONS_FRONT;
window.ANNOTATIONS_BACK = ANNOTATIONS_BACK;
