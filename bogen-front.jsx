/* eslint-disable */
// Vorderseite (Schreibseite) — A4 portrait. Fold horizontally in the middle.

function BogenFront({ profile, prefill = true, showAnnots = true, activeAnnotId, onAnnotActivate, tourId, onQRScan }) {
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
              <QRCode size={78} seed={'front-' + profile.bogenId} />
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
              <div className="preprint-fields">
                <div className="f"><span className="k">Vorname</span><span className="v">{profile.firstName}</span></div>
                <div className="f"><span className="k">Name</span><span className="v">{profile.lastName}</span></div>
                <div className="f"><span className="k">Geburtsdatum</span><span className="v">{profile.birthDate}</span></div>
                <div className="f f-wide">
                  <span className="k">Wohnadresse · Politische Gemeinde · Kanton</span>
                  <span className="v address-line">
                    <span className="seg">{profile.street}</span>
                    <span className="sep">·</span>
                    <span className="seg"><span className="tabular">{profile.plz}</span> {profile.municipality}</span>
                    <span className="sep">·</span>
                    <span className="seg">Politische Gemeinde {profile.municipality}</span>
                    <span className="sep">·</span>
                    <span className="seg">Kanton {profile.canton}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* NAME ZONE (above fold) */}
          <div className="write-zone write-zone--name">
            <div className="zone-label">
              <strong>Vorname und Nachname</strong>
              <span>eigenhändig, in Blockschrift — Pflicht</span>
            </div>
            <div className="blank">
              {prefill && (
                <span className="hand">{profile.firstName.toUpperCase()}  {profile.lastName.toUpperCase()}</span>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================
            FOLD MARK — absolutely positioned at exactly 50% of the page
            ============================================================ */}
        <div className="fold-mark fold-mark-abs" aria-hidden="true">
          <span className="scissors"><Scissors/></span>
          <span className="fold-mid">⟶ Faltkante · taktil ertastbar ⟵</span>
          <span className="fold-label">Hier falten</span>
        </div>

        {/* ============================================================
            BOTTOM HALF (below fold)
            ============================================================ */}
        <div className="half-bottom">

          {/* SIGNATURE ZONE */}
          <div className="write-zone write-zone--sig">
            <div className="zone-label">
              <strong>Eigenhändige Unterschrift</strong>
              <span>oder «im Auftrag» bei Schreibunfähigkeit</span>
            </div>
            <div className="blank">
              {prefill && (
                <span className="hand sig">{profile.firstName.charAt(0)}.{profile.lastName.split(' ')[0].toLowerCase()}</span>
              )}
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
              <h4>Stimmrechtsbescheinigung (durch die Gemeinde)</h4>
              <div className="b-grid">
                <span className="k">Anzahl</span><span><span className="anzahl">1</span> Person stimmberechtigt in <strong style={{ fontWeight: 500 }}>{profile.municipality}</strong></span>
                <span className="k">Ort</span><span className="line"></span>
                <span className="k">Datum</span><span className="line"></span>
                <span className="k">Amtsperson</span><span className="line"></span>
                <span className="k">Eigenschaft</span><span className="line"></span>
                <span className="k">Amtsstempel</span><span className="line tall" style={{ gridColumn: 'span 3' }}></span>
              </div>
              <p className="note">Die Stimmrechtsbescheinigung wird durch das Initiativkomitee eingeholt.</p>
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
