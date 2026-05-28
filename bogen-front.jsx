/* eslint-disable */
// Vorderseite (Schreibseite) — A4 portrait. Fold horizontally in the middle.

function BogenFront({ profile, prefill = true, printMode = false, showAnnots = true, activeAnnotId, onAnnotActivate, tourId, onQRScan }) {
  const I = window.INITIATIVE;
  const committee = [
    'Barbara Antonioli Mantegazzini, Lugano', 'Kathrin Bertschy, Bern', 'Florence Brenzikofer, Oltingen',
    'Lukas Bühler, Zürich', 'Mathias Buschbeck, Châtelaine', 'Hasan Candan, Luzern',
    'Manuela Cattani, Genève', 'Christophe Clivaz, Sion', 'Martine Docourt, Neuchâtel',
    'Magdalena Erni, Thun', 'Jelena Filipovic, Bern', 'Marc Jost, Thun',
    'Delphine Klopfenstein Broggini, Versoix', 'Anne Mahrer, Puplinge', 'Valentine Python, La Tour-de-Peilz',
    'David Rädler, Lausanne', 'Franziska Ryser, St. Gallen', 'Priska Seiler Graf, Kloten',
    'Nicola Siegrist, Zürich', 'Nara Valsangiacomo, Coldrerio', 'Dominik Waser, Zürich',
    'Loa Wild, Altdorf', 'Priska Wismer-Felder, Rickenbach', 'Marc Wuarin, Chêne-Bougeries',
    'Rolf Wüstenhagen, St. Gallen', 'Samson Yemane, Lausanne', 'Tonja Zürcher, Basel',
  ];
  return (
    <div className="bogen-face bogen-face--front" data-side="front">
      <div className="face-inner">
      <div className="front-grid">

        {/* ============================================================
            TOP HALF (above fold)
            ============================================================ */}
        <div className="half-top">

          {/* TOP STRIP: QR | Title | Meta */}
          <div className="front-top">
            <div
              className="qr-box"
              onClick={(e) => { e.stopPropagation(); onQRScan && onQRScan('front', profile.bogenId); }}
              title="QR-Code scannen (Demo)"
              role="button"
            >
              <QRCode size={78} side="front" bogenId={profile.bogenId} />
              <span className="qr-label">Vorderseite ↑</span>
            </div>
            <div className="front-title">
              <span className="kicker">Eidgenössische Volksinitiative</span>
              <h1>«Für einen starken öffentlichen Verkehr und faire Flugpreise <em>(Mobilitätsbon-Initiative)</em>»</h1>
            </div>
            <div className="front-meta">
              <span className="deadline">Ablauf Sammelfrist: {I.deadline}</span>
              <span className="bbl">Im Bundesblatt: {I.bblDate}</span>
              <span className="bogen-id">Bogen-ID: {profile.bogenId}</span>
              <span className="gemeinde-meta">Politische Gemeinde: {profile.municipality} · Kanton: {profile.canton}</span>
            </div>
          </div>

          {/* INITIATIVE TEXT — preamble + full constitutional text (3 columns for compactness) */}
          <div className="legal-block">
            <p className="lead">
              <strong>{I.legalText}</strong>
            </p>
            <div className="initiative-text initiative-text--3col">
              <p className="amendment-lead">{I.amendmentLead}</p>
              {I.amendmentArticles.map((art, i) => (
                <div key={i} className="art">
                  <h5>{art.heading}</h5>
                  {art.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                </div>
              ))}
            </div>
          </div>

          {/* VORGEDRUCKTE PERSONENDATEN — box only (heading entfernt für mehr Höhe unten) */}
          <div className="preprint-section">
            <div className="preprint-band">
              <div className="preprint-fields preprint-fields--single">
                <div className="f f-inline">
                  <span className="k">Geburtsdatum</span>
                  <span className="v">{profile.birthDate}</span>
                  <span className="sep">·</span>
                  <span className="k">Wohnadresse</span>
                  <span className="v address-line">
                    <span className="seg">{profile.street}</span>
                    <span className="sep">·</span>
                    <span className="seg"><span className="tabular">{profile.plz}</span> {profile.municipality}</span>
                  </span>
                </div>
              </div>
              <div className="preprint-kontrolle" aria-label="Kontrolle – leer lassen">
                <span className="pk-label">Kontrolle<br/><span className="pk-hint">(leer lassen)</span></span>
                <span className="pk-box"></span>
              </div>
            </div>
          </div>

          {/* NAME ZONE (above fold) */}
          <div className="write-zone write-zone--name">
            <div className="zone-label zone-label--name">
              {prefill && (profile.firstName || profile.lastName) ? (
                <strong>{profile.firstName} {profile.lastName}</strong>
              ) : (
                <strong>Vorname und Nachname</strong>
              )}
              <span className="instr">Schreiben Sie Ihren Vor- und Nachnamen in Blockschrift in das Feld.</span>
              {prefill && (profile.firstName || profile.lastName) && (
                <span className="instr instr--note">Der bereits angedruckte Wert dient nur zur Verifikation und ersetzt nicht die handschriftliche Angabe.</span>
              )}
            </div>
            <label className="assist-check assist-check--rotated">
              <input type="checkbox" defaultChecked={!!profile.assistMode && !printMode}/>
              <span>Der Bogen wird für eine schreibunfähige Person im Namen einer stimmberechtigten Assistenzperson ausgefüllt.</span>
            </label>
            {prefill && profile.assistMode && !printMode && (
              <span className="assist-handX" aria-hidden="true">✗</span>
            )}
            <div className="blank">
              {prefill && !profile.assistMode && !printMode && (
                <span className="hand">{profile.firstName.toUpperCase()}  {profile.lastName.toUpperCase()}</span>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================
            FOLD MARK — absolutely positioned at exactly 50% of the page
            ============================================================ */}
        <div className="fold-mark fold-mark-abs" aria-hidden="true">
          <span className="fold-mid">⟶ FALTKANTE, HIER FALTEN ⟵</span>
        </div>

        {/* ============================================================
            BOTTOM HALF (below fold)
            ============================================================ */}
        <div className="half-bottom">

          {/* SIGNATURE ZONE */}
          <div className="write-zone write-zone--sig">
            <div className="zone-label zone-label--sig">
              <strong>Eigenhändige Unterschrift</strong>
              <span className="instr">Bei Schreibunfähigkeit: Stimmberechtigte Assistenzperson trägt in Blockschrift «im Auftrag / i.A.» samt eigenem Namen ein und unterzeichnet selbst (Art. 18a VPR).</span>
            </div>
            <div className="blank">
              {!printMode && prefill && profile.assistMode && profile.assistant ? (
                <React.Fragment>
                  <span className="hand sig-name">i.A. {profile.assistant.firstName.toUpperCase()} {profile.assistant.lastName.toUpperCase()}</span>
                  <span className="hand sig sig-assist">{profile.assistant.firstName.charAt(0)}.{profile.assistant.lastName.toLowerCase()}</span>
                </React.Fragment>
              ) : (!printMode && prefill) ? (
                <span className="hand sig">{profile.firstName.charAt(0)}.{profile.lastName.split(' ')[0].toLowerCase()}</span>
              ) : null}
            </div>
          </div>

          {/* Penalty / honeypot — moved here from top half to free up space */}
          <p className="penalty-line">
            {I.honeypot}{' '}
            <span style={{ color: 'var(--text-muted)' }}>{I.penalty}</span>
          </p>

          {/* BOTTOM ROW: Bescheinigung + Komitee */}
          <div className="bottom-row">
            <div className="bescheinigung">
              <h4>Die untenstehende Stimmrechtsbescheinigung wird durch das Initiativkomitee eingeholt.</h4>
              <p className="bescheinigung-intro">
                Die unterzeichnete Amtsperson bescheinigt hiermit, dass obenstehende <span className="anzahl">&nbsp;</span> Unterzeichnerin / obenstehender Unterzeichner der Volksinitiative in eidgenössischen Angelegenheiten stimmberechtigt ist und die politischen Rechte in der erwähnten Gemeinde <strong style={{ fontWeight: 500 }}>{profile.municipality}</strong> ausübt.
              </p>
              <p className="bescheinigung-sub">Die zur Bescheinigung zuständige Amtsperson (eigenhändige Unterschrift und amtliche Eigenschaft):</p>
              <div className="b-grid">
                <span className="k">Ort</span><span className="line"></span>
                <span className="k">Eigenhändige Unterschrift</span><span className="line"></span>
                <span className="k">Datum</span><span className="line"></span>
                <span className="k">Amtl. Eigenschaft</span><span className="line"></span>
                <span className="k">Amtsstempel</span><span className="line tall" style={{ gridColumn: 'span 3' }}></span>
              </div>
            </div>
            <div className="komitee-col">
              <h4>Initiativkomitee</h4>
              <span style={{ fontSize: 8 }}>{committee.join(' · ')}</span>
              <span className="return-line">
                <strong>Bitte zurücksenden an:</strong><br/>
                {I.returnAddress[0]} · {I.returnAddress[1]}<br/>
                {I.returnAddress[2]} · <span style={{ fontVariantNumeric: 'tabular-nums' }}>{I.returnAddress[3]}</span>
              </span>
            </div>
          </div>
        </div>

      </div>
      </div>

      {/* ANNOTATIONS */}
      {showAnnots && window.ANNOTATIONS_FRONT.map((a) => (
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

window.BogenFront = BogenFront;
