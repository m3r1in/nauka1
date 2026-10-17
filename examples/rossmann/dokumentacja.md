# Dokumentacja ciągłości działania – Rossmann Polska

Wygenerowano: 17.10.2026, 08:42:37

## Polityka zarządzania ciągłością działania

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Polityka | biznesowa | 0.1 | projekt | Zarząd | 2027-10-17 |

### Cel i zakres

Rossmann Polska ustanawia system zarządzania ciągłością działania, aby chronić sprzedaż w sieci ok. 2000 drogerii, zaopatrzenie z centrów dystrybucyjnych, kanały cyfrowe i dane klientów.

Zakres: centrala w Łodzi, centra dystrybucyjne (Łódź, Pyskowice, Grudziądz, Zgierz, Dąbrówka Wielka), drogerie, sklep internetowy i aplikacja, program lojalnościowy oraz kluczowi dostawcy (płatności, transport, IT).

### Wymagania prawne i normatywne

Polityka uwzględnia wymagania:

- **ISO 22301:2019** – Systemy zarządzania ciągłością działania (BCMS)
- **ISO/IEC 27001:2022** – Systemy zarządzania bezpieczeństwem informacji – zabezpieczenia załącznika A
- **ISO/IEC 27035** – Zarządzanie incydentami bezpieczeństwa informacji
- **NIST SP 800-61 Rev. 3 / CSF 2.0** – Reagowanie na incydenty w ujęciu CSF 2.0
- **PCI DSS v4.0.1** – Bezpieczeństwo danych kart płatniczych – reagowanie na incydenty
- **NIS2 – dyrektywa (UE) 2022/2555** – Środki zarządzania ryzykiem w cyberbezpieczeństwie i obowiązki raportowe
- **Ustawa o KSC** – Ustawa o krajowym systemie cyberbezpieczeństwa (w brzmieniu wdrażającym NIS2) – zweryfikuj aktualny stan prawny i numerację przepisów
- **RODO – rozporządzenie (UE) 2016/679** – Ochrona danych osobowych – dostępność i naruszenia

### Zasady

- Ciągłość działania jest odpowiedzialnością kierownictwa.
- Priorytety odtwarzania wynikają z BIA i są zatwierdzane przez Zarząd.
- Każdy proces krytyczny ma plan ciągłości, a każdy system krytyczny – plan i instrukcje odtworzenia.
- Plany są testowane co najmniej raz w roku i po istotnych zmianach.
- Wnioski z testów i incydentów prowadzą do działań korygujących.

### Role i odpowiedzialności

| Rola | Odpowiedzialność |
|---|---|
| Zarząd | zatwierdza politykę, BIA i apetyt na ryzyko, nadzoruje wdrożenie |
| Koordynator BCM | utrzymuje system, organizuje testy, raportuje do Zarządu |
| Właściciele procesów | utrzymują plany ciągłości i instrukcje biznesowe |
| Dyrektor IT | odpowiada za DRP i instrukcje techniczne |
| Zespół kryzysowy | podejmuje decyzje w czasie zakłócenia |

### Cele ciągłości działania

- 100% procesów krytycznych z zatwierdzonym BIA i planem.
- Osiągalne RTO/RPO systemów zgodne z wymaganiami procesów.
- Coroczny test każdego planu; luki zamknięte w terminie.

### Architektura dokumentacji

Dokumentacja tworzy hierarchię:

1. Polityki – zasady i odpowiedzialności.
2. Plany – BCP, DRP, IRP, komunikacja kryzysowa.
3. Procedury – kto, co i kiedy robi.
4. Instrukcje – kroki techniczne i operacyjne dla konkretnych technologii i stanowisk.

- Plan: **Plan ciągłości działania (BCP)** (v0.1, projekt)
- Plan: **Plan komunikacji kryzysowej** (v0.1, projekt)
- Plan: **Plan odtwarzania po awarii (DRP)** (v0.1, projekt)
- Procedura: **Procedura testowania i ćwiczeń** (v0.1, projekt)

### Przegląd i zatwierdzenie

Polityka podlega przeglądowi co najmniej raz w roku oraz po istotnej zmianie organizacyjnej, technologicznej lub prawnej.

### Mapowanie na wymagania

- ISO 22301:2019 – 4.3
- ISO 22301:2019 – 5.2
- ISO 22301:2019 – 5.3
- ISO 22301:2019 – 6.2
- ISO 22301:2019 – 7.5
- ISO/IEC 27001:2022 – A.5.29
- NIST SP 800-34 Rev. 1 – 1
- NIS2 – dyrektywa (UE) 2022/2555 – art. 20
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(c)
- DORA – rozporządzenie (UE) 2022/2554 – art. 5
- DORA – rozporządzenie (UE) 2022/2554 – art. 11(1)
- Ustawa o KSC – KSC-CD

---

## Plan ciągłości działania (BCP)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Plan | biznesowa | 0.1 | projekt | Koordynator BCM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania

### Zakres i założenia

Plan obejmuje procesy krytyczne Rossmann Polska i opisuje sposób ich kontynuacji na minimalnym akceptowalnym poziomie (MBCO) do czasu pełnego odtworzenia.

### Procesy krytyczne i cele odtworzenia (BIA)

| Proces | Właściciel | Krytyczność | MTPD | RTO | RPO | MBCO |
|---|---|---|---|---|---|---|
| Sprzedaż w drogeriach | Dyrektor operacji sklepowych | 5 – krytyczna | 4 h | 2 h | 15 min | Sprzedaż (gotówka i karty) w trybie offline w co najmniej 80% drogerii |
| Zaopatrzenie drogerii z centrów dystrybucyjnych | Dyrektor logistyki | 5 – krytyczna | 3 d | 24 h | 4 h | Dostawy uzupełniające produktów o najwyższej rotacji do drogerii z najniższym zapasem |
| Komunikacja kryzysowa i obsługa klienta | Dyrektor komunikacji | 5 – krytyczna | 8 h | 4 h | 1 h | Kanał pozapasmowy zespołu kryzysowego, komunikaty do drogerii, klientów i mediów |
| Zakupy i zarządzanie zapasami | Dyrektor handlowy | 4 | 5 d | 2 d | 4 h | Zamówienia u kluczowych dostawców (ręcznie / EDI) |
| Sprzedaż internetowa i click & collect | Dyrektor e-commerce | 4 | 2 d | 24 h | 30 min | Przyjmowanie i realizacja zamówień z odbiorem w drogerii |
| Finanse i płatności do dostawców | Dyrektor finansowy | 4 | 7 d | 3 d | 24 h | Płatności krytyczne (wynagrodzenia, podatki, kluczowi dostawcy) |
| Program lojalnościowy i aplikacja klienta | Dyrektor marketingu | 3 – średnia | 3 d | 2 d | 1 h | Identyfikacja członków Klubu i naliczanie rabatów (możliwe ręczne korekty) |
| Wynagrodzenia i kadry | Dyrektor HR | 3 – średnia | 10 d | 5 d | 24 h | Wypłata wynagrodzeń w terminie (również według listy z poprzedniego miesiąca) |

### Scenariusze i strategie

| Scenariusz | Strategia |
|---|---|
| Niedostępność lokalizacji | praca zdalna, lokalizacja zapasowa |
| Niedostępność systemów IT | tryb manualny, DRP |
| Niedostępność personelu | zastępstwa, macierz kompetencji |
| Niedostępność dostawcy | dostawca alternatywny, zapasy, strategia wyjścia |

### Struktura reagowania

Zespół kryzysowy: przewodniczący (członek Zarządu), koordynator BCM, właściciele procesów krytycznych, IT, komunikacja, HR, prawnik.

### Aktywacja planu

Plan aktywuje przewodniczący zespołu kryzysowego lub jego zastępca, gdy przewidywany czas niedostępności procesu krytycznego przekracza 50% jego RTO albo gdy zachodzi zagrożenie życia lub zdrowia.

### Fazy działania

1. **Reakcja** (0–4 h): ocena sytuacji, bezpieczeństwo ludzi, aktywacja, powiadomienia.
2. **Kontynuacja**: uruchomienie trybu awaryjnego procesów zgodnie z instrukcjami.
3. **Odtworzenie**: przywrócenie zasobów (DRP, dostawcy, lokalizacja).
4. **Powrót**: przejście do trybu normalnego, uzgodnienie danych, przegląd.

### Procedury i instrukcje

- Procedura: **Procedura awaryjnej obsługi centrum dystrybucyjnego** (v0.1, projekt)
- Procedura: **Procedura eskalacji i aktywacji planu** (v0.1, projekt)
- Procedura: **Procedura pracy drogerii przy niedostępności systemów centralnych** (v0.1, projekt)
- Instrukcja: **Tryb awaryjny – Finanse i płatności do dostawców** (v0.1, projekt)
- Instrukcja: **Tryb awaryjny – Komunikacja kryzysowa i obsługa klienta** (v0.1, projekt)
- Instrukcja: **Tryb awaryjny – Sprzedaż internetowa i click & collect** (v0.1, projekt)
- Instrukcja: **Tryb awaryjny – Sprzedaż w drogeriach** (v0.1, projekt)
- Instrukcja: **Tryb awaryjny – Zakupy i zarządzanie zapasami** (v0.1, projekt)
- Instrukcja: **Tryb awaryjny – Zaopatrzenie drogerii z centrów dystrybucyjnych** (v0.1, projekt)

### Mapowanie na wymagania

- ISO 22301:2019 – 8.3
- ISO 22301:2019 – 8.4.2
- ISO 22301:2019 – 8.4.4
- ISO 22301:2019 – 8.4.5
- ISO 22301:2019 – 8.2.2
- NIST SP 800-34 Rev. 1 – 2
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(c)
- DORA – rozporządzenie (UE) 2022/2554 – art. 11(3)
- ISO/IEC 27001:2022 – A.5.29

---

## Procedura awaryjnej obsługi centrum dystrybucyjnego

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Dyrektor logistyki | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP)

### Cel

Utrzymanie minimalnych dostaw do placówek, gdy system magazynowy (WMS) lub automatyka są niedostępne.

### Priorytety

Dostawy uzupełniające produktów o najwyższej rotacji i pierwszej potrzeby dla placówek z najniższym zapasem.

### Checklisty

- Instrukcja: **Checklista kierownika zmiany centrum dystrybucyjnego** (v0.1, projekt)

### Kroki

1. **Kierownik CD:** Zatrzymaj automatykę w stanie bezpiecznym i zabezpiecz strefy pracy.
2. **Planowanie dostaw:** Wygeneruj z ostatniej czystej kopii lub kopii offline listę priorytetowych pozycji i lokalizacji.
   _Oczekiwany rezultat:_ Lista kompletacyjna na papierze
3. **Kierownik zmiany:** Kompletuj ręcznie według list papierowych, z kontrolą drugiej osoby.
4. **Transport:** Ustal awaryjny harmonogram ramp i kursów telefonicznie z przewoźnikami.
5. **Kierownik CD:** Po odtworzeniu WMS zaksięguj ruchy z trybu awaryjnego i wykonaj inwentaryzację kontrolną.
   _Oczekiwany rezultat:_ Stany zgodne

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.4
- ISO 22301:2019 – 8.3

---

## Checklista kierownika zmiany centrum dystrybucyjnego

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Dyrektor logistyki | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP) → Procedura awaryjnej obsługi centrum dystrybucyjnego

### Kiedy używać

Gdy WMS lub automatyka są niedostępne albo odcięte.

### Lista kontrolna

1. **Kierownik zmiany:** Zatrzymaj automatykę w stanie bezpiecznym zgodnie z instrukcją dostawcy; zabezpiecz strefy.
2. **Kierownik zmiany:** Pobierz od planowania papierowe listy priorytetowych dostaw (z ostatniej czystej kopii).
3. **Kierownik zmiany:** Zorganizuj ręczną kompletację z kontrolą drugiej osoby; oznaczaj palety ręcznie.
4. **Kierownik zmiany:** Prowadź papierowy rejestr wydań (drogeria, paleta, godzina, kierowca).
   _Oczekiwany rezultat:_ Rejestr kompletny
5. **Kierownik zmiany:** Uzgadniaj telefonicznie z przewoźnikami okna ramp i kursy.

### Po zakończeniu

Przekaż wypełnioną checklistę kierownikowi incydentu – jest częścią dokumentacji incydentu.


---

## Procedura eskalacji i aktywacji planu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowa | 0.1 | projekt | Koordynator BCM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP)

### Cel

Zapewnienie szybkiej oceny zakłócenia i decyzji o aktywacji planu ciągłości działania.

### Dokumenty powiązane

- Instrukcja: **Instrukcja powiadamiania (drzewo telefoniczne)** (v0.1, projekt)

### Kroki

1. **Każdy pracownik:** Zgłoś zakłócenie dyżurowi IT lub przełożonemu (telefon, SMS).
   _Oczekiwany rezultat:_ Zgłoszenie przyjęte
2. **Dyżur / przełożony:** Oceń wpływ na procesy krytyczne i przewidywany czas trwania.
   _Oczekiwany rezultat:_ Wstępna ocena w 30 min
3. **Koordynator BCM:** Zwołaj zespół kryzysowy, jeśli zagrożony jest proces krytyczny.
   _Oczekiwany rezultat:_ Zespół zebrany
4. **Przewodniczący zespołu:** Podejmij decyzję o aktywacji BCP/DRP/IRP i zapisz ją w dzienniku.
   _Oczekiwany rezultat:_ Decyzja z godziną
5. **Komunikacja:** Powiadom pracowników i interesariuszy zgodnie z planem komunikacji.

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.2
- ISO 22301:2019 – 8.4.3

---

## Instrukcja powiadamiania (drzewo telefoniczne)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowa | 0.1 | projekt | Właściciel systemu | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP) → Procedura eskalacji i aktywacji planu

### Drzewo powiadomień

| Kto dzwoni | Do kogo | Zastępca |
|---|---|---|
| Koordynator BCM | członkowie zespołu kryzysowego | zastępca koordynatora |
| Członek zespołu | kierownicy działów | zastępcy kierowników |

### Kroki

1. **Inicjujący:** Przekaż krótki komunikat: co się stało, co robić, kiedy kolejna informacja.
2. **Każdy w drzewie:** Gdy nie dodzwonisz się w 10 min – dzwoń do zastępcy i zgłoś to wyżej.
3. **Koordynator BCM:** Potwierdź, że wszyscy zostali powiadomieni, i zapisz czas.

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.3

---

## Procedura pracy drogerii przy niedostępności systemów centralnych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowa | 0.1 | projekt | Dyrektor operacji sklepowych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP)

### Cel

Utrzymanie sprzedaży w placówkach Rossmann Polska, gdy systemy centralne są niedostępne lub odcięte z powodu incydentu.

### Kryteria zamknięcia placówki

- Brak możliwości wystawiania paragonów fiskalnych.
- Zagrożenie bezpieczeństwa ludzi.
- Polecenie kierownika regionu lub zespołu kryzysowego.

### Checklisty

- Instrukcja: **Checklista kierownika drogerii: systemy niedostępne** (v0.1, projekt)

### Kroki

1. **Kierownik regionu:** Przekaż placówkom polecenie przejścia w tryb awaryjny (SMS / telefon).
   _Oczekiwany rezultat:_ Potwierdzenia od placówek
2. **Kierownik placówki:** Sprawdź, czy kasy działają offline i czy terminale autoryzują płatności.
3. **Kierownik placówki:** Gdy terminale nie działają – przyjmuj tylko gotówkę i oznacz to przy wejściu.
4. **Kierownik placówki:** Wstrzymaj zwroty, rabaty programu lojalnościowego i karty podarunkowe do odwołania.
5. **Kierownik placówki:** Prowadź papierowy rejestr zdarzeń i braków towaru; raportuj co 4 h.

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.4
- ISO/IEC 27001:2022 – A.5.29

---

## Checklista kierownika drogerii: systemy niedostępne

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Dyrektor operacji sklepowych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP) → Procedura pracy drogerii przy niedostępności systemów centralnych

### Kiedy używać

Gdy kasy nie łączą się z centralą, pojawia się notatka okupu lub kierownik regionu ogłasza tryb awaryjny.

### Lista kontrolna

1. **Kierownik drogerii:** Nie wyłączaj i nie restartuj urządzeń z notatką okupu – sfotografuj ekran i zgłoś na infolinię IT.
2. **Kierownik drogerii:** Odłącz od sieci komputer na zapleczu, jeśli widać na nim szyfrowanie plików.
3. **Kierownik drogerii:** Sprawdź, czy kasy sprzedają w trybie offline i czy terminale autoryzują karty.
4. **Kierownik drogerii:** Jeśli karty nie działają – przyjmuj gotówkę i wywieś informację przy wejściu.
   _Oczekiwany rezultat:_ Informacja wywieszona
5. **Kierownik drogerii:** Wstrzymaj zwroty, karty podarunkowe i rabaty Klubu do odwołania.
6. **Kierownik drogerii:** Zapisuj braki towaru i zdarzenia w rejestrze papierowym; raportuj kierownikowi regionu co 4 h.
7. **Kierownik drogerii:** Nie wykonuj poleceń IT przekazanych przez nieznane osoby (telefon, e-mail) – weryfikuj u kierownika regionu.
8. **Kierownik drogerii:** Zamknij drogerię tylko na polecenie kierownika regionu lub gdy nie można wystawiać paragonów.

### Po zakończeniu

Przekaż wypełnioną checklistę kierownikowi incydentu – jest częścią dokumentacji incydentu.


---

## Tryb awaryjny – Finanse i płatności do dostawców

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowa | 0.1 | projekt | Dyrektor finansowy | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP)

### Kiedy stosować

Gdy system wspierający proces jest niedostępny dłużej niż ustalił właściciel procesu.

### Zasoby

Formularze papierowe/offline, lista kontaktów, minimalny skład osobowy.

### Po przywróceniu systemu

Wprowadź dane zebrane w trybie awaryjnym i uzgodnij je z drugą osobą.

### Kroki

1. **Kierownik zespołu:** Ogłoś przejście na tryb awaryjny i zapisz godzinę.
2. **Pracownicy:** Rejestruj operacje w formularzu awaryjnym z numeracją ciągłą.
3. **Kierownik zespołu:** Raportuj co 2 h do zespołu kryzysowego liczbę i status spraw.

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.4

---

## Tryb awaryjny – Komunikacja kryzysowa i obsługa klienta

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowa | 0.1 | projekt | Dyrektor komunikacji | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP)

### Kiedy stosować

Gdy system wspierający proces jest niedostępny dłużej niż ustalił właściciel procesu.

### Zasoby

Formularze papierowe/offline, lista kontaktów, minimalny skład osobowy.

### Po przywróceniu systemu

Wprowadź dane zebrane w trybie awaryjnym i uzgodnij je z drugą osobą.

### Kroki

1. **Kierownik zespołu:** Ogłoś przejście na tryb awaryjny i zapisz godzinę.
2. **Pracownicy:** Rejestruj operacje w formularzu awaryjnym z numeracją ciągłą.
3. **Kierownik zespołu:** Raportuj co 2 h do zespołu kryzysowego liczbę i status spraw.

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.4

---

## Tryb awaryjny – Sprzedaż internetowa i click & collect

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowa | 0.1 | projekt | Dyrektor e-commerce | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP)

### Kiedy stosować

Gdy system wspierający proces jest niedostępny dłużej niż ustalił właściciel procesu.

### Zasoby

Formularze papierowe/offline, lista kontaktów, minimalny skład osobowy.

### Po przywróceniu systemu

Wprowadź dane zebrane w trybie awaryjnym i uzgodnij je z drugą osobą.

### Kroki

1. **Kierownik zespołu:** Ogłoś przejście na tryb awaryjny i zapisz godzinę.
2. **Pracownicy:** Rejestruj operacje w formularzu awaryjnym z numeracją ciągłą.
3. **Kierownik zespołu:** Raportuj co 2 h do zespołu kryzysowego liczbę i status spraw.

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.4

---

## Tryb awaryjny – Sprzedaż w drogeriach

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowa | 0.1 | projekt | Dyrektor operacji sklepowych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP)

### Kiedy stosować

Gdy system wspierający proces jest niedostępny dłużej niż ustalił właściciel procesu.

### Zasoby

Formularze papierowe/offline, lista kontaktów, minimalny skład osobowy.

### Po przywróceniu systemu

Wprowadź dane zebrane w trybie awaryjnym i uzgodnij je z drugą osobą.

### Kroki

1. **Kierownik zespołu:** Ogłoś przejście na tryb awaryjny i zapisz godzinę.
2. **Pracownicy:** Rejestruj operacje w formularzu awaryjnym z numeracją ciągłą.
3. **Kierownik zespołu:** Raportuj co 2 h do zespołu kryzysowego liczbę i status spraw.

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.4

---

## Tryb awaryjny – Zakupy i zarządzanie zapasami

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowa | 0.1 | projekt | Dyrektor handlowy | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP)

### Kiedy stosować

Gdy system wspierający proces jest niedostępny dłużej niż ustalił właściciel procesu.

### Zasoby

Formularze papierowe/offline, lista kontaktów, minimalny skład osobowy.

### Po przywróceniu systemu

Wprowadź dane zebrane w trybie awaryjnym i uzgodnij je z drugą osobą.

### Kroki

1. **Kierownik zespołu:** Ogłoś przejście na tryb awaryjny i zapisz godzinę.
2. **Pracownicy:** Rejestruj operacje w formularzu awaryjnym z numeracją ciągłą.
3. **Kierownik zespołu:** Raportuj co 2 h do zespołu kryzysowego liczbę i status spraw.

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.4

---

## Tryb awaryjny – Zaopatrzenie drogerii z centrów dystrybucyjnych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowa | 0.1 | projekt | Dyrektor logistyki | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan ciągłości działania (BCP)

### Kiedy stosować

Gdy system wspierający proces jest niedostępny dłużej niż ustalił właściciel procesu.

### Zasoby

Formularze papierowe/offline, lista kontaktów, minimalny skład osobowy.

### Po przywróceniu systemu

Wprowadź dane zebrane w trybie awaryjnym i uzgodnij je z drugą osobą.

### Kroki

1. **Kierownik zespołu:** Ogłoś przejście na tryb awaryjny i zapisz godzinę.
2. **Pracownicy:** Rejestruj operacje w formularzu awaryjnym z numeracją ciągłą.
3. **Kierownik zespołu:** Raportuj co 2 h do zespołu kryzysowego liczbę i status spraw.

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.4

---

## Plan komunikacji kryzysowej

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Plan | biznesowa | 0.1 | projekt | Koordynator BCM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania

### Cel

Zapewnienie spójnej, terminowej i zgodnej z prawem komunikacji Rossmann Polska w czasie zakłócenia.

### Odbiorcy i kanały

| Odbiorca | Kanał | Odpowiedzialny | Kiedy |
|---|---|---|---|
| Pracownicy | SMS, intranet | HR / komunikacja | do 1 h od aktywacji |
| Klienci | strona www, e-mail | komunikacja | po decyzji zespołu kryzysowego |
| Organy nadzoru | zgodnie z przepisami | compliance | terminy ustawowe |
| Media | rzecznik | komunikacja | wyłącznie rzecznik |

### Zasady

- Komunikaty zewnętrzne zatwierdza przewodniczący zespołu kryzysowego.
- Kanały awaryjne nie zależą od infrastruktury, która może ulec awarii.
- Dziennik komunikacji jest prowadzony na bieżąco.

### Szablony komunikatów

- Instrukcja: **Checklista: komunikacja w pierwszych 24 h** (v0.1, projekt)

### Mapowanie na wymagania

- ISO 22301:2019 – 7.4
- ISO 22301:2019 – 8.4.3
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.CO
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RC.CO
- DORA – rozporządzenie (UE) 2022/2554 – art. 14

---

## Checklista: komunikacja w pierwszych 24 h

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Dyrektor komunikacji | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan komunikacji kryzysowej

### Kiedy używać

Od aktywacji zespołu kryzysowego.

### Lista kontrolna

1. **Komunikacja:** Wyślij krótki komunikat do kierowników regionów i drogerii (SMS): co się dzieje, co robić, kiedy kolejna informacja.
   _Oczekiwany rezultat:_ Potwierdzenia odbioru
2. **Komunikacja:** Przygotuj komunikat dla pracowników: nie logować się do systemów na prośbę z nieznanych źródeł, zgłaszać podejrzane telefony.
3. **Komunikacja:** Opublikuj komunikat dla klientów (strona, media społecznościowe) zatwierdzony przez zespół kryzysowy.
   _Oczekiwany rezultat:_ Komunikat zatwierdzony
4. **Komunikacja:** Przygotuj odpowiedzi dla infolinii i moderatorów mediów społecznościowych.
5. **Komunikacja:** Wyznacz rzecznika; nikt inny nie wypowiada się w mediach.
6. **Komunikacja:** Poinformuj kluczowych dostawców i przewoźników o trybie awaryjnym zamówień i dostaw.
7. **Komunikacja:** Prowadź dziennik komunikatów (treść, kanał, godzina, zatwierdzający).

### Po zakończeniu

Przekaż wypełnioną checklistę kierownikowi incydentu – jest częścią dokumentacji incydentu.


---

## Plan odtwarzania po awarii (DRP)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Plan | techniczna | 0.1 | projekt | Koordynator BCM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania

### Zakres

Plan obejmuje systemy ICT wspierające procesy krytyczne Rossmann Polska, infrastrukturę i usługi chmurowe.

### Systemy i zdolności odtworzeniowe

| System | Technologie | Wymagane RTO / RPO | Osiągalne RTO / RPO | Kopie | Ośrodek zapasowy |
|---|---|---|---|---|---|
| Tożsamość: Active Directory i Entra ID | Active Directory (Windows Server), Microsoft 365 / Entra ID | 2 h / 15 min | 24 h / 1 h | Kopia stanu systemu DC dziennie, kopia niezmienna | Kontrolery domeny w drugiej lokalizacji |
| Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) | Zapora FortiGate | 2 h / 15 min | 4 h / – | Kopia konfiguracji po każdej zmianie | Klastry HA, łącza zapasowe LTE w drogeriach |
| System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) | Kasy POS i terminale płatnicze (sklep), Microsoft Defender for Endpoint | 2 h / 15 min | 4 h / 15 min | Złoty obraz kasy; transakcje replikowane do centrali | Tryb offline kas |
| Płatności kartowe – terminale i agent rozliczeniowy |  | 2 h / 15 min | 2 h / 0 | Usługa zewnętrzna | Łącze terminali niezależne od sieci centrali |
| ERP: towar, ceny, zakupy, finanse | VMware vSphere / SRM, Microsoft SQL Server, Veeam Backup & Replication | 24 h / 30 min | 2 d / 24 h | Kopia dzienna, kopia niezmienna | Ośrodek zapasowy |
| WMS i sterowanie automatyką centrów dystrybucyjnych | VMware vSphere / SRM, Microsoft SQL Server, Veeam Backup & Replication | 24 h / 4 h | 24 h / 4 h | Kopia co 4 h | Brak – do analizy |
| EDI / B2B z dostawcami | Serwer Linux (RHEL / Ubuntu) | 2 d / 4 h | 24 h / 4 h | Kopia dzienna | – |
| Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) | Kubernetes (Velero), PostgreSQL | 24 h / 30 min | 8 h / 30 min | Kopie Velero i PITR bazy | Druga strefa dostępności |
| Program lojalnościowy Klub Rossmanna (CRM, dane klientów) | PostgreSQL | 24 h / 30 min | 24 h / 1 h | PITR bazy, kopia niezmienna | Replika |
| Microsoft 365: poczta i Teams | Microsoft 365 / Entra ID | 4 h / 1 h | 4 h / 1 h | Microsoft 365 Backup | Usługa SaaS |
| Platforma kopii zapasowych (kopie niezmienne, odizolowane) | Veeam Backup & Replication, Serwer Linux (RHEL / Ubuntu) | – / – | 8 h / 24 h | Repozytorium niezmienne + kopia offline | Druga lokalizacja |
| Kadry i płace | Microsoft SQL Server | 5 d / 24 h | 3 d / 24 h | Kopia dzienna | Ośrodek zapasowy |

### Zgodność z wymaganiami biznesu

| Luka | Proces | System | Wymagane | Osiągalne |
|---|---|---|---|---|
| RTO | Sprzedaż w drogeriach | Tożsamość: Active Directory i Entra ID (zależność) | 2 h | 24 h |
| RTO | Komunikacja kryzysowa i obsługa klienta | Tożsamość: Active Directory i Entra ID (zależność) | 4 h | 24 h |
| RTO | Sprzedaż w drogeriach | Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) | 2 h | 4 h |
| RTO | Sprzedaż w drogeriach | System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) | 2 h | 4 h |
| RTO | Zaopatrzenie drogerii z centrów dystrybucyjnych | ERP: towar, ceny, zakupy, finanse (zależność) | 24 h | 2 d |
| RPO | Zakupy i zarządzanie zapasami | ERP: towar, ceny, zakupy, finanse | 4 h | 24 h |
| RTO | Sprzedaż internetowa i click & collect | ERP: towar, ceny, zakupy, finanse (zależność) | 24 h | 2 d |

### Kolejność odtwarzania

| Kolejność | System | Zależy od | Wymagane RTO |
|---|---|---|---|
| 1 | Tożsamość: Active Directory i Entra ID |  | 2 h |
| 2 | Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) |  | 2 h |
| 3 | System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) | Tożsamość: Active Directory i Entra ID, Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) | 2 h |
| 4 | Płatności kartowe – terminale i agent rozliczeniowy |  | 2 h |
| 5 | Microsoft 365: poczta i Teams | Tożsamość: Active Directory i Entra ID | 4 h |
| 6 | ERP: towar, ceny, zakupy, finanse | Tożsamość: Active Directory i Entra ID | 24 h |
| 7 | WMS i sterowanie automatyką centrów dystrybucyjnych | Tożsamość: Active Directory i Entra ID, Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory), ERP: towar, ceny, zakupy, finanse | 24 h |
| 8 | Program lojalnościowy Klub Rossmanna (CRM, dane klientów) | Tożsamość: Active Directory i Entra ID | 24 h |
| 9 | Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) | ERP: towar, ceny, zakupy, finanse, Program lojalnościowy Klub Rossmanna (CRM, dane klientów) | 24 h |
| 10 | EDI / B2B z dostawcami | ERP: towar, ceny, zakupy, finanse | 2 d |
| 11 | Kadry i płace | Tożsamość: Active Directory i Entra ID | 5 d |
| 12 | Platforma kopii zapasowych (kopie niezmienne, odizolowane) |  | – |

### Architektura odtworzeniowa

Opisz ośrodek zapasowy, replikację, kopie niezmienne, łącza i dostęp administracyjny w trybie awaryjnym (konta break-glass, dokumentacja offline).

### Zespół DR i aktywacja

Kierownik DR decyduje o przełączeniu na wniosek zespołu kryzysowego albo samodzielnie, gdy awaria techniczna wyklucza odtworzenie w miejscu w czasie RTO.

### Procedury i instrukcje odtworzeniowe

- Procedura: **Procedura odtworzenia po ransomware (czyste środowisko)** (v0.1, projekt)
- Procedura: **Procedura odtworzenia systemu** (v0.1, projekt)
- Procedura: **Procedura przełączenia do ośrodka zapasowego** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.30
- ISO/IEC 27001:2022 – A.8.14
- ISO/IEC 27031 – IRBC-1
- ISO/IEC 27031 – IRBC-2
- ISO/IEC 27031 – IRBC-3
- NIST SP 800-34 Rev. 1 – 4
- NIST SP 800-34 Rev. 1 – 5
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RC.RP
- DORA – rozporządzenie (UE) 2022/2554 – art. 11(3)
- DORA – rozporządzenie (UE) 2022/2554 – art. 12
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(c)
- RODO – rozporządzenie (UE) 2016/679 – art. 32(1)(c)
- Ustawa o KSC – KSC-CD

---

## Procedura odtworzenia po ransomware (czyste środowisko)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Dyrektor IT | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP)

### Cel

Odtworzenie usług bez ryzyka ponownego zaszyfrowania: z czystych kopii, w odizolowanym środowisku, z nowymi poświadczeniami.

### Kolejność odtwarzania

| Kolejność | System | Zależy od | Wymagane RTO |
|---|---|---|---|
| 1 | Tożsamość: Active Directory i Entra ID |  | 2 h |
| 2 | Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) |  | 2 h |
| 3 | System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) | Tożsamość: Active Directory i Entra ID, Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) | 2 h |
| 4 | Płatności kartowe – terminale i agent rozliczeniowy |  | 2 h |
| 5 | Microsoft 365: poczta i Teams | Tożsamość: Active Directory i Entra ID | 4 h |
| 6 | ERP: towar, ceny, zakupy, finanse | Tożsamość: Active Directory i Entra ID | 24 h |
| 7 | WMS i sterowanie automatyką centrów dystrybucyjnych | Tożsamość: Active Directory i Entra ID, Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory), ERP: towar, ceny, zakupy, finanse | 24 h |
| 8 | Program lojalnościowy Klub Rossmanna (CRM, dane klientów) | Tożsamość: Active Directory i Entra ID | 24 h |
| 9 | Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) | ERP: towar, ceny, zakupy, finanse, Program lojalnościowy Klub Rossmanna (CRM, dane klientów) | 24 h |
| 10 | EDI / B2B z dostawcami | ERP: towar, ceny, zakupy, finanse | 2 d |
| 11 | Kadry i płace | Tożsamość: Active Directory i Entra ID | 5 d |
| 12 | Platforma kopii zapasowych (kopie niezmienne, odizolowane) |  | – |

### Instrukcje

- Instrukcja: **Checklista: odtworzenie tożsamości (AD / Entra ID) po ransomware** (v0.1, projekt)

### Kroki

1. **Kierownik DR:** Zbuduj izolowane środowisko odtworzeniowe (osobna sieć, nowe stacje administracyjne PAW).
   _Oczekiwany rezultat:_ Środowisko bez połączenia z siecią produkcyjną
2. **Zespół IR:** Wskaż punkt odtworzenia sprzed najwcześniejszego śladu atakującego.
   _Oczekiwany rezultat:_ Punkt zatwierdzony przez kierownika incydentu
3. **Administrator kopii:** Przeskanuj kopie (antywirus, wskaźniki IoC z incydentu) przed odtworzeniem.
   _Oczekiwany rezultat:_ Brak wykryć
4. **Administratorzy:** Odtwórz tożsamość (AD/Entra) jako pierwszą, potem sieć, bazy danych i aplikacje.
5. **Zespół IR:** Usuń podatność użytą do wejścia i wymuś zmianę wszystkich haseł i kluczy.
6. **Kierownik DR:** Przyłączaj strefy do sieci etapami, pod wzmożonym monitoringiem SOC.
   _Oczekiwany rezultat:_ Brak nowych alertów przez 24 h

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- ISO/IEC 27031 – IRBC-3
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RC.RP
- DORA – rozporządzenie (UE) 2022/2554 – art. 12
- RODO – rozporządzenie (UE) 2016/679 – art. 32(1)(c)
- NIST SP 800-34 Rev. 1 – 5

---

## Checklista: odtworzenie tożsamości (AD / Entra ID) po ransomware

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Dyrektor IT | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia po ransomware (czyste środowisko)

### Kiedy używać

Po decyzji o odtworzeniu i wyborze czystego punktu odtworzenia.

### Lista kontrolna

1. **Administrator tożsamości:** Przygotuj odizolowaną sieć odtworzeniową i nowe stacje administracyjne (PAW).
2. **Administrator tożsamości:** Odtwórz po jednym kontrolerze domeny na każdą domenę z kopii sprzed najwcześniejszego śladu atakującego.
   _Oczekiwany rezultat:_ DC uruchomiony w izolacji
3. **Administrator tożsamości:** Przejmij role FSMO, oczyść metadane pozostałych DC.
4. **Administrator tożsamości:** Zresetuj hasło KRBTGT dwukrotnie oraz hasła wszystkich kont uprzywilejowanych i serwisowych.
5. **Administrator tożsamości:** Usuń nieznane konta, członkostwa w grupach uprzywilejowanych, zadania i GPO dodane przez atakującego.
   _Oczekiwany rezultat:_ Raport zmian porównany z kopią referencyjną
6. **Administrator tożsamości:** Zweryfikuj konfigurację synchronizacji z Entra ID i aplikacje z uprawnieniami w chmurze.
7. **Administrator tożsamości:** Odbuduj pozostałe DC od zera (nie z kopii) i włącz replikację.
   _Oczekiwany rezultat:_ repadmin /replsummary bez błędów

### Po zakończeniu

Przekaż wypełnioną checklistę kierownikowi incydentu – jest częścią dokumentacji incydentu.


---

## Procedura odtworzenia systemu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Koordynator BCM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP)

### Cel

Odtworzenie systemu w czasie nie dłuższym niż RTO i do punktu nie wcześniejszego niż RPO.

### Instrukcje technologiczne

- Instrukcja: **Odtworzenie – EDI / B2B z dostawcami · Serwer Linux (RHEL / Ubuntu)** (v0.1, projekt)
- Instrukcja: **Odtworzenie – ERP: towar, ceny, zakupy, finanse · Veeam Backup & Replication** (v0.1, projekt)
- Instrukcja: **Odtworzenie – Microsoft 365: poczta i Teams · Microsoft 365 / Entra ID** (v0.1, projekt)
- Instrukcja: **Odtworzenie – Platforma kopii zapasowych (kopie niezmienne, odizolowane) · Serwer Linux (RHEL / Ubuntu)** (v0.1, projekt)
- Instrukcja: **Odtworzenie – Platforma kopii zapasowych (kopie niezmienne, odizolowane) · Veeam Backup & Replication** (v0.1, projekt)
- Instrukcja: **Odtworzenie – Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) · Zapora FortiGate** (v0.1, projekt)
- Instrukcja: **Odtworzenie – Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) · Kubernetes (Velero)** (v0.1, projekt)
- Instrukcja: **Odtworzenie – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Kasy POS i terminale płatnicze (sklep)** (v0.1, projekt)
- Instrukcja: **Odtworzenie – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Microsoft Defender for Endpoint** (v0.1, projekt)
- Instrukcja: **Odtworzenie – Tożsamość: Active Directory i Entra ID · Active Directory (Windows Server)** (v0.1, projekt)
- Instrukcja: **Odtworzenie – Tożsamość: Active Directory i Entra ID · Microsoft 365 / Entra ID** (v0.1, projekt)
- Instrukcja: **Odtworzenie – WMS i sterowanie automatyką centrów dystrybucyjnych · Veeam Backup & Replication** (v0.1, projekt)

### Kroki

1. **Kierownik DR:** Potwierdź zakres odtworzenia i wybrany punkt odtworzenia z właścicielem biznesowym.
   _Oczekiwany rezultat:_ Zgoda zapisana
2. **Administrator:** Odtwórz komponenty w kolejności zależności, korzystając z instrukcji technologicznych.
3. **Administrator:** Wykonaj weryfikację techniczną (usługi, spójność danych, monitoring).
4. **Właściciel biznesowy:** Wykonaj test akceptacyjny i potwierdź gotowość do pracy.
   _Oczekiwany rezultat:_ Akceptacja z godziną – koniec liczenia RTO
5. **Kierownik DR:** Zapisz rzeczywisty RTO i RPO, zgłoś odchylenia.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37
- ISO/IEC 27001:2022 – A.8.13
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RC.RP
- DORA – rozporządzenie (UE) 2022/2554 – art. 12
- ISO/IEC 27031 – IRBC-3

---

## Odtworzenie – EDI / B2B z dostawcami · Serwer Linux (RHEL / Ubuntu)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół integracji | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Serwer Linux (RHEL / Ubuntu)**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Przywróć dane z wybranej migawki

   ```
   restic -r <repo> restore <id-migawki> --target /
   ```
2. **Administrator:** Uruchom usługi

   ```
   systemctl start <usługa>
   ```
#### Weryfikacja po odtworzeniu

3. **Administrator:** Sprawdź stan usług

   ```
   systemctl --failed
   ```
   _Oczekiwany rezultat:_ 0 loaded units listed

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – ERP: towar, ceny, zakupy, finanse · Veeam Backup & Replication

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół ERP | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Veeam Backup & Replication**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Wybierz punkt przywracania sprzed zdarzenia (przy ransomware: sprzed pierwszych oznak kompromitacji)

   ```
   $rp = Get-VBRRestorePoint -Name "<vm>" | Sort-Object CreationTime -Descending
   ```
   _Oczekiwany rezultat:_ Punkt wskazany i zapisany w dzienniku
2. **Administrator:** Przeskanuj punkt przywracania (Secure Restore) przed przywróceniem do sieci produkcyjnej
   _Oczekiwany rezultat:_ Brak wykryć
3. **Administrator:** Wykonaj Instant Recovery, gdy liczy się RTO, lub pełne odtworzenie VM

   ```
   Start-VBRRestoreVM -RestorePoint $rp[0] -Reason "DR <nr>"
   ```
   _Oczekiwany rezultat:_ VM odtworzona
4. **Administrator:** Przy Instant Recovery zmigruj VM do produkcyjnego magazynu danych
   _Oczekiwany rezultat:_ Migracja zakończona
#### Weryfikacja po odtworzeniu

5. **Administrator:** Uruchom zadanie SureBackup dla odtworzonych maszyn
   _Oczekiwany rezultat:_ Testy heartbeat, ping i aplikacyjne zaliczone

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – Microsoft 365: poczta i Teams · Microsoft 365 / Entra ID

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół infrastruktury | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Microsoft 365 / Entra ID**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Przywróć usuniętą witrynę SharePoint

   ```
   Restore-SPODeletedSite -Identity https://<tenant>.sharepoint.com/sites/<witryna>
   ```
   _Oczekiwany rezultat:_ Witryna dostępna
2. **Administrator:** Przywróć pliki OneDrive/SharePoint do wcześniejszego stanu (funkcja przywracania OneDrive lub Microsoft 365 Backup)
   _Oczekiwany rezultat:_ Pliki w stanie sprzed zdarzenia
3. **Administrator:** Odzyskaj elementy usunięte ze skrzynki

   ```
   Restore-RecoverableItems -Identity <upn> -FilterItemType IPM.Note
   ```

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – Platforma kopii zapasowych (kopie niezmienne, odizolowane) · Serwer Linux (RHEL / Ubuntu)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół infrastruktury | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Serwer Linux (RHEL / Ubuntu)**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Przywróć dane z wybranej migawki

   ```
   restic -r <repo> restore <id-migawki> --target /
   ```
2. **Administrator:** Uruchom usługi

   ```
   systemctl start <usługa>
   ```
#### Weryfikacja po odtworzeniu

3. **Administrator:** Sprawdź stan usług

   ```
   systemctl --failed
   ```
   _Oczekiwany rezultat:_ 0 loaded units listed

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – Platforma kopii zapasowych (kopie niezmienne, odizolowane) · Veeam Backup & Replication

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół infrastruktury | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Veeam Backup & Replication**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Wybierz punkt przywracania sprzed zdarzenia (przy ransomware: sprzed pierwszych oznak kompromitacji)

   ```
   $rp = Get-VBRRestorePoint -Name "<vm>" | Sort-Object CreationTime -Descending
   ```
   _Oczekiwany rezultat:_ Punkt wskazany i zapisany w dzienniku
2. **Administrator:** Przeskanuj punkt przywracania (Secure Restore) przed przywróceniem do sieci produkcyjnej
   _Oczekiwany rezultat:_ Brak wykryć
3. **Administrator:** Wykonaj Instant Recovery, gdy liczy się RTO, lub pełne odtworzenie VM

   ```
   Start-VBRRestoreVM -RestorePoint $rp[0] -Reason "DR <nr>"
   ```
   _Oczekiwany rezultat:_ VM odtworzona
4. **Administrator:** Przy Instant Recovery zmigruj VM do produkcyjnego magazynu danych
   _Oczekiwany rezultat:_ Migracja zakończona
#### Weryfikacja po odtworzeniu

5. **Administrator:** Uruchom zadanie SureBackup dla odtworzonych maszyn
   _Oczekiwany rezultat:_ Testy heartbeat, ping i aplikacyjne zaliczone

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) · Zapora FortiGate

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół sieci | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Zapora FortiGate**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Przywróć konfigurację (urządzenie zrestartuje się)

   ```
   execute restore config tftp <plik> <ip-serwera>
   ```
   _Oczekiwany rezultat:_ Urządzenie działa z przywróconą konfiguracją

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) · Kubernetes (Velero)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół e-commerce | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Kubernetes (Velero)**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Odtwórz zasoby z kopii

   ```
   velero restore create --from-backup <kopia> --wait
   ```
   _Oczekiwany rezultat:_ Phase: Completed
2. **Administrator:** Sprawdź stan podów

   ```
   kubectl get pods -n <ns>
   ```
   _Oczekiwany rezultat:_ Wszystkie pody Running/Ready

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Kasy POS i terminale płatnicze (sklep)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół systemów sklepowych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Kasy POS i terminale płatnicze (sklep)**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Zainstaluj kasę ze sprawdzonego złotego obrazu z czystego repozytorium
   _Oczekiwany rezultat:_ Kasa uruchomiona z obrazu o znanej sumie kontrolnej
2. **Administrator:** Załaduj bazę towarową i cennik z odtworzonego, zweryfikowanego systemu centralnego
   _Oczekiwany rezultat:_ Ceny zgodne z cennikiem wzorcowym
3. **Administrator:** Przyłącz sklep do sieci po potwierdzeniu przez SOC, że segment sklepów jest czysty
#### Weryfikacja po odtworzeniu

4. **Administrator:** Wykonaj transakcję testową gotówkową i kartową oraz zwrot
   _Oczekiwany rezultat:_ Paragon fiskalny i potwierdzenie autoryzacji
5. **Administrator:** Prześlij do centrali dane sprzedaży z trybu offline i uzgodnij raporty dobowe
   _Oczekiwany rezultat:_ Brak rozbieżności w raportach

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Microsoft Defender for Endpoint

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół systemów sklepowych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Microsoft Defender for Endpoint**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Weryfikacja po odtworzeniu

1. **Administrator:** Uruchom pełne skanowanie antywirusowe

   ```
   POST https://api.security.microsoft.com/api/machines/<id>/runAntiVirusScan  {"ScanType":"Full"}
   ```
   _Oczekiwany rezultat:_ Brak wykryć

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – Tożsamość: Active Directory i Entra ID · Active Directory (Windows Server)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół infrastruktury | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Active Directory (Windows Server)**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Przy usuniętych obiektach użyj Kosza AD (jeśli włączony)

   ```
   Get-ADObject -Filter 'Name -like "<nazwa>*"' -IncludeDeletedObjects | Restore-ADObject
   ```
   _Oczekiwany rezultat:_ Obiekt przywrócony
2. **Administrator:** Przy uszkodzeniu kontrolera: odtwórz stan systemu z kopii w trybie DSRM, a następnie wykonaj przywrócenie autorytatywne wybranych obiektów

   ```
   ntdsutil "activate instance ntds" "authoritative restore" "restore subtree <DN>" quit quit
   ```
3. **Administrator:** Przy utracie całego lasu postępuj zgodnie z procedurą odtwarzania lasu AD (pierwszy DC z każdej domeny z zaufanej kopii)
   _Oczekiwany rezultat:_ Las odtworzony z kopii sprzed kompromitacji
#### Weryfikacja po odtworzeniu

4. **Administrator:** Sprawdź replikację AD

   ```
   repadmin /replsummary
   ```
   _Oczekiwany rezultat:_ Brak błędów replikacji
5. **Administrator:** Sprawdź stan kontrolerów

   ```
   dcdiag /v /c
   ```
   _Oczekiwany rezultat:_ Testy zaliczone

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – Tożsamość: Active Directory i Entra ID · Microsoft 365 / Entra ID

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół infrastruktury | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Microsoft 365 / Entra ID**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Przywróć usuniętą witrynę SharePoint

   ```
   Restore-SPODeletedSite -Identity https://<tenant>.sharepoint.com/sites/<witryna>
   ```
   _Oczekiwany rezultat:_ Witryna dostępna
2. **Administrator:** Przywróć pliki OneDrive/SharePoint do wcześniejszego stanu (funkcja przywracania OneDrive lub Microsoft 365 Backup)
   _Oczekiwany rezultat:_ Pliki w stanie sprzed zdarzenia
3. **Administrator:** Odzyskaj elementy usunięte ze skrzynki

   ```
   Restore-RecoverableItems -Identity <upn> -FilterItemType IPM.Note
   ```

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – WMS i sterowanie automatyką centrów dystrybucyjnych · Veeam Backup & Replication

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół systemów logistycznych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura odtworzenia systemu

Technologia: **Veeam Backup & Replication**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Wybierz punkt przywracania sprzed zdarzenia (przy ransomware: sprzed pierwszych oznak kompromitacji)

   ```
   $rp = Get-VBRRestorePoint -Name "<vm>" | Sort-Object CreationTime -Descending
   ```
   _Oczekiwany rezultat:_ Punkt wskazany i zapisany w dzienniku
2. **Administrator:** Przeskanuj punkt przywracania (Secure Restore) przed przywróceniem do sieci produkcyjnej
   _Oczekiwany rezultat:_ Brak wykryć
3. **Administrator:** Wykonaj Instant Recovery, gdy liczy się RTO, lub pełne odtworzenie VM

   ```
   Start-VBRRestoreVM -RestorePoint $rp[0] -Reason "DR <nr>"
   ```
   _Oczekiwany rezultat:_ VM odtworzona
4. **Administrator:** Przy Instant Recovery zmigruj VM do produkcyjnego magazynu danych
   _Oczekiwany rezultat:_ Migracja zakończona
#### Weryfikacja po odtworzeniu

5. **Administrator:** Uruchom zadanie SureBackup dla odtworzonych maszyn
   _Oczekiwany rezultat:_ Testy heartbeat, ping i aplikacyjne zaliczone

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Procedura przełączenia do ośrodka zapasowego

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Koordynator BCM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP)

### Cel

Kontrolowane przełączenie usług do ośrodka zapasowego i powrót.

### Instrukcje technologiczne

- Instrukcja: **Odtworzenie – ERP: towar, ceny, zakupy, finanse · Microsoft SQL Server** (v0.1, projekt)
- Instrukcja: **Odtworzenie – ERP: towar, ceny, zakupy, finanse · VMware vSphere / SRM** (v0.1, projekt)
- Instrukcja: **Odtworzenie – Kadry i płace · Microsoft SQL Server** (v0.1, projekt)
- Instrukcja: **Odtworzenie – Program lojalnościowy Klub Rossmanna (CRM, dane klientów) · PostgreSQL** (v0.1, projekt)
- Instrukcja: **Odtworzenie – Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) · PostgreSQL** (v0.1, projekt)
- Instrukcja: **Odtworzenie – WMS i sterowanie automatyką centrów dystrybucyjnych · Microsoft SQL Server** (v0.1, projekt)
- Instrukcja: **Odtworzenie – WMS i sterowanie automatyką centrów dystrybucyjnych · VMware vSphere / SRM** (v0.1, projekt)

### Kroki

1. **Kierownik DR:** Uzyskaj decyzję o przełączeniu i ogłoś okno zmian.
2. **Administrator sieci:** Potwierdź łączność i dostęp administracyjny w ośrodku zapasowym.
3. **Administratorzy:** Przełącz warstwy: pamięć masowa → bazy danych → aplikacje → ruch sieciowy.
4. **Właściciele biznesowi:** Potwierdź działanie usług.
5. **Kierownik DR:** Zaplanuj powrót (failback) po usunięciu przyczyny awarii.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.14
- ISO/IEC 27031 – IRBC-3
- NIST SP 800-34 Rev. 1 – 5

---

## Odtworzenie – ERP: towar, ceny, zakupy, finanse · Microsoft SQL Server

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół ERP | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura przełączenia do ośrodka zapasowego

Technologia: **Microsoft SQL Server**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Wykonaj kopię ogona dziennika, jeśli baza jest dostępna

   ```
   BACKUP LOG [<db>] TO DISK = N'<ścieżka>\tail.trn' WITH NORECOVERY;
   ```
2. **Administrator:** Odtwórz kopię pełną bez odzyskiwania

   ```
   RESTORE DATABASE [<db>] FROM DISK = N'<ścieżka>\<db>_full.bak' WITH NORECOVERY, REPLACE;
   ```
3. **Administrator:** Odtwórz dzienniki do wskazanego punktu w czasie

   ```
   RESTORE LOG [<db>] FROM DISK = N'<ścieżka>\<db>_log.trn' WITH STOPAT = '<RRRR-MM-DD GG:MM:SS>', NORECOVERY;
   ```
4. **Administrator:** Udostępnij bazę

   ```
   RESTORE DATABASE [<db>] WITH RECOVERY;
   ```
   _Oczekiwany rezultat:_ Baza w stanie ONLINE
#### Przełączenie do ośrodka zapasowego

5. **Administrator:** Sprawdź stan synchronizacji grupy dostępności

   ```
   SELECT ag.name, ars.role_desc, ars.synchronization_health_desc FROM sys.dm_hadr_availability_replica_states ars JOIN sys.availability_groups ag ON ag.group_id = ars.group_id;
   ```
   _Oczekiwany rezultat:_ HEALTHY na replice docelowej
6. **Administrator:** Na replice docelowej wykonaj planowane przełączenie (replika synchroniczna)

   ```
   ALTER AVAILABILITY GROUP [<ag>] FAILOVER;
   ```
   _Oczekiwany rezultat:_ Replika ma rolę PRIMARY
7. **Administrator:** Tylko przy utracie repliki podstawowej i za zgodą właściciela danych: przełączenie wymuszone

   ```
   ALTER AVAILABILITY GROUP [<ag>] FORCE_FAILOVER_ALLOW_DATA_LOSS;
   ```
   _Oczekiwany rezultat:_ Ryzyko utraty danych udokumentowane
#### Weryfikacja po odtworzeniu

8. **Administrator:** Sprawdź spójność bazy

   ```
   DBCC CHECKDB ([<db>]) WITH NO_INFOMSGS;
   ```
   _Oczekiwany rezultat:_ Brak błędów spójności

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – ERP: towar, ceny, zakupy, finanse · VMware vSphere / SRM

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół ERP | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura przełączenia do ośrodka zapasowego

Technologia: **VMware vSphere / SRM**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Przełączenie do ośrodka zapasowego

1. **Administrator:** Potwierdź decyzję o przełączeniu u kierownika DR i zanotuj czas
   _Oczekiwany rezultat:_ Decyzja zapisana w dzienniku zdarzeń
2. **Administrator:** W Site Recovery Manager otwórz plan odtwarzania i uruchom tryb testowy, jeśli pozwala na to czas
   _Oczekiwany rezultat:_ Test planu zakończony bez błędów krytycznych
3. **Administrator:** Uruchom plan odtwarzania w trybie „Disaster recovery” (lub „Planned migration”, gdy ośrodek podstawowy działa)
   _Oczekiwany rezultat:_ Status planu: Recovery complete
4. **Administrator:** Sprawdź kolejność uruchomienia VM zgodnie z priorytetami (bazy → aplikacje → frontend)
   _Oczekiwany rezultat:_ Wszystkie VM w stanie Powered On
5. **Administrator:** Zaktualizuj DNS / balancer, jeśli nie robi tego plan automatycznie
   _Oczekiwany rezultat:_ Nazwy usług wskazują ośrodek zapasowy
#### Powrót do ośrodka podstawowego

6. **Administrator:** Upewnij się, że ośrodek podstawowy jest sprawny i zsynchronizowany
   _Oczekiwany rezultat:_ Replikacja w stanie OK
7. **Administrator:** W SRM wykonaj Reprotect dla planu odtwarzania
   _Oczekiwany rezultat:_ Kierunek ochrony odwrócony
8. **Administrator:** Uruchom Planned migration z powrotem do ośrodka podstawowego w oknie serwisowym
   _Oczekiwany rezultat:_ Usługi działają w ośrodku podstawowym
9. **Administrator:** Ponownie wykonaj Reprotect, aby przywrócić pierwotny kierunek replikacji
   _Oczekiwany rezultat:_ Ochrona aktywna
#### Weryfikacja po odtworzeniu

10. **Administrator:** Sprawdź stan VMware Tools i heartbeat VM

   ```
   Get-VM "<vm>" | Select Name, PowerState, @{N="Tools";E={$_.ExtensionData.Guest.ToolsStatus}}
   ```
   _Oczekiwany rezultat:_ toolsOk, PoweredOn

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – Kadry i płace · Microsoft SQL Server

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Dział HR | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura przełączenia do ośrodka zapasowego

Technologia: **Microsoft SQL Server**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Wykonaj kopię ogona dziennika, jeśli baza jest dostępna

   ```
   BACKUP LOG [<db>] TO DISK = N'<ścieżka>\tail.trn' WITH NORECOVERY;
   ```
2. **Administrator:** Odtwórz kopię pełną bez odzyskiwania

   ```
   RESTORE DATABASE [<db>] FROM DISK = N'<ścieżka>\<db>_full.bak' WITH NORECOVERY, REPLACE;
   ```
3. **Administrator:** Odtwórz dzienniki do wskazanego punktu w czasie

   ```
   RESTORE LOG [<db>] FROM DISK = N'<ścieżka>\<db>_log.trn' WITH STOPAT = '<RRRR-MM-DD GG:MM:SS>', NORECOVERY;
   ```
4. **Administrator:** Udostępnij bazę

   ```
   RESTORE DATABASE [<db>] WITH RECOVERY;
   ```
   _Oczekiwany rezultat:_ Baza w stanie ONLINE
#### Przełączenie do ośrodka zapasowego

5. **Administrator:** Sprawdź stan synchronizacji grupy dostępności

   ```
   SELECT ag.name, ars.role_desc, ars.synchronization_health_desc FROM sys.dm_hadr_availability_replica_states ars JOIN sys.availability_groups ag ON ag.group_id = ars.group_id;
   ```
   _Oczekiwany rezultat:_ HEALTHY na replice docelowej
6. **Administrator:** Na replice docelowej wykonaj planowane przełączenie (replika synchroniczna)

   ```
   ALTER AVAILABILITY GROUP [<ag>] FAILOVER;
   ```
   _Oczekiwany rezultat:_ Replika ma rolę PRIMARY
7. **Administrator:** Tylko przy utracie repliki podstawowej i za zgodą właściciela danych: przełączenie wymuszone

   ```
   ALTER AVAILABILITY GROUP [<ag>] FORCE_FAILOVER_ALLOW_DATA_LOSS;
   ```
   _Oczekiwany rezultat:_ Ryzyko utraty danych udokumentowane
#### Weryfikacja po odtworzeniu

8. **Administrator:** Sprawdź spójność bazy

   ```
   DBCC CHECKDB ([<db>]) WITH NO_INFOMSGS;
   ```
   _Oczekiwany rezultat:_ Brak błędów spójności

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – Program lojalnościowy Klub Rossmanna (CRM, dane klientów) · PostgreSQL

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół CRM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura przełączenia do ośrodka zapasowego

Technologia: **PostgreSQL**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Zatrzymaj instancję i przenieś uszkodzony katalog danych

   ```
   systemctl stop postgresql && mv $PGDATA $PGDATA.broken
   ```
2. **Administrator:** Rozpakuj kopię bazową do katalogu danych

   ```
   tar -xzf /backup/base_<data>/base.tar.gz -C $PGDATA
   ```
3. **Administrator:** Ustaw cel odtworzenia (PITR) w postgresql.conf

   ```
   restore_command = 'cp /archive/%f %p'
   recovery_target_time = '<RRRR-MM-DD GG:MM:SS+00>'
   ```
4. **Administrator:** Utwórz plik sygnału odtwarzania i uruchom instancję

   ```
   touch $PGDATA/recovery.signal && systemctl start postgresql
   ```
   _Oczekiwany rezultat:_ W logu: recovery stopping before commit…
5. **Administrator:** Zakończ odtwarzanie i udostępnij bazę do zapisu

   ```
   psql -c "SELECT pg_wal_replay_resume();"
   ```
   _Oczekiwany rezultat:_ Baza przyjmuje zapisy
6. **Administrator:** Alternatywnie odtwórz kopię logiczną

   ```
   pg_restore -d <db> --clean --if-exists -j 4 /backup/<db>.dump
   ```
#### Przełączenie do ośrodka zapasowego

7. **Administrator:** Sprawdź opóźnienie repliki

   ```
   psql -c "SELECT now() - pg_last_xact_replay_timestamp() AS opoznienie;"
   ```
   _Oczekiwany rezultat:_ Opóźnienie w granicach RPO
8. **Administrator:** Wypromuj replikę do roli podstawowej

   ```
   psql -c "SELECT pg_promote();"
   ```
   _Oczekiwany rezultat:_ pg_is_in_recovery() = false
9. **Administrator:** Przełącz aplikacje na nowy adres (DNS / VIP / pgbouncer)
   _Oczekiwany rezultat:_ Aplikacje łączą się z nowym serwerem
#### Weryfikacja po odtworzeniu

10. **Administrator:** Sprawdź dostępność instancji

   ```
   pg_isready -h <host>
   ```
   _Oczekiwany rezultat:_ accepting connections
11. **Administrator:** Sprawdź spójność indeksów (rozszerzenie amcheck)

   ```
   psql -d <db> -c "SELECT bt_index_check(c.oid) FROM pg_index i JOIN pg_class c ON c.oid = i.indexrelid JOIN pg_am a ON a.oid = c.relam WHERE a.amname = 'btree';"
   ```
   _Oczekiwany rezultat:_ Brak błędów

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) · PostgreSQL

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół e-commerce | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura przełączenia do ośrodka zapasowego

Technologia: **PostgreSQL**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Zatrzymaj instancję i przenieś uszkodzony katalog danych

   ```
   systemctl stop postgresql && mv $PGDATA $PGDATA.broken
   ```
2. **Administrator:** Rozpakuj kopię bazową do katalogu danych

   ```
   tar -xzf /backup/base_<data>/base.tar.gz -C $PGDATA
   ```
3. **Administrator:** Ustaw cel odtworzenia (PITR) w postgresql.conf

   ```
   restore_command = 'cp /archive/%f %p'
   recovery_target_time = '<RRRR-MM-DD GG:MM:SS+00>'
   ```
4. **Administrator:** Utwórz plik sygnału odtwarzania i uruchom instancję

   ```
   touch $PGDATA/recovery.signal && systemctl start postgresql
   ```
   _Oczekiwany rezultat:_ W logu: recovery stopping before commit…
5. **Administrator:** Zakończ odtwarzanie i udostępnij bazę do zapisu

   ```
   psql -c "SELECT pg_wal_replay_resume();"
   ```
   _Oczekiwany rezultat:_ Baza przyjmuje zapisy
6. **Administrator:** Alternatywnie odtwórz kopię logiczną

   ```
   pg_restore -d <db> --clean --if-exists -j 4 /backup/<db>.dump
   ```
#### Przełączenie do ośrodka zapasowego

7. **Administrator:** Sprawdź opóźnienie repliki

   ```
   psql -c "SELECT now() - pg_last_xact_replay_timestamp() AS opoznienie;"
   ```
   _Oczekiwany rezultat:_ Opóźnienie w granicach RPO
8. **Administrator:** Wypromuj replikę do roli podstawowej

   ```
   psql -c "SELECT pg_promote();"
   ```
   _Oczekiwany rezultat:_ pg_is_in_recovery() = false
9. **Administrator:** Przełącz aplikacje na nowy adres (DNS / VIP / pgbouncer)
   _Oczekiwany rezultat:_ Aplikacje łączą się z nowym serwerem
#### Weryfikacja po odtworzeniu

10. **Administrator:** Sprawdź dostępność instancji

   ```
   pg_isready -h <host>
   ```
   _Oczekiwany rezultat:_ accepting connections
11. **Administrator:** Sprawdź spójność indeksów (rozszerzenie amcheck)

   ```
   psql -d <db> -c "SELECT bt_index_check(c.oid) FROM pg_index i JOIN pg_class c ON c.oid = i.indexrelid JOIN pg_am a ON a.oid = c.relam WHERE a.amname = 'btree';"
   ```
   _Oczekiwany rezultat:_ Brak błędów

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – WMS i sterowanie automatyką centrów dystrybucyjnych · Microsoft SQL Server

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół systemów logistycznych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura przełączenia do ośrodka zapasowego

Technologia: **Microsoft SQL Server**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Odtworzenie z kopii

1. **Administrator:** Wykonaj kopię ogona dziennika, jeśli baza jest dostępna

   ```
   BACKUP LOG [<db>] TO DISK = N'<ścieżka>\tail.trn' WITH NORECOVERY;
   ```
2. **Administrator:** Odtwórz kopię pełną bez odzyskiwania

   ```
   RESTORE DATABASE [<db>] FROM DISK = N'<ścieżka>\<db>_full.bak' WITH NORECOVERY, REPLACE;
   ```
3. **Administrator:** Odtwórz dzienniki do wskazanego punktu w czasie

   ```
   RESTORE LOG [<db>] FROM DISK = N'<ścieżka>\<db>_log.trn' WITH STOPAT = '<RRRR-MM-DD GG:MM:SS>', NORECOVERY;
   ```
4. **Administrator:** Udostępnij bazę

   ```
   RESTORE DATABASE [<db>] WITH RECOVERY;
   ```
   _Oczekiwany rezultat:_ Baza w stanie ONLINE
#### Przełączenie do ośrodka zapasowego

5. **Administrator:** Sprawdź stan synchronizacji grupy dostępności

   ```
   SELECT ag.name, ars.role_desc, ars.synchronization_health_desc FROM sys.dm_hadr_availability_replica_states ars JOIN sys.availability_groups ag ON ag.group_id = ars.group_id;
   ```
   _Oczekiwany rezultat:_ HEALTHY na replice docelowej
6. **Administrator:** Na replice docelowej wykonaj planowane przełączenie (replika synchroniczna)

   ```
   ALTER AVAILABILITY GROUP [<ag>] FAILOVER;
   ```
   _Oczekiwany rezultat:_ Replika ma rolę PRIMARY
7. **Administrator:** Tylko przy utracie repliki podstawowej i za zgodą właściciela danych: przełączenie wymuszone

   ```
   ALTER AVAILABILITY GROUP [<ag>] FORCE_FAILOVER_ALLOW_DATA_LOSS;
   ```
   _Oczekiwany rezultat:_ Ryzyko utraty danych udokumentowane
#### Weryfikacja po odtworzeniu

8. **Administrator:** Sprawdź spójność bazy

   ```
   DBCC CHECKDB ([<db>]) WITH NO_INFOMSGS;
   ```
   _Oczekiwany rezultat:_ Brak błędów spójności

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Odtworzenie – WMS i sterowanie automatyką centrów dystrybucyjnych · VMware vSphere / SRM

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół systemów logistycznych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania → Plan odtwarzania po awarii (DRP) → Procedura przełączenia do ośrodka zapasowego

Technologia: **VMware vSphere / SRM**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Przełączenie do ośrodka zapasowego

1. **Administrator:** Potwierdź decyzję o przełączeniu u kierownika DR i zanotuj czas
   _Oczekiwany rezultat:_ Decyzja zapisana w dzienniku zdarzeń
2. **Administrator:** W Site Recovery Manager otwórz plan odtwarzania i uruchom tryb testowy, jeśli pozwala na to czas
   _Oczekiwany rezultat:_ Test planu zakończony bez błędów krytycznych
3. **Administrator:** Uruchom plan odtwarzania w trybie „Disaster recovery” (lub „Planned migration”, gdy ośrodek podstawowy działa)
   _Oczekiwany rezultat:_ Status planu: Recovery complete
4. **Administrator:** Sprawdź kolejność uruchomienia VM zgodnie z priorytetami (bazy → aplikacje → frontend)
   _Oczekiwany rezultat:_ Wszystkie VM w stanie Powered On
5. **Administrator:** Zaktualizuj DNS / balancer, jeśli nie robi tego plan automatycznie
   _Oczekiwany rezultat:_ Nazwy usług wskazują ośrodek zapasowy
#### Powrót do ośrodka podstawowego

6. **Administrator:** Upewnij się, że ośrodek podstawowy jest sprawny i zsynchronizowany
   _Oczekiwany rezultat:_ Replikacja w stanie OK
7. **Administrator:** W SRM wykonaj Reprotect dla planu odtwarzania
   _Oczekiwany rezultat:_ Kierunek ochrony odwrócony
8. **Administrator:** Uruchom Planned migration z powrotem do ośrodka podstawowego w oknie serwisowym
   _Oczekiwany rezultat:_ Usługi działają w ośrodku podstawowym
9. **Administrator:** Ponownie wykonaj Reprotect, aby przywrócić pierwotny kierunek replikacji
   _Oczekiwany rezultat:_ Ochrona aktywna
#### Weryfikacja po odtworzeniu

10. **Administrator:** Sprawdź stan VMware Tools i heartbeat VM

   ```
   Get-VM "<vm>" | Select Name, PowerState, @{N="Tools";E={$_.ExtensionData.Guest.ToolsStatus}}
   ```
   _Oczekiwany rezultat:_ toolsOk, PoweredOn

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Procedura testowania i ćwiczeń

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Koordynator BCM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania ciągłością działania

### Program testów

| Rodzaj | Częstotliwość | Zakres |
|---|---|---|
| Przegląd dokumentacji | 2× w roku | wszystkie plany |
| Ćwiczenie sztabowe (tabletop) | raz w roku | zespół kryzysowy, IRP |
| Test odtworzenia z kopii | raz na kwartał | systemy krytyczne |
| Test przełączenia | raz w roku | DRP |

### Kroki

1. **Koordynator BCM:** Zaplanuj test: cel, zakres, scenariusz, kryteria sukcesu, uczestnicy.
2. **Koordynator BCM:** Uzyskaj zgodę właścicieli i zarządzaj ryzykiem testu (okno, plan wycofania).
3. **Zespół testowy:** Przeprowadź test i rejestruj czasy oraz odchylenia.
4. **Koordynator BCM:** Opracuj raport z wnioskami i działaniami korygującymi.
   _Oczekiwany rezultat:_ Raport zatwierdzony

### Mapowanie na wymagania

- ISO 22301:2019 – 8.5
- ISO 22301:2019 – 8.6
- NIST SP 800-34 Rev. 1 – 6
- ISO/IEC 27031 – IRBC-4
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(f)
- DORA – rozporządzenie (UE) 2022/2554 – art. 11(6)
- DORA – rozporządzenie (UE) 2022/2554 – art. 24
- RODO – rozporządzenie (UE) 2016/679 – art. 32(1)(d)
- PCI DSS v4.0.1 – 12.10.2
- PCI DSS v4.0.1 – 12.10.4

---

## Polityka zarządzania incydentami bezpieczeństwa

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Polityka | biznesowo-techniczna | 0.1 | projekt | Zarząd | 2027-10-17 |

### Cel i zakres

Polityka określa zasady wykrywania, zgłaszania, oceny, obsługi i raportowania incydentów bezpieczeństwa w Rossmann Polska.

### Definicje

- **Zdarzenie** – zaobserwowana zmiana stanu systemu, usługi lub sieci.
- **Incydent** – zdarzenie, które ma lub może mieć niekorzystny wpływ na poufność, integralność lub dostępność.
- **Poważny incydent** – incydent spełniający progi regulacyjne (NIS2/KSC, DORA) lub wewnętrzne kryteria P1.

### Zasady

- Każdy pracownik i dostawca ma obowiązek niezwłocznie zgłaszać zdarzenia.
- Incydenty są klasyfikowane według jednolitej skali priorytetów.
- Obowiązki raportowe do organów są realizowane w terminach ustawowych.
- Dowody są zabezpieczane zgodnie z zasadami łańcucha dowodowego.
- Po każdym incydencie P1/P2 przeprowadza się przegląd poincydentalny.

### Obowiązki raportowe

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

### Role

| Rola | Odpowiedzialność |
|---|---|
| Kierownik incydentu | koordynuje obsługę, decyduje o eskalacji |
| Zespół reagowania (CSIRT/SOC) | analiza, ograniczanie, usuwanie skutków |
| IOD | ocena naruszeń ochrony danych |
| Compliance / prawnik | zgłoszenia do organów |
| Komunikacja | komunikaty wewnętrzne i zewnętrzne |

### Dokumenty powiązane

- Plan: **Plan reagowania na incydenty (IRP)** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.24
- ISO/IEC 27001:2022 – A.6.8
- ISO/IEC 27035 – PLAN
- NIST SP 800-61 Rev. 3 / CSF 2.0 – GV.PO
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(b)
- DORA – rozporządzenie (UE) 2022/2554 – art. 17
- Ustawa o KSC – KSC-OBS
- Ustawa o KSC – KSC-SZBI

---

## Plan reagowania na incydenty (IRP)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Plan | biznesowo-techniczna | 0.1 | projekt | Koordynator BCM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa

### Zakres

Plan opisuje obsługę incydentów bezpieczeństwa w Rossmann Polska od wykrycia do zamknięcia i przeglądu.

### Scenariusz wiodący: ransomware z kradzieżą danych

Największe ryzyko dla Rossmann Polska to atak ransomware z podwójnym wymuszeniem, który jednocześnie:

- zatrzymuje kasy lub odcina drogerie od centrali,
- zatrzymuje WMS i automatykę centrów dystrybucyjnych (zapasy w drogeriach wystarczają na kilka dni),
- wyłącza sklep internetowy i aplikację,
- prowadzi do kradzieży danych członków programu lojalnościowego (milionowa skala) i pracowników.

Wnioski z ataków na Marks & Spencer i Co-op (2025): przestępcy wchodzą przez socjotechnikę wobec helpdesku i przejęcie kont, a skutki – ręczne zamówienia, puste półki, wstrzymana sprzedaż online – trwają tygodniami. Dlatego plan stawia na szybką izolację stref, kanał pozapasmowy, tryb offline drogerii i odtworzenie tożsamości jako pierwszego systemu.

### Klasyfikacja i priorytety

| Priorytet | Kryteria | Czas reakcji |
|---|---|---|
| P1 krytyczny | zatrzymanie procesu krytycznego, wyciek danych wrażliwych, ransomware, możliwy incydent poważny | 15 min, 24/7 |
| P2 wysoki | degradacja procesu krytycznego, przejęcie konta uprzywilejowanego | 1 h |
| P3 średni | incydent ograniczony do jednego systemu niekrytycznego | 4 h robocze |
| P4 niski | zdarzenie bez wpływu | 2 dni robocze |

### Fazy obsługi

1. Przygotowanie
2. Wykrycie i analiza
3. Ograniczenie (izolacja)
4. Usunięcie przyczyny
5. Odtworzenie
6. Działania poincydentalne

### Obowiązki raportowe

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

### Zabezpieczanie dowodów

Dowody zbiera się przed działaniami naprawczymi, jeśli nie zagraża to bezpieczeństwu. Każdy dowód ma kartę z sumą SHA-256, czasem, osobą i miejscem przechowywania.

### Playbooki, procedury i instrukcje

- Procedura: **Playbook: atak ransomware** (v0.1, projekt)
- Procedura: **Procedura decyzyjna – żądanie okupu** (v0.1, projekt)
- Procedura: **Procedura obsługi i zgłaszania incydentu** (v0.1, projekt)
- Procedura: **Procedura obsługi naruszenia ochrony danych osobowych** (v0.1, projekt)
- Procedura: **Procedura przeglądu poincydentalnego** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.24
- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.5.28
- ISO/IEC 27035 – PLAN
- ISO/IEC 27035 – RESPOND
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.MA
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.AN
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.MI
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(b)
- NIS2 – dyrektywa (UE) 2022/2555 – art. 23
- DORA – rozporządzenie (UE) 2022/2554 – art. 17
- DORA – rozporządzenie (UE) 2022/2554 – art. 18
- Ustawa o KSC – KSC-OBS
- PCI DSS v4.0.1 – 12.10.1
- PCI DSS v4.0.1 – 12.10.3
- PCI DSS v4.0.1 – 12.10.6

---

## Playbook: atak ransomware

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | CISO | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP)

### Cel i zakres

Playbook opisuje reakcję Rossmann Polska na atak ransomware: szyfrowanie systemów, kradzież danych z groźbą publikacji (podwójne wymuszenie) lub oba zdarzenia naraz.

### Objawy i wskaźniki

- Pliki ze zmienionym rozszerzeniem i notatka z żądaniem okupu.
- Masowe usuwanie kopii migawkowych (np. `vssadmin delete shadows`), wyłączanie agentów EDR i kopii zapasowych.
- Nietypowe logowania kont uprzywilejowanych, nowe konta administracyjne, zmiany GPO.
- Duży ruch wychodzący, narzędzia synchronizacji z chmurą (np. rclone) – możliwa eksfiltracja.
- Zgłoszenia ze sklepów lub magazynów o masowej niedostępności systemów.

### Zasady

- Nie wyłączaj zasilania zainfekowanych serwerów bez decyzji zespołu IR – utracisz dowody z pamięci.
- Komunikuj się kanałem pozapasmowym: zakładaj, że poczta i komunikator mogą być czytane przez atakujących.
- Nie kontaktuj się z przestępcami bez decyzji Zarządu (procedura decyzyjna).
- Nie przywracaj systemów do sieci, z której nie usunięto atakującego.
- Każda decyzja ma godzinę i autora w dzienniku incydentu.

### Terminy raportowe

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

### Checklisty i instrukcje

- Instrukcja: **Checklista: izolacja sieci i tożsamości (SOC / NOC)** (v0.1, projekt)
- Instrukcja: **Checklista: ocena naruszenia RODO przy kradzieży danych** (v0.1, projekt)
- Instrukcja: **Checklista: pierwsza godzina – kierownik incydentu** (v0.1, projekt)

### Kroki

#### 1 · 0–15 min · Wykrycie

1. **SOC:** Potwierdź objawy, zarejestruj incydent jako P1 i zapisz czas wykrycia.
   _Oczekiwany rezultat:_ Numer incydentu i czas wykrycia
2. **SOC:** Powiadom kierownika incydentu i CISO telefonicznie lub kanałem pozapasmowym.
   _Oczekiwany rezultat:_ Potwierdzenie odbioru
3. **Kierownik incydentu:** Uruchom zegar raportowy i zwołaj zespół kryzysowy (cel: 30 min).
   _Oczekiwany rezultat:_ Zespół zebrany
#### 2 · 15 min–2 h · Ograniczenie

4. **SOC / NOC:** Odizoluj zainfekowane hosty w EDR i zablokuj ruch między strefami (sklepy, centrala, magazyny) według checklisty izolacji.
   _Oczekiwany rezultat:_ Rozprzestrzenianie zatrzymane
5. **Administrator tożsamości:** Wyłącz przejęte konta, ogranicz konta uprzywilejowane do zespołu IR, rozważ wstrzymanie synchronizacji z chmurą.
6. **Administrator kopii:** Odetnij repozytoria kopii od sieci produkcyjnej, zmień poświadczenia konsoli i potwierdź stan kopii niezmiennych.
   _Oczekiwany rezultat:_ Kopie niezmienne nienaruszone
7. **Zespół IR:** Zabezpiecz dowody: pamięć, logi, notatkę okupu, próbkę złośliwego oprogramowania.
   _Oczekiwany rezultat:_ Karty dowodów z sumami SHA-256
8. **Kierownik incydentu:** Zdecyduj o odcięciu internetu lub VPN dla stref objętych incydentem i zapisz decyzję.
   _Oczekiwany rezultat:_ Decyzja z godziną
#### 3 · 2–24 h · Ocena i decyzje

9. **Zespół IR:** Ustal zakres: wektor wejścia, przejęte konta, zaszyfrowane systemy, ślady eksfiltracji, najwcześniejszy ślad atakującego.
   _Oczekiwany rezultat:_ Wstępny raport zakresu
10. **IOD:** Oceń naruszenie ochrony danych osobowych (klienci, pracownicy) według checklisty RODO.
   _Oczekiwany rezultat:_ Decyzja o zgłoszeniu do UODO
11. **Zespół kryzysowy:** Uruchom tryb awaryjny procesów: sprzedaż w sklepach offline, dostawy awaryjne, komunikacja z klientami.
12. **Compliance:** Przygotuj zgłoszenia w terminach; powiadom ubezpieczyciela cyber, agenta rozliczeniowego (PCI DSS) i policję (CBZC).
   _Oczekiwany rezultat:_ Potwierdzenia wysłania
13. **Zarząd:** Rozstrzygnij kwestię żądania okupu zgodnie z procedurą decyzyjną.
   _Oczekiwany rezultat:_ Uchwała lub notatka decyzyjna
#### 4 · Usunięcie i odtworzenie

14. **Zespół IR:** Usuń mechanizmy utrzymania dostępu (konta, zadania, GPO), zresetuj KRBTGT dwukrotnie, zmień hasła i sekrety.
15. **Kierownik DR:** Odtwarzaj w czystym środowisku: tożsamość → sieć i zapory → bazy danych → ERP/WMS → kasy → e-commerce.
   _Oczekiwany rezultat:_ Usługi odtworzone w kolejności
16. **Właściciele procesów:** Zaakceptuj działanie usług i uzgodnij dane z trybu awaryjnego.
   _Oczekiwany rezultat:_ Akceptacja z godziną
#### 5 · Po incydencie

17. **Kierownik incydentu:** Utrzymaj wzmożony monitoring przez 30 dni, przygotuj raport końcowy i przegląd poincydentalny.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.5.28
- ISO/IEC 27035 – RESPOND
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.MA
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.AN
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.MI
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RC.RP
- PCI DSS v4.0.1 – 12.10.1
- PCI DSS v4.0.1 – 12.10.5
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(b)
- Ustawa o KSC – KSC-OBS

---

## Checklista: izolacja sieci i tożsamości (SOC / NOC)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Playbook: atak ransomware

### Kiedy używać

Po decyzji o izolacji lub samodzielnie, gdy szyfrowanie trwa.

### Lista kontrolna

#### 1 · Sieć

1. **NOC:** Zablokuj ruch między strefami: drogerie ↔ centrala ↔ centra dystrybucyjne ↔ ośrodek zapasowy.
   _Oczekiwany rezultat:_ Reguły aktywne na zaporach
2. **NOC:** Ogranicz ruch wychodzący do internetu ze stref serwerowych (przerwanie eksfiltracji i C2).
3. **NOC:** Wyłącz dostęp VPN dla wszystkich poza zespołem IR; zablokuj dostęp zdalny dostawców.
4. **NOC:** Zachowaj łącza terminali płatniczych, jeśli nie są objęte incydentem.
   _Oczekiwany rezultat:_ Płatności kartowe działają
#### 2 · Hosty

5. **SOC:** Odizoluj w EDR hosty z objawami szyfrowania lub zdalnego wykonywania poleceń.
6. **SOC:** Zablokuj wykonywanie znanych narzędzi atakujących (PsExec, rclone, AnyDesk) politykami EDR.
#### 3 · Tożsamość

7. **Administrator tożsamości:** Wyłącz konta podejrzane o przejęcie i unieważnij ich sesje w chmurze.
8. **Administrator tożsamości:** Zmień hasła kont break-glass i kont serwisowych kopii zapasowych; przechowuj je offline.
9. **Administrator tożsamości:** Zablokuj helpdeskowi reset haseł i MFA bez weryfikacji tożsamości przez przełożonego.
   _Oczekiwany rezultat:_ Komunikat do helpdesku
#### 4 · Kopie

10. **Administrator kopii:** Odłącz repozytoria kopii od domeny i sieci produkcyjnej; potwierdź kopie niezmienne.
   _Oczekiwany rezultat:_ Lista dostępnych punktów odtworzenia

### Po zakończeniu

Przekaż wypełnioną checklistę kierownikowi incydentu – jest częścią dokumentacji incydentu.


---

## Checklista: ocena naruszenia RODO przy kradzieży danych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Inspektor Ochrony Danych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Playbook: atak ransomware

### Kiedy używać

Gdy istnieje podejrzenie, że atakujący skopiowali dane (wpis na stronie wycieków, ruch wychodzący, deklaracja przestępców).

### Lista kontrolna

1. **IOD:** Zapisz moment stwierdzenia naruszenia – od niego liczy się 72 h na zgłoszenie do UODO.
2. **IOD:** Ustal zbiory, których mogło dotyczyć naruszenie: Klub Rossmanna, zamówienia online, pracownicy, kandydaci.
   _Oczekiwany rezultat:_ Lista zbiorów
3. **IOD:** Ustal kategorie danych i liczbę osób (szacunek, jeśli brak pewności) – także dane szczególnych kategorii wynikające z historii zakupów.
4. **IOD:** Oceń ryzyko dla osób: phishing podszywający się pod markę, kradzież tożsamości, utrata poufności.
   _Oczekiwany rezultat:_ Ocena ryzyka udokumentowana
5. **IOD:** Przygotuj zgłoszenie do UODO; przy braku pełnych informacji zgłoś etapami.
   _Oczekiwany rezultat:_ Potwierdzenie zgłoszenia
6. **Komunikacja:** Przy wysokim ryzyku przygotuj zawiadomienie klientów i ostrzeżenie przed fałszywymi wiadomościami.
7. **IOD:** Wpisz naruszenie do rejestru naruszeń.
   _Oczekiwany rezultat:_ Wpis w rejestrze

### Po zakończeniu

Przekaż wypełnioną checklistę kierownikowi incydentu – jest częścią dokumentacji incydentu.


---

## Checklista: pierwsza godzina – kierownik incydentu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | CISO | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Playbook: atak ransomware

### Kiedy używać

Natychmiast po potwierdzeniu objawów ransomware.

### Lista kontrolna

1. **Kierownik incydentu:** Zapisz czas wykrycia i numer incydentu; ustaw zegar raportowy w BCM Studio.
   _Oczekiwany rezultat:_ Czas wykrycia zapisany
2. **Kierownik incydentu:** Przełącz komunikację zespołu na kanał pozapasmowy (telefony, grupa awaryjna poza M365).
   _Oczekiwany rezultat:_ Wszyscy członkowie potwierdzili
3. **Kierownik incydentu:** Zwołaj zespół kryzysowy: Zarząd, CISO, Dyrektor IT, operacje sklepowe, logistyka, IOD, prawny, komunikacja.
   _Oczekiwany rezultat:_ Zespół zebrany w 30 min
4. **Kierownik incydentu:** Zatwierdź izolację stref (checklista izolacji) i zapisz decyzję z godziną.
5. **Kierownik incydentu:** Wyznacz osobę prowadzącą dziennik incydentu (decyzje, czasy, autorzy).
6. **Kierownik incydentu:** Uruchom wsparcie zewnętrzne: zespół IR z umowy retainer, ubezpieczyciel cyber.
   _Oczekiwany rezultat:_ Potwierdzenie przyjęcia zlecenia
7. **Kierownik incydentu:** Polecenie dla drogerii: przejście w tryb awaryjny zgodnie z procedurą pracy offline.
8. **Kierownik incydentu:** Wstrzymaj zmiany i wdrożenia w całej organizacji do odwołania.

### Po zakończeniu

Przekaż wypełnioną checklistę kierownikowi incydentu – jest częścią dokumentacji incydentu.


---

## Procedura decyzyjna – żądanie okupu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowa | 0.1 | projekt | Prezes Zarządu | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP)

### Zasada

Rossmann Polska domyślnie nie płaci okupu. Odstępstwo może zatwierdzić wyłącznie Zarząd, po analizie prawnej i bez naruszenia sankcji.

### Kryteria oceny

| Kryterium | Pytanie |
|---|---|
| Odtworzenie | Czy odtworzymy procesy krytyczne z kopii w czasie MTPD? |
| Ludzie | Czy zagrożone jest życie lub zdrowie? |
| Sankcje | Czy odbiorca lub portfel znajduje się na listach sankcyjnych (UE, ONZ, OFAC)? |
| Organy | Jakie jest stanowisko policji (CBZC)? |
| Ubezpieczenie | Co mówi polisa cyber i ubezpieczyciel? |
| Skuteczność | Brak gwarancji odszyfrowania i usunięcia danych; ryzyko ponownego ataku. |

### Kroki

1. **Kierownik incydentu:** Przedstaw Zarządowi stan odtworzenia z kopii i szacowany czas powrotu procesów krytycznych.
2. **Dział prawny:** Sprawdź listy sankcyjne i obowiązki prawne; przygotuj opinię.
   _Oczekiwany rezultat:_ Opinia na piśmie
3. **Compliance:** Zgłoś przestępstwo policji (CBZC) i poinformuj ubezpieczyciela.
   _Oczekiwany rezultat:_ Numer sprawy
4. **Zarząd:** Podejmij i udokumentuj decyzję z uzasadnieniem.
   _Oczekiwany rezultat:_ Uchwała
5. **Kierownik incydentu:** Kontakt z przestępcami prowadzi wyłącznie wyznaczony negocjator, wszystkie wiadomości są archiwizowane.

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.2
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.MA

---

## Procedura obsługi i zgłaszania incydentu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Koordynator BCM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP)

### Cel

Jednolita obsługa incydentu od zgłoszenia do raportu dla organu.

### Terminy raportowe

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

### Instrukcje

- Instrukcja: **Izolacja i dowody – EDI / B2B z dostawcami · Serwer Linux (RHEL / Ubuntu)** (v0.1, projekt)
- Instrukcja: **Izolacja i dowody – ERP: towar, ceny, zakupy, finanse · VMware vSphere / SRM** (v0.1, projekt)
- Instrukcja: **Izolacja i dowody – Microsoft 365: poczta i Teams · Microsoft 365 / Entra ID** (v0.1, projekt)
- Instrukcja: **Izolacja i dowody – Platforma kopii zapasowych (kopie niezmienne, odizolowane) · Serwer Linux (RHEL / Ubuntu)** (v0.1, projekt)
- Instrukcja: **Izolacja i dowody – Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) · Zapora FortiGate** (v0.1, projekt)
- Instrukcja: **Izolacja i dowody – Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) · Kubernetes (Velero)** (v0.1, projekt)
- Instrukcja: **Izolacja i dowody – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Kasy POS i terminale płatnicze (sklep)** (v0.1, projekt)
- Instrukcja: **Izolacja i dowody – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Microsoft Defender for Endpoint** (v0.1, projekt)
- Instrukcja: **Izolacja i dowody – Tożsamość: Active Directory i Entra ID · Active Directory (Windows Server)** (v0.1, projekt)
- Instrukcja: **Izolacja i dowody – Tożsamość: Active Directory i Entra ID · Microsoft 365 / Entra ID** (v0.1, projekt)
- Instrukcja: **Izolacja i dowody – WMS i sterowanie automatyką centrów dystrybucyjnych · VMware vSphere / SRM** (v0.1, projekt)

### Kroki

1. **SOC / dyżur:** Zarejestruj zdarzenie, nadaj numer i zapisz czas wykrycia.
   _Oczekiwany rezultat:_ Wpis w rejestrze incydentów
2. **SOC:** Wykonaj triaż: czy to incydent? Nadaj priorytet P1–P4.
3. **Kierownik incydentu:** Oceń, czy incydent spełnia kryteria poważnego (NIS2/KSC, DORA) lub naruszenia danych osobowych (RODO). Uruchom zegar raportowy.
   _Oczekiwany rezultat:_ Decyzja kwalifikacyjna z godziną
4. **Zespół reagowania:** Zabezpiecz dowody i odizoluj zasoby zgodnie z instrukcjami technicznymi.
5. **Compliance:** Wyślij wczesne ostrzeżenie / zgłoszenie wstępne w terminie.
   _Oczekiwany rezultat:_ Potwierdzenie przyjęcia zgłoszenia
6. **Zespół reagowania:** Usuń przyczynę, odtwórz usługi, monitoruj ponowne wystąpienie.
7. **Kierownik incydentu:** Zamknij incydent, przygotuj raport końcowy i zwołaj przegląd poincydentalny.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.25
- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.6.8
- ISO/IEC 27035 – DETECT
- ISO/IEC 27035 – ASSESS
- NIST SP 800-61 Rev. 3 / CSF 2.0 – DE.AE
- NIS2 – dyrektywa (UE) 2022/2555 – art. 23
- DORA – rozporządzenie (UE) 2022/2554 – art. 18
- DORA – rozporządzenie (UE) 2022/2554 – art. 19
- Ustawa o KSC – KSC-ZGL

---

## Izolacja i dowody – EDI / B2B z dostawcami · Serwer Linux (RHEL / Ubuntu)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół integracji | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Procedura obsługi i zgłaszania incydentu

Technologia: **Serwer Linux (RHEL / Ubuntu)**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Izolacja (incydent)

1. **Administrator:** Zablokuj ruch, zostawiając dostęp z jump-hosta zespołu IR

   ```
   nft add table inet ir && nft add chain inet ir in "{ type filter hook input priority -10; policy drop; }" && nft add rule inet ir in ip saddr <ip-ir> accept
   ```
   _Oczekiwany rezultat:_ Host dostępny tylko dla IR
#### Zabezpieczenie dowodów

2. **Administrator:** Zabezpiecz dane ulotne przed wyłączeniem

   ```
   date; uptime; ss -tunap; ps auxf; last -a > /mnt/dowody/volatile.txt
   ```
3. **Administrator:** Wykonaj obraz dysku i policz sumę kontrolną

   ```
   dd if=/dev/<dysk> of=/mnt/dowody/<host>.img bs=4M status=progress && sha256sum /mnt/dowody/<host>.img
   ```
   _Oczekiwany rezultat:_ Suma zapisana w karcie dowodu

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Izolacja i dowody – ERP: towar, ceny, zakupy, finanse · VMware vSphere / SRM

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół ERP | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Procedura obsługi i zgłaszania incydentu

Technologia: **VMware vSphere / SRM**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Izolacja (incydent)

1. **Administrator:** Odłącz kartę sieciową VM lub przenieś ją do grupy portów kwarantanny

   ```
   Get-VM "<vm>" | Get-NetworkAdapter | Set-NetworkAdapter -Connected:$false -Confirm:$false
   ```
   _Oczekiwany rezultat:_ VM bez łączności sieciowej
2. **Administrator:** Nie wyłączaj VM przed zabezpieczeniem pamięci, chyba że zespół IR zdecyduje inaczej
#### Zabezpieczenie dowodów

3. **Administrator:** Utwórz snapshot z pamięcią (zachowuje stan RAM w pliku .vmem)

   ```
   New-Snapshot -VM "<vm>" -Name "IR-<nr-incydentu>" -Memory
   ```
   _Oczekiwany rezultat:_ Snapshot utworzony
4. **Administrator:** Skopiuj pliki VM (vmx, vmdk, vmem, vmsn) na nośnik dowodowy i policz sumy SHA-256

   ```
   sha256sum *.vmdk *.vmem > hashes.txt
   ```
   _Oczekiwany rezultat:_ Sumy kontrolne zapisane w karcie dowodu

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Izolacja i dowody – Microsoft 365: poczta i Teams · Microsoft 365 / Entra ID

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół infrastruktury | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Procedura obsługi i zgłaszania incydentu

Technologia: **Microsoft 365 / Entra ID**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Izolacja (incydent)

1. **Administrator:** Unieważnij sesje użytkownika

   ```
   Revoke-MgUserSignInSession -UserId <upn>
   ```
   _Oczekiwany rezultat:_ Tokeny odświeżania unieważnione
2. **Administrator:** Zablokuj logowanie konta

   ```
   Update-MgUser -UserId <upn> -AccountEnabled:$false
   ```
   _Oczekiwany rezultat:_ Konto zablokowane
3. **Administrator:** Zresetuj hasło i metody MFA, usuń nieznane reguły skrzynki i aplikacje z uprawnieniami

   ```
   Get-InboxRule -Mailbox <upn>
   ```
   _Oczekiwany rezultat:_ Brak podejrzanych reguł przekierowań
#### Zabezpieczenie dowodów

4. **Administrator:** Wyszukaj zdarzenia w ujednoliconym dzienniku audytu

   ```
   Search-UnifiedAuditLog -StartDate <od> -EndDate <do> -UserIds <upn> -ResultSize 5000 | Export-Csv audit.csv
   ```
   _Oczekiwany rezultat:_ Eksport CSV z sumą SHA-256
5. **Administrator:** Wyeksportuj logi logowania Entra ID dla okresu incydentu

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Izolacja i dowody – Platforma kopii zapasowych (kopie niezmienne, odizolowane) · Serwer Linux (RHEL / Ubuntu)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół infrastruktury | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Procedura obsługi i zgłaszania incydentu

Technologia: **Serwer Linux (RHEL / Ubuntu)**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Izolacja (incydent)

1. **Administrator:** Zablokuj ruch, zostawiając dostęp z jump-hosta zespołu IR

   ```
   nft add table inet ir && nft add chain inet ir in "{ type filter hook input priority -10; policy drop; }" && nft add rule inet ir in ip saddr <ip-ir> accept
   ```
   _Oczekiwany rezultat:_ Host dostępny tylko dla IR
#### Zabezpieczenie dowodów

2. **Administrator:** Zabezpiecz dane ulotne przed wyłączeniem

   ```
   date; uptime; ss -tunap; ps auxf; last -a > /mnt/dowody/volatile.txt
   ```
3. **Administrator:** Wykonaj obraz dysku i policz sumę kontrolną

   ```
   dd if=/dev/<dysk> of=/mnt/dowody/<host>.img bs=4M status=progress && sha256sum /mnt/dowody/<host>.img
   ```
   _Oczekiwany rezultat:_ Suma zapisana w karcie dowodu

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Izolacja i dowody – Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) · Zapora FortiGate

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół sieci | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Procedura obsługi i zgłaszania incydentu

Technologia: **Zapora FortiGate**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Izolacja (incydent)

1. **Administrator:** Dodaj adres do grupy blokowanej w polityce kwarantanny lub przenieś port do VLAN kwarantanny
   _Oczekiwany rezultat:_ Ruch hosta zablokowany

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Izolacja i dowody – Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) · Kubernetes (Velero)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół e-commerce | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Procedura obsługi i zgłaszania incydentu

Technologia: **Kubernetes (Velero)**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Izolacja (incydent)

1. **Administrator:** Zastosuj politykę sieciową blokującą cały ruch w przestrzeni nazw

   ```
   kubectl apply -n <ns> -f deny-all.yaml
   ```
   _Oczekiwany rezultat:_ Ruch zablokowany
2. **Administrator:** Wyłącz węzeł z planowania

   ```
   kubectl cordon <węzeł>
   ```
   _Oczekiwany rezultat:_ SchedulingDisabled
#### Zabezpieczenie dowodów

3. **Administrator:** Zabezpiecz logi i opis podejrzanego poda

   ```
   kubectl logs <pod> -n <ns> --all-containers > pod.log && kubectl describe pod <pod> -n <ns> > pod.txt
   ```

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Izolacja i dowody – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Kasy POS i terminale płatnicze (sklep)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół systemów sklepowych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Procedura obsługi i zgłaszania incydentu

Technologia: **Kasy POS i terminale płatnicze (sklep)**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Izolacja (incydent)

1. **Administrator:** Odetnij sklep od sieci centrali (reguła na routerze / SD-WAN), pozostaw łącze terminali płatniczych, jeśli nie jest objęte incydentem
   _Oczekiwany rezultat:_ Kasy bez połączenia z centralą, terminale autoryzują transakcje
2. **Administrator:** Przełącz kasy w tryb offline zgodnie z dokumentacją producenta systemu kasowego
   _Oczekiwany rezultat:_ Sprzedaż możliwa bez połączenia z centralą
3. **Administrator:** Nie restartuj i nie formatuj kas z objawami szyfrowania – oznacz je i odłóż do analizy
#### Zabezpieczenie dowodów

4. **Administrator:** Sfotografuj ekran z notatką okupu i zapisz godzinę oraz numer kasy
   _Oczekiwany rezultat:_ Zdjęcie w zgłoszeniu incydentu
5. **Administrator:** Zabezpiecz dysk zainfekowanej kasy (wymontowanie lub obraz) przed ponowną instalacją
   _Oczekiwany rezultat:_ Nośnik z kartą dowodu i sumą SHA-256

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Izolacja i dowody – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Microsoft Defender for Endpoint

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół systemów sklepowych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Procedura obsługi i zgłaszania incydentu

Technologia: **Microsoft Defender for Endpoint**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Izolacja (incydent)

1. **Administrator:** Odizoluj urządzenie (pełna izolacja) z portalu Defender lub przez API

   ```
   POST https://api.security.microsoft.com/api/machines/<id>/isolate  {"Comment":"IR-<nr>","IsolationType":"Full"}
   ```
   _Oczekiwany rezultat:_ Status: Isolated
#### Zabezpieczenie dowodów

2. **Administrator:** Pobierz pakiet dochodzeniowy

   ```
   POST https://api.security.microsoft.com/api/machines/<id>/collectInvestigationPackage
   ```
   _Oczekiwany rezultat:_ Pakiet dostępny do pobrania

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Izolacja i dowody – Tożsamość: Active Directory i Entra ID · Active Directory (Windows Server)

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół infrastruktury | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Procedura obsługi i zgłaszania incydentu

Technologia: **Active Directory (Windows Server)**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Izolacja (incydent)

1. **Administrator:** Zablokuj przejęte konta

   ```
   Disable-ADAccount -Identity <konto>
   ```
   _Oczekiwany rezultat:_ Konto wyłączone
2. **Administrator:** Zresetuj hasło konta KRBTGT dwukrotnie, z odstępem co najmniej równym maks. czasowi życia biletu (domyślnie 10 h)
   _Oczekiwany rezultat:_ Bilety Kerberos unieważnione
3. **Administrator:** Zresetuj hasła kont uprzywilejowanych i usługowych
#### Zabezpieczenie dowodów

4. **Administrator:** Wyeksportuj dzienniki zabezpieczeń kontrolerów domeny

   ```
   wevtutil epl Security C:\Dowody\<dc>-security.evtx
   ```
   _Oczekiwany rezultat:_ Plik .evtx z sumą SHA-256

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Izolacja i dowody – Tożsamość: Active Directory i Entra ID · Microsoft 365 / Entra ID

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół infrastruktury | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Procedura obsługi i zgłaszania incydentu

Technologia: **Microsoft 365 / Entra ID**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Izolacja (incydent)

1. **Administrator:** Unieważnij sesje użytkownika

   ```
   Revoke-MgUserSignInSession -UserId <upn>
   ```
   _Oczekiwany rezultat:_ Tokeny odświeżania unieważnione
2. **Administrator:** Zablokuj logowanie konta

   ```
   Update-MgUser -UserId <upn> -AccountEnabled:$false
   ```
   _Oczekiwany rezultat:_ Konto zablokowane
3. **Administrator:** Zresetuj hasło i metody MFA, usuń nieznane reguły skrzynki i aplikacje z uprawnieniami

   ```
   Get-InboxRule -Mailbox <upn>
   ```
   _Oczekiwany rezultat:_ Brak podejrzanych reguł przekierowań
#### Zabezpieczenie dowodów

4. **Administrator:** Wyszukaj zdarzenia w ujednoliconym dzienniku audytu

   ```
   Search-UnifiedAuditLog -StartDate <od> -EndDate <do> -UserIds <upn> -ResultSize 5000 | Export-Csv audit.csv
   ```
   _Oczekiwany rezultat:_ Eksport CSV z sumą SHA-256
5. **Administrator:** Wyeksportuj logi logowania Entra ID dla okresu incydentu

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Izolacja i dowody – WMS i sterowanie automatyką centrów dystrybucyjnych · VMware vSphere / SRM

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Zespół systemów logistycznych | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP) → Procedura obsługi i zgłaszania incydentu

Technologia: **VMware vSphere / SRM**

### Warunki wstępne

- Dostęp administracyjny (konto awaryjne, MFA).
- Dostęp do dokumentacji offline i haseł w sejfie.
- Zgoda kierownika DR / kierownika incydentu.

### Kroki

#### Izolacja (incydent)

1. **Administrator:** Odłącz kartę sieciową VM lub przenieś ją do grupy portów kwarantanny

   ```
   Get-VM "<vm>" | Get-NetworkAdapter | Set-NetworkAdapter -Connected:$false -Confirm:$false
   ```
   _Oczekiwany rezultat:_ VM bez łączności sieciowej
2. **Administrator:** Nie wyłączaj VM przed zabezpieczeniem pamięci, chyba że zespół IR zdecyduje inaczej
#### Zabezpieczenie dowodów

3. **Administrator:** Utwórz snapshot z pamięcią (zachowuje stan RAM w pliku .vmem)

   ```
   New-Snapshot -VM "<vm>" -Name "IR-<nr-incydentu>" -Memory
   ```
   _Oczekiwany rezultat:_ Snapshot utworzony
4. **Administrator:** Skopiuj pliki VM (vmx, vmdk, vmem, vmsn) na nośnik dowodowy i policz sumy SHA-256

   ```
   sha256sum *.vmdk *.vmem > hashes.txt
   ```
   _Oczekiwany rezultat:_ Sumy kontrolne zapisane w karcie dowodu

### Po wykonaniu

Zapisz czasy, wynik i odchylenia w dzienniku. Zgłoś zakończenie kierownikowi DR.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.37

---

## Procedura obsługi naruszenia ochrony danych osobowych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowa | 0.1 | projekt | Koordynator BCM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP)

### Cel

Spełnienie obowiązków z art. 33–34 RODO.

### Kroki

1. **Każdy pracownik:** Niezwłocznie zgłoś podejrzenie naruszenia do IOD.
2. **IOD:** Zapisz moment stwierdzenia naruszenia – od niego liczy się 72 h.
3. **IOD:** Oceń ryzyko naruszenia praw lub wolności osób (kategorie danych, liczba osób, skutki).
   _Oczekiwany rezultat:_ Ocena ryzyka udokumentowana
4. **IOD / administrator:** Jeśli ryzyko występuje – zgłoś naruszenie Prezesowi UODO w ciągu 72 h.
   _Oczekiwany rezultat:_ Potwierdzenie zgłoszenia
5. **Administrator:** Przy wysokim ryzyku zawiadom osoby, których dane dotyczą, bez zbędnej zwłoki.
6. **IOD:** Wpisz naruszenie do rejestru naruszeń niezależnie od decyzji o zgłoszeniu.
   _Oczekiwany rezultat:_ Wpis w rejestrze

### Mapowanie na wymagania

- RODO – rozporządzenie (UE) 2016/679 – art. 33
- RODO – rozporządzenie (UE) 2016/679 – art. 33(5)
- RODO – rozporządzenie (UE) 2016/679 – art. 34

---

## Procedura przeglądu poincydentalnego

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Koordynator BCM | 2027-10-17 |

Dokument nadrzędny: Polityka zarządzania incydentami bezpieczeństwa → Plan reagowania na incydenty (IRP)

### Cel

Wyciąganie wniosków z incydentów i testów oraz doskonalenie planów.

### Kroki

1. **Kierownik incydentu:** Zwołaj przegląd w ciągu 10 dni roboczych od zamknięcia incydentu P1/P2.
2. **Uczestnicy:** Odtwórz oś czasu, przyczynę źródłową i skuteczność reakcji (bez szukania winnych).
3. **Koordynator BCM:** Wpisz działania korygujące z właścicielem i terminem; zaktualizuj plany.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.27
- ISO/IEC 27035 – LEARN
- NIST SP 800-61 Rev. 3 / CSF 2.0 – ID.IM
- ISO 22301:2019 – 10.1

---

## Polityka kopii zapasowych i odtwarzania

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Polityka | biznesowo-techniczna | 0.1 | projekt | Zarząd | 2027-10-17 |

### Cel

Zapewnienie możliwości odtworzenia danych i systemów Rossmann Polska w czasie i do punktu wymaganego przez BIA.

### Zasady

- Reguła 3-2-1-1-0: 3 kopie, 2 rodzaje nośników, 1 poza siedzibą, 1 niezmienna lub odizolowana, 0 błędów weryfikacji.
- Częstotliwość i retencja kopii wynikają z RPO systemu.
- Kopie są szyfrowane; klucze przechowywane oddzielnie.
- Odtwarzanie testuje się co najmniej raz na kwartał dla systemów krytycznych.
- Dostęp do konsoli kopii wymaga MFA i oddzielnych kont.

### Wymagania dla systemów

| System | Technologie | Wymagane RTO / RPO | Osiągalne RTO / RPO | Kopie | Ośrodek zapasowy |
|---|---|---|---|---|---|
| Tożsamość: Active Directory i Entra ID | Active Directory (Windows Server), Microsoft 365 / Entra ID | 2 h / 15 min | 24 h / 1 h | Kopia stanu systemu DC dziennie, kopia niezmienna | Kontrolery domeny w drugiej lokalizacji |
| Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) | Zapora FortiGate | 2 h / 15 min | 4 h / – | Kopia konfiguracji po każdej zmianie | Klastry HA, łącza zapasowe LTE w drogeriach |
| System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) | Kasy POS i terminale płatnicze (sklep), Microsoft Defender for Endpoint | 2 h / 15 min | 4 h / 15 min | Złoty obraz kasy; transakcje replikowane do centrali | Tryb offline kas |
| Płatności kartowe – terminale i agent rozliczeniowy |  | 2 h / 15 min | 2 h / 0 | Usługa zewnętrzna | Łącze terminali niezależne od sieci centrali |
| ERP: towar, ceny, zakupy, finanse | VMware vSphere / SRM, Microsoft SQL Server, Veeam Backup & Replication | 24 h / 30 min | 2 d / 24 h | Kopia dzienna, kopia niezmienna | Ośrodek zapasowy |
| WMS i sterowanie automatyką centrów dystrybucyjnych | VMware vSphere / SRM, Microsoft SQL Server, Veeam Backup & Replication | 24 h / 4 h | 24 h / 4 h | Kopia co 4 h | Brak – do analizy |
| EDI / B2B z dostawcami | Serwer Linux (RHEL / Ubuntu) | 2 d / 4 h | 24 h / 4 h | Kopia dzienna | – |
| Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) | Kubernetes (Velero), PostgreSQL | 24 h / 30 min | 8 h / 30 min | Kopie Velero i PITR bazy | Druga strefa dostępności |
| Program lojalnościowy Klub Rossmanna (CRM, dane klientów) | PostgreSQL | 24 h / 30 min | 24 h / 1 h | PITR bazy, kopia niezmienna | Replika |
| Microsoft 365: poczta i Teams | Microsoft 365 / Entra ID | 4 h / 1 h | 4 h / 1 h | Microsoft 365 Backup | Usługa SaaS |
| Platforma kopii zapasowych (kopie niezmienne, odizolowane) | Veeam Backup & Replication, Serwer Linux (RHEL / Ubuntu) | – / – | 8 h / 24 h | Repozytorium niezmienne + kopia offline | Druga lokalizacja |
| Kadry i płace | Microsoft SQL Server | 5 d / 24 h | 3 d / 24 h | Kopia dzienna | Ośrodek zapasowy |

### Dokumenty powiązane

_Brak dokumentów podrzędnych._

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- DORA – rozporządzenie (UE) 2022/2554 – art. 12
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(c)
- RODO – rozporządzenie (UE) 2016/679 – art. 32(1)(c)