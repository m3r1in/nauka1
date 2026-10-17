import { FRAMEWORKS, FW_BY_ID, REQ_BY_ID, REPORTING } from './data/frameworks.js';
import { TEMPLATES, TEMPLATE_BY_ID, DOC_TYPES, LAYERS } from './data/templates.js';
import { TECHNOLOGIES, TECH_BY_ID, SCENARIOS } from './data/technologies.js';
import { TEST_TYPES, EXERCISES, EXERCISE_BY_ID } from './data/exercises.js';
import { sampleState } from './data/sample.js';
import {
  uid, today, emptyState, fmtH, esc, fmtDate, fmtDT, byId, children, descendants, ancestors,
  systemRequirements, gaps, recoveryOrder, compliance, activeRegimes, deadlines, stepsFromTech, createDoc,
  generateStructure, expand, STATUS, docToMarkdown, bundleMarkdown, md, buildTestSteps, testTypeName, attention,
} from './logic.js';

const KEY = 'bcm-studio.v1';
const inFrame = (() => { try { return window.self !== window.top; } catch { return true; } })();
let S = load() || sampleState();
persist();

function load() { try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch { return null; } }
function persist() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* brak dostępu do pamięci */ } }
let saveT;
const persistSoon = () => { clearTimeout(saveT); saveT = setTimeout(persist, 300); };

// ───────── ikony ─────────
const I = {
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  biz: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
  tech: '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  docs: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
  test: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 14h9"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  clock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
  down: '<path d="M12 4v12M6 11l6 6 6-6M4 20h16"/>',
};
const icon = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const NAV = [
  ['#/', 'Pulpit', 'home'], ['#/biz', 'Biznes (BIA)', 'biz'], ['#/tech', 'Technika', 'tech'], ['#/docs', 'Dokumenty', 'docs'],
  ['#/tests', 'Testy i ćwiczenia', 'test'], null, ['#/compliance', 'Zgodność', 'shield'], ['#/clock', 'Zegar raportowy', 'clock'], ['#/settings', 'Ustawienia i dane', 'gear'],
];
const TABS = [['#/', 'Pulpit', 'home'], ['#/biz', 'Biznes', 'biz'], ['#/tech', 'Technika', 'tech'], ['#/docs', 'Dokumenty', 'docs'], ['#/tests', 'Testy', 'test'], ['#/more', 'Więcej', 'more']];

document.getElementById('nav').innerHTML = NAV.map(n => n ? `<a href="${n[0]}" data-nav="${n[0]}">${icon(n[2])}<span>${n[1]}</span></a>` : '<div class="sep"></div>').join('');
document.getElementById('tabbar').innerHTML = TABS.map(n => `<a href="${n[0]}" data-nav="${n[0]}">${icon(n[2])}<span>${n[1]}</span></a>`).join('');

function setNav() {
  const h = location.hash.split('?')[0] || '#/';
  const base = '#/' + (h.slice(2).split('/')[0] || '');
  const map = { '#/doc': '#/docs', '#/test': '#/tests' };
  const cur = map[base] || base;
  document.querySelectorAll('[data-nav]').forEach(a => {
    const n = a.dataset.nav;
    const on = n === cur || (n === '#/more' && ['#/compliance', '#/clock', '#/settings', '#/more'].includes(cur));
    on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  document.getElementById('foot').textContent = S.org.name || '';
}

// ───────── pomocnicze HTML ─────────
const h = esc;
const fid = (...p) => p.join('-').replace(/[^\w-]/g, '_');
const opt = (v, label, sel) => `<option value="${h(v)}"${sel ? ' selected' : ''}>${h(label)}</option>`;
const fld = (label, input, hint = '', wide = false) => `<label class="fld${wide ? ' wide' : ''}"><span>${label}</span>${input}${hint ? `<small>${hint}</small>` : ''}</label>`;
const inp = (e, id, f, val, type = 'text', extra = '') =>
  `<input id="${fid(e, id, f)}" type="${type}" data-e="${e}" data-id="${h(id)}" data-f="${h(f)}" value="${h(val ?? '')}"${type === 'number' ? ' data-t="num" step="any" min="0" inputmode="decimal"' : ''} ${extra}>`;
const area = (e, id, f, val, extra = '') => `<textarea id="${fid(e, id, f)}" data-e="${e}" data-id="${h(id)}" data-f="${h(f)}" ${extra}>${h(val ?? '')}</textarea>`;
const sel = (e, id, f, val, options, extra = '') =>
  `<select id="${fid(e, id, f)}" data-e="${e}" data-id="${h(id)}" data-f="${h(f)}" ${extra}>${options.map(([v, l]) => opt(v, l, String(v) === String(val ?? ''))).join('')}</select>`;
const checks = (e, id, f, values, options) => `<div class="checks">${options.map(([v, l, sub]) =>
  `<label class="chk"><input type="checkbox" id="${fid(e, id, f, v)}" data-e="${e}" data-id="${h(id)}" data-list="${h(f)}" value="${h(v)}"${values.includes(v) ? ' checked' : ''}><span>${h(l)}${sub ? `<small>${h(sub)}</small>` : ''}</span></label>`).join('')}</div>`;
const statusPill = st => `<span class="pill ${st === 'approved' ? 'ok' : st === 'review' ? 'acc' : ''}">${STATUS[st]}</span>`;
const layerDot = l => `<span class="layer ${l}" title="Warstwa ${h(LAYERS[l]?.name || '')}"></span>`;
const typeBadge = t => `<span class="type" title="${DOC_TYPES[t].name}">${DOC_TYPES[t].short}</span>`;
const page = (eyebrow, title, actions, body) => `<div class="wrap"><div class="head"><div><span class="eyebrow">${eyebrow}</span><h1>${h(title)}</h1></div>${actions ? `<div class="row">${actions}</div>` : ''}</div>${body}</div>`;
const del = (what, id, label = 'Usuń') => `<button class="btn danger sm" data-act="del" data-what="${what}" data-id="${h(id)}">${label}</button>`;
const sampleBanner = () => S.sample ? `<div class="banner noprint"><span><b>Dane przykładowe.</b> Pokazują działanie aplikacji na fikcyjnej spółce.</span><button class="btn sm" data-act="reset">Wyczyść i zacznij od zera</button></div>` : '';

let toastT;
function toast(msg) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
  document.body.append(t); clearTimeout(toastT); toastT = setTimeout(() => t.remove(), 2400);
}

// Pobranie pliku albo – w ramce, gdzie pobieranie jest zablokowane – okno do skopiowania.
function deliver(name, text, mime = 'text/markdown') {
  if (!inFrame) {
    try {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([text], { type: `${mime};charset=utf-8` }));
      a.download = name; document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
      toast(`Pobrano ${name}`); return;
    } catch { /* przejdź do kopiowania */ }
  }
  showModal(name, text);
}
function showModal(title, text) {
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="card" role="dialog" aria-label="${h(title)}"><div class="row" style="justify-content:space-between"><h2>${h(title)}</h2><button class="btn sm" data-close>Zamknij</button></div>
    <p class="small muted">Skopiuj treść i zapisz ją jako plik.</p><textarea id="modal-text" readonly>${h(text)}</textarea>
    <div class="row"><button class="btn primary" data-copy>${icon('copy')}Kopiuj</button></div></div>`;
  m.addEventListener('click', e => {
    if (e.target === m || e.target.closest('[data-close]')) m.remove();
    if (e.target.closest('[data-copy]')) copyText(text, m.querySelector('textarea'));
  });
  document.body.append(m);
}
function copyText(text, fallbackEl) {
  const done = () => toast('Skopiowano');
  try {
    navigator.clipboard.writeText(text).then(done, () => { fallbackEl?.select(); toast('Zaznaczono – skopiuj ręcznie'); });
  } catch { fallbackEl?.select(); }
}

// ───────── widoki ─────────
function dashboard() {
  const c = compliance(S);
  const g = gaps(S);
  const att = attention(S);
  const yearAgo = new Date(Date.now() - 365 * 864e5).toISOString().slice(0, 10);
  const testsYear = S.tests.filter(t => t.status === 'done' && (t.endedAt || '') >= yearAgo).length;
  const approved = S.documents.filter(d => d.status === 'approved').length;
  const upcoming = S.tests.filter(t => t.status !== 'done').sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  const openF = S.tests.reduce((a, t) => a + (t.findings || []).filter(f => !f.done).length, 0);
  const lvl = Object.entries(DOC_TYPES).map(([k, t]) => ({ k, t, n: S.documents.filter(d => d.type === k).length }));
  return page('Pulpit', S.org.name || 'Twoja organizacja',
    `<a class="btn" href="#/clock">${icon('clock')}Zegar raportowy</a><button class="btn primary" data-act="gen">${icon('docs')}Zbuduj strukturę dokumentów</button>`,
    `${sampleBanner()}
    <div class="kpis">
      <a class="kpi" href="#/compliance"><span class="eyebrow">Zgodność</span><b>${c.score}%</b><small>${c.perFw.length} ram odniesienia</small></a>
      <a class="kpi${g.length ? ' alert' : ''}" href="#/tech"><span class="eyebrow">Luki RTO/RPO</span><b>${g.length}</b><small>wymagane vs osiągalne</small></a>
      <a class="kpi" href="#/biz"><span class="eyebrow">Procesy w BIA</span><b>${S.processes.length}</b><small>${S.processes.filter(p => +p.criticality >= 4).length} krytycznych</small></a>
      <a class="kpi" href="#/docs"><span class="eyebrow">Dokumenty</span><b>${S.documents.length}</b><small>${approved} zatwierdzonych</small></a>
      <a class="kpi${testsYear ? '' : ' alert'}" href="#/tests"><span class="eyebrow">Testy (12 mies.)</span><b>${testsYear}</b><small>${upcoming.length} zaplanowanych</small></a>
      <a class="kpi${openF ? ' alert' : ''}" href="#/tests"><span class="eyebrow">Otwarte ustalenia</span><b>${openF}</b><small>działania korygujące</small></a>
    </div>
    <div class="grid2">
      <section class="card"><h2>Wymaga uwagi</h2>${att.length ? `<ul class="alerts">${att.slice(0, 9).map(a => `<li><a href="${a.href}"><span class="dot ${a.sev}"></span><span>${h(a.text)}</span></a></li>`).join('')}</ul>${att.length > 9 ? `<p class="small muted">i ${att.length - 9} więcej</p>` : ''}` : '<p class="muted">Brak otwartych spraw.</p>'}</section>
      <section class="card stack"><h2>Pokrycie wymagań</h2>
        ${c.perFw.map(f => `<a class="fwrow" href="#/compliance" style="text-decoration:none;color:inherit"><span class="small">${h(f.fw.name)}</span><span class="mono small" style="text-align:right">${f.score}%</span><span class="bar"><i style="width:${f.score}%"></i></span></a>`).join('') || '<p class="muted">Wybierz ramy w ustawieniach.</p>'}
      </section>
    </div>
    <div class="grid2">
      <section class="card"><h2>Hierarchia dokumentacji</h2>
        <div class="pyr">${lvl.map((x, i) => `<a href="#/docs" style="width:${40 + i * 20}%"><span>${x.t.name === 'Polityka' ? 'Polityki' : x.t.name === 'Plan' ? 'Plany' : x.t.name === 'Procedura' ? 'Procedury' : 'Instrukcje'}</span><b>${x.n}</b></a>`).join('')}</div>
        <p class="small muted" style="margin:12px 0 0">Od zasad zatwierdzanych przez zarząd do kroków wykonywanych przez administratorów.</p>
      </section>
      <section class="card"><h2>Najbliższe testy</h2>${upcoming.length ? `<div class="items">${upcoming.slice(0, 4).map(testItem).join('')}</div>` : `<p class="muted">Brak zaplanowanych testów.</p><a class="btn" href="#/test/new">${icon('plus')}Zaplanuj test</a>`}</section>
    </div>`);
}

// ── Biznes / BIA
const CRIT_OPTS = [[5, '5 – krytyczny'], [4, '4 – wysoki'], [3, '3 – średni'], [2, '2 – niski'], [1, '1 – pomijalny']];
function bizList() {
  const g = gaps(S);
  const ps = [...S.processes].sort((a, b) => b.criticality - a.criticality || a.name.localeCompare(b.name, 'pl'));
  return page('Warstwa biznesowa', 'Procesy i analiza BIA', `<button class="btn primary" data-act="add-process">${icon('plus')}Dodaj proces</button>`,
    `${sampleBanner()}
    <p class="muted small" style="margin:0">MTPD – maksymalny tolerowany okres zakłócenia. RTO – docelowy czas odtworzenia. RPO – dopuszczalna utrata danych. MBCO – minimalny akceptowalny poziom działania.</p>
    ${ps.length ? `<div class="tbl"><table><thead><tr><th>Proces</th><th>Krytyczność</th><th class="num">MTPD</th><th class="num">RTO</th><th class="num">RPO</th><th>Systemy</th><th>Stan</th></tr></thead><tbody>
    ${ps.map(p => { const pg = g.filter(x => x.process.id === p.id); return `<tr class="click" data-go="#/biz/${p.id}"><td><a href="#/biz/${p.id}"><b>${h(p.name)}</b></a><div class="small muted">${h(p.owner)}</div></td>
      <td><span class="crit-n c${p.criticality}">${p.criticality}</span></td><td class="num">${fmtH(p.mtpd)}</td><td class="num">${fmtH(p.rto)}</td><td class="num">${fmtH(p.rpo)}</td>
      <td class="small">${(p.systems || []).map(id => h(byId(S.systems, id)?.name || '')).join(', ') || '–'}</td>
      <td>${pg.length ? `<span class="pill crit">${pg.length} ${pg.length === 1 ? 'luka' : 'luki'}</span>` : (p.rto === '' || p.rto == null) ? '<span class="pill warn">brak RTO</span>' : '<span class="pill ok">OK</span>'}</td></tr>`; }).join('')}
    </tbody></table></div>` : `<div class="card empty"><p>Nie ma jeszcze procesów. Zacznij od procesów, których przerwanie najbardziej zaszkodzi organizacji.</p><button class="btn primary" data-act="add-process">${icon('plus')}Dodaj pierwszy proces</button></div>`}`);
}

const IMP_CAT = [['fin', 'Finansowy'], ['legal', 'Prawny / regulacyjny'], ['rep', 'Reputacyjny'], ['ops', 'Operacyjny / klienci']];
const IMP_H = [['h4', '4 h', 4], ['h24', '24 h', 24], ['h72', '72 h', 72], ['w1', '1 tydz.', 168]];
const IMP_L = [[0, '0 – brak'], [1, '1 – mały'], [2, '2 – umiarkowany'], [3, '3 – poważny'], [4, '4 – krytyczny']];

function processEdit(id) {
  const p = byId(S.processes, id);
  if (!p) return notFound();
  p.impacts ||= {};
  const firstSevere = IMP_H.find(([k]) => Object.values(p.impacts[k] || {}).some(v => +v >= 3));
  const warn = [];
  if (p.rto !== '' && p.mtpd !== '' && +p.rto > +p.mtpd) warn.push('RTO jest dłuższe niż MTPD – proces nie zostanie odtworzony przed granicą tolerancji.');
  if (firstSevere && p.mtpd !== '' && +p.mtpd > firstSevere[2]) warn.push(`Wpływ staje się poważny po ${firstSevere[1]}, a MTPD wynosi ${fmtH(p.mtpd)}. Rozważ skrócenie MTPD.`);
  const g = gaps(S).filter(x => x.process.id === p.id);
  const docs = S.documents.filter(d => (d.processes || []).includes(p.id));
  return page('Proces · BIA', p.name || 'Nowy proces', `<a class="btn" href="#/biz">Wróć do listy</a>${del('process', p.id)}`,
    `<section class="card"><div class="form">
      ${fld('Nazwa procesu', inp('processes', p.id, 'name', p.name, 'text', 'data-r'), '', true)}
      ${fld('Właściciel', inp('processes', p.id, 'owner', p.owner))}
      ${fld('Jednostka', inp('processes', p.id, 'dept', p.dept))}
      ${fld('Krytyczność', sel('processes', p.id, 'criticality', p.criticality, CRIT_OPTS, 'data-t="num" data-r'))}
    </div></section>
    <section class="card"><h2>Ocena wpływu w czasie</h2>
      <div class="tbl matrix"><table><thead><tr><th>Kategoria</th>${IMP_H.map(([, l]) => `<th>${l}</th>`).join('')}</tr></thead><tbody>
      ${IMP_CAT.map(([c, cl]) => `<tr><td>${cl}</td>${IMP_H.map(([k]) => { const v = p.impacts[k]?.[c] ?? 0; return `<td class="imp${v}">${sel('processes', p.id, `impacts.${k}.${c}`, v, IMP_L.map(([n]) => [n, String(n)]), 'data-t="num" data-r aria-label="' + cl + '"')}</td>`; }).join('')}</tr>`).join('')}
      </tbody></table></div>
      <p class="small muted" style="margin:0">Skala: 0 brak · 1 mały · 2 umiarkowany · 3 poważny · 4 krytyczny. ${firstSevere ? `Wpływ poważny pojawia się po <b>${firstSevere[1]}</b>.` : 'Wpływ nie osiąga poziomu poważnego w ciągu tygodnia.'}</p>
    </section>
    <section class="card"><h2>Cele odtworzenia</h2><div class="form">
      ${fld('MTPD (godziny)', inp('processes', p.id, 'mtpd', p.mtpd, 'number', 'data-r'), fmtH(p.mtpd))}
      ${fld('RTO (godziny)', inp('processes', p.id, 'rto', p.rto, 'number', 'data-r'), fmtH(p.rto))}
      ${fld('RPO (godziny)', inp('processes', p.id, 'rpo', p.rpo, 'number', 'data-r'), `${fmtH(p.rpo)} · 0,25 = 15 min`)}
      ${fld('MBCO', inp('processes', p.id, 'mbco', p.mbco), 'np. 70% wolumenu transakcji')}
    </div>${warn.map(w => `<p class="hint" style="margin:12px 0 0">${h(w)}</p>`).join('')}</section>
    <section class="card"><h2>Systemy wspierające</h2>
      ${S.systems.length ? checks('processes', p.id, 'systems', p.systems || [], S.systems.map(x => [x.id, x.name, `osiągalne RTO ${fmtH(x.rtoCap)}, RPO ${fmtH(x.rpoCap)}`])) : '<p class="muted">Najpierw dodaj systemy w zakładce Technika.</p>'}
      ${g.length ? `<div class="tbl" style="margin-top:12px"><table><thead><tr><th>Luka</th><th>System</th><th class="num">Wymagane</th><th class="num">Osiągalne</th></tr></thead><tbody>${g.map(x => `<tr><td><span class="pill crit">${x.kind}</span></td><td>${h(x.system.name)}${x.direct ? '' : ' <span class="small muted">(zależność)</span>'}</td><td class="num">${fmtH(x.need)}</td><td class="num">${fmtH(x.have)}</td></tr>`).join('')}</tbody></table></div>` : ''}
    </section>
    <section class="card"><h2>Dokumenty procesu</h2>
      ${docs.length ? `<div class="items">${docs.map(docItem).join('')}</div>` : '<p class="muted">Brak dokumentów powiązanych z procesem.</p>'}
      <div class="row" style="margin-top:12px"><button class="btn" data-act="new-manual" data-id="${p.id}">${icon('plus')}Instrukcja trybu awaryjnego</button></div>
    </section>
    <section class="card">${fld('Uwagi', area('processes', p.id, 'notes', p.notes, 'style="min-height:80px"'), '', true)}</section>`);
}

// ── Technika
function techList() {
  const g = gaps(S);
  return page('Warstwa techniczna', 'Systemy i infrastruktura', `<button class="btn primary" data-act="add-system">${icon('plus')}Dodaj system</button>`,
    `${sampleBanner()}
    ${S.systems.length ? `<div class="tbl"><table><thead><tr><th>System</th><th>Technologie</th><th class="num">RTO wym. / osiąg.</th><th class="num">RPO wym. / osiąg.</th><th>Stan</th></tr></thead><tbody>
    ${S.systems.map(x => { const r = systemRequirements(S, x.id); const sg = g.filter(y => y.system.id === x.id); const ins = S.documents.filter(d => d.type === 'instruction' && (d.systems || []).includes(x.id)).length;
      return `<tr class="click" data-go="#/tech/${x.id}"><td><a href="#/tech/${x.id}"><b>${h(x.name)}</b></a><div class="small muted">${h(x.owner)}</div></td>
      <td class="small">${(x.tech || []).map(t => h(TECH_BY_ID[t]?.name || t)).join(', ') || '–'}</td>
      <td class="num">${fmtH(r.rto)} / ${fmtH(x.rtoCap)}</td><td class="num">${fmtH(r.rpo)} / ${fmtH(x.rpoCap)}</td>
      <td><div class="row">${sg.length ? `<span class="pill crit">${[...new Set(sg.map(y => y.kind))].join(', ')}</span>` : '<span class="pill ok">OK</span>'}${ins ? `<span class="pill">${ins} instr.</span>` : '<span class="pill warn">brak instrukcji</span>'}</div></td></tr>`; }).join('')}
    </tbody></table></div>
    <section class="card"><h2>Kolejność odtwarzania</h2><p class="small muted" style="margin-top:-6px">Wyliczona z zależności i najostrzejszego wymaganego RTO.</p>
      <ol class="steps">${recoveryOrder(S).map(o => `<li><div><b>${h(o.sys.name)}</b> <span class="small muted">· wymagane RTO ${fmtH(o.rto)}${o.sys.deps?.length ? ` · po: ${o.sys.deps.map(d => h(byId(S.systems, d)?.name || '')).join(', ')}` : ''}</span></div></li>`).join('')}</ol>
    </section>` : `<div class="card empty"><p>Dodaj systemy wspierające procesy z BIA, aby porównać osiągalne i wymagane czasy odtworzenia.</p><button class="btn primary" data-act="add-system">${icon('plus')}Dodaj pierwszy system</button></div>`}`);
}

function systemEdit(id) {
  const x = byId(S.systems, id);
  if (!x) return notFound();
  const r = systemRequirements(S, x.id);
  const g = gaps(S).filter(y => y.system.id === x.id);
  const ins = S.documents.filter(d => (d.systems || []).includes(x.id));
  const cats = [...new Set(TECHNOLOGIES.map(t => t.cat))];
  return page('System', x.name || 'Nowy system', `<a class="btn" href="#/tech">Wróć do listy</a>${del('system', x.id)}`,
    `<section class="card"><div class="form">
      ${fld('Nazwa systemu', inp('systems', x.id, 'name', x.name, 'text', 'data-r'), '', true)}
      ${fld('Właściciel techniczny', inp('systems', x.id, 'owner', x.owner))}
      ${fld('Osiągalne RTO (godziny)', inp('systems', x.id, 'rtoCap', x.rtoCap, 'number', 'data-r'), `${fmtH(x.rtoCap)} · wymagane: ${fmtH(r.rto)}`)}
      ${fld('Osiągalne RPO (godziny)', inp('systems', x.id, 'rpoCap', x.rpoCap, 'number', 'data-r'), `${fmtH(x.rpoCap)} · wymagane: ${fmtH(r.rpo)}`)}
      ${fld('Kopie zapasowe', inp('systems', x.id, 'backup', x.backup), 'metoda, częstotliwość, kopia niezmienna')}
      ${fld('Ośrodek / rozwiązanie zapasowe', inp('systems', x.id, 'drSite', x.drSite))}
    </div>
    ${g.length ? `<p class="hint" style="margin:12px 0 0">${g.map(y => `${y.kind}: osiągalne ${fmtH(y.have)}, a proces „${h(y.process.name)}” wymaga ${fmtH(y.need)}.`).join(' ')}</p>` : ''}
    </section>
    <section class="card"><h2>Technologie</h2><p class="small muted" style="margin-top:-6px">Wybór steruje instrukcjami generowanymi z biblioteki.</p>
      ${cats.map(c => `<details ${TECHNOLOGIES.some(t => t.cat === c && (x.tech || []).includes(t.id)) ? 'open' : ''}><summary>${h(c)}</summary>${checks('systems', x.id, 'tech', x.tech || [], TECHNOLOGIES.filter(t => t.cat === c).map(t => [t.id, t.name, Object.keys(t.steps).map(s => SCENARIOS[s].name.toLowerCase()).join(', ')]))}</details>`).join('')}
    </section>
    <section class="card"><h2>Zależy od</h2>
      ${S.systems.length > 1 ? checks('systems', x.id, 'deps', x.deps || [], S.systems.filter(y => y.id !== x.id).map(y => [y.id, y.name])) : '<p class="muted">Brak innych systemów.</p>'}
      <p class="small muted" style="margin:10px 0 0">Wspiera procesy: ${r.via.map(v => `${h(v.p.name)}${v.direct ? '' : ' (pośrednio)'}`).join(', ') || '–'}</p>
    </section>
    <section class="card"><h2>Instrukcje i dokumenty</h2>
      ${ins.length ? `<div class="items">${ins.map(docItem).join('')}</div>` : '<p class="muted">Brak instrukcji dla tego systemu.</p>'}
      <div class="row" style="margin-top:12px"><a class="btn primary" href="#/docs/new?tpl=ins-tech&sys=${x.id}">${icon('plus')}Zbuduj instrukcję techniczną</a></div>
    </section>
    <section class="card">${fld('Uwagi', area('systems', x.id, 'notes', x.notes, 'style="min-height:80px"'), '', true)}</section>`);
}

// ── Dokumenty
const docItem = d => `<a class="item" href="#/doc/${d.id}">${typeBadge(d.type)}${layerDot(d.layer)}<span class="grow"><span class="t">${h(d.title)}</span><span class="meta"><span>v${h(d.version)}</span><span>${h(d.owner || 'brak właściciela')}</span></span></span>${statusPill(d.status)}</a>`;

function docsTree() {
  const q = query();
  const layer = q.get('layer') || '';
  const visible = d => !layer || d.layer === layer || d.layer === 'both';
  const roots = S.documents.filter(d => !d.parentId || !byId(S.documents, d.parentId))
    .sort((a, b) => DOC_TYPES[a.type].level - DOC_TYPES[b.type].level || a.title.localeCompare(b.title, 'pl'));
  const rows = [];
  const walk = (d, depth) => { if (visible(d)) rows.push([d, depth]); children(S, d.id).forEach(c => walk(c, visible(d) ? depth + 1 : depth)); };
  roots.forEach(r => walk(r, 0));
  const tabs = [['', 'Wszystkie'], ['biz', 'Biznesowe'], ['tech', 'Techniczne']];
  return page('Dokumentacja', 'Od polityk do instrukcji',
    `<button class="btn" data-act="bundle">${icon('down')}Eksport pakietu</button><button class="btn" data-act="gen">Uzupełnij strukturę</button><a class="btn primary" href="#/docs/new">${icon('plus')}Nowy dokument</a>`,
    `${sampleBanner()}
    <div class="row" style="justify-content:space-between">
      <div class="seg" role="tablist">${tabs.map(([v, l]) => `<button role="tab" class="${layer === v ? 'on ok' : ''}" data-act="filter-layer" data-v="${v}" aria-selected="${layer === v}">${l}</button>`).join('')}</div>
      <div class="legend"><span>${layerDot('biz')}biznesowa</span><span>${layerDot('tech')}techniczna</span><span>${layerDot('both')}obie</span><span><span class="type">POL</span>→<span class="type">INS</span> poziom</span></div>
    </div>
    ${rows.length ? `<div class="tree">${rows.map(([d, depth]) => `<a class="node" href="#/doc/${d.id}" style="--d:${depth}" data-level="${DOC_TYPES[d.type].level}">${typeBadge(d.type)}${layerDot(d.layer)}<span class="t">${h(d.title)}</span>${statusPill(d.status)}</a>`).join('')}</div>`
      : `<div class="card empty"><p>Brak dokumentów. Generator zbuduje politykę, plany BCP/DRP/IRP, procedury i instrukcje dla Twoich procesów i technologii.</p><button class="btn primary" data-act="gen">Zbuduj strukturę dokumentów</button></div>`}`);
}

function docNew() {
  const q = query();
  const tplId = q.get('tpl') || '';
  const t = TEMPLATE_BY_ID[tplId];
  const parentId = q.get('parent') || '';
  const sysId = q.get('sys') || '';
  if (!t) {
    return page('Nowy dokument', 'Wybierz szablon', `<a class="btn" href="#/docs">Anuluj</a>`,
      Object.entries(DOC_TYPES).map(([k, dt]) => `<section class="card"><h2>${typeBadge(k)} ${dt.name === 'Polityka' ? 'Polityki' : dt.name === 'Plan' ? 'Plany' : dt.name === 'Procedura' ? 'Procedury' : 'Instrukcje'}</h2>
        <div class="items">${TEMPLATES.filter(x => x.type === k).map(x => `<a class="item" href="#/docs/new?tpl=${x.id}${parentId ? `&parent=${parentId}` : ''}">${layerDot(x.layer)}<span class="grow"><span class="t">${h(x.name)}</span><span class="meta">${x.builder ? 'kroki z biblioteki technologii · ' : ''}${x.reqs.length} wymagań · ${[...new Set(x.reqs.map(r => FW_BY_ID[r.split(':')[0]]?.name.split(' ')[0]))].join(', ')}</span></span></a>`).join('')}</div></section>`).join(''));
  }
  const parents = S.documents.filter(d => DOC_TYPES[t.type].parents.includes(d.type));
  const sys = sysId && byId(S.systems, sysId);
  const techs = sys?.tech?.length ? TECHNOLOGIES.filter(x => sys.tech.includes(x.id)) : TECHNOLOGIES;
  const defaultParent = parentId || (t.builder ? S.documents.find(d => d.genKey === 'proc-recovery')?.id : '') || '';
  return page('Nowy dokument', t.name, `<a class="btn" href="#/docs/new">Zmień szablon</a>`,
    `<form class="card stack" id="newdoc">
      <div class="form">
        ${fld('Tytuł', `<input type="text" id="nd-title" name="title" value="${h(sys ? `Odtworzenie – ${sys.name}` : t.name)}" required>`, '', true)}
        ${fld('Dokument nadrzędny', `<select id="nd-parent" name="parent">${opt('', '— brak (dokument główny) —')}${parents.map(d => opt(d.id, `${DOC_TYPES[d.type].short} · ${d.title}`, d.id === defaultParent)).join('')}</select>`, `Dozwolone: ${DOC_TYPES[t.type].parents.map(p => DOC_TYPES[p].name.toLowerCase()).join(', ') || 'brak – to dokument najwyższego poziomu'}`, true)}
      </div>
      ${t.builder ? `<h2>Technologia i scenariusze</h2>
        <div class="form">${fld('Technologia', `<select id="nd-tech" name="tech">${techs.map(x => opt(x.id, `${x.cat} · ${x.name}`)).join('')}</select>`)}
        ${fld('System', `<select id="nd-sys" name="sys">${opt('', '— dowolny —')}${S.systems.map(x => opt(x.id, x.name, x.id === sysId)).join('')}</select>`)}</div>
        <div class="checks" id="nd-sc">${Object.entries(SCENARIOS).map(([k, v]) => `<label class="chk"><input type="checkbox" name="sc" value="${k}" ${['restore', 'verify'].includes(k) ? 'checked' : ''}><span>${v.name}<small>faza: ${v.phase.toLowerCase()}</small></span></label>`).join('')}</div>
        <p class="small muted" style="margin:0">Scenariusze, których technologia nie obsługuje, zostaną pominięte. Kroki możesz potem edytować.</p>` : ''}
      <div class="row"><button class="btn primary" type="submit">Utwórz dokument</button></div>
    </form>`);
}

function docView(id) {
  const d = byId(S.documents, id);
  if (!d) return notFound();
  const anc = ancestors(S, d);
  const kids = children(S, d.id);
  const t = DOC_TYPES[d.type];
  const childTypes = Object.entries(DOC_TYPES).filter(([, x]) => x.parents.includes(d.type));
  // Kroki w grupach (fazach); numeracja ciągła przez wszystkie grupy.
  const groups = [];
  d.steps.forEach(st => { const last = groups.at(-1); if (last && last.name === st.group) last.items.push(st); else groups.push({ name: st.group, items: [st] }); });
  let n = 0;
  const stepList = groups.map(gr => {
    const start = n; n += gr.items.length;
    return `${gr.name ? `<div class="grp">${h(gr.name)}</div>` : ''}<ol class="steps" start="${start + 1}" style="counter-reset:s ${start}">${gr.items.map(st =>
      `<li><div>${st.who ? `<div class="who">${h(st.who)}</div>` : ''}<div>${h(st.action)}</div>${st.cmd ? `<pre class="cmd"><code>${h(st.cmd)}</code></pre><button class="btn sm ghost noprint" data-act="copy" data-text="${h(st.cmd)}">${icon('copy')}Kopiuj polecenie</button>` : ''}${st.expected ? `<div class="exp">✓ ${h(st.expected)}</div>` : ''}</div></li>`).join('')}</ol>`;
  }).join('');
  const inlineSteps = d.sections.some(sec => sec.content.includes('{{steps}}'));
  const steps = d.steps.length && !inlineSteps ? `<h2>Kroki</h2>${stepList}` : '';
  const secHtml = sec => sec.content.trim() === '{{steps}}' ? (stepList || '<p class="muted">Brak kroków.</p>') : md(expand(sec.content, S, d));
  return page(`${t.name} · warstwa ${LAYERS[d.layer].name.toLowerCase()}`, d.title,
    `<a class="btn primary" href="#/doc/${d.id}/edit">Edytuj</a><button class="btn" data-act="export-doc" data-id="${d.id}">${icon('down')}Markdown</button>${inFrame ? '' : `<button class="btn" data-act="print">Drukuj / PDF</button>`}`,
    `${anc.length ? `<nav class="crumbs">${anc.map(a => `<a href="#/doc/${a.id}">${h(a.title)}</a><span>›</span>`).join('')}<span>${h(d.title)}</span></nav>` : ''}
    <article class="doc">
      <div class="metabar"><span>${typeBadge(d.type)}</span><span>Wersja <b>${h(d.version)}</b></span><span>Status ${statusPill(d.status)}</span><span>Właściciel <b>${h(d.owner || '–')}</b></span><span>Przegląd do <b>${fmtDate(d.reviewDate)}</b></span>${d.approvedBy ? `<span>Zatwierdził <b>${h(d.approvedBy)}</b></span>` : ''}${d.tech ? `<span>Technologia <b>${h(TECH_BY_ID[d.tech]?.name || d.tech)}</b></span>` : ''}</div>
      <div class="body">
        ${d.sections.map(sec => `<h2>${h(sec.title)}</h2>${secHtml(sec)}`).join('')}
        ${steps}
        ${d.reqs.length ? `<h2>Mapowanie na wymagania</h2><div class="row">${d.reqs.map(r => REQ_BY_ID[r] ? `<span class="pill" title="${h(REQ_BY_ID[r].text)}">${h(FW_BY_ID[REQ_BY_ID[r].fw].name.split(' –')[0])} · ${h(REQ_BY_ID[r].code)}</span>` : '').join('')}</div>` : ''}
      </div>
    </article>
    <section class="card noprint"><h2>Dokumenty podrzędne</h2>
      ${kids.length ? `<div class="items">${kids.map(docItem).join('')}</div>` : '<p class="muted">Brak.</p>'}
      ${childTypes.length ? `<div class="row" style="margin-top:12px">${childTypes.map(([k, x]) => `<a class="btn" href="#/docs/new?parent=${d.id}&tpl=${k === 'instruction' && d.layer !== 'biz' ? 'ins-tech' : ''}">${icon('plus')}${x.name}</a>`).join('')}<a class="btn" href="#/test/new?doc=${d.id}">${icon('test')}Zaplanuj test</a></div>` : `<div class="row" style="margin-top:12px"><a class="btn" href="#/test/new?doc=${d.id}">${icon('test')}Zaplanuj test</a></div>`}
    </section>`);
}

function docEdit(id) {
  const d = byId(S.documents, id);
  if (!d) return notFound();
  const parents = S.documents.filter(x => DOC_TYPES[d.type].parents.includes(x.type) && x.id !== d.id && !descendants(S, d.id).includes(x));
  const fws = FRAMEWORKS.filter(f => S.org.frameworks.includes(f.id));
  let g = null;
  return page('Edycja dokumentu', d.title, `<a class="btn primary" href="#/doc/${d.id}">Gotowe</a>${del('doc', d.id)}`,
    `<section class="card"><div class="form">
      ${fld('Tytuł', inp('documents', d.id, 'title', d.title), '', true)}
      ${fld('Status', sel('documents', d.id, 'status', d.status, Object.entries(STATUS)))}
      ${fld('Wersja', inp('documents', d.id, 'version', d.version))}
      ${fld('Właściciel', inp('documents', d.id, 'owner', d.owner))}
      ${fld('Zatwierdził', inp('documents', d.id, 'approvedBy', d.approvedBy))}
      ${fld('Przegląd do', inp('documents', d.id, 'reviewDate', d.reviewDate, 'date'))}
      ${fld('Warstwa', sel('documents', d.id, 'layer', d.layer, Object.entries(LAYERS).map(([k, v]) => [k, v.name])))}
      ${fld('Dokument nadrzędny', sel('documents', d.id, 'parentId', d.parentId || '', [['', '— brak —'], ...parents.map(x => [x.id, `${DOC_TYPES[x.type].short} · ${x.title}`])]), '', true)}
    </div></section>

    <section class="stack"><div class="row" style="justify-content:space-between"><h2>Sekcje</h2><button class="btn sm" data-act="add-sec" data-id="${d.id}">${icon('plus')}Sekcja</button></div>
      <p class="tokens">Znaczniki aktualizowane na żywo: <code>{{org}}</code> <code>{{frameworks}}</code> <code>{{table:processes}}</code> <code>{{table:systems}}</code> <code>{{table:gaps}}</code> <code>{{table:order}}</code> <code>{{reporting}}</code> <code>{{children}}</code> <code>{{steps}}</code>. Formatowanie: <code>## nagłówek</code>, <code>- lista</code>, <code>**pogrubienie**</code>, tabele <code>| a | b |</code>.</p>
      ${d.sections.map((sec, i) => `<div class="sec">
        ${inp('documents', d.id, `sections.${sec.id}.title`, sec.title, 'text', 'aria-label="Tytuł sekcji" style="font-weight:600"')}
        ${sec.hint ? `<div class="hint">${h(sec.hint)}</div>` : ''}
        ${area('documents', d.id, `sections.${sec.id}.content`, sec.content, 'aria-label="Treść sekcji"')}
        <div class="bar-actions"><button class="btn sm ghost" data-act="mv" data-arr="sections" data-id="${d.id}" data-item="${sec.id}" data-dir="-1" ${i === 0 ? 'disabled' : ''}>W górę</button><button class="btn sm ghost" data-act="mv" data-arr="sections" data-id="${d.id}" data-item="${sec.id}" data-dir="1" ${i === d.sections.length - 1 ? 'disabled' : ''}>W dół</button><button class="btn sm danger" data-act="rm-item" data-arr="sections" data-id="${d.id}" data-item="${sec.id}">Usuń sekcję</button></div>
      </div>`).join('')}
    </section>

    <section class="stack"><div class="row" style="justify-content:space-between"><h2>Kroki</h2><button class="btn sm" data-act="add-step" data-id="${d.id}">${icon('plus')}Krok</button></div>
      <div class="card stack"><h3>Dodaj kroki z biblioteki technologii</h3>
        <div class="form">${fld('Technologia', `<select id="lib-tech">${TECHNOLOGIES.map(t => opt(t.id, `${t.cat} · ${t.name}`, t.id === d.tech)).join('')}</select>`)}
        ${fld('Scenariusz', `<select id="lib-sc">${Object.entries(SCENARIOS).map(([k, v]) => opt(k, v.name)).join('')}</select>`)}</div>
        <div class="row"><button class="btn" data-act="lib-add" data-id="${d.id}">Wstaw kroki</button></div>
      </div>
      ${d.steps.map((st, i) => { const hd = st.group !== g ? (g = st.group, st.group ? `<div class="grp">${h(st.group)}</div>` : '') : ''; return `${hd}<div class="sec">
        <div class="form">
          ${fld(`Krok ${i + 1} · czynność`, area('documents', d.id, `steps.${st.id}.action`, st.action, 'style="min-height:60px"'), '', true)}
          ${fld('Kto', inp('documents', d.id, `steps.${st.id}.who`, st.who))}
          ${fld('Grupa / faza', inp('documents', d.id, `steps.${st.id}.group`, st.group, 'text', 'data-r'))}
          ${fld('Polecenie', area('documents', d.id, `steps.${st.id}.cmd`, st.cmd, 'class="code" style="min-height:44px"'), '', true)}
          ${fld('Oczekiwany rezultat', inp('documents', d.id, `steps.${st.id}.expected`, st.expected), '', true)}
        </div>
        <div class="bar-actions"><button class="btn sm ghost" data-act="mv" data-arr="steps" data-id="${d.id}" data-item="${st.id}" data-dir="-1" ${i === 0 ? 'disabled' : ''}>W górę</button><button class="btn sm ghost" data-act="mv" data-arr="steps" data-id="${d.id}" data-item="${st.id}" data-dir="1" ${i === d.steps.length - 1 ? 'disabled' : ''}>W dół</button><button class="btn sm danger" data-act="rm-item" data-arr="steps" data-id="${d.id}" data-item="${st.id}">Usuń krok</button></div>
      </div>`; }).join('') || '<p class="muted">Brak kroków.</p>'}
    </section>

    <section class="card"><h2>Powiązania</h2>
      <h3>Procesy</h3>${S.processes.length ? checks('documents', d.id, 'processes', d.processes || [], S.processes.map(p => [p.id, p.name])) : '<p class="muted">Brak procesów.</p>'}
      <h3 style="margin-top:14px">Systemy</h3>${S.systems.length ? checks('documents', d.id, 'systems', d.systems || [], S.systems.map(x => [x.id, x.name])) : '<p class="muted">Brak systemów.</p>'}
      <p class="small muted">Gdy lista jest pusta, tabele procesów i systemów w treści obejmują wszystkie pozycje.</p>
    </section>

    <section class="card"><h2>Wymagania pokrywane przez dokument</h2>
      ${fws.map(f => { const n = f.reqs.filter(([c]) => d.reqs.includes(`${f.id}:${c}`)).length; return `<details ${n ? 'open' : ''}><summary>${h(f.name)} <span class="pill">${n}/${f.reqs.length}</span></summary>${checks('documents', d.id, 'reqs', d.reqs, f.reqs.map(([c, t]) => [`${f.id}:${c}`, `${c} – ${t}`]))}</details>`; }).join('') || '<p class="muted">Wybierz ramy w ustawieniach.</p>'}
    </section>`);
}

// ── Zgodność
function complianceView() {
  const c = compliance(S);
  const onlyGaps = query().get('gaps') === '1';
  const tplFor = rid => TEMPLATES.filter(t => t.reqs.includes(rid));
  const pill = st => st === 'full' ? '<span class="pill ok">spełnione</span>' : st === 'partial' ? '<span class="pill warn">częściowo</span>' : '<span class="pill crit">brak</span>';
  return page('Zgodność', `Pokrycie wymagań: ${c.score}%`,
    `<a class="btn" href="#/compliance${onlyGaps ? '' : '?gaps=1'}">${onlyGaps ? 'Pokaż wszystkie' : 'Tylko luki'}</a><a class="btn" href="#/settings">Wybór ram</a>`,
    `<p class="small muted" style="margin:0">Spełnione: wymaganie pokrywa zatwierdzony dokument, a wymagania dotyczące testów lub BIA mają też dowód (test w ostatnich 12 miesiącach, procesy z RTO). Częściowo: dokument w projekcie albo brak dowodu.</p>
    ${c.perFw.map(f => { const rows = onlyGaps ? f.rows.filter(r => r.status !== 'full') : f.rows; if (!rows.length) return '';
      return `<section class="card"><div class="row" style="justify-content:space-between;margin-bottom:10px"><div><h2>${h(f.fw.name)}</h2><span class="small muted">${h(f.fw.title)}</span></div><span class="mono" style="font-size:22px">${f.score}%</span></div>
      <div class="bar" style="margin-bottom:12px"><i style="width:${f.score}%"></i></div>
      <div class="tbl"><table><thead><tr><th>Wymaganie</th><th>Stan</th><th>Dokumenty / dowody</th></tr></thead><tbody>
      ${rows.map(r => `<tr><td><b class="mono small">${h(r.code)}</b><div>${h(r.text)}</div></td><td>${pill(r.status)}</td>
        <td class="small">${r.docs.map(d => `<a href="#/doc/${d.id}">${h(d.title)}</a>`).join('<br>') || '–'}
        ${r.evidence !== 'doc' ? `<div class="${r.evidenceOk ? '' : 'muted'}">${r.evidence === 'test' ? (r.evidenceOk ? '✓ test w ostatnich 12 mies.' : '✗ brak testu w 12 mies.') : (r.evidenceOk ? '✓ BIA z celami odtworzenia' : '✗ brak BIA')}</div>` : ''}
        ${!r.docs.length && tplFor(r.id).length ? `<div class="row" style="margin-top:6px">${tplFor(r.id).slice(0, 2).map(t => `<a class="btn sm" href="#/docs/new?tpl=${t.id}">${icon('plus')}${h(t.name)}</a>`).join('')}</div>` : ''}</td></tr>`).join('')}
      </tbody></table></div></section>`; }).join('') || '<div class="card empty">Wszystkie wymagania są spełnione.</div>'}`);
}

// ── Testy
function testItem(t) {
  const st = t.status === 'done' ? `<span class="pill ${t.rating === 'pass' ? 'ok' : t.rating === 'fail' ? 'crit' : 'warn'}">${{ pass: 'zaliczony', partial: 'częściowo', fail: 'niezaliczony' }[t.rating] || 'zakończony'}</span>` : t.status === 'running' ? '<span class="pill acc">w trakcie</span>' : '<span class="pill">zaplanowany</span>';
  return `<a class="item" href="#/test/${t.id}"><span class="type">${TEST_TYPES[t.type]?.level ? 'T' + TEST_TYPES[t.type].level : 'T'}</span><span class="grow"><span class="t">${h(t.name)}</span><span class="meta"><span>${testTypeName(t.type)}</span><span>${fmtDate(t.date)}</span>${(t.findings || []).filter(f => !f.done).length ? `<span>${(t.findings || []).filter(f => !f.done).length} otwarte ustalenia</span>` : ''}</span></span>${st}</a>`;
}

function testsList() {
  const groups = [['running', 'W trakcie'], ['planned', 'Zaplanowane'], ['done', 'Zakończone']];
  return page('Testy i ćwiczenia', 'Program testów', `<a class="btn primary" href="#/test/new">${icon('plus')}Zaplanuj test</a>`,
    `${sampleBanner()}
    ${groups.map(([k, l]) => { const ts = S.tests.filter(t => t.status === k).sort((a, b) => (k === 'done' ? -1 : 1) * (a.date || '').localeCompare(b.date || '')); return ts.length ? `<section class="stack"><h2>${l}</h2><div class="items">${ts.map(testItem).join('')}</div></section>` : ''; }).join('') || `<div class="card empty"><p>Brak testów. Zacznij od przeglądu dokumentacji albo ćwiczenia sztabowego.</p><a class="btn primary" href="#/test/new">Zaplanuj pierwszy test</a></div>`}
    <section class="card"><h2>Rodzaje testów</h2><p class="small muted" style="margin-top:-6px">Od najprostszych do najbardziej wymagających (T1–T6).</p>
      <div class="tbl"><table><tbody>${Object.values(TEST_TYPES).map(t => `<tr><td class="mono">T${t.level}</td><td><b>${t.name}</b><div class="small muted">${t.note}</div></td></tr>`).join('')}</tbody></table></div></section>`);
}

function testNew() {
  const q = query();
  const docId = q.get('doc');
  const t = {
    id: uid(), name: '', type: 'tabletop', date: today(), status: 'planned', docIds: docId ? [docId] : [], exerciseId: '',
    objectives: '', criteria: '', participants: '', targetRto: '', targetRpo: '', startedAt: null, endedAt: null,
    actualRto: '', actualRpo: '', rating: '', notes: '', findings: [], steps: [],
  };
  const d = docId && byId(S.documents, docId);
  if (d) {
    t.name = `Test: ${d.title}`;
    t.type = d.type === 'instruction' ? 'technical' : d.type === 'plan' ? 'tabletop' : 'walk';
    const sys = (d.systems || []).map(id => byId(S.systems, id)).filter(Boolean);
    if (sys.length) { const r = systemRequirements(S, sys[0].id); t.targetRto = r.rto ?? ''; t.targetRpo = r.rpo ?? ''; }
  } else t.name = 'Nowy test';
  S.tests.push(t);
  persist();
  location.replace(`#/test/${t.id}`);
  return '';
}

function testView(id) {
  const t = byId(S.tests, id);
  if (!t) return notFound();
  const docs = S.documents.filter(d => d.type !== 'policy');
  const ex = EXERCISE_BY_ID[t.exerciseId];
  const sevPill = s => `<span class="pill ${s === 'high' ? 'crit' : s === 'medium' ? 'warn' : ''}">${{ high: 'wysoki', medium: 'średni', low: 'niski' }[s]}</span>`;
  return page(`Test · ${testTypeName(t.type)}`, t.name,
    `${t.status !== 'done' ? `<a class="btn primary" href="#/test/${t.id}/run">${t.status === 'running' ? 'Wróć do testu' : 'Rozpocznij test'}</a>` : ''}<button class="btn" data-act="export-test" data-id="${t.id}">${icon('down')}Raport</button>${del('test', t.id)}`,
    `<section class="card"><h2>Plan testu</h2><div class="form">
      ${fld('Nazwa', inp('tests', t.id, 'name', t.name), '', true)}
      ${fld('Rodzaj', sel('tests', t.id, 'type', t.type, Object.entries(TEST_TYPES).map(([k, v]) => [k, `T${v.level} · ${v.name}`]), 'data-r'))}
      ${fld('Data', inp('tests', t.id, 'date', t.date, 'date'))}
      ${fld('Scenariusz ćwiczenia', sel('tests', t.id, 'exerciseId', t.exerciseId, [['', '— bez scenariusza —'], ...EXERCISES.map(e => [e.id, e.name])], 'data-r'), ex ? `${ex.injects.length} wstrzyknięć` : 'dla ćwiczeń sztabowych i symulacji')}
      ${fld('Docelowe RTO (h)', inp('tests', t.id, 'targetRto', t.targetRto, 'number'))}
      ${fld('Docelowe RPO (h)', inp('tests', t.id, 'targetRpo', t.targetRpo, 'number'))}
      ${fld('Cele', area('tests', t.id, 'objectives', t.objectives, 'style="min-height:70px"'), '', true)}
      ${fld('Kryteria sukcesu', area('tests', t.id, 'criteria', t.criteria, 'style="min-height:60px"'), '', true)}
      ${fld('Uczestnicy', inp('tests', t.id, 'participants', t.participants), '', true)}
    </div></section>
    <section class="card"><h2>Testowane dokumenty</h2><p class="small muted" style="margin-top:-6px">Kroki testu pobierane są z dokumentów i ich dokumentów podrzędnych.</p>
      ${['plan', 'procedure', 'instruction'].map(k => `<details ${docs.some(d => d.type === k && t.docIds.includes(d.id)) ? 'open' : ''}><summary>${DOC_TYPES[k].name === 'Plan' ? 'Plany' : DOC_TYPES[k].name === 'Procedura' ? 'Procedury' : 'Instrukcje'}</summary>${checks('tests', t.id, 'docIds', t.docIds, docs.filter(d => d.type === k).map(d => [d.id, d.title]))}</details>`).join('')}
      <div class="row" style="margin-top:12px"><button class="btn" data-act="build-steps" data-id="${t.id}">Przygotuj kroki testu</button><span class="small muted">${t.steps.length} kroków${t.steps.length ? ' – ponowne przygotowanie zastąpi listę' : ''}</span></div>
    </section>
    ${t.status === 'done' ? `<section class="card"><h2>Wynik</h2><div class="form">
      ${fld('Rozpoczęcie', `<span class="mono">${fmtDT(t.startedAt)}</span>`)}${fld('Zakończenie', `<span class="mono">${fmtDT(t.endedAt)}</span>`)}
      ${fld('Rzeczywiste RTO (h)', inp('tests', t.id, 'actualRto', t.actualRto, 'number', 'data-r'), t.targetRto !== '' && t.actualRto !== '' ? (+t.actualRto <= +t.targetRto ? '✓ w granicy celu' : `✗ przekroczone o ${fmtH(t.actualRto - t.targetRto)}`) : '')}
      ${fld('Rzeczywista utrata danych (h)', inp('tests', t.id, 'actualRpo', t.actualRpo, 'number', 'data-r'), t.targetRpo !== '' && t.actualRpo !== '' ? (+t.actualRpo <= +t.targetRpo ? '✓ w granicy celu' : '✗ powyżej celu') : '')}
      ${fld('Ocena', sel('tests', t.id, 'rating', t.rating, [['', '—'], ['pass', 'zaliczony'], ['partial', 'zaliczony częściowo'], ['fail', 'niezaliczony']], 'data-r'))}
      ${fld('Podsumowanie', area('tests', t.id, 'notes', t.notes, 'style="min-height:80px"'), '', true)}
    </div>
    <h3 style="margin-top:16px">Przebieg</h3>
    <div class="tbl"><table><thead><tr><th>#</th><th>Krok</th><th>Wynik</th><th>Uwagi</th></tr></thead><tbody>${t.steps.map((s, i) => `<tr><td class="num">${i + 1}</td><td class="small">${h(s.text)}</td><td>${s.status === 'ok' ? '<span class="pill ok">OK</span>' : s.status === 'issue' ? '<span class="pill crit">problem</span>' : s.status === 'skip' ? '<span class="pill">pominięty</span>' : '–'}</td><td class="small">${h(s.note)}</td></tr>`).join('')}</tbody></table></div>
    </section>` : ''}
    <section class="stack"><div class="row" style="justify-content:space-between"><h2>Ustalenia i działania korygujące</h2><button class="btn sm" data-act="add-finding" data-id="${t.id}">${icon('plus')}Ustalenie</button></div>
      ${(t.findings || []).map(f => `<div class="sec"><div class="row" style="justify-content:space-between">${sevPill(f.severity)}<label class="chk"><input type="checkbox" id="${fid('f', f.id)}" data-e="tests" data-id="${t.id}" data-f="findings.${f.id}.done" data-t="bool" data-r ${f.done ? 'checked' : ''}><span>Zamknięte</span></label></div>
        <div class="form">${fld('Ustalenie', area('tests', t.id, `findings.${f.id}.text`, f.text, 'style="min-height:56px"'), '', true)}
        ${fld('Działanie korygujące', inp('tests', t.id, `findings.${f.id}.action`, f.action), '', true)}
        ${fld('Waga', sel('tests', t.id, `findings.${f.id}.severity`, f.severity, [['high', 'wysoka'], ['medium', 'średnia'], ['low', 'niska']], 'data-r'))}
        ${fld('Odpowiedzialny', inp('tests', t.id, `findings.${f.id}.owner`, f.owner))}
        ${fld('Termin', inp('tests', t.id, `findings.${f.id}.due`, f.due, 'date'))}</div>
        <div class="bar-actions"><button class="btn sm danger" data-act="rm-item" data-e="tests" data-arr="findings" data-id="${t.id}" data-item="${f.id}">Usuń</button></div></div>`).join('') || '<p class="muted">Brak ustaleń.</p>'}
    </section>`);
}

let tick;
function testRun(id) {
  const t = byId(S.tests, id);
  if (!t) return notFound();
  if (t.status === 'done') { location.replace(`#/test/${t.id}`); return ''; }
  const done = t.steps.filter(s => s.status).length;
  let g = null;
  setTimeout(() => {
    clearInterval(tick);
    const el = document.getElementById('timer');
    if (!el || !t.startedAt) return;
    const upd = () => { const s = Math.max(0, (Date.now() - new Date(t.startedAt)) / 1000 | 0); el.textContent = [s / 3600 | 0, (s % 3600) / 60 | 0, s % 60].map(n => String(n).padStart(2, '0')).join(':'); };
    upd(); tick = setInterval(() => document.body.contains(el) ? upd() : clearInterval(tick), 1000);
  });
  return page(`Wykonanie · ${testTypeName(t.type)}`, t.name, `<a class="btn" href="#/test/${t.id}">Plan testu</a>`,
    `<section class="card"><div class="row" style="justify-content:space-between;align-items:center">
      <div><span class="eyebrow">Czas od startu</span><div class="timer" id="timer">${t.startedAt ? '' : '00:00:00'}</div>${t.targetRto !== '' ? `<span class="small muted">Docelowe RTO: ${fmtH(t.targetRto)}</span>` : ''}</div>
      <div class="stack" style="align-items:flex-end"><span class="mono">${done}/${t.steps.length} kroków</span>
      ${t.startedAt ? `<button class="btn primary" data-act="finish" data-id="${t.id}">Zakończ test</button>` : `<button class="btn primary" data-act="start" data-id="${t.id}">Start</button>`}</div></div>
      <div class="bar" style="margin-top:12px"><i style="width:${t.steps.length ? done / t.steps.length * 100 : 0}%"></i></div>
    </section>
    ${t.steps.length ? '' : `<div class="card empty"><p>Ten test nie ma kroków. Wybierz dokumenty lub scenariusz i przygotuj kroki.</p><a class="btn" href="#/test/${t.id}">Przejdź do planu</a></div>`}
    ${t.steps.map((s, i) => `${s.group !== g ? `<div class="grp">${h(g = s.group)}</div>` : ''}<div class="run-step ${s.status}">
      <div class="row" style="justify-content:space-between;align-items:baseline"><span class="mono small muted">#${i + 1}${s.who ? ` · ${h(s.who)}` : ''}</span>${s.at ? `<span class="mono small muted">${new Date(s.at).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}</span>` : ''}</div>
      <div>${h(s.text)}</div>
      ${s.cmd ? `<pre class="cmd"><code>${h(s.cmd)}</code></pre>` : ''}
      ${s.expected ? `<div class="small" style="color:var(--ok)">✓ ${h(s.expected)}</div>` : ''}
      ${s.question ? `<div class="q"><b>Pytania dla zespołu:</b> ${h(s.question)}</div>` : ''}
      <div class="row"><div class="seg">${[['ok', 'OK'], ['issue', 'Problem'], ['skip', 'Pomiń']].map(([k, l]) => `<button class="${s.status === k ? 'on ' + k : ''}" data-act="step" data-id="${t.id}" data-item="${s.id}" data-v="${k}" ${t.startedAt ? '' : 'disabled'}>${l}</button>`).join('')}</div></div>
      ${inp('tests', t.id, `steps.${s.id}.note`, s.note, 'text', 'placeholder="Uwagi, decyzje, odchylenia" aria-label="Uwagi do kroku"')}
    </div>`).join('')}`);
}

// ── Zegar raportowy
function clockView() {
  S.clock ||= { detect: '', classified: '', regimes: activeRegimes(S) };
  const c = S.clock;
  const all = Object.keys(REPORTING);
  const items = c.detect ? c.regimes.flatMap(r => deadlines(r, c.detect, c.classified)).sort((a, b) => a.at - b.at) : [];
  const now = Date.now();
  const left = at => { const ms = at - now; const sgn = ms < 0 ? '−' : ''; const m = Math.abs(ms) / 6e4 | 0; return `${sgn}${m / 1440 | 0 ? `${m / 1440 | 0} d ` : ''}${(m % 1440) / 60 | 0} h ${m % 60} min`; };
  clearInterval(tick);
  if (items.length) tick = setInterval(() => { if (location.hash.startsWith('#/clock')) rerender(); else clearInterval(tick); }, 30000);
  return page('Reagowanie na incydent', 'Zegar raportowy', `<button class="btn" data-act="clock-now">Wykrycie teraz</button>`,
    `<section class="card"><div class="form">
      ${fld('Wykrycie / stwierdzenie incydentu', inp('clock', 'c', 'detect', c.detect, 'datetime-local', 'data-r'))}
      ${fld('Klasyfikacja jako poważny (DORA)', inp('clock', 'c', 'classified', c.classified, 'datetime-local', 'data-r'), 'puste = przyjmij czas wykrycia')}
    </div>
    <h3 style="margin-top:14px">Reżimy raportowe</h3>
    ${checks('clock', 'c', 'regimes', c.regimes, all.map(k => [k, REPORTING[k].name, `odbiorca: ${REPORTING[k].to}`]))}
    </section>
    <section class="card"><h2>Terminy</h2>
      ${items.length ? items.map(x => { const late = x.at < now; const soon = !late && x.at - now < 6 * 3600e3; return `<div class="clock-item"><span class="dot ${late ? 'crit' : soon ? 'warn' : 'ok'}"></span>
        <div><b>${h(x.label)}</b> <span class="small muted">· ${h(x.regimeName)} → ${h(x.to)}</span><div class="small muted">${h(x.basis)}</div><div class="mono small">${fmtDT(x.at)}</div></div>
        <div class="left" style="color:var(--${late ? 'crit' : soon ? 'warn' : 'ink'})">${late ? 'po terminie' : 'zostało'}<br>${left(x.at)}</div></div>`; }).join('') : '<p class="muted">Podaj czas wykrycia, aby wyliczyć terminy.</p>'}
      <p class="small muted" style="margin:12px 0 0">Narzędzie pomocnicze. Terminy są uproszczone; obowiązki zależą od klasyfikacji incydentu, statusu podmiotu i aktualnych przepisów krajowych.</p>
    </section>`);
}

// ── Ustawienia
function settingsView() {
  return page('Ustawienia', 'Organizacja i dane', '',
    `<section class="card"><h2>Organizacja</h2><div class="form">
      ${fld('Nazwa', inp('org', 'o', 'name', S.org.name, 'text', 'data-r'))}
      ${fld('Sektor', inp('org', 'o', 'sector', S.org.sector))}
    </div></section>
    <section class="card"><h2>Ramy odniesienia</h2><p class="small muted" style="margin-top:-6px">Wybrane standardy i akty prawne sterują mapowaniem wymagań, oceną zgodności i obowiązkami raportowymi w planach.</p>
      <h3>Akty prawne</h3>${checks('org', 'o', 'frameworks', S.org.frameworks, FRAMEWORKS.filter(f => f.kind === 'law').map(f => [f.id, f.name, f.title]))}
      <h3 style="margin-top:14px">Standardy</h3>${checks('org', 'o', 'frameworks', S.org.frameworks, FRAMEWORKS.filter(f => f.kind === 'standard').map(f => [f.id, f.name, f.title]))}
    </section>
    <section class="card stack"><h2>Dane</h2>
      <p class="small muted" style="margin:0">Dane są przechowywane wyłącznie w tej przeglądarce. Regularnie eksportuj kopię JSON – przeniesiesz ją na inne urządzenie przez import.</p>
      <div class="row"><button class="btn primary" data-act="export-json">${icon('down')}Eksport JSON</button><button class="btn" data-act="bundle">Eksport dokumentacji (Markdown)</button></div>
      <h3>Import</h3>
      <div class="row"><input type="file" id="imp-file" accept="application/json,.json" aria-label="Plik JSON"></div>
      <textarea id="imp-text" placeholder="…lub wklej tutaj zawartość pliku JSON" style="min-height:80px" class="code"></textarea>
      <div class="row"><button class="btn" data-act="import">Importuj (zastąpi obecne dane)</button></div>
      <h3>Zresetuj</h3>
      <div class="row"><button class="btn" data-act="load-sample">Wczytaj dane przykładowe</button><button class="btn danger" data-act="reset">Usuń wszystkie dane</button></div>
    </section>
    <section class="card stack" id="install-card" ${deferredInstall ? '' : 'hidden'}><h2>Aplikacja</h2><p class="small muted" style="margin:0">Zainstaluj BCM Studio na ekranie głównym – działa także bez internetu.</p><div class="row"><button class="btn primary" data-act="install">Zainstaluj</button></div></section>`);
}

function moreView() {
  return page('Więcej', 'Narzędzia', '', `<div class="items">
    <a class="item" href="#/compliance">${icon('shield')}<span class="grow"><span class="t">Zgodność</span><span class="meta">Pokrycie wymagań standardów i aktów prawnych</span></span></a>
    <a class="item" href="#/clock">${icon('clock')}<span class="grow"><span class="t">Zegar raportowy</span><span class="meta">Terminy zgłoszeń NIS2/KSC, DORA, RODO</span></span></a>
    <a class="item" href="#/settings">${icon('gear')}<span class="grow"><span class="t">Ustawienia i dane</span><span class="meta">Organizacja, ramy odniesienia, eksport i import</span></span></a>
  </div>`);
}

const notFound = () => page('Brak', 'Nie znaleziono elementu', '<a class="btn" href="#/">Pulpit</a>', '<p class="muted">Element mógł zostać usunięty.</p>');

// ───────── router ─────────
const ROUTES = [
  [/^#\/?$/, dashboard], [/^#\/biz$/, bizList], [/^#\/biz\/([\w-]+)$/, processEdit],
  [/^#\/tech$/, techList], [/^#\/tech\/([\w-]+)$/, systemEdit],
  [/^#\/docs$/, docsTree], [/^#\/docs\/new$/, docNew], [/^#\/doc\/([\w-]+)$/, docView], [/^#\/doc\/([\w-]+)\/edit$/, docEdit],
  [/^#\/compliance$/, complianceView], [/^#\/tests$/, testsList], [/^#\/test\/new$/, testNew], [/^#\/test\/([\w-]+)$/, testView], [/^#\/test\/([\w-]+)\/run$/, testRun],
  [/^#\/clock$/, clockView], [/^#\/settings$/, settingsView], [/^#\/more$/, moreView],
];
const query = () => new URLSearchParams(location.hash.split('?')[1] || '');
const main = document.getElementById('main');
let lastPath = '';

function render() {
  const path = (location.hash || '#/').split('?')[0];
  if (path.startsWith('#/test/') && path.endsWith('/run')) { /* zegar ustawia testRun */ } else if (!path.startsWith('#/clock')) clearInterval(tick);
  const r = ROUTES.find(([re]) => re.test(path));
  const html = r ? r[1](...path.match(r[0]).slice(1)) : notFound();
  if (html === '') return;
  const y = window.scrollY;
  main.innerHTML = html;
  if (path !== lastPath) window.scrollTo(0, 0); else window.scrollTo(0, y);
  lastPath = path;
  setNav();
}
window.addEventListener('hashchange', render);

// Przerysowanie po zmianie pola – po zakończeniu zmiany fokusu, z przywróceniem pola, w którym jest użytkownik.
function rerender() {
  setTimeout(() => {
    const a = document.activeElement;
    const id = a && main.contains(a) ? a.id : '';
    const pos = id && 'selectionStart' in a ? [a.selectionStart, a.selectionEnd] : null;
    render();
    const b = id && document.getElementById(id);
    if (b) { b.focus({ preventScroll: true }); try { if (pos) b.setSelectionRange(...pos); } catch { /* typ pola bez zaznaczenia */ } }
  });
}

// ───────── edycja danych ─────────
function entity(e, id) {
  if (!e) return null;
  if (e === 'org') return S.org;
  if (e === 'clock') return S.clock;
  return byId(S[e], id);
}
function resolve(obj, path) {
  const parts = path.split('.');
  const last = parts.pop();
  let cur = obj;
  for (const p of parts) {
    if (Array.isArray(cur)) cur = cur.find(x => x.id === p);
    else { cur[p] ??= {}; cur = cur[p]; }
    if (!cur) return [null];
  }
  return [cur, last];
}
function readVal(el) {
  if (el.dataset.t === 'bool') return el.checked;
  if (el.dataset.t === 'num') { const v = el.value.replace(',', '.').trim(); return v === '' ? '' : +v; }
  return el.value;
}
function touch(e, ent) { if (e === 'documents') ent.updated = new Date().toISOString(); }

main.addEventListener('input', ev => {
  const el = ev.target;
  if (!el.dataset.f || el.type === 'checkbox' || el.tagName === 'SELECT') return;
  const ent = entity(el.dataset.e, el.dataset.id);
  if (!ent) return;
  const [obj, key] = resolve(ent, el.dataset.f);
  if (!obj) return;
  obj[key] = readVal(el);
  touch(el.dataset.e, ent);
  persistSoon();
});

main.addEventListener('change', ev => {
  const el = ev.target;
  const ent = entity(el.dataset.e, el.dataset.id);
  if (el.dataset.list && ent) {
    const arr = (ent[el.dataset.list] ||= []);
    const i = arr.indexOf(el.value);
    if (el.checked && i < 0) arr.push(el.value);
    if (!el.checked && i >= 0) arr.splice(i, 1);
    touch(el.dataset.e, ent); persist(); rerender(); return;
  }
  if (el.dataset.f && ent) {
    const [obj, key] = resolve(ent, el.dataset.f);
    if (obj) obj[key] = readVal(el);
    touch(el.dataset.e, ent); persist();
    if (el.dataset.r !== undefined || el.tagName === 'SELECT') rerender();
  }
});

main.addEventListener('submit', ev => {
  if (ev.target.id !== 'newdoc') return;
  ev.preventDefault();
  const f = new FormData(ev.target);
  const q = query();
  const t = TEMPLATE_BY_ID[q.get('tpl')];
  const opts = { title: f.get('title'), parentId: f.get('parent') || null };
  if (t.builder) {
    opts.tech = f.get('tech'); opts.scenarios = f.getAll('sc');
    if (f.get('sys')) { opts.systems = [f.get('sys')]; opts.owner = byId(S.systems, f.get('sys'))?.owner || ''; }
  }
  const parent = opts.parentId && byId(S.documents, opts.parentId);
  const d = createDoc(S, t.id, opts);
  if (parent && !t.builder && !opts.systems) { d.processes = [...(parent.processes || [])]; }
  persist();
  toast('Utworzono dokument');
  location.hash = `#/doc/${d.id}`;
});

const ACTIONS = {
  'add-process'() {
    const p = { id: uid(), name: 'Nowy proces', owner: '', dept: '', criticality: 3, mtpd: '', rto: '', rpo: '', mbco: '', systems: [], impacts: {}, notes: '' };
    S.processes.push(p); persist(); location.hash = `#/biz/${p.id}`;
  },
  'add-system'() {
    const x = { id: uid(), name: 'Nowy system', owner: '', tech: [], rtoCap: '', rpoCap: '', backup: '', drSite: '', deps: [], notes: '' };
    S.systems.push(x); persist(); location.hash = `#/tech/${x.id}`;
  },
  'new-manual'(el) {
    const p = byId(S.processes, el.dataset.id);
    const parent = S.documents.find(d => d.genKey === 'plan-bcp');
    const d = createDoc(S, 'ins-manual', { title: `Tryb awaryjny – ${p.name}`, processes: [p.id], parentId: parent?.id, owner: p.owner });
    persist(); location.hash = `#/doc/${d.id}/edit`;
  },
  gen() {
    const made = generateStructure(S); persist();
    toast(made.length ? `Dodano ${made.length} dokumentów` : 'Struktura jest kompletna');
    if (location.hash !== '#/docs') location.hash = '#/docs'; else render();
  },
  del(el) {
    if (!el.classList.contains('armed')) { el.classList.add('armed'); el.textContent = 'Potwierdź usunięcie'; setTimeout(() => { if (el.isConnected) { el.classList.remove('armed'); el.textContent = 'Usuń'; } }, 4000); return; }
    const { what, id } = el.dataset;
    if (what === 'process') { S.processes = S.processes.filter(x => x.id !== id); S.documents.forEach(d => d.processes = (d.processes || []).filter(x => x !== id)); location.hash = '#/biz'; }
    if (what === 'system') { S.systems = S.systems.filter(x => x.id !== id); S.systems.forEach(x => x.deps = (x.deps || []).filter(y => y !== id)); S.processes.forEach(p => p.systems = (p.systems || []).filter(y => y !== id)); S.documents.forEach(d => d.systems = (d.systems || []).filter(x => x !== id)); location.hash = '#/tech'; }
    if (what === 'doc') {
      const d = byId(S.documents, id);
      S.documents.filter(x => x.parentId === id).forEach(x => x.parentId = d.parentId || null);
      S.documents = S.documents.filter(x => x.id !== id);
      S.tests.forEach(t => t.docIds = t.docIds.filter(x => x !== id));
      location.hash = '#/docs';
    }
    if (what === 'test') { S.tests = S.tests.filter(x => x.id !== id); location.hash = '#/tests'; }
    persist(); toast('Usunięto');
  },
  'filter-layer'(el) { location.hash = '#/docs' + (el.dataset.v ? `?layer=${el.dataset.v}` : ''); },
  'add-sec'(el) { byId(S.documents, el.dataset.id).sections.push({ id: uid(), title: 'Nowa sekcja', content: '', hint: '' }); persist(); render(); },
  'add-step'(el) { byId(S.documents, el.dataset.id).steps.push({ id: uid(), group: '', who: '', action: '', cmd: '', expected: '' }); persist(); render(); },
  'lib-add'(el) {
    const d = byId(S.documents, el.dataset.id);
    const tech = document.getElementById('lib-tech').value, sc = document.getElementById('lib-sc').value;
    const steps = stepsFromTech(tech, [sc]);
    if (!steps.length) { toast(`${TECH_BY_ID[tech].name}: brak kroków dla scenariusza „${SCENARIOS[sc].name}”`); return; }
    d.steps.push(...steps); d.tech ||= tech; if (!d.scenarios.includes(sc)) d.scenarios.push(sc);
    persist(); render(); toast(`Dodano ${steps.length} kroków`);
  },
  mv(el) {
    const ent = entity(el.dataset.e || 'documents', el.dataset.id);
    const arr = ent[el.dataset.arr]; const i = arr.findIndex(x => x.id === el.dataset.item); const j = i + +el.dataset.dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]]; persist(); render();
  },
  'rm-item'(el) {
    if (!el.classList.contains('armed')) { el.classList.add('armed'); el.textContent = 'Potwierdź'; return; }
    const ent = entity(el.dataset.e || 'documents', el.dataset.id);
    ent[el.dataset.arr] = ent[el.dataset.arr].filter(x => x.id !== el.dataset.item); persist(); render();
  },
  copy(el) { copyText(el.dataset.text); },
  'export-doc'(el) { const d = byId(S.documents, el.dataset.id); deliver(`${slug(d.title)}.md`, docToMarkdown(S, d)); },
  bundle() { deliver(`dokumentacja-${slug(S.org.name || 'bcm')}.md`, bundleMarkdown(S)); },
  print() { window.print(); },
  'export-json'() { deliver(`bcm-studio-${today()}.json`, JSON.stringify(S, null, 2), 'application/json'); },
  async import() {
    const file = document.getElementById('imp-file').files[0];
    const text = file ? await file.text() : document.getElementById('imp-text').value;
    try {
      const data = JSON.parse(text);
      if (!data || !Array.isArray(data.documents) || !data.org) throw new Error('format');
      S = { ...emptyState(), ...data }; persist(); toast('Zaimportowano dane'); location.hash = '#/';
      render();
    } catch { toast('Nie udało się odczytać pliku – to musi być eksport JSON z BCM Studio'); }
  },
  'load-sample'() { S = sampleState(); persist(); toast('Wczytano dane przykładowe'); location.hash = '#/'; render(); },
  reset(el) {
    if (!el.classList.contains('armed')) { el.classList.add('armed'); el.textContent = 'Potwierdź – dane zostaną usunięte'; return; }
    S = emptyState(); persist(); toast('Usunięto dane. Zacznij od nazwy organizacji i ram odniesienia.'); location.hash = '#/settings'; render();
  },
  'build-steps'(el) {
    const t = byId(S.tests, el.dataset.id);
    t.steps = buildTestSteps(S, t, EXERCISE_BY_ID[t.exerciseId]); persist(); render(); toast(`Przygotowano ${t.steps.length} kroków`);
  },
  start(el) {
    const t = byId(S.tests, el.dataset.id);
    if (!t.steps.length) t.steps = buildTestSteps(S, t, EXERCISE_BY_ID[t.exerciseId]);
    t.startedAt = new Date().toISOString(); t.status = 'running'; persist(); render();
  },
  step(el) {
    const t = byId(S.tests, el.dataset.id); const s = t.steps.find(x => x.id === el.dataset.item);
    s.status = s.status === el.dataset.v ? '' : el.dataset.v; s.at = s.status ? new Date().toISOString() : null; persist(); render();
  },
  finish(el) {
    if (!el.classList.contains('armed')) { el.classList.add('armed'); el.textContent = 'Potwierdź zakończenie'; return; }
    const t = byId(S.tests, el.dataset.id);
    t.endedAt = new Date().toISOString(); t.status = 'done';
    t.actualRto = +((new Date(t.endedAt) - new Date(t.startedAt)) / 3600e3).toFixed(2);
    const issues = t.steps.filter(s => s.status === 'issue');
    t.rating = issues.length ? 'partial' : 'pass';
    issues.forEach(s => t.findings.push({ id: uid(), text: `${s.text}${s.note ? ` – ${s.note}` : ''}`, severity: 'medium', action: '', owner: '', due: '', done: false }));
    clearInterval(tick); persist(); toast('Test zakończony – uzupełnij wynik'); location.hash = `#/test/${t.id}`;
  },
  'add-finding'(el) { byId(S.tests, el.dataset.id).findings.push({ id: uid(), text: '', severity: 'medium', action: '', owner: '', due: '', done: false }); persist(); render(); },
  'export-test'(el) { const t = byId(S.tests, el.dataset.id); deliver(`raport-${slug(t.name)}.md`, testReport(t)); },
  'clock-now'() {
    S.clock ||= { detect: '', classified: '', regimes: activeRegimes(S) };
    const d = new Date(); d.setSeconds(0, 0);
    S.clock.detect = new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16); persist(); render();
  },
  async install() { if (deferredInstall) { deferredInstall.prompt(); await deferredInstall.userChoice; deferredInstall = null; render(); } },
};

main.addEventListener('click', ev => {
  const a = ev.target.closest('[data-act]');
  if (a && main.contains(a)) { ev.preventDefault(); ACTIONS[a.dataset.act]?.(a, ev); return; }
  const tr = ev.target.closest('tr[data-go]');
  if (tr && !ev.target.closest('a')) location.hash = tr.dataset.go;
});

const slug = s => (s || 'dokument').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

function testReport(t) {
  const docs = t.docIds.map(id => byId(S.documents, id)?.title).filter(Boolean);
  return [`# Raport z testu: ${t.name}`, '',
    `| Rodzaj | Data | Ocena | Docelowe RTO | Rzeczywiste RTO | Docelowe RPO | Rzeczywista utrata danych |`, '|---|---|---|---|---|---|---|',
    `| ${testTypeName(t.type)} | ${t.date} | ${{ pass: 'zaliczony', partial: 'częściowo', fail: 'niezaliczony' }[t.rating] || '–'} | ${fmtH(t.targetRto)} | ${fmtH(t.actualRto)} | ${fmtH(t.targetRpo)} | ${fmtH(t.actualRpo)} |`, '',
    `**Cele:** ${t.objectives || '–'}`, '', `**Kryteria sukcesu:** ${t.criteria || '–'}`, '', `**Uczestnicy:** ${t.participants || '–'}`, '',
    `**Testowane dokumenty:** ${docs.join('; ') || '–'}`, '', t.exerciseId ? `**Scenariusz:** ${EXERCISE_BY_ID[t.exerciseId]?.name}\n` : '',
    '## Przebieg', '', ...t.steps.map((s, i) => `${i + 1}. [${{ ok: 'OK', issue: 'PROBLEM', skip: 'POMINIĘTO' }[s.status] || ' '}] ${s.text}${s.note ? ` – _${s.note}_` : ''}`), '',
    '## Podsumowanie', '', t.notes || '–', '',
    '## Ustalenia i działania korygujące', '', '| Ustalenie | Waga | Działanie | Odpowiedzialny | Termin | Status |', '|---|---|---|---|---|---|',
    ...(t.findings || []).map(f => `| ${f.text} | ${f.severity} | ${f.action} | ${f.owner} | ${f.due} | ${f.done ? 'zamknięte' : 'otwarte'} |`),
  ].join('\n');
}

// ───────── PWA ─────────
let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; document.getElementById('install-card')?.removeAttribute('hidden'); });
if ('serviceWorker' in navigator && !inFrame && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => { /* tryb bez pracy offline */ });
}

render();
