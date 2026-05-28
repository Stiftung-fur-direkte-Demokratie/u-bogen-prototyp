/* eslint-disable */
// Reusable bogen building-blocks: QR svg, scissor svg, AnnotationDot+Popover, etc.

const { useState: useStateE, useEffect: useEffectE, useRef: useRefE } = React;

// Base URL for the deployed prototype – QR codes encode a URL pointing here
// with ?side=front|back&id={bogenId} so a phone scan opens the audio guide.
const QR_BASE_URL = 'https://stiftung-fur-direkte-demokratie.github.io/u-bogen-prototyp/';

function buildBogenURL(side, bogenId) {
  return `${QR_BASE_URL}?side=${side}&id=${encodeURIComponent(bogenId || '')}`;
}

// Real, scannable QR code. Uses the global `qrcode` function provided by
// qrcode-generator (loaded via CDN in index.html / Druckvorlage.html).
function QRCode({ size = 78, value, side, bogenId, label }) {
  const url = value || (side ? buildBogenURL(side, bogenId) : QR_BASE_URL);

  // Auto type-number (0) + medium error correction is a good balance
  // for printed bogens that might be smudged or slightly folded.
  let modules;
  try {
    const qr = window.qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    const N = qr.getModuleCount();
    modules = { N, isDark: (y, x) => qr.isDark(y, x) };
  } catch (e) {
    // Library not loaded yet — render a blank box so the layout stays stable.
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={label || 'QR-Code'}>
        <rect width={size} height={size} fill="#fff"/>
      </svg>
    );
  }

  const { N, isDark } = modules;
  const cellSize = size / N;
  const cells = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (isDark(y, x)) cells.push([x, y]);
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={label || `QR-Code – ${url}`}>
      <rect width={size} height={size} fill="#fff"/>
      {cells.map(([x, y], i) => (
        <rect key={i} x={x * cellSize} y={y * cellSize} width={cellSize + 0.4} height={cellSize + 0.4} fill="#15161a"/>
      ))}
    </svg>
  );
}

function Scissors() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  );
}

// ----------------------------------------------------------------
// Annotation dot + popover system. Dots are positioned absolutely
// with {top,left} in % of the parent .bogen-face. Popover positions
// itself so it doesn't fall off the bogen edge.
// ----------------------------------------------------------------

function AnnotationDot({ id, top, left, n, active, onActivate, kind }) {
  return (
    <button
      className={'annot-dot' + (active ? ' is-active' : '') + (kind === 'tour' ? ' is-tour' : '')}
      style={{ top: `${top}%`, left: `${left}%` }}
      onClick={(e) => { e.stopPropagation(); onActivate(id); }}
      onMouseEnter={() => onActivate(id, 'hover')}
      aria-label={`Annotation ${n}`}
      data-annot-id={id}
    >
      {n}
    </button>
  );
}

function AnnotationPopover({ pop, onClose }) {
  if (!pop) return null;
  // Position the popover near the dot, offset to a sensible side
  // pop = {top, left, side, ...}
  const side = pop.side || 'right';
  const isRight = side === 'right';
  const isLeft = side === 'left';
  const isAbove = side === 'above';
  const isBelow = side === 'below';
  const styles = {};
  if (isRight) { styles.top = `${pop.top}%`; styles.left = `calc(${pop.left}% + 24px)`; styles.transform = 'translateY(-50%)'; }
  if (isLeft)  { styles.top = `${pop.top}%`; styles.right = `calc(${100 - pop.left}% + 24px)`; styles.transform = 'translateY(-50%)'; }
  if (isAbove) { styles.bottom = `calc(${100 - pop.top}% + 24px)`; styles.left = `${pop.left}%`; styles.transform = 'translateX(-50%)'; }
  if (isBelow) { styles.top = `calc(${pop.top}% + 24px)`; styles.left = `${pop.left}%`; styles.transform = 'translateX(-50%)'; }
  return (
    <div className="annot-pop" style={styles} onClick={(e) => e.stopPropagation()}>
      <button className="close" onClick={onClose} aria-label="Schliessen">×</button>
      <span className="pop-tag">{pop.tag || 'Erklärung'}</span>
      <h4>{pop.title}</h4>
      {pop.body && pop.body.map((p, i) => <p key={i}>{p}</p>)}
      {pop.lawref && <span className="lawref">{pop.lawref}</span>}
    </div>
  );
}

window.QRCode = QRCode;
window.QR_BASE_URL = QR_BASE_URL;
window.buildBogenURL = buildBogenURL;
window.Scissors = Scissors;
window.AnnotationDot = AnnotationDot;
window.AnnotationPopover = AnnotationPopover;
