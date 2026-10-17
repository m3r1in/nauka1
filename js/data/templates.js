// Szablony dokumentów. Sekcja: [tytuł, treść startowa, podpowiedź].
// Znaczniki w treści rozwijane na żywo z danych organizacji:
// {{org}} {{frameworks}} {{table:processes}} {{table:systems}} {{table:gaps}} {{table:order}} {{reporting}} {{children}}

export const DOC_TYPES = {
  policy:      { name: 'Polityka',   level: 1, short: 'POL', parents: [] },
  plan:        { name: 'Plan',       level: 2, short: 'PLN', parents: ['policy'] },
  procedure:   { name: 'Procedura',  level: 3, short: 'PRC', parents: ['plan', 'policy'] },
  instruction: { name: 'Instrukcja', level: 4, short: 'INS', parents: ['procedure', 'plan'] },
};

export const LAYERS = {
  biz:  { name: 'Biznesowa' },
  tech: { name: 'Techniczna' },
  both: { name: 'Biznesowo-techniczna' },
};

export const TEMPLATES = [
  // ───────── POLITYKI ─────────
  {
    id: 'pol-bcm', type: 'policy', layer: 'biz', name: 'Polityka zarządzania ciągłością działania',
    reqs: ['iso22301:4.3', 'iso22301:5.2', 'iso22301:5.3', 'iso22301:6.2', 'iso22301:7.5', 'iso27001:A.5.29', 'nist34:1', 'nis2:art. 20', 'nis2:art. 21(2)(c)', 'dora:art. 5', 'dora:art. 11(1)', 'ksc:KSC-CD'],
    sections: [
      ['Cel i zakres', '{{org}} ustanawia system zarządzania ciągłością działania, aby chronić procesy krytyczne, klientów i zgodność z prawem w razie zakłóceń.\n\nZakres obejmuje: procesy biznesowe wskazane w analizie BIA, wspierające je systemy ICT, lokalizacje oraz kluczowych dostawców.', 'Określ granice: jednostki, lokalizacje, produkty i usługi.'],
      ['Wymagania prawne i normatywne', 'Polityka uwzględnia wymagania:\n\n{{frameworks}}', 'Lista generuje się z ram wybranych w Ustawieniach.'],
      ['Zasady', '- Ciągłość działania jest odpowiedzialnością kierownictwa.\n- Priorytety odtwarzania wynikają z BIA i są zatwierdzane przez Zarząd.\n- Każdy proces krytyczny ma plan ciągłości, a każdy system krytyczny – plan i instrukcje odtworzenia.\n- Plany są testowane co najmniej raz w roku i po istotnych zmianach.\n- Wnioski z testów i incydentów prowadzą do działań korygujących.', ''],
      ['Role i odpowiedzialności', '| Rola | Odpowiedzialność |\n|---|---|\n| Zarząd | zatwierdza politykę, BIA i apetyt na ryzyko, nadzoruje wdrożenie |\n| Koordynator BCM | utrzymuje system, organizuje testy, raportuje do Zarządu |\n| Właściciele procesów | utrzymują plany ciągłości i instrukcje biznesowe |\n| Dyrektor IT | odpowiada za DRP i instrukcje techniczne |\n| Zespół kryzysowy | podejmuje decyzje w czasie zakłócenia |', ''],
      ['Cele ciągłości działania', '- 100% procesów krytycznych z zatwierdzonym BIA i planem.\n- Osiągalne RTO/RPO systemów zgodne z wymaganiami procesów.\n- Coroczny test każdego planu; luki zamknięte w terminie.', 'Cele powinny być mierzalne (ISO 22301 pkt 6.2).'],
      ['Architektura dokumentacji', 'Dokumentacja tworzy hierarchię:\n\n1. Polityki – zasady i odpowiedzialności.\n2. Plany – BCP, DRP, IRP, komunikacja kryzysowa.\n3. Procedury – kto, co i kiedy robi.\n4. Instrukcje – kroki techniczne i operacyjne dla konkretnych technologii i stanowisk.\n\n{{children}}', ''],
      ['Przegląd i zatwierdzenie', 'Polityka podlega przeglądowi co najmniej raz w roku oraz po istotnej zmianie organizacyjnej, technologicznej lub prawnej.', ''],
    ],
  },
  {
    id: 'pol-ir', type: 'policy', layer: 'both', name: 'Polityka zarządzania incydentami bezpieczeństwa',
    reqs: ['iso27001:A.5.24', 'iso27001:A.6.8', 'iso27035:PLAN', 'nist61:GV.PO', 'nis2:art. 21(2)(b)', 'dora:art. 17', 'ksc:KSC-OBS', 'ksc:KSC-SZBI'],
    sections: [
      ['Cel i zakres', 'Polityka określa zasady wykrywania, zgłaszania, oceny, obsługi i raportowania incydentów bezpieczeństwa w {{org}}.', ''],
      ['Definicje', '- **Zdarzenie** – zaobserwowana zmiana stanu systemu, usługi lub sieci.\n- **Incydent** – zdarzenie, które ma lub może mieć niekorzystny wpływ na poufność, integralność lub dostępność.\n- **Poważny incydent** – incydent spełniający progi regulacyjne (NIS2/KSC, DORA) lub wewnętrzne kryteria P1.', ''],
      ['Zasady', '- Każdy pracownik i dostawca ma obowiązek niezwłocznie zgłaszać zdarzenia.\n- Incydenty są klasyfikowane według jednolitej skali priorytetów.\n- Obowiązki raportowe do organów są realizowane w terminach ustawowych.\n- Dowody są zabezpieczane zgodnie z zasadami łańcucha dowodowego.\n- Po każdym incydencie P1/P2 przeprowadza się przegląd poincydentalny.', ''],
      ['Obowiązki raportowe', '{{reporting}}', ''],
      ['Role', '| Rola | Odpowiedzialność |\n|---|---|\n| Kierownik incydentu | koordynuje obsługę, decyduje o eskalacji |\n| Zespół reagowania (CSIRT/SOC) | analiza, ograniczanie, usuwanie skutków |\n| IOD | ocena naruszeń ochrony danych |\n| Compliance / prawnik | zgłoszenia do organów |\n| Komunikacja | komunikaty wewnętrzne i zewnętrzne |', ''],
      ['Dokumenty powiązane', '{{children}}', ''],
    ],
  },
  {
    id: 'pol-backup', type: 'policy', layer: 'both', name: 'Polityka kopii zapasowych i odtwarzania',
    reqs: ['iso27001:A.8.13', 'dora:art. 12', 'nis2:art. 21(2)(c)', 'rodo:art. 32(1)(c)'],
    sections: [
      ['Cel', 'Zapewnienie możliwości odtworzenia danych i systemów {{org}} w czasie i do punktu wymaganego przez BIA.', ''],
      ['Zasady', '- Reguła 3-2-1-1-0: 3 kopie, 2 rodzaje nośników, 1 poza siedzibą, 1 niezmienna lub odizolowana, 0 błędów weryfikacji.\n- Częstotliwość i retencja kopii wynikają z RPO systemu.\n- Kopie są szyfrowane; klucze przechowywane oddzielnie.\n- Odtwarzanie testuje się co najmniej raz na kwartał dla systemów krytycznych.\n- Dostęp do konsoli kopii wymaga MFA i oddzielnych kont.', ''],
      ['Wymagania dla systemów', '{{table:systems}}', ''],
      ['Dokumenty powiązane', '{{children}}', ''],
    ],
  },

  // ───────── PLANY ─────────
  {
    id: 'plan-bcp', type: 'plan', layer: 'biz', name: 'Plan ciągłości działania (BCP)',
    reqs: ['iso22301:8.3', 'iso22301:8.4.2', 'iso22301:8.4.4', 'iso22301:8.4.5', 'iso22301:8.2.2', 'nist34:2', 'nis2:art. 21(2)(c)', 'dora:art. 11(3)', 'iso27001:A.5.29'],
    sections: [
      ['Zakres i założenia', 'Plan obejmuje procesy krytyczne {{org}} i opisuje sposób ich kontynuacji na minimalnym akceptowalnym poziomie (MBCO) do czasu pełnego odtworzenia.', ''],
      ['Procesy krytyczne i cele odtworzenia (BIA)', '{{table:processes}}', 'Tabela pobiera dane z modułu Biznes (BIA).'],
      ['Scenariusze i strategie', '| Scenariusz | Strategia |\n|---|---|\n| Niedostępność lokalizacji | praca zdalna, lokalizacja zapasowa |\n| Niedostępność systemów IT | tryb manualny, DRP |\n| Niedostępność personelu | zastępstwa, macierz kompetencji |\n| Niedostępność dostawcy | dostawca alternatywny, zapasy, strategia wyjścia |', 'ISO 22301 pkt 8.3 – strategie dla ludzi, informacji, budynków, technologii i dostawców.'],
      ['Struktura reagowania', 'Zespół kryzysowy: przewodniczący (członek Zarządu), koordynator BCM, właściciele procesów krytycznych, IT, komunikacja, HR, prawnik.', ''],
      ['Aktywacja planu', 'Plan aktywuje przewodniczący zespołu kryzysowego lub jego zastępca, gdy przewidywany czas niedostępności procesu krytycznego przekracza 50% jego RTO albo gdy zachodzi zagrożenie życia lub zdrowia.', ''],
      ['Fazy działania', '1. **Reakcja** (0–4 h): ocena sytuacji, bezpieczeństwo ludzi, aktywacja, powiadomienia.\n2. **Kontynuacja**: uruchomienie trybu awaryjnego procesów zgodnie z instrukcjami.\n3. **Odtworzenie**: przywrócenie zasobów (DRP, dostawcy, lokalizacja).\n4. **Powrót**: przejście do trybu normalnego, uzgodnienie danych, przegląd.', ''],
      ['Procedury i instrukcje', '{{children}}', ''],
    ],
  },
  {
    id: 'plan-drp', type: 'plan', layer: 'tech', name: 'Plan odtwarzania po awarii (DRP)',
    reqs: ['iso27001:A.5.30', 'iso27001:A.8.14', 'iso27031:IRBC-1', 'iso27031:IRBC-2', 'iso27031:IRBC-3', 'nist34:4', 'nist34:5', 'nist61:RC.RP', 'dora:art. 11(3)', 'dora:art. 12', 'nis2:art. 21(2)(c)', 'rodo:art. 32(1)(c)', 'ksc:KSC-CD'],
    sections: [
      ['Zakres', 'Plan obejmuje systemy ICT wspierające procesy krytyczne {{org}}, infrastrukturę i usługi chmurowe.', ''],
      ['Systemy i zdolności odtworzeniowe', '{{table:systems}}', ''],
      ['Zgodność z wymaganiami biznesu', '{{table:gaps}}', 'Porównanie wymaganego RTO/RPO procesów z osiągalnym RTO/RPO systemów.'],
      ['Kolejność odtwarzania', '{{table:order}}', 'Kolejność wynika z zależności i priorytetu.'],
      ['Architektura odtworzeniowa', 'Opisz ośrodek zapasowy, replikację, kopie niezmienne, łącza i dostęp administracyjny w trybie awaryjnym (konta break-glass, dokumentacja offline).', ''],
      ['Zespół DR i aktywacja', 'Kierownik DR decyduje o przełączeniu na wniosek zespołu kryzysowego albo samodzielnie, gdy awaria techniczna wyklucza odtworzenie w miejscu w czasie RTO.', ''],
      ['Procedury i instrukcje odtworzeniowe', '{{children}}', ''],
    ],
  },
  {
    id: 'plan-irp', type: 'plan', layer: 'both', name: 'Plan reagowania na incydenty (IRP)',
    reqs: ['iso27001:A.5.24', 'iso27001:A.5.26', 'iso27001:A.5.28', 'iso27035:PLAN', 'iso27035:RESPOND', 'nist61:RS.MA', 'nist61:RS.AN', 'nist61:RS.MI', 'nis2:art. 21(2)(b)', 'nis2:art. 23', 'dora:art. 17', 'dora:art. 18', 'ksc:KSC-OBS', 'pci:12.10.1', 'pci:12.10.3', 'pci:12.10.6'],
    sections: [
      ['Zakres', 'Plan opisuje obsługę incydentów bezpieczeństwa w {{org}} od wykrycia do zamknięcia i przeglądu.', ''],
      ['Klasyfikacja i priorytety', '| Priorytet | Kryteria | Czas reakcji |\n|---|---|---|\n| P1 krytyczny | zatrzymanie procesu krytycznego, wyciek danych wrażliwych, ransomware, możliwy incydent poważny | 15 min, 24/7 |\n| P2 wysoki | degradacja procesu krytycznego, przejęcie konta uprzywilejowanego | 1 h |\n| P3 średni | incydent ograniczony do jednego systemu niekrytycznego | 4 h robocze |\n| P4 niski | zdarzenie bez wpływu | 2 dni robocze |', ''],
      ['Fazy obsługi', '1. Przygotowanie\n2. Wykrycie i analiza\n3. Ograniczenie (izolacja)\n4. Usunięcie przyczyny\n5. Odtworzenie\n6. Działania poincydentalne', 'Zgodne z ISO/IEC 27035 i NIST SP 800-61.'],
      ['Obowiązki raportowe', '{{reporting}}', ''],
      ['Zabezpieczanie dowodów', 'Dowody zbiera się przed działaniami naprawczymi, jeśli nie zagraża to bezpieczeństwu. Każdy dowód ma kartę z sumą SHA-256, czasem, osobą i miejscem przechowywania.', ''],
      ['Playbooki, procedury i instrukcje', '{{children}}', ''],
    ],
  },
  {
    id: 'plan-comm', type: 'plan', layer: 'biz', name: 'Plan komunikacji kryzysowej',
    reqs: ['iso22301:7.4', 'iso22301:8.4.3', 'nist61:RS.CO', 'nist61:RC.CO', 'dora:art. 14'],
    sections: [
      ['Cel', 'Zapewnienie spójnej, terminowej i zgodnej z prawem komunikacji {{org}} w czasie zakłócenia.', ''],
      ['Odbiorcy i kanały', '| Odbiorca | Kanał | Odpowiedzialny | Kiedy |\n|---|---|---|---|\n| Pracownicy | SMS, intranet | HR / komunikacja | do 1 h od aktywacji |\n| Klienci | strona www, e-mail | komunikacja | po decyzji zespołu kryzysowego |\n| Organy nadzoru | zgodnie z przepisami | compliance | terminy ustawowe |\n| Media | rzecznik | komunikacja | wyłącznie rzecznik |', ''],
      ['Zasady', '- Komunikaty zewnętrzne zatwierdza przewodniczący zespołu kryzysowego.\n- Kanały awaryjne nie zależą od infrastruktury, która może ulec awarii.\n- Dziennik komunikacji jest prowadzony na bieżąco.', ''],
      ['Szablony komunikatów', '{{children}}', ''],
    ],
  },

  // ───────── PROCEDURY ─────────
  {
    id: 'proc-activation', type: 'procedure', layer: 'biz', name: 'Procedura eskalacji i aktywacji planu',
    reqs: ['iso22301:8.4.2', 'iso22301:8.4.3'],
    sections: [
      ['Cel', 'Zapewnienie szybkiej oceny zakłócenia i decyzji o aktywacji planu ciągłości działania.', ''],
      ['Dokumenty powiązane', '{{children}}', ''],
    ],
    steps: [
      ['Każdy pracownik', 'Zgłoś zakłócenie dyżurowi IT lub przełożonemu (telefon, SMS).', 'Zgłoszenie przyjęte'],
      ['Dyżur / przełożony', 'Oceń wpływ na procesy krytyczne i przewidywany czas trwania.', 'Wstępna ocena w 30 min'],
      ['Koordynator BCM', 'Zwołaj zespół kryzysowy, jeśli zagrożony jest proces krytyczny.', 'Zespół zebrany'],
      ['Przewodniczący zespołu', 'Podejmij decyzję o aktywacji BCP/DRP/IRP i zapisz ją w dzienniku.', 'Decyzja z godziną'],
      ['Komunikacja', 'Powiadom pracowników i interesariuszy zgodnie z planem komunikacji.', ''],
    ],
  },
  {
    id: 'proc-incident', type: 'procedure', layer: 'both', name: 'Procedura obsługi i zgłaszania incydentu',
    reqs: ['iso27001:A.5.25', 'iso27001:A.5.26', 'iso27001:A.6.8', 'iso27035:DETECT', 'iso27035:ASSESS', 'nist61:DE.AE', 'nis2:art. 23', 'dora:art. 18', 'dora:art. 19', 'ksc:KSC-ZGL'],
    sections: [
      ['Cel', 'Jednolita obsługa incydentu od zgłoszenia do raportu dla organu.', ''],
      ['Terminy raportowe', '{{reporting}}', ''],
      ['Instrukcje', '{{children}}', ''],
    ],
    steps: [
      ['SOC / dyżur', 'Zarejestruj zdarzenie, nadaj numer i zapisz czas wykrycia.', 'Wpis w rejestrze incydentów'],
      ['SOC', 'Wykonaj triaż: czy to incydent? Nadaj priorytet P1–P4.', ''],
      ['Kierownik incydentu', 'Oceń, czy incydent spełnia kryteria poważnego (NIS2/KSC, DORA) lub naruszenia danych osobowych (RODO). Uruchom zegar raportowy.', 'Decyzja kwalifikacyjna z godziną'],
      ['Zespół reagowania', 'Zabezpiecz dowody i odizoluj zasoby zgodnie z instrukcjami technicznymi.', ''],
      ['Compliance', 'Wyślij wczesne ostrzeżenie / zgłoszenie wstępne w terminie.', 'Potwierdzenie przyjęcia zgłoszenia'],
      ['Zespół reagowania', 'Usuń przyczynę, odtwórz usługi, monitoruj ponowne wystąpienie.', ''],
      ['Kierownik incydentu', 'Zamknij incydent, przygotuj raport końcowy i zwołaj przegląd poincydentalny.', ''],
    ],
  },
  {
    id: 'proc-breach', type: 'procedure', layer: 'biz', name: 'Procedura obsługi naruszenia ochrony danych osobowych',
    reqs: ['rodo:art. 33', 'rodo:art. 33(5)', 'rodo:art. 34'],
    sections: [
      ['Cel', 'Spełnienie obowiązków z art. 33–34 RODO.', ''],
    ],
    steps: [
      ['Każdy pracownik', 'Niezwłocznie zgłoś podejrzenie naruszenia do IOD.', ''],
      ['IOD', 'Zapisz moment stwierdzenia naruszenia – od niego liczy się 72 h.', ''],
      ['IOD', 'Oceń ryzyko naruszenia praw lub wolności osób (kategorie danych, liczba osób, skutki).', 'Ocena ryzyka udokumentowana'],
      ['IOD / administrator', 'Jeśli ryzyko występuje – zgłoś naruszenie Prezesowi UODO w ciągu 72 h.', 'Potwierdzenie zgłoszenia'],
      ['Administrator', 'Przy wysokim ryzyku zawiadom osoby, których dane dotyczą, bez zbędnej zwłoki.', ''],
      ['IOD', 'Wpisz naruszenie do rejestru naruszeń niezależnie od decyzji o zgłoszeniu.', 'Wpis w rejestrze'],
    ],
  },
  {
    id: 'proc-recovery', type: 'procedure', layer: 'tech', name: 'Procedura odtworzenia systemu',
    reqs: ['iso27001:A.5.37', 'iso27001:A.8.13', 'nist61:RC.RP', 'dora:art. 12', 'iso27031:IRBC-3'],
    sections: [
      ['Cel', 'Odtworzenie systemu w czasie nie dłuższym niż RTO i do punktu nie wcześniejszego niż RPO.', ''],
      ['Instrukcje technologiczne', '{{children}}', ''],
    ],
    steps: [
      ['Kierownik DR', 'Potwierdź zakres odtworzenia i wybrany punkt odtworzenia z właścicielem biznesowym.', 'Zgoda zapisana'],
      ['Administrator', 'Odtwórz komponenty w kolejności zależności, korzystając z instrukcji technologicznych.', ''],
      ['Administrator', 'Wykonaj weryfikację techniczną (usługi, spójność danych, monitoring).', ''],
      ['Właściciel biznesowy', 'Wykonaj test akceptacyjny i potwierdź gotowość do pracy.', 'Akceptacja z godziną – koniec liczenia RTO'],
      ['Kierownik DR', 'Zapisz rzeczywisty RTO i RPO, zgłoś odchylenia.', ''],
    ],
  },
  {
    id: 'proc-failover', type: 'procedure', layer: 'tech', name: 'Procedura przełączenia do ośrodka zapasowego',
    reqs: ['iso27001:A.8.14', 'iso27031:IRBC-3', 'nist34:5'],
    sections: [
      ['Cel', 'Kontrolowane przełączenie usług do ośrodka zapasowego i powrót.', ''],
      ['Instrukcje technologiczne', '{{children}}', ''],
    ],
    steps: [
      ['Kierownik DR', 'Uzyskaj decyzję o przełączeniu i ogłoś okno zmian.', ''],
      ['Administrator sieci', 'Potwierdź łączność i dostęp administracyjny w ośrodku zapasowym.', ''],
      ['Administratorzy', 'Przełącz warstwy: pamięć masowa → bazy danych → aplikacje → ruch sieciowy.', ''],
      ['Właściciele biznesowi', 'Potwierdź działanie usług.', ''],
      ['Kierownik DR', 'Zaplanuj powrót (failback) po usunięciu przyczyny awarii.', ''],
    ],
  },
  {
    id: 'proc-testing', type: 'procedure', layer: 'both', name: 'Procedura testowania i ćwiczeń',
    reqs: ['iso22301:8.5', 'iso22301:8.6', 'nist34:6', 'iso27031:IRBC-4', 'nis2:art. 21(2)(f)', 'dora:art. 11(6)', 'dora:art. 24', 'rodo:art. 32(1)(d)', 'pci:12.10.2', 'pci:12.10.4'],
    sections: [
      ['Program testów', '| Rodzaj | Częstotliwość | Zakres |\n|---|---|---|\n| Przegląd dokumentacji | 2× w roku | wszystkie plany |\n| Ćwiczenie sztabowe (tabletop) | raz w roku | zespół kryzysowy, IRP |\n| Test odtworzenia z kopii | raz na kwartał | systemy krytyczne |\n| Test przełączenia | raz w roku | DRP |', ''],
    ],
    steps: [
      ['Koordynator BCM', 'Zaplanuj test: cel, zakres, scenariusz, kryteria sukcesu, uczestnicy.', ''],
      ['Koordynator BCM', 'Uzyskaj zgodę właścicieli i zarządzaj ryzykiem testu (okno, plan wycofania).', ''],
      ['Zespół testowy', 'Przeprowadź test i rejestruj czasy oraz odchylenia.', ''],
      ['Koordynator BCM', 'Opracuj raport z wnioskami i działaniami korygującymi.', 'Raport zatwierdzony'],
    ],
  },
  {
    id: 'proc-lessons', type: 'procedure', layer: 'both', name: 'Procedura przeglądu poincydentalnego',
    reqs: ['iso27001:A.5.27', 'iso27035:LEARN', 'nist61:ID.IM', 'iso22301:10.1'],
    sections: [['Cel', 'Wyciąganie wniosków z incydentów i testów oraz doskonalenie planów.', '']],
    steps: [
      ['Kierownik incydentu', 'Zwołaj przegląd w ciągu 10 dni roboczych od zamknięcia incydentu P1/P2.', ''],
      ['Uczestnicy', 'Odtwórz oś czasu, przyczynę źródłową i skuteczność reakcji (bez szukania winnych).', ''],
      ['Koordynator BCM', 'Wpisz działania korygujące z właścicielem i terminem; zaktualizuj plany.', ''],
    ],
  },

  // ───────── INSTRUKCJE ─────────
  {
    id: 'ins-tech', type: 'instruction', layer: 'tech', name: 'Instrukcja techniczna',
    builder: true,
    reqs: ['iso27001:A.5.37'],
    sections: [
      ['Warunki wstępne', '- Dostęp administracyjny (konto awaryjne, MFA).\n- Dostęp do dokumentacji offline i haseł w sejfie.\n- Zgoda kierownika DR / kierownika incydentu.', ''],
      ['Kroki', '{{steps}}', 'Znacznik {{steps}} wskazuje miejsce listy kroków.'],
      ['Po wykonaniu', 'Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.', ''],
    ],
  },
  {
    id: 'ins-manual', type: 'instruction', layer: 'biz', name: 'Instrukcja pracy w trybie awaryjnym',
    reqs: ['iso22301:8.4.4'],
    sections: [
      ['Kiedy stosować', 'Gdy system wspierający proces jest niedostępny dłużej niż ustalił właściciel procesu.', ''],
      ['Zasoby', 'Formularze papierowe/offline, lista kontaktów, minimalny skład osobowy.', ''],
      ['Po przywróceniu systemu', 'Wprowadź dane zebrane w trybie awaryjnym i uzgodnij je z drugą osobą.', ''],
    ],
    steps: [
      ['Kierownik zespołu', 'Ogłoś przejście na tryb awaryjny i zapisz godzinę.', ''],
      ['Pracownicy', 'Rejestruj operacje w formularzu awaryjnym z numeracją ciągłą.', ''],
      ['Kierownik zespołu', 'Raportuj co 2 h do zespołu kryzysowego liczbę i status spraw.', ''],
    ],
  },
  {
    id: 'ins-calltree', type: 'instruction', layer: 'biz', name: 'Instrukcja powiadamiania (drzewo telefoniczne)',
    reqs: ['iso22301:8.4.3'],
    sections: [
      ['Drzewo powiadomień', '| Kto dzwoni | Do kogo | Zastępca |\n|---|---|---|\n| Koordynator BCM | członkowie zespołu kryzysowego | zastępca koordynatora |\n| Członek zespołu | kierownicy działów | zastępcy kierowników |', ''],
    ],
    steps: [
      ['Inicjujący', 'Przekaż krótki komunikat: co się stało, co robić, kiedy kolejna informacja.', ''],
      ['Każdy w drzewie', 'Gdy nie dodzwonisz się w 10 min – dzwoń do zastępcy i zgłoś to wyżej.', ''],
      ['Koordynator BCM', 'Potwierdź, że wszyscy zostali powiadomieni, i zapisz czas.', ''],
    ],
  },
];

// ───────── Ransomware i handel detaliczny ─────────
TEMPLATES.push(
  {
    id: 'proc-ransomware', type: 'procedure', layer: 'both', name: 'Playbook: atak ransomware',
    reqs: ['iso27001:A.5.26', 'iso27001:A.5.28', 'iso27035:RESPOND', 'nist61:RS.MA', 'nist61:RS.AN', 'nist61:RS.MI', 'nist61:RC.RP', 'pci:12.10.1', 'pci:12.10.5', 'nis2:art. 21(2)(b)', 'ksc:KSC-OBS'],
    sections: [
      ['Cel i zakres', 'Playbook opisuje reakcję {{org}} na atak ransomware: szyfrowanie systemów, kradzież danych z groźbą publikacji (podwójne wymuszenie) lub oba zdarzenia naraz.', ''],
      ['Objawy i wskaźniki', '- Pliki ze zmienionym rozszerzeniem i notatka z żądaniem okupu.\n- Masowe usuwanie kopii migawkowych (np. `vssadmin delete shadows`), wyłączanie agentów EDR i kopii zapasowych.\n- Nietypowe logowania kont uprzywilejowanych, nowe konta administracyjne, zmiany GPO.\n- Duży ruch wychodzący, narzędzia synchronizacji z chmurą (np. rclone) – możliwa eksfiltracja.\n- Zgłoszenia ze sklepów lub magazynów o masowej niedostępności systemów.', ''],
      ['Zasady', '- Nie wyłączaj zasilania zainfekowanych serwerów bez decyzji zespołu IR – utracisz dowody z pamięci.\n- Komunikuj się kanałem pozapasmowym: zakładaj, że poczta i komunikator mogą być czytane przez atakujących.\n- Nie kontaktuj się z przestępcami bez decyzji Zarządu (procedura decyzyjna).\n- Nie przywracaj systemów do sieci, z której nie usunięto atakującego.\n- Każda decyzja ma godzinę i autora w dzienniku incydentu.', ''],
      ['Terminy raportowe', '{{reporting}}', ''],
      ['Checklisty i instrukcje', '{{children}}', ''],
    ],
    steps: [
      ['SOC', 'Potwierdź objawy, zarejestruj incydent jako P1 i zapisz czas wykrycia.', 'Numer incydentu i czas wykrycia', '1 · 0–15 min · Wykrycie'],
      ['SOC', 'Powiadom kierownika incydentu i CISO telefonicznie lub kanałem pozapasmowym.', 'Potwierdzenie odbioru', '1 · 0–15 min · Wykrycie'],
      ['Kierownik incydentu', 'Uruchom zegar raportowy i zwołaj zespół kryzysowy (cel: 30 min).', 'Zespół zebrany', '1 · 0–15 min · Wykrycie'],
      ['SOC / NOC', 'Odizoluj zainfekowane hosty w EDR i zablokuj ruch między strefami (sklepy, centrala, magazyny) według checklisty izolacji.', 'Rozprzestrzenianie zatrzymane', '2 · 15 min–2 h · Ograniczenie'],
      ['Administrator tożsamości', 'Wyłącz przejęte konta, ogranicz konta uprzywilejowane do zespołu IR, rozważ wstrzymanie synchronizacji z chmurą.', '', '2 · 15 min–2 h · Ograniczenie'],
      ['Administrator kopii', 'Odetnij repozytoria kopii od sieci produkcyjnej, zmień poświadczenia konsoli i potwierdź stan kopii niezmiennych.', 'Kopie niezmienne nienaruszone', '2 · 15 min–2 h · Ograniczenie'],
      ['Zespół IR', 'Zabezpiecz dowody: pamięć, logi, notatkę okupu, próbkę złośliwego oprogramowania.', 'Karty dowodów z sumami SHA-256', '2 · 15 min–2 h · Ograniczenie'],
      ['Kierownik incydentu', 'Zdecyduj o odcięciu internetu lub VPN dla stref objętych incydentem i zapisz decyzję.', 'Decyzja z godziną', '2 · 15 min–2 h · Ograniczenie'],
      ['Zespół IR', 'Ustal zakres: wektor wejścia, przejęte konta, zaszyfrowane systemy, ślady eksfiltracji, najwcześniejszy ślad atakującego.', 'Wstępny raport zakresu', '3 · 2–24 h · Ocena i decyzje'],
      ['IOD', 'Oceń naruszenie ochrony danych osobowych (klienci, pracownicy) według checklisty RODO.', 'Decyzja o zgłoszeniu do UODO', '3 · 2–24 h · Ocena i decyzje'],
      ['Zespół kryzysowy', 'Uruchom tryb awaryjny procesów: sprzedaż w sklepach offline, dostawy awaryjne, komunikacja z klientami.', '', '3 · 2–24 h · Ocena i decyzje'],
      ['Compliance', 'Przygotuj zgłoszenia w terminach; powiadom ubezpieczyciela cyber, agenta rozliczeniowego (PCI DSS) i policję (CBZC).', 'Potwierdzenia wysłania', '3 · 2–24 h · Ocena i decyzje'],
      ['Zarząd', 'Rozstrzygnij kwestię żądania okupu zgodnie z procedurą decyzyjną.', 'Uchwała lub notatka decyzyjna', '3 · 2–24 h · Ocena i decyzje'],
      ['Zespół IR', 'Usuń mechanizmy utrzymania dostępu (konta, zadania, GPO), zresetuj KRBTGT dwukrotnie, zmień hasła i sekrety.', '', '4 · Usunięcie i odtworzenie'],
      ['Kierownik DR', 'Odtwarzaj w czystym środowisku: tożsamość → sieć i zapory → bazy danych → ERP/WMS → kasy → e-commerce.', 'Usługi odtworzone w kolejności', '4 · Usunięcie i odtworzenie'],
      ['Właściciele procesów', 'Zaakceptuj działanie usług i uzgodnij dane z trybu awaryjnego.', 'Akceptacja z godziną', '4 · Usunięcie i odtworzenie'],
      ['Kierownik incydentu', 'Utrzymaj wzmożony monitoring przez 30 dni, przygotuj raport końcowy i przegląd poincydentalny.', '', '5 · Po incydencie'],
    ],
  },
  {
    id: 'proc-ransom-decision', type: 'procedure', layer: 'biz', name: 'Procedura decyzyjna – żądanie okupu',
    reqs: ['iso22301:8.4.2', 'nist61:RS.MA'],
    sections: [
      ['Zasada', '{{org}} domyślnie nie płaci okupu. Odstępstwo może zatwierdzić wyłącznie Zarząd, po analizie prawnej i bez naruszenia sankcji.', ''],
      ['Kryteria oceny', '| Kryterium | Pytanie |\n|---|---|\n| Odtworzenie | Czy odtworzymy procesy krytyczne z kopii w czasie MTPD? |\n| Ludzie | Czy zagrożone jest życie lub zdrowie? |\n| Sankcje | Czy odbiorca lub portfel znajduje się na listach sankcyjnych (UE, ONZ, OFAC)? |\n| Organy | Jakie jest stanowisko policji (CBZC)? |\n| Ubezpieczenie | Co mówi polisa cyber i ubezpieczyciel? |\n| Skuteczność | Brak gwarancji odszyfrowania i usunięcia danych; ryzyko ponownego ataku. |', ''],
    ],
    steps: [
      ['Kierownik incydentu', 'Przedstaw Zarządowi stan odtworzenia z kopii i szacowany czas powrotu procesów krytycznych.', ''],
      ['Dział prawny', 'Sprawdź listy sankcyjne i obowiązki prawne; przygotuj opinię.', 'Opinia na piśmie'],
      ['Compliance', 'Zgłoś przestępstwo policji (CBZC) i poinformuj ubezpieczyciela.', 'Numer sprawy'],
      ['Zarząd', 'Podejmij i udokumentuj decyzję z uzasadnieniem.', 'Uchwała'],
      ['Kierownik incydentu', 'Kontakt z przestępcami prowadzi wyłącznie wyznaczony negocjator, wszystkie wiadomości są archiwizowane.', ''],
    ],
  },
  {
    id: 'proc-clean-rebuild', type: 'procedure', layer: 'tech', name: 'Procedura odtworzenia po ransomware (czyste środowisko)',
    reqs: ['iso27001:A.8.13', 'iso27031:IRBC-3', 'nist61:RC.RP', 'dora:art. 12', 'rodo:art. 32(1)(c)', 'nist34:5'],
    sections: [
      ['Cel', 'Odtworzenie usług bez ryzyka ponownego zaszyfrowania: z czystych kopii, w odizolowanym środowisku, z nowymi poświadczeniami.', ''],
      ['Kolejność odtwarzania', '{{table:order}}', ''],
      ['Instrukcje', '{{children}}', ''],
    ],
    steps: [
      ['Kierownik DR', 'Zbuduj izolowane środowisko odtworzeniowe (osobna sieć, nowe stacje administracyjne PAW).', 'Środowisko bez połączenia z siecią produkcyjną'],
      ['Zespół IR', 'Wskaż punkt odtworzenia sprzed najwcześniejszego śladu atakującego.', 'Punkt zatwierdzony przez kierownika incydentu'],
      ['Administrator kopii', 'Przeskanuj kopie (antywirus, wskaźniki IoC z incydentu) przed odtworzeniem.', 'Brak wykryć'],
      ['Administratorzy', 'Odtwórz tożsamość (AD/Entra) jako pierwszą, potem sieć, bazy danych i aplikacje.', ''],
      ['Zespół IR', 'Usuń podatność użytą do wejścia i wymuś zmianę wszystkich haseł i kluczy.', ''],
      ['Kierownik DR', 'Przyłączaj strefy do sieci etapami, pod wzmożonym monitoringiem SOC.', 'Brak nowych alertów przez 24 h'],
    ],
  },
  {
    id: 'proc-store-offline', type: 'procedure', layer: 'biz', name: 'Procedura pracy placówek przy niedostępności systemów centralnych',
    reqs: ['iso22301:8.4.4', 'iso27001:A.5.29'],
    sections: [
      ['Cel', 'Utrzymanie sprzedaży w placówkach {{org}}, gdy systemy centralne są niedostępne lub odcięte z powodu incydentu.', ''],
      ['Kryteria zamknięcia placówki', '- Brak możliwości wystawiania paragonów fiskalnych.\n- Zagrożenie bezpieczeństwa ludzi.\n- Polecenie kierownika regionu lub zespołu kryzysowego.', ''],
      ['Checklisty', '{{children}}', ''],
    ],
    steps: [
      ['Kierownik regionu', 'Przekaż placówkom polecenie przejścia w tryb awaryjny (SMS / telefon).', 'Potwierdzenia od placówek'],
      ['Kierownik placówki', 'Sprawdź, czy kasy działają offline i czy terminale autoryzują płatności.', ''],
      ['Kierownik placówki', 'Gdy terminale nie działają – przyjmuj tylko gotówkę i oznacz to przy wejściu.', ''],
      ['Kierownik placówki', 'Wstrzymaj zwroty, rabaty programu lojalnościowego i karty podarunkowe do odwołania.', ''],
      ['Kierownik placówki', 'Prowadź papierowy rejestr zdarzeń i braków towaru; raportuj co 4 h.', ''],
    ],
  },
  {
    id: 'proc-dc-manual', type: 'procedure', layer: 'both', name: 'Procedura awaryjnej obsługi centrum dystrybucyjnego',
    reqs: ['iso22301:8.4.4', 'iso22301:8.3'],
    sections: [
      ['Cel', 'Utrzymanie minimalnych dostaw do placówek, gdy system magazynowy (WMS) lub automatyka są niedostępne.', ''],
      ['Priorytety', 'Dostawy uzupełniające produktów o najwyższej rotacji i pierwszej potrzeby dla placówek z najniższym zapasem.', ''],
      ['Checklisty', '{{children}}', ''],
    ],
    steps: [
      ['Kierownik CD', 'Zatrzymaj automatykę w stanie bezpiecznym i zabezpiecz strefy pracy.', ''],
      ['Planowanie dostaw', 'Wygeneruj z ostatniej czystej kopii lub kopii offline listę priorytetowych pozycji i lokalizacji.', 'Lista kompletacyjna na papierze'],
      ['Kierownik zmiany', 'Kompletuj ręcznie według list papierowych, z kontrolą drugiej osoby.', ''],
      ['Transport', 'Ustal awaryjny harmonogram ramp i kursów telefonicznie z przewoźnikami.', ''],
      ['Kierownik CD', 'Po odtworzeniu WMS zaksięguj ruchy z trybu awaryjnego i wykonaj inwentaryzację kontrolną.', 'Stany zgodne'],
    ],
  },
  {
    id: 'ins-checklist', type: 'instruction', layer: 'both', name: 'Checklista',
    reqs: [],
    sections: [
      ['Kiedy używać', '', ''],
      ['Lista kontrolna', '{{steps}}', 'Odhaczaj punkty w trakcie testu lub incydentu (moduł Testy → wykonanie).'],
      ['Po zakończeniu', 'Przekaż wypełnioną checklistę kierownikowi incydentu – jest częścią dokumentacji incydentu.', ''],
    ],
  },
);

export const TEMPLATE_BY_ID = Object.fromEntries(TEMPLATES.map(t => [t.id, t]));
