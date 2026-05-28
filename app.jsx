/* eslint-disable */
// App — orchestrates the design canvas, state, tour, tweaks.

const { useState: useStateA, useEffect: useEffectA, useMemo: useMemoA, useRef: useRefA } = React;

// Tour order: which annotation to highlight at each step.
// Folgt der visuellen Lese-Reihenfolge (oben → unten je Seite) und deckt
// alle Annotationen aus ANNOTATIONS_FRONT und ANNOTATIONS_BACK ab.
const TOUR_STEPS = [
  // ---------- Vorderseite (Schreibseite) ----------
  { id: 'qr-front',                side: 'front', title: 'QR-Code Audio-Anleitung',                        hint: 'Scan startet die gesprochene Anleitung.' },
  { id: 'title',                   side: 'front', title: 'Initiative-Titel und Bundesblatt-Datum',         hint: 'Pflichtangabe nach Art. 68 BPR.' },
  { id: 'deadline',                side: 'front', title: 'Ablauf Sammelfrist',                             hint: '18 Monate ab Veröffentlichung im Bundesblatt.' },
  { id: 'bogen-id',                side: 'front', title: 'Eindeutige Bogen-ID',                            hint: 'Rückverfolgbarkeit ohne Re-Identifikation.' },
  { id: 'legal-preamble',          side: 'front', title: 'Vollständiger Initiativtext',                    hint: 'Wortlaut der Verfassungsänderung + Strafhinweis.' },
  { id: 'preprint-band',           side: 'front', title: 'Vorgedruckte Personendaten',                     hint: 'Adresse, Geburtsdatum, Gemeinde, Kanton – aus dem Online-Formular.' },
  { id: 'name-zone',               side: 'front', title: 'Vorname + Nachname (eigenhändig)',                hint: 'Das gesetzliche Minimum von Hand.' },
  { id: 'art-18a',                 side: 'front', title: 'Unterzeichnung für Schreibunfähige',             hint: 'Assistenzperson: «i.A.» + eigener Name + eigene Unterschrift (Art. 18a VPR).' },
  { id: 'fold-mark',               side: 'front', title: 'Taktile Faltmarke',                              hint: 'Orientierungsanker für blinde Personen und Faltkante.' },
  { id: 'sig-zone',                side: 'front', title: 'Eigenhändige Unterschrift',                      hint: 'Vollflächig – auch bei Tremor bequem nutzbar.' },
  { id: 'bescheinigung',           side: 'front', title: 'Stimmrechtsbescheinigung',                       hint: 'Die Gemeinde bescheinigt – wie bei jedem klassischen Bogen.' },
  { id: 'komitee',                 side: 'front', title: 'Initiativkomitee + Rückzugsklausel',             hint: 'Pflichtangabe nach Art. 68 lit. c/e BPR.' },

  // ---------- Rückseite (Versandseite) ----------
  { id: 'qr-back',                 side: 'back',  title: 'QR-Code «Rückseite – bitte umdrehen»',            hint: 'Scan erkennt falsche Seite und gibt Audio-Hinweis.' },
  { id: 'hinweis-unterzeichnende', side: 'back',  title: 'Anleitung für Unterzeichnende',                  hint: 'Vier Schritte: prüfen, schreiben, unterzeichnen, falten + zukleben.' },
  { id: 'hinweis-gemeinde',        side: 'back',  title: 'Hinweis Gemeinde (Bescheinigung)',               hint: 'Transparenz: Vorgedruckte Daten sind zulässig.' },
  { id: 'hinweis-bk',              side: 'back',  title: 'Hinweis Bundeskanzlei (Schlusskontrolle)',       hint: 'Vermeidet «Streichstopp»-Auffälligkeiten.' },
  { id: 'fold-mark-back',          side: 'back',  title: 'Faltmarke auch auf der Rückseite',               hint: 'Visuell + taktil – egal, von welcher Seite gefaltet wird.' },
  { id: 'sender',                  side: 'back',  title: 'Absender-Angaben',                               hint: 'Vorgedruckt aus dem Online-Formular – Retoure bei Unzustellbarkeit.' },
  { id: 'gas',                     side: 'back',  title: 'Geschäftsantwortsendung',                       hint: 'Porto übernimmt das Komitee. Kein Briefporto.' },
  { id: 'recipient',               side: 'back',  title: 'Empfänger-Adresse (Komitee)',                   hint: 'Sichtbar auf der Aussenseite nach dem Falten.' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "profileId": "anna",
  "showAnnots": true
}/*EDITMODE-END*/;

function findAnnot(id) {
  const a = window.ANNOTATIONS_FRONT.find(x => x.id === id) || window.ANNOTATIONS_BACK.find(x => x.id === id);
  return a;
}

function App() {
  // Tweakable state
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Local prototype state
  const urlParams = useMemoA(() => (typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()), []);
  const urlSide = urlParams.get('side') === 'back' ? 'back' : (urlParams.get('side') === 'front' ? 'front' : null);
  const urlBogenId = urlParams.get('id') || '';

  const [side, setSide]               = useStateA(() => urlSide || 'front');
  const [prefill, setPrefill]         = useStateA(true);
  const [activeAnnotId, setActive]    = useStateA(null);
  const [tourStep, setTourStep]       = useStateA(-1);   // -1 = off
  const [qrModal, setQrModal]         = useStateA(() => urlSide
    ? { open: true, side: urlSide, bogenId: urlBogenId }
    : { open: false, side: 'front', bogenId: '' });

  // Editable profile — start from the chosen preset, allow MiniForm to edit
  const baseProfile = useMemoA(() => {
    return window.PROFILES.find(p => p.id === t.profileId) || window.PROFILES[0];
  }, [t.profileId]);

  const [profile, setProfile] = useStateA(baseProfile);
  useEffectA(() => { setProfile(baseProfile); }, [baseProfile]);

  // Coordinate tour ↔ side ↔ active annotation
  useEffectA(() => {
    if (tourStep < 0) return;
    const step = TOUR_STEPS[tourStep];
    if (!step) return;
    if (step.side !== side) setSide(step.side);
    setActive(step.id);
  }, [tourStep]);

  const handleAnnotActivate = (id, mode) => {
    if (mode === 'hover' && activeAnnotId === id) return;
    setActive(id);
    if (tourStep >= 0) setTourStep(-1);  // exiting tour when user clicks somewhere else
  };

  const handleQRScan = (which, bogenId) => {
    setQrModal({ open: true, side: which, bogenId });
  };

  const annot = activeAnnotId ? findAnnot(activeAnnotId) : null;

  const tourActive = tourStep >= 0;
  const tourCurId = tourActive ? TOUR_STEPS[tourStep].id : null;

  return (
    <React.Fragment>
      <DesignCanvas>

        {/* ============================================================
            SECTION 1 — Interactive U-Bogen (main artboard)
            ============================================================ */}
        <DCSection id="bogen" title="Interaktiver U-Bogen v0.4" subtitle="Vorderseite ↔ Rückseite · Erklärungspunkte · Druckvorlage als PDF">
          <DCArtboard id="main" label="Mobilitätsbon-Initiative · personalisiert" width={880} height={1340}>
            <div data-screen-label="01 Bogen" style={{ width: '100%', height: '100%', padding: 32, position: 'relative', display: 'flex', flexDirection: 'column' }} onClick={() => { setActive(null); }}>

              {/* CONTROLS */}
              <div className="bogen-controls" onClick={(e) => e.stopPropagation()}>
                <div className="group">
                  <span className="label">Seite</span>
                  <button className={side === 'front' ? 'is-active' : ''} onClick={() => setSide('front')}>Vorderseite</button>
                  <button className={side === 'back'  ? 'is-active' : ''} onClick={() => setSide('back')}>Rückseite</button>
                </div>
                <div className="sep"></div>
                <div className="group">
                  <span className="label">Person</span>
                  <select
                    className="profile-select"
                    value={t.profileId}
                    onChange={(e) => setTweak('profileId', e.target.value)}
                    disabled={!prefill}
                    title={prefill ? 'Beispiel-Person für vorgedruckte Daten' : 'Erst «Vorgedruckte Daten» aktivieren'}
                  >
                    {window.PROFILES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.firstName} {p.lastName} · {p.municipality}{p.assistMode ? ' (Art. 18a VPR)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sep"></div>
                <label className={'toggle' + (prefill ? ' on' : '')} onClick={() => setPrefill(!prefill)}>
                  <span className="track"></span>
                  <span>Vorgedruckte Daten</span>
                </label>
                <label className={'toggle' + (t.showAnnots ? ' on' : '')} onClick={() => setTweak('showAnnots', !t.showAnnots)}>
                  <span className="track"></span>
                  <span>Annotationen</span>
                </label>
                <div style={{ flex: 1 }}></div>
                <div className="group">
                  {!tourActive
                    ? <button className="is-primary" onClick={() => setTourStep(0)}><i className="fa-solid fa-route" style={{ marginRight: 6 }}></i> Tour starten</button>
                    : <button onClick={() => setTourStep(-1)}>Tour beenden</button>
                  }
                  <button onClick={() => { window.location.href = 'Druckvorlage.html'; }} title="Blanko-Bogen als PDF drucken">
                    <i className="fa-solid fa-print" style={{ marginRight: 6 }}></i> Druckvorlage (PDF)
                  </button>
                </div>
              </div>

              {/* TOUR BANNER, attached above the bogen */}
              <div style={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }} onClick={() => setActive(null)}>
                <div className="bogen-stack" onClick={(e) => e.stopPropagation()}>
                  {tourActive && (
                    <div className="tour-banner">
                      <span className="step">Schritt {tourStep + 1} / {TOUR_STEPS.length}</span>
                      <span className="title">{TOUR_STEPS[tourStep].title} — <span style={{ fontWeight: 400, opacity: 0.8 }}>{TOUR_STEPS[tourStep].hint}</span></span>
                      <button onClick={() => setTourStep(Math.max(0, tourStep - 1))} disabled={tourStep === 0}>← Zurück</button>
                      <button onClick={() => {
                        if (tourStep < TOUR_STEPS.length - 1) setTourStep(tourStep + 1);
                        else setTourStep(-1);
                      }}>{tourStep < TOUR_STEPS.length - 1 ? 'Weiter →' : 'Fertig ✓'}</button>
                      <button className="exit" onClick={() => setTourStep(-1)} aria-label="Tour schliessen"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                  )}

                  <div className={'bogen-card' + (side === 'back' ? ' is-flipped' : '') + (prefill ? '' : ' no-prefill') + (t.showAnnots ? '' : ' no-annots')}>
                    <BogenFront
                      profile={profile}
                      prefill={prefill}
                      showAnnots={t.showAnnots}
                      activeAnnotId={activeAnnotId}
                      onAnnotActivate={handleAnnotActivate}
                      tourId={tourCurId}
                      onQRScan={handleQRScan}
                    />
                    <BogenBack
                      profile={profile}
                      showAnnots={t.showAnnots}
                      activeAnnotId={activeAnnotId}
                      onAnnotActivate={handleAnnotActivate}
                      tourId={tourCurId}
                      onQRScan={handleQRScan}
                    />
                  </div>

                  {/* Popover lives in the bogen-stack, positioned by the annotation */}
                  {annot && t.showAnnots && (
                    <AnnotationPopover
                      pop={annot}
                      onClose={() => setActive(null)}
                    />
                  )}
                </div>
              </div>
            </div>
          </DCArtboard>
        </DCSection>

        {/* SECTION 2 entfernt — nur noch der interaktive Bogen + Druckvorschau */}

      </DesignCanvas>

      <QRAudioModal
        open={qrModal.open}
        side={qrModal.side}
        bogenId={qrModal.bogenId}
        onClose={() => setQrModal({ ...qrModal, open: false })}
      />

      {/* TWEAKS PANEL — toggled by host toolbar */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Beispiel-Person">
          <TweakSelect
            label="Profil"
            value={t.profileId}
            onChange={(v) => setTweak('profileId', v)}
            options={window.PROFILES.map(p => ({ value: p.id, label: `${p.firstName} ${p.lastName} · ${p.municipality}` }))}
          />
        </TweakSection>
        <TweakSection label="Annotationen">
          <TweakToggle
            label="Erklärungs-Punkte anzeigen"
            value={t.showAnnots}
            onChange={(v) => setTweak('showAnnots', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

window.App = App;

// Mount
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
