// Buduje projekt „Rossmann Polska – ransomware” dla BCM Studio.
// Uruchom: node tools/build-rossmann.mjs
// Wynik: examples/rossmann-ransomware.json (import do aplikacji) i examples/rossmann/*.md
import { writeFileSync, mkdirSync } from 'node:fs';
import {
  emptyState, buildTestSteps, uid, addDays, today, byId, bundleMarkdown, docToMarkdown, gaps, fmtH, compliance,
} from '../js/logic.js';
import { EXERCISE_BY_ID } from '../js/data/exercises.js';
import { addRansomwarePack, COLS, MATRIX_ROWS } from '../js/data/ransomware/index.js';

const s = emptyState();
const BASE = today();
s.banner = 'Projekt planu przygotowany na podstawie źródeł publicznych (OSINT). Warstwa techniczna to założenia – zweryfikuj z inwentarzem IT i właścicielami procesów przed zatwierdzeniem.';
s.org = {
  name: 'Rossmann Polska',
  sector: 'Handel detaliczny – sieć drogerii',
  frameworks: ['iso22301', 'iso27001', 'iso27031', 'iso27035', 'iso27037', 'csf2', 'nist61', 'nist184', 'nist34', 'pci', 'rodo', 'nis2', 'ksc'],
  notes: [
    'FAKTY (źródła publiczne, stan na ' + BASE + ', do weryfikacji w KRS i sprawozdaniach):',
    '- Podmiot: Rossmann Supermarkety Drogeryjne Polska Sp. z o.o. (nazwę i dane rejestrowe potwierdź w KRS); centrala w Łodzi.',
    '- Sieć: ok. 1925 drogerii w 709 miejscowościach na koniec 2024 r.; próg 2000 drogerii przekroczony w październiku 2025 r.',
    '- Skala: sprzedaż netto 2024 ok. 15,0 mld zł (inne źródła podają 17,9 mld zł – różne miary), zysk netto ok. 1,47 mld zł; zatrudnienie rzędu kilkunastu tysięcy osób (2023: ok. 17,1 tys.).',
    '- Logistyka: centra dystrybucyjne w Łodzi (ok. 66 tys. m²), Pyskowicach (rozbudowa do 66 tys. m² z automatyką Körber: magazyn wysokiego składowania i magazyny shuttle, zakończenie planowane na 2. połowę 2027 r.), Grudziądzu, Zgierzu i Dąbrówce Wielkiej.',
    '- Kanały cyfrowe: sklep internetowy rossmann.pl, aplikacja Rossmann PL z wirtualną kartą Klubu Rossmanna, click & collect, dostawa do domu, płatność w aplikacji (Rossmann GO); kasy samoobsługowe w drogeriach.',
    '- Zagrożenia obserwowane: kampanie oszustów podszywających się pod markę (fałszywe karty podarunkowe, ankiety). Nie znaleziono publicznych informacji o ataku ransomware na Rossmann Polska.',
    '- Kontekst branżowy: ataki ransomware na Marks & Spencer i Co-op (UK, 2025) – wstrzymanie sprzedaży online, płatności zbliżeniowych, automatycznych zamówień i dostaw, kradzież danych klientów; incydent w Żabce (2026) – przejęcie kont z dostępem do infrastruktury i wyciek kodu.',
    '',
    'ZAŁOŻENIA (do potwierdzenia):',
    '- Konkretne produkty (wirtualizacja, bazy danych, kopie, zapory, EDR) przyjęto jako typowe dla organizacji tej skali – zastąp je faktycznymi.',
    '- Wartości RTO/RPO/MTPD to propozycje do warsztatu BIA z właścicielami procesów.',
    '- Status wobec NIS2/ustawy o KSC wymaga analizy prawnej (handel detaliczny nie jest wprost sektorem kluczowym; możliwe powiązania: dystrybucja substancji chemicznych, żywność, usługi cyfrowe). Plan przyjmuje podejście ostrożne i uwzględnia terminy NIS2/KSC.',
    '- PCI DSS: obowiązki zależą od modelu obsługi kart (agent rozliczeniowy, terminale P2PE) – do potwierdzenia.',
  ].join('\n'),
};

const A = 'ZAŁOŻENIE – zweryfikuj z inwentarzem IT.';
const sys = (id, name, owner, tech, rtoCap, rpoCap, backup, drSite, deps, notes = A) => ({ id, name, owner, tech, rtoCap, rpoCap, backup, drSite, deps, notes });
s.systems = [
  sys('s-ad', 'Tożsamość: Active Directory i Entra ID', 'Zespół infrastruktury', ['ad', 'm365'], 24, 1, 'Kopia stanu systemu DC dziennie, kopia niezmienna', 'Kontrolery domeny w drugiej lokalizacji', [], `${A} Odtworzenie lasu AD po ransomware zwykle trwa 1–3 doby – kluczowe wąskie gardło.`),
  sys('s-net', 'Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory)', 'Zespół sieci', ['fortigate'], 4, null, 'Kopia konfiguracji po każdej zmianie', 'Klastry HA, łącza zapasowe LTE w drogeriach', []),
  sys('s-pos', 'System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe)', 'Zespół systemów sklepowych', ['pos', 'mde'], 4, 0.25, 'Złoty obraz kasy; transakcje replikowane do centrali', 'Tryb offline kas', ['s-ad', 's-net'], `${A} Potwierdź, czy kasy działają offline bez AD i centrali oraz jak długo; cenniki z ERP ładowane cyklicznie.`),
  sys('s-pay', 'Płatności kartowe – terminale i agent rozliczeniowy', 'Dział finansowy / dostawca', [], 2, 0, 'Usługa zewnętrzna', 'Łącze terminali niezależne od sieci centrali', [], 'Usługa zewnętrzna – zweryfikuj SLA, niezależność łączy i obowiązki PCI DSS.'),
  sys('s-erp', 'ERP: towar, ceny, zakupy, finanse', 'Zespół ERP', ['vmware', 'mssql', 'veeam'], 48, 24, 'Kopia dzienna, kopia niezmienna', 'Ośrodek zapasowy', ['s-ad']),
  sys('s-wms', 'WMS i sterowanie automatyką centrów dystrybucyjnych', 'Zespół systemów logistycznych', ['vmware', 'mssql', 'veeam'], 24, 4, 'Kopia co 4 h', 'Brak – do analizy', ['s-ad', 's-net', 's-erp'], `${A} Automatyka (np. Körber w Pyskowicach) ma własne sterowanie – ustal z dostawcą tryb awaryjny.`),
  sys('s-edi', 'EDI / B2B z dostawcami', 'Zespół integracji', ['linux'], 24, 4, 'Kopia dzienna', '–', ['s-erp']),
  sys('s-ecom', 'Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO)', 'Zespół e-commerce', ['k8s', 'postgres'], 8, 0.5, 'Kopie Velero i PITR bazy', 'Druga strefa dostępności', ['s-erp', 's-crm']),
  sys('s-crm', 'Program lojalnościowy Klub Rossmanna (CRM, dane klientów)', 'Zespół CRM', ['postgres'], 24, 1, 'PITR bazy, kopia niezmienna', 'Replika', ['s-ad'], `${A} Bardzo duży zbiór danych osobowych – priorytet przy ocenie naruszenia RODO.`),
  sys('s-m365', 'Microsoft 365: poczta i Teams', 'Zespół infrastruktury', ['m365'], 4, 1, 'Microsoft 365 Backup', 'Usługa SaaS', ['s-ad']),
  sys('s-backup', 'Platforma kopii zapasowych (kopie niezmienne, odizolowane)', 'Zespół infrastruktury', ['veeam', 'linux'], 8, 24, 'Repozytorium niezmienne + kopia offline', 'Druga lokalizacja', []),
  sys('s-files', 'Serwery plików i NAS (udziały centrali i centrów dystrybucyjnych)', 'Zespół infrastruktury', ['netapp'], 8, 1, 'Migawki co 1 h, kopia dzienna', 'Replikacja SnapMirror', ['s-ad']),
  sys('s-sec', 'Platforma bezpieczeństwa: SIEM, EDR, NAC', 'SOC', ['mde'], 4, 1, 'Retencja logów 12 mies.', 'Usługa chmurowa / klaster', [], `${A} Kluczowa dla wykrywania i izolacji – musi działać niezależnie od domeny produkcyjnej.`),
  sys('s-hr', 'Kadry i płace', 'Dział HR', ['mssql'], 72, 24, 'Kopia dzienna', 'Ośrodek zapasowy', ['s-ad']),
];

const imp = (fin, legal, rep, ops) => ({ fin, legal, rep, ops });
const proc = (id, name, owner, dept, criticality, mtpd, rto, rpo, mbco, systems, impacts) => ({ id, name, owner, dept, criticality, mtpd, rto, rpo, mbco, systems, impacts, notes: 'Wartości proponowane – do zatwierdzenia na warsztacie BIA.' });
s.processes = [
  proc('p-sales', 'Sprzedaż w drogeriach', 'Dyrektor operacji sklepowych', 'Operacje', 5, 4, 2, 0.25, 'Sprzedaż (gotówka i karty) w trybie offline w co najmniej 80% drogerii', ['s-pos', 's-pay', 's-net'], { h4: imp(3, 1, 3, 4), h24: imp(4, 2, 4, 4), h72: imp(4, 2, 4, 4), w1: imp(4, 3, 4, 4) }),
  proc('p-dist', 'Zaopatrzenie drogerii z centrów dystrybucyjnych', 'Dyrektor logistyki', 'Logistyka', 5, 72, 24, 4, 'Dostawy uzupełniające produktów o najwyższej rotacji do drogerii z najniższym zapasem', ['s-wms', 's-net'], { h4: imp(0, 0, 0, 1), h24: imp(2, 0, 1, 2), h72: imp(3, 1, 3, 4), w1: imp(4, 1, 4, 4) }),
  proc('p-buy', 'Zakupy i zarządzanie zapasami', 'Dyrektor handlowy', 'Handel', 4, 120, 48, 4, 'Zamówienia u kluczowych dostawców (ręcznie / EDI)', ['s-erp', 's-edi', 's-files'], { h4: imp(0, 0, 0, 0), h24: imp(1, 0, 0, 1), h72: imp(2, 1, 1, 3), w1: imp(3, 1, 2, 4) }),
  proc('p-ecom', 'Sprzedaż internetowa i click & collect', 'Dyrektor e-commerce', 'E-commerce', 4, 48, 24, 0.5, 'Przyjmowanie i realizacja zamówień z odbiorem w drogerii', ['s-ecom'], { h4: imp(1, 0, 2, 1), h24: imp(2, 1, 3, 2), h72: imp(3, 1, 3, 3), w1: imp(3, 1, 4, 3) }),
  proc('p-loyal', 'Program lojalnościowy i aplikacja klienta', 'Dyrektor marketingu', 'Marketing', 3, 72, 48, 1, 'Identyfikacja członków Klubu i naliczanie rabatów (możliwe ręczne korekty)', ['s-crm', 's-ecom'], { h4: imp(1, 0, 1, 1), h24: imp(1, 1, 2, 2), h72: imp(2, 3, 3, 2), w1: imp(3, 3, 3, 3) }),
  proc('p-fin', 'Finanse i płatności do dostawców', 'Dyrektor finansowy', 'Finanse', 4, 168, 72, 24, 'Płatności krytyczne (wynagrodzenia, podatki, kluczowi dostawcy)', ['s-erp', 's-files'], { h4: imp(0, 0, 0, 0), h24: imp(0, 0, 0, 0), h72: imp(1, 1, 1, 1), w1: imp(3, 3, 2, 2) }),
  proc('p-hr', 'Wynagrodzenia i kadry', 'Dyrektor HR', 'HR', 3, 240, 120, 24, 'Wypłata wynagrodzeń w terminie (również według listy z poprzedniego miesiąca)', ['s-hr'], { h4: imp(0, 0, 0, 0), h24: imp(0, 0, 0, 0), h72: imp(0, 1, 1, 1), w1: imp(1, 2, 2, 2) }),
  proc('p-comm', 'Komunikacja kryzysowa i obsługa klienta', 'Dyrektor komunikacji', 'Komunikacja', 5, 8, 4, 1, 'Kanał pozapasmowy zespołu kryzysowego, komunikaty do drogerii, klientów i mediów', ['s-m365'], { h4: imp(1, 1, 3, 3), h24: imp(2, 2, 4, 3), h72: imp(2, 2, 4, 3), w1: imp(2, 2, 4, 3) }),
];

// ── dokumentacja: pakiet ransomware (polityka → 7 planów → procedury → instrukcje i checklisty)
addRansomwarePack(s, {
  INF: s.systems.map(x => x.id),
  AD: ['s-ad'],
  BKP: ['s-backup'],
  NAS: ['s-files'],
  APP: ['s-erp', 's-ecom', 's-crm', 's-edi', 's-hr'],
  WMS: ['s-wms'],
  POS: ['s-pos', 's-pay'],
});
const D = code => s.documents.find(d => d.code === code);
const addSec = (code, title, content, after = '2. Scenariusz') => {
  const d = D(code);
  const i = d.sections.findIndex(x => x.title === after);
  d.sections.splice(i + 1, 0, { id: uid(), title, content, hint: 'Specyfika organizacji – na podstawie OSINT, do weryfikacji.' });
};
addSec('PL-INF', '2a. Specyfika Rossmann Polska', 'Rozproszona infrastruktura (centrala w Łodzi, pięć centrów dystrybucyjnych, około 2000 drogerii) i duża liczba dostawców z dostępem zdalnym zwiększają powierzchnię ataku. Marka jest często wykorzystywana w kampaniach oszustów (fałszywe karty podarunkowe, ankiety) – kampanie phishingowe wobec pracowników i service desku są realnym wektorem wejścia. Wnioski z ataków na sieci handlowe w 2025 r. (Marks & Spencer, Co-op): socjotechnika wobec helpdesku i przejęcie kont, następnie tygodnie zakłóceń logistyki i sprzedaży online.');
addSec('PL-POS', '2a. Specyfika Rossmann Polska', '- Około 2000 drogerii w ponad 700 miejscowościach; kasy tradycyjne i samoobsługowe; płatność w aplikacji (Rossmann GO).\n- Program lojalnościowy Klub Rossmanna zintegrowany z kasą – w trybie awaryjnym rabaty Klubu są wstrzymane.\n- Kierownicy regionów są głównym kanałem poleceń dla drogerii (SMS / telefon).\n- Urządzenia fiskalne (kasy online) przesyłają dane do Centralnego Repozytorium Kas – po odtworzeniu sprawdź brak zaległości.\n- Priorytet fal odtwarzania: drogerie o najwyższym obrocie i najniższym zapasie, centra handlowe, miasta z jedną drogerią.');
addSec('PL-WMS', '2a. Specyfika Rossmann Polska', '- Centra dystrybucyjne: Łódź (ok. 66 tys. m²), Pyskowice (rozbudowa do 66 tys. m² z automatyką Körber: magazyn wysokiego składowania ok. 27 tys. miejsc paletowych i magazyny shuttle), Grudziądz, Zgierz, Dąbrówka Wielka.\n- Automatyka w Pyskowicach ma własne sterowanie (WCS) – tryb awaryjny i procedurę bezpiecznego zatrzymania ustala się z dostawcą automatyki.\n- Zapas w drogeriach wystarcza na kilka dni – MTPD zaopatrzenia przyjęto na 72 h.\n- Alternatywa: przekierowanie części dostaw do innego centrum dystrybucyjnego (decyzja ZZK).');
addSec('PL-APP', '2a. Specyfika Rossmann Polska', '- Aplikacje krytyczne: ERP (towar, ceny, zakupy, finanse), sklep rossmann.pl i aplikacja Rossmann PL (zakupy online, click & collect, Rossmann GO), CRM programu Klub Rossmanna, EDI z dostawcami, kadry i płace.\n- CRM Klubu Rossmanna zawiera bardzo duży zbiór danych osobowych i historię zakupów – każdy incydent obejmujący tę bazę wymaga oceny RODO w pierwszych godzinach.\n- Dla sklepu internetowego tryb awaryjny to strona serwisowa i wstrzymanie przyjmowania zamówień; dla ERP – ręczne zamówienia u kluczowych dostawców.');
addSec('PL-NAS', '2a. Specyfika Rossmann Polska', 'Udziały działów centrali (handel, marketing, finanse, HR) oraz udziały operacyjne centrów dystrybucyjnych. Dane HR i rekrutacyjne zawierają dane osobowe – priorytet przy ocenie RODO. Technologię NAS przyjęto jako założenie.');

// wszystkie dokumenty to projekt do zatwierdzenia
for (const d of s.documents) d.status = 'draft';

// ── program testów (zgodny z polityką, rozdz. 14)
const test = (name, type, days, codes, extra = {}) => {
  const t = {
    id: uid(), name, type, date: addDays(BASE, days), status: 'planned', docIds: codes.map(c => D(c).id), exerciseId: '', objectives: '', criteria: '', participants: '',
    targetRto: '', targetRpo: '', startedAt: null, endedAt: null, actualRto: '', actualRpo: '', rating: '', notes: '', findings: [], steps: [], ...extra,
  };
  t.steps = buildTestSteps(s, t, EXERCISE_BY_ID[t.exerciseId]);
  s.tests.push(t);
};
test('Przegląd polityki i planów ransomware z właścicielami procesów', 'review', 14, [], {
  objectives: 'Potwierdzić role, kontakty, kryteria aktywacji, bramki DG0–DG6 oraz zastąpić założenia techniczne faktami z inwentarza IT.',
  criteria: 'Wszystkie założenia w systemach potwierdzone lub poprawione; polityka gotowa do zatwierdzenia przez Zarząd', participants: 'Koordynator BCM, CISO, Dyrektor IT, właściciele procesów, IOD, dział prawny',
});
test('Ćwiczenie sztabowe: ransomware w sieci drogerii', 'tabletop', 28, ['CL-INF-1', 'CL-INF-2'], {
  exerciseId: 'retail-ransomware', objectives: 'Sprawdzić decyzje DG0–DG4: kwalifikację, izolację, tryby awaryjne, RODO, okup, komunikację i terminy zgłoszeń.',
  criteria: 'DG0 w 15 min, DG1 w 60 min, ocena RODO w 24 h, polecenie dla drogerii w 1 h', participants: 'Zarząd, ZZK, CISO, Dyrektor IT, operacje sklepowe, logistyka, IOD, dział prawny, komunikacja',
});
test('Test izolacji w EDR i NAC (laboratorium)', 'technical', 35, ['IN-INF-2.1', 'IN-INF-2.2', 'IN-INF-2.3', 'IN-INF-2.4'], {
  objectives: 'Zmierzyć czas izolacji hostów, urządzeń bez EDR i kont oraz skuteczność weryfikacji.', criteria: 'Izolacja 20 hostów w ≤ 15 min, weryfikacja bez nieskutecznych pozycji', participants: 'SOC, zespół sieci, administratorzy AD', targetRto: 0.25,
});
test('Odtworzenie lasu AD z kopii w IRE', 'technical', 49, ['IN-AD-4.1', 'IN-AD-5.1', 'IN-AD-5.2', 'CL-AD-4'], {
  objectives: 'Zmierzyć rzeczywisty czas odtworzenia tożsamości po ransomware – kluczowe wąskie gardło z analizy luk.', criteria: 'Las AD odtworzony i zweryfikowany w ≤ 24 h', participants: 'Administratorzy AD, zespół kopii, SOC, zewnętrzny zespół IR', targetRto: 24, targetRpo: 1,
});
test('Weryfikacja czystości i test odtworzenia kopii', 'technical', 56, ['IN-BKP-1.1', 'IN-BKP-5.1', 'CL-BKP-5'], {
  objectives: 'Potwierdzić niezmienność repozytoriów, skan punktów przywracania i odtworzenie systemu krytycznego.', criteria: 'Odtworzenie ERP w ≤ RTO, 0 wykryć w skanie', participants: 'Zespół kopii, zespół ERP, SOC', targetRto: 48, targetRpo: 24,
});
test('Odtworzenie udziałów plikowych z migawek', 'technical', 63, ['IN-NAS-2.1', 'IN-NAS-3.1', 'IN-NAS-4.1', 'CL-NAS-4'], {
  objectives: 'Sprawdzić zatrzymanie sesji, odtworzenie danych i uprawnień oraz weryfikację integralności.', criteria: 'Udział testowy odtworzony z uprawnieniami w ≤ 4 h', participants: 'Zespół pamięci masowej, SOC', targetRto: 4,
});
test('Odtworzenie bazy i aplikacji sklepu internetowego', 'technical', 77, ['IN-APP-3.1', 'IN-APP-3.2', 'IN-APP-4.1', 'CL-APP-5'], {
  objectives: 'Odtworzyć e-commerce w IRE z nowymi sekretami i przejść bramkę DG5.', criteria: 'RTO ≤ 24 h, RPO ≤ 30 min, CL-APP-5 bez odstępstw', participants: 'Zespół e-commerce, DBA, SOC', targetRto: 24, targetRpo: 0.5,
});
test('Tryb ręczny centrum dystrybucyjnego i testy integracji WMS', 'walk', 84, ['CL-WMS-1', 'IN-WMS-4.1', 'CL-WMS-4'], {
  objectives: 'Sprawdzić decyzję o trybie ręcznym, uzgodnienie stanów i integracje WMS po odtworzeniu.', criteria: 'Wydanie 20 palet priorytetowych w trybie ręcznym w 8 h; integracje bez duplikatów', participants: 'Kierownicy zmian CD Łódź, planowanie dostaw, zespół systemów logistycznych, dostawca WMS',
});
test('Odtworzenie stanowisk POS w drogeriach pilotażowych', 'technical', 98, ['IN-POS-3.1', 'IN-POS-3.2', 'IN-POS-4.1', 'CL-POS-4'], {
  objectives: 'Odtworzyć stanowiska ze złotego obrazu i przejść testy funkcjonalne w 3 drogeriach.', criteria: 'Stanowisko odtworzone i dopuszczone w ≤ 2 h', participants: 'Zespół systemów sklepowych, serwis POS, kierownicy 3 drogerii', targetRto: 2,
});
// Przegląd dokumentacji – kroki z checklisty przeglądu zamiast pełnych procedur.
const review = s.tests[0];
review.steps = [
  ['Koordynator BCM', 'Sprawdź aktualność ról i kontaktów w polityce i planach (kanał pozapasmowy, listy offline).'],
  ['CISO', 'Zweryfikuj kryteria kategorii K1–K4 i bramki DG0–DG6.'],
  ['Dyrektor IT', 'Zastąp założenia technologiczne w systemach faktycznym inwentarzem; popraw instrukcje dla innych produktów.'],
  ['Właściciele procesów', 'Zatwierdź MTPD, RTO, RPO, MBCO i tryby awaryjne.'],
  ['Inspektor ochrony danych', 'Zweryfikuj ścieżkę oceny naruszeń RODO i rejestr naruszeń.'],
  ['Dział prawny / compliance', 'Rozstrzygnij status wobec NIS2/KSC i obowiązki PCI DSS; zaktualizuj obowiązki raportowe.'],
  ['Koordynator BCM', 'Przygotuj politykę do zatwierdzenia przez Zarząd i plan dalszych testów.'],
].map(([who, text], i) => ({ id: uid(), group: 'Przegląd dokumentacji', text, cmd: '', who, status: '', note: '', at: null }));

// ── zapis
mkdirSync('examples/rossmann', { recursive: true });
writeFileSync('examples/rossmann-ransomware.json', JSON.stringify(s, null, 2));
writeFileSync('examples/rossmann/dokumentacja.md', bundleMarkdown(s));

const gp = gaps(s);
const c = compliance(s);
const report = [
  '# Rossmann Polska – plan na wypadek ataku ransomware', '',
  `Projekt z ${BASE}. Przygotowany na podstawie źródeł publicznych w BCM Studio. Do importu: \`examples/rossmann-ransomware.json\` (Ustawienia → Gotowe projekty).`, '',
  '## Kontekst organizacji (OSINT) i założenia', '', s.org.notes, '',
  '## Analiza luk RTO/RPO (wymagane przez procesy vs osiągalne – założenia)', '',
  '| Luka | Proces | System | Wymagane | Osiągalne |', '|---|---|---|---|---|',
  ...gp.map(g => `| ${g.kind} | ${g.process.name} | ${g.system.name}${g.direct ? '' : ' (zależność)'} | ${fmtH(g.need)} | ${fmtH(g.have)} |`), '',
  'Najważniejszy wniosek: kasy, sklep internetowy i WMS zależą od tożsamości (AD/Entra ID), której odtworzenie po ransomware trwa realnie 1–3 doby. Trzeba potwierdzić, czy kasy pracują offline niezależnie od AD i centrali, oraz skrócić czas odtworzenia tożsamości (gotowy plan odtworzenia lasu AD, izolowane kopie, ćwiczenia).', '',
  '## Macierz dokumentów', '',
  `| Typ | ${Object.values(COLS).map(c => c.name).join(' | ')} |`, `|---|${Object.keys(COLS).map(() => '---').join('|')}|`,
  ...MATRIX_ROWS.map(([k, l]) => `| ${l} | ${Object.keys(COLS).map(c => s.documents.filter(d => (k === 'policy' ? d.type === 'policy' && c === 'INF' : d.col === c && (d.kind || d.type) === k)).map(d => d.title).join('<br>') || (k === 'policy' ? '' : '–')).join(' | ')} |`), '',
  '## Program testów', '', '| Data | Test | Rodzaj |', '|---|---|---|', ...s.tests.map(t => `| ${t.date} | ${t.name} | ${t.type} |`), '',
  `## Pokrycie wymagań (projekt): ${c.score}%`, '', ...c.perFw.map(f => `- ${f.fw.name}: ${f.score}%`), '',
  'Pokrycie wzrośnie po zatwierdzeniu dokumentów i przeprowadzeniu testów.', '',
  '## Normy i metodyki', '', 'Dokumenty są zgodne z ISO 22301:2019, ISO/IEC 27001:2022 (A.5.24–A.5.30, A.8.7, A.8.13, A.8.15, A.8.16, A.8.20, A.8.22), ISO/IEC 27031, ISO/IEC 27035-1:2023, ISO/IEC 27037, NIST CSF 2.0 (profil ransomware NIST IR 8374), NIST SP 800-61 Rev. 3, NIST SP 800-184, NIST SP 800-34 Rev. 1, CISA #StopRansomware Guide oraz przewodnikiem Microsoft dotyczącym odtwarzania lasu AD. Mapowanie każdego dokumentu na wymagania jest w aplikacji (moduł Zgodność) i na końcu każdego dokumentu.', '',
  '## Źródła', '',
  '- https://fashionbiznes.pl/rekordowe-wyniki-sieci-rossmann-2024/',
  '- https://www.bankier.pl/wiadomosc/Rekordowy-rok-Rossmanna-w-Polsce-Obroty-przerosly-oczekiwania-8879935.html',
  '- https://www.wiadomoscikosmetyczne.pl/dystrybucja-kosmetykow/sieci-drogeryjne/rossmann-jest-nie-do-zatrzymania-w-tym-roku-siec-przekroczy-2-tys-placowek-polsce-2526672',
  '- https://www.wiadomoscihandlowe.pl/handel-i-dystrybucja/drogerie-i-apteki/rossmann-wyda-pol-miliarda-zl-na-najwieksza-inwestycje-w-polsce-2538326',
  '- https://retail-optimiser.de/en/rossmann-automates-logistics-centre-in-poland-with-koerber/',
  '- https://www.wiadomoscikosmetyczne.pl/dystrybucja-kosmetykow/hurtownie-kosmetyczne/rossmann-logistycznie-rosnie-w-sile-kolejny-magazyn-sieci-wiekszy-o-tysiace-metrow-2446378',
  '- https://spidersweb.pl/2025/04/rosmann-pl-aplikacja-nowosci.html',
  '- https://apps.apple.com/app/id791525539',
  '- https://www.wiadomoscikosmetyczne.pl/dystrybucja-kosmetykow/sieci-drogeryjne/rossmann-ostrzega-strzez-sie-oszustow-oferujacych-karty-podarunkowe-2521951',
  '- https://www.blackfog.com/marks-and-spencer-ransomware-attack/',
  '- https://amp.rte.ie/amp/1510480',
  '- https://spidersweb.pl/2026/08/atak-na-zabke-hakerzy.html',
].join('\n');
writeFileSync('examples/rossmann/README.md', report);
console.log(`dokumenty: ${s.documents.length}, testy: ${s.tests.length}, luki: ${gp.length}, zgodność: ${c.score}%`);
