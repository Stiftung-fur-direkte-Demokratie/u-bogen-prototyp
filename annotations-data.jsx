/* eslint-disable */
// Annotation content for A4 PORTRAIT layout.
// top/left in % of the bogen face. The portrait sheet is 794×1123 px.

const ANNOTATIONS_FRONT = [
  // Positions measured from real element centers; small offsets to keep dots
  // off important text content. Format: top/left = % of bogen face.
  {
    id: 'qr-front',
    n: 1, top: 4, left: 13, side: 'right',
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
    n: 2, top: 4, left: 28, side: 'right',
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
    n: 3, top: 4, left: 95, side: 'left',
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
    n: 4, top: 9, left: 95, side: 'left',
    tag: 'Pilot',
    title: 'Eindeutige Bogen-ID',
    body: [
      'Jeder personalisierte Bogen trägt eine eindeutige ID. Sie ermöglicht Rückverfolgbarkeit für das Komitee und die Bundeskanzlei – ohne Reidentifikation durch Dritte.',
      'Auch im QR-Code codiert.',
    ],
    lawref: 'Konzept v0.4 · §9 · DSG Art. 5 lit. c',
  },
  {
    id: 'legal-preamble',
    n: 5, top: 18, left: 4, side: 'right',
    tag: 'Pflichttext',
    title: 'Vollständiger Initiativtext',
    body: [
      'Verbindlicher Wortlaut der Verfassungsänderung (Art. 87c Luftverkehrsabgabe + Übergangsbestimmung) sowie der Strafhinweis nach Art. 281/282 StGB.',
      'Fehlt einer dieser Bestandteile, sind alle Unterschriften auf der Liste ungültig.',
    ],
    lawref: 'Art. 68 Abs. 1 lit. b/d BPR',
  },
  {
    id: 'preprint-band',
    n: 6, top: 26, left: 4, side: 'right',
    tag: 'Kernidee',
    title: 'Vorgedruckte Personendaten',
    body: [
      'Geburtsdatum und Wohnadresse werden im Online-Formular erfasst und vorgedruckt.',
      'Das ist erlaubt – diese Angaben dürfen handschriftlich, maschinell oder digital ausgefüllt werden. Sie müssen NICHT eigenhändig sein.',
      'Rechts in der Box gibt es ein leeres Kontrollfeld, das die prüfende Amtsstelle bei Bedarf von Hand ausfüllen kann.',
      'Personen mit Tremor oder Sehbehinderung leisten so nur noch das gesetzliche Minimum von Hand.',
    ],
    lawref: 'Art. 61 Abs. 2 BPR · Broschüre Stimmrechtsbescheinigung 2025, S. 12',
  },
  {
    id: 'name-zone',
    n: 7, top: 39, left: 4, side: 'right',
    tag: 'Eigenhändig',
    title: 'Schreibzone Vorname + Nachname',
    body: [
      'Über die ganze Bogenbreite, ca. 25 mm hoch. Hochkontrastig, ohne Pastellton.',
      'Vorname und Nachname MÜSSEN eigenhändig und leserlich geschrieben sein – andere Pflichtfelder dürfen vorgedruckt sein.',
    ],
    lawref: 'Art. 61 Abs. 1 BPR',
  },
  {
    id: 'art-18a',
    n: 8, top: 39, left: 95, side: 'left',
    tag: 'Schreibunfähigkeit · Art. 18a VPR',
    title: 'Unterzeichnung für schreibunfähige Stimmberechtigte',
    body: [
      'Stimmberechtigte, die ein Begehren für andere, schreibunfähige Stimmberechtigte unterzeichnen, tragen deren Personalien vollständig in die Unterschriftenliste ein.',
      'In der Rubrik «eigenhändige Unterschrift» tragen sie in Blockschrift samt dem Hinweis «im Auftrag / i.A.» ihren eigenen Namen ein und fügen ihre eigene Unterschrift bei.',
      'Die rotierte Checkbox rechts an der Namensbox markiert diesen Sonderfall.',
    ],
    lawref: 'Art. 18a VPR',
  },
  {
    id: 'fold-mark',
    n: 9, top: 50, left: 4, side: 'right',
    tag: 'Taktile Faltmarke',
    title: 'Faltkante als Orientierungsanker',
    body: [
      'Die Faltkante wird im Druck als Prägung oder Stanzung ausgeführt – ertastbar mit dem Finger.',
      'Sie teilt die Schreibzone in zwei Hälften: oberhalb = Name, unterhalb = Unterschrift. Eine blinde Person orientiert sich selbständig ohne sehende Hilfe.',
      'Gleichzeitig dient sie als saubere Faltkante für den Selbstversand.',
    ],
    lawref: 'Konzept v0.4 · §4 / §5.2',
  },
  {
    id: 'sig-zone',
    n: 10, top: 62, left: 4, side: 'right',
    tag: 'Eigenhändig',
    title: 'Eigenhändige Unterschrift',
    body: [
      'Volle Bogenbreite, ca. 30 mm hoch. Auch bei Tremor oder grobmotorischen Einschränkungen bequem nutzbar.',
      'Die Unterschrift ist – wie der Name – immer eigenhändig zu leisten.',
    ],
    lawref: 'Art. 61 Abs. 1 BPR',
  },
  {
    id: 'bescheinigung',
    n: 11, top: 84, left: 4, side: 'right',
    tag: 'Amtsstelle',
    title: 'Stimmrechtsbescheinigung',
    body: [
      'Die Stimmrechtsbescheinigung wird durch das Initiativkomitee eingeholt – nicht durch die unterzeichnende Person.',
      'Die zuständige Amtsperson trägt die Anzahl (leer gelassen, von Hand auszufüllen), Ort, eigenhändige Unterschrift, Datum, amtliche Eigenschaft und den Amtsstempel ein.',
    ],
    lawref: 'Art. 62 BPR · VPR Art. 19',
  },
  {
    id: 'komitee',
    n: 12, top: 84, left: 95, side: 'left',
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
    n: 1, top: 8, left: 13, side: 'right',
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
    n: 2, top: 22, left: 16, side: 'below',
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
    n: 4, top: 22, left: 84, side: 'below',
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
    n: 6, top: 63, left: 24, side: 'right',
    tag: 'Absender:in',
    title: 'Ihre Absender-Angaben',
    body: [
      'Damit der Bogen bei Unzustellbarkeit zurückkommt – aus dem Online-Formular übernommen.',
    ],
  },
  {
    id: 'gas',
    n: 7, top: 65, left: 72, side: 'left',
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
    n: 8, top: 80, left: 72, side: 'left',
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
