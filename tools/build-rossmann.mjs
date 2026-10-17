// Buduje projekt „Rossmann Polska – ransomware” dla BCM Studio.
// Uruchom: node tools/build-rossmann.mjs
// Wynik: examples/rossmann-ransomware.json (import do aplikacji) i examples/rossmann/*.md
import { writeFileSync, mkdirSync } from 'node:fs';
import {
  emptyState, generateStructure, createDoc, buildTestSteps, uid, addDays, today, byId, bundleMarkdown, docToMarkdown, gaps, fmtH, compliance,
} from '../js/logic.js';
import { EXERCISE_BY_ID } from '../js/data/exercises.js';

const s = emptyState();
const BASE = today();
s.banner = 'Projekt planu przygotowany na podstawie źródeł publicznych (OSINT). Warstwa techniczna to założenia – zweryfikuj z inwentarzem IT i właścicielami procesów przed zatwierdzeniem.';
s.org = {
  name: 'Rossmann Polska',
  sector: 'Handel detaliczny – sieć drogerii',
  frameworks: ['iso22301', 'iso27001', 'iso27035', 'nist61', 'pci', 'rodo', 'nis2', 'ksc'],
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
  sys('s-hr', 'Kadry i płace', 'Dział HR', ['mssql'], 72, 24, 'Kopia dzienna', 'Ośrodek zapasowy', ['s-ad']),
];

const imp = (fin, legal, rep, ops) => ({ fin, legal, rep, ops });
const proc = (id, name, owner, dept, criticality, mtpd, rto, rpo, mbco, systems, impacts) => ({ id, name, owner, dept, criticality, mtpd, rto, rpo, mbco, systems, impacts, notes: 'Wartości proponowane – do zatwierdzenia na warsztacie BIA.' });
s.processes = [
  proc('p-sales', 'Sprzedaż w drogeriach', 'Dyrektor operacji sklepowych', 'Operacje', 5, 4, 2, 0.25, 'Sprzedaż (gotówka i karty) w trybie offline w co najmniej 80% drogerii', ['s-pos', 's-pay', 's-net'], { h4: imp(3, 1, 3, 4), h24: imp(4, 2, 4, 4), h72: imp(4, 2, 4, 4), w1: imp(4, 3, 4, 4) }),
  proc('p-dist', 'Zaopatrzenie drogerii z centrów dystrybucyjnych', 'Dyrektor logistyki', 'Logistyka', 5, 72, 24, 4, 'Dostawy uzupełniające produktów o najwyższej rotacji do drogerii z najniższym zapasem', ['s-wms', 's-net'], { h4: imp(0, 0, 0, 1), h24: imp(2, 0, 1, 2), h72: imp(3, 1, 3, 4), w1: imp(4, 1, 4, 4) }),
  proc('p-buy', 'Zakupy i zarządzanie zapasami', 'Dyrektor handlowy', 'Handel', 4, 120, 48, 4, 'Zamówienia u kluczowych dostawców (ręcznie / EDI)', ['s-erp', 's-edi'], { h4: imp(0, 0, 0, 0), h24: imp(1, 0, 0, 1), h72: imp(2, 1, 1, 3), w1: imp(3, 1, 2, 4) }),
  proc('p-ecom', 'Sprzedaż internetowa i click & collect', 'Dyrektor e-commerce', 'E-commerce', 4, 48, 24, 0.5, 'Przyjmowanie i realizacja zamówień z odbiorem w drogerii', ['s-ecom'], { h4: imp(1, 0, 2, 1), h24: imp(2, 1, 3, 2), h72: imp(3, 1, 3, 3), w1: imp(3, 1, 4, 3) }),
  proc('p-loyal', 'Program lojalnościowy i aplikacja klienta', 'Dyrektor marketingu', 'Marketing', 3, 72, 48, 1, 'Identyfikacja członków Klubu i naliczanie rabatów (możliwe ręczne korekty)', ['s-crm', 's-ecom'], { h4: imp(1, 0, 1, 1), h24: imp(1, 1, 2, 2), h72: imp(2, 3, 3, 2), w1: imp(3, 3, 3, 3) }),
  proc('p-fin', 'Finanse i płatności do dostawców', 'Dyrektor finansowy', 'Finanse', 4, 168, 72, 24, 'Płatności krytyczne (wynagrodzenia, podatki, kluczowi dostawcy)', ['s-erp'], { h4: imp(0, 0, 0, 0), h24: imp(0, 0, 0, 0), h72: imp(1, 1, 1, 1), w1: imp(3, 3, 2, 2) }),
  proc('p-hr', 'Wynagrodzenia i kadry', 'Dyrektor HR', 'HR', 3, 240, 120, 24, 'Wypłata wynagrodzeń w terminie (również według listy z poprzedniego miesiąca)', ['s-hr'], { h4: imp(0, 0, 0, 0), h24: imp(0, 0, 0, 0), h72: imp(0, 1, 1, 1), w1: imp(1, 2, 2, 2) }),
  proc('p-comm', 'Komunikacja kryzysowa i obsługa klienta', 'Dyrektor komunikacji', 'Komunikacja', 5, 8, 4, 1, 'Kanał pozapasmowy zespołu kryzysowego, komunikaty do drogerii, klientów i mediów', ['s-m365'], { h4: imp(1, 1, 3, 3), h24: imp(2, 2, 4, 3), h72: imp(2, 2, 4, 3), w1: imp(2, 2, 4, 3) }),
];

// ── dokumentacja ogólna (polityki, plany, procedury, instrukcje technologiczne)
generateStructure(s);
const G = k => s.documents.find(d => d.genKey === k);
const sec = (d, title, content) => { const x = d.sections.find(y => y.title === title); if (x) x.content = content; };
const steps = list => list.map(([who, action, expected = '', group = '']) => ({ id: uid(), group, who, action, cmd: '', expected }));

sec(G('pol-bcm'), 'Cel i zakres', '{{org}} ustanawia system zarządzania ciągłością działania, aby chronić sprzedaż w sieci ok. 2000 drogerii, zaopatrzenie z centrów dystrybucyjnych, kanały cyfrowe i dane klientów.\n\nZakres: centrala w Łodzi, centra dystrybucyjne (Łódź, Pyskowice, Grudziądz, Zgierz, Dąbrówka Wielka), drogerie, sklep internetowy i aplikacja, program lojalnościowy oraz kluczowi dostawcy (płatności, transport, IT).');
const irp = G('plan-irp');
irp.sections.splice(1, 0, { id: uid(), title: 'Scenariusz wiodący: ransomware z kradzieżą danych', hint: 'Na podstawie OSINT i incydentów w handlu detalicznym.', content:
  'Największe ryzyko dla {{org}} to atak ransomware z podwójnym wymuszeniem, który jednocześnie:\n\n- zatrzymuje kasy lub odcina drogerie od centrali,\n- zatrzymuje WMS i automatykę centrów dystrybucyjnych (zapasy w drogeriach wystarczają na kilka dni),\n- wyłącza sklep internetowy i aplikację,\n- prowadzi do kradzieży danych członków programu lojalnościowego (milionowa skala) i pracowników.\n\nWnioski z ataków na Marks & Spencer i Co-op (2025): przestępcy wchodzą przez socjotechnikę wobec helpdesku i przejęcie kont, a skutki – ręczne zamówienia, puste półki, wstrzymana sprzedaż online – trwają tygodniami. Dlatego plan stawia na szybką izolację stref, kanał pozapasmowy, tryb offline drogerii i odtworzenie tożsamości jako pierwszego systemu.' });

const playbook = createDoc(s, 'proc-ransomware', { parentId: irp.id, owner: 'CISO' });
createDoc(s, 'proc-ransom-decision', { parentId: irp.id, owner: 'Prezes Zarządu' });
const rebuild = createDoc(s, 'proc-clean-rebuild', { parentId: G('plan-drp').id, owner: 'Dyrektor IT' });
const offline = createDoc(s, 'proc-store-offline', { parentId: G('plan-bcp').id, owner: 'Dyrektor operacji sklepowych', processes: ['p-sales'], title: 'Procedura pracy drogerii przy niedostępności systemów centralnych' });
const dc = createDoc(s, 'proc-dc-manual', { parentId: G('plan-bcp').id, owner: 'Dyrektor logistyki', processes: ['p-dist'] });

const checklist = (parent, title, owner, when, list, opts = {}) => {
  const d = createDoc(s, 'ins-checklist', { parentId: parent.id, title, owner, ...opts });
  sec(d, 'Kiedy używać', when);
  d.steps = steps(list);
  return d;
};

checklist(playbook, 'Checklista: pierwsza godzina – kierownik incydentu', 'CISO', 'Natychmiast po potwierdzeniu objawów ransomware.', [
  ['Kierownik incydentu', 'Zapisz czas wykrycia i numer incydentu; ustaw zegar raportowy w BCM Studio.', 'Czas wykrycia zapisany'],
  ['Kierownik incydentu', 'Przełącz komunikację zespołu na kanał pozapasmowy (telefony, grupa awaryjna poza M365).', 'Wszyscy członkowie potwierdzili'],
  ['Kierownik incydentu', 'Zwołaj zespół kryzysowy: Zarząd, CISO, Dyrektor IT, operacje sklepowe, logistyka, IOD, prawny, komunikacja.', 'Zespół zebrany w 30 min'],
  ['Kierownik incydentu', 'Zatwierdź izolację stref (checklista izolacji) i zapisz decyzję z godziną.', ''],
  ['Kierownik incydentu', 'Wyznacz osobę prowadzącą dziennik incydentu (decyzje, czasy, autorzy).', ''],
  ['Kierownik incydentu', 'Uruchom wsparcie zewnętrzne: zespół IR z umowy retainer, ubezpieczyciel cyber.', 'Potwierdzenie przyjęcia zlecenia'],
  ['Kierownik incydentu', 'Polecenie dla drogerii: przejście w tryb awaryjny zgodnie z procedurą pracy offline.', ''],
  ['Kierownik incydentu', 'Wstrzymaj zmiany i wdrożenia w całej organizacji do odwołania.', ''],
]);
checklist(playbook, 'Checklista: izolacja sieci i tożsamości (SOC / NOC)', 'Kierownik SOC', 'Po decyzji o izolacji lub samodzielnie, gdy szyfrowanie trwa.', [
  ['NOC', 'Zablokuj ruch między strefami: drogerie ↔ centrala ↔ centra dystrybucyjne ↔ ośrodek zapasowy.', 'Reguły aktywne na zaporach', '1 · Sieć'],
  ['NOC', 'Ogranicz ruch wychodzący do internetu ze stref serwerowych (przerwanie eksfiltracji i C2).', '', '1 · Sieć'],
  ['NOC', 'Wyłącz dostęp VPN dla wszystkich poza zespołem IR; zablokuj dostęp zdalny dostawców.', '', '1 · Sieć'],
  ['NOC', 'Zachowaj łącza terminali płatniczych, jeśli nie są objęte incydentem.', 'Płatności kartowe działają', '1 · Sieć'],
  ['SOC', 'Odizoluj w EDR hosty z objawami szyfrowania lub zdalnego wykonywania poleceń.', '', '2 · Hosty'],
  ['SOC', 'Zablokuj wykonywanie znanych narzędzi atakujących (PsExec, rclone, AnyDesk) politykami EDR.', '', '2 · Hosty'],
  ['Administrator tożsamości', 'Wyłącz konta podejrzane o przejęcie i unieważnij ich sesje w chmurze.', '', '3 · Tożsamość'],
  ['Administrator tożsamości', 'Zmień hasła kont break-glass i kont serwisowych kopii zapasowych; przechowuj je offline.', '', '3 · Tożsamość'],
  ['Administrator tożsamości', 'Zablokuj helpdeskowi reset haseł i MFA bez weryfikacji tożsamości przez przełożonego.', 'Komunikat do helpdesku', '3 · Tożsamość'],
  ['Administrator kopii', 'Odłącz repozytoria kopii od domeny i sieci produkcyjnej; potwierdź kopie niezmienne.', 'Lista dostępnych punktów odtworzenia', '4 · Kopie'],
], { systems: ['s-net', 's-ad', 's-backup'] });
checklist(playbook, 'Checklista: ocena naruszenia RODO przy kradzieży danych', 'Inspektor Ochrony Danych', 'Gdy istnieje podejrzenie, że atakujący skopiowali dane (wpis na stronie wycieków, ruch wychodzący, deklaracja przestępców).', [
  ['IOD', 'Zapisz moment stwierdzenia naruszenia – od niego liczy się 72 h na zgłoszenie do UODO.', ''],
  ['IOD', 'Ustal zbiory, których mogło dotyczyć naruszenie: Klub Rossmanna, zamówienia online, pracownicy, kandydaci.', 'Lista zbiorów'],
  ['IOD', 'Ustal kategorie danych i liczbę osób (szacunek, jeśli brak pewności) – także dane szczególnych kategorii wynikające z historii zakupów.', ''],
  ['IOD', 'Oceń ryzyko dla osób: phishing podszywający się pod markę, kradzież tożsamości, utrata poufności.', 'Ocena ryzyka udokumentowana'],
  ['IOD', 'Przygotuj zgłoszenie do UODO; przy braku pełnych informacji zgłoś etapami.', 'Potwierdzenie zgłoszenia'],
  ['Komunikacja', 'Przy wysokim ryzyku przygotuj zawiadomienie klientów i ostrzeżenie przed fałszywymi wiadomościami.', ''],
  ['IOD', 'Wpisz naruszenie do rejestru naruszeń.', 'Wpis w rejestrze'],
], { processes: ['p-loyal', 'p-ecom'] });
checklist(G('plan-comm'), 'Checklista: komunikacja w pierwszych 24 h', 'Dyrektor komunikacji', 'Od aktywacji zespołu kryzysowego.', [
  ['Komunikacja', 'Wyślij krótki komunikat do kierowników regionów i drogerii (SMS): co się dzieje, co robić, kiedy kolejna informacja.', 'Potwierdzenia odbioru'],
  ['Komunikacja', 'Przygotuj komunikat dla pracowników: nie logować się do systemów na prośbę z nieznanych źródeł, zgłaszać podejrzane telefony.', ''],
  ['Komunikacja', 'Opublikuj komunikat dla klientów (strona, media społecznościowe) zatwierdzony przez zespół kryzysowy.', 'Komunikat zatwierdzony'],
  ['Komunikacja', 'Przygotuj odpowiedzi dla infolinii i moderatorów mediów społecznościowych.', ''],
  ['Komunikacja', 'Wyznacz rzecznika; nikt inny nie wypowiada się w mediach.', ''],
  ['Komunikacja', 'Poinformuj kluczowych dostawców i przewoźników o trybie awaryjnym zamówień i dostaw.', ''],
  ['Komunikacja', 'Prowadź dziennik komunikatów (treść, kanał, godzina, zatwierdzający).', ''],
], { processes: ['p-comm'] });
checklist(offline, 'Checklista kierownika drogerii: systemy niedostępne', 'Dyrektor operacji sklepowych', 'Gdy kasy nie łączą się z centralą, pojawia się notatka okupu lub kierownik regionu ogłasza tryb awaryjny.', [
  ['Kierownik drogerii', 'Nie wyłączaj i nie restartuj urządzeń z notatką okupu – sfotografuj ekran i zgłoś na infolinię IT.', ''],
  ['Kierownik drogerii', 'Odłącz od sieci komputer na zapleczu, jeśli widać na nim szyfrowanie plików.', ''],
  ['Kierownik drogerii', 'Sprawdź, czy kasy sprzedają w trybie offline i czy terminale autoryzują karty.', ''],
  ['Kierownik drogerii', 'Jeśli karty nie działają – przyjmuj gotówkę i wywieś informację przy wejściu.', 'Informacja wywieszona'],
  ['Kierownik drogerii', 'Wstrzymaj zwroty, karty podarunkowe i rabaty Klubu do odwołania.', ''],
  ['Kierownik drogerii', 'Zapisuj braki towaru i zdarzenia w rejestrze papierowym; raportuj kierownikowi regionu co 4 h.', ''],
  ['Kierownik drogerii', 'Nie wykonuj poleceń IT przekazanych przez nieznane osoby (telefon, e-mail) – weryfikuj u kierownika regionu.', ''],
  ['Kierownik drogerii', 'Zamknij drogerię tylko na polecenie kierownika regionu lub gdy nie można wystawiać paragonów.', ''],
], { processes: ['p-sales'], systems: ['s-pos'] });
checklist(dc, 'Checklista kierownika zmiany centrum dystrybucyjnego', 'Dyrektor logistyki', 'Gdy WMS lub automatyka są niedostępne albo odcięte.', [
  ['Kierownik zmiany', 'Zatrzymaj automatykę w stanie bezpiecznym zgodnie z instrukcją dostawcy; zabezpiecz strefy.', ''],
  ['Kierownik zmiany', 'Pobierz od planowania papierowe listy priorytetowych dostaw (z ostatniej czystej kopii).', ''],
  ['Kierownik zmiany', 'Zorganizuj ręczną kompletację z kontrolą drugiej osoby; oznaczaj palety ręcznie.', ''],
  ['Kierownik zmiany', 'Prowadź papierowy rejestr wydań (drogeria, paleta, godzina, kierowca).', 'Rejestr kompletny'],
  ['Kierownik zmiany', 'Uzgadniaj telefonicznie z przewoźnikami okna ramp i kursy.', ''],
], { processes: ['p-dist'], systems: ['s-wms'] });
checklist(rebuild, 'Checklista: odtworzenie tożsamości (AD / Entra ID) po ransomware', 'Dyrektor IT', 'Po decyzji o odtworzeniu i wyborze czystego punktu odtworzenia.', [
  ['Administrator tożsamości', 'Przygotuj odizolowaną sieć odtworzeniową i nowe stacje administracyjne (PAW).', ''],
  ['Administrator tożsamości', 'Odtwórz po jednym kontrolerze domeny na każdą domenę z kopii sprzed najwcześniejszego śladu atakującego.', 'DC uruchomiony w izolacji'],
  ['Administrator tożsamości', 'Przejmij role FSMO, oczyść metadane pozostałych DC.', ''],
  ['Administrator tożsamości', 'Zresetuj hasło KRBTGT dwukrotnie oraz hasła wszystkich kont uprzywilejowanych i serwisowych.', ''],
  ['Administrator tożsamości', 'Usuń nieznane konta, członkostwa w grupach uprzywilejowanych, zadania i GPO dodane przez atakującego.', 'Raport zmian porównany z kopią referencyjną'],
  ['Administrator tożsamości', 'Zweryfikuj konfigurację synchronizacji z Entra ID i aplikacje z uprawnieniami w chmurze.', ''],
  ['Administrator tożsamości', 'Odbuduj pozostałe DC od zera (nie z kopii) i włącz replikację.', 'repadmin /replsummary bez błędów'],
], { systems: ['s-ad'] });

// wszystkie dokumenty to projekt do zatwierdzenia
for (const d of s.documents) {
  d.status = 'draft';
  if (!d.owner) d.owner = { policy: 'Zarząd', plan: 'Koordynator BCM', procedure: 'Koordynator BCM', instruction: 'Właściciel systemu' }[d.type];
}

// ── program testów
const test = (name, type, days, docIds, extra = {}) => {
  const t = {
    id: uid(), name, type, date: addDays(BASE, days), status: 'planned', docIds, exerciseId: '', objectives: '', criteria: '', participants: '',
    targetRto: '', targetRpo: '', startedAt: null, endedAt: null, actualRto: '', actualRpo: '', rating: '', notes: '', findings: [], steps: [], ...extra,
  };
  t.steps = buildTestSteps(s, t.exerciseId ? { docIds: [] } : t, EXERCISE_BY_ID[t.exerciseId]);
  if (t.exerciseId) t.steps.push(...buildTestSteps(s, { docIds: t.docIds }, null).filter(x => /Checklista: pierwsza godzina/.test(x.group)));
  s.tests.push(t);
};
test('Przegląd dokumentacji ransomware z właścicielami procesów', 'review', 14, [playbook.id, offline.id, dc.id], {
  objectives: 'Potwierdzić role, kontakty, założenia techniczne i wartości RTO/RPO; zastąpić założenia faktami.', criteria: 'Wszystkie założenia oznaczone w systemach potwierdzone lub poprawione', participants: 'Koordynator BCM, CISO, Dyrektor IT, właściciele procesów',
});
test('Test drzewa powiadomień i kanału pozapasmowego', 'walk', 21, [G('ins-calltree').id], {
  objectives: 'Sprawdzić, czy zespół kryzysowy zbiera się bez poczty i Teams.', criteria: '90% osób osiągniętych w 30 min', participants: 'Zespół kryzysowy, kierownicy regionów', targetRto: 0.5,
});
test('Ćwiczenie sztabowe: ransomware w sieci drogerii', 'tabletop', 35, [playbook.id], {
  exerciseId: 'retail-ransomware', objectives: 'Sprawdzić decyzje zespołu kryzysowego: izolacja, tryb offline drogerii, RODO, okup, komunikacja, terminy zgłoszeń.',
  criteria: 'Decyzja o izolacji w 30 min; ocena RODO w 24 h; komunikat do drogerii w 1 h', participants: 'Zarząd, CISO, Dyrektor IT, operacje sklepowe, logistyka, IOD, prawny, komunikacja',
});
test('Przejście procedury pracy offline w 3 drogeriach pilotażowych', 'walk', 49, [offline.id], {
  objectives: 'Sprawdzić checklistę kierownika drogerii i czas działania kas offline.', criteria: 'Sprzedaż gotówkowa i kartowa offline przez 4 h bez błędów raportów dobowych', participants: 'Kierownicy 3 drogerii, kierownik regionu, zespół systemów sklepowych', targetRto: 2,
});
test('Odtworzenie AD z kopii niezmiennej w środowisku izolowanym', 'technical', 63, [rebuild.id], {
  objectives: 'Zmierzyć rzeczywisty czas odtworzenia tożsamości po ransomware.', criteria: 'Las AD odtworzony i zweryfikowany w ≤ 24 h', participants: 'Zespół infrastruktury, SOC', targetRto: 24, targetRpo: 1,
});
test('Test ręcznej obsługi centrum dystrybucyjnego bez WMS', 'walk', 77, [dc.id], {
  objectives: 'Sprawdzić kompletację i wydanie dostaw awaryjnych bez WMS.', criteria: 'Wydanie 20 palet priorytetowych w 8 h', participants: 'Kierownicy zmian CD Łódź, planowanie dostaw, transport',
});
test('Test odtworzenia sklepu internetowego i aplikacji', 'technical', 91, [G('rec:s-ecom:k8s').id, G('rec:s-ecom:postgres').id], {
  objectives: 'Odtworzyć e-commerce z kopii w czystym klastrze.', criteria: 'RTO ≤ 24 h, RPO ≤ 30 min', participants: 'Zespół e-commerce, SOC', targetRto: 24, targetRpo: 0.5,
});

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
  '## Dokumenty', '', ...s.documents.map(d => `- ${d.type === 'instruction' ? '    ' : d.type === 'procedure' ? '  ' : ''}${d.title}`), '',
  '## Program testów', '', '| Data | Test | Rodzaj |', '|---|---|---|', ...s.tests.map(t => `| ${t.date} | ${t.name} | ${t.type} |`), '',
  `## Pokrycie wymagań (projekt): ${c.score}%`, '', ...c.perFw.map(f => `- ${f.fw.name}: ${f.score}%`), '',
  'Pokrycie wzrośnie po zatwierdzeniu dokumentów i przeprowadzeniu testów.', '',
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
