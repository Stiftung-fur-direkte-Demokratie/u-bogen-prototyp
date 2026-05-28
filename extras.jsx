/* eslint-disable */
// Supporting artboards: MiniForm (online personalization), EnvelopeView, FoldDiagram, QRAudioModal

const { useState: useStateS } = React;

// -------------------------------------------------------------------
// MINI-FORM — the online form that personalizes the Bogen
// Lives on its own artboard. Values propagate to the main Bogen
// through the orchestrator (App) via setProfile().
// -------------------------------------------------------------------
function MiniForm({ profile, onChange, onSubmit }) {
  const set = (k) => (e) => onChange({ ...profile, [k]: e.target.value });
  const setSalutation = (s) => onChange({ ...profile, salutation: s });
  return (
    <div className="miniform-frame">
      <div className="miniform-head">
        <span style={{ fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.8 }}>WeCollect · Mobilitätsbon-Initiative</span>
        <h2>Personalisierten <br/>Unterschriftenbogen bestellen</h2>
        <p>Wir drucken Ihren Bogen mit den unten erfassten Angaben und senden ihn portofrei zu. Auf dem Bogen müssen Sie nur noch <strong style={{ color: '#fff', fontWeight: 500 }}>Name und Vorname schreiben</strong> und unterzeichnen.</p>
      </div>
      <div className="miniform-body">
        <span className="step-label">Schritt 1 · Ihre Angaben</span>
        <h3>So erreicht der Bogen Sie barrierefrei</h3>

        <label>Anrede</label>
        <div className="anrede">
          {['Frau', 'Herr', 'Neutrale Anrede'].map(s => (
            <button key={s} className={profile.salutation === s ? 'on' : ''} onClick={() => setSalutation(s)} type="button">{s}</button>
          ))}
        </div>

        <div className="row-2-eq">
          <div>
            <label>Vorname</label>
            <input type="text" value={profile.firstName} onChange={set('firstName')} />
          </div>
          <div>
            <label>Name</label>
            <input type="text" value={profile.lastName} onChange={set('lastName')} />
          </div>
        </div>

        <label>Strasse und Hausnummer</label>
        <input type="text" value={profile.street} onChange={set('street')} />

        <div className="row-2">
          <div>
            <label>PLZ</label>
            <input type="text" value={profile.plz} onChange={set('plz')} />
          </div>
          <div>
            <label>Politische Gemeinde</label>
            <input type="text" value={profile.municipality} onChange={set('municipality')} />
          </div>
        </div>

        <div className="row-2-eq">
          <div>
            <label>Kanton</label>
            <input type="text" value={profile.canton} onChange={set('canton')} />
          </div>
          <div>
            <label>Geburtsdatum (TT.MM.JJJJ)</label>
            <input type="text" value={profile.birthDate} onChange={set('birthDate')} />
          </div>
        </div>

        <span className="step-label" style={{ marginTop: 18, display: 'block' }}>Schritt 2 · Versand</span>
        <div className="delivery">
          <label className="box on">
            <input type="radio" name="delivery" defaultChecked style={{ marginTop: 2 }}/>
            <span><strong style={{ fontWeight: 500 }}>Per Post zu mir</strong><br/><span style={{ color: 'var(--text-muted)' }}>Mit vorfrankiertem Rück-Couvert. Portofrei.</span></span>
          </label>
          <label className="box">
            <input type="radio" name="delivery" style={{ marginTop: 2 }}/>
            <span><strong style={{ fontWeight: 500 }}>Selber drucken</strong><br/><span style={{ color: 'var(--text-muted)' }}>PDF/UA · barrierefrei.</span></span>
          </label>
        </div>

        <button className="submit" type="button" onClick={onSubmit}>Personalisierten Bogen bestellen</button>
        <p className="legal">
          Eigenhändig zu leisten sind nur <strong>Name + Vorname</strong> und die <strong>Unterschrift</strong>. Alle anderen Angaben darf der Bogen vorgedruckt enthalten – Art. 61 Abs. 2 BPR.
        </p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// FOLDED SELF-MAILER — shows the bogen folded, taped shut, ready to post.
// The bottom half of the back side becomes the visible outside (recipient + GAS).
// -------------------------------------------------------------------
function EnvelopeView({ profile }) {
  const I = window.INITIATIVE;
  return (
    <div className="envelope-frame">
      <div className="folded-mailer" role="img" aria-label="Gefalteter Bogen, mit Tesafilm zugeklebt, versandbereit">
        {/* The folded sheet — landscape A5 proportions (210×148 mm) */}
        <div className="fm-sheet">
          {/* The fold edge at top, visualized as a darker line */}
          <div className="fm-fold-edge" aria-hidden="true"></div>

          {/* Tape strip across the bottom (open) edge */}
          <div className="fm-tape" aria-hidden="true">
            <span>Tesafilm · zugeklebt</span>
          </div>

          {/* The visible outside content: recipient address + GAS block */}
          <div className="fm-content">
            <div className="fm-recipient">
              <div className="fm-rw-label">EMPFÄNGER:IN · Geschäftsantwortsendung</div>
              <div className="fm-rw-name">{I.returnAddress[0]}</div>
              <div className="fm-rw-addr">
                {I.returnAddress[1]}<br/>
                {I.returnAddress[2]}<br/>
                <span className="tabular">{I.returnAddress[3]}</span>
              </div>
            </div>
            <div className="fm-gas-wrap">
              <window.PostageStamp denomination={100} year={2024}/>
              <div className="fm-gas-info">
                <strong>GAS / ECR / ICR</strong>
                <span>Nicht frankieren</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, marginTop: 6 }}>50840571 · 000151</span>
                <span style={{ fontSize: 10, fontWeight: 500, marginTop: 2 }}>DIE POST · B-Mail</span>
              </div>
            </div>
          </div>

          {/* Small absender info, light gray, top-left */}
          <div className="fm-sender">
            <span className="k">Absender:in</span>
            {profile.firstName} {profile.lastName} · <span className="tabular">{profile.plz}</span> {profile.municipality}
          </div>

          {/* Tiny WeCollect mark */}
          <img src="assets/wecollect-logo.png" alt="" className="fm-mark"/>
        </div>

        <div className="envelope-caption">
          <strong>Gefalteter Bogen, mit Tesafilm zugeklebt</strong><br/>
          Personendaten sind im Innern – Adresse und GAS-Stempel aussen.
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// FOLD DIAGRAM — three steps showing how the self-mailer works
// -------------------------------------------------------------------
function FoldDiagram() {
  return (
    <div className="fold-diagram">
      <div className="fold-step">
        <div className="nr">1</div>
        <div className="vis s1">
          <div className="top-content">Initiative · Name</div>
          <div className="bot-content">Unterschrift · Hinweise</div>
        </div>
        <h4>A4 hochkant, offen</h4>
        <p>Sie schreiben Name und Vornamen oberhalb, Unterschrift unterhalb der taktilen Faltkante.</p>
      </div>
      <div className="fold-step">
        <div className="nr">2</div>
        <div className="vis s2">
          <div style={{ position: 'absolute', inset: 12, fontSize: 9, color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6 }}>Schreibseite</div>
          <div className="fold-half">Aussenseite</div>
        </div>
        <h4>In der Mitte falten</h4>
        <p>Die Prägung führt die Hand zur Falzkante. Schreibseite kommt nach innen – Personendaten geschützt.</p>
      </div>
      <div className="fold-step">
        <div className="nr">3</div>
        <div className="vis s3">
          <div className="win"></div>
          <div className="stm"></div>
          <div className="tape" aria-hidden="true"></div>
        </div>
        <h4>Zukleben, einwerfen</h4>
        <p>Mit Tesafilm zukleben, in den Briefkasten – Geschäftsantwortsendung, keine Briefmarke nötig.</p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// QR AUDIO MODAL — full-screen scrim with phone mockup + audio player
// -------------------------------------------------------------------
function QRAudioModal({ open, side, bogenId, onClose }) {
  if (!open) return null;
  const isFront = side === 'front';
  const transcript = isFront
    ? 'Sie halten den Bogen mit der Schreibseite oben im Hochformat mit dem QR-Code oben links, was korrekt ist. Falten Sie nun das Blatt so, indem Sie die Unterkante des A4-Blatts nach oben falten und so das Blatt halbieren. Öffnen Sie nun das gefaltete Blatt wieder so, dass Sie ein A4-Blatt mit einem horizontalen Falt in der Mitte haben, den Sie zur Orientierung mit Ihren Fingern ertasten können. Oberhalb der ertastbaren Faltkante schreiben Sie Ihren Vor- und Nachnamen – Sie haben ca. 3 bis 4 Fingerbreit in der Höhe Platz. Unterhalb der Faltkante unterzeichnen Sie mit Ihrer Unterschrift. Alle anderen Angaben sind bereits korrekt vorgedruckt. Sie können das PDF zusätzlich mit einem Screenreader auf die korrekten Inhalte prüfen.'
    : 'Sie halten den Bogen auf der Rückseite – das ist die Versandseite. Auf dieser Seite finden Sie die Empfänger-Adresse des Initiativkomitees sowie den Stempel der Geschäftsantwortsendung; Sie brauchen daher keine Briefmarke. Nachdem Sie auf der Vorderseite Ihren Vor- und Nachnamen geschrieben und unterzeichnet haben, falten Sie den Bogen entlang der ertastbaren Faltkante in der Mitte, sodass die Schreibseite innen liegt. Kleben Sie die offene Kante mit einem Stück Tesafilm zu – so bleiben Ihre Personendaten geschützt. Werfen Sie den gefalteten Bogen anschliessend in den nächsten Briefkasten. Die Post stellt den Bogen dem Initiativkomitee zu, das die Stimmrechtsbescheinigung bei Ihrer Gemeinde einholt.';
  return (
    <div className="qr-modal-scrim" onClick={onClose} role="dialog" aria-label="Audio-Anleitung">
      <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Audio-Anleitung <small>{isFront ? 'Vorderseite' : 'Rückseite'}</small></h3>
          <button className="close-modal" onClick={onClose} aria-label="Schliessen">×</button>
        </div>
        <div className="screen">
          <div className="scan-frame">
            <div className="mini-qr"><QRCode size={64} side={side} bogenId={bogenId}/></div>
            <div>
              <strong>{isFront ? 'VORDERSEITE OBEN' : 'RÜCKSEITE – bitte umdrehen'}</strong>
              <div className="meta">{bogenId}</div>
            </div>
          </div>
          <h4>Gesprochene Anleitung</h4>
          <div className="transcript">{transcript}</div>
          <div className="player">
            <button className="play" aria-label="Wiedergabe"><i className="fa-solid fa-play"></i></button>
            <div className="bar"><div></div></div>
            <span className="time">0:24</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '14px 0 0', lineHeight: 1.5 }}>
            Demo · in der Pilotphase ausgespielt über wecollect.ch/bogen-anleitung
          </p>
        </div>
      </div>
    </div>
  );
}

window.MiniForm = MiniForm;
window.EnvelopeView = EnvelopeView;
window.FoldDiagram = FoldDiagram;
window.QRAudioModal = QRAudioModal;
