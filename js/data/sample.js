import { emptyState, generateStructure, buildTestSteps, uid, addDays, today, byId } from '../logic.js';
import { EXERCISE_BY_ID } from './exercises.js';

// Dane przykładowe – pokazują działanie aplikacji, nie są danymi użytkownika.
export function sampleState() {
  const s = emptyState();
  s.sample = true;
  s.org = { name: 'Przykładowa Spółka S.A.', sector: 'Usługi płatnicze', frameworks: ['iso22301', 'iso27001', 'nis2', 'ksc', 'rodo', 'nist61'] };
  const sys = (id, name, owner, tech, rtoCap, rpoCap, backup, drSite, deps = []) =>
    ({ id, name, owner, tech, rtoCap, rpoCap, backup, drSite, deps, notes: '' });
  s.systems = [
    sys('s-pay', 'System płatności', 'Kierownik zespołu Core', ['vmware', 'postgres', 'veeam'], 6, 0.25, 'Veeam co 4 h, archiwum WAL ciągłe', 'Ośrodek zapasowy Poznań (SRM)', ['s-ad', 's-fw']),
    sys('s-erp', 'ERP / kadry i płace', 'Kierownik aplikacji ERP', ['vmware', 'mssql', 'veeam'], 24, 24, 'Veeam dziennie, kopia niezmienna', 'Ośrodek zapasowy Poznań', ['s-ad']),
    sys('s-crm', 'CRM w chmurze', 'Kierownik sprzedaży', ['aws'], 4, 1, 'AWS Backup co 1 h, kopia między regionami', 'eu-central-2', []),
    sys('s-ad', 'Active Directory', 'Administrator systemów', ['ad', 'hyperv'], 4, 1, 'Kopia stanu systemu DC dziennie', 'DC w ośrodku zapasowym', []),
    sys('s-m365', 'Microsoft 365', 'Administrator M365', ['m365'], 2, 0, 'Microsoft 365 Backup', 'Usługa SaaS', []),
    sys('s-fw', 'Zapora brzegowa', 'Administrator sieci', ['fortigate'], 2, null, 'Kopia konfiguracji po każdej zmianie', 'Klaster HA', []),
  ];
  const imp = (a, b, c, d) => ({ fin: a, legal: b, rep: c, ops: d });
  s.processes = [
    { id: 'p-pay', name: 'Obsługa płatności klientów', owner: 'Dyrektor operacji', dept: 'Operacje', criticality: 5, mtpd: 8, rto: 4, rpo: 0.25, mbco: '70% wolumenu transakcji', systems: ['s-pay', 's-fw'], impacts: { h4: imp(3, 3, 3, 4), h24: imp(4, 4, 4, 4), h72: imp(4, 4, 4, 4) }, notes: '' },
    { id: 'p-crm', name: 'Sprzedaż i obsługa zamówień', owner: 'Dyrektor sprzedaży', dept: 'Sprzedaż', criticality: 4, mtpd: 48, rto: 24, rpo: 4, mbco: 'Przyjmowanie zamówień telefonicznie', systems: ['s-crm', 's-m365'], impacts: { h4: imp(1, 0, 1, 2), h24: imp(2, 1, 2, 3), h72: imp(3, 1, 3, 3) }, notes: '' },
    { id: 'p-pay2', name: 'Rozliczenia płacowe', owner: 'Kierownik kadr', dept: 'HR', criticality: 3, mtpd: 120, rto: 72, rpo: 24, mbco: 'Wypłata wynagrodzeń w terminie', systems: ['s-erp'], impacts: { h4: imp(0, 0, 0, 0), h24: imp(0, 1, 0, 1), h72: imp(1, 2, 1, 2) }, notes: '' },
    { id: 'p-comm', name: 'Komunikacja wewnętrzna i poczta', owner: 'Dyrektor IT', dept: 'IT', criticality: 4, mtpd: 24, rto: 8, rpo: 1, mbco: 'Poczta dla zarządu i zespołu kryzysowego', systems: ['s-m365', 's-ad'], impacts: { h4: imp(1, 0, 1, 3), h24: imp(2, 1, 2, 3), h72: imp(2, 1, 3, 4) }, notes: '' },
  ];
  generateStructure(s);
  for (const d of s.documents) {
    if (d.type === 'policy' || d.templateId === 'plan-bcp' || d.templateId === 'plan-irp') {
      d.status = 'approved'; d.version = '1.0'; d.approvedBy = 'Zarząd';
    }
    if (!d.owner) d.owner = { policy: 'Koordynator BCM', plan: 'Koordynator BCM', procedure: 'Właściciel procesu' }[d.type] || '';
  }
  const pastStart = addDays(today(), -58) + 'T08:00:00.000Z';
  const pastEnd = addDays(today(), -58) + 'T13:30:00.000Z';
  const recDoc = s.documents.find(d => d.genKey === 'rec:s-pay:postgres');
  const done = {
    id: uid(), name: 'Test odtworzenia systemu płatności', type: 'technical', date: addDays(today(), -58),
    status: 'done', docIds: recDoc ? [recDoc.id] : [], exerciseId: '', objectives: 'Potwierdzić odtworzenie bazy płatności do punktu w czasie w ośrodku zapasowym.',
    criteria: 'RTO ≤ 4 h, utrata danych ≤ 15 min', participants: 'Zespół Core, administrator kopii, właściciel procesu',
    targetRto: 4, targetRpo: 0.25, startedAt: pastStart, endedAt: pastEnd, actualRto: 5.5, actualRpo: 0.1, rating: 'partial',
    notes: 'Odtworzenie bazy przebiegło poprawnie, opóźnienie wynikło z ręcznego uruchamiania VM w niewłaściwej kolejności.',
    findings: [
      { id: uid(), text: 'RTO przekroczone o 1,5 h – kolejność uruchamiania VM ustalana ręcznie', severity: 'high', action: 'Zdefiniować grupy priorytetów w planie SRM', owner: 'Kierownik zespołu Core', due: addDays(today(), 20), done: false },
      { id: uid(), text: 'Hasło konta awaryjnego do konsoli kopii było nieaktualne w sejfie', severity: 'medium', action: 'Kwartalna weryfikacja haseł break-glass', owner: 'Administrator kopii', due: addDays(today(), -10), done: true },
    ],
    steps: [],
  };
  done.steps = buildTestSteps(s, done, null).map((st, i) => ({ ...st, status: i === 2 ? 'issue' : 'ok', note: i === 2 ? 'Opóźnienie 40 min' : '', at: pastStart }));
  const planned = {
    id: uid(), name: 'Ćwiczenie sztabowe: ransomware', type: 'tabletop', date: addDays(today(), 24),
    status: 'planned', docIds: [s.documents.find(d => d.genKey === 'plan-irp').id], exerciseId: 'ransomware',
    objectives: 'Sprawdzić decyzje zespołu kryzysowego i terminowość zgłoszeń NIS2/KSC i RODO.', criteria: 'Decyzja o klasyfikacji w 60 min; wczesne ostrzeżenie przygotowane',
    participants: 'Zespół kryzysowy, IOD, SOC', targetRto: '', targetRpo: '', startedAt: null, endedAt: null, actualRto: '', actualRpo: '', rating: '', notes: '', findings: [], steps: [],
  };
  planned.steps = buildTestSteps(s, { docIds: [] }, EXERCISE_BY_ID.ransomware);
  s.tests = [done, planned];
  return s;
}
