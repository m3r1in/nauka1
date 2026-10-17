import { FRAMEWORKS, REQUIREMENTS, FW_BY_ID, REPORTING } from './data/frameworks.js';
import { TEMPLATE_BY_ID, DOC_TYPES } from './data/templates.js';
import { TECH_BY_ID, SCENARIOS } from './data/technologies.js';
import { TEST_TYPES } from './data/exercises.js';

export const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);
export const today = () => new Date().toISOString().slice(0, 10);
export const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };

export function emptyState() {
  return {
    version: 1, sample: false,
    org: { name: '', sector: '', frameworks: ['iso22301', 'iso27001', 'nis2', 'ksc', 'rodo'] },
    processes: [], systems: [], documents: [], tests: [],
  };
}

// ───────── formatowanie ─────────
export function fmtH(h) {
  if (h === null || h === undefined || h === '' || Number.isNaN(+h)) return '–';
  h = +h;
  if (h === 0) return '0';
  if (h < 1) return `${Math.round(h * 60)} min`;
  if (h < 48) return `${+h.toFixed(1)} h`;
  if (h < 24 * 14) return `${+(h / 24).toFixed(1)} d`;
  return `${+(h / 168).toFixed(1)} tyg.`;
}
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const fmtDate = d => d ? new Date(d).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' }) : '–';
export const fmtDT = d => d ? new Date(d).toLocaleString('pl-PL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '–';

// ───────── relacje ─────────
export const byId = (arr, id) => arr.find(x => x.id === id);
export const children = (s, id) => s.documents.filter(d => d.parentId === id)
  .sort((a, b) => DOC_TYPES[a.type].level - DOC_TYPES[b.type].level || a.title.localeCompare(b.title, 'pl'));

export function descendants(s, id) {
  const out = [];
  const walk = pid => children(s, pid).forEach(c => { out.push(c); walk(c.id); });
  walk(id);
  return out;
}

export function ancestors(s, doc) {
  const out = [];
  let p = doc.parentId && byId(s.documents, doc.parentId);
  while (p && out.length < 10) { out.unshift(p); p = p.parentId && byId(s.documents, p.parentId); }
  return out;
}

// Wszystkie systemy, od których zależy system (przechodnio).
export function systemClosure(s, sysIds) {
  const seen = new Set();
  const visit = id => {
    if (seen.has(id)) return;
    seen.add(id);
    (byId(s.systems, id)?.deps || []).forEach(visit);
  };
  sysIds.forEach(visit);
  return [...seen];
}

// Wymagane RTO/RPO systemu = najostrzejsze wymaganie procesów, które od niego zależą (bezpośrednio lub przez zależności).
export function systemRequirements(s, sysId) {
  let rto = null, rpo = null; const via = [];
  for (const p of s.processes) {
    const direct = (p.systems || []).includes(sysId);
    if (!direct && !systemClosure(s, p.systems || []).includes(sysId)) continue;
    via.push({ p, direct });
    if (p.rto !== '' && p.rto != null) rto = rto == null ? +p.rto : Math.min(rto, +p.rto);
    if (p.rpo !== '' && p.rpo != null) rpo = rpo == null ? +p.rpo : Math.min(rpo, +p.rpo);
  }
  return { rto, rpo, via };
}

export function gaps(s) {
  const out = [];
  for (const sys of s.systems) {
    const req = systemRequirements(s, sys.id);
    for (const { p, direct } of req.via) {
      if (p.rto != null && p.rto !== '' && sys.rtoCap != null && sys.rtoCap !== '' && +sys.rtoCap > +p.rto)
        out.push({ kind: 'RTO', process: p, system: sys, need: +p.rto, have: +sys.rtoCap, direct });
      // RPO dotyczy danych samego systemu, więc porównujemy je tylko przy bezpośrednim powiązaniu procesu z systemem.
      if (direct && p.rpo != null && p.rpo !== '' && sys.rpoCap != null && sys.rpoCap !== '' && +sys.rpoCap > +p.rpo)
        out.push({ kind: 'RPO', process: p, system: sys, need: +p.rpo, have: +sys.rpoCap, direct });
    }
  }
  return out;
}

// Kolejność odtwarzania: najpierw zależności, potem najostrzejsze RTO.
export function recoveryOrder(s) {
  const req = Object.fromEntries(s.systems.map(x => [x.id, systemRequirements(s, x.id).rto ?? 1e9]));
  const sorted = [...s.systems].sort((a, b) => req[a.id] - req[b.id]);
  const out = [], seen = new Set(), stack = new Set();
  const visit = sys => {
    if (!sys || seen.has(sys.id) || stack.has(sys.id)) return;
    stack.add(sys.id);
    (sys.deps || []).map(d => byId(s.systems, d)).sort((a, b) => req[a?.id] - req[b?.id]).forEach(visit);
    stack.delete(sys.id); seen.add(sys.id); out.push(sys);
  };
  sorted.forEach(visit);
  return out.map((sys, i) => ({ n: i + 1, sys, rto: req[sys.id] === 1e9 ? null : req[sys.id] }));
}

// ───────── zgodność ─────────
export function lastDoneTest(s) {
  return s.tests.filter(t => t.status === 'done' && t.endedAt)
    .sort((a, b) => b.endedAt.localeCompare(a.endedAt))[0];
}

export function compliance(s) {
  const yearAgo = addDays(today(), -365);
  const testOk = s.tests.some(t => t.status === 'done' && (t.endedAt || '').slice(0, 10) >= yearAgo);
  const biaOk = s.processes.some(p => p.rto !== '' && p.rto != null);
  const fws = FRAMEWORKS.filter(f => s.org.frameworks.includes(f.id));
  const rows = [];
  for (const r of REQUIREMENTS.filter(r => s.org.frameworks.includes(r.fw))) {
    const docs = s.documents.filter(d => (d.reqs || []).includes(r.id));
    const docLevel = docs.some(d => d.status === 'approved') ? 2 : docs.length ? 1 : 0;
    let status;
    if (r.evidence === 'doc') status = docLevel === 2 ? 'full' : docLevel ? 'partial' : 'none';
    else {
      const ev = r.evidence === 'test' ? testOk : biaOk;
      status = docLevel === 2 && ev ? 'full' : (docLevel || ev) ? 'partial' : 'none';
    }
    rows.push({ ...r, docs, status, evidenceOk: r.evidence === 'test' ? testOk : r.evidence === 'bia' ? biaOk : null });
  }
  const score = rs => rs.length ? Math.round(rs.reduce((a, r) => a + (r.status === 'full' ? 1 : r.status === 'partial' ? 0.5 : 0), 0) / rs.length * 100) : 0;
  return {
    rows, score: score(rows),
    perFw: fws.map(f => { const rs = rows.filter(r => r.fw === f.id); return { fw: f, rows: rs, score: score(rs) }; }),
  };
}

// ───────── terminy raportowe ─────────
export function activeRegimes(s) {
  const fw = s.org.frameworks;
  const out = [];
  if (fw.includes('nis2') || fw.includes('ksc')) out.push('nis2');
  if (fw.includes('dora')) out.push('dora');
  if (fw.includes('rodo')) out.push('rodo');
  return out;
}

const addH = (d, h) => new Date(d.getTime() + h * 3600e3);
const addM = (d, m) => { const x = new Date(d); x.setMonth(x.getMonth() + m); return x; };

export function deadlines(regime, detect, classified) {
  const D = new Date(detect);
  const C = classified ? new Date(classified) : D;
  const out = [];
  if (regime === 'nis2') {
    const notify = addH(D, 72);
    out.push({ label: 'Wczesne ostrzeżenie', at: addH(D, 24), basis: '24 h od wykrycia' });
    out.push({ label: 'Zgłoszenie incydentu', at: notify, basis: '72 h od wykrycia' });
    out.push({ label: 'Sprawozdanie końcowe', at: addM(notify, 1), basis: 'miesiąc od zgłoszenia (przy założeniu zgłoszenia w terminie)' });
  } else if (regime === 'dora') {
    const initial = new Date(Math.min(addH(C, 4).getTime(), addH(D, 24).getTime()));
    const inter = addH(initial, 72);
    out.push({ label: 'Zgłoszenie wstępne', at: initial, basis: '4 h od klasyfikacji, maks. 24 h od wykrycia' });
    out.push({ label: 'Raport pośredni', at: inter, basis: '72 h od zgłoszenia wstępnego' });
    out.push({ label: 'Raport końcowy', at: addM(inter, 1), basis: 'miesiąc od raportu pośredniego' });
  } else if (regime === 'rodo') {
    out.push({ label: 'Zgłoszenie do UODO', at: addH(D, 72), basis: '72 h od stwierdzenia naruszenia' });
  }
  return out.map(x => ({ ...x, regime, regimeName: REPORTING[regime].name, to: REPORTING[regime].to }));
}

// ───────── dokumenty ─────────
export function stepsFromTech(techId, scenarios) {
  const t = TECH_BY_ID[techId];
  if (!t) return [];
  return scenarios.filter(sc => t.steps[sc]).flatMap(sc =>
    t.steps[sc].map(([action, cmd, expected]) => ({ id: uid(), group: SCENARIOS[sc].name, who: 'Administrator', action, cmd: cmd || '', expected: expected || '' })));
}

export function createDoc(s, templateId, opts = {}) {
  const t = TEMPLATE_BY_ID[templateId];
  const doc = {
    id: uid(), templateId, type: t.type, layer: t.layer,
    title: opts.title || t.name, parentId: opts.parentId || null,
    status: 'draft', owner: opts.owner || '', version: '0.1',
    reviewDate: addDays(today(), 365), approvedBy: '', genKey: opts.genKey || null,
    reqs: [...t.reqs], processes: opts.processes || [], systems: opts.systems || [],
    tech: opts.tech || null, scenarios: opts.scenarios || [],
    sections: t.sections.map(([title, content, hint]) => ({ id: uid(), title, content, hint })),
    steps: (t.steps || []).map(([who, action, expected, group]) => ({ id: uid(), group: group || '', who, action, cmd: '', expected: expected || '' })),
    updated: new Date().toISOString(),
  };
  if (opts.tech) doc.steps = stepsFromTech(opts.tech, opts.scenarios || []);
  s.documents.push(doc);
  return doc;
}

const RECOVERY_SC = ['restore', 'failover', 'failback', 'verify'];
const IR_SC = ['isolate', 'evidence'];

// Buduje kompletną hierarchię dokumentacji z danych BIA i systemów. Nie duplikuje istniejących dokumentów.
export function generateStructure(s) {
  const made = [];
  const get = (key, templateId, opts) => {
    let d = s.documents.find(x => x.genKey === key);
    if (!d) { d = createDoc(s, templateId, { ...opts, genKey: key }); made.push(d); }
    return d;
  };
  const fw = s.org.frameworks;
  const polBcm = get('pol-bcm', 'pol-bcm');
  const polIr = get('pol-ir', 'pol-ir');
  get('pol-backup', 'pol-backup');
  const bcp = get('plan-bcp', 'plan-bcp', { parentId: polBcm.id });
  const drp = get('plan-drp', 'plan-drp', { parentId: polBcm.id });
  const irp = get('plan-irp', 'plan-irp', { parentId: polIr.id });
  get('plan-comm', 'plan-comm', { parentId: polBcm.id });
  const act = get('proc-activation', 'proc-activation', { parentId: bcp.id });
  const rec = get('proc-recovery', 'proc-recovery', { parentId: drp.id });
  const fo = get('proc-failover', 'proc-failover', { parentId: drp.id });
  const inc = get('proc-incident', 'proc-incident', { parentId: irp.id });
  if (fw.includes('rodo')) get('proc-breach', 'proc-breach', { parentId: irp.id });
  get('proc-testing', 'proc-testing', { parentId: polBcm.id });
  get('proc-lessons', 'proc-lessons', { parentId: irp.id });
  get('ins-calltree', 'ins-calltree', { parentId: act.id });

  for (const p of s.processes.filter(p => +p.criticality >= 4)) {
    get(`manual:${p.id}`, 'ins-manual', { parentId: bcp.id, title: `Tryb awaryjny – ${p.name}`, processes: [p.id], owner: p.owner });
  }
  for (const sys of s.systems) {
    for (const techId of sys.tech || []) {
      const t = TECH_BY_ID[techId];
      if (!t) continue;
      const rsc = RECOVERY_SC.filter(sc => t.steps[sc]);
      const parent = (rsc.includes('failover') ? fo : rec);
      if (rsc.length) get(`rec:${sys.id}:${techId}`, 'ins-tech', {
        parentId: parent.id, title: `Odtworzenie – ${sys.name} · ${t.name}`,
        systems: [sys.id], tech: techId, scenarios: rsc, owner: sys.owner,
      });
      const isc = IR_SC.filter(sc => t.steps[sc]);
      if (isc.length) get(`ir:${sys.id}:${techId}`, 'ins-tech', {
        parentId: inc.id, title: `Izolacja i dowody – ${sys.name} · ${t.name}`,
        systems: [sys.id], tech: techId, scenarios: isc, owner: sys.owner,
      });
    }
  }
  return made;
}

// ───────── rozwijanie znaczników ─────────
const table = (head, rows) => rows.length
  ? `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n` + rows.map(r => `| ${r.map(c => String(c ?? '–').replace(/\|/g, '/')).join(' | ')} |`).join('\n')
  : '_Brak danych – uzupełnij w aplikacji._';

const CRIT = ['', '1 – niska', '2', '3 – średnia', '4', '5 – krytyczna'];

export function expand(text, s, doc) {
  return text.replace(/\{\{([a-z:]+)\}\}/g, (m, key) => {
    switch (key) {
      case 'org': return s.org.name || '[nazwa organizacji]';
      case 'frameworks': return FRAMEWORKS.filter(f => s.org.frameworks.includes(f.id)).map(f => `- **${f.name}** – ${f.title}`).join('\n') || '_Nie wybrano ram – Ustawienia._';
      case 'table:processes': {
        const ps = doc?.processes?.length ? s.processes.filter(p => doc.processes.includes(p.id)) : s.processes;
        return table(['Proces', 'Właściciel', 'Krytyczność', 'MTPD', 'RTO', 'RPO', 'MBCO'],
          [...ps].sort((a, b) => b.criticality - a.criticality).map(p => [p.name, p.owner, CRIT[p.criticality] || p.criticality, fmtH(p.mtpd), fmtH(p.rto), fmtH(p.rpo), p.mbco]));
      }
      case 'table:systems': {
        const ss = doc?.systems?.length ? s.systems.filter(x => doc.systems.includes(x.id)) : s.systems;
        return table(['System', 'Technologie', 'Wymagane RTO / RPO', 'Osiągalne RTO / RPO', 'Kopie', 'Ośrodek zapasowy'],
          ss.map(x => { const r = systemRequirements(s, x.id); return [x.name, (x.tech || []).map(t => TECH_BY_ID[t]?.name || t).join(', '), `${fmtH(r.rto)} / ${fmtH(r.rpo)}`, `${fmtH(x.rtoCap)} / ${fmtH(x.rpoCap)}`, x.backup, x.drSite]; }));
      }
      case 'table:gaps': {
        const g = gaps(s);
        return g.length ? table(['Luka', 'Proces', 'System', 'Wymagane', 'Osiągalne'],
          g.map(x => [x.kind, x.process.name, x.system.name + (x.direct ? '' : ' (zależność)'), fmtH(x.need), fmtH(x.have)]))
          : 'Osiągalne RTO i RPO wszystkich systemów spełniają wymagania procesów.';
      }
      case 'table:order':
        return table(['Kolejność', 'System', 'Zależy od', 'Wymagane RTO'],
          recoveryOrder(s).map(o => [o.n, o.sys.name, (o.sys.deps || []).map(d => byId(s.systems, d)?.name).filter(Boolean).join(', '), fmtH(o.rto)]));
      case 'reporting': {
        const reg = activeRegimes(s);
        if (!reg.length) return '_Wybrane ramy nie nakładają ustawowych terminów raportowych._';
        return table(['Reżim', 'Odbiorca', 'Raport', 'Termin'], reg.flatMap(r => REPORTING[r].items.map(i => [REPORTING[r].name, REPORTING[r].to, i.label, i.h ? `${i.h} h` + (i.note ? ` – ${i.note}` : '') : (i.note || (i.months ? `${i.months} mies.` : ''))])))
          + '\n\nTerminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.';
      }
      case 'children': {
        const ch = doc ? children(s, doc.id) : [];
        return ch.length ? ch.map(c => `- ${DOC_TYPES[c.type].name}: **${c.title}** (v${c.version}, ${STATUS[c.status]})`).join('\n') : '_Brak dokumentów podrzędnych._';
      }
      default: return m;
    }
  });
}

export const STATUS = { draft: 'projekt', review: 'w przeglądzie', approved: 'zatwierdzony' };

export function docToMarkdown(s, doc) {
  const t = DOC_TYPES[doc.type];
  const parts = [`# ${doc.title}`, '',
    `| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |`, `|---|---|---|---|---|---|`,
    `| ${t.name} | ${{ biz: 'biznesowa', tech: 'techniczna', both: 'biznesowo-techniczna' }[doc.layer]} | ${doc.version} | ${STATUS[doc.status]} | ${doc.owner || '–'} | ${doc.reviewDate || '–'} |`, ''];
  const anc = ancestors(s, doc);
  if (anc.length) parts.push(`Dokument nadrzędny: ${anc.map(a => a.title).join(' → ')}`, '');
  if (doc.tech) parts.push(`Technologia: **${TECH_BY_ID[doc.tech]?.name || doc.tech}**`, '');
  const inline = doc.sections.some(sec => sec.content.includes('{{steps}}'));
  const stepsMd = () => {
    const out = [];
    let g = null, n = 0;
    doc.steps.forEach(st => {
      if (st.group && st.group !== g) { g = st.group; out.push(`### ${g}`, ''); }
      n++;
      out.push(`${n}. ${st.who ? `**${st.who}:** ` : ''}${st.action}`);
      if (st.cmd) out.push('', '   ```', ...st.cmd.split('\n').map(l => '   ' + l), '   ```');
      if (st.expected) out.push(`   _Oczekiwany rezultat:_ ${st.expected}`);
    });
    return out.join('\n');
  };
  doc.sections.forEach(sec => parts.push(`## ${sec.title}`, '', expand(sec.content, s, doc).replace('{{steps}}', () => stepsMd() || '_Brak kroków._'), ''));
  if (doc.steps.length && !inline) {
    parts.push('## Kroki', '', stepsMd(), '');
  }
  if (doc.reqs.length) {
    parts.push('## Mapowanie na wymagania', '');
    doc.reqs.forEach(r => { const [fw, code] = r.split(':'); parts.push(`- ${FW_BY_ID[fw]?.name || fw} – ${code}`); });
  }
  return parts.join('\n');
}

export function bundleMarkdown(s) {
  const roots = s.documents.filter(d => !d.parentId || !byId(s.documents, d.parentId));
  const order = [];
  const walk = d => { order.push(d); children(s, d.id).forEach(walk); };
  roots.sort((a, b) => DOC_TYPES[a.type].level - DOC_TYPES[b.type].level).forEach(walk);
  return `# Dokumentacja ciągłości działania – ${s.org.name || ''}\n\nWygenerowano: ${new Date().toLocaleString('pl-PL')}\n\n` +
    order.map(d => docToMarkdown(s, d).replace(/^(#+)/gm, '#$1')).join('\n\n---\n\n');
}

// ───────── markdown → HTML (podzbiór) ─────────
const inline = t => esc(t)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/(^|[\s(])_([^_]+)_(?=[\s).,:;]|$)/g, '$1<em>$2</em>');

export function md(src) {
  const lines = src.split('\n');
  let html = '', i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (/^\s*```/.test(l)) {
      const buf = []; i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) buf.push(lines[i++].replace(/^ {3}/, ''));
      i++; html += `<pre class="cmd"><code>${esc(buf.join('\n'))}</code></pre>`; continue;
    }
    if (/^#{1,4} /.test(l)) { const n = l.match(/^#+/)[0].length; html += `<h${n + 1}>${inline(l.slice(n + 1))}</h${n + 1}>`; i++; continue; }
    if (/^\|/.test(l)) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const body = rows.filter((r, k) => k !== 1 || !/^\|[\s-:|]+\|$/.test(r));
      html += `<div class="tbl"><table><thead><tr>${cells(body[0]).map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>` +
        body.slice(1).map(r => `<tr>${cells(r).map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('') + '</tbody></table></div>';
      continue;
    }
    if (/^\s*[-*] /.test(l)) {
      html += '<ul>';
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) html += `<li>${inline(lines[i++].replace(/^\s*[-*] /, ''))}</li>`;
      html += '</ul>'; continue;
    }
    if (/^\d+\. /.test(l)) {
      html += '<ol>';
      while (i < lines.length && /^\d+\. /.test(lines[i])) html += `<li>${inline(lines[i++].replace(/^\d+\. /, ''))}</li>`;
      html += '</ol>'; continue;
    }
    if (!l.trim()) { i++; continue; }
    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4} |\||\s*[-*] |\d+\. |\s*```)/.test(lines[i])) buf.push(lines[i++]);
    html += `<p>${inline(buf.join(' '))}</p>`;
  }
  return html;
}

// ───────── testy ─────────
export function buildTestSteps(s, test, exercise) {
  const steps = [];
  if (exercise) exercise.injects.forEach(([min, text, q]) => steps.push({ id: uid(), group: `Wstrzyknięcie T+${min} min`, text, cmd: '', who: 'Prowadzący', question: q, status: '', note: '', at: null }));
  for (const id of test.docIds || []) {
    const d = byId(s.documents, id);
    if (!d) continue;
    [d, ...descendants(s, d.id)].forEach(x => x.steps.forEach(st =>
      steps.push({ id: uid(), group: x.title + (st.group ? ` · ${st.group}` : ''), text: st.action, cmd: st.cmd, who: st.who, expected: st.expected, status: '', note: '', at: null })));
  }
  return steps;
}

export const testTypeName = t => TEST_TYPES[t]?.name || t;

// ───────── pulpit ─────────
export function attention(s) {
  const items = [];
  const t = today();
  gaps(s).forEach(g => items.push({ sev: 'crit', text: `${g.system.name}: osiągalne ${g.kind} ${fmtH(g.have)} > wymagane ${fmtH(g.need)} (${g.process.name})`, href: `#/tech/${g.system.id}` }));
  s.systems.forEach(x => {
    const has = s.documents.some(d => d.type === 'instruction' && (d.systems || []).includes(x.id));
    if (!has) items.push({ sev: 'warn', text: `${x.name}: brak instrukcji odtworzenia`, href: `#/tech/${x.id}` });
  });
  s.processes.filter(p => p.rto === '' || p.rto == null).forEach(p => items.push({ sev: 'warn', text: `${p.name}: brak RTO w BIA`, href: `#/biz/${p.id}` }));
  s.documents.filter(d => d.reviewDate && d.reviewDate < t).forEach(d => items.push({ sev: 'warn', text: `Przegląd po terminie: ${d.title}`, href: `#/doc/${d.id}` }));
  s.tests.flatMap(x => (x.findings || []).filter(f => !f.done).map(f => ({ f, x }))).forEach(({ f, x }) =>
    items.push({ sev: f.severity === 'high' ? 'crit' : 'warn', text: `Otwarte ustalenie: ${f.text}`, href: `#/test/${x.id}` }));
  return items;
}
