/* eslint-disable */
// Rückseite (Versandseite) — A4 portrait. This is the OUTSIDE when folded;
// becomes a self-mailer that the person can fold, tape shut, and post.

function BogenBack({ profile, showAnnots = true, activeAnnotId, onAnnotActivate, tourId, onQRScan }) {
  const I = window.INITIATIVE;
  return (
    <div className="bogen-face bogen-face--back" data-side="back">
      <div className="face-inner">
      <div className="back-grid">

        {/* HEAD STRIP — QR + Pilot block + small instruction */}
        <div className="back-head">
          <div
            className="qr-box"
            onClick={(e) => { e.stopPropagation(); onQRScan && onQRScan('back', profile.bogenId); }}
            role="button"
            title="QR-Code scannen (Demo)"
            style={{ width: 96, height: 96 }}
          >
            <QRCode size={96} seed={'back-' + profile.bogenId} />
            <span className="qr-label">Rückseite – umdrehen</span>
          </div>
          <div>
            <span style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Pilotprojekt · Stiftung für direkte Demokratie</span>
            <h2 style={{ fontSize: 22, lineHeight: 1.2, fontWeight: 500, margin: '6px 0 0', color: 'var(--text-primary)' }}>Barrierefreier Unterschriftenbogen</h2>
            <p style={{ fontSize: 11, lineHeight: 1.45, color: 'var(--text-muted)', margin: '6px 0 0', maxWidth: 360 }}>
              Selbstversand · WeCollect.ch · Mobilitätsbon-Initiative
            </p>
            <p style={{ fontSize: 10.5, lineHeight: 1.45, color: 'var(--text-body)', margin: '10px 0 0', maxWidth: 360 }}>
              Diese Seite ist die <strong style={{ fontWeight: 500 }}>Aussenseite</strong> nach dem Falten. Inhalt mit sensiblen Personendaten kommt nach innen – die Adresse für die Rücksendung steht hier aussen.
            </p>
          </div>
          <div>
            <div style={{ width: 70, height: 70, border: '1px solid var(--surface-divider)', display: 'grid', placeItems: 'center', position: 'relative' }}>
              <img src="assets/wecollect-logo.png" alt="WeCollect" style={{ width: 52, height: 52 }}/>
            </div>
            <p style={{ fontSize: 9, color: 'var(--text-muted)', textAlign: 'center', marginTop: 6, letterSpacing: 0.4 }}>Stiftung für<br/>direkte Demokratie</p>
          </div>
        </div>

        {/* HINWEISE — moved from the front. Three columns: Sie / Gemeinde / BK */}
        <div className="hinweise-row hinweise-on-back">
          <div className="hinweis">
            <h4><span className="tag">Sie</span> Anleitung</h4>
            <p>1. Vorgedruckte Angaben prüfen.</p>
            <p>2. Vorname und Nachname oberhalb der Faltkante schreiben.</p>
            <p>3. Unterhalb der Faltkante unterzeichnen.</p>
            <p>4. Bogen falten, mit Tesafilm zukleben, in den Briefkasten – keine Briefmarke nötig (Geschäftsantwortsendung).</p>
          </div>
          <div className="hinweis">
            <h4><span className="tag">Gemeinde</span> Stimmrechtsbescheinigung</h4>
            <p>Kanton, PLZ, Gemeinde, Geburtsdatum und Adresse wurden über ein Online-Formular erfasst und vorgedruckt – das ist zulässig.</p>
            <p>Eigenhändig sind ausschliesslich <strong style={{ fontWeight: 500 }}>Vorname + Nachname</strong> sowie die <strong style={{ fontWeight: 500 }}>Unterschrift</strong>.</p>
          </div>
          <div className="hinweis">
            <h4><span className="tag">BK</span> Schlusskontrolle</h4>
            <p>Pilotprojekt «Barrierefreier Unterschriftenbogen» (Phase 1, WeCollect.ch).</p>
            <p>Bogen-ID: <strong style={{ fontWeight: 500 }}>{profile.bogenId}</strong></p>
            <p>Audio-Anleitung und Dokumentation: bk.admin.ch/barrierefrei-pilot</p>
          </div>
        </div>

        {/* MIDDLE BLOCK — the visible side after folding */}
        <div className="back-middle">

          {/* Below the fold: SENDER (left), GAS (top-right), RECIPIENT (bottom-right under GAS) */}
          <div className="self-mailer-bottom">
            <div className="sender-window">
              <div className="sw-label">Absender:in</div>
              <div className="sw-name">{profile.salutation === 'Neutrale Anrede' ? '' : profile.salutation + ' '}{profile.firstName} {profile.lastName}</div>
              <div className="sw-addr">
                {profile.street}<br/>
                <span className="tabular">{profile.plz}</span> {profile.municipality}
              </div>
            </div>

            <div className="right-stack">
              <GASBlock />
              <div className="recipient-window">
                <div className="rw-label">EMPFÄNGER:IN · Geschäftsantwortsendung</div>
                <div className="rw-name">{I.returnAddress[0]}</div>
                <div className="rw-addr">
                  {I.returnAddress[1]}<br/>
                  {I.returnAddress[2]}<br/>
                  <span className="tabular">{I.returnAddress[3]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOLD MARK — positioned absolutely at exactly 50% of the A4 to mirror the front fold */}
        <div className="back-fold" aria-hidden="true">
          <span className="scissors"><Scissors/></span>
          <span className="fold-mid">⟶ Hier falten und mit Tesafilm zukleben ⟵</span>
        </div>

        {/* FOOT — small reassurance / branding */}
        <div className="back-foot">
          <div className="back-instr">
            <h4>Datenschutz</h4>
            <p>Ihre Personendaten werden ausschliesslich für die Stimmrechtsbescheinigung verwendet und nach Übergabe an die Bundeskanzlei vernichtet. <span style={{ color: 'var(--text-muted)' }}>{I.privacy}</span></p>
          </div>
          <div className="back-watermark">
            <span>wecollect.ch/barrierefrei-pilot · Bogen-ID {profile.bogenId}</span>
          </div>
        </div>
      </div>
      </div>

      {/* ANNOTATIONS */}
      {showAnnots && window.ANNOTATIONS_BACK.map((a) => (
        <AnnotationDot
          key={a.id} id={a.id} n={a.n} top={a.top} left={a.left}
          active={activeAnnotId === a.id}
          kind={tourId === a.id ? 'tour' : ''}
          onActivate={onAnnotActivate}
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------
// Geschäftsantwortsendung block — modeled on Swiss Post GAS card +
// the WeCollect "Demokratie-Plattform" postage stamp.
// Layout:  [handwritten note + arrow]  [WeCollect stamp]  [GAS box]
// ----------------------------------------------------------------
function GASBlock() {
  return (
    <div className="gas-block">
      <div className="gas-handnote" aria-hidden="true">
        <span className="gas-handnote-text">
          <span>Finanziert durch die</span>
          <span>WeCollect-Community</span>
          <span style={{ marginTop: 4 }}>Jetzt mithelfen auf</span>
          <span style={{ textDecoration: 'underline' }}>wecollect.ch/spenden</span>
        </span>
        <svg className="gas-arrow" viewBox="0 0 80 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 6 C 30 6, 50 16, 72 22"/>
          <path d="M64 16 L 72 22 L 64 28"/>
        </svg>
      </div>

      <PostageStamp denomination={100} year={2024}/>

      <div className="gas-info">
        <div className="gas-info-top">
          <div className="gas-datamatrix" aria-hidden="true">
            <DataMatrix size={56} seed="GAS50840571000151"/>
          </div>
          <div className="gas-label">
            <strong>GAS / ECR / ICR</strong>
            <span>Nicht frankieren</span>
            <span>Ne pas affranchir</span>
            <span>Non affrancare</span>
          </div>
        </div>
        <div className="gas-info-bottom">
          <div className="gas-bclass" aria-label="B-Post">B</div>
          <div className="gas-permit">
            <span>50840571</span>
            <span>000151</span>
          </div>
          <div className="gas-logos">
            <span className="proclima" aria-label="pro clima">
              <svg viewBox="0 0 26 14" width="26" height="14" fill="currentColor" aria-hidden="true">
                <path d="M3 11 L 6 6 L 8 8 L 11 4 L 14 9 L 17 6 L 20 11 Z"/>
                <circle cx="22" cy="3" r="1.6"/>
              </svg>
              <em>pro clima</em>
            </span>
            <span className="diepost"><strong>DIE POST</strong><span className="cross"></span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// WeCollect postage-stamp recreation — used inside the GAS block.
// Hand-drawn faces background + "STIFTUNG FÜR DIREKTE DEMOKRATIE"
// vertical type, denomination, year, perforated edges.
// ----------------------------------------------------------------
function PostageStamp({ denomination = 100, year = 2024 }) {
  return (
    <div className="postage-stamp" role="img" aria-label="WeCollect Briefmarke">
      <div className="ps-perf"></div>
      <div className="ps-inner">
        <div className="ps-bg"></div>
        <div className="ps-wc-logo">
          <span>WE</span>
          <span>COLLECT</span>
        </div>
        <div className="ps-vert">STIFTUNG FÜR DIREKTE DEMOKRATIE</div>
        <div className="ps-denom">{denomination}</div>
        <div className="ps-foot">
          <span className="ps-foot-l">DEMOKRATIE-PLATTFORM</span>
          <span className="ps-foot-r">{year}</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// Decorative DataMatrix-style square code (not a real one — just plausible).
// ----------------------------------------------------------------
function DataMatrix({ size = 56, seed = 'm' }) {
  const N = 14;
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = () => { s = (s * 1664525 + 1013904223) >>> 0; return (s & 0xffff) / 0xffff; };
  const cells = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      // Datamatrix L-shaped finder: left col solid + bottom row solid; right col + top row alternating
      if (x === 0) cells.push([x, y]);
      else if (y === N - 1) cells.push([x, y]);
      else if (x === N - 1 && y % 2 === 0) cells.push([x, y]);
      else if (y === 0 && x % 2 === 0) cells.push([x, y]);
      else if (rand() > 0.5) cells.push([x, y]);
    }
  }
  const c = size / N;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="#fff"/>
      {cells.map(([x, y], i) => (
        <rect key={i} x={x * c} y={y * c} width={c + 0.4} height={c + 0.4} fill="#15161a"/>
      ))}
    </svg>
  );
}

window.BogenBack = BogenBack;
window.PostageStamp = PostageStamp;
window.DataMatrix = DataMatrix;
