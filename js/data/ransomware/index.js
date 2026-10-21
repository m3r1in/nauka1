// Pakiet „Ransomware”: polityka, 7 planów scenariuszowych, procedury, instrukcje i checklisty
// zgodne z ISO 22301, ISO/IEC 27001/27035/27037 oraz NIST CSF 2.0, SP 800-61r3 i SP 800-184.
import { uid, addDays, today, systemClosure } from '../../logic.js';
import { COLS } from './helpers.js';
import { POLICY, PLANS } from './policy-plans.js';
import { INF } from './inf.js';
import { AD } from './ad.js';
import { BKP } from './bkp.js';
import { NAS } from './nas.js';
import { APP } from './aplikacje.js';
import { WMS } from './wms.js';
import { POS } from './pos.js';

export { COLS };
export const PACK = [POLICY, ...PLANS, ...INF, ...AD, ...BKP, ...NAS, ...APP, ...WMS, ...POS];

const PLAN_OWNER = { INF: 'CISO', AD: 'Dyrektor IT', BKP: 'Dyrektor IT', NAS: 'Dyrektor IT', APP: 'Dyrektor IT', WMS: 'Dyrektor logistyki', POS: 'Dyrektor operacji sklepowych' };
const TECH_OWNER = { INF: 'Kierownik SOC', AD: 'Administrator AD', BKP: 'Administrator kopii zapasowych', NAS: 'Administrator pamięci masowej', APP: 'Administrator aplikacji', WMS: 'Administrator systemów logistycznych', POS: 'Administrator systemów sklepowych' };

// Dopasowanie systemów organizacji do scenariuszy na podstawie technologii i nazw.
export function autoMap(s) {
  const by = (fn) => s.systems.filter(fn).map(x => x.id);
  const has = (x, ...t) => (x.tech || []).some(k => t.includes(k));
  const WMSs = by(x => /wms|magazyn/i.test(x.name));
  const POSs = by(x => has(x, 'pos') || /\bpos\b|kas/i.test(x.name));
  const BKPs = by(x => /kopi|backup/i.test(x.name));
  return {
    INF: s.systems.map(x => x.id),
    AD: by(x => has(x, 'ad') || /active directory|tożsamo/i.test(x.name)),
    BKP: BKPs.length ? BKPs : by(x => has(x, 'veeam')),
    NAS: by(x => has(x, 'netapp') || /plik|nas\b/i.test(x.name)),
    APP: by(x => has(x, 'mssql', 'postgres', 'oracle', 'k8s') && !WMSs.includes(x.id) && !POSs.includes(x.id) && !BKPs.includes(x.id)),
    WMS: WMSs,
    POS: POSs,
  };
}

// Dodaje pakiet do stanu organizacji. Nie duplikuje dokumentów już dodanych (klucz genKey).
export function addRansomwarePack(s, map = autoMap(s)) {
  const byCode = {};
  s.documents.filter(d => d.genKey?.startsWith('rp:')).forEach(d => { byCode[d.genKey.slice(3)] = d; });
  const procsFor = sysIds => {
    if (!sysIds?.length) return [];
    return s.processes.filter(p => systemClosure(s, p.systems || []).some(id => sysIds.includes(id))).map(p => p.id);
  };
  const made = [];
  for (const t of PACK) {
    if (byCode[t.code]) continue;
    const col = t.col;
    const systems = t.type === 'policy' ? [] : (map[col] || []);
    const doc = {
      id: uid(), templateId: t.checklist ? 'ins-checklist' : 'pack-ransomware', genKey: `rp:${t.code}`,
      code: t.code, col: col || null, kind: t.checklist ? 'checklist' : t.type,
      type: t.type, layer: t.layer,
      title: `${t.code === 'POL' ? 'POL-RAN' : t.code} · ${t.title}`,
      parentId: null, status: 'draft', version: '0.1', reviewDate: addDays(today(), 365), approvedBy: '',
      owner: t.type === 'policy' ? 'Zarząd' : t.type === 'plan' ? PLAN_OWNER[col] : TECH_OWNER[col],
      reqs: [...new Set(t.reqs || [])],
      processes: t.type === 'policy' ? [] : procsFor(systems),
      systems,
      tech: null, scenarios: [],
      sections: t.sections.map(([title, content]) => ({ id: uid(), title, content, hint: '' })),
      steps: (t.steps || []).map(([who, action, cmd = '', expected = '', group = '']) => ({ id: uid(), group, who, action, cmd, expected })),
      updated: new Date().toISOString(),
    };
    byCode[t.code] = doc;
    s.documents.push(doc);
    made.push(doc);
  }
  // Rodzice po utworzeniu wszystkich dokumentów.
  for (const t of PACK) {
    const d = byCode[t.code];
    if (made.includes(d) && t.parent) d.parentId = byCode[t.parent]?.id || null;
  }
  return made;
}

// Macierz jak w tabeli źródłowej: wiersze typów, kolumny scenariuszy.
export const MATRIX_ROWS = [
  ['policy', 'Polityka'], ['plan', 'Plan'], ['procedure', 'Procedura'], ['instruction', 'Instrukcja'], ['checklist', 'Checklista'],
];
