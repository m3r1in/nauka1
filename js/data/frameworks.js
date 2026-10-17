// Katalog standardów i aktów prawnych z wymaganiami (parafrazy, nie cytaty norm).
// evidence: 'doc' – wystarczy dokument, 'test' – wymaga przeprowadzonego testu, 'bia' – wymaga BIA.

export const FRAMEWORKS = [
  {
    id: 'iso22301', name: 'ISO 22301:2019', kind: 'standard',
    title: 'Systemy zarządzania ciągłością działania (BCMS)',
    reqs: [
      ['4.1', 'Kontekst organizacji – czynniki wewnętrzne i zewnętrzne wpływające na ciągłość działania'],
      ['4.2', 'Strony zainteresowane oraz wymagania prawne i regulacyjne'],
      ['4.3', 'Zakres systemu zarządzania ciągłością działania'],
      ['5.2', 'Polityka ciągłości działania zatwierdzona przez najwyższe kierownictwo'],
      ['5.3', 'Role, odpowiedzialności i uprawnienia'],
      ['6.2', 'Cele ciągłości działania i plany ich osiągnięcia'],
      ['7.2', 'Kompetencje i szkolenia osób zaangażowanych'],
      ['7.4', 'Komunikacja wewnętrzna i zewnętrzna'],
      ['7.5', 'Udokumentowane informacje – nadzór, wersjonowanie, dostępność'],
      ['8.2.2', 'Analiza wpływu na działalność (BIA): priorytety, MTPD, RTO, RPO, zasoby', 'bia'],
      ['8.2.3', 'Ocena ryzyka zakłóceń'],
      ['8.3', 'Strategie i rozwiązania ciągłości działania'],
      ['8.4.2', 'Struktura reagowania – zespoły, aktywacja, eskalacja'],
      ['8.4.3', 'Ostrzeganie i komunikacja w czasie zakłócenia'],
      ['8.4.4', 'Plany ciągłości działania'],
      ['8.4.5', 'Odtworzenie i powrót do normalnej działalności'],
      ['8.5', 'Program ćwiczeń i testów', 'test'],
      ['8.6', 'Ocena dokumentacji i zdolności ciągłości działania'],
      ['9.2', 'Audyt wewnętrzny'],
      ['9.3', 'Przegląd zarządzania'],
      ['10.1', 'Niezgodności i działania korygujące'],
    ],
  },
  {
    id: 'iso27001', name: 'ISO/IEC 27001:2022', kind: 'standard',
    title: 'Systemy zarządzania bezpieczeństwem informacji – zabezpieczenia załącznika A',
    reqs: [
      ['A.5.24', 'Planowanie i przygotowanie zarządzania incydentami'],
      ['A.5.25', 'Ocena zdarzeń i decyzja o kwalifikacji jako incydent'],
      ['A.5.26', 'Reagowanie na incydenty zgodnie z udokumentowanymi procedurami'],
      ['A.5.27', 'Wyciąganie wniosków z incydentów'],
      ['A.5.28', 'Gromadzenie i zabezpieczanie dowodów'],
      ['A.5.29', 'Bezpieczeństwo informacji podczas zakłóceń'],
      ['A.5.30', 'Gotowość ICT na potrzeby ciągłości działania', 'test'],
      ['A.5.37', 'Udokumentowane procedury eksploatacyjne'],
      ['A.6.8', 'Zgłaszanie zdarzeń bezpieczeństwa informacji'],
      ['A.8.13', 'Kopie zapasowe informacji – wykonywanie i testowanie'],
      ['A.8.14', 'Redundancja środków przetwarzania informacji'],
    ],
  },
  {
    id: 'iso27031', name: 'ISO/IEC 27031', kind: 'standard',
    title: 'Gotowość ICT do zapewnienia ciągłości działania (IRBC)',
    reqs: [
      ['IRBC-1', 'Program gotowości ICT powiązany z wymaganiami BCM'],
      ['IRBC-2', 'Strategie odtwarzania ICT wynikające z RTO/RPO'],
      ['IRBC-3', 'Plany odtwarzania usług ICT'],
      ['IRBC-4', 'Testowanie i ćwiczenia gotowości ICT', 'test'],
    ],
  },
  {
    id: 'iso27035', name: 'ISO/IEC 27035', kind: 'standard',
    title: 'Zarządzanie incydentami bezpieczeństwa informacji',
    reqs: [
      ['PLAN', 'Planowanie i przygotowanie: polityka, plan, zespół'],
      ['DETECT', 'Wykrywanie i zgłaszanie zdarzeń'],
      ['ASSESS', 'Ocena i decyzja (klasyfikacja, priorytet)'],
      ['RESPOND', 'Reagowanie: ograniczanie, usuwanie, odtwarzanie'],
      ['LEARN', 'Wnioski i doskonalenie'],
    ],
  },
  {
    id: 'nist34', name: 'NIST SP 800-34 Rev. 1', kind: 'standard',
    title: 'Planowanie awaryjne dla systemów informacyjnych',
    reqs: [
      ['1', 'Polityka planowania awaryjnego'],
      ['2', 'Analiza wpływu na działalność (BIA)', 'bia'],
      ['3', 'Środki zapobiegawcze'],
      ['4', 'Strategie odtwarzania'],
      ['5', 'Plan awaryjny systemu (ISCP/DRP)'],
      ['6', 'Testy, szkolenia i ćwiczenia', 'test'],
      ['7', 'Utrzymanie planu'],
    ],
  },
  {
    id: 'nist61', name: 'NIST SP 800-61 Rev. 3 / CSF 2.0', kind: 'standard',
    title: 'Reagowanie na incydenty w ujęciu CSF 2.0',
    reqs: [
      ['GV.PO', 'Polityka zarządzania ryzykiem i reagowania'],
      ['DE.AE', 'Analiza zdarzeń niepożądanych'],
      ['RS.MA', 'Zarządzanie incydentem'],
      ['RS.AN', 'Analiza incydentu'],
      ['RS.CO', 'Raportowanie i komunikacja w reagowaniu'],
      ['RS.MI', 'Łagodzenie skutków incydentu'],
      ['RC.RP', 'Realizacja planu odtworzenia'],
      ['RC.CO', 'Komunikacja w trakcie odtwarzania'],
      ['ID.IM', 'Doskonalenie na podstawie wniosków i testów', 'test'],
    ],
  },
  {
    id: 'pci', name: 'PCI DSS v4.0.1', kind: 'standard',
    title: 'Bezpieczeństwo danych kart płatniczych – reagowanie na incydenty',
    reqs: [
      ['12.10.1', 'Plan reagowania na incydenty gotowy do natychmiastowej aktywacji'],
      ['12.10.2', 'Przegląd i test planu co najmniej raz w roku', 'test'],
      ['12.10.3', 'Wyznaczony personel dostępny 24/7'],
      ['12.10.4', 'Szkolenie personelu reagującego na incydenty'],
      ['12.10.5', 'Reagowanie na alerty systemów monitorowania bezpieczeństwa'],
      ['12.10.6', 'Aktualizacja planu na podstawie wniosków i zmian w branży'],
      ['10.7.2', 'Wykrywanie awarii krytycznych zabezpieczeń i reagowanie na nie'],
    ],
  },
  {
    id: 'nis2', name: 'NIS2 – dyrektywa (UE) 2022/2555', kind: 'law',
    title: 'Środki zarządzania ryzykiem w cyberbezpieczeństwie i obowiązki raportowe',
    reqs: [
      ['art. 20', 'Organ zarządzający zatwierdza środki, nadzoruje ich wdrożenie i odbywa szkolenia'],
      ['art. 21(2)(b)', 'Obsługa incydentów'],
      ['art. 21(2)(c)', 'Ciągłość działania: kopie zapasowe, odtwarzanie po awarii, zarządzanie kryzysowe'],
      ['art. 21(2)(d)', 'Bezpieczeństwo łańcucha dostaw'],
      ['art. 21(2)(f)', 'Ocena skuteczności środków zarządzania ryzykiem', 'test'],
      ['art. 21(2)(g)', 'Cyberhigiena i szkolenia'],
      ['art. 23', 'Zgłaszanie poważnych incydentów: 24 h / 72 h / 1 miesiąc'],
    ],
  },
  {
    id: 'ksc', name: 'Ustawa o KSC', kind: 'law',
    title: 'Ustawa o krajowym systemie cyberbezpieczeństwa (w brzmieniu wdrażającym NIS2) – zweryfikuj aktualny stan prawny i numerację przepisów',
    reqs: [
      ['KSC-SZBI', 'System zarządzania bezpieczeństwem i dokumentacja cyberbezpieczeństwa'],
      ['KSC-OBS', 'Obsługa incydentów'],
      ['KSC-ZGL', 'Zgłaszanie incydentów do właściwego CSIRT (NASK / GOV / MON)'],
      ['KSC-CD', 'Zapewnienie ciągłości działania i odtwarzania usług'],
    ],
  },
  {
    id: 'dora', name: 'DORA – rozporządzenie (UE) 2022/2554', kind: 'law',
    title: 'Operacyjna odporność cyfrowa sektora finansowego',
    reqs: [
      ['art. 5', 'Odpowiedzialność organu zarządzającego za ryzyko ICT'],
      ['art. 6', 'Udokumentowane ramy zarządzania ryzykiem ICT'],
      ['art. 11(1)', 'Polityka ciągłości działania ICT'],
      ['art. 11(3)', 'Plany reagowania i odtwarzania ICT'],
      ['art. 11(6)', 'Testowanie planów ciągłości ICT co najmniej raz w roku', 'test'],
      ['art. 12', 'Polityki kopii zapasowych, procedury odtwarzania i metody przywracania'],
      ['art. 14', 'Komunikacja w czasie incydentu'],
      ['art. 17', 'Proces zarządzania incydentami ICT'],
      ['art. 18', 'Klasyfikacja incydentów ICT'],
      ['art. 19', 'Zgłaszanie poważnych incydentów ICT'],
      ['art. 24', 'Program testowania operacyjnej odporności cyfrowej', 'test'],
      ['art. 28', 'Ryzyko ze strony zewnętrznych dostawców ICT, strategie wyjścia'],
    ],
  },
  {
    id: 'rodo', name: 'RODO – rozporządzenie (UE) 2016/679', kind: 'law',
    title: 'Ochrona danych osobowych – dostępność i naruszenia',
    reqs: [
      ['art. 32(1)(c)', 'Zdolność do szybkiego przywrócenia dostępności danych po incydencie'],
      ['art. 32(1)(d)', 'Regularne testowanie i ocena skuteczności środków', 'test'],
      ['art. 33', 'Zgłoszenie naruszenia do UODO w ciągu 72 h'],
      ['art. 33(5)', 'Dokumentowanie wszystkich naruszeń'],
      ['art. 34', 'Zawiadomienie osób, których dane dotyczą'],
    ],
  },
];

export const reqId = (fw, code) => `${fw}:${code}`;

export const REQUIREMENTS = FRAMEWORKS.flatMap(f =>
  f.reqs.map(([code, text, evidence]) => ({
    id: reqId(f.id, code), fw: f.id, fwName: f.name, code, text, evidence: evidence || 'doc',
  })));

export const REQ_BY_ID = Object.fromEntries(REQUIREMENTS.map(r => [r.id, r]));
export const FW_BY_ID = Object.fromEntries(FRAMEWORKS.map(f => [f.id, f]));

// Terminy raportowe (godziny od punktu odniesienia). Uproszczenie – zawsze weryfikuj z aktualnymi przepisami i RTS.
export const REPORTING = {
  nis2: {
    name: 'NIS2 / KSC – poważny incydent', to: 'CSIRT właściwy / organ właściwy',
    items: [
      { label: 'Wczesne ostrzeżenie', from: 'detect', h: 24 },
      { label: 'Zgłoszenie incydentu', from: 'detect', h: 72 },
      { label: 'Sprawozdanie końcowe', from: 'notify', months: 1, note: 'miesiąc od zgłoszenia incydentu' },
    ],
  },
  dora: {
    name: 'DORA – poważny incydent ICT', to: 'KNF',
    items: [
      { label: 'Zgłoszenie wstępne', from: 'dora-initial', note: '4 h od klasyfikacji jako poważny, nie później niż 24 h od wykrycia' },
      { label: 'Raport pośredni', from: 'initial', h: 72 },
      { label: 'Raport końcowy', from: 'intermediate', months: 1 },
    ],
  },
  rodo: {
    name: 'RODO – naruszenie ochrony danych', to: 'Prezes UODO',
    items: [
      { label: 'Zgłoszenie naruszenia', from: 'detect', h: 72, note: 'od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku' },
    ],
  },
};
