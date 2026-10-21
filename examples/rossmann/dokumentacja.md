# Dokumentacja ciągłości działania – Rossmann Polska

Wygenerowano: 21.10.2026, 20:17:13

## POL-RAN · Polityka ciągłości działania na wypadek ransomware

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Polityka | biznesowo-techniczna | 0.1 | projekt | Zarząd | 2027-10-21 |

### 1. Cel

Polityka ustanawia zasady, według których Rossmann Polska zapobiega skutkom ataku ransomware, wykrywa go, ogranicza, usuwa i odtwarza działalność – tak, aby procesy krytyczne wróciły do pracy w czasie nie dłuższym niż ich RTO, a utrata danych nie przekroczyła RPO.

Polityka jest dokumentem nadrzędnym dla siedmiu planów scenariuszowych, procedur, instrukcji technicznych i checklist. Realizuje wymagania ISO 22301 (pkt 5.2, 8.4) i ISO/IEC 27001 (A.5.24–A.5.30, A.8.13) oraz model reagowania z ISO/IEC 27035-1:2023 i NIST SP 800-61 Rev. 3 (CSF 2.0).

### 2. Zakres

Polityka obejmuje:

- wszystkie lokalizacje Rossmann Polska: centralę, centra dystrybucyjne, placówki sprzedaży i ośrodki przetwarzania danych;
- infrastrukturę tożsamości (Active Directory, Entra ID), sieć i urządzenia bezpieczeństwa, infrastrukturę kopii zapasowych, serwery plików i NAS, serwery aplikacyjne i bazy danych, WMS i automatykę magazynową, stanowiska sprzedażowe (POS);
- usługi chmurowe i usługi świadczone przez dostawców w zakresie, w jakim przetwarzają dane lub wspierają procesy krytyczne;
- pracowników, współpracowników i dostawców mających dostęp do systemów.

Polityka nie zastępuje polityki bezpieczeństwa informacji ani polityki zarządzania incydentami – uszczegóławia je dla scenariusza ransomware.

### 3. Definicje

| Pojęcie | Znaczenie |
|---|---|
| Ransomware | Złośliwe oprogramowanie lub działanie człowieka szyfrujące albo blokujące dostęp do danych i systemów w celu wymuszenia okupu. |
| Podwójne wymuszenie | Szyfrowanie połączone z kradzieżą danych i groźbą ich publikacji. |
| T0 | Najwcześniejszy potwierdzony ślad aktywności atakującego w środowisku. Wyznacza granicę czystych punktów odtworzenia. |
| Czysty punkt odtworzenia | Kopia sprzed T0 (z marginesem bezpieczeństwa), zweryfikowana skanowaniem i testem odtworzenia, zatwierdzona przez Kierownika incydentu. |
| IRE | Izolowane środowisko odtworzeniowe (Isolated Recovery Environment) – sieć i infrastruktura bez połączenia ze środowiskiem skompromitowanym. |
| Złoty obraz | Wzorcowy, podpisany obraz systemu (np. POS, serwer) o znanej sumie kontrolnej. |
| IoC / TTP | Wskaźniki naruszenia (skróty, adresy, domeny, artefakty) oraz taktyki, techniki i procedury atakującego (MITRE ATT&CK). |
| Bramka DG | Punkt decyzyjny, w którym wskazana rola podejmuje i dokumentuje decyzję przed przejściem do kolejnej fazy. |
| MTPD / RTO / RPO / MBCO | Maksymalny tolerowany okres zakłócenia / docelowy czas odtworzenia / dopuszczalna utrata danych / minimalny akceptowalny poziom działania (ISO 22301, ISO/TS 22317). |

### 4. Odniesienia normatywne

- ISO 22301:2019 i ISO 22313:2020 – system zarządzania ciągłością działania.
- ISO/TS 22317 – analiza wpływu na działalność (BIA).
- ISO/IEC 27001:2022 i ISO/IEC 27002:2022 – zabezpieczenia A.5.24–A.5.30, A.8.7, A.8.13, A.8.15, A.8.16, A.8.20, A.8.22.
- ISO/IEC 27031 – gotowość ICT do zapewnienia ciągłości działania.
- ISO/IEC 27035-1:2023 i 27035-2 – zarządzanie incydentami bezpieczeństwa informacji.
- ISO/IEC 27037 – postępowanie z dowodami cyfrowymi.
- NIST CSF 2.0, NIST SP 800-61 Rev. 3, NIST IR 8374 (profil ransomware CSF), NIST SP 800-184 (odtwarzanie po zdarzeniach), NIST SP 800-34 Rev. 1, NIST SP 800-86.
- CISA / MS-ISAC #StopRansomware Guide.
- Wymagania prawne i umowne:

- **ISO 22301:2019** – Systemy zarządzania ciągłością działania (BCMS)
- **ISO/IEC 27001:2022** – Systemy zarządzania bezpieczeństwem informacji – zabezpieczenia załącznika A
- **ISO/IEC 27031** – Gotowość ICT do zapewnienia ciągłości działania (IRBC)
- **ISO/IEC 27035** – Zarządzanie incydentami bezpieczeństwa informacji
- **NIST SP 800-34 Rev. 1** – Planowanie awaryjne dla systemów informacyjnych
- **NIST SP 800-61 Rev. 3 / CSF 2.0** – Reagowanie na incydenty w ujęciu CSF 2.0
- **PCI DSS v4.0.1** – Bezpieczeństwo danych kart płatniczych – reagowanie na incydenty
- **NIST CSF 2.0** – Podkategorie CSF 2.0 kluczowe dla odporności na ransomware (por. NIST IR 8374)
- **NIST SP 800-184** – Odtwarzanie po zdarzeniach cyberbezpieczeństwa
- **ISO/IEC 27037** – Identyfikacja, gromadzenie, pozyskiwanie i zabezpieczanie dowodów cyfrowych
- **NIS2 – dyrektywa (UE) 2022/2555** – Środki zarządzania ryzykiem w cyberbezpieczeństwie i obowiązki raportowe
- **Ustawa o KSC** – Ustawa o krajowym systemie cyberbezpieczeństwa (w brzmieniu wdrażającym NIS2) – zweryfikuj aktualny stan prawny i numerację przepisów
- **RODO – rozporządzenie (UE) 2016/679** – Ochrona danych osobowych – dostępność i naruszenia

### 5. Zasady

**Zapobieganie i przygotowanie**

- Kopie zapasowe w modelu 3-2-1-1-0: trzy kopie, dwa rodzaje nośników, jedna poza siedzibą, jedna niezmienna lub odizolowana logicznie (offline/air-gap), zero błędów weryfikacji.
- Infrastruktura kopii jest odseparowana od domeny produkcyjnej (osobne konta, MFA, osobny segment sieci, brak przynależności do domeny produkcyjnej).
- Model warstwowy kont uprzywilejowanych (tier 0/1/2), stacje administracyjne PAW, MFA odporne na phishing dla administratorów i dostępu zdalnego.
- Segmentacja sieci (centrala, centra dystrybucyjne, placówki, OT/automatyka, backup, zarządzanie) i kontrola dostępu do sieci (NAC).
- EDR na wszystkich serwerach i stanowiskach, w tym POS, w trybie blokowania; centralne logowanie do SIEM z retencją co najmniej 12 miesięcy.
- Dokumentacja odtworzeniowa, hasła awaryjne (break-glass) i kontakty dostępne offline.

**Reagowanie**

- Bezpieczeństwo ludzi ma pierwszeństwo przed ciągłością działania, a ograniczenie rozprzestrzeniania – przed szybkością odtworzenia.
- Izolujemy, ale nie wyłączamy zasilania zainfekowanych systemów bez decyzji zespołu reagowania (utrata dowodów z pamięci).
- Zakładamy, że poczta, komunikator i konta domenowe mogą być kontrolowane przez atakującego – zespół przechodzi na kanał pozapasmowy.
- Odtwarzamy wyłącznie z czystych punktów odtworzenia, w IRE, z nowymi poświadczeniami.
- Każda decyzja jest zapisywana w dzienniku incydentu z godziną, autorem i uzasadnieniem.

**Okup**

- Rossmann Polska co do zasady nie płaci okupu i nie prowadzi negocjacji. Odstępstwo może zatwierdzić wyłącznie Zarząd uchwałą, po opinii prawnej (w tym sanacyjnej: listy UE, ONZ, OFAC), konsultacji z organami ścigania (CBZC) i ubezpieczycielem. Zapłata nie zwalnia z obowiązku odtworzenia, usunięcia zagrożenia ani zgłoszeń.

### 6. Role i odpowiedzialności

| Rola | Odpowiedzialność |
|---|---|
| Zarząd | Zatwierdza politykę i apetyt na ryzyko, decyduje o okupie i komunikacji zewnętrznej najwyższego szczebla, nadzoruje wdrożenie (NIS2 art. 20). |
| Zespół zarządzania kryzysowego | Zarządza skutkami biznesowymi: tryby awaryjne, priorytety procesów, komunikacja, zasoby. Przewodniczy członek Zarządu. |
| Kierownik incydentu | Dowodzi reakcją (CISO lub wyznaczony zastępca). Klasyfikuje incydent, zatwierdza izolację, punkt odtworzenia i dopuszczenie do produkcji. |
| Kierownik odtwarzania | Planuje i koordynuje odtwarzanie (Dyrektor IT). Odpowiada za IRE i kolejność odtwarzania. |
| Zespół reagowania (CSIRT) | SOC, analitycy i zewnętrzny zespół IR z umowy retainer: analiza, ograniczanie, usuwanie, polowanie na zagrożenia. |
| Analityk informatyki śledczej | Zabezpiecza i analizuje dowody zgodnie z ISO/IEC 27037, prowadzi łańcuch dowodowy. |
| Administratorzy dziedzinowi | AD, kopie, sieć/NAC, pamięć masowa, aplikacje, bazy danych, systemy sklepowe i logistyczne – wykonują instrukcje techniczne. |
| Właściciel procesu biznesowego | Uruchamiają tryby awaryjne procesów, akceptują odtworzone usługi i uzgadniają dane. |
| Inspektor ochrony danych | Ocenia naruszenia ochrony danych osobowych i rekomenduje zgłoszenia (RODO art. 33–34). |
| Dział prawny / compliance | Zgłoszenia do organów, opinia w sprawie okupu i sankcji, kontakt z policją i ubezpieczycielem. |
| Komunikacja | Komunikacja wewnętrzna i zewnętrzna według zatwierdzonych komunikatów. |

### 7. Klasyfikacja incydentów ransomware

| Kategoria | Kryteria (wystarczy jedno) | Reakcja |
|---|---|---|
| K1 – krytyczny | szyfrowanie w więcej niż jednej strefie sieci; naruszenie kontrolera domeny lub kont tier 0; naruszenie infrastruktury kopii; zatrzymanie WMS lub sprzedaży w więcej niż 5% placówek; potwierdzona eksfiltracja danych osobowych na dużą skalę | aktywacja ZZK i planu scenariuszowego natychmiast, 24/7 |
| K2 – wysoki | potwierdzona aktywność nieznanego aktora bez szyfrowania; szyfrowanie pojedynczego serwera krytycznego; naruszenie do 5% placówek | aktywacja planu scenariuszowego, ZZK w gotowości |
| K3 – średni | szyfrowanie pojedynczego stanowiska lub serwera niekrytycznego, ograniczone i odizolowane | obsługa przez CSIRT według procedur |
| K4 – niski | pojedynczy alert bez potwierdzenia aktywności | triaż SOC |

Kategoria może być tylko podnoszona do czasu zamknięcia analizy zakresu. Każdy incydent K1–K2 jest oceniany pod kątem progów incydentu poważnego (NIS2/KSC, DORA – jeśli dotyczy) i naruszenia ochrony danych (RODO).

### 8. Punkty decyzyjne (bramki)

| Bramka | Decyzja | Decydent | Cel czasowy |
|---|---|---|---|
| DG0 | Deklaracja incydentu i kategoria | Kierownik incydentu | 15 min od walidacji alertu |
| DG1 | Zakres izolacji (segmenty, internet, VPN, dostawcy) | Kierownik incydentu (z Zespół zarządzania kryzysowego przy wpływie na sprzedaż) | 60 min od DG0 |
| DG2 | Strategia odtworzenia (odbudowa / odtworzenie z kopii) i wybór czystego punktu odtworzenia | Kierownik incydentu + Kierownik odtwarzania | po ustaleniu T0 |
| DG3 | Zgłoszenia regulacyjne i zawiadomienia | Dział prawny / compliance + Inspektor ochrony danych | według terminów ustawowych |
| DG4 | Stanowisko w sprawie żądania okupu | Zarząd | przed upływem terminu przestępców, nie wcześniej niż po DG2 |
| DG5 | Dopuszczenie usługi do produkcji | Kierownik incydentu + Właściciel procesu biznesowego | dla każdej usługi osobno |
| DG6 | Zamknięcie incydentu i powrót do trybu normalnego | Kierownik incydentu | po 30 dniach wzmożonego monitoringu bez nawrotu |

### 9. Kryteria dopuszczenia do produkcji (bramka DG5)

1. Źródło odtworzenia pochodzi sprzed T0, zostało przeskanowane i przetestowane (CSF RC.RP-03).
2. System został odbudowany lub odtworzony w IRE.
3. Usunięto podatność lub wektor wejścia; zainstalowano poprawki krytyczne.
4. Konfiguracja zgodna z bazową konfiguracją bezpieczeństwa (A.8.9).
5. Zmieniono wszystkie poświadczenia, do których atakujący mógł mieć dostęp (konta, konta serwisowe, klucze API, sekrety, w razie potrzeby certyfikaty).
6. EDR działa w trybie blokowania, logi trafiają do SIEM, wdrożono reguły detekcji IoC i TTP z incydentu.
7. Skan IoC/YARA i skan antywirusowy bez wykryć.
8. Testy funkcjonalne, integracyjne i wydajnościowe zaliczone.
9. Integralność i kompletność danych potwierdzona uzgodnieniami.
10. Akceptacja właściciela procesu i Kierownika incydentu.
11. Zmiana awaryjna zarejestrowana (A.8.32), plan wycofania gotowy.
12. Wzmożony monitoring przez co najmniej 30 dni.

### 10. Wymagania odtworzeniowe

Priorytety i cele odtworzenia wynikają z BIA:

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

Kolejność odtwarzania wynika z zależności technicznych – tożsamość i sieć zawsze przed aplikacjami:

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
| 11 | Serwery plików i NAS (udziały centrali i centrów dystrybucyjnych) | Tożsamość: Active Directory i Entra ID | 2 d |
| 12 | Kadry i płace | Tożsamość: Active Directory i Entra ID | 5 d |
| 13 | Platforma kopii zapasowych (kopie niezmienne, odizolowane) |  | – |
| 14 | Platforma bezpieczeństwa: SIEM, EDR, NAC |  | – |

### 11. Dowody i łańcuch dowodowy

Dowody cyfrowe zabezpiecza się zgodnie z ISO/IEC 27037 i NIST SP 800-86: przed działaniami naprawczymi, w kolejności ulotności (pamięć → połączenia sieciowe → procesy → dyski → logi zdalne → kopie), z sumami SHA-256 i kartą łańcucha dowodowego (kto, co, kiedy, gdzie, cel). Oryginały pozostają nienaruszone; analizuje się kopie. Logi z SIEM, EDR, zapór, VPN, AD i infrastruktury kopii eksportuje się niezwłocznie, bo atakujący często je usuwają.

### 12. Komunikacja i obowiązki raportowe

- Kanał pozapasmowy zespołu kryzysowego jest niezależny od domeny i M365 (telefony, wydzielona usługa komunikacyjna, lista kontaktów offline).
- Komunikaty zewnętrzne zatwierdza przewodniczący ZZK; jedynym rzecznikiem jest osoba wyznaczona przez Zarząd.
- Nie publikuje się szczegółów technicznych, które mogłyby pomóc atakującemu.

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

Dodatkowo: policja (CBZC), ubezpieczyciel cyber, agent rozliczeniowy i organizacje płatnicze przy podejrzeniu naruszenia danych kart (PCI DSS 12.10.1).

### 13. Ciągłość działania procesów

Dla każdego procesu krytycznego właściciel utrzymuje tryb awaryjny niezależny od systemów, które mogą zostać zaszyfrowane: sprzedaż w trybie offline, ręczna obsługa magazynu, zamówienia telefoniczne, wypłaty według ostatniej listy płac. Tryby awaryjne są opisane w planach scenariuszowych i testowane co najmniej raz w roku.

### 14. Testowanie, szkolenia i doskonalenie

| Działanie | Częstotliwość | Zakres |
|---|---|---|
| Przegląd dokumentacji | co 6 miesięcy i po zmianie | polityka, plany, kontakty |
| Ćwiczenie sztabowe ransomware | raz w roku | Zarząd, ZZK, CSIRT, IOD, prawny, komunikacja |
| Test odtworzenia z kopii niezmiennej | raz na kwartał | systemy krytyczne, AD |
| Test odtworzenia lasu AD w IRE | raz w roku | AD, DNS, PKI |
| Test trybu awaryjnego procesów | raz w roku | placówki, centra dystrybucyjne |
| Szkolenie zespołów reagowania | raz w roku | CSIRT, administratorzy, service desk |

Wnioski z testów i incydentów prowadzą do działań korygujących (ISO 22301 pkt 10.1) z właścicielem i terminem. Mierzy się: czas wykrycia, czas do izolacji, czas odtworzenia vs RTO, utratę danych vs RPO, odsetek kopii z pozytywnym testem odtworzenia (NIST SP 800-184).

### 15. Struktura dokumentacji

Polityka → plany scenariuszowe (7) → procedury → instrukcje techniczne i checklisty.

- Plan: **PL-AD · Plan reagowania na zaszyfrowany kontroler domeny** (v0.1, projekt)
- Plan: **PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych** (v0.1, projekt)
- Plan: **PL-BKP · Plan reagowania na ransomware w kopii zapasowej** (v0.1, projekt)
- Plan: **PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze** (v0.1, projekt)
- Plan: **PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS** (v0.1, projekt)
- Plan: **PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym** (v0.1, projekt)
- Plan: **PL-WMS · Plan reagowania na ransomware w systemie WMS** (v0.1, projekt)

### 16. Przegląd i zatwierdzenie

Polityka podlega przeglądowi co najmniej raz w roku, po każdym incydencie K1–K2 i po istotnej zmianie infrastruktury, organizacji lub przepisów. Zatwierdza ją Zarząd.

### Mapowanie na wymagania

- ISO 22301:2019 – 4.1
- ISO 22301:2019 – 4.2
- ISO 22301:2019 – 4.3
- ISO 22301:2019 – 5.2
- ISO 22301:2019 – 5.3
- ISO 22301:2019 – 6.2
- ISO 22301:2019 – 7.2
- ISO 22301:2019 – 7.4
- ISO 22301:2019 – 7.5
- ISO 22301:2019 – 8.2.2
- ISO 22301:2019 – 8.2.3
- ISO 22301:2019 – 8.3
- ISO 22301:2019 – 8.4.2
- ISO 22301:2019 – 8.4.3
- ISO 22301:2019 – 8.4.4
- ISO 22301:2019 – 8.4.5
- ISO 22301:2019 – 8.5
- ISO 22301:2019 – 8.6
- ISO 22301:2019 – 9.3
- ISO 22301:2019 – 10.1
- ISO/IEC 27001:2022 – A.5.24
- ISO/IEC 27001:2022 – A.5.29
- ISO/IEC 27001:2022 – A.5.30
- ISO/IEC 27001:2022 – A.8.13
- ISO/IEC 27001:2022 – A.8.7
- ISO/IEC 27001:2022 – A.8.22
- ISO/IEC 27035 – PLAN
- ISO/IEC 27031 – IRBC-1
- ISO/IEC 27031 – IRBC-2
- NIST SP 800-34 Rev. 1 – 1
- NIST SP 800-61 Rev. 3 / CSF 2.0 – GV.PO
- NIST SP 800-184 – PLAN
- NIST SP 800-184 – METR
- NIST CSF 2.0 – PR.DS-11
- NIST CSF 2.0 – RS.MA-05
- NIST CSF 2.0 – RC.RP-06
- PCI DSS v4.0.1 – 12.10.1
- PCI DSS v4.0.1 – 12.10.3
- PCI DSS v4.0.1 – 12.10.6
- NIS2 – dyrektywa (UE) 2022/2555 – art. 20
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(b)
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(c)
- Ustawa o KSC – KSC-SZBI
- Ustawa o KSC – KSC-CD
- DORA – rozporządzenie (UE) 2022/2554 – art. 11(1)
- RODO – rozporządzenie (UE) 2016/679 – art. 32(1)(c)

---

## PL-AD · Plan reagowania na zaszyfrowany kontroler domeny

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Plan | techniczna | 0.1 | projekt | Dyrektor IT | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware

### 1. Cel i zakres

Plan opisuje reakcję na zaszyfrowanie lub przejęcie kontrolerów domeny Active Directory. Ponieważ AD jest fundamentem uwierzytelniania niemal wszystkich systemów Rossmann Polska, jego naruszenie oznacza przejęcie całej domeny (tier 0) i wymaga odtworzenia lasu z czystej kopii zgodnie z metodyką odtwarzania lasu AD.

### 2. Scenariusz

Atakujący z uprawnieniami administratora domeny wdraża ransomware przez GPO, PsExec lub zadania zaplanowane i szyfruje kontrolery domeny oraz serwery. Bazy NTDS.dit, SYSVOL i DNS mogą być niedostępne lub zmodyfikowane (konta-furtki, złoty bilet Kerberos, zmiany AdminSDHolder).

### 3. Sygnały wykrycia i wskaźniki naruszenia

- Kontrolery domeny nie odpowiadają, usługi NTDS/DNS nie startują, pliki z nowym rozszerzeniem i notatki okupu na DC.
- Masowe zmiany GPO, nowe zadania zaplanowane rozsyłane przez SYSVOL.
- Zdarzenia 4662 (DCSync), 4769 z szyfrowaniem RC4, nietypowe bilety TGT o długiej ważności.
- Usunięte kopie migawkowe i kopie stanu systemu na DC.
- Błędy replikacji (repadmin) i rozjazd metadanych między DC.

### 4. Zasoby objęte planem

| System | Technologie | Wymagane RTO / RPO | Osiągalne RTO / RPO | Kopie | Ośrodek zapasowy |
|---|---|---|---|---|---|
| Tożsamość: Active Directory i Entra ID | Active Directory (Windows Server), Microsoft 365 / Entra ID | 2 h / 15 min | 24 h / 1 h | Kopia stanu systemu DC dziennie, kopia niezmienna | Kontrolery domeny w drugiej lokalizacji |

### 5. Wpływ na procesy biznesowe i cele odtworzenia

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

### 6. Kryteria aktywacji i klasyfikacja

Aktywacja natychmiast po potwierdzeniu szyfrowania lub przejęcia któregokolwiek DC albo kont tier 0. Zawsze kategoria K1, aktywacja ZZK i zewnętrznego zespołu IR.

### 7. Organizacja reagowania

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Ocena zakresu naruszenia AD | Zespół reagowania (CSIRT), Administrator AD | Kierownik incydentu | Kierownik odtwarzania | Zespół zarządzania kryzysowego |
| Izolacja kontrolerów domeny | Administrator AD, Administrator sieci / NAC | Kierownik incydentu | Zespół reagowania (CSIRT) | Zespół zarządzania kryzysowego |
| Dowody z AD | Analityk informatyki śledczej | Kierownik incydentu | Administrator AD | – |
| Odtworzenie lasu w IRE | Administrator AD, Administrator kopii zapasowych | Kierownik odtwarzania | Zespół reagowania (CSIRT), Dostawca | Zespół zarządzania kryzysowego |
| Dopuszczenie AD | Administrator AD | Kierownik incydentu | Zespół reagowania (CSIRT) | Zespół zarządzania kryzysowego, Właściciel procesu biznesowego |

### 8. Przebieg reagowania

| Faza | Cel | Procedura | Cel czasowy |
|---|---|---|---|
| Ocena | zakres: które DC, domeny, konta, T0 | PR-AD-1 | 2 h |
| Izolacja | zatrzymanie replikacji złośliwych zmian i ruchu do DC | PR-AD-2 | 1 h od DG0 |
| Dowody | NTDS, logi, artefakty z DC | PR-AD-3 | przed odtworzeniem |
| Odtworzenie | odtworzenie lasu z czystej kopii w IRE | PR-AD-4 | według RTO tożsamości |
| Weryfikacja i dopuszczenie | czystość, replikacja, uwierzytelnianie, DG5 | PR-AD-5 | przed przyłączeniem systemów |

Odtworzenie AD poprzedza odtwarzanie wszystkich systemów zależnych. Do czasu dopuszczenia AD systemy odtwarzane w IRE korzystają wyłącznie z kont lokalnych lub tożsamości IRE.

### 9. Ciągłość działania w trakcie incydentu

- Procesy wymagające logowania domenowego przechodzą w tryb awaryjny: POS w trybie offline (PL-POS), ręczna obsługa magazynu (PL-WMS), komunikacja pozapasmowa.
- Usługi chmurowe z tożsamością synchronizowaną z AD: rozważ wstrzymanie synchronizacji i dostęp kontami chmurowymi awaryjnymi (break-glass) wyłącznie dla zespołu reagowania.
- Dostęp do systemów krytycznych w IRE realizuje się z nowych stacji PAW.

### 10. Punkty decyzyjne

- DG1: odcięcie wszystkich DC od sieci (zalecane przy szyfrowaniu) czy izolacja wybranych.
- DG2: odtworzenie lasu z kopii sprzed T0 czy budowa nowego lasu i migracja (gdy brak czystej kopii lub T0 nieustalone).
- DG2: wybór DC i kopii stanu systemu dla każdej domeny.
- Wstrzymanie synchronizacji z Entra ID.
- DG5: dopuszczenie lasu do ponownego przyłączenia stref.

### 11. Komunikacja i obowiązki raportowe

Komunikację wewnętrzną prowadzi się kanałem pozapasmowym. Komunikaty do pracowników, klientów, dostawców i mediów zatwierdza przewodniczący ZZK. Kierownik incydentu raportuje stan co 2 h w fazie ograniczania i co 4 h w fazie odtwarzania (CSF RC.CO-03). Użytkowników informuje się o konieczności zmiany haseł dopiero po odtworzeniu AD, kanałem niezależnym od domeny.

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

### 12. Kryteria zakończenia

- Las odtworzony z czystej kopii, wszystkie DC odbudowane, replikacja bez błędów.
- KRBTGT zresetowane dwukrotnie, wszystkie konta uprzywilejowane i serwisowe ze zmienionymi hasłami.
- Usunięte konta, GPO, zadania i delegacje dodane przez atakującego.
- Wdrożony model warstwowy tier 0 i monitoring zmian AD.
- Bramka DG5 spełniona.

### 13. Błędy, których należy unikać

- Przywracanie DC z kopii bez ustalenia T0 – możesz odtworzyć furtki atakującego.
- Uruchomienie odtworzonego DC w sieci produkcyjnej, gdzie działają zainfekowane DC (replikacja złośliwych zmian).
- Pojedynczy reset KRBTGT albo reset dwukrotny bez odczekania na replikację.
- Zapomnienie o kontach serwisowych, zaufaniach między domenami, delegacjach i certyfikatach (AD CS).
- Logowanie się na odtworzony DC ze starych, potencjalnie skompromitowanych stacji.

### 14. Procedury, instrukcje i checklisty

- Procedura: **PR-AD-1 · Ocena zakresu naruszenia AD** (v0.1, projekt)
- Procedura: **PR-AD-2 · Izolacja naruszonych kontrolerów domeny** (v0.1, projekt)
- Procedura: **PR-AD-3 · Zabezpieczenie logów i dowodów z AD** (v0.1, projekt)
- Procedura: **PR-AD-4 · Odtworzenie usług AD** (v0.1, projekt)
- Procedura: **PR-AD-5 · Weryfikacja i dopuszczenie usług domenowych** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.5.30
- ISO/IEC 27001:2022 – A.8.2
- ISO/IEC 27001:2022 – A.8.13
- ISO/IEC 27031 – IRBC-3
- NIST SP 800-34 Rev. 1 – 5
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RC.RP
- NIST SP 800-184 – TACT
- NIST CSF 2.0 – RS.MI-01
- NIST CSF 2.0 – RS.MI-02
- NIST CSF 2.0 – RC.RP-02
- NIST CSF 2.0 – RC.RP-03
- NIST CSF 2.0 – RC.RP-05
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(c)
- Ustawa o KSC – KSC-CD

---

## PR-AD-1 · Ocena zakresu naruszenia AD

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny

### Cel

Ustalenie, które kontrolery domeny, domeny, konta i obiekty AD zostały zaszyfrowane lub zmodyfikowane przez atakującego, wyznaczenie T0 dla tożsamości i wybór strategii odtworzenia (DG2).

### Zakres i wyzwalacz

Wszystkie lasy, domeny i kontrolery domeny Rossmann Polska, w tym kontrolery tylko do odczytu, usługi AD CS, DNS zintegrowany z AD i synchronizacja z Entra ID.

**Wyzwalacz:** potwierdzone szyfrowanie lub nieuprawnione zmiany na którymkolwiek kontrolerze domeny albo aktywność kont tier 0.

### Warunki wstępne

- Aktualny opis topologii lasu (domeny, lokacje, DC, role FSMO, GC, zaufania) przechowywany offline.
- Dostęp do kopii stanu systemu DC i katalogu kopii.
- Dostęp do logów DC w SIEM i do Microsoft Defender for Identity (jeśli wdrożony).

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Inwentaryzacja stanu DC | Administrator AD | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Analiza zmian w AD i T0 | Zespół reagowania (CSIRT), Administrator AD | Kierownik incydentu | Analityk informatyki śledczej | – |
| Ocena dostępnych kopii DC | Administrator kopii zapasowych | Kierownik odtwarzania | Administrator AD | Kierownik incydentu |
| Rekomendacja strategii (DG2) | Kierownik odtwarzania, Zespół reagowania (CSIRT) | Kierownik incydentu | Dostawca | Zespół zarządzania kryzysowego |

### Przebieg

#### 1 · Stan

1. **Administrator AD:** Sporządź listę wszystkich DC z ich stanem: działa / zaszyfrowany / niedostępny / podejrzany. Pracuj z hosta zespołu reagowania, nie loguj się na DC kontem domenowym.
   _Oczekiwany rezultat:_ Tabela stanu DC
2. **Administrator AD:** Jeśli którykolwiek DC odpowiada, sprawdź role FSMO, GC i stan replikacji.

   ```
   netdom query fsmo
   repadmin /replsummary
   ```
   _Oczekiwany rezultat:_ Role i stan replikacji
#### 2 · Zmiany

3. **Zespół reagowania (CSIRT):** Ustal zmiany obiektów AD od wstępnego T0 (konta, grupy, GPO, delegacje, AdminSDHolder).

   ```
   Get-ADObject -Filter {whenChanged -ge $T0} -IncludeDeletedObjects -Properties whenChanged, objectClass | Sort whenChanged | Select whenChanged, objectClass, DistinguishedName
   ```
   _Oczekiwany rezultat:_ Lista zmian od T0
4. **Zespół reagowania (CSIRT):** Sprawdź oznaki technik ataku na AD: DCSync (4662 z prawami replikacji), złoty bilet, nadużycie delegacji, zmiany GPO rozsyłające ransomware.
   _Oczekiwany rezultat:_ Lista technik ATT&CK dla AD
5. **Zespół reagowania (CSIRT):** Sprawdź, kto ma prawa replikacji katalogu (DCSync) poza kontrolerami domeny.

   ```
   (Get-Acl "AD:$((Get-ADDomain).DistinguishedName)").Access | Where-Object { $_.ObjectType -in "1131f6aa-9c07-11d1-f79f-00c04fc2dcd2","1131f6ad-9c07-11d1-f79f-00c04fc2dcd2" } | Select IdentityReference, ObjectType
   ```
   _Oczekiwany rezultat:_ Tylko kontrolery i konta systemowe
#### 3 · T0 i kopie

6. **Zespół reagowania (CSIRT):** Wyznacz T0 dla AD jako najwcześniejszą nieuprawnioną zmianę lub użycie konta tier 0.
   _Oczekiwany rezultat:_ T0 dla AD
7. **Administrator kopii zapasowych:** Wskaż kopie stanu systemu lub kopie VM każdego DC sprzed T0 (z marginesem co najmniej 24 h) i sprawdź ich dostępność oraz integralność (PL-BKP).
   _Oczekiwany rezultat:_ Lista kandydatów kopii dla każdej domeny
#### 4 · Usługi zależne

8. **Administrator AD:** Oceń AD CS, DNS zintegrowany z AD, zaufania między domenami i synchronizację z Entra ID; zdecyduj o wstrzymaniu synchronizacji.
   _Oczekiwany rezultat:_ Ocena usług zależnych
#### 5 · Rekomendacja

9. **Kierownik odtwarzania:** Przygotuj rekomendację strategii (DG2): odtworzenie lasu z kopii sprzed T0 albo budowa nowego lasu i migracja, gdy brak czystej kopii.
   _Oczekiwany rezultat:_ Rekomendacja z uzasadnieniem
10. **Kierownik incydentu:** Wypełnij CL-AD-1 i podejmij decyzję DG2 dla AD.
   _Oczekiwany rezultat:_ CL-AD-1, wpis DG2

### Kryteria wyjścia

- Stan wszystkich DC znany, T0 dla AD ustalone.
- Czysta kopia wskazana dla każdej domeny lub decyzja o budowie nowego lasu.
- Decyzja DG2 zapisana.

### Zapisy (dowody wykonania)

Tabela stanu DC, lista zmian AD od T0, rekomendacja strategii, CL-AD-1, wpis DG2.

### Instrukcje i checklisty

- Instrukcja: **CL-AD-1 · Ocena naruszenia AD** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.25
- ISO/IEC 27001:2022 – A.8.2
- ISO/IEC 27035 – ASSESS
- NIST CSF 2.0 – RS.AN-03
- NIST CSF 2.0 – RS.AN-08
- NIST CSF 2.0 – RS.MA-03

---

## CL-AD-1 · Ocena naruszenia AD

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny → PR-AD-1 · Ocena zakresu naruszenia AD

### Zastosowanie

Podsumowanie PR-AD-1 przed decyzją DG2.

### Lista kontrolna

1. **Administrator AD:** Stan każdego DC ustalony (działa / zaszyfrowany / podejrzany)
   _Oczekiwany rezultat:_ Tabela stanu DC
2. **Administrator AD:** Role FSMO, GC i zaufania zinwentaryzowane
3. **Zespół reagowania (CSIRT):** Zmiany w AD od wstępnego T0 zidentyfikowane
   _Oczekiwany rezultat:_ Lista zmian
4. **Zespół reagowania (CSIRT):** Techniki ataku na AD określone (DCSync, złoty bilet, GPO, delegacje)
5. **Zespół reagowania (CSIRT):** T0 dla AD wyznaczone
6. **Administrator kopii zapasowych:** Czyste kopie DC dla każdej domeny wskazane i sprawdzone
7. **Administrator AD:** Usługi zależne ocenione (AD CS, DNS, synchronizacja z Entra ID)
8. **Kierownik incydentu:** Decyzja DG2 zapisana
   _Oczekiwany rezultat:_ Wpis DG2

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator AD i zespół reagowania. Zatwierdził: Kierownik incydentu.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.AN-08

---

## PR-AD-2 · Izolacja naruszonych kontrolerów domeny

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny

### Cel

Zatrzymanie rozprzestrzeniania złośliwych zmian przez replikację AD i odcięcie atakującego od kontrolerów domeny.

### Zakres i wyzwalacz

Kontrolery zaszyfrowane, podejrzane i – w zależności od decyzji DG1 – wszystkie kontrolery w lesie.

**Wyzwalacz:** decyzja DG1 po PR-AD-1 albo natychmiast przy aktywnym szyfrowaniu DC.

### Warunki wstępne

- Dostęp do hiperwizora lub przełączników, w których pracują DC.
- Konto awaryjne niezależne od domeny (konsola hiperwizora, konto lokalne przełącznika).

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Decyzja o zakresie izolacji DC | Kierownik incydentu | Kierownik incydentu | Kierownik odtwarzania, Zespół reagowania (CSIRT) | Zespół zarządzania kryzysowego |
| Izolacja DC | Administrator AD, Administrator sieci / NAC | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Ograniczenie źródeł ataku w NAC | Administrator sieci / NAC | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Ocena wpływu i tryby awaryjne | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego | Kierownik incydentu | – |

### Warianty izolacji

- **Wariant A – szyfrowanie DC:** odłącz wszystkie zaszyfrowane DC od sieci. Jeżeli las jest skompromitowany (tier 0), odłącz wszystkie DC i przygotuj odtworzenie lasu w IRE.
- **Wariant B – kompromitacja bez szyfrowania:** wyłącz replikację z podejrzanych DC, ogranicz dostęp do DC wyłącznie z PAW i niezbędnych segmentów, zablokuj źródła ataku w NAC. Pełne odcięcie planuje się razem z operacją usunięcia (PR-INF-4).

### Przebieg

#### 1 · Decyzja

1. **Kierownik incydentu:** Wybierz wariant izolacji (A lub B) i zapisz decyzję wraz z oczekiwanym wpływem na uwierzytelnianie.
   _Oczekiwany rezultat:_ Wpis DG1 dla AD
2. **Zespół zarządzania kryzysowego:** Uruchom tryby awaryjne procesów zależnych od logowania domenowego (PL-POS, PL-WMS, komunikacja pozapasmowa).
   _Oczekiwany rezultat:_ Tryby awaryjne aktywne
#### 2 · Izolacja

3. **Administrator AD:** Wariant B: wyłącz replikację przychodzącą i wychodzącą na podejrzanych DC.

   ```
   repadmin /options <DC> +DISABLE_OUTBOUND_REPL
   repadmin /options <DC> +DISABLE_INBOUND_REPL
   ```
   _Oczekiwany rezultat:_ Opcje replikacji ustawione
4. **Administrator AD:** Odizoluj DC według IN-AD-2.1.
   _Oczekiwany rezultat:_ DC odizolowane
5. **Administrator sieci / NAC:** Ogranicz dostęp sieciowy źródeł ataku do DC i pozostałych zasobów według IN-AD-2.2.
   _Oczekiwany rezultat:_ Źródła ataku zablokowane
#### 3 · Chmura

6. **Administrator AD:** Wstrzymaj synchronizację z Entra ID, jeśli istnieje ryzyko przeniesienia zmian atakującego do chmury.

   ```
   Set-ADSyncScheduler -SyncCycleEnabled $false
   ```
   _Oczekiwany rezultat:_ SyncCycleEnabled: False
#### 4 · Weryfikacja

7. **SOC:** Zweryfikuj skuteczność izolacji DC (IN-INF-2.4): brak ruchu poza dozwolonym, brak replikacji z odizolowanych DC.
   _Oczekiwany rezultat:_ Raport weryfikacji

### Kryteria wyjścia

- Zaszyfrowane i podejrzane DC odizolowane, replikacja złośliwych zmian zatrzymana.
- Źródła ataku zablokowane.
- Tryby awaryjne procesów działają.

### Zapisy (dowody wykonania)

Wpis DG1, rejestr izolacji DC, zmiany opcji replikacji, raport weryfikacji.

### Instrukcje i checklisty

- Instrukcja: **IN-AD-2.1 · Izolacja kontrolera domeny** (v0.1, projekt)
- Instrukcja: **IN-AD-2.2 · Ograniczenie dostępu sieciowego dla źródeł ataku z wykorzystaniem NAC** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.8.22
- NIST CSF 2.0 – RS.MI-01
- NIST CSF 2.0 – PR.IR-01

---

## IN-AD-2.1 · Izolacja kontrolera domeny

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny → PR-AD-2 · Izolacja naruszonych kontrolerów domeny

### Cel

Odcięcie kontrolera domeny od sieci przy zachowaniu jego stanu (pamięć, dyski) na potrzeby dowodów.

### Zastosowanie

Kontrolery zaszyfrowane lub podejrzane (PR-AD-2). Przykłady dla VMware vSphere, Hyper-V i serwerów fizycznych.

### Wymagane uprawnienia i narzędzia

- Dostęp do vCenter / Hyper-V z konta niezależnego od domeny lub do przełącznika.
- Lista DC do izolacji z decyzji DG1.

### Środki ostrożności

- Nie wyłączaj DC i nie wykonuj na nim restartu.
- Nie loguj się na DC kontem domenowym.
- Izolacja wszystkich DC zatrzyma uwierzytelnianie w całej organizacji – wyłącznie po decyzji DG1.

### Kroki

#### 1 · Izolacja

1. **Administrator AD:** VMware vSphere: odłącz karty sieciowe maszyny DC.

   ```
   Get-VM "<DC>" | Get-NetworkAdapter | Set-NetworkAdapter -Connected:$false -StartConnected:$false -Confirm:$false
   ```
   _Oczekiwany rezultat:_ Connected: False
2. **Administrator AD:** Hyper-V: odłącz kartę sieciową maszyny DC.

   ```
   Disconnect-VMNetworkAdapter -VMName "<DC>"
   ```
   _Oczekiwany rezultat:_ Brak przełącznika wirtualnego
3. **Administrator sieci / NAC:** Serwer fizyczny: wyłącz port przełącznika lub przypisz go do VLAN kwarantanny.

   ```
   interface <port>
    shutdown
   ```
   _Oczekiwany rezultat:_ Port wyłączony
#### 2 · EDR

4. **SOC:** Jeśli na DC działa EDR – dodatkowo zastosuj izolację w EDR (IN-INF-2.1).
   _Oczekiwany rezultat:_ Status: odizolowany
#### 3 · Rejestracja

5. **Administrator AD:** Zapisz DC, metodę izolacji, godzinę i wykonawcę w rejestrze izolacji.
   _Oczekiwany rezultat:_ Wpis w rejestrze

### Weryfikacja wykonania

Brak odpowiedzi DC na porty 53, 88, 389, 445 z hosta zespołu reagowania (`Test-NetConnection <DC> -Port 389`). Brak zdarzeń replikacji z tego DC na pozostałych kontrolerach.

### Wycofanie

Ponowne podłączenie dotychczasowych DC nie jest przewidziane – po odtworzeniu lasu są usuwane i zastępowane nowymi.

### Zapisy

Rejestr izolacji DC.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.MI-01
- ISO/IEC 27001:2022 – A.8.22

---

## IN-AD-2.2 · Ograniczenie dostępu sieciowego dla źródeł ataku z wykorzystaniem NAC

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny → PR-AD-2 · Izolacja naruszonych kontrolerów domeny

### Cel

Zablokowanie hostom i adresom wykorzystywanym przez atakującego dostępu do kontrolerów domeny i segmentów zarządzania, przy zachowaniu dostępu dla PAW zespołu reagowania.

### Zastosowanie

Gdy znane są źródła ataku (hosty, adresy, konta urządzeń), a DC pozostają częściowo w użyciu (wariant B izolacji) lub trwa przygotowanie do odtworzenia.

### Wymagane uprawnienia i narzędzia

- Uprawnienia do polityk NAC (np. Cisco ISE) i zapór wewnętrznych.
- Lista źródeł ataku (adresy MAC/IP, nazwy hostów) z analizy.
- Lista adresów PAW i segmentów dozwolonych do DC.

### Środki ostrożności

Zbyt szeroka blokada zatrzyma uwierzytelnianie procesów krytycznych – stosuj listę dozwolonych przepływów do DC uzgodnioną w DG1.

### Kroki

#### 1 · Źródła ataku

1. **Administrator sieci / NAC:** Poddaj kwarantannie w NAC urządzenia będące źródłem ataku (polityka ANC KWARANTANNA – IN-INF-2.2).
   _Oczekiwany rezultat:_ Urządzenia w kwarantannie
#### 2 · Ochrona DC

2. **Administrator sieci / NAC:** Utwórz w NAC profil autoryzacji „DOSTĘP-DC-ZABRONIONY” (dACL blokujący porty 53, 88, 135, 389, 445, 464, 636, 3268, 3269 i zakres RPC do podsieci DC) dla urządzeń podejrzanych, które muszą pozostać w sieci.

   ```
   deny tcp any <podsieć-DC> eq 88
   deny udp any <podsieć-DC> eq 88
   deny tcp any <podsieć-DC> eq 389
   deny tcp any <podsieć-DC> eq 445
   deny tcp any <podsieć-DC> eq 135
   permit ip any any
   ```
   _Oczekiwany rezultat:_ Profil dACL utworzony
3. **Administrator sieci / NAC:** Na zaporze wewnętrznej ogranicz ruch do podsieci DC do segmentów dozwolonych i adresów PAW; zablokuj protokoły administracyjne (RDP, WinRM, SMB) do DC spoza PAW.
   _Oczekiwany rezultat:_ Reguły aktywne
#### 3 · Brzeg

4. **Administrator sieci / NAC:** Zablokuj adresy zewnętrzne atakującego na zaporach brzegowych i VPN.
   _Oczekiwany rezultat:_ Reguły brzegowe aktywne
#### 4 · Rejestracja

5. **Administrator sieci / NAC:** Zapisz zmiany jako zmiany awaryjne z listą reguł do zdjęcia po incydencie.
   _Oczekiwany rezultat:_ Numer zmiany awaryjnej

### Weryfikacja wykonania

Z hosta testowego w profilu „DOSTĘP-DC-ZABRONIONY” porty DC są niedostępne; z PAW – dostępne. Logi zapory pokazują odrzucenia ruchu ze źródeł ataku.

### Wycofanie

Zdjęcie profili i reguł po DG5 według listy ze zmiany awaryjnej.

### Zapisy

Lista reguł i profili, numer zmiany awaryjnej, wynik testów.

### Mapowanie na wymagania

- NIST CSF 2.0 – PR.IR-01
- NIST CSF 2.0 – RS.MI-01
- ISO/IEC 27001:2022 – A.8.20

---

## PR-AD-3 · Zabezpieczenie logów i dowodów z AD

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny

### Cel

Zachowanie dowodów z kontrolerów domeny i AD (logi, baza katalogu, GPO, metadane replikacji) przed odtworzeniem lasu, z zachowaniem integralności.

### Zakres i wyzwalacz

Kontrolery domeny objęte incydentem oraz logi AD w SIEM. Uzupełnia wspólną procedurę PR-INF-3.

**Wyzwalacz:** izolacja DC (PR-AD-2); zawsze przed odtworzeniem lub usunięciem DC.

### Warunki wstępne

- Nośnik dowodowy lub magazyn z blokadą zapisu.
- Dostęp do konsoli hiperwizora (migawki DC).

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Migawki i obrazy DC | Analityk informatyki śledczej, Administrator AD | Kierownik incydentu | Kierownik odtwarzania | – |
| Eksport logów i metadanych AD | Administrator AD | Analityk informatyki śledczej | Zespół reagowania (CSIRT) | – |
| Łańcuch dowodowy | Analityk informatyki śledczej | Kierownik incydentu | Dział prawny / compliance | – |

### Przebieg

#### 1 · Obrazy

1. **Analityk informatyki śledczej:** Dla wirtualnych DC wykonaj migawkę z pamięcią i skopiuj pliki VM na nośnik dowodowy; dla fizycznych – pamięć RAM i obraz dysku (PR-INF-3).
   _Oczekiwany rezultat:_ Obrazy DC z sumami SHA-256
#### 2 · Logi

2. **Administrator AD:** Na działającym, odizolowanym DC wyeksportuj dzienniki zabezpieczeń, usług katalogowych, DNS i systemu.

   ```
   wevtutil epl Security E:\<nr>\<DC>-Security.evtx
   wevtutil epl "Directory Service" E:\<nr>\<DC>-DS.evtx
   wevtutil epl "DNS Server" E:\<nr>\<DC>-DNS.evtx
   wevtutil epl System E:\<nr>\<DC>-System.evtx
   ```
   _Oczekiwany rezultat:_ Pliki .evtx
#### 3 · Baza i konfiguracja

3. **Administrator AD:** Utwórz kopię bazy katalogu (IFM) z działającego DC do celów analizy.

   ```
   ntdsutil "activate instance ntds" "ifm" "create full E:\<nr>\ifm-<DC>" quit quit
   ```
   _Oczekiwany rezultat:_ Katalog IFM z ntds.dit i rejestrem
4. **Administrator AD:** Wykonaj kopię wszystkich GPO i zawartości SYSVOL.

   ```
   Backup-GPO -All -Path E:\<nr>\gpo
   robocopy \\<DC>\SYSVOL E:\<nr>\sysvol /E /COPY:DAT /R:1 /W:1
   ```
   _Oczekiwany rezultat:_ Kopia GPO i SYSVOL
5. **Administrator AD:** Zapisz metadane replikacji obiektów krytycznych (grupy uprzywilejowane, AdminSDHolder, konto KRBTGT).

   ```
   repadmin /showobjmeta <DC> "CN=Domain Admins,CN=Users,<DN domeny>" > E:\<nr>\meta-DA.txt
   ```
   _Oczekiwany rezultat:_ Pliki metadanych
#### 4 · SIEM

6. **SOC:** Wyeksportuj z SIEM i Defender for Identity zdarzenia dotyczące DC i kont uprzywilejowanych za okres od T0 minus 30 dni (IN-INF-3.1).
   _Oczekiwany rezultat:_ Eksporty z sumami
#### 5 · Integralność

7. **Analityk informatyki śledczej:** Policz sumy SHA-256, wpisz dowody do łańcucha dowodowego i przenieś do magazynu z blokadą zapisu. Plik ntds.dit traktuj jako zawierający skróty haseł – najwyższa klauzula ochrony.

   ```
   Get-FileHash -Algorithm SHA256 E:\<nr>\* | Export-Csv E:\<nr>\hashes-ad.csv -NoTypeInformation
   ```
   _Oczekiwany rezultat:_ Karta łańcucha dowodowego

### Kryteria wyjścia

- Obrazy, logi, IFM, GPO i metadane zabezpieczone z sumami kontrolnymi.
- KI potwierdził zgodę na odtworzenie lasu.

### Zapisy (dowody wykonania)

Rejestr dowodów AD, karty łańcucha dowodowego, sumy kontrolne.

### Instrukcje i checklisty

_Brak dokumentów podrzędnych._

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.28
- ISO/IEC 27001:2022 – A.8.15
- ISO/IEC 27037 – COLL
- ISO/IEC 27037 – PRES
- NIST CSF 2.0 – RS.AN-07

---

## PR-AD-4 · Odtworzenie usług AD

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny

### Cel

Odtworzenie lasu Active Directory z zatwierdzonej, czystej kopii w izolowanym środowisku, z unieważnieniem wszystkich poświadczeń, które mógł znać atakujący.

### Zakres i wyzwalacz

Las AD Rossmann Polska: pierwszy DC każdej domeny z kopii, pozostałe DC przez ponowną promocję. Metodyka zgodna z przewodnikiem Microsoft „Active Directory Forest Recovery”.

**Wyzwalacz:** decyzja DG2 (odtworzenie lasu z kopii) i zakończenie PR-AD-3.

### Warunki wstępne

- IRE: odizolowana sieć, hiperwizor, nowe stacje PAW, serwer NTP.
- Zatwierdzona kopia DC sprzed T0 dla każdej domeny (PR-BKP-3), hasło trybu DSRM.
- Lista DC do usunięcia z metadanych, lista zaufań, plan adresacji i DNS.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Przygotowanie IRE | Kierownik odtwarzania, Administrator sieci / NAC | Kierownik odtwarzania | Zespół reagowania (CSIRT) | Kierownik incydentu |
| Odtworzenie pierwszego DC | Administrator AD | Kierownik odtwarzania | Zespół reagowania (CSIRT), Dostawca | Kierownik incydentu |
| Unieważnienie poświadczeń | Administrator AD | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Odbudowa pozostałych DC | Administrator AD | Kierownik odtwarzania | – | Kierownik incydentu |

### Kolejność odtwarzania

1. Domena główna lasu – pierwszy zapisywalny DC z DNS i GC.
2. Pozostałe domeny – po jednym DC na domenę.
3. Unieważnienie poświadczeń (KRBTGT, konta tier 0, zaufania).
4. Odbudowa pozostałych DC przez promocję.
5. Usługi zależne: AD CS, DNS, synchronizacja z Entra ID.
6. Dopuszczenie (PR-AD-5), dopiero potem przyłączanie stref.

### Przebieg

#### 1 · Przygotowanie

1. **Kierownik odtwarzania:** Przygotuj IRE bez połączenia z siecią produkcyjną; zapewnij źródło czasu i nowe stacje PAW.
   _Oczekiwany rezultat:_ IRE gotowe, test braku łączności z produkcją
#### 2 · Pierwszy DC

2. **Administrator AD:** Odtwórz pierwszy DC domeny głównej z zatwierdzonej kopii według IN-AD-4.1 (autorytatywne odtworzenie SYSVOL).
   _Oczekiwany rezultat:_ DC uruchomiony w IRE
3. **Administrator AD:** Usuń metadane wszystkich pozostałych DC, przejmij role FSMO, unieważnij bieżącą pulę RID i zwiększ pulę dostępnych RID.
   _Oczekiwany rezultat:_ Jedyny DC z wszystkimi rolami
4. **Administrator AD:** Skonfiguruj DNS na odtworzonym DC (wskazanie na siebie), oczyść rekordy pozostałych DC, ustaw GC.
   _Oczekiwany rezultat:_ DNS i GC działają
#### 3 · Pozostałe domeny

5. **Administrator AD:** Powtórz odtworzenie dla pierwszego DC każdej pozostałej domeny.
   _Oczekiwany rezultat:_ Po jednym DC na domenę
#### 4 · Poświadczenia

6. **Administrator AD:** Zresetuj hasło KRBTGT dwukrotnie w każdej domenie (z odstępem na replikację), hasła wbudowanego konta Administrator, kont tier 0 i kont serwisowych tier 0.
   _Oczekiwany rezultat:_ Rejestr resetów
7. **Administrator AD:** Zresetuj hasła zaufań między domenami i lasami po obu stronach.

   ```
   netdom trust <domena_ufająca> /domain:<domena_zaufana> /resetOneSide /passwordT:<hasło> /userO:<administrator> /passwordO:*
   ```
   _Oczekiwany rezultat:_ Zaufania działają z nowymi hasłami
#### 5 · Oczyszczenie

8. **Administrator AD:** Usuń z odtworzonego katalogu wszystkie zmiany atakującego ustalone w PR-AD-1 (konta, członkostwa, GPO, delegacje, ACL).
   _Oczekiwany rezultat:_ Zgodność z bazą referencyjną
#### 6 · Odbudowa

9. **Administrator AD:** Odbuduj pozostałe DC przez instalację nowych serwerów i promocję (nie z kopii).

   ```
   Install-ADDSDomainController -DomainName <domena> -InstallDns -Credential (Get-Credential)
   ```
   _Oczekiwany rezultat:_ Nowe DC zreplikowane
10. **Administrator AD:** Odtwórz usługi zależne: AD CS (z rewizją wystawionych certyfikatów), synchronizację z Entra ID po oczyszczeniu katalogu.
   _Oczekiwany rezultat:_ Usługi zależne działają
#### 7 · Przekazanie

11. **Administrator AD:** Wypełnij CL-AD-4 i przekaż do weryfikacji (PR-AD-5).
   _Oczekiwany rezultat:_ CL-AD-4

### Kryteria wyjścia

- Las odtworzony w IRE, wszystkie DC odbudowane, replikacja działa.
- Poświadczenia tier 0 i KRBTGT unieważnione.
- Zmiany atakującego usunięte.

### Zapisy (dowody wykonania)

Dziennik odtworzenia z godzinami, użyta kopia (identyfikator, data), rejestr resetów poświadczeń, CL-AD-4.

### Instrukcje i checklisty

- Instrukcja: **CL-AD-4 · Odtworzenie usług AD** (v0.1, projekt)
- Instrukcja: **IN-AD-4.1 · Odtworzenie usług AD z zatwierdzonej kopii** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.30
- ISO/IEC 27001:2022 – A.8.13
- ISO/IEC 27031 – IRBC-3
- NIST SP 800-34 Rev. 1 – 5
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RC.RP
- NIST CSF 2.0 – RC.RP-01
- NIST CSF 2.0 – RC.RP-02
- NIST CSF 2.0 – RC.RP-03
- NIST SP 800-184 – TACT
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(c)

---

## CL-AD-4 · Odtworzenie usług AD

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny → PR-AD-4 · Odtworzenie usług AD

### Zastosowanie

Kontrola kompletności odtworzenia lasu AD.

### Lista kontrolna

1. **Kierownik odtwarzania:** IRE odizolowane od produkcji (test braku łączności)
2. **Administrator AD:** Pierwszy DC domeny głównej odtworzony z zatwierdzonej kopii
   _Oczekiwany rezultat:_ Identyfikator kopii
3. **Administrator AD:** SYSVOL odtworzony autorytatywnie, udziały dostępne
4. **Administrator AD:** Role FSMO przejęte
5. **Administrator AD:** Metadane pozostałych DC usunięte
6. **Administrator AD:** Pula RID unieważniona i zwiększona
7. **Administrator AD:** Hasło konta komputera DC zresetowane
8. **Administrator AD:** DNS i GC skonfigurowane
9. **Administrator AD:** Pierwsze DC pozostałych domen odtworzone
10. **Administrator AD:** KRBTGT zresetowane dwukrotnie w każdej domenie
   _Oczekiwany rezultat:_ Daty resetów
11. **Administrator AD:** Konta tier 0, Administrator i serwisowe tier 0 zresetowane
12. **Administrator AD:** Hasła zaufań zresetowane
13. **Administrator AD:** Zmiany atakującego usunięte z katalogu
14. **Administrator AD:** Pozostałe DC odbudowane przez promocję

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator AD. Zatwierdził: Kierownik odtwarzania.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-02

---

## IN-AD-4.1 · Odtworzenie usług AD z zatwierdzonej kopii

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny → PR-AD-4 · Odtworzenie usług AD

### Cel

Uruchomienie pierwszego kontrolera domeny z czystej kopii w IRE i przygotowanie go jako jedynego źródła katalogu dla domeny.

### Zastosowanie

Pierwszy DC każdej domeny w ramach PR-AD-4. Dwie ścieżki: odtworzenie stanu systemu (wbadmin) albo odtworzenie całej maszyny wirtualnej z kopii (np. Veeam) w IRE.

### Wymagane uprawnienia i narzędzia

- Zatwierdzona kopia DC sprzed T0 (identyfikator, data).
- Hasło trybu DSRM.
- IRE z siecią o tej samej adresacji co DC lub zaplanowaną zmianą adresu.

### Środki ostrożności

- Odtworzony DC nie może mieć łączności z żadnym DC produkcyjnym.
- Odtwarzaj tylko jeden DC na domenę z kopii; pozostałe DC buduj od nowa.
- Sprawdź zgodność czasu – rozbieżność ponad 5 min zablokuje Kerberos.

### Kroki

#### 1 · Odtworzenie

1. **Administrator AD:** Ścieżka VM: odtwórz maszynę DC z zatwierdzonego punktu do IRE, z odłączoną siecią przy pierwszym uruchomieniu.
   _Oczekiwany rezultat:_ VM DC w IRE
2. **Administrator AD:** Ścieżka stanu systemu: uruchom serwer w trybie DSRM i sprawdź dostępne wersje kopii.

   ```
   bcdedit /set safeboot dsrepair
   shutdown /r /t 0
   wbadmin get versions -backupTarget:<dysk>
   ```
   _Oczekiwany rezultat:_ Lista wersji kopii
3. **Administrator AD:** Odtwórz stan systemu z autorytatywnym odtworzeniem SYSVOL.

   ```
   wbadmin start systemstaterecovery -version:<MM/DD/RRRR-GG:MM> -backupTarget:<dysk> -authsysvol -quiet
   ```
   _Oczekiwany rezultat:_ Odtwarzanie zakończone
4. **Administrator AD:** Wyłącz tryb DSRM i uruchom serwer normalnie.

   ```
   bcdedit /deletevalue safeboot
   shutdown /r /t 0
   ```
   _Oczekiwany rezultat:_ Usługa NTDS uruchomiona
#### 2 · SYSVOL

5. **Administrator AD:** Ścieżka VM: jeśli SYSVOL nie jest udostępniony, wykonaj autorytatywne odtworzenie SYSVOL (DFSR): ustaw msDFSR-Options=1 i msDFSR-Enabled=FALSE na obiekcie subskrypcji SYSVOL tego DC, wymuś replikację, następnie msDFSR-Enabled=TRUE.

   ```
   Get-ADObject -SearchBase "CN=SYSVOL Subscription,CN=Domain System Volume,CN=DFSR-LocalSettings,CN=<DC>,OU=Domain Controllers,<DN domeny>" -Filter * -Properties msDFSR-Options, msDFSR-Enabled
   ```
   _Oczekiwany rezultat:_ Udziały SYSVOL i NETLOGON dostępne (net share)
#### 3 · Role i metadane

6. **Administrator AD:** Przejmij wszystkie role FSMO na odtworzonym DC.

   ```
   Move-ADDirectoryServerOperationMasterRole -Identity <DC> -OperationMasterRole SchemaMaster, DomainNamingMaster, PDCEmulator, RIDMaster, InfrastructureMaster -Force
   ```
   _Oczekiwany rezultat:_ netdom query fsmo: wszystkie role na <DC>
7. **Administrator AD:** Usuń metadane wszystkich pozostałych DC (obiekty serwerów, konta komputerów, rekordy DNS).

   ```
   ntdsutil "metadata cleanup" "remove selected server CN=<DCx>,CN=Servers,CN=<lokacja>,CN=Sites,CN=Configuration,<DN lasu>" quit quit
   ```
   _Oczekiwany rezultat:_ Tylko odtworzony DC w lokacjach i w OU Domain Controllers
#### 4 · RID i konto DC

8. **Administrator AD:** Unieważnij bieżącą pulę RID (skrypt z przewodnika Microsoft) i zwiększ wartość rIDAvailablePool o 100 000 w obiekcie CN=RID Manager$ (ADSI Edit).

   ```
   $Domain = New-Object System.DirectoryServices.DirectoryEntry
   $DomainSid = $Domain.objectSid
   $RootDSE = New-Object System.DirectoryServices.DirectoryEntry("LDAP://RootDSE")
   $RootDSE.UsePropertyCache = $false
   $RootDSE.Put("invalidateRidPool", $DomainSid.Value)
   $RootDSE.SetInfo()
   ```
   _Oczekiwany rezultat:_ Nowa pula RID przydzielona
9. **Administrator AD:** Zresetuj hasło konta komputera odtworzonego DC.

   ```
   netdom resetpwd /server:<DC> /userd:<domena>\<administrator> /passwordd:*
   ```
   _Oczekiwany rezultat:_ Polecenie wykonane pomyślnie
#### 5 · DNS i GC

10. **Administrator AD:** Skonfiguruj DNS: serwer wskazuje na siebie, usuń rekordy NS/SRV/A pozostałych DC, zarejestruj rekordy tego DC.

   ```
   ipconfig /registerdns
   nltest /dsregdns
   dcdiag /test:dns /v
   ```
   _Oczekiwany rezultat:_ Test DNS zaliczony
11. **Administrator AD:** Upewnij się, że DC jest wykazem globalnym.

   ```
   Set-ADObject (Get-ADDomainController <DC>).NTDSSettingsObjectDN -Replace @{options = '1'}
   ```
   _Oczekiwany rezultat:_ IsGlobalCatalog: True
#### 6 · Czas

12. **Administrator AD:** Na emulatorze PDC domeny głównej ustaw autorytatywne źródło czasu w IRE.

   ```
   w32tm /config /manualpeerlist:<serwer-ntp> /syncfromflags:manual /reliable:yes /update
   w32tm /resync
   ```
   _Oczekiwany rezultat:_ Czas zsynchronizowany
#### 7 · Rejestracja

13. **Administrator AD:** Zapisz użytą kopię, czasy i wyniki w dzienniku odtworzenia.
   _Oczekiwany rezultat:_ Dziennik odtworzenia

### Weryfikacja wykonania

`dcdiag /v /c` bez błędów krytycznych dla odtworzonego DC; `netdom query fsmo` wskazuje odtworzony DC; udziały SYSVOL i NETLOGON dostępne; logowanie kontem testowym działa.

### Wycofanie

W razie niepowodzenia usuń VM z IRE i powtórz z innym zatwierdzonym punktem kopii. Nigdy nie podłączaj nieudanego DC do produkcji.

### Zapisy

Dziennik odtworzenia (identyfikator kopii, czasy, polecenia, wyniki).

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- NIST CSF 2.0 – RC.RP-02
- NIST CSF 2.0 – RC.RP-03
- ISO/IEC 27031 – IRBC-3

---

## PR-AD-5 · Weryfikacja i dopuszczenie usług domenowych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny

### Cel

Potwierdzenie, że odtworzony las AD działa poprawnie i jest wolny od zmian atakującego, oraz formalne dopuszczenie go do eksploatacji (DG5) przed przyłączaniem systemów.

### Zakres i wyzwalacz

Odtworzony las AD, DNS, SYSVOL, GPO, AD CS i synchronizacja z Entra ID.

**Wyzwalacz:** zakończenie PR-AD-4.

### Warunki wstępne

- Baza referencyjna AD (eksport grup uprzywilejowanych, GPO, delegacji sprzed incydentu).
- Narzędzia oceny bezpieczeństwa AD (np. PingCastle, Purple Knight) dostępne w IRE.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Testy funkcjonalne | Administrator AD | Kierownik odtwarzania | – | Kierownik incydentu |
| Weryfikacja bezpieczeństwa | Zespół reagowania (CSIRT), Administrator AD | Kierownik incydentu | Dostawca | – |
| Decyzja DG5 | Kierownik incydentu | Kierownik incydentu | Kierownik odtwarzania, Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |
| Przyłączanie stref | Administrator sieci / NAC, Administrator AD | Kierownik odtwarzania | SOC | Service desk |

### Bramka dopuszczenia

Bramka DG5 z polityki (kryteria dopuszczenia do produkcji) musi być spełniona w całości. Brak spełnienia któregokolwiek kryterium blokuje dopuszczenie – odstępstwo zatwierdza wyłącznie Kierownik incydentu wraz z właścicielem procesu i jest wpisywane do rejestru ryzyk.

### Przebieg

#### 1 · Testy

1. **Administrator AD:** Wykonaj testy funkcjonalne AD według IN-AD-5.1 i wypełnij CL-AD-5.1.
   _Oczekiwany rezultat:_ CL-AD-5.1
#### 2 · Bezpieczeństwo

2. **Zespół reagowania (CSIRT):** Wykonaj weryfikację bezpieczeństwa AD według IN-AD-5.2.
   _Oczekiwany rezultat:_ Raport bezpieczeństwa AD
#### 3 · Dopuszczenie

3. **Kierownik incydentu:** Podejmij decyzję DG5 dla AD i wypełnij CL-AD-5.2.
   _Oczekiwany rezultat:_ CL-AD-5.2, wpis DG5
#### 4 · Przyłączanie

4. **Administrator sieci / NAC:** Przyłączaj strefy stopniowo do odtworzonego AD: najpierw serwery tier 1 odtworzone w IRE, następnie stacje i placówki, z monitorowaniem SOC.
   _Oczekiwany rezultat:_ Rejestr przyłączonych stref
5. **Administrator AD:** Napraw bezpieczny kanał komputerów, które utraciły relację zaufania.

   ```
   Test-ComputerSecureChannel -Repair -Credential (Get-Credential)
   ```
   _Oczekiwany rezultat:_ True
#### 5 · Użytkownicy

6. **Service desk:** Przeprowadź zmianę haseł użytkowników z weryfikacją tożsamości poza pocztą e-mail; priorytet – konta uprzywilejowane i konta z dostępem do danych wrażliwych.
   _Oczekiwany rezultat:_ Odsetek kont ze zmienionym hasłem
#### 6 · Chmura

7. **Administrator AD:** Wznów synchronizację z Entra ID po potwierdzeniu czystości katalogu.

   ```
   Set-ADSyncScheduler -SyncCycleEnabled $true
   Start-ADSyncSyncCycle -PolicyType Delta
   ```
   _Oczekiwany rezultat:_ Synchronizacja bez błędów
#### 7 · Monitoring

8. **SOC:** Włącz wzmożony monitoring AD (zmiany grup uprzywilejowanych, replikacja, Kerberos) na 30 dni.
   _Oczekiwany rezultat:_ Reguły monitoringu aktywne

### Kryteria wyjścia

- Testy funkcjonalne i bezpieczeństwa zaliczone.
- DG5 dla AD zapisana, strefy przyłączone zgodnie z planem.
- Monitoring wzmożony aktywny.

### Zapisy (dowody wykonania)

CL-AD-5.1, raport bezpieczeństwa AD, CL-AD-5.2, wpis DG5, rejestr przyłączonych stref.

### Instrukcje i checklisty

- Instrukcja: **CL-AD-5.1 · Weryfikacja i odbiór usług domenowych** (v0.1, projekt)
- Instrukcja: **CL-AD-5.2 · Dopuszczenie AD do eksploatacji** (v0.1, projekt)
- Instrukcja: **IN-AD-5.1 · Testowanie AD** (v0.1, projekt)
- Instrukcja: **IN-AD-5.2 · Weryfikacja bezpieczeństwa i poprawności działania AD** (v0.1, projekt)

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- NIST CSF 2.0 – RC.RP-06
- ISO/IEC 27001:2022 – A.8.9
- ISO/IEC 27001:2022 – A.8.32
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RC.RP
- NIST SP 800-184 – TACT

---

## CL-AD-5.1 · Weryfikacja i odbiór usług domenowych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny → PR-AD-5 · Weryfikacja i dopuszczenie usług domenowych

### Zastosowanie

Wyniki testów IN-AD-5.1.

### Lista kontrolna

1. **Administrator AD:** repadmin /replsummary bez błędów
   _Oczekiwany rezultat:_ Plik wyniku
2. **Administrator AD:** dcdiag bez błędów we wszystkich domenach
   _Oczekiwany rezultat:_ Plik wyniku
3. **Administrator AD:** Role FSMO i GC zgodne z planem
4. **Administrator AD:** Lokalizowanie DC i DNS poprawne
5. **Administrator AD:** Uwierzytelnianie Kerberos działa
6. **Administrator AD:** SYSVOL, NETLOGON i GPO działają
7. **Administrator AD:** Zaufania zweryfikowane
8. **Administrator AD:** AD CS działa (jeśli dotyczy)
9. **Administrator AD:** Czas zsynchronizowany na wszystkich DC

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator AD. Odebrał: Kierownik odtwarzania.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05

---

## CL-AD-5.2 · Dopuszczenie AD do eksploatacji

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny → PR-AD-5 · Weryfikacja i dopuszczenie usług domenowych

### Zastosowanie

Bramka DG5 dla AD.

### Lista kontrolna

1. **Administrator AD:** CL-AD-5.1 zaliczona
2. **Zespół reagowania (CSIRT):** Raport bezpieczeństwa AD bez ustaleń krytycznych
3. **Zespół reagowania (CSIRT):** Grupy uprzywilejowane, delegacje i GPO zgodne z bazą referencyjną
4. **Zespół reagowania (CSIRT):** Skan IoC/YARA DC bez wykryć
5. **SOC:** EDR i monitoring AD aktywne, logi w SIEM
6. **Administrator AD:** Plan przyłączania stref i zmiany haseł użytkowników zatwierdzony
7. **Kierownik odtwarzania:** Zmiana awaryjna zarejestrowana, plan wycofania gotowy
8. **Kierownik incydentu:** Decyzja DG5 zapisana
   _Oczekiwany rezultat:_ Wpis DG5

### Kryteria zaliczenia

Wszystkie punkty spełnione; brak odstępstw od bramki DG5.

### Zatwierdzenie

Zatwierdzają: Kierownik incydentu i Kierownik odtwarzania.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.8.32

---

## IN-AD-5.1 · Testowanie AD

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny → PR-AD-5 · Weryfikacja i dopuszczenie usług domenowych

### Cel

Potwierdzenie poprawnego działania usług domenowych: replikacji, DNS, uwierzytelniania Kerberos i NTLM, SYSVOL i zasad grupy, ról FSMO.

### Zastosowanie

Po odtworzeniu lasu (PR-AD-4) przed decyzją DG5 i po każdej fali przyłączania DC.

### Wymagane uprawnienia i narzędzia

Narzędzia RSAT (repadmin, dcdiag, nltest, netdom), konto testowe użytkownika i komputer testowy w IRE.

### Środki ostrożności

Testy wykonuj z PAW w IRE.

### Kroki

#### 1 · Replikacja

1. **Administrator AD:** Sprawdź stan replikacji między wszystkimi DC.

   ```
   repadmin /replsummary
   repadmin /showrepl * /csv > repl.csv
   ```
   _Oczekiwany rezultat:_ Brak błędów, ostatnia replikacja < 1 h
2. **Administrator AD:** Wykonaj pełną diagnostykę DC we wszystkich domenach.

   ```
   dcdiag /e /v /c /q
   ```
   _Oczekiwany rezultat:_ Brak błędów
#### 2 · Role

3. **Administrator AD:** Sprawdź role FSMO i wykazy globalne.

   ```
   netdom query fsmo
   Get-ADDomainController -Filter * | Select HostName, IsGlobalCatalog, OperationMasterRoles
   ```
   _Oczekiwany rezultat:_ Role zgodne z planem
#### 3 · DNS

4. **Administrator AD:** Sprawdź lokalizowanie DC i rejestrację DNS.

   ```
   nltest /dsgetdc:<domena>
   dcdiag /test:dns /e
   ```
   _Oczekiwany rezultat:_ DC odnalezione, test DNS zaliczony
#### 4 · Uwierzytelnianie

5. **Administrator AD:** Sprawdź uwierzytelnianie Kerberos kontem testowym na komputerze testowym.

   ```
   klist purge
   klist get krbtgt
   ```
   _Oczekiwany rezultat:_ Bilet TGT wydany
#### 5 · SYSVOL i GPO

6. **Administrator AD:** Sprawdź udziały SYSVOL i NETLOGON oraz stosowanie GPO na komputerze testowym.

   ```
   net share
   gpupdate /force
   gpresult /r
   ```
   _Oczekiwany rezultat:_ Udziały dostępne, GPO zastosowane
#### 6 · Zaufania

7. **Administrator AD:** Sprawdź zaufania między domenami i lasami.

   ```
   nltest /domain_trusts /all_trusts
   netdom trust <domena_ufająca> /domain:<domena_zaufana> /verify
   ```
   _Oczekiwany rezultat:_ Zaufania zweryfikowane
#### 7 · Usługi zależne

8. **Administrator AD:** Sprawdź AD CS (jeśli występuje): wydanie certyfikatu testowego i dostępność CRL.

   ```
   certutil -ping
   certutil -URL <plik.cer>
   ```
   _Oczekiwany rezultat:_ Certyfikat wydany, CRL dostępna

### Weryfikacja wykonania

Wszystkie testy zaliczone i udokumentowane w CL-AD-5.1.

### Wycofanie

Nie dotyczy.

### Zapisy

Wyniki poleceń (pliki), CL-AD-5.1.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.5.30

---

## IN-AD-5.2 · Weryfikacja bezpieczeństwa i poprawności działania AD

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator AD | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-AD · Plan reagowania na zaszyfrowany kontroler domeny → PR-AD-5 · Weryfikacja i dopuszczenie usług domenowych

### Cel

Potwierdzenie, że odtworzony katalog nie zawiera furtek atakującego i spełnia minimalne wymagania bezpieczeństwa tier 0.

### Zastosowanie

Przed DG5 dla AD oraz powtórnie po 30 dniach wzmożonego monitoringu.

### Wymagane uprawnienia i narzędzia

- Baza referencyjna AD sprzed incydentu.
- Narzędzia oceny bezpieczeństwa AD (PingCastle, Purple Knight) i moduł ActiveDirectory.

### Środki ostrożności

Wyniki narzędzi oceny zawierają dane wrażliwe o konfiguracji – przechowuj je jak dowody.

### Kroki

#### 1 · Uprawnienia

1. **Zespół reagowania (CSIRT):** Porównaj członków grup uprzywilejowanych z bazą referencyjną.

   ```
   foreach ($g in "Enterprise Admins","Domain Admins","Schema Admins","Administrators","Account Operators","Backup Operators","Server Operators") { Get-ADGroupMember $g -Recursive | Select @{n="Grupa";e={$g}}, SamAccountName }
   ```
   _Oczekiwany rezultat:_ Brak nieuprawnionych członków
2. **Zespół reagowania (CSIRT):** Sprawdź prawa DCSync, ACL AdminSDHolder i atrybut SIDHistory.

   ```
   Get-ADUser -Filter * -Properties SIDHistory | Where-Object SIDHistory | Select SamAccountName, SIDHistory
   ```
   _Oczekiwany rezultat:_ Brak nieuprawnionych wpisów
#### 2 · Delegacje

3. **Zespół reagowania (CSIRT):** Sprawdź delegacje nieograniczone i ograniczone poza DC.

   ```
   Get-ADComputer -Filter {TrustedForDelegation -eq $true -and PrimaryGroupID -ne 516} | Select Name
   Get-ADObject -Filter {msDS-AllowedToDelegateTo -like "*"} -Properties msDS-AllowedToDelegateTo
   ```
   _Oczekiwany rezultat:_ Tylko zatwierdzone delegacje
#### 3 · GPO

4. **Zespół reagowania (CSIRT):** Sprawdź GPO zmodyfikowane od T0 oraz skrypty logowania w SYSVOL.

   ```
   Get-GPO -All | Where-Object { $_.ModificationTime -ge $T0 } | Select DisplayName, ModificationTime
   ```
   _Oczekiwany rezultat:_ Każda zmiana wyjaśniona
#### 4 · Poświadczenia

5. **Zespół reagowania (CSIRT):** Potwierdź dwukrotny reset KRBTGT (data zmiany hasła) i reset kont tier 0.

   ```
   Get-ADUser krbtgt -Properties PasswordLastSet | Select PasswordLastSet
   ```
   _Oczekiwany rezultat:_ PasswordLastSet po odtworzeniu
#### 5 · Ocena

6. **Zespół reagowania (CSIRT):** Uruchom ocenę bezpieczeństwa AD (PingCastle / Purple Knight) i porównaj z wynikiem sprzed incydentu; usuń krytyczne ustalenia.

   ```
   PingCastle.exe --healthcheck --server <DC>
   ```
   _Oczekiwany rezultat:_ Brak ustaleń krytycznych
#### 6 · Monitoring

7. **Zespół reagowania (CSIRT):** Sprawdź, że EDR i Defender for Identity (lub odpowiednik) działają na wszystkich DC, a logi trafiają do SIEM.
   _Oczekiwany rezultat:_ Telemetria ze wszystkich DC
8. **Zespół reagowania (CSIRT):** Sprawdź skanem IoC/YARA wszystkie DC i SYSVOL.
   _Oczekiwany rezultat:_ 0 wykryć

### Weryfikacja wykonania

Raport bezpieczeństwa AD bez otwartych ustaleń krytycznych, podpisany przez zespół reagowania.

### Wycofanie

Nie dotyczy.

### Zapisy

Raport bezpieczeństwa AD, wyniki narzędzi oceny, lista usuniętych ustaleń.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.2
- ISO/IEC 27001:2022 – A.8.9
- NIST CSF 2.0 – RC.RP-05
- NIST CSF 2.0 – RS.MI-02

---

## PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Plan | techniczna | 0.1 | projekt | Dyrektor IT | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware

### 1. Cel i zakres

Plan opisuje reakcję na szyfrowanie lub przejęcie serwerów aplikacyjnych i baz danych Rossmann Polska (ERP, sklep internetowy, program lojalnościowy, systemy finansowe i kadrowe).

### 2. Scenariusz

Ransomware szyfruje pliki baz danych, binaria aplikacji lub maszyny wirtualne. Atakujący mógł wcześniej wykraść dane z baz (zrzuty, eksporty) i pozostawić konta lub web shelle w aplikacjach.

### 2a. Specyfika Rossmann Polska

- Aplikacje krytyczne: ERP (towar, ceny, zakupy, finanse), sklep rossmann.pl i aplikacja Rossmann PL (zakupy online, click & collect, Rossmann GO), CRM programu Klub Rossmanna, EDI z dostawcami, kadry i płace.
- CRM Klubu Rossmanna zawiera bardzo duży zbiór danych osobowych i historię zakupów – każdy incydent obejmujący tę bazę wymaga oceny RODO w pierwszych godzinach.
- Dla sklepu internetowego tryb awaryjny to strona serwisowa i wstrzymanie przyjmowania zamówień; dla ERP – ręczne zamówienia u kluczowych dostawców.

### 3. Sygnały wykrycia i wskaźniki naruszenia

- Usługi bazodanowe nie startują, pliki .mdf/.ldf, katalogi danych PostgreSQL lub pliki Oracle zmienione lub zaszyfrowane.
- Nietypowe zapytania eksportujące, zrzuty baz poza harmonogramem, nowe konta w bazach.
- Web shelle i nowe pliki w katalogach aplikacji WWW.
- Zaszyfrowane dyski maszyn wirtualnych lub datastore wirtualizacji.

### 4. Zasoby objęte planem

| System | Technologie | Wymagane RTO / RPO | Osiągalne RTO / RPO | Kopie | Ośrodek zapasowy |
|---|---|---|---|---|---|
| ERP: towar, ceny, zakupy, finanse | VMware vSphere / SRM, Microsoft SQL Server, Veeam Backup & Replication | 24 h / 30 min | 2 d / 24 h | Kopia dzienna, kopia niezmienna | Ośrodek zapasowy |
| EDI / B2B z dostawcami | Serwer Linux (RHEL / Ubuntu) | 2 d / 4 h | 24 h / 4 h | Kopia dzienna | – |
| Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) | Kubernetes (Velero), PostgreSQL | 24 h / 30 min | 8 h / 30 min | Kopie Velero i PITR bazy | Druga strefa dostępności |
| Program lojalnościowy Klub Rossmanna (CRM, dane klientów) | PostgreSQL | 24 h / 30 min | 24 h / 1 h | PITR bazy, kopia niezmienna | Replika |
| Kadry i płace | Microsoft SQL Server | 5 d / 24 h | 3 d / 24 h | Kopia dzienna | Ośrodek zapasowy |

### 5. Wpływ na procesy biznesowe i cele odtworzenia

| Proces | Właściciel | Krytyczność | MTPD | RTO | RPO | MBCO |
|---|---|---|---|---|---|---|
| Zaopatrzenie drogerii z centrów dystrybucyjnych | Dyrektor logistyki | 5 – krytyczna | 3 d | 24 h | 4 h | Dostawy uzupełniające produktów o najwyższej rotacji do drogerii z najniższym zapasem |
| Zakupy i zarządzanie zapasami | Dyrektor handlowy | 4 | 5 d | 2 d | 4 h | Zamówienia u kluczowych dostawców (ręcznie / EDI) |
| Sprzedaż internetowa i click & collect | Dyrektor e-commerce | 4 | 2 d | 24 h | 30 min | Przyjmowanie i realizacja zamówień z odbiorem w drogerii |
| Finanse i płatności do dostawców | Dyrektor finansowy | 4 | 7 d | 3 d | 24 h | Płatności krytyczne (wynagrodzenia, podatki, kluczowi dostawcy) |
| Program lojalnościowy i aplikacja klienta | Dyrektor marketingu | 3 – średnia | 3 d | 2 d | 1 h | Identyfikacja członków Klubu i naliczanie rabatów (możliwe ręczne korekty) |
| Wynagrodzenia i kadry | Dyrektor HR | 3 – średnia | 10 d | 5 d | 24 h | Wypłata wynagrodzeń w terminie (również według listy z poprzedniego miesiąca) |

### 6. Kryteria aktywacji i klasyfikacja

Aktywacja po potwierdzeniu szyfrowania lub przejęcia serwera aplikacyjnego albo bazy wspierającej proces krytyczny. Kategoria K1 dla systemów wspierających procesy o krytyczności 4–5.

### 7. Organizacja reagowania

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Ocena zakresu naruszenia | Administrator aplikacji, Administrator baz danych, Zespół reagowania (CSIRT) | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |
| Izolacja serwera / aplikacji | Administrator aplikacji, Administrator sieci / NAC | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |
| Odtworzenie aplikacji i baz | Administrator aplikacji, Administrator baz danych, Administrator kopii zapasowych | Kierownik odtwarzania | Dostawca | Kierownik incydentu |
| Weryfikacja spójności danych | Administrator baz danych, Właściciel procesu biznesowego | Kierownik odtwarzania | Zespół reagowania (CSIRT) | Kierownik incydentu |
| Dopuszczenie do produkcji | Administrator aplikacji | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |

### 8. Przebieg reagowania

| Faza | Cel | Procedura | Cel czasowy |
|---|---|---|---|
| Ocena | zakres, dane, eksfiltracja, zależności | PR-APP-1 | 2 h |
| Izolacja | odcięcie serwera, zatrzymanie sesji | PR-APP-2 | 30 min od DG0 |
| Odtworzenie | serwer i baza z czystych źródeł w IRE | PR-APP-3 | według RTO |
| Weryfikacja | integralność i spójność danych | PR-APP-4 | przed DG5 |
| Dopuszczenie | testy, ruch produkcyjny | PR-APP-5 | DG5 |

### 9. Ciągłość działania w trakcie incydentu

Tryby awaryjne właścicieli procesów: zamówienia telefoniczne lub e-mail z kanału awaryjnego, ręczne rejestry sprzedaży internetowej, wstrzymanie programów rabatowych, płatności krytyczne z bankowości elektronicznej z autoryzacją dwuosobową. Dane z trybu awaryjnego wprowadza się po odtworzeniu (PR-APP-4).

### 10. Punkty decyzyjne

- DG2: odtworzenie bazy do punktu w czasie (PITR) sprzed T0 czy z pełnej kopii.
- DG2: odtworzenie serwera aplikacyjnego z kopii czy nowa instalacja z repozytorium artefaktów (zalecane przy podejrzeniu furtek).
- Akceptacja utraty danych między punktem odtworzenia a incydentem (właściciel procesu).
- Ocena naruszenia RODO i PCI DSS dla baz z danymi klientów.

### 11. Komunikacja i obowiązki raportowe

Komunikację wewnętrzną prowadzi się kanałem pozapasmowym. Komunikaty do pracowników, klientów, dostawców i mediów zatwierdza przewodniczący ZZK. Kierownik incydentu raportuje stan co 2 h w fazie ograniczania i co 4 h w fazie odtwarzania (CSF RC.CO-03).

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

### 12. Kryteria zakończenia

- Aplikacje i bazy odtworzone, spójność potwierdzona uzgodnieniami.
- Dane z trybu awaryjnego wprowadzone i uzgodnione.
- Poświadczenia aplikacyjne i sekrety zmienione.
- DG5 spełniona.

### 13. Błędy, których należy unikać

- Przywracanie bazy na zainfekowany serwer.
- Pozostawienie dawnych haseł kont aplikacyjnych i łańcuchów połączeń.
- Pominięcie integracji (kolejki, EDI, API) – system działa, ale dane się rozjeżdżają.
- Brak uzgodnienia danych z systemami zależnymi przed dopuszczeniem.

### 14. Procedury, instrukcje i checklisty

- Procedura: **PR-APP-1 · Ocena zakresu naruszenia aplikacji lub bazy** (v0.1, projekt)
- Procedura: **PR-APP-2 · Izolacja naruszonego serwera lub aplikacji** (v0.1, projekt)
- Procedura: **PR-APP-3 · Odtworzenie aplikacji i baz danych** (v0.1, projekt)
- Procedura: **PR-APP-4 · Weryfikacja integralności i spójności danych** (v0.1, projekt)
- Procedura: **PR-APP-5 · Dopuszczenie aplikacji do produkcji** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.5.30
- ISO/IEC 27001:2022 – A.8.13
- ISO/IEC 27031 – IRBC-3
- NIST SP 800-34 Rev. 1 – 5
- NIST CSF 2.0 – RC.RP-02
- NIST CSF 2.0 – RC.RP-05
- NIST SP 800-184 – TACT
- DORA – rozporządzenie (UE) 2022/2554 – art. 11(3)
- RODO – rozporządzenie (UE) 2016/679 – art. 32(1)(c)

---

## PR-APP-1 · Ocena zakresu naruszenia aplikacji lub bazy

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych

### Cel

Ustalenie, które serwery aplikacyjne, bazy danych i komponenty (wirtualizacja, magazyny danych, integracje) są zaszyfrowane lub przejęte, czy dane zostały wykradzione lub zmienione oraz jakie procesy są dotknięte.

### Zakres i wyzwalacz

Aplikacje biznesowe Rossmann Polska (ERP, sklep internetowy, program lojalnościowy, systemy finansowe i kadrowe), ich bazy danych, serwery WWW, kolejki integracyjne i platforma wirtualizacji.

**Wyzwalacz:** niedostępność aplikacji z oznakami szyfrowania, alert EDR na serwerze aplikacyjnym lub bazodanowym, wykrycie web shella lub nietypowego eksportu danych.

### Warunki wstępne

- Mapa zależności aplikacji (serwery, bazy, integracje, konta serwisowe).
- Dostęp DBA i administratorów aplikacji z PAW.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Stan serwerów i baz | Administrator aplikacji, Administrator baz danych | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Ślady eksfiltracji i manipulacji danymi | Zespół reagowania (CSIRT), Administrator baz danych | Kierownik incydentu | Analityk informatyki śledczej | – |
| Wpływ biznesowy i dane wrażliwe | Właściciel procesu biznesowego, Inspektor ochrony danych | Kierownik incydentu | Dział prawny / compliance | Zespół zarządzania kryzysowego |

### Przebieg

#### 1 · Stan

1. **Administrator aplikacji:** Sporządź listę komponentów każdej dotkniętej aplikacji ze stanem: działa / zaszyfrowany / podejrzany / niedostępny.
   _Oczekiwany rezultat:_ Tabela komponentów
2. **Administrator aplikacji:** Sprawdź platformę wirtualizacji: zaszyfrowane dyski VM, magazyny danych, dostęp do konsoli hiperwizora.
   _Oczekiwany rezultat:_ Ocena warstwy wirtualizacji
#### 2 · Bazy danych

3. **Administrator baz danych:** Sprawdź bazy: stan, nietypowe sesje i loginy utworzone po T0, włączone niebezpieczne funkcje.

   ```
   SELECT name, create_date, modify_date FROM sys.server_principals WHERE create_date > '<T0>';
   SELECT name, value_in_use FROM sys.configurations WHERE name = 'xp_cmdshell';
   ```
   _Oczekiwany rezultat:_ Lista nieuprawnionych zmian
4. **Administrator baz danych:** Sprawdź kopie i eksporty baz wykonane poza harmonogramem (możliwa eksfiltracja).

   ```
   SELECT b.database_name, b.backup_start_date, m.physical_device_name FROM msdb.dbo.backupset b JOIN msdb.dbo.backupmediafamily m ON b.media_set_id = m.media_set_id WHERE b.backup_start_date > '<T0>';
   ```
   _Oczekiwany rezultat:_ Lista kopii i eksportów
#### 3 · Aplikacje

5. **Zespół reagowania (CSIRT):** Wyszukaj web shelle i zmodyfikowane pliki aplikacji WWW od T0.

   ```
   Get-ChildItem C:\inetpub\wwwroot -Recurse -Include *.aspx, *.ashx, *.asmx, *.config | Where-Object LastWriteTime -gt $T0 | Select FullName, LastWriteTime
   find /var/www -type f -newermt "<T0>" -name "*.php"
   ```
   _Oczekiwany rezultat:_ Lista plików do analizy
6. **Zespół reagowania (CSIRT):** Oceń możliwość manipulacji danymi (zmiany cen, kont bankowych dostawców, uprawnień) – porównaj kluczowe tabele z kopią sprzed T0.
   _Oczekiwany rezultat:_ Ocena integralności danych biznesowych
#### 4 · Wpływ

7. **Właściciel procesu biznesowego:** Określ wpływ na procesy, czas do MTPD i tryb awaryjny.
   _Oczekiwany rezultat:_ Ocena wpływu
8. **Inspektor ochrony danych:** Oceń naruszenie danych osobowych i – dla danych kart – obowiązki PCI DSS.
   _Oczekiwany rezultat:_ Ocena RODO / PCI
#### 5 · Decyzja

9. **Kierownik incydentu:** Wypełnij CL-APP-1 i zdecyduj o strategii: odtworzenie z kopii czy odbudowa z repozytorium artefaktów (DG2).
   _Oczekiwany rezultat:_ CL-APP-1, wpis DG2

### Kryteria wyjścia

- Stan wszystkich komponentów znany, ślady eksfiltracji i manipulacji ocenione.
- Strategia odtworzenia wybrana, obowiązki regulacyjne zidentyfikowane.

### Zapisy (dowody wykonania)

Tabela komponentów, lista zmian w bazach, lista podejrzanych plików, ocena wpływu, CL-APP-1.

### Instrukcje i checklisty

- Instrukcja: **CL-APP-1 · Ocena naruszenia aplikacji i bazy** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.25
- NIST CSF 2.0 – RS.AN-03
- NIST CSF 2.0 – RS.AN-08
- RODO – rozporządzenie (UE) 2016/679 – art. 33
- PCI DSS v4.0.1 – 12.10.1

---

## CL-APP-1 · Ocena naruszenia aplikacji i bazy

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych → PR-APP-1 · Ocena zakresu naruszenia aplikacji lub bazy

### Zastosowanie

Podsumowanie PR-APP-1.

### Lista kontrolna

1. **Administrator aplikacji:** Stan wszystkich komponentów aplikacji ustalony
2. **Administrator aplikacji:** Warstwa wirtualizacji oceniona
3. **Administrator baz danych:** Nieuprawnione loginy i konfiguracje w bazach zidentyfikowane
4. **Administrator baz danych:** Kopie i eksporty poza harmonogramem sprawdzone
5. **Zespół reagowania (CSIRT):** Web shelle i zmodyfikowane pliki wyszukane
6. **Zespół reagowania (CSIRT):** Możliwa manipulacja danymi oceniona
7. **Właściciel procesu biznesowego:** Wpływ na procesy i tryb awaryjny określone
8. **Inspektor ochrony danych:** Ocena RODO / PCI wykonana
9. **Kierownik incydentu:** Strategia odtworzenia wybrana (DG2)

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator aplikacji i DBA. Zatwierdził: Kierownik incydentu.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.AN-08

---

## PR-APP-2 · Izolacja naruszonego serwera lub aplikacji

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych

### Cel

Odcięcie zaszyfrowanych lub przejętych serwerów i aplikacji, zatrzymanie szkodliwych sesji w bazach oraz ochrona danych przed dalszą modyfikacją i wyciekiem.

### Zakres i wyzwalacz

Serwery aplikacyjne, bazy danych, serwery WWW i komponenty integracyjne w zakresie z PR-APP-1.

**Wyzwalacz:** decyzja DG1 albo natychmiast przy aktywnym szyfrowaniu lub eksfiltracji.

### Warunki wstępne

- Lista komponentów z PR-APP-1.
- Uprawnienia do EDR, NAC, zapór, wirtualizacji i baz danych.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Izolacja serwerów | Administrator aplikacji, SOC | Kierownik incydentu | Właściciel procesu biznesowego | – |
| Zatrzymanie sesji w bazach | Administrator baz danych | Kierownik incydentu | Administrator aplikacji | – |
| Ograniczenie segmentu w NAC | Administrator sieci / NAC | Kierownik incydentu | Administrator aplikacji | – |
| Strona informacyjna dla klientów | Administrator aplikacji, Komunikacja | Zespół zarządzania kryzysowego | – | klienci |

### Przebieg

#### 1 · Klienci

1. **Komunikacja:** Dla aplikacji klienckich (sklep, aplikacja mobilna) przełącz ruch na stronę serwisową z komunikatem zatwierdzonym przez ZZK.
   _Oczekiwany rezultat:_ Strona serwisowa aktywna
#### 2 · Bazy

2. **Administrator baz danych:** Zakończ szkodliwe sesje w bazach i zablokuj użyte loginy; ustaw bazy w trybie ograniczonego dostępu.

   ```
   SELECT session_id, login_name, host_name, program_name FROM sys.dm_exec_sessions WHERE is_user_process = 1;
   KILL <session_id>;
   ALTER LOGIN [<login>] DISABLE;
   ```
   _Oczekiwany rezultat:_ Brak szkodliwych sesji
#### 3 · Serwery

3. **Administrator aplikacji:** Odizoluj serwery aplikacyjne według IN-APP-2.1.
   _Oczekiwany rezultat:_ Serwery odizolowane
4. **Administrator sieci / NAC:** Ogranicz dostęp do segmentu aplikacji i baz danych w NAC i na zaporach według IN-APP-2.2.
   _Oczekiwany rezultat:_ Segment ograniczony
#### 4 · Integracje

5. **Administrator aplikacji:** Wstrzymaj integracje (kolejki, EDI, API) z systemami zależnymi, aby nie propagować danych z naruszonego systemu; zapisz stan kolejek.
   _Oczekiwany rezultat:_ Integracje wstrzymane, stan kolejek zapisany
6. **Administrator aplikacji:** Zmień sekrety używane przez aplikację w innych systemach (klucze API, hasła kont serwisowych), jeśli mogły zostać odczytane.
   _Oczekiwany rezultat:_ Sekrety zmienione
#### 5 · Weryfikacja

7. **SOC:** Zweryfikuj skuteczność izolacji (IN-INF-2.4).
   _Oczekiwany rezultat:_ Raport weryfikacji

### Kryteria wyjścia

- Komponenty odizolowane, szkodliwe sesje zakończone, integracje wstrzymane.
- Klienci poinformowani przez stronę serwisową.

### Zapisy (dowody wykonania)

Rejestr izolacji, eksport sesji, stan kolejek, lista zmienionych sekretów.

### Instrukcje i checklisty

- Instrukcja: **IN-APP-2.1 · Izolacja serwera aplikacyjnego** (v0.1, projekt)
- Instrukcja: **IN-APP-2.2 · Ograniczenie dostępu do segmentu serwera aplikacyjnego lub bazy danych w NAC** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.8.22
- NIST CSF 2.0 – RS.MI-01

---

## IN-APP-2.1 · Izolacja serwera aplikacyjnego

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych → PR-APP-2 · Izolacja naruszonego serwera lub aplikacji

### Cel

Odcięcie serwera aplikacyjnego lub bazodanowego od sieci przy zachowaniu stanu do analizy.

### Zastosowanie

Serwery w zakresie PR-APP-2. Przykłady dla EDR, VMware i Hyper-V.

### Wymagane uprawnienia i narzędzia

Uprawnienia do EDR i konsoli wirtualizacji (konta niezależne od domeny).

### Środki ostrożności

- Nie wyłączaj serwera.
- Przy klastrach baz danych izoluj wszystkie węzły objęte incydentem, aby nie nastąpiło automatyczne przełączenie na węzeł zainfekowany.

### Kroki

#### 1 · Dowód

1. **Administrator aplikacji:** Zapisz stan serwera: uruchomione usługi, połączenia sieciowe (do dowodów).

   ```
   Get-NetTCPConnection -State Established | Export-Csv E:\<nr>\<host>-tcp.csv -NoTypeInformation
   ss -tunap > /mnt/dowody/<host>-ss.txt
   ```
   _Oczekiwany rezultat:_ Plik stanu
#### 2 · Izolacja

2. **SOC:** Odizoluj serwer w EDR (IN-INF-2.1).
   _Oczekiwany rezultat:_ Status: odizolowany
3. **Administrator aplikacji:** Dodatkowo odłącz kartę sieciową VM (gdy EDR wyłączony lub serwer bez EDR).

   ```
   Get-VM "<serwer>" | Get-NetworkAdapter | Set-NetworkAdapter -Connected:$false -Confirm:$false
   Disconnect-VMNetworkAdapter -VMName "<serwer>"
   ```
   _Oczekiwany rezultat:_ Brak łączności
#### 3 · Klastry

4. **Administrator aplikacji:** Klastry: wstrzymaj automatyczne przełączanie (np. tryb ręczny grupy dostępności), aby nie aktywować węzła podejrzanego.

   ```
   ALTER AVAILABILITY GROUP [<ag>] MODIFY REPLICA ON '<węzeł>' WITH (FAILOVER_MODE = MANUAL);
   ```
   _Oczekiwany rezultat:_ Tryb przełączania ręczny
#### 4 · Dowody

5. **Administrator aplikacji:** Wykonaj migawkę VM z pamięcią do celów dowodowych (PR-INF-3).
   _Oczekiwany rezultat:_ Migawka utworzona
#### 5 · Rejestracja

6. **Administrator aplikacji:** Zapisz w rejestrze izolacji serwer, metodę, godzinę i wykonawcę.
   _Oczekiwany rezultat:_ Wpis w rejestrze

### Weryfikacja wykonania

Konsola EDR: odizolowany; brak połączeń serwera poza EDR (IN-INF-2.4).

### Wycofanie

Serwerów naruszonych nie przywraca się do produkcji – zastępują je serwery odtworzone w IRE.

### Zapisy

Plik stanu, rejestr izolacji.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.MI-01

---

## IN-APP-2.2 · Ograniczenie dostępu do segmentu serwera aplikacyjnego lub bazy danych w NAC

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych → PR-APP-2 · Izolacja naruszonego serwera lub aplikacji

### Cel

Ograniczenie ruchu do segmentu aplikacji i baz danych do niezbędnych przepływów, aby zatrzymać ruch boczny i eksfiltrację.

### Zastosowanie

Izolacja w PR-APP-2, szczególnie gdy naruszonych jest kilka serwerów w segmencie.

### Wymagane uprawnienia i narzędzia

Uprawnienia do NAC i zapór; macierz przepływów aplikacji.

### Środki ostrożności

Zablokowanie portów bazy danych zatrzyma wszystkie aplikacje korzystające z tej bazy – uzgodnij w DG1.

### Kroki

#### 1 · NAC

1. **Administrator sieci / NAC:** Utwórz profil „APLIKACJE-INCYDENT” z dACL zezwalającym tylko na zarządzanie z PAW i ruch do serwera kopii.

   ```
   permit tcp host <PAW> <podsieć-aplikacji> eq 3389
   permit tcp host <PAW> <podsieć-aplikacji> eq 22
   permit ip <podsieć-aplikacji> host <serwer-kopii>
   deny ip any <podsieć-aplikacji>
   ```
   _Oczekiwany rezultat:_ Profil utworzony
2. **Administrator sieci / NAC:** Przypisz profil urządzeniom segmentu (dla serwerów fizycznych z 802.1X/MAB) i wymuś CoA.
   _Oczekiwany rezultat:_ Profil aktywny
#### 2 · Zapora

3. **Administrator sieci / NAC:** Na zaporze zablokuj porty baz danych (1433, 1521, 5432, 3306) i protokoły administracyjne z sieci użytkowników i placówek do segmentu.
   _Oczekiwany rezultat:_ Reguły aktywne
4. **Administrator sieci / NAC:** Zablokuj ruch wychodzący z segmentu do internetu.
   _Oczekiwany rezultat:_ Reguła aktywna
#### 3 · Rejestracja

5. **Administrator sieci / NAC:** Zarejestruj zmianę awaryjną z listą reguł.
   _Oczekiwany rezultat:_ Numer zmiany

### Weryfikacja wykonania

`Test-NetConnection <serwer-bazy> -Port 1433` z sieci użytkowników – False; z PAW (zarządzanie) – zgodnie z dACL.

### Wycofanie

Po DG5 – wdrożenie docelowej macierzy przepływów zamiast powrotu do stanu sprzed incydentu.

### Zapisy

Lista reguł, numer zmiany, wyniki testów.

### Mapowanie na wymagania

- NIST CSF 2.0 – PR.IR-01
- ISO/IEC 27001:2022 – A.8.22

---

## PR-APP-3 · Odtworzenie aplikacji i baz danych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych

### Cel

Odtworzenie aplikacji i baz danych w IRE z czystych źródeł, w kolejności zależności i w czasie nie dłuższym niż RTO.

### Zakres i wyzwalacz

Komponenty aplikacji z PR-APP-1 w kolejności: tożsamość (PL-AD) → bazy danych → serwery aplikacyjne → serwery WWW → integracje.

**Wyzwalacz:** decyzja DG2, dostępność tożsamości (AD dopuszczone lub konta lokalne w IRE) i czystych punktów kopii.

### Warunki wstępne

- IRE z segmentem aplikacyjnym.
- Zatwierdzone punkty kopii baz (sprzed T0) i artefakty aplikacji z zaufanego repozytorium (sumy kontrolne).
- Nowe sekrety i poświadczenia kont serwisowych.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Odtworzenie baz danych | Administrator baz danych, Administrator kopii zapasowych | Kierownik odtwarzania | Administrator aplikacji | Kierownik incydentu |
| Odbudowa serwerów aplikacyjnych | Administrator aplikacji | Kierownik odtwarzania | Dostawca | Kierownik incydentu |
| Akceptacja punktu odtworzenia | Właściciel procesu biznesowego | Właściciel procesu biznesowego | Administrator baz danych | Zespół zarządzania kryzysowego |

### Przebieg

#### 1 · Akceptacja

1. **Właściciel procesu biznesowego:** Zaakceptuj punkt odtworzenia bazy i wynikającą z niego utratę danych; wskaż źródła do odtworzenia danych utraconych (dokumenty, systemy partnerów, tryb awaryjny).
   _Oczekiwany rezultat:_ Akceptacja z podpisem
#### 2 · Bazy

2. **Administrator baz danych:** Odtwórz bazę danych w IRE według IN-APP-3.2.
   _Oczekiwany rezultat:_ Baza odtworzona
#### 3 · Aplikacje

3. **Administrator aplikacji:** Odbuduj serwer aplikacyjny według IN-APP-3.1 (preferowana nowa instalacja z artefaktów; odtworzenie VM tylko z kopii sprzed T0 po skanie).
   _Oczekiwany rezultat:_ Serwer aplikacyjny działa
4. **Administrator aplikacji:** Skonfiguruj aplikację z nowymi poświadczeniami i sekretami (łańcuchy połączeń, klucze API, certyfikaty, jeśli klucze prywatne mogły wyciec).
   _Oczekiwany rezultat:_ Konfiguracja z nowymi sekretami
#### 4 · Integracje

5. **Administrator aplikacji:** Odtwórz konfigurację integracji, ale pozostaw je wyłączone do PR-APP-5.
   _Oczekiwany rezultat:_ Integracje gotowe, wyłączone
#### 5 · Kontrola

6. **Administrator aplikacji:** Wypełnij CL-APP-3.
   _Oczekiwany rezultat:_ CL-APP-3

### Kryteria wyjścia

- Bazy i serwery odtworzone w IRE z czystych źródeł, z nowymi sekretami.
- Integracje przygotowane, wyłączone.

### Zapisy (dowody wykonania)

Dziennik odtworzenia (punkty, artefakty, sumy, czasy), akceptacja utraty danych, CL-APP-3.

### Instrukcje i checklisty

- Instrukcja: **CL-APP-3 · Odtworzenie aplikacji i bazy** (v0.1, projekt)
- Instrukcja: **IN-APP-3.1 · Odtworzenie serwera aplikacyjnego** (v0.1, projekt)
- Instrukcja: **IN-APP-3.2 · Odtworzenie bazy danych** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- ISO/IEC 27001:2022 – A.5.30
- ISO/IEC 27031 – IRBC-3
- NIST SP 800-34 Rev. 1 – 5
- NIST CSF 2.0 – RC.RP-02
- NIST CSF 2.0 – RC.RP-03
- NIST SP 800-184 – TACT
- DORA – rozporządzenie (UE) 2022/2554 – art. 11(3)

---

## CL-APP-3 · Odtworzenie aplikacji i bazy

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych → PR-APP-3 · Odtworzenie aplikacji i baz danych

### Zastosowanie

Kontrola po PR-APP-3.

### Lista kontrolna

1. **Właściciel procesu biznesowego:** Punkt odtworzenia i utrata danych zaakceptowane
2. **Administrator baz danych:** Kopie zweryfikowane przed odtworzeniem
3. **Administrator baz danych:** Baza odtworzona do punktu sprzed T0
4. **Administrator baz danych:** Loginy atakującego usunięte, niebezpieczne funkcje wyłączone
5. **Administrator aplikacji:** Serwer aplikacyjny odbudowany z zaufanych źródeł
6. **Administrator aplikacji:** Sumy kontrolne artefaktów zweryfikowane
7. **Administrator aplikacji:** Nowe sekrety i hasła kont serwisowych wprowadzone
8. **Zespół reagowania (CSIRT):** Skan IoC/YARA serwerów bez wykryć
9. **Administrator aplikacji:** Integracje przygotowane, wyłączone

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator aplikacji i DBA. Zatwierdził: Kierownik odtwarzania.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-02

---

## IN-APP-3.1 · Odtworzenie serwera aplikacyjnego

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych → PR-APP-3 · Odtworzenie aplikacji i baz danych

### Cel

Uruchomienie serwera aplikacyjnego w IRE z zaufanych źródeł, bez artefaktów atakującego.

### Zastosowanie

Odtwarzanie aplikacji w PR-APP-3.

### Wymagane uprawnienia i narzędzia

- Złoty obraz systemu operacyjnego lub szablon IaC.
- Artefakty aplikacji z repozytorium z sumami kontrolnymi lub podpisami.
- Konfiguracja z repozytorium wersji, nowe sekrety.

### Środki ostrożności

- Nie kopiuj plików konfiguracyjnych ani skryptów z naruszonego serwera.
- Odtworzenie VM z kopii dopuszczalne tylko z punktu sprzed T0 po skanie (IN-BKP-1.1) i z rewizją zadań, usług i kont lokalnych.

### Kroki

#### 1 · System

1. **Administrator aplikacji:** Wdróż nowy serwer ze złotego obrazu lub szablonu IaC w segmencie aplikacyjnym IRE.
   _Oczekiwany rezultat:_ Serwer uruchomiony
2. **Administrator aplikacji:** Zainstaluj poprawki, EDR (tryb blokowania), agenta logów i zaporę hosta zgodnie z konfiguracją bazową.
   _Oczekiwany rezultat:_ Zgodność z konfiguracją bazową
#### 2 · Aplikacja

3. **Administrator aplikacji:** Pobierz artefakty aplikacji z zaufanego repozytorium i zweryfikuj sumy kontrolne lub podpisy.

   ```
   Get-FileHash -Algorithm SHA256 <artefakt>
   sha256sum -c <artefakty>.sha256
   ```
   _Oczekiwany rezultat:_ Sumy zgodne
4. **Administrator aplikacji:** Zainstaluj aplikację i zastosuj konfigurację z repozytorium wersji.
   _Oczekiwany rezultat:_ Aplikacja zainstalowana
#### 3 · Sekrety

5. **Administrator aplikacji:** Wprowadź nowe sekrety z sejfu haseł (łańcuchy połączeń, klucze API, certyfikaty); konta serwisowe z nowymi hasłami lub gMSA.
   _Oczekiwany rezultat:_ Aplikacja korzysta z nowych sekretów
#### 4 · Uruchomienie

6. **Administrator aplikacji:** Uruchom usługi i wykonaj test podstawowy (strona logowania, połączenie z bazą w IRE).
   _Oczekiwany rezultat:_ Test podstawowy zaliczony
#### 5 · Kontrola

7. **Zespół reagowania (CSIRT):** Przeskanuj serwer skanerem IoC/YARA.
   _Oczekiwany rezultat:_ 0 wykryć

### Weryfikacja wykonania

Serwer działa w IRE, aplikacja łączy się z odtworzoną bazą, skan czysty, konfiguracja zgodna z repozytorium.

### Wycofanie

Usunięcie serwera i ponowne wdrożenie z szablonu.

### Zapisy

Dziennik odbudowy (obraz, wersje artefaktów, sumy, czasy).

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-02
- ISO/IEC 27001:2022 – A.8.9
- ISO/IEC 27001:2022 – A.8.32

---

## IN-APP-3.2 · Odtworzenie bazy danych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych → PR-APP-3 · Odtworzenie aplikacji i baz danych

### Cel

Odtworzenie bazy danych do punktu w czasie sprzed T0 na czystym serwerze w IRE.

### Zastosowanie

Odtwarzanie baz w PR-APP-3. Przykłady dla SQL Server, PostgreSQL i Oracle.

### Wymagane uprawnienia i narzędzia

Czysty serwer bazodanowy w IRE (ta sama lub nowsza wersja silnika), zatwierdzone pliki kopii (pełna, różnicowa, dzienniki / WAL / archivelog).

### Środki ostrożności

- Punkt w czasie musi być wcześniejszy niż T0 dla tej bazy.
- Nie odtwarzaj na serwer naruszony.
- Zachowaj kopie z okresu incydentu jako dowody.

### Kroki

#### 1 · Weryfikacja kopii

1. **Administrator baz danych:** Zweryfikuj pliki kopii przed odtworzeniem.

   ```
   RESTORE VERIFYONLY FROM DISK = N'<plik>.bak' WITH CHECKSUM;
   RESTORE HEADERONLY FROM DISK = N'<plik>.bak';
   ```
   _Oczekiwany rezultat:_ Kopia poprawna, daty zgodne
#### 2 · SQL Server

2. **Administrator baz danych:** SQL Server: odtwórz kopię pełną i dzienniki do punktu w czasie przed T0.

   ```
   RESTORE DATABASE [<db>] FROM DISK = N'<pełna>.bak' WITH NORECOVERY, REPLACE;
   RESTORE LOG [<db>] FROM DISK = N'<log>.trn' WITH STOPAT = '<RRRR-MM-DD GG:MM:SS>', NORECOVERY;
   RESTORE DATABASE [<db>] WITH RECOVERY;
   ```
   _Oczekiwany rezultat:_ Baza ONLINE
#### 3 · PostgreSQL

3. **Administrator baz danych:** PostgreSQL: odtwórz kopię bazową i odtwórz WAL do czasu przed T0.

   ```
   restore_command = 'cp /archiwum/%f %p'
   recovery_target_time = '<RRRR-MM-DD GG:MM:SS+00>'
   recovery_target_action = 'promote'
   touch $PGDATA/recovery.signal && systemctl start postgresql
   ```
   _Oczekiwany rezultat:_ Baza otwarta do zapisu
#### 4 · Oracle

4. **Administrator baz danych:** Oracle: odtwórz bazę RMAN do czasu przed T0.

   ```
   RMAN> RUN { SET UNTIL TIME "TO_DATE('<RRRR-MM-DD GG:MI:SS>','YYYY-MM-DD HH24:MI:SS')"; RESTORE DATABASE; RECOVER DATABASE; }
   RMAN> ALTER DATABASE OPEN RESETLOGS;
   ```
   _Oczekiwany rezultat:_ Baza OPEN
#### 5 · Oczyszczenie

5. **Administrator baz danych:** Usuń z bazy loginy i użytkowników utworzonych przez atakującego; wyłącz niebezpieczne funkcje (np. xp_cmdshell).

   ```
   EXEC sp_configure 'xp_cmdshell', 0; RECONFIGURE;
   ```
   _Oczekiwany rezultat:_ Konfiguracja bezpieczna
6. **Administrator baz danych:** Zmień hasła kont bazodanowych używanych przez aplikacje i administratorów.

   ```
   ALTER LOGIN [<login>] WITH PASSWORD = '<nowe-hasło>';
   ```
   _Oczekiwany rezultat:_ Hasła zmienione
#### 6 · Rejestracja

7. **Administrator baz danych:** Zapisz punkt w czasie, użyte pliki i czasy w dzienniku odtworzenia.
   _Oczekiwany rezultat:_ Dziennik odtworzenia

### Weryfikacja wykonania

Baza dostępna, test spójności (IN-APP-4.1) zaliczony, ostatnie transakcje sprzed T0 obecne.

### Wycofanie

Ponowne odtworzenie z innego punktu w czasie lub kopii.

### Zapisy

Dziennik odtworzenia bazy.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-02
- NIST CSF 2.0 – RC.RP-03
- ISO/IEC 27001:2022 – A.8.13

---

## PR-APP-4 · Weryfikacja integralności i spójności danych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych

### Cel

Potwierdzenie, że odtworzone bazy są technicznie spójne, dane biznesowe są poprawne i kompletne, a dane z trybu awaryjnego zostały wprowadzone i uzgodnione.

### Zakres i wyzwalacz

Odtworzone bazy danych i aplikacje oraz dane z systemów zależnych i trybu awaryjnego.

**Wyzwalacz:** zakończenie PR-APP-3.

### Warunki wstępne

- Wartości referencyjne (liczności tabel kluczowych, salda, ostatnie numery dokumentów) z kopii sprzed incydentu i z systemów partnerów.
- Rejestry z trybu awaryjnego.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Spójność techniczna | Administrator baz danych | Kierownik odtwarzania | – | Kierownik incydentu |
| Testy aplikacyjne | Administrator aplikacji | Kierownik odtwarzania | Właściciel procesu biznesowego | Kierownik incydentu |
| Uzgodnienia biznesowe i dane z trybu awaryjnego | Właściciel procesu biznesowego | Właściciel procesu biznesowego | Administrator aplikacji, Administrator baz danych | Zespół zarządzania kryzysowego |

### Przebieg

#### 1 · Spójność

1. **Administrator baz danych:** Wykonaj testy spójności bazy i testy aplikacyjne według IN-APP-4.1.
   _Oczekiwany rezultat:_ Raport testów
#### 2 · Uzgodnienia

2. **Właściciel procesu biznesowego:** Uzgodnij dane biznesowe z wartościami referencyjnymi: salda, liczba dokumentów, ostatnie numery, stany.
   _Oczekiwany rezultat:_ Protokół uzgodnień
#### 3 · Dane awaryjne

3. **Właściciel procesu biznesowego:** Wprowadź dane z trybu awaryjnego (z kontrolą drugiej osoby) i uzgodnij je z rejestrami papierowymi.
   _Oczekiwany rezultat:_ Dane awaryjne wprowadzone
4. **Właściciel procesu biznesowego:** Odtwórz dane utracone między punktem odtworzenia a incydentem ze źródeł wskazanych w PR-APP-3.
   _Oczekiwany rezultat:_ Lista uzupełnionych danych
#### 4 · Czystość danych

5. **Zespół reagowania (CSIRT):** Sprawdź, czy w danych nie pozostały zmiany atakującego (np. konta bankowe dostawców, uprawnienia, ceny).
   _Oczekiwany rezultat:_ Brak nieuprawnionych zmian

### Kryteria wyjścia

- Spójność techniczna i biznesowa potwierdzona.
- Dane z trybu awaryjnego i dane utracone wprowadzone.

### Zapisy (dowody wykonania)

Raport testów, protokoły uzgodnień, lista wprowadzonych danych.

### Instrukcje i checklisty

- Instrukcja: **IN-APP-4.1 · Testy aplikacji i spójności bazy danych** (v0.1, projekt)

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.8.13
- NIST SP 800-184 – TACT

---

## IN-APP-4.1 · Testy aplikacji i spójności bazy danych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych → PR-APP-4 · Weryfikacja integralności i spójności danych

### Cel

Potwierdzenie technicznej spójności baz danych oraz poprawnego działania funkcji aplikacji.

### Zastosowanie

Po odtworzeniu (PR-APP-4) i przed DG5.

### Wymagane uprawnienia i narzędzia

Dostęp DBA, scenariusz testów aplikacyjnych od właściciela procesu, wartości referencyjne.

### Środki ostrożności

Testy wykonuj w IRE na kontach testowych; transakcje testowe oznaczaj i wycofuj.

### Kroki

#### 1 · Spójność techniczna

1. **Administrator baz danych:** SQL Server: sprawdź spójność fizyczną i logiczną bazy.

   ```
   DBCC CHECKDB ([<db>]) WITH NO_INFOMSGS, ALL_ERRORMSGS;
   ```
   _Oczekiwany rezultat:_ Brak błędów
2. **Administrator baz danych:** PostgreSQL: sprawdź indeksy B-tree (rozszerzenie amcheck).

   ```
   SELECT bt_index_check(c.oid) FROM pg_index i JOIN pg_class c ON c.oid = i.indexrelid JOIN pg_am a ON a.oid = c.relam WHERE a.amname = 'btree';
   ```
   _Oczekiwany rezultat:_ Brak błędów
3. **Administrator baz danych:** Oracle: zweryfikuj bazę narzędziem RMAN.

   ```
   RMAN> VALIDATE DATABASE;
   ```
   _Oczekiwany rezultat:_ Brak uszkodzonych bloków
#### 2 · Spójność logiczna

4. **Administrator baz danych:** Porównaj liczności i sumy kontrolne tabel kluczowych z wartościami referencyjnymi.

   ```
   SELECT COUNT(*) AS wiersze, CHECKSUM_AGG(BINARY_CHECKSUM(*)) AS suma FROM <tabela>;
   ```
   _Oczekiwany rezultat:_ Zgodność lub wyjaśnione różnice
5. **Administrator baz danych:** Sprawdź ciągłość numeracji dokumentów i identyfikatorów (sekwencje, IDENTITY) – ustaw je powyżej najwyższych wartości użytych w trybie awaryjnym i systemach partnerów.

   ```
   DBCC CHECKIDENT ('<tabela>', NORESEED);
   ```
   _Oczekiwany rezultat:_ Brak kolizji numerów
#### 3 · Testy aplikacyjne

6. **Administrator aplikacji:** Wykonaj scenariusz testów aplikacyjnych: logowanie, wyszukiwanie, utworzenie i zatwierdzenie transakcji, raport, eksport.
   _Oczekiwany rezultat:_ Wszystkie przypadki zaliczone
7. **Administrator aplikacji:** Wykonaj test wydajności podstawowej (czasy odpowiedzi kluczowych operacji).
   _Oczekiwany rezultat:_ Czasy w normie
#### 4 · Integracje

8. **Administrator aplikacji:** Przetestuj integracje w trybie testowym (pojedynczy komunikat w każdą stronę).
   _Oczekiwany rezultat:_ Komunikaty przetworzone poprawnie

### Weryfikacja wykonania

Raport testów z wynikami wszystkich przypadków, podpisany przez DBA i administratora aplikacji.

### Wycofanie

Nie dotyczy.

### Zapisy

Raport testów, wyniki zapytań kontrolnych.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05

---

## PR-APP-5 · Dopuszczenie aplikacji do produkcji

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych

### Cel

Formalne dopuszczenie aplikacji do produkcji (DG5) i kontrolowane przywrócenie ruchu użytkowników, klientów i integracji.

### Zakres i wyzwalacz

Aplikacje zweryfikowane w PR-APP-4.

**Wyzwalacz:** zaliczone PR-APP-4 i dostępność zależności (AD, sieć, kopie).

### Warunki wstępne

Bramka DG5 z polityki (kryteria dopuszczenia do produkcji) musi być spełniona w całości. Brak spełnienia któregokolwiek kryterium blokuje dopuszczenie – odstępstwo zatwierdza wyłącznie Kierownik incydentu wraz z właścicielem procesu i jest wpisywane do rejestru ryzyk.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Decyzja DG5 | Kierownik incydentu | Kierownik incydentu | Właściciel procesu biznesowego, Kierownik odtwarzania | Zespół zarządzania kryzysowego |
| Przywrócenie ruchu | Administrator aplikacji, Administrator sieci / NAC | Kierownik odtwarzania | SOC | Service desk |
| Włączenie integracji | Administrator aplikacji | Kierownik odtwarzania | właściciele systemów zależnych | – |
| Komunikacja | Komunikacja | Zespół zarządzania kryzysowego | Właściciel procesu biznesowego | użytkownicy, klienci |

### Przebieg

#### 1 · Decyzja

1. **Kierownik incydentu:** Wypełnij CL-APP-5 i podejmij decyzję DG5.
   _Oczekiwany rezultat:_ CL-APP-5, wpis DG5
#### 2 · Ruch

2. **Administrator aplikacji:** Przywróć ruch produkcyjny według IN-APP-5.1.
   _Oczekiwany rezultat:_ Ruch przywrócony
#### 3 · Integracje

3. **Administrator aplikacji:** Włącz integracje pojedynczo, z kontrolą duplikatów i uzgodnieniem pierwszych komunikatów z systemem zależnym.
   _Oczekiwany rezultat:_ Integracje działają
#### 4 · Ochrona

4. **Administrator kopii zapasowych:** Wznów kopie zapasowe aplikacji i baz (IN-BKP-4.2).
   _Oczekiwany rezultat:_ Kopia pełna wykonana
5. **SOC:** Utrzymaj wzmożony monitoring aplikacji i baz przez 30 dni.
   _Oczekiwany rezultat:_ Monitoring aktywny
#### 5 · Komunikacja

6. **Komunikacja:** Poinformuj użytkowników i klientów o przywróceniu usługi.
   _Oczekiwany rezultat:_ Komunikat

### Kryteria wyjścia

- DG5 zapisana, ruch i integracje przywrócone, kopie wznowione.
- Brak błędów krytycznych przez 24 h.

### Zapisy (dowody wykonania)

CL-APP-5, wpis DG5, rejestr przywracania ruchu, komunikaty.

### Instrukcje i checklisty

- Instrukcja: **CL-APP-5 · Dopuszczenie usługi do produkcji** (v0.1, projekt)
- Instrukcja: **IN-APP-5.1 · Przywrócenie ruchu produkcyjnego** (v0.1, projekt)

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- NIST CSF 2.0 – RC.RP-06
- NIST CSF 2.0 – RC.CO-03
- ISO/IEC 27001:2022 – A.8.32
- ISO/IEC 27001:2022 – A.8.16

---

## CL-APP-5 · Dopuszczenie usługi do produkcji

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych → PR-APP-5 · Dopuszczenie aplikacji do produkcji

### Zastosowanie

Bramka DG5 dla aplikacji – dotyczy każdej usługi osobno.

### Lista kontrolna

1. **Kierownik incydentu:** Źródło odtworzenia sprzed T0, zweryfikowane
2. **Kierownik incydentu:** Odtworzenie w IRE
3. **Administrator aplikacji:** Wektor wejścia usunięty, poprawki zainstalowane
4. **Administrator aplikacji:** Konfiguracja zgodna z bazową konfiguracją bezpieczeństwa
5. **Administrator aplikacji:** Poświadczenia i sekrety zmienione
6. **SOC:** EDR w trybie blokowania, logi w SIEM, detekcje IoC/TTP aktywne
7. **Zespół reagowania (CSIRT):** Skan IoC/YARA bez wykryć
8. **Administrator aplikacji:** Testy funkcjonalne, integracyjne i wydajnościowe zaliczone
9. **Właściciel procesu biznesowego:** Integralność danych potwierdzona uzgodnieniami
10. **Właściciel procesu biznesowego:** Akceptacja właściciela procesu
   _Oczekiwany rezultat:_ Podpis
11. **Kierownik odtwarzania:** Zmiana awaryjna zarejestrowana, plan wycofania gotowy
12. **SOC:** Wzmożony monitoring 30 dni zaplanowany

### Kryteria zaliczenia

Wszystkie punkty spełnione – brak odstępstw od DG5.

### Zatwierdzenie

Zatwierdzają: Kierownik incydentu i właściciel procesu.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.8.32

---

## IN-APP-5.1 · Przywrócenie ruchu produkcyjnego

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator aplikacji | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych → PR-APP-5 · Dopuszczenie aplikacji do produkcji

### Cel

Kontrolowane przełączenie użytkowników i klientów na odtworzoną aplikację z możliwością szybkiego wycofania.

### Zastosowanie

Po decyzji DG5 (PR-APP-5).

### Wymagane uprawnienia i narzędzia

Dostęp do równoważenia obciążenia, DNS, WAF i zapór; panel monitorowania aplikacji.

### Środki ostrożności

- Przełączaj stopniowo (grupa pilotażowa → wszyscy).
- Przygotuj kryteria wycofania: błędy 5xx, czasy odpowiedzi, alerty bezpieczeństwa.

### Kroki

#### 1 · Sieć

1. **Administrator sieci / NAC:** Przenieś odtworzone serwery z IRE do docelowego segmentu produkcyjnego z nowymi regułami przepływów.
   _Oczekiwany rezultat:_ Serwery w segmencie docelowym
2. **Administrator sieci / NAC:** Włącz reguły WAF i ochronę przed nadużyciami dla aplikacji publicznych.
   _Oczekiwany rezultat:_ WAF aktywny
#### 2 · Ruch pilotażowy

3. **Administrator aplikacji:** Dodaj odtworzone węzły do puli równoważenia obciążenia w trybie wyłączonym, następnie włącz dla grupy pilotażowej.

   ```
   tmsh modify ltm pool <pula> members modify { <węzeł>:<port> { session user-enabled } }
   ```
   _Oczekiwany rezultat:_ Węzły aktywne w puli
4. **SOC:** Monitoruj przez 1 h: błędy, czasy odpowiedzi, alerty EDR/WAF.
   _Oczekiwany rezultat:_ Brak przekroczeń kryteriów wycofania
#### 3 · Pełny ruch

5. **Administrator aplikacji:** Przełącz pełny ruch (DNS z obniżonym TTL lub reguła równoważenia), wyłącz stronę serwisową.
   _Oczekiwany rezultat:_ Pełny ruch na odtworzonej aplikacji
#### 4 · Porządkowanie

6. **Administrator aplikacji:** Zdejmij reguły tymczasowe z IN-APP-2.2 zgodnie z docelową macierzą przepływów.
   _Oczekiwany rezultat:_ Reguły tymczasowe usunięte

### Weryfikacja wykonania

Aplikacja obsługuje pełny ruch przez 24 h bez błędów krytycznych i alertów bezpieczeństwa.

### Wycofanie

Wyłączenie węzłów w puli i przywrócenie strony serwisowej przy przekroczeniu kryteriów wycofania.

### Zapisy

Rejestr przełączenia z godzinami, wyniki monitorowania.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.8.32
- ISO/IEC 27001:2022 – A.8.16

---

## PL-BKP · Plan reagowania na ransomware w kopii zapasowej

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Plan | techniczna | 0.1 | projekt | Dyrektor IT | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware

### 1. Cel i zakres

Plan opisuje reakcję na atak na infrastrukturę kopii zapasowych Rossmann Polska: usuwanie lub szyfrowanie kopii, przejęcie konsoli, wstrzyknięcie złośliwego oprogramowania do kopii (zainfekowane punkty odtworzenia). Kopie są ostatnią linią obrony – ich utrata zamienia incydent w katastrofę.

### 2. Scenariusz

Atakujący przejmuje konta administracyjne systemu kopii (często domenowe), usuwa zadania i punkty przywracania, skraca retencję, szyfruje repozytoria lub katalogi kopii. W wariancie cichym złośliwe oprogramowanie jest obecne w systemach od tygodni, więc trafia do wielu kolejnych kopii.

### 3. Sygnały wykrycia i wskaźniki naruszenia

- Usunięte zadania, punkty przywracania lub repozytoria; zmiany retencji i harmonogramów.
- Logowania do konsoli kopii z nietypowych hostów; nowe konta w systemie kopii; wyłączone MFA.
- Błędy zadań kopii masowo w tym samym czasie; nagły wzrost rozmiaru przyrostów (zaszyfrowane dane źródłowe).
- Polecenia `vssadmin delete shadows`, `wbadmin delete catalog`, zmiany konfiguracji repozytorium niezmiennego.
- Alerty skanowania kopii lub analizy entropii w systemie kopii.

### 4. Zasoby objęte planem

| System | Technologie | Wymagane RTO / RPO | Osiągalne RTO / RPO | Kopie | Ośrodek zapasowy |
|---|---|---|---|---|---|
| Platforma kopii zapasowych (kopie niezmienne, odizolowane) | Veeam Backup & Replication, Serwer Linux (RHEL / Ubuntu) | – / – | 8 h / 24 h | Repozytorium niezmienne + kopia offline | Druga lokalizacja |

### 5. Wpływ na procesy biznesowe i cele odtworzenia

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

### 6. Kryteria aktywacji i klasyfikacja

Aktywacja przy każdym potwierdzonym nieuprawnionym działaniu w systemie kopii lub wykryciu złośliwego oprogramowania w punkcie przywracania. Kategoria K1. Plan uruchamia się także jako uzupełnienie każdego innego scenariusza – przed użyciem kopii trzeba potwierdzić ich integralność.

### 7. Organizacja reagowania

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Ocena integralności kopii | Administrator kopii zapasowych, Zespół reagowania (CSIRT) | Kierownik incydentu | Kierownik odtwarzania | Zespół zarządzania kryzysowego |
| Izolacja infrastruktury kopii | Administrator kopii zapasowych, Administrator sieci / NAC | Kierownik incydentu | Dostawca | Zespół zarządzania kryzysowego |
| Zabezpieczenie czystych kopii | Administrator kopii zapasowych | Kierownik odtwarzania | Zespół reagowania (CSIRT) | Kierownik incydentu |
| Odtworzenie infrastruktury kopii | Administrator kopii zapasowych, Dostawca | Kierownik odtwarzania | Zespół reagowania (CSIRT) | Zespół zarządzania kryzysowego |
| Weryfikacja sprawności kopii | Administrator kopii zapasowych | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |

### 8. Przebieg reagowania

| Faza | Cel | Procedura | Cel czasowy |
|---|---|---|---|
| Ocena | które kopie istnieją, są nienaruszone i czyste | PR-BKP-1 | 2 h |
| Izolacja | odcięcie atakującego od kopii | PR-BKP-2 | 30 min od DG0 |
| Zabezpieczenie | ochrona ocalałych punktów przywracania | PR-BKP-3 | 1 h od DG0 |
| Odtworzenie | czysta infrastruktura kopii | PR-BKP-4 | przed odtwarzaniem systemów |
| Weryfikacja | testy odtworzenia, powrót harmonogramów | PR-BKP-5 | przed DG5 |

### 9. Ciągłość działania w trakcie incydentu

Do czasu odtworzenia infrastruktury kopii zmiany w systemach produkcyjnych ogranicza się do niezbędnych (zamrożenie zmian), a dane z trybów awaryjnych procesów (papierowe rejestry, eksporty) przechowuje się w dwóch niezależnych miejscach.

### 10. Punkty decyzyjne

- DG1: odłączenie serwera kopii i repozytoriów od sieci produkcyjnej i domeny.
- DG2: wybór czystego punktu przywracania dla każdego systemu (sprzed T0, z marginesem, po skanie).
- Czy wymagane jest odtworzenie z nośników offline / taśm / kopii u dostawcy chmurowego.
- Czy uruchomić dostawcę (wsparcie producenta, odzyskiwanie usuniętych kopii z kosza repozytorium).

### 11. Komunikacja i obowiązki raportowe

Komunikację wewnętrzną prowadzi się kanałem pozapasmowym. Komunikaty do pracowników, klientów, dostawców i mediów zatwierdza przewodniczący ZZK. Kierownik incydentu raportuje stan co 2 h w fazie ograniczania i co 4 h w fazie odtwarzania (CSF RC.CO-03).

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

### 12. Kryteria zakończenia

- Ustalono, które kopie są czyste; zatwierdzono punkty przywracania.
- Infrastruktura kopii odbudowana poza domeną produkcyjną, z MFA i kopiami niezmiennymi.
- Test odtworzenia każdego systemu krytycznego zaliczony.
- Harmonogramy przywrócone, pierwsze pełne kopie wykonane i zweryfikowane.

### 13. Błędy, których należy unikać

- Przywracanie z najnowszej kopii bez sprawdzenia, czy nie zawiera złośliwego oprogramowania.
- Logowanie do konsoli kopii kontem domenowym w trakcie incydentu.
- Uruchamianie zadań kopii zaszyfrowanych systemów, które nadpiszą czyste punkty przy krótkiej retencji.
- Brak eksportu katalogu kopii i konfiguracji przed odbudową.

### 14. Procedury, instrukcje i checklisty

- Procedura: **PR-BKP-1 · Ocena integralności i dostępności kopii zapasowych** (v0.1, projekt)
- Procedura: **PR-BKP-2 · Izolacja infrastruktury backupu** (v0.1, projekt)
- Procedura: **PR-BKP-3 · Zabezpieczenie niezainfekowanych kopii zapasowych** (v0.1, projekt)
- Procedura: **PR-BKP-4 · Odtworzenie działania infrastruktury backupu** (v0.1, projekt)
- Procedura: **PR-BKP-5 · Weryfikacja bezpieczeństwa i sprawności backupu** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- ISO/IEC 27001:2022 – A.5.30
- ISO/IEC 27031 – IRBC-2
- ISO/IEC 27031 – IRBC-3
- NIST CSF 2.0 – PR.DS-11
- NIST CSF 2.0 – RC.RP-03
- DORA – rozporządzenie (UE) 2022/2554 – art. 12
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(c)
- RODO – rozporządzenie (UE) 2016/679 – art. 32(1)(c)
- NIST SP 800-184 – TACT

---

## PR-BKP-1 · Ocena integralności i dostępności kopii zapasowych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej

### Cel

Ustalenie, które kopie i punkty przywracania istnieją, są nienaruszone, wolne od złośliwego oprogramowania i nadają się do odtworzenia systemów w czasie RTO i z utratą danych nie większą niż RPO.

### Zakres i wyzwalacz

Serwery i konsole systemu kopii, repozytoria (dyskowe, niezmienne, obiektowe, taśmowe), kopie poza siedzibą i w chmurze, katalog kopii oraz kopie konfiguracji systemu kopii.

**Wyzwalacz:** nieuprawnione działanie w systemie kopii, wykrycie złośliwego oprogramowania w punkcie przywracania albo potrzeba użycia kopii w dowolnym innym scenariuszu.

### Warunki wstępne

- Wykaz repozytoriów, zadań, retencji i kopii poza siedzibą (offline).
- Dostęp do konsoli systemu kopii z konta niezależnego od domeny produkcyjnej.
- T0 z analizy zespołu reagowania (wstępne lub ostateczne).

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Inwentaryzacja kopii | Administrator kopii zapasowych | Kierownik odtwarzania | Zespół reagowania (CSIRT) | – |
| Analiza zmian w systemie kopii | Zespół reagowania (CSIRT), Administrator kopii zapasowych | Kierownik incydentu | Dostawca | – |
| Weryfikacja integralności i czystości | Administrator kopii zapasowych | Kierownik odtwarzania | Zespół reagowania (CSIRT) | Kierownik incydentu |
| Wskazanie kandydatów punktów przywracania | Administrator kopii zapasowych | Kierownik odtwarzania | Zespół reagowania (CSIRT), Właściciel procesu biznesowego | Kierownik incydentu |

### Przebieg

#### 1 · Inwentarz

1. **Administrator kopii zapasowych:** Sporządź inwentarz: repozytoria i ich stan, zadania, ostatnie udane kopie każdego systemu krytycznego, kopie niezmienne, kopie poza siedzibą, taśmy.

   ```
   Get-VBRBackupRepository | Select Name, Type, Path
   Get-VBRBackup | Select JobName, LastPointCreationTime
   ```
   _Oczekiwany rezultat:_ Inwentarz kopii
#### 2 · Analiza zmian

2. **Zespół reagowania (CSIRT):** Przeanalizuj dziennik zdarzeń i audytu systemu kopii: logowania, usunięte zadania i punkty, zmiany retencji, wyłączenie niezmienności lub MFA.

   ```
   Get-VBRBackupSession | Where-Object { $_.CreationTime -ge $T0 } | Select JobName, Result, CreationTime
   ```
   _Oczekiwany rezultat:_ Lista nieuprawnionych działań
3. **Administrator kopii zapasowych:** Sprawdź, czy repozytoria niezmienne i blokady obiektów nie zostały zmienione, a punkty w nich są kompletne.
   _Oczekiwany rezultat:_ Stan niezmienności potwierdzony
#### 3 · Kandydaci

4. **Administrator kopii zapasowych:** Dla każdego systemu krytycznego wskaż kandydatów punktów przywracania: ostatni przed T0 oraz co najmniej dwa wcześniejsze.

   ```
   Get-VBRRestorePoint -Backup (Get-VBRBackup -Name "<zadanie>") | Sort CreationTime -Descending | Select VmName, CreationTime, Type
   ```
   _Oczekiwany rezultat:_ Kandydaci punktów przywracania
#### 4 · Weryfikacja

5. **Administrator kopii zapasowych:** Zweryfikuj integralność kandydatów według IN-BKP-1.1 (sumy kontrolne, skan złośliwego oprogramowania, test montowania).
   _Oczekiwany rezultat:_ Wynik weryfikacji dla każdego punktu
#### 5 · Ocena

6. **Kierownik odtwarzania:** Porównaj czas punktów z RPO procesów i oszacuj czas odtworzenia vs RTO; zidentyfikuj luki (brak czystej kopii, przekroczenie RPO).
   _Oczekiwany rezultat:_ Tabela: system / punkt / utrata danych / szacowany czas
7. **Kierownik incydentu:** Wypełnij CL-BKP-1 i przekaż wynik do decyzji DG2 we wszystkich planach scenariuszowych.
   _Oczekiwany rezultat:_ CL-BKP-1

### Kryteria wyjścia

- Dla każdego systemu krytycznego wskazano czysty punkt przywracania albo stwierdzono jego brak.
- Luki RPO/RTO znane właścicielom procesów.
- Wynik przekazany do DG2.

### Zapisy (dowody wykonania)

Inwentarz kopii, lista nieuprawnionych działań, wyniki weryfikacji punktów, tabela ocen, CL-BKP-1.

### Instrukcje i checklisty

- Instrukcja: **CL-BKP-1 · Ocena bezpieczeństwa kopii zapasowych** (v0.1, projekt)
- Instrukcja: **IN-BKP-1.1 · Weryfikacja integralności kopii zapasowych** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- NIST CSF 2.0 – PR.DS-11
- NIST CSF 2.0 – RC.RP-03
- NIST CSF 2.0 – RS.AN-08
- ISO/IEC 27031 – IRBC-2

---

## CL-BKP-1 · Ocena bezpieczeństwa kopii zapasowych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej → PR-BKP-1 · Ocena integralności i dostępności kopii zapasowych

### Zastosowanie

Podsumowanie PR-BKP-1.

### Lista kontrolna

1. **Administrator kopii zapasowych:** Inwentarz repozytoriów, zadań i kopii poza siedzibą sporządzony
2. **Zespół reagowania (CSIRT):** Dziennik audytu systemu kopii przeanalizowany od T0
3. **Administrator kopii zapasowych:** Niezmienność repozytoriów i blokady obiektów potwierdzone
4. **Administrator kopii zapasowych:** Kandydaci punktów przywracania wskazani dla każdego systemu krytycznego
5. **Administrator kopii zapasowych:** Integralność kandydatów zweryfikowana walidatorem
6. **Zespół reagowania (CSIRT):** Kandydaci przeskanowani AV i YARA bez wykryć
7. **Kierownik odtwarzania:** Utrata danych vs RPO i czas vs RTO oszacowane
8. **Kierownik odtwarzania:** Luki przekazane właścicielom procesów

### Kryteria zaliczenia

Dla każdego systemu krytycznego status: czysty punkt wskazany lub brak z planem alternatywnym.

### Zatwierdzenie

Wypełnił: Administrator kopii. Zatwierdził: Kierownik odtwarzania.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-03

---

## IN-BKP-1.1 · Weryfikacja integralności kopii zapasowych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej → PR-BKP-1 · Ocena integralności i dostępności kopii zapasowych

### Cel

Sprawdzenie, czy punkt przywracania jest kompletny, nieuszkodzony, niezmieniony i nie zawiera złośliwego oprogramowania ani zaszyfrowanych danych.

### Zastosowanie

Każdy punkt przywracania przed użyciem do odtworzenia (PR-BKP-1) oraz kopie po incydencie (PR-BKP-5). Przykłady dla Veeam Backup & Replication i repozytorium Linux z niezmiennością.

### Wymagane uprawnienia i narzędzia

- Dostęp do konsoli systemu kopii.
- Odizolowany host skanujący z aktualnym silnikiem antywirusowym i regułami YARA z incydentu.
- Lista IoC (skróty, nazwy plików, rozszerzenia, nazwy notatek okupu).

### Środki ostrożności

- Montuj punkty wyłącznie w trybie tylko do odczytu na odizolowanym hoście.
- Nie uruchamiaj systemu z punktu w sieci produkcyjnej.

### Kroki

#### 1 · Integralność

1. **Administrator kopii zapasowych:** Zweryfikuj sumy kontrolne plików kopii (walidator producenta).

   ```
   Veeam.Backup.Validator.exe /backup:"<zadanie>" /vmname:"<maszyna>" /point:"<data>"
   ```
   _Oczekiwany rezultat:_ Walidacja: brak błędów
2. **Administrator kopii zapasowych:** Na repozytorium Linux sprawdź, że pliki kopii mają atrybut niezmienności.

   ```
   lsattr -R /<repozytorium>/<zadanie> | grep -v -- "----i"
   ```
   _Oczekiwany rezultat:_ Brak plików bez flagi i
3. **Administrator kopii zapasowych:** Dla repozytoriów obiektowych sprawdź retencję blokady obiektów.

   ```
   aws s3api get-object-retention --bucket <zasobnik> --key <obiekt>
   ```
   _Oczekiwany rezultat:_ Mode: COMPLIANCE, RetainUntilDate w przyszłości
#### 2 · Czystość

4. **Administrator kopii zapasowych:** Zamontuj punkt przywracania w trybie tylko do odczytu na odizolowanym hoście skanującym (funkcja montowania / przywracania na poziomie plików).
   _Oczekiwany rezultat:_ Wolumeny zamontowane jako R/O
5. **Zespół reagowania (CSIRT):** Przeskanuj zamontowane wolumeny programem antywirusowym i regułami YARA z incydentu.

   ```
   yara64.exe -r -w <reguły-incydentu>.yar X:\ > yara-<punkt>.txt
   ```
   _Oczekiwany rezultat:_ Brak trafień
6. **Zespół reagowania (CSIRT):** Wyszukaj artefakty ransomware: rozszerzenia zaszyfrowanych plików, notatki okupu, narzędzia atakującego, mechanizmy utrzymania dostępu (zadania, usługi).

   ```
   Get-ChildItem X:\ -Recurse -Include *.<rozszerzenie>, *README*.txt -ErrorAction SilentlyContinue | Select FullName, LastWriteTime
   ```
   _Oczekiwany rezultat:_ Brak artefaktów
#### 3 · Dane

7. **Zespół reagowania (CSIRT):** Sprawdź próbkę plików danych (dokumenty, bazy) – czy otwierają się poprawnie i nie mają wysokiej entropii charakterystycznej dla szyfrowania.
   _Oczekiwany rezultat:_ Pliki otwierają się poprawnie
#### 4 · Wynik

8. **Administrator kopii zapasowych:** Zapisz wynik dla punktu: czysty / zainfekowany / uszkodzony, z dowodami.
   _Oczekiwany rezultat:_ Wpis w rejestrze punktów

### Weryfikacja wykonania

Każdy kandydat ma udokumentowany wynik trzech kontroli: integralność, czystość, dane.

### Wycofanie

Odmontuj punkty po weryfikacji; host skanujący zresetuj do stanu wzorcowego.

### Zapisy

Wyniki walidatora, wyniki skanów AV/YARA, wpisy w rejestrze punktów.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-03
- ISO/IEC 27001:2022 – A.8.13

---

## PR-BKP-2 · Izolacja infrastruktury backupu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej

### Cel

Odcięcie atakującego od systemu kopii i repozytoriów oraz zapobieżenie nadpisaniu czystych punktów przywracania zaszyfrowanymi danymi.

### Zakres i wyzwalacz

Serwery kopii, serwery proxy, repozytoria, biblioteki taśmowe, konta i połączenia do kopii w chmurze.

**Wyzwalacz:** deklaracja incydentu K1–K2 w dowolnym scenariuszu (prewencyjnie) lub potwierdzony atak na system kopii.

### Warunki wstępne

- Dostęp do konsoli i hiperwizora kont niezależnych od domeny.
- Lista zadań i ich znaczenie dla retencji.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Wstrzymanie zadań i retencji | Administrator kopii zapasowych | Kierownik odtwarzania | Zespół reagowania (CSIRT) | Kierownik incydentu |
| Izolacja sieciowa segmentu kopii | Administrator sieci / NAC | Kierownik incydentu | Administrator kopii zapasowych | – |
| Odcięcie od domeny i zmiana poświadczeń | Administrator kopii zapasowych | Kierownik incydentu | Administrator AD | – |

### Przebieg

#### 1 · Ochrona punktów

1. **Administrator kopii zapasowych:** Wstrzymaj wszystkie zadania kopii i kopiowania, aby nie nadpisać czystych punktów zaszyfrowanymi danymi przy rotacji retencji.

   ```
   Get-VBRJob | Disable-VBRJob
   ```
   _Oczekiwany rezultat:_ Wszystkie zadania wyłączone
2. **Administrator kopii zapasowych:** Wstrzymaj automatyczne usuwanie wg retencji (przetwarzanie retencji, czyszczenie repozytoriów obiektowych) lub wydłuż retencję.
   _Oczekiwany rezultat:_ Retencja wstrzymana lub wydłużona
#### 2 · Sieć

3. **Administrator sieci / NAC:** Ogranicz dostęp sieciowy do segmentu kopii według IN-BKP-2.1: wyłącznie PAW zespołu kopii i niezbędne serwery proxy.
   _Oczekiwany rezultat:_ Segment kopii odizolowany
#### 3 · Tożsamość

4. **Administrator kopii zapasowych:** Usuń zależność od domeny produkcyjnej: zablokuj logowanie kontami domenowymi do konsoli i repozytoriów, zmień hasła kont lokalnych i serwisowych systemu kopii.
   _Oczekiwany rezultat:_ Dostęp wyłącznie kontami lokalnymi z MFA
#### 4 · Nośniki offline

5. **Administrator kopii zapasowych:** Odłącz biblioteki taśmowe i usuń z nich nośniki z kopiami sprzed T0; ustaw ochronę przed zapisem i przekaż do sejfu.
   _Oczekiwany rezultat:_ Taśmy w sejfie z protokołem
6. **Administrator kopii zapasowych:** Zmień klucze dostępowe do repozytoriów chmurowych; sprawdź blokady obiektów.

   ```
   aws s3api get-object-lock-configuration --bucket <zasobnik>
   ```
   _Oczekiwany rezultat:_ Object Lock aktywny
#### 5 · Weryfikacja

7. **SOC:** Zweryfikuj izolację (IN-INF-2.4) i włącz alerty na każde logowanie do systemu kopii.
   _Oczekiwany rezultat:_ Raport weryfikacji

### Kryteria wyjścia

- Zadania i retencja wstrzymane, czyste punkty chronione.
- Segment kopii dostępny wyłącznie dla zespołu kopii.
- Poświadczenia zmienione, nośniki offline zabezpieczone.

### Zapisy (dowody wykonania)

Rejestr wstrzymanych zadań, zmiany retencji, reguły izolacji, protokół zabezpieczenia taśm.

### Instrukcje i checklisty

- Instrukcja: **IN-BKP-2.1 · Ograniczenie dostępu do segmentu infrastruktury backupu w NAC** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- ISO/IEC 27001:2022 – A.8.22
- NIST CSF 2.0 – RS.MI-01
- NIST CSF 2.0 – PR.IR-01
- NIST CSF 2.0 – PR.DS-11

---

## IN-BKP-2.1 · Ograniczenie dostępu do segmentu infrastruktury backupu w NAC

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej → PR-BKP-2 · Izolacja infrastruktury backupu

### Cel

Ograniczenie ruchu do segmentu kopii wyłącznie do uprawnionych źródeł, aby atakujący nie mógł usunąć ani zaszyfrować kopii.

### Zastosowanie

Izolacja infrastruktury kopii (PR-BKP-2) – prewencyjnie w każdym incydencie K1–K2.

### Wymagane uprawnienia i narzędzia

- Uprawnienia do NAC i zapór wewnętrznych.
- Lista adresów: PAW zespołu kopii, serwery proxy, repozytoria, agent kopii na systemach chronionych.

### Środki ostrożności

Blokada zatrzyma wykonywanie kopii – to zamierzone, zadania są wstrzymane w PR-BKP-2.

### Kroki

#### 1 · NAC

1. **Administrator sieci / NAC:** Przypisz w NAC urządzenia segmentu kopii do profilu autoryzacji „BACKUP-INCYDENT” z dACL dopuszczającym ruch wyłącznie z PAW zespołu kopii.

   ```
   permit tcp host <PAW-1> <podsieć-backup> eq 443
   permit tcp host <PAW-1> <podsieć-backup> eq 9392
   deny ip any <podsieć-backup>
   ```
   _Oczekiwany rezultat:_ Profil aktywny
2. **Administrator sieci / NAC:** Wymuś ponowną autoryzację sesji urządzeń segmentu (CoA).
   _Oczekiwany rezultat:_ Sesje z nowym profilem
#### 2 · Zapora

3. **Administrator sieci / NAC:** Na zaporze między strefami zablokuj ruch z sieci produkcyjnych do segmentu kopii (SMB, RDP, SSH, porty systemu kopii), pozostaw PAW.
   _Oczekiwany rezultat:_ Reguły aktywne
4. **Administrator sieci / NAC:** Zablokuj ruch wychodzący z segmentu kopii do internetu, z wyjątkiem repozytorium chmurowego, jeśli jest wymagane.
   _Oczekiwany rezultat:_ Reguła wychodząca aktywna
#### 3 · Rejestracja

5. **Administrator sieci / NAC:** Zarejestruj zmianę awaryjną z listą reguł do zdjęcia.
   _Oczekiwany rezultat:_ Numer zmiany

### Weryfikacja wykonania

Z hosta w sieci produkcyjnej porty segmentu kopii są niedostępne (`Test-NetConnection <serwer-kopii> -Port 9392`); z PAW – dostępne. Logi zapory pokazują odrzucenia.

### Wycofanie

Po DG5 dla infrastruktury kopii: przywrócenie docelowych reguł segmentacji (nie stanu sprzed incydentu, jeśli był zbyt otwarty).

### Zapisy

Lista reguł, numer zmiany awaryjnej, wynik testów.

### Mapowanie na wymagania

- NIST CSF 2.0 – PR.IR-01
- ISO/IEC 27001:2022 – A.8.22

---

## PR-BKP-3 · Zabezpieczenie niezainfekowanych kopii zapasowych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej

### Cel

Trwałe zabezpieczenie punktów przywracania uznanych za czyste, aby zagwarantować ich dostępność przez cały czas odtwarzania.

### Zakres i wyzwalacz

Punkty przywracania wskazane w PR-BKP-1 jako czyste dla systemów krytycznych, w tym kopie AD.

**Wyzwalacz:** wynik PR-BKP-1 z listą czystych punktów.

### Warunki wstępne

- Lista czystych punktów z wynikami weryfikacji.
- Dostępna przestrzeń na kopię dodatkową (repozytorium niezmienne, nośnik offline, chmura z blokadą obiektów).

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Kopia dodatkowa czystych punktów | Administrator kopii zapasowych | Kierownik odtwarzania | – | Kierownik incydentu |
| Zabezpieczenie repozytorium | Administrator kopii zapasowych | Kierownik odtwarzania | Administrator sieci / NAC | Kierownik incydentu |
| Rejestr czystych punktów | Administrator kopii zapasowych | Kierownik incydentu | Zespół reagowania (CSIRT) | Kierownik odtwarzania |

### Przebieg

#### 1 · Kopia dodatkowa

1. **Administrator kopii zapasowych:** Utwórz kopię dodatkową czystych punktów przywracania na nośnik odizolowany (repozytorium niezmienne poza głównym systemem, taśma, chmura z blokadą obiektów).
   _Oczekiwany rezultat:_ Kopia dodatkowa z sumami kontrolnymi
#### 2 · Repozytorium

2. **Administrator kopii zapasowych:** Zabezpiecz repozytorium z czystymi punktami według IN-BKP-3.1.
   _Oczekiwany rezultat:_ Repozytorium zabezpieczone
#### 3 · Katalog i klucze

3. **Administrator kopii zapasowych:** Wyeksportuj katalog kopii, konfigurację systemu kopii i klucze szyfrowania kopii do sejfu offline.

   ```
   Start-VBRConfigurationBackupJob
   ```
   _Oczekiwany rezultat:_ Kopia konfiguracji zaszyfrowana, w sejfie
#### 4 · Rejestr

4. **Administrator kopii zapasowych:** Prowadź rejestr zatwierdzonych punktów: system, data, identyfikator, lokalizacja, wynik weryfikacji, osoba zatwierdzająca.
   _Oczekiwany rezultat:_ Rejestr czystych punktów
5. **Kierownik incydentu:** Zatwierdź rejestr czystych punktów jako jedyne dopuszczalne źródło odtworzenia; wypełnij CL-BKP-3.
   _Oczekiwany rezultat:_ CL-BKP-3, podpis KI

### Kryteria wyjścia

- Czyste punkty mają co najmniej dwie niezależne kopie, w tym jedną odizolowaną.
- Rejestr czystych punktów zatwierdzony.

### Zapisy (dowody wykonania)

Rejestr czystych punktów, protokół kopii dodatkowej, kopia konfiguracji w sejfie, CL-BKP-3.

### Instrukcje i checklisty

- Instrukcja: **CL-BKP-3 · Zabezpieczenie infrastruktury backupu** (v0.1, projekt)
- Instrukcja: **IN-BKP-3.1 · Zabezpieczenie repozytorium kopii zapasowych** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- NIST CSF 2.0 – PR.DS-11
- NIST CSF 2.0 – RC.RP-03
- DORA – rozporządzenie (UE) 2022/2554 – art. 12

---

## CL-BKP-3 · Zabezpieczenie infrastruktury backupu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej → PR-BKP-3 · Zabezpieczenie niezainfekowanych kopii zapasowych

### Zastosowanie

Kontrola po PR-BKP-2 i PR-BKP-3.

### Lista kontrolna

1. **Administrator kopii zapasowych:** Zadania kopii wyłączone, retencja wstrzymana lub wydłużona
2. **Administrator sieci / NAC:** Segment kopii dostępny tylko z PAW
3. **Administrator kopii zapasowych:** Logowanie kontami domenowymi zablokowane, poświadczenia lokalne zmienione
4. **Administrator kopii zapasowych:** Taśmy sprzed T0 zabezpieczone w sejfie
5. **Administrator kopii zapasowych:** Klucze do repozytoriów chmurowych zmienione, blokada obiektów aktywna
6. **Administrator kopii zapasowych:** Kopia dodatkowa czystych punktów wykonana
7. **Administrator kopii zapasowych:** Konfiguracja systemu kopii i klucze szyfrowania w sejfie offline
8. **Kierownik incydentu:** Rejestr czystych punktów zatwierdzony
   _Oczekiwany rezultat:_ Podpis KI

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator kopii. Zatwierdził: Kierownik incydentu.

### Mapowanie na wymagania

- NIST CSF 2.0 – PR.DS-11

---

## IN-BKP-3.1 · Zabezpieczenie repozytorium kopii zapasowych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej → PR-BKP-3 · Zabezpieczenie niezainfekowanych kopii zapasowych

### Cel

Ochrona repozytorium zawierającego czyste punkty przed usunięciem, modyfikacją i szyfrowaniem.

### Zastosowanie

Repozytoria z punktami z rejestru czystych punktów (PR-BKP-3).

### Wymagane uprawnienia i narzędzia

Dostęp lokalny (konsola) do serwerów repozytoriów, konto root/administratora lokalnego, dostęp do konfiguracji chmury.

### Środki ostrożności

Nie wyłączaj niezmienności w celu „porządkowania” repozytorium w trakcie incydentu.

### Kroki

#### 1 · Repozytorium Linux

1. **Administrator kopii zapasowych:** Repozytorium Linux z niezmiennością: zablokuj dostęp SSH, pozostaw tylko konsolę; sprawdź, że usługa transportu kopii działa na koncie bez uprawnień root.

   ```
   systemctl stop ssh && systemctl disable ssh
   ```
   _Oczekiwany rezultat:_ SSH wyłączone
2. **Administrator kopii zapasowych:** Sprawdź, czy konfiguracja niezmienności (okres w dniach) nie została skrócona.
   _Oczekiwany rezultat:_ Okres zgodny z polityką
#### 2 · Repozytorium Windows

3. **Administrator kopii zapasowych:** Repozytorium Windows: odłącz serwer od domeny lub zablokuj logowanie kontami domenowymi, ustaw atrybut tylko do odczytu na woluminach z czystymi punktami.

   ```
   Set-Disk -Number <n> -IsReadOnly $true
   ```
   _Oczekiwany rezultat:_ IsReadOnly: True
#### 3 · Chmura

4. **Administrator kopii zapasowych:** Repozytorium obiektowe: ustaw zasadę zabraniającą usuwania (polityka zasobnika), zmień klucze dostępowe, włącz alerty na próby usunięcia.
   _Oczekiwany rezultat:_ Polityka i alerty aktywne
#### 4 · Macierz

5. **Administrator kopii zapasowych:** Macierze dyskowe z kopiami: wykonaj migawki niezmienne woluminów repozytorium (jeśli wspierane).
   _Oczekiwany rezultat:_ Migawki zablokowane
#### 5 · Rejestracja

6. **Administrator kopii zapasowych:** Zapisz konfigurację zabezpieczeń w rejestrze czystych punktów.
   _Oczekiwany rezultat:_ Wpis w rejestrze

### Weryfikacja wykonania

Próba usunięcia pliku testowego w repozytorium kontem administracyjnym systemu kopii kończy się błędem; konfiguracja niezmienności zgodna z polityką.

### Wycofanie

Zdjęcie trybu tylko do odczytu po DG5 dla infrastruktury kopii; SSH pozostaje wyłączone na stałe dla repozytoriów niezmiennych.

### Zapisy

Konfiguracja zabezpieczeń, wynik testu usuwania.

### Mapowanie na wymagania

- NIST CSF 2.0 – PR.DS-11
- ISO/IEC 27001:2022 – A.8.13

---

## PR-BKP-4 · Odtworzenie działania infrastruktury backupu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej

### Cel

Uruchomienie czystej, utwardzonej infrastruktury kopii, która posłuży do odtwarzania systemów i wznowienia ochrony danych.

### Zakres i wyzwalacz

Serwer zarządzający kopiami, serwery proxy, repozytoria i zadania kopii.

**Wyzwalacz:** decyzja KO po PR-BKP-1 o odbudowie infrastruktury kopii (przejęta konsola, zaszyfrowany serwer kopii, niepewna konfiguracja).

### Warunki wstępne

- IRE lub wydzielony segment kopii.
- Nośniki instalacyjne tej samej wersji systemu kopii, kopia konfiguracji, klucze szyfrowania.
- Zatwierdzony rejestr czystych punktów.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Odbudowa serwera kopii | Administrator kopii zapasowych, Dostawca | Kierownik odtwarzania | Zespół reagowania (CSIRT) | Kierownik incydentu |
| Utwardzenie i MFA | Administrator kopii zapasowych | Kierownik odtwarzania | Zespół reagowania (CSIRT) | – |
| Przywrócenie harmonogramów | Administrator kopii zapasowych | Kierownik odtwarzania | Właściciel procesu biznesowego | Kierownik incydentu |

### Przebieg

#### 1 · Odbudowa

1. **Administrator kopii zapasowych:** Odbuduj serwer kopii na czystym systemie według IN-BKP-4.1 (poza domeną produkcyjną).
   _Oczekiwany rezultat:_ Serwer kopii działa
#### 2 · Utwardzenie

2. **Administrator kopii zapasowych:** Utwardź infrastrukturę: MFA do konsoli, zasada czterech oczu dla operacji usuwania, osobne konta, minimalne uprawnienia, zapora hosta, brak dostępu RDP spoza PAW.
   _Oczekiwany rezultat:_ Konfiguracja zgodna z wymaganiami
3. **Administrator kopii zapasowych:** Potwierdź niezmienność repozytoriów (okres niezmienności nie krótszy niż 30 dni) i blokadę obiektów w chmurze.
   _Oczekiwany rezultat:_ Niezmienność aktywna
#### 3 · Obsługa odtwarzania

4. **Administrator kopii zapasowych:** Wykorzystaj odbudowaną infrastrukturę do odtwarzania systemów zgodnie z kolejnością z planów scenariuszowych.
   _Oczekiwany rezultat:_ Odtwarzania wykonane
#### 4 · Ochrona danych

5. **Administrator kopii zapasowych:** Przywróć harmonogramy kopii według IN-BKP-4.2, gdy systemy chronione są odtworzone i czyste.
   _Oczekiwany rezultat:_ Zadania aktywne
#### 5 · Kontrola

6. **Administrator kopii zapasowych:** Wypełnij CL-BKP-4.
   _Oczekiwany rezultat:_ CL-BKP-4

### Kryteria wyjścia

- Infrastruktura kopii odbudowana i utwardzona.
- Harmonogramy przywrócone, pierwsze pełne kopie wykonane.
- CL-BKP-4 zaliczona.

### Zapisy (dowody wykonania)

Dziennik odbudowy, konfiguracja utwardzenia, CL-BKP-4.

### Instrukcje i checklisty

- Instrukcja: **CL-BKP-4 · Przywrócenie i kontrola backupu** (v0.1, projekt)
- Instrukcja: **IN-BKP-4.1 · Odtworzenie serwera backupu** (v0.1, projekt)
- Instrukcja: **IN-BKP-4.2 · Przywrócenie harmonogramów backupu** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- ISO/IEC 27001:2022 – A.5.30
- NIST CSF 2.0 – PR.DS-11
- NIST CSF 2.0 – RC.RP-02
- NIST SP 800-184 – TACT

---

## CL-BKP-4 · Przywrócenie i kontrola backupu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej → PR-BKP-4 · Odtworzenie działania infrastruktury backupu

### Zastosowanie

Kontrola po odbudowie infrastruktury kopii i wznowieniu harmonogramów.

### Lista kontrolna

1. **Administrator kopii zapasowych:** Serwer kopii odbudowany poza domeną produkcyjną
2. **Administrator kopii zapasowych:** Wszystkie poświadczenia w systemie kopii zmienione
3. **Administrator kopii zapasowych:** MFA i zasada czterech oczu włączone
4. **Administrator kopii zapasowych:** Niezmienność repozytoriów co najmniej 30 dni
5. **Administrator kopii zapasowych:** Pierwsze kopie pełne systemów krytycznych wykonane
6. **Administrator kopii zapasowych:** Kopie poza siedzibą i niezmienne wykonane
7. **SOC:** Logi systemu kopii w SIEM, alerty na usunięcia i zmiany retencji
8. **Administrator kopii zapasowych:** Nowa kopia konfiguracji w sejfie

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator kopii. Zatwierdził: Kierownik odtwarzania.

### Mapowanie na wymagania

- NIST CSF 2.0 – PR.DS-11

---

## IN-BKP-4.1 · Odtworzenie serwera backupu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej → PR-BKP-4 · Odtworzenie działania infrastruktury backupu

### Cel

Uruchomienie czystego serwera zarządzającego kopiami z odtworzoną konfiguracją i dostępem do repozytoriów z czystymi punktami.

### Zastosowanie

Gdy serwer kopii był zaszyfrowany, przejęty albo jego konfiguracja jest niepewna. Przykład dla Veeam Backup & Replication.

### Wymagane uprawnienia i narzędzia

- Nowy serwer lub VM w segmencie kopii / IRE, system operacyjny ze złotego obrazu.
- Instalator tej samej wersji systemu kopii, licencja, kopia konfiguracji i jej hasło, hasła szyfrowania kopii.

### Środki ostrożności

- Nie dołączaj serwera do domeny produkcyjnej.
- Nie przywracaj konfiguracji, jeśli istnieje ryzyko, że zawiera zmiany atakującego – wtedy skonfiguruj od nowa i zaimportuj kopie przez skanowanie repozytoriów.

### Kroki

#### 1 · System

1. **Administrator kopii zapasowych:** Zainstaluj system operacyjny ze złotego obrazu, wszystkie poprawki, EDR i zaporę hosta; nie dołączaj do domeny.
   _Oczekiwany rezultat:_ Serwer w grupie roboczej, EDR aktywny
#### 2 · Instalacja

2. **Administrator kopii zapasowych:** Zainstaluj system kopii w tej samej wersji co przed incydentem (wymóg odtworzenia konfiguracji).
   _Oczekiwany rezultat:_ Instalacja zakończona
#### 3 · Konfiguracja

3. **Administrator kopii zapasowych:** Wariant A: odtwórz konfigurację z kopii konfiguracji sprzed T0 (kreator przywracania konfiguracji), podając hasło szyfrowania kopii konfiguracji.
   _Oczekiwany rezultat:_ Konfiguracja przywrócona
4. **Administrator kopii zapasowych:** Wariant B: skonfiguruj system od nowa, dodaj repozytoria i zaimportuj kopie przez skanowanie repozytoriów.

   ```
   Get-VBRBackupRepository -Name "<repozytorium>" | Sync-VBRBackupRepository
   ```
   _Oczekiwany rezultat:_ Kopie widoczne w konsoli
#### 4 · Poświadczenia

5. **Administrator kopii zapasowych:** Zmień wszystkie poświadczenia zapisane w systemie kopii (konta do maszyn, hiperwizorów, repozytoriów, chmury) na nowe.

   ```
   Get-VBRCredentials | Select Name, Description
   ```
   _Oczekiwany rezultat:_ Wszystkie poświadczenia zmienione
#### 5 · Utwardzenie

6. **Administrator kopii zapasowych:** Włącz MFA dla konsoli, zasadę czterech oczu dla usuwania kopii i powiadomienia o zmianach konfiguracji.
   _Oczekiwany rezultat:_ Ustawienia aktywne
#### 6 · Kopia konfiguracji

7. **Administrator kopii zapasowych:** Wykonaj nową kopię konfiguracji i przekaż ją do sejfu.

   ```
   Start-VBRConfigurationBackupJob
   ```
   _Oczekiwany rezultat:_ Kopia konfiguracji wykonana

### Weryfikacja wykonania

Konsola pokazuje repozytoria i punkty z rejestru czystych punktów; próbne przywrócenie pliku testowego działa; dziennik audytu rejestruje logowania.

### Wycofanie

W razie problemów z wariantem A – przejście na wariant B.

### Zapisy

Dziennik odbudowy, lista zmienionych poświadczeń, kopia konfiguracji.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-02
- ISO/IEC 27001:2022 – A.8.13

---

## IN-BKP-4.2 · Przywrócenie harmonogramów backupu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej → PR-BKP-4 · Odtworzenie działania infrastruktury backupu

### Cel

Wznowienie ochrony danych odtworzonych systemów bez ryzyka mieszania nowych kopii z łańcuchami sprzed incydentu.

### Zastosowanie

Po odtworzeniu i dopuszczeniu systemów chronionych (DG5) oraz odbudowie infrastruktury kopii.

### Wymagane uprawnienia i narzędzia

Dostęp do konsoli systemu kopii, lista systemów dopuszczonych do produkcji.

### Środki ostrożności

- Pierwsza kopia każdego systemu musi być pełna (nowy łańcuch).
- Nie skracaj retencji – kopie z okresu incydentu zachowaj jako dowody.

### Kroki

#### 1 · Przegląd

1. **Administrator kopii zapasowych:** Dla każdego systemu dopuszczonego do produkcji sprawdź definicję zadania (zakres, repozytorium, retencja, szyfrowanie, kopia poza siedzibę).
   _Oczekiwany rezultat:_ Definicje zadań zgodne z polityką
#### 2 · Wznowienie

2. **Administrator kopii zapasowych:** Włącz zadanie i wykonaj aktywną kopię pełną.

   ```
   $job = Get-VBRJob -Name "<zadanie>"
   Enable-VBRJob -Job $job
   Start-VBRJob -Job $job -FullBackup
   ```
   _Oczekiwany rezultat:_ Kopia pełna zakończona sukcesem
3. **Administrator kopii zapasowych:** Włącz zadania kopiowania poza siedzibę i do repozytorium niezmiennego; sprawdź pierwsze przebiegi.
   _Oczekiwany rezultat:_ Kopie dodatkowe wykonane
#### 3 · Fale

4. **Administrator kopii zapasowych:** Przywracaj harmonogramy falami według priorytetu systemów; po każdej fali sprawdź obciążenie i wyniki.
   _Oczekiwany rezultat:_ Raport z fali
#### 4 · Dowody

5. **Administrator kopii zapasowych:** Oznacz łańcuchy kopii z okresu incydentu jako zachowywane do zakończenia postępowań.
   _Oczekiwany rezultat:_ Kopie oznaczone
#### 5 · Monitoring

6. **SOC:** Włącz monitorowanie wyników zadań i alerty na nieudane kopie oraz zmiany zadań.
   _Oczekiwany rezultat:_ Alerty aktywne

### Weryfikacja wykonania

Wszystkie systemy krytyczne mają udaną kopię pełną po odtworzeniu, kopię niezmienną i kopię poza siedzibą.

### Wycofanie

Wyłączenie zadania (Disable-VBRJob) przy nieoczekiwanych błędach do czasu wyjaśnienia.

### Zapisy

Lista zadań z datą pierwszej kopii pełnej, raporty fal.

### Mapowanie na wymagania

- NIST CSF 2.0 – PR.DS-11
- ISO/IEC 27001:2022 – A.8.13

---

## PR-BKP-5 · Weryfikacja bezpieczeństwa i sprawności backupu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej

### Cel

Potwierdzenie, że odbudowana infrastruktura kopii jest bezpieczna i że z nowych kopii da się skutecznie odtworzyć systemy w czasie RTO.

### Zakres i wyzwalacz

Infrastruktura kopii i kopie systemów krytycznych po incydencie.

**Wyzwalacz:** zakończenie PR-BKP-4.

### Warunki wstępne

Bramka DG5 z polityki (kryteria dopuszczenia do produkcji) musi być spełniona w całości. Brak spełnienia któregokolwiek kryterium blokuje dopuszczenie – odstępstwo zatwierdza wyłącznie Kierownik incydentu wraz z właścicielem procesu i jest wpisywane do rejestru ryzyk.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Test odtworzenia | Administrator kopii zapasowych | Kierownik odtwarzania | Właściciel procesu biznesowego | Kierownik incydentu |
| Przegląd bezpieczeństwa | Zespół reagowania (CSIRT), Administrator kopii zapasowych | Kierownik incydentu | – | Kierownik odtwarzania |
| Dopuszczenie | Kierownik incydentu | Kierownik incydentu | Kierownik odtwarzania | Zespół zarządzania kryzysowego |

### Przebieg

#### 1 · Test odtworzenia

1. **Administrator kopii zapasowych:** Wykonaj test odtworzenia wybranych kopii według IN-BKP-5.1 (co najmniej jeden system z każdej klasy: AD, baza danych, serwer plików, aplikacja).
   _Oczekiwany rezultat:_ Raport testu z czasami
#### 2 · Bezpieczeństwo

2. **Zespół reagowania (CSIRT):** Sprawdź konfigurację bezpieczeństwa systemu kopii: konta, MFA, uprawnienia, ruch sieciowy, logi w SIEM, alerty na usunięcia i zmiany retencji.
   _Oczekiwany rezultat:_ Raport przeglądu
#### 3 · Zgodność

3. **Administrator kopii zapasowych:** Potwierdź model 3-2-1-1-0 dla systemów krytycznych: kopia niezmienna, kopia poza siedzibą, zero błędów weryfikacji.

   ```
   Veeam.Backup.Validator.exe /backup:"<zadanie>"
   ```
   _Oczekiwany rezultat:_ Brak błędów walidacji
#### 4 · Dopuszczenie

4. **Kierownik incydentu:** Wypełnij CL-BKP-5 i podejmij decyzję DG5 dla infrastruktury kopii.
   _Oczekiwany rezultat:_ CL-BKP-5, wpis DG5

### Kryteria wyjścia

- Test odtworzenia zaliczony, czas w granicach RTO.
- Bezpieczeństwo systemu kopii potwierdzone, DG5 zapisana.

### Zapisy (dowody wykonania)

Raport testu odtworzenia, raport przeglądu bezpieczeństwa, CL-BKP-5, wpis DG5.

### Instrukcje i checklisty

- Instrukcja: **CL-BKP-5 · Test odtwarzania kopii** (v0.1, projekt)
- Instrukcja: **IN-BKP-5.1 · Test odtwarzania z wybranej kopii** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- NIST CSF 2.0 – PR.DS-11
- NIST CSF 2.0 – RC.RP-03
- NIST CSF 2.0 – RC.RP-05
- RODO – rozporządzenie (UE) 2016/679 – art. 32(1)(d)
- DORA – rozporządzenie (UE) 2022/2554 – art. 12
- PCI DSS v4.0.1 – 12.10.2

---

## CL-BKP-5 · Test odtwarzania kopii

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej → PR-BKP-5 · Weryfikacja bezpieczeństwa i sprawności backupu

### Zastosowanie

Zapis wyniku IN-BKP-5.1 dla każdego testowanego systemu.

### Lista kontrolna

1. **Administrator kopii zapasowych:** System i punkt przywracania zapisane
2. **Administrator kopii zapasowych:** Odtworzenie wykonane w odizolowanym środowisku
3. **Administrator kopii zapasowych:** System uruchomiony, usługi działają
4. **Administrator aplikacji:** Testy aplikacyjne zaliczone
5. **Administrator kopii zapasowych:** Czas odtworzenia ≤ RTO
   _Oczekiwany rezultat:_ Czas w minutach
6. **Administrator kopii zapasowych:** Wiek danych ≤ RPO
7. **Administrator kopii zapasowych:** Środowisko testowe usunięte

### Kryteria zaliczenia

Wszystkie punkty spełnione; przekroczenie RTO lub RPO wymaga działania korygującego.

### Zatwierdzenie

Wykonał: Administrator kopii. Potwierdził: właściciel systemu.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-03
- ISO/IEC 27001:2022 – A.8.13

---

## IN-BKP-5.1 · Test odtwarzania z wybranej kopii

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator kopii zapasowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-BKP · Plan reagowania na ransomware w kopii zapasowej → PR-BKP-5 · Weryfikacja bezpieczeństwa i sprawności backupu

### Cel

Udowodnienie, że z kopii da się odtworzyć działający system w czasie nie dłuższym niż RTO i z utratą danych nie większą niż RPO.

### Zastosowanie

Po odbudowie infrastruktury kopii (PR-BKP-5) i cyklicznie raz na kwartał dla systemów krytycznych.

### Wymagane uprawnienia i narzędzia

- Odizolowane środowisko testowe (np. laboratorium wirtualne SureBackup) bez połączenia z produkcją.
- Scenariusz testów aplikacyjnych od właściciela systemu.

### Środki ostrożności

Odtworzone systemy nie mogą mieć łączności z produkcją (konflikty adresów, nazw, replikacja AD).

### Kroki

#### 1 · Przygotowanie

1. **Administrator kopii zapasowych:** Wybierz system i punkt przywracania; zapisz czas utworzenia punktu.
   _Oczekiwany rezultat:_ System, punkt, czas
#### 2 · Odtworzenie

2. **Administrator kopii zapasowych:** Uruchom stoper i odtwórz system do środowiska testowego (pełne odtworzenie, nie tylko natychmiastowe uruchomienie).
   _Oczekiwany rezultat:_ Czas rozpoczęcia
#### 3 · Weryfikacja techniczna

3. **Administrator kopii zapasowych:** Sprawdź uruchomienie systemu: start, usługi, łączność w sieci testowej.
   _Oczekiwany rezultat:_ System działa
#### 4 · Weryfikacja aplikacyjna

4. **Administrator aplikacji:** Wykonaj testy aplikacyjne z scenariusza właściciela (logowanie, kluczowa transakcja, raport).
   _Oczekiwany rezultat:_ Testy zaliczone
#### 5 · Pomiar

5. **Administrator kopii zapasowych:** Zatrzymaj stoper; porównaj czas z RTO, a wiek danych z RPO.
   _Oczekiwany rezultat:_ Czas vs RTO, utrata vs RPO
#### 6 · Zakończenie

6. **Administrator kopii zapasowych:** Usuń środowisko testowe i zapisz wynik w CL-BKP-5.
   _Oczekiwany rezultat:_ CL-BKP-5

### Weryfikacja wykonania

Raport testu zawiera: system, punkt, czas odtworzenia, wynik testów aplikacyjnych, porównanie z RTO/RPO, odstępstwa.

### Wycofanie

Nie dotyczy – środowisko testowe jest usuwane.

### Zapisy

Raport testu odtworzenia (metryki NIST SP 800-184).

### Mapowanie na wymagania

- NIST CSF 2.0 – PR.DS-11
- NIST CSF 2.0 – RC.RP-03
- ISO/IEC 27001:2022 – A.8.13
- RODO – rozporządzenie (UE) 2016/679 – art. 32(1)(d)
- NIST SP 800-184 – METR

---

## PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Plan | biznesowo-techniczna | 0.1 | projekt | CISO | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware

### 1. Cel i zakres

Plan opisuje reakcję Rossmann Polska na wykrycie nieuprawnionej aktywności (nieznanego aktora) w infrastrukturze, zanim dojdzie do szyfrowania. To najważniejszy etap: zatrzymanie atakującego w fazie rozpoznania, eskalacji uprawnień lub ruchu bocznego zapobiega pozostałym scenariuszom.

### 2. Scenariusz

Atakujący uzyskał dostęp (phishing, przejęte konto VPN, podatność usługi brzegowej, socjotechnika wobec service desku, dostawca z dostępem zdalnym), prowadzi rozpoznanie, zdobywa uprawnienia i przygotowuje eksfiltrację oraz wdrożenie ransomware. Typowy czas od wejścia do szyfrowania to od kilku godzin do kilku tygodni.

### 2a. Specyfika Rossmann Polska

Rozproszona infrastruktura (centrala w Łodzi, pięć centrów dystrybucyjnych, około 2000 drogerii) i duża liczba dostawców z dostępem zdalnym zwiększają powierzchnię ataku. Marka jest często wykorzystywana w kampaniach oszustów (fałszywe karty podarunkowe, ankiety) – kampanie phishingowe wobec pracowników i service desku są realnym wektorem wejścia. Wnioski z ataków na sieci handlowe w 2025 r. (Marks & Spencer, Co-op): socjotechnika wobec helpdesku i przejęcie kont, następnie tygodnie zakłóceń logistyki i sprzedaży online.

### 3. Sygnały wykrycia i wskaźniki naruszenia

- Logowania kont uprzywilejowanych z nietypowych hostów, godzin lub krajów; „niemożliwe podróże”.
- Narzędzia rozpoznania i zdalnego wykonywania: AdFind, BloodHound/SharpHound, nltest, PsExec, WMI, PowerShell z kodowanymi poleceniami.
- Narzędzia zdalnego dostępu niezatwierdzone w organizacji (AnyDesk, ScreenConnect, Atera).
- Zrzuty pamięci LSASS, użycie Mimikatz, DCSync (zdarzenie 4662 z prawami replikacji z hosta niebędącego DC).
- Nowe konta, zmiany w grupach uprzywilejowanych (4720, 4728, 4732, 4756), nowe usługi (7045) i zadania (4698).
- Wyłączanie EDR, czyszczenie logów (1102, 104), nietypowy ruch wychodzący, narzędzia rclone, MEGAsync, WinSCP.
- Alerty NAC o nieznanych urządzeniach, skanowanie portów wewnątrz sieci.

### 4. Zasoby objęte planem

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
| Serwery plików i NAS (udziały centrali i centrów dystrybucyjnych) | NetApp ONTAP | 2 d / 4 h | 8 h / 1 h | Migawki co 1 h, kopia dzienna | Replikacja SnapMirror |
| Platforma bezpieczeństwa: SIEM, EDR, NAC | Microsoft Defender for Endpoint | – / – | 4 h / 1 h | Retencja logów 12 mies. | Usługa chmurowa / klaster |
| Kadry i płace | Microsoft SQL Server | 5 d / 24 h | 3 d / 24 h | Kopia dzienna | Ośrodek zapasowy |

### 5. Wpływ na procesy biznesowe i cele odtworzenia

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

### 6. Kryteria aktywacji i klasyfikacja

Plan aktywuje Kierownik incydentu po walidacji alertu przez SOC (bramka DG0), gdy aktywność jest potwierdzona lub nie da się jej wykluczyć w ciągu 60 minut. Kategoria minimum K2; K1 przy aktywności kont tier 0 lub śladach eksfiltracji.

### 7. Organizacja reagowania

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Triaż i walidacja | SOC | Kierownik incydentu | Zespół reagowania (CSIRT) | Zespół zarządzania kryzysowego |
| Analiza zakresu i polowanie na zagrożenia | Zespół reagowania (CSIRT) | Kierownik incydentu | administratorzy | Zespół zarządzania kryzysowego |
| Izolacja hostów i kont | SOC, Administrator AD, Administrator sieci / NAC | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |
| Zabezpieczenie dowodów | Analityk informatyki śledczej | Kierownik incydentu | Dział prawny / compliance | – |
| Usunięcie zagrożenia | Zespół reagowania (CSIRT), administratorzy | Kierownik incydentu | Dostawca | Zespół zarządzania kryzysowego |
| Ocena regulacyjna | Dział prawny / compliance, Inspektor ochrony danych | Kierownik incydentu | Zarząd | Zespół zarządzania kryzysowego |

### 8. Przebieg reagowania

| Faza | Cel | Procedura | Cel czasowy |
|---|---|---|---|
| Wykrycie i ocena | potwierdzenie, kategoria, zakres wstępny | PR-INF-1 | DG0 w 15 min |
| Ograniczenie | odcięcie atakującego bez alarmowania go przedwcześnie | PR-INF-2 | DG1 w 60 min |
| Dowody | zachowanie artefaktów i logów | PR-INF-3 | równolegle z ograniczeniem |
| Usunięcie | usunięcie dostępu i mechanizmów utrzymania | PR-INF-4 | po ustaleniu pełnego zakresu |
| Weryfikacja | potwierdzenie czystości przed przywróceniem dostępu | PR-INF-5 | przed DG5 |

Ograniczanie i usuwanie planuje się jako jedną skoordynowaną operację: częściowe działania (np. zablokowanie jednego konta) ostrzegają atakującego, który może przyspieszyć szyfrowanie. Wyjątek: aktywne szyfrowanie lub eksfiltracja – wtedy izolacja natychmiast.

### 9. Ciągłość działania w trakcie incydentu

Co do zasady procesy biznesowe działają normalnie. Jeśli izolacja obejmuje segmenty wspierające sprzedaż lub logistykę, ZZK uruchamia odpowiednie tryby awaryjne z planów PL-POS i PL-WMS. Przy odcięciu dostępu zdalnego dostawców właściciele procesów wskazują dostawców krytycznych, którym zapewnia się kontrolowany dostęp przez stację pośredniczącą.

### 10. Punkty decyzyjne

- DG0: czy to incydent i jakiej kategorii.
- DG1: obserwacja (krótkotrwała, by poznać zakres) czy natychmiastowe ograniczenie. Przy jakiejkolwiek oznace szyfrowania, eksfiltracji lub aktywności tier 0 – natychmiastowe ograniczenie.
- DG1: czy odciąć internet, VPN i dostęp dostawców w całości.
- DG3: czy zdarzenie spełnia kryteria zgłoszeń.
- Czy zaangażować zewnętrzny zespół IR (zalecane zawsze przy K1).

### 11. Komunikacja i obowiązki raportowe

Komunikację wewnętrzną prowadzi się kanałem pozapasmowym. Komunikaty do pracowników, klientów, dostawców i mediów zatwierdza przewodniczący ZZK. Kierownik incydentu raportuje stan co 2 h w fazie ograniczania i co 4 h w fazie odtwarzania (CSF RC.CO-03).

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

### 12. Kryteria zakończenia

- Ustalono wektor wejścia, wszystkie przejęte konta i hosty oraz T0.
- Usunięto wszystkie mechanizmy utrzymania dostępu; brak nowej aktywności przez 72 h polowania na zagrożenia.
- Zmieniono poświadczenia objęte incydentem.
- Usunięto podatność wejściową i wdrożono detekcje TTP.
- Raport końcowy i przegląd poincydentalny zaplanowane.

### 13. Błędy, których należy unikać

- Reset hasła pojedynczego konta przed ustaleniem zakresu – atakujący użyje innych dróg i przyspieszy atak.
- Logowanie się kontem administratora domeny na zainfekowany host (kradzież poświadczeń).
- Komunikacja o incydencie przez firmową pocztę lub komunikator.
- Formatowanie hostów przed zabezpieczeniem dowodów.
- Zakończenie incydentu bez polowania na zagrożenia w całym środowisku.

### 14. Procedury, instrukcje i checklisty

- Procedura: **PR-INF-1 · Ocena i kwalifikacja naruszenia** (v0.1, projekt)
- Procedura: **PR-INF-2 · Izolacja zagrożonych zasobów** (v0.1, projekt)
- Procedura: **PR-INF-3 · Zabezpieczenie materiału dowodowego** (v0.1, projekt)
- Procedura: **PR-INF-4 · Usunięcie zagrożenia i mechanizmów utrzymania dostępu** (v0.1, projekt)
- Procedura: **PR-INF-5 · Weryfikacja bezpieczeństwa przed przywróceniem dostępu** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.25
- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.8.16
- ISO/IEC 27035 – DETECT
- ISO/IEC 27035 – ASSESS
- ISO/IEC 27035 – RESPOND
- NIST SP 800-61 Rev. 3 / CSF 2.0 – DE.AE
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.MA
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.AN
- NIST CSF 2.0 – DE.AE-02
- NIST CSF 2.0 – DE.AE-03
- NIST CSF 2.0 – DE.AE-08
- NIST CSF 2.0 – RS.MA-02
- NIST CSF 2.0 – RS.MA-03
- NIST CSF 2.0 – RS.MI-01
- NIST CSF 2.0 – RS.MI-02
- PCI DSS v4.0.1 – 12.10.5
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(b)
- Ustawa o KSC – KSC-OBS

---

## PR-INF-1 · Ocena i kwalifikacja naruszenia

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze

### Cel

Szybkie i udokumentowane ustalenie, czy alert oznacza obecność nieuprawnionego aktora, nadanie kategorii incydentu, wstępne określenie zakresu i fazy ataku oraz przygotowanie decyzji o ograniczeniu (DG1).

### Zakres i wyzwalacz

Alerty i zgłoszenia dotyczące nieuprawnionej aktywności w dowolnej części infrastruktury Rossmann Polska: SIEM, EDR, NAC, IDS/IPS, zgłoszenia użytkowników i dostawców, informacje od CSIRT, organów lub badaczy.

**Wyzwalacz:** alert SOC o wysokiej wadze, zgłoszenie podejrzanej aktywności lub informacja zewnętrzna o kompromitacji (np. sprzedaż dostępu, wyciek poświadczeń).

### Warunki wstępne

- Dostęp SOC do SIEM, EDR, NAC i logów sieciowych z kont niezależnych od domeny produkcyjnej lub z MFA odpornym na phishing.
- Aktualna lista kontaktów zespołu reagowania offline i kanał pozapasmowy.
- Kryteria kategorii K1–K4 (polityka, rozdz. 7) i zegar raportowy.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Przyjęcie i walidacja alertu | SOC | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Korelacja i analiza | SOC, Zespół reagowania (CSIRT) | Kierownik incydentu | administratorzy | – |
| Deklaracja i kategoria (DG0) | Kierownik incydentu | Kierownik incydentu | Zespół reagowania (CSIRT) | Zespół zarządzania kryzysowego |
| Ocena wpływu biznesowego | Właściciel procesu biznesowego | Kierownik incydentu | Kierownik odtwarzania | Zespół zarządzania kryzysowego |
| Wstępna ocena regulacyjna | Dział prawny / compliance, Inspektor ochrony danych | Kierownik incydentu | – | Zarząd |

### Przebieg

#### 1 · Walidacja

1. **SOC:** Przyjmij alert i zarejestruj zgłoszenie z czasem wykrycia, źródłem i pierwszymi obserwacjami. Przy podejrzeniu kompromitacji systemu zgłoszeń prowadź rejestr poza domeną.
   _Oczekiwany rezultat:_ Numer zgłoszenia, czas wykrycia
2. **SOC:** Zweryfikuj alert: kontekst hosta i konta, poprzednie alerty, okna zmian i zaplanowane prace administracyjne. Odrzuć fałszywy alarm tylko z udokumentowanym uzasadnieniem.
   _Oczekiwany rezultat:_ Alert potwierdzony lub odrzucony z uzasadnieniem
3. **SOC:** Skoreluj zdarzenia z wielu źródeł (SIEM, EDR, logowania, VPN, proxy, DNS, NAC) według IN-INF-1.1.
   _Oczekiwany rezultat:_ Lista powiązanych hostów, kont i adresów
4. **SOC:** Wypełnij checklistę CL-INF-1 i przekaż wynik Kierownikowi incydentu telefonicznie.
   _Oczekiwany rezultat:_ Checklista CL-INF-1
#### 2 · Kwalifikacja

5. **Kierownik incydentu:** Zadeklaruj incydent i nadaj kategorię K1–K4 (bramka DG0). Zapisz decyzję z godziną i uzasadnieniem.
   _Oczekiwany rezultat:_ Wpis DG0 w dzienniku
6. **Kierownik incydentu:** Przenieś komunikację zespołu na kanał pozapasmowy i zwołaj zespół reagowania. Przy K1–K2 powiadom przewodniczącego ZZK.
   _Oczekiwany rezultat:_ Potwierdzenia członków zespołu
7. **Kierownik incydentu:** Uruchom zegar raportowy (czas wykrycia) w BCM Studio.
   _Oczekiwany rezultat:_ Terminy zgłoszeń wyliczone
#### 3 · Zakres

8. **Zespół reagowania (CSIRT):** Ustal fazę ataku według MITRE ATT&CK: dostęp początkowy, rozpoznanie, eskalacja uprawnień, ruch boczny, eksfiltracja, szyfrowanie. Faza decyduje o pilności ograniczenia.
   _Oczekiwany rezultat:_ Faza ataku i techniki ATT&CK
9. **Zespół reagowania (CSIRT):** Wyznacz wstępne T0 (najwcześniejszy ślad) i listę zasobów w zakresie: hosty, konta, segmenty, usługi chmurowe, dostawcy.
   _Oczekiwany rezultat:_ Wstępne T0 i lista zasobów
10. **Zespół reagowania (CSIRT):** Sprawdź oznaki eksfiltracji (wolumen ruchu wychodzącego, narzędzia synchronizacji, archiwa) i dostępu do danych osobowych lub danych kart.
   _Oczekiwany rezultat:_ Ocena eksfiltracji: brak / możliwa / potwierdzona
#### 4 · Wpływ i obowiązki

11. **Właściciel procesu biznesowego:** Oceń wpływ na procesy z BIA i czas do przekroczenia MTPD przy izolacji zasobów w zakresie.
   _Oczekiwany rezultat:_ Ocena wpływu biznesowego
12. **Inspektor ochrony danych:** Wykonaj wstępną ocenę naruszenia ochrony danych osobowych; zapisz moment stwierdzenia naruszenia.
   _Oczekiwany rezultat:_ Wstępna ocena RODO
13. **Dział prawny / compliance:** Oceń progi incydentu poważnego (NIS2/KSC, DORA – jeśli dotyczy) oraz obowiązki umowne (PCI DSS, ubezpieczyciel).
   _Oczekiwany rezultat:_ Lista obowiązków i terminów
14. **Kierownik incydentu:** Zdecyduj o zaangażowaniu zewnętrznego zespołu IR (retainer) i powiadomieniu ubezpieczyciela.
   _Oczekiwany rezultat:_ Decyzja w dzienniku
15. **Kierownik incydentu:** Przekaż raport sytuacyjny SITREP nr 1 do ZZK: co wiemy, czego nie wiemy, podjęte decyzje, rekomendacja DG1, godzina następnego raportu.
   _Oczekiwany rezultat:_ SITREP nr 1

### Kryteria wyjścia

- Incydent zadeklarowany lub zdarzenie zamknięte z uzasadnieniem.
- Kategoria, wstępne T0, zakres i faza ataku ustalone.
- Plan scenariuszowy aktywowany, rekomendacja DG1 przygotowana.
- Obowiązki raportowe zidentyfikowane, zegar uruchomiony.

### Zapisy (dowody wykonania)

Zgłoszenie incydentu, dziennik decyzji (DG0), checklista CL-INF-1, oś czasu, SITREP nr 1, wstępna ocena RODO.

### Instrukcje i checklisty

- Instrukcja: **CL-INF-1 · Ocena i kwalifikacja naruszenia** (v0.1, projekt)
- Instrukcja: **IN-INF-1.1 · Analiza alertów i ruchu sieciowego** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.25
- ISO/IEC 27001:2022 – A.6.8
- ISO/IEC 27035 – DETECT
- ISO/IEC 27035 – ASSESS
- NIST SP 800-61 Rev. 3 / CSF 2.0 – DE.AE
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.AN
- NIST CSF 2.0 – DE.AE-02
- NIST CSF 2.0 – DE.AE-03
- NIST CSF 2.0 – DE.AE-08
- NIST CSF 2.0 – RS.MA-02
- NIST CSF 2.0 – RS.MA-03
- NIST CSF 2.0 – RS.MA-04
- NIST CSF 2.0 – RS.AN-08
- NIS2 – dyrektywa (UE) 2022/2555 – art. 23
- RODO – rozporządzenie (UE) 2016/679 – art. 33
- Ustawa o KSC – KSC-ZGL

---

## CL-INF-1 · Ocena i kwalifikacja naruszenia

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze → PR-INF-1 · Ocena i kwalifikacja naruszenia

### Zastosowanie

Wypełnia SOC podczas walidacji alertu; zatwierdza Kierownik incydentu przy deklaracji (DG0).

### Lista kontrolna

1. **SOC:** Czas wykrycia i źródło alertu zapisane
   _Oczekiwany rezultat:_ Zgłoszenie z czasem
2. **SOC:** Alert zweryfikowany z kontekstem (host, konto, proces, okna zmian)
   _Oczekiwany rezultat:_ Karta alertu
3. **SOC:** Zdarzenia skorelowane z co najmniej trzema źródłami (EDR, logowania, sieć)
   _Oczekiwany rezultat:_ Wyniki zapytań
4. **SOC:** Sprawdzone oznaki przygotowania szyfrowania (kopie migawkowe, wyłączanie EDR)
5. **SOC:** Sprawdzone oznaki eksfiltracji
6. **Zespół reagowania (CSIRT):** Faza ataku określona (ATT&CK)
7. **Zespół reagowania (CSIRT):** Wstępne T0 wyznaczone
8. **Zespół reagowania (CSIRT):** Lista hostów, kont i segmentów w zakresie
9. **Właściciel procesu biznesowego:** Wpływ na procesy z BIA oceniony
10. **Inspektor ochrony danych:** Wstępna ocena naruszenia danych osobowych; moment stwierdzenia zapisany
11. **Dział prawny / compliance:** Progi zgłoszeń regulacyjnych ocenione
12. **Kierownik incydentu:** Kategoria K1–K4 nadana i zapisana (DG0)
   _Oczekiwany rezultat:_ Wpis DG0
13. **Kierownik incydentu:** Kanał pozapasmowy uruchomiony, zespół powiadomiony
14. **Kierownik incydentu:** SITREP nr 1 przekazany ZZK z godziną kolejnego raportu
   _Oczekiwany rezultat:_ SITREP

### Kryteria zaliczenia

Wszystkie punkty spełnione lub oznaczone jako nie dotyczy z uzasadnieniem. Punkty dotyczące kategorii, zakresu i T0 są obowiązkowe.

### Zatwierdzenie

Wypełnił: analityk SOC (imię, godzina). Zatwierdził: Kierownik incydentu (imię, godzina).

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.MA-02
- NIST CSF 2.0 – RS.MA-03
- NIST CSF 2.0 – DE.AE-08

---

## IN-INF-1.1 · Analiza alertów i ruchu sieciowego

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze → PR-INF-1 · Ocena i kwalifikacja naruszenia

### Cel

Potwierdzenie lub wykluczenie aktywności atakującego oraz ustalenie powiązanych hostów, kont i połączeń przez korelację danych z wielu źródeł.

### Zastosowanie

Przy każdym alercie zakwalifikowanym do PR-INF-1. Zapytania podano dla Microsoft Defender XDR i Microsoft Sentinel (KQL); w innym SIEM użyj odpowiedników.

### Wymagane uprawnienia i narzędzia

- Dostęp do zaawansowanego wyszukiwania w EDR i do SIEM (rola analityka).
- Dostęp do logów zapór, proxy i DNS.
- Lista kont uprzywilejowanych i adresów zarządzania.

### Środki ostrożności

- Nie łącz się z hostem podejrzanym kontem uprzywilejowanym.
- Nie odwiedzaj domen i adresów atakującego z sieci firmowej; używaj usług reputacyjnych.
- Zapisuj każde wykonane zapytanie z czasem i wynikiem (RS.AN-06).

### Kroki

#### 1 · Kontekst

1. **SOC:** Zbierz kontekst alertu: host, konto, proces, linia poleceń, proces nadrzędny, skrót pliku, pierwsze i ostatnie wystąpienie.
   _Oczekiwany rezultat:_ Karta alertu uzupełniona
#### 2 · Hosty i procesy

2. **SOC:** Sprawdź polecenia typowe dla przygotowania ransomware (usuwanie kopii migawkowych, wyłączanie odzyskiwania).

   ```
   DeviceProcessEvents
   | where Timestamp > ago(30d)
   | where ProcessCommandLine has_any ("vssadmin delete", "shadowcopy delete", "wbadmin delete", "recoveryenabled no", "bcdedit /set")
   | project Timestamp, DeviceName, AccountName, FileName, ProcessCommandLine, InitiatingProcessFileName
   ```
   _Oczekiwany rezultat:_ Lista wystąpień lub brak
3. **SOC:** Wyszukaj narzędzia rozpoznania, ruchu bocznego, kradzieży poświadczeń i zdalnego dostępu.

   ```
   DeviceProcessEvents
   | where Timestamp > ago(30d)
   | where FileName in~ ("adfind.exe","sharphound.exe","psexec.exe","psexesvc.exe","procdump.exe","mimikatz.exe","rclone.exe","anydesk.exe","nltest.exe","netscan.exe")
   | summarize Pierwsze=min(Timestamp), Ostatnie=max(Timestamp), Liczba=count() by DeviceName, FileName, AccountName
   ```
   _Oczekiwany rezultat:_ Hosty i konta z narzędziami
#### 3 · Tożsamość

4. **SOC:** Sprawdź zmiany w grupach uprzywilejowanych, nowe konta, usługi i zadania.

   ```
   SecurityEvent
   | where TimeGenerated > ago(30d)
   | where EventID in (4720, 4728, 4732, 4756, 7045, 4698, 1102)
   | project TimeGenerated, Computer, EventID, Activity, SubjectUserName, TargetUserName, MemberName
   ```
   _Oczekiwany rezultat:_ Lista zmian do weryfikacji z właścicielami
5. **SOC:** Wyszukaj logowania z nietypowych lokalizacji i dla kont uprzywilejowanych w chmurze.

   ```
   SigninLogs
   | where TimeGenerated > ago(30d) and ResultType == 0
   | summarize Kraje=make_set(Location), Adresy=make_set(IPAddress) by UserPrincipalName
   | where array_length(Kraje) > 1
   ```
   _Oczekiwany rezultat:_ Konta z anomaliami logowań
#### 4 · Sieć

6. **SOC:** Sprawdź oznaki eksfiltracji: narzędzia synchronizacji i duże transfery wychodzące.

   ```
   DeviceNetworkEvents
   | where Timestamp > ago(30d)
   | where InitiatingProcessFileName in~ ("rclone.exe","megasync.exe","winscp.exe","filezilla.exe") or RemoteUrl has_any ("mega.nz","mega.co.nz")
   | summarize Polaczenia=count() by DeviceName, InitiatingProcessFileName, RemoteUrl, RemoteIP
   ```
   _Oczekiwany rezultat:_ Ocena eksfiltracji
7. **SOC:** Przeanalizuj ruch sieciowy: połączenia do adresów o złej reputacji, regularne połączenia (beaconing), zapytania DNS do nowo zarejestrowanych domen, ruch SMB/RDP między stacjami roboczymi.
   _Oczekiwany rezultat:_ Lista podejrzanych połączeń
8. **SOC:** Sprawdź w NAC nowe lub nieznane urządzenia i nietypowe przypisania portów w okresie od wstępnego T0.
   _Oczekiwany rezultat:_ Lista urządzeń do wyjaśnienia
#### 5 · Synteza

9. **SOC:** Zbuduj oś czasu zdarzeń i mapę powiązań host–konto–adres; oznacz techniki MITRE ATT&CK.
   _Oczekiwany rezultat:_ Oś czasu i mapa powiązań
10. **SOC:** Zapisz IoC (skróty, adresy, domeny, nazwy plików) w rejestrze IoC incydentu.
   _Oczekiwany rezultat:_ Rejestr IoC

### Weryfikacja wykonania

Każdy powiązany host i konto ma przypisany status (potwierdzony / podejrzany / wykluczony) z uzasadnieniem. Oś czasu zawiera wstępne T0. Wyniki przekazano Kierownikowi incydentu.

### Wycofanie

Nie dotyczy – czynności analityczne nie zmieniają stanu systemów.

### Zapisy

Wykaz zapytań z wynikami, oś czasu, rejestr IoC, mapa powiązań.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.15
- ISO/IEC 27001:2022 – A.8.16
- NIST CSF 2.0 – DE.AE-02
- NIST CSF 2.0 – DE.AE-03
- NIST CSF 2.0 – DE.CM-01
- NIST SP 800-61 Rev. 3 / CSF 2.0 – DE.AE

---

## PR-INF-2 · Izolacja zagrożonych zasobów

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze

### Cel

Odcięcie atakującego od zasobów i zatrzymanie rozprzestrzeniania się zagrożenia przy kontrolowanym wpływie na procesy biznesowe.

### Zakres i wyzwalacz

Hosty, konta, sesje, segmenty sieci, dostęp zdalny i połączenia zewnętrzne objęte zakresem z PR-INF-1.

**Wyzwalacz:** decyzja DG1 Kierownika incydentu albo – bez czekania na DG1 – aktywne szyfrowanie lub eksfiltracja zaobserwowane przez SOC.

### Warunki wstępne

- Zakres z PR-INF-1, lista hostów i kont do izolacji.
- Przygotowane polityki kwarantanny w EDR i NAC oraz reguły blokujące na zaporach.
- Ustalone wyjątki (np. łącza terminali płatniczych, sterowanie bezpieczeństwem automatyki).

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Zatwierdzenie zakresu izolacji (DG1) | Kierownik incydentu | Kierownik incydentu | Zespół reagowania (CSIRT), Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |
| Izolacja w EDR | SOC | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Kwarantanna NAC i blokady sieciowe | Administrator sieci / NAC | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Blokada kont i sesji | Administrator AD | Kierownik incydentu | Zespół reagowania (CSIRT) | Service desk |
| Weryfikacja skuteczności | SOC | Kierownik incydentu | Administrator sieci / NAC | Zespół zarządzania kryzysowego |

### Zasada koordynacji

Przy aktywności bez szyfrowania wszystkie działania ograniczające wykonuje się w jednym, uzgodnionym oknie (zwykle 15–30 min), aby atakujący nie zdążył zareagować. Przy aktywnym szyfrowaniu lub eksfiltracji izoluje się natychmiast, nawet kosztem przerwy w procesach.

### Przebieg

#### 1 · Decyzja

1. **Kierownik incydentu:** Zatwierdź zakres izolacji (DG1): hosty, konta, segmenty, odcięcie internetu, VPN i dostępu dostawców. Zapisz oczekiwany wpływ biznesowy i uruchamiane tryby awaryjne.
   _Oczekiwany rezultat:_ Wpis DG1 z listą zasobów
2. **Kierownik incydentu:** Wyznacz godzinę rozpoczęcia skoordynowanej izolacji i przypisz wykonawców.
   _Oczekiwany rezultat:_ Harmonogram izolacji
#### 2 · Hosty

3. **SOC:** Odizoluj hosty w EDR według IN-INF-2.1.
   _Oczekiwany rezultat:_ Status hostów: odizolowany
4. **Administrator sieci / NAC:** Hosty bez EDR (drukarki, urządzenia IoT, terminale, systemy obce) poddaj kwarantannie w NAC według IN-INF-2.2.
   _Oczekiwany rezultat:_ Urządzenia w VLAN/ACL kwarantanny
#### 3 · Tożsamość

5. **Administrator AD:** Zablokuj podejrzane konta i zakończ ich sesje według IN-INF-2.3.
   _Oczekiwany rezultat:_ Konta zablokowane, sesje zakończone
#### 4 · Sieć

6. **Administrator sieci / NAC:** Zablokuj wskaźniki sieciowe (adresy IP, domeny, URL C2) na zaporach, proxy i DNS.
   _Oczekiwany rezultat:_ Reguły blokujące aktywne
7. **Administrator sieci / NAC:** Ogranicz ruch między strefami (centrala, centra dystrybucyjne, placówki, serwery, backup, OT) do niezbędnych przepływów z listy wyjątków.
   _Oczekiwany rezultat:_ Reguły międzystrefowe w trybie incydentu
8. **Administrator sieci / NAC:** Wyłącz dostęp zdalny dostawców i VPN dla użytkowników; pozostaw VPN wyłącznie dla zespołu reagowania z MFA.
   _Oczekiwany rezultat:_ Sesje VPN zakończone
9. **Administrator sieci / NAC:** Zablokuj ruch wychodzący do internetu z segmentów serwerowych poza listą dozwolonych celów (aktualizacje, usługi krytyczne).
   _Oczekiwany rezultat:_ Polityka ruchu wychodzącego aktywna
#### 5 · Ochrona kopii

10. **Administrator kopii zapasowych:** Prewencyjnie odizoluj infrastrukturę kopii zapasowych (PR-BKP-2).
   _Oczekiwany rezultat:_ Kopie odizolowane
#### 6 · Weryfikacja

11. **SOC:** Zweryfikuj skuteczność izolacji według IN-INF-2.4.
   _Oczekiwany rezultat:_ Raport weryfikacji izolacji
12. **Kierownik incydentu:** Wypełnij CL-INF-2, przekaż SITREP do ZZK z informacją o wpływie izolacji na procesy.
   _Oczekiwany rezultat:_ CL-INF-2, SITREP

### Kryteria wyjścia

- Wszystkie zasoby z zakresu odizolowane, skuteczność potwierdzona.
- Brak nowych połączeń atakującego przez co najmniej 2 h monitoringu.
- Tryby awaryjne uruchomione tam, gdzie izolacja wpływa na procesy.

### Zapisy (dowody wykonania)

Wpis DG1, lista izolowanych zasobów z godzinami, zmiany reguł sieciowych (numery zmian awaryjnych), raport IN-INF-2.4, checklista CL-INF-2.

### Instrukcje i checklisty

- Instrukcja: **CL-INF-2 · Izolacja i ograniczenie zagrożenia** (v0.1, projekt)
- Instrukcja: **IN-INF-2.1 · Izolacja urządzenia w EDR** (v0.1, projekt)
- Instrukcja: **IN-INF-2.2 · Kwarantanna zagrożonego urządzenia w NAC** (v0.1, projekt)
- Instrukcja: **IN-INF-2.3 · Blokowanie podejrzanych kont i sesji** (v0.1, projekt)
- Instrukcja: **IN-INF-2.4 · Weryfikacja skuteczności izolacji** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.8.20
- ISO/IEC 27001:2022 – A.8.22
- ISO/IEC 27035 – RESPOND
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.MI
- NIST CSF 2.0 – RS.MI-01
- NIST CSF 2.0 – PR.IR-01

---

## CL-INF-2 · Izolacja i ograniczenie zagrożenia

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze → PR-INF-2 · Izolacja zagrożonych zasobów

### Zastosowanie

Kontrola kompletności ograniczenia po wykonaniu PR-INF-2.

### Lista kontrolna

1. **Kierownik incydentu:** Zakres izolacji zatwierdzony (DG1) z listą zasobów i wyjątków
   _Oczekiwany rezultat:_ Wpis DG1
2. **SOC:** Hosty z EDR odizolowane
   _Oczekiwany rezultat:_ Rejestr izolacji
3. **Administrator sieci / NAC:** Urządzenia bez EDR w kwarantannie NAC lub z wyłączonym portem
   _Oczekiwany rezultat:_ Rejestr izolacji
4. **Administrator AD:** Podejrzane konta zablokowane w AD i Entra ID, sesje zakończone
   _Oczekiwany rezultat:_ Rejestr blokad
5. **Administrator sieci / NAC:** IoC sieciowe zablokowane na zaporach, proxy i DNS
6. **Administrator sieci / NAC:** Ruch międzystrefowy ograniczony do wyjątków
7. **Administrator sieci / NAC:** Dostęp zdalny dostawców i VPN użytkowników wyłączony
8. **Administrator sieci / NAC:** Ruch wychodzący z serwerów ograniczony
9. **Administrator kopii zapasowych:** Infrastruktura kopii odizolowana
10. **SOC:** Skuteczność izolacji potwierdzona (IN-INF-2.4)
   _Oczekiwany rezultat:_ Raport weryfikacji
11. **Zespół zarządzania kryzysowego:** Tryby awaryjne uruchomione tam, gdzie izolacja wpływa na procesy

### Kryteria zaliczenia

Wszystkie punkty spełnione; każda nieskuteczna izolacja ma działanie naprawcze w toku.

### Zatwierdzenie

Wypełnił: koordynator techniczny. Zatwierdził: Kierownik incydentu.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.MI-01

---

## IN-INF-2.1 · Izolacja urządzenia w EDR

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze → PR-INF-2 · Izolacja zagrożonych zasobów

### Cel

Odcięcie hosta od sieci przy zachowaniu łączności z konsolą EDR, co pozwala na dalszą analizę i zbieranie dowodów.

### Zastosowanie

Hosty z potwierdzoną lub prawdopodobną aktywnością atakującego, wskazane w decyzji DG1. Przykłady dla Microsoft Defender for Endpoint, CrowdStrike Falcon i SentinelOne.

### Wymagane uprawnienia i narzędzia

- Rola z uprawnieniem do akcji reagowania w EDR.
- Token API (rejestracja aplikacji z uprawnieniem Machine.Isolate lub odpowiednik) przy izolacji masowej.
- Lista hostów z identyfikatorami EDR.

### Środki ostrożności

- Używaj izolacji pełnej, nie selektywnej (izolacja selektywna pozostawia komunikację poczty i komunikatora).
- Przed izolacją serwerów krytycznych uprzedź właściciela procesu (zatwierdzone w DG1).
- Nie wyłączaj hosta – pamięć jest dowodem.

### Kroki

#### 1 · Przygotowanie

1. **SOC:** Ustal identyfikator urządzenia w EDR.

   ```
   GET https://api.security.microsoft.com/api/machines?$filter=computerDnsName eq '<host.domena>'
   ```
   _Oczekiwany rezultat:_ Identyfikator machineId
2. **SOC:** Zbierz pakiet dochodzeniowy przed izolacją, jeśli czas pozwala (brak aktywnego szyfrowania).

   ```
   POST https://api.security.microsoft.com/api/machines/<machineId>/collectInvestigationPackage
   {"Comment":"IR-<nr> pakiet przed izolacją"}
   ```
   _Oczekiwany rezultat:_ Pakiet zebrany
#### 2 · Izolacja

3. **SOC:** Microsoft Defender for Endpoint: wykonaj pełną izolację.

   ```
   POST https://api.security.microsoft.com/api/machines/<machineId>/isolate
   {"Comment":"IR-<nr> DG1","IsolationType":"Full"}
   ```
   _Oczekiwany rezultat:_ Status akcji: Succeeded
4. **SOC:** CrowdStrike Falcon: zastosuj ograniczenie sieciowe (network containment).

   ```
   POST https://api.crowdstrike.com/devices/entities/devices-actions/v2?action_name=contain
   {"ids":["<aid>"]}
   ```
   _Oczekiwany rezultat:_ Status: contained
5. **SOC:** SentinelOne: odłącz agenta od sieci.

   ```
   POST https://<konsola>/web/api/v2.1/agents/actions/disconnect
   {"filter":{"ids":["<agentId>"]}}
   ```
   _Oczekiwany rezultat:_ Status: disconnected
#### 3 · Utwardzenie

6. **SOC:** Ogranicz wykonywanie aplikacji do podpisanych przez zaufanych wydawców, jeśli EDR to umożliwia.

   ```
   POST https://api.security.microsoft.com/api/machines/<machineId>/restrictCodeExecution
   {"Comment":"IR-<nr>"}
   ```
   _Oczekiwany rezultat:_ Ograniczenie aktywne
#### 4 · Rejestracja

7. **SOC:** Zapisz godzinę izolacji, identyfikator akcji i wykonawcę w rejestrze izolacji.
   _Oczekiwany rezultat:_ Wpis w rejestrze

### Weryfikacja wykonania

Konsola EDR pokazuje status „odizolowany” / „contained”. Weryfikacja sieciowa według IN-INF-2.4.

### Wycofanie

Zdjęcie izolacji wyłącznie po decyzji DG5: MDE `POST /api/machines/<machineId>/unisolate`, CrowdStrike `action_name=lift_containment`, SentinelOne `agents/actions/connect`.

### Zapisy

Rejestr izolacji (host, identyfikator akcji, godzina, wykonawca, decyzja DG1).

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.7
- NIST CSF 2.0 – RS.MI-01
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.MI

---

## IN-INF-2.2 · Kwarantanna zagrożonego urządzenia w NAC

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze → PR-INF-2 · Izolacja zagrożonych zasobów

### Cel

Przeniesienie urządzenia do kwarantanny sieciowej (VLAN lub lista ACL), gdy nie ma na nim EDR albo izolacja EDR jest niewystarczająca.

### Zastosowanie

Urządzenia bez EDR (drukarki, IoT, terminale, sprzęt dostawców), urządzenia nieznane oraz jako druga warstwa dla hostów krytycznych. Przykład dla Cisco ISE (Adaptive Network Control); dla Aruba ClearPass i FortiNAC użyj odpowiednich mechanizmów zmiany roli i CoA.

### Wymagane uprawnienia i narzędzia

- Konto ERS API w ISE z rolą ERS Admin lub dostęp do konsoli NAC.
- Zdefiniowana polityka ANC „KWARANTANNA” z autoryzacją do VLAN/dACL kwarantanny.
- Adres MAC urządzenia (z NAC, przełącznika lub DHCP).

### Środki ostrożności

- Kwarantanna urządzenia sterującego automatyką może spowodować zatrzymanie procesu – zastosuj wyjątki z DG1.
- Urządzenia ze statycznym adresem i bez 802.1X wymagają wyłączenia portu na przełączniku.

### Kroki

#### 1 · Identyfikacja

1. **Administrator sieci / NAC:** Ustal adres MAC i port przełącznika urządzenia.

   ```
   show mac address-table address <mac>
   ```
   _Oczekiwany rezultat:_ Przełącznik i port
#### 2 · Kwarantanna

2. **Administrator sieci / NAC:** Zastosuj politykę kwarantanny ANC w Cisco ISE (wywoła CoA i ponowną autoryzację).

   ```
   PUT https://<ise>:9060/ers/config/ancendpoint/apply
   Content-Type: application/json
   {"OperationAdditionalData":{"additionalData":[{"name":"macAddress","value":"<MAC>"},{"name":"policyName","value":"KWARANTANNA"}]}}
   ```
   _Oczekiwany rezultat:_ HTTP 204, sesja ponownie autoryzowana
3. **Administrator sieci / NAC:** Dla urządzeń bez 802.1X/MAB: wyłącz port przełącznika lub przypisz go do VLAN kwarantanny.

   ```
   interface <port>
    switchport access vlan <vlan-kwarantanny>
    shutdown
   ```
   _Oczekiwany rezultat:_ Port w VLAN kwarantanny lub wyłączony
#### 3 · Kontrola

4. **Administrator sieci / NAC:** Sprawdź w ISE, że sesja urządzenia ma profil autoryzacji kwarantanny.
   _Oczekiwany rezultat:_ Live Logs: profil KWARANTANNA
#### 4 · Rejestracja

5. **Administrator sieci / NAC:** Zapisz urządzenie, port, godzinę i wykonawcę w rejestrze izolacji.
   _Oczekiwany rezultat:_ Wpis w rejestrze

### Weryfikacja wykonania

Urządzenie ma dostęp wyłącznie do usług dozwolonych w kwarantannie (np. serwer naprawczy). Test według IN-INF-2.4.

### Wycofanie

Po DG5: `PUT https://<ise>:9060/ers/config/ancendpoint/clear` z adresem MAC; przywrócenie konfiguracji portu z kopii konfiguracji.

### Zapisy

Rejestr izolacji, numer zmiany awaryjnej.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.20
- ISO/IEC 27001:2022 – A.8.22
- NIST CSF 2.0 – PR.IR-01
- NIST CSF 2.0 – RS.MI-01

---

## IN-INF-2.3 · Blokowanie podejrzanych kont i sesji

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze → PR-INF-2 · Izolacja zagrożonych zasobów

### Cel

Uniemożliwienie atakującemu korzystania z przejętych kont i aktywnych sesji w AD, Entra ID, VPN i systemach zdalnego dostępu.

### Zastosowanie

Konta wskazane w zakresie incydentu. Przy kontach tier 0 – w ramach skoordynowanej operacji (PR-INF-4), chyba że trwa szyfrowanie.

### Wymagane uprawnienia i narzędzia

- Uprawnienia do zarządzania kontami w AD i Entra ID (moduły ActiveDirectory i Microsoft.Graph).
- Dostęp administracyjny do koncentratora VPN i systemów zdalnego dostępu.
- Stacja administracyjna PAW lub host niezwiązany z incydentem.

### Środki ostrożności

- Reset hasła nie unieważnia od razu istniejących biletów Kerberos ani tokenów dostępu – zawsze łącz blokadę z zakończeniem sesji.
- Nie blokuj kont awaryjnych (break-glass) i kont zespołu reagowania.
- Konta serwisowe blokuj po uzgodnieniu z właścicielem aplikacji (wpływ na usługi).

### Kroki

#### 1 · AD

1. **Administrator AD:** Wyłącz konta w AD.

   ```
   Disable-ADAccount -Identity <konto>
   ```
   _Oczekiwany rezultat:_ Enabled = False
2. **Administrator AD:** Zresetuj hasło na losowe (dwukrotnie dla kont podejrzanych o kradzież skrótu hasła).

   ```
   Set-ADAccountPassword -Identity <konto> -Reset -NewPassword (Read-Host -AsSecureString)
   ```
   _Oczekiwany rezultat:_ Hasło zmienione
3. **Administrator AD:** Zakończ interaktywne sesje RDP na serwerach, na których konto jest zalogowane.

   ```
   query session /server:<host>
   logoff <id-sesji> /server:<host>
   ```
   _Oczekiwany rezultat:_ Brak sesji konta
#### 2 · Chmura

4. **Administrator AD:** Entra ID: zablokuj logowanie i unieważnij tokeny odświeżania.

   ```
   Update-MgUser -UserId <upn> -AccountEnabled:$false
   Revoke-MgUserSignInSession -UserId <upn>
   ```
   _Oczekiwany rezultat:_ Konto zablokowane, sesje unieważnione
5. **Administrator AD:** Usuń metody MFA dodane przez atakującego i sprawdź aplikacje z uprawnieniami delegowanymi.

   ```
   Get-MgUserAuthenticationMethod -UserId <upn>
   ```
   _Oczekiwany rezultat:_ Tylko zweryfikowane metody
#### 3 · Dostęp zdalny

6. **Administrator sieci / NAC:** Zakończ sesje VPN i zdalnego dostępu kont z listy, zablokuj konta lokalne na urządzeniach brzegowych.
   _Oczekiwany rezultat:_ Brak aktywnych sesji
#### 4 · Konta serwisowe

7. **Administrator AD:** Dla kont serwisowych: wyłącz konto lub zmień hasło i zaktualizuj je w usługach zależnych po uzgodnieniu z właścicielem.
   _Oczekiwany rezultat:_ Usługi działają z nowym hasłem lub są celowo zatrzymane
#### 5 · Rejestracja

8. **Administrator AD:** Zapisz każde konto, wykonane działanie i godzinę w rejestrze.
   _Oczekiwany rezultat:_ Rejestr blokad

### Weryfikacja wykonania

Brak udanych logowań zablokowanych kont po godzinie blokady (zdarzenia 4624 w AD, SigninLogs w Entra ID, logi VPN) – według IN-INF-2.4.

### Wycofanie

Odblokowanie konta (`Enable-ADAccount`, `Update-MgUser -AccountEnabled:$true`) wyłącznie po DG5 i po nadaniu nowego hasła z weryfikacją tożsamości właściciela.

### Zapisy

Rejestr blokad kont i sesji.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.15
- ISO/IEC 27001:2022 – A.8.2
- NIST CSF 2.0 – RS.MI-01

---

## IN-INF-2.4 · Weryfikacja skuteczności izolacji

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze → PR-INF-2 · Izolacja zagrożonych zasobów

### Cel

Obiektywne potwierdzenie, że odizolowane hosty, urządzenia i konta nie mają już łączności ani dostępu poza dozwolonymi wyjątkami.

### Zastosowanie

Po każdej fali izolacji (PR-INF-2) oraz cyklicznie co 4 h do czasu usunięcia zagrożenia.

### Wymagane uprawnienia i narzędzia

- Dostęp do SIEM i EDR.
- Host testowy w odpowiednich segmentach (jump host zespołu reagowania).

### Środki ostrożności

Testy łączności wykonuj z hostów zespołu reagowania, nigdy z hostów odizolowanych.

### Kroki

#### 1 · Hosty

1. **SOC:** Sprawdź w konsoli EDR status izolacji każdego hosta z rejestru.
   _Oczekiwany rezultat:_ Wszystkie hosty: odizolowany
2. **SOC:** Potwierdź brak połączeń sieciowych odizolowanych hostów po godzinie izolacji (poza komunikacją z EDR).

   ```
   DeviceNetworkEvents
   | where Timestamp > datetime(<godzina izolacji>)
   | where DeviceName in~ (<lista hostów>)
   | where ActionType == "ConnectionSuccess"
   | summarize count() by DeviceName, RemoteIP, RemotePort, InitiatingProcessFileName
   ```
   _Oczekiwany rezultat:_ Brak połączeń poza EDR
#### 2 · Sieć

3. **SOC:** Z hosta zespołu reagowania sprawdź niedostępność kluczowych portów odizolowanych hostów.

   ```
   Test-NetConnection <host> -Port 445
   Test-NetConnection <host> -Port 3389
   ```
   _Oczekiwany rezultat:_ TcpTestSucceeded: False
4. **Administrator sieci / NAC:** Sprawdź w NAC, że urządzenia w kwarantannie mają profil kwarantanny, a w logach zapór brak ich ruchu poza dozwolonym.
   _Oczekiwany rezultat:_ Profil KWARANTANNA, brak ruchu
#### 3 · Tożsamość

5. **SOC:** Potwierdź brak udanych logowań zablokowanych kont.

   ```
   SigninLogs
   | where TimeGenerated > datetime(<godzina blokady>)
   | where UserPrincipalName in~ (<lista kont>) and ResultType == 0
   ```
   _Oczekiwany rezultat:_ Wynik pusty
6. **SOC:** Potwierdź brak ruchu do zablokowanych wskaźników sieciowych (IoC) w logach zapór, proxy i DNS.
   _Oczekiwany rezultat:_ Brak trafień lub tylko zablokowane
#### 4 · Raport

7. **SOC:** Przekaż raport weryfikacji Kierownikowi incydentu; każdą nieskuteczną izolację eskaluj natychmiast.
   _Oczekiwany rezultat:_ Raport weryfikacji

### Weryfikacja wykonania

Raport zawiera wynik dla każdej pozycji rejestru izolacji. Brak pozycji ze statusem „nieskuteczna” bez działań naprawczych.

### Wycofanie

Nie dotyczy.

### Zapisy

Raport weryfikacji izolacji z wynikami zapytań.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.MI-01
- NIST CSF 2.0 – DE.CM-01
- ISO/IEC 27001:2022 – A.8.16

---

## PR-INF-3 · Zabezpieczenie materiału dowodowego

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze

### Cel

Zachowanie dowodów cyfrowych w sposób zapewniający ich integralność i dopuszczalność (ISO/IEC 27037), niezbędnych do ustalenia przyczyny, zakresu, T0, obowiązków regulacyjnych i ewentualnego postępowania karnego.

### Zakres i wyzwalacz

Wszystkie scenariusze ransomware. Procedura jest wspólna – plany scenariuszowe odwołują się do niej.

**Wyzwalacz:** deklaracja incydentu K1–K3; zawsze przed reinstalacją, odtworzeniem lub czyszczeniem zasobu.

### Warunki wstępne

- Zestaw narzędzi śledczych (pozyskiwanie pamięci, triaż, obrazowanie) dostępny offline.
- Zaszyfrowany nośnik lub magazyn z blokadą zapisu (WORM / Object Lock) o odpowiedniej pojemności.
- Wzór karty łańcucha dowodowego.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Plan zbierania dowodów | Analityk informatyki śledczej | Kierownik incydentu | Zespół reagowania (CSIRT) | Dział prawny / compliance |
| Pozyskanie pamięci i artefaktów | Analityk informatyki śledczej, Zespół reagowania (CSIRT) | Kierownik incydentu | administratorzy | – |
| Eksport logów | SOC, Administrator sieci / NAC | Analityk informatyki śledczej | – | Kierownik incydentu |
| Łańcuch dowodowy i przechowywanie | Analityk informatyki śledczej | Kierownik incydentu | Dział prawny / compliance | – |

### Kolejność ulotności

Zgodnie z RFC 3227 i NIST SP 800-86: rejestry i pamięć podręczna → pamięć RAM → stan sieci i procesów → pliki tymczasowe → dyski → logi zdalne i dane monitoringu → konfiguracja i topologia → nośniki archiwalne.

### Przebieg

#### 1 · Plan

1. **Analityk informatyki śledczej:** Sporządź plan zbierania: lista źródeł według priorytetu ulotności i znaczenia (pacjent zero, DC, serwery z notatką okupu, serwery kopii, systemy brzegowe).
   _Oczekiwany rezultat:_ Plan zbierania zatwierdzony przez KI
#### 2 · Pozyskanie

2. **Analityk informatyki śledczej:** Na hostach kluczowych pozyskaj pamięć RAM przed wyłączeniem lub restartem (EDR live response lub narzędzie z nośnika zewnętrznego).

   ```
   winpmem_mini_x64.exe E:\<nr>\<host>-mem.raw
   ```
   _Oczekiwany rezultat:_ Obraz pamięci z sumą SHA-256
3. **Analityk informatyki śledczej:** Wykonaj triaż artefaktów (rejestr, dzienniki, prefetch, Amcache, zadania, usługi, historia PowerShell).

   ```
   kape.exe --tsource C: --tdest E:\<nr>\<host> --target !SANS_Triage --vhdx <host>
   ```
   _Oczekiwany rezultat:_ Kontener VHDX z artefaktami
4. **Analityk informatyki śledczej:** Dla maszyn wirtualnych wykonaj migawkę z pamięcią i skopiuj pliki VM na nośnik dowodowy; dla fizycznych – obraz bitowy dysku z blokadą zapisu.
   _Oczekiwany rezultat:_ Obrazy z sumami kontrolnymi
#### 3 · Logi

5. **SOC:** Wyeksportuj logi SIEM i EDR za okres od T0 minus 30 dni według IN-INF-3.1.
   _Oczekiwany rezultat:_ Eksporty logów z sumami
6. **Administrator sieci / NAC:** Wyeksportuj logi zapór, VPN, proxy, DNS, NAC i kontrolerów sieci bezprzewodowej; wyłącz automatyczną rotację, jeśli grozi nadpisaniem.
   _Oczekiwany rezultat:_ Eksporty logów sieciowych
#### 4 · Artefakty

7. **Analityk informatyki śledczej:** Zabezpiecz próbki złośliwego oprogramowania i notatki okupu w archiwum zaszyfrowanym hasłem; nie uruchamiaj ich poza laboratorium.
   _Oczekiwany rezultat:_ Próbki w archiwum, skróty w rejestrze IoC
#### 5 · Integralność

8. **Analityk informatyki śledczej:** Policz sumy SHA-256 wszystkich dowodów i wypełnij kartę łańcucha dowodowego (co, kto, kiedy, skąd, gdzie przechowywane, cel).

   ```
   Get-FileHash -Algorithm SHA256 E:\<nr>\* | Export-Csv E:\<nr>\hashes.csv -NoTypeInformation
   ```
   _Oczekiwany rezultat:_ Karta łańcucha dowodowego
9. **Analityk informatyki śledczej:** Umieść dowody w magazynie z blokadą zapisu i kontrolą dostępu; analizuj wyłącznie kopie robocze.
   _Oczekiwany rezultat:_ Dowody w magazynie WORM
#### 6 · Przekazanie

10. **Dział prawny / compliance:** Na żądanie organów ścigania przekaż kopie dowodów za protokołem; zachowaj dowody do zakończenia postępowań.
   _Oczekiwany rezultat:_ Protokół przekazania

### Kryteria wyjścia

- Dowody z kluczowych źródeł zabezpieczone przed działaniami naprawczymi.
- Każdy dowód ma sumę kontrolną i wpis w łańcuchu dowodowym.
- KI potwierdził, że można przystąpić do czyszczenia lub odtwarzania zasobów.

### Zapisy (dowody wykonania)

Plan zbierania, rejestr dowodów z sumami SHA-256, karty łańcucha dowodowego, protokoły przekazania.

### Instrukcje i checklisty

- Instrukcja: **IN-INF-3.1 · Zebranie i zabezpieczenie logów SIEM / EDR** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.28
- ISO/IEC 27037 – IDENT
- ISO/IEC 27037 – COLL
- ISO/IEC 27037 – PRES
- NIST CSF 2.0 – RS.AN-06
- NIST CSF 2.0 – RS.AN-07
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.AN

---

## IN-INF-3.1 · Zebranie i zabezpieczenie logów SIEM / EDR

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze → PR-INF-3 · Zabezpieczenie materiału dowodowego

### Cel

Trwałe zabezpieczenie logów i telemetrii z SIEM i EDR za okres incydentu, zanim zostaną nadpisane, usunięte przez atakującego lub wygasną.

### Zastosowanie

Niezwłocznie po deklaracji incydentu K1–K2; zakres czasowy: od wstępnego T0 minus 30 dni do chwili bieżącej, uzupełniany po doprecyzowaniu T0.

### Wymagane uprawnienia i narzędzia

- Uprawnienia do eksportu w SIEM i EDR.
- Magazyn z blokadą zapisu (np. kontener z polityką niezmienności lub zasobnik z Object Lock).
- Narzędzie do liczenia sum kontrolnych.

### Środki ostrożności

- Eksportuj surowe dane, nie tylko wyniki zapytań analitycznych.
- Sprawdź limity eksportu i w razie potrzeby dziel zakres czasu.
- Zabezpiecz również logi samego SIEM (audyt dostępu), aby wykazać integralność.

### Kroki

#### 1 · Ochrona przed utratą

1. **SOC:** Przedłuż retencję w SIEM i EDR dla tabel kluczowych (zabezpieczenia, logowania, procesy, sieć) lub wstrzymaj ich usuwanie.
   _Oczekiwany rezultat:_ Retencja przedłużona
#### 2 · SIEM

2. **SOC:** Microsoft Sentinel: wyeksportuj tabele za okres incydentu (zapytanie z zakresem czasu, eksport do pliku lub do konta magazynu).

   ```
   Invoke-AzOperationalInsightsQuery -WorkspaceId <id> -Query "SecurityEvent | where TimeGenerated between (datetime(<od>) .. datetime(<do>))" | Select -Expand Results | Export-Csv E:\<nr>\SecurityEvent.csv
   ```
   _Oczekiwany rezultat:_ Pliki CSV/JSON dla każdej tabeli
3. **SOC:** Splunk: wyeksportuj zdarzenia z indeksów bezpieczeństwa przez REST API.

   ```
   curl -k -u <użytkownik> https://<splunk>:8089/services/search/jobs/export -d search="search index=<indeks> earliest=<od> latest=<do>" -d output_mode=json > E:\<nr>\<indeks>.json
   ```
   _Oczekiwany rezultat:_ Plik JSON dla każdego indeksu
#### 3 · EDR

4. **SOC:** EDR: pobierz pakiety dochodzeniowe i osie czasu hostów z zakresu; wyeksportuj alerty i incydenty z dowodami.
   _Oczekiwany rezultat:_ Pakiety i osie czasu
#### 4 · Logi lokalne

5. **Administratorzy:** Na kluczowych serwerach Windows wyeksportuj dzienniki lokalne (gdy nie trafiają w całości do SIEM).

   ```
   wevtutil epl Security E:\<nr>\<host>-Security.evtx
   wevtutil epl System E:\<nr>\<host>-System.evtx
   wevtutil epl "Microsoft-Windows-PowerShell/Operational" E:\<nr>\<host>-PowerShell.evtx
   ```
   _Oczekiwany rezultat:_ Pliki .evtx
6. **Administratorzy:** Na serwerach Linux zarchiwizuj logi systemowe i audytu.

   ```
   tar czf /mnt/dowody/<host>-logs.tgz /var/log && sha256sum /mnt/dowody/<host>-logs.tgz
   ```
   _Oczekiwany rezultat:_ Archiwum z sumą
#### 5 · Integralność

7. **SOC:** Policz sumy SHA-256 wszystkich plików eksportu i zapisz w rejestrze dowodów.

   ```
   Get-FileHash -Algorithm SHA256 E:\<nr>\* | Export-Csv E:\<nr>\hashes-logi.csv -NoTypeInformation
   ```
   _Oczekiwany rezultat:_ Rejestr sum kontrolnych
8. **SOC:** Przenieś eksporty do magazynu z blokadą zapisu i przekaż analitykowi informatyki śledczej z wpisem w łańcuchu dowodowym.
   _Oczekiwany rezultat:_ Wpis w łańcuchu dowodowym

### Weryfikacja wykonania

Dla każdego źródła z planu zbierania istnieje eksport z sumą kontrolną obejmujący pełny wymagany zakres czasu. Próbne odczytanie eksportu potwierdza kompletność.

### Wycofanie

Nie dotyczy. Przedłużenie retencji utrzymuje się do zakończenia postępowań.

### Zapisy

Lista eksportów z zakresem czasu, sumy SHA-256, wpisy w łańcuchu dowodowym.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.15
- ISO/IEC 27001:2022 – A.5.28
- ISO/IEC 27037 – COLL
- ISO/IEC 27037 – PRES
- NIST CSF 2.0 – RS.AN-07

---

## PR-INF-4 · Usunięcie zagrożenia i mechanizmów utrzymania dostępu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze

### Cel

Trwałe usunięcie atakującego ze środowiska: wszystkich kont, narzędzi, mechanizmów utrzymania dostępu i wektora wejścia – w jednej skoordynowanej operacji.

### Zakres i wyzwalacz

Całe środowisko objęte incydentem, w tym usługi chmurowe i dostęp dostawców.

**Wyzwalacz:** zakończenie analizy zakresu (ustalone T0, wektor wejścia, lista przejętych kont i hostów) i zabezpieczenie dowodów (PR-INF-3).

### Warunki wstępne

- Kompletna lista mechanizmów utrzymania dostępu z analizy.
- Gotowe obrazy lub nośniki do reinstalacji hostów.
- Uzgodnione okno operacji i przygotowany plan wycofania dla kluczowych usług.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Inwentaryzacja mechanizmów utrzymania dostępu | Zespół reagowania (CSIRT) | Kierownik incydentu | administratorzy | – |
| Plan operacji usunięcia | Zespół reagowania (CSIRT) | Kierownik incydentu | Kierownik odtwarzania | Zespół zarządzania kryzysowego |
| Reset poświadczeń i usunięcie kont | Administrator AD | Kierownik incydentu | Zespół reagowania (CSIRT) | Service desk |
| Reinstalacja / czyszczenie hostów | administratorzy | Kierownik odtwarzania | Zespół reagowania (CSIRT) | Właściciel procesu biznesowego |
| Usunięcie wektora wejścia | Administrator sieci / NAC, administratorzy | Kierownik incydentu | Dostawca | – |

### Mechanizmy utrzymania dostępu do sprawdzenia

- Konta lokalne i domenowe, członkostwa w grupach uprzywilejowanych, delegacje, SIDHistory, AdminSDHolder.
- Zadania zaplanowane, usługi, subskrypcje WMI, klucze Run/RunOnce, foldery autostartu.
- GPO i skrypty logowania w SYSVOL.
- Narzędzia zdalnego dostępu (RMM), tunele (ngrok, Cloudflared), web shelle.
- Klucze SSH i pliki authorized_keys, zadania cron.
- Aplikacje i uprawnienia OAuth w chmurze, reguły przekierowań poczty, dodatkowe metody MFA.
- Konta i klucze dostępowe w chmurze publicznej, sekrety w potokach CI/CD.
- Konfiguracje urządzeń brzegowych (konta lokalne, zmienione reguły NAT/VPN).

### Przebieg

#### 1 · Przygotowanie

1. **Zespół reagowania (CSIRT):** Sporządź pełną listę mechanizmów utrzymania dostępu i artefaktów atakującego na podstawie analizy i polowania na zagrożenia.
   _Oczekiwany rezultat:_ Lista mechanizmów z lokalizacją
2. **Zespół reagowania (CSIRT):** Przygotuj plan skoordynowanej operacji usunięcia: kolejność, wykonawcy, okno, punkty kontroli, plan wycofania.
   _Oczekiwany rezultat:_ Plan operacji zatwierdzony przez KI
#### 2 · Tożsamość

3. **Administrator AD:** W oknie operacji: wyłącz lub usuń konta utworzone przez atakującego, cofnij nieuprawnione członkostwa i delegacje.

   ```
   Get-ADUser -Filter {whenCreated -ge $T0} -Properties whenCreated | Select SamAccountName, whenCreated
   ```
   _Oczekiwany rezultat:_ Konta i grupy zgodne z bazą referencyjną
4. **Administrator AD:** Zresetuj hasła kont przejętych, uprzywilejowanych i serwisowych. Przy naruszeniu tier 0 – dwukrotny reset KRBTGT z odstępem na replikację i wygaśnięcie biletów (plan PL-AD).
   _Oczekiwany rezultat:_ Poświadczenia zmienione, rejestr resetów
5. **Administrator AD:** W chmurze: unieważnij sesje, usuń nieuprawnione aplikacje, zgody OAuth, metody MFA i reguły przekierowań poczty.

   ```
   Get-MgUserAuthenticationMethod -UserId <upn>
   ```
   _Oczekiwany rezultat:_ Brak nieuprawnionych metod i aplikacji
#### 3 · Hosty

6. **Administratorzy:** Hosty z potwierdzoną kompromitacją zainstaluj ponownie z obrazów wzorcowych zamiast je czyścić. Czyszczenie dopuszczalne tylko dla hostów bez uprawnień uprzywilejowanych, za zgodą IR.
   _Oczekiwany rezultat:_ Hosty odbudowane
7. **Administratorzy:** Usuń zadania, usługi, subskrypcje WMI, klucze autostartu, narzędzia RMM i web shelle z hostów, które nie są reinstalowane.

   ```
   Get-ScheduledTask | Where-Object { $_.Date -ge $T0 }
   ```
   _Oczekiwany rezultat:_ Brak artefaktów z listy
#### 4 · Wektor wejścia

8. **Administrator sieci / NAC:** Usuń wektor wejścia: poprawka lub wyłączenie podatnej usługi brzegowej, zamknięcie nieużywanego dostępu, MFA odporne na phishing dla VPN i dostępu zdalnego.
   _Oczekiwany rezultat:_ Wektor wejścia zamknięty
#### 5 · Detekcja

9. **Zespół reagowania (CSIRT):** Wdróż reguły detekcji dla IoC i TTP z incydentu w EDR, SIEM, IDS i na zaporach.
   _Oczekiwany rezultat:_ Reguły detekcji aktywne i przetestowane
10. **Zespół reagowania (CSIRT):** Przeprowadź polowanie na zagrożenia w całym środowisku przez co najmniej 72 h od operacji usunięcia.
   _Oczekiwany rezultat:_ Raport z polowania: brak aktywności
#### 6 · Potwierdzenie

11. **Kierownik incydentu:** Potwierdź usunięcie zagrożenia i zapisz decyzję w dzienniku; przekaż do PR-INF-5.
   _Oczekiwany rezultat:_ Wpis w dzienniku

### Kryteria wyjścia

- Wszystkie mechanizmy z listy usunięte, wektor wejścia zamknięty.
- Poświadczenia zmienione, detekcje wdrożone.
- 72 h polowania bez nowej aktywności.

### Zapisy (dowody wykonania)

Lista mechanizmów utrzymania dostępu ze statusem, plan operacji, rejestr resetów poświadczeń, raport z polowania.

### Instrukcje i checklisty

_Brak dokumentów podrzędnych._

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.8.8
- ISO/IEC 27001:2022 – A.8.2
- ISO/IEC 27035 – RESPOND
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RS.MI
- NIST CSF 2.0 – RS.MI-02
- NIST CSF 2.0 – RS.AN-03
- NIST SP 800-184 – STRAT

---

## PR-INF-5 · Weryfikacja bezpieczeństwa przed przywróceniem dostępu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze

### Cel

Potwierdzenie, że zasoby są czyste i zabezpieczone, zanim zostaną zdjęte izolacje i przywrócony dostęp użytkowników; formalne zamknięcie technicznej obsługi incydentu.

### Zakres i wyzwalacz

Wszystkie zasoby i strefy objęte izolacją w PR-INF-2.

**Wyzwalacz:** zakończenie PR-INF-4 i wniosek właściciela procesu o przywrócenie dostępu.

### Warunki wstępne

- Raport z polowania na zagrożenia bez nowej aktywności.
- Lista tymczasowych reguł izolacji z PR-INF-2.
- Kryteria bramki DG5 (polityka, rozdz. 9).

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Skan i przegląd telemetrii | Zespół reagowania (CSIRT), SOC | Kierownik incydentu | – | – |
| Przegląd tożsamości | Administrator AD | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Decyzja DG5 dla strefy | Kierownik incydentu | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |
| Zdejmowanie izolacji | Administrator sieci / NAC, SOC | Kierownik incydentu | Właściciel procesu biznesowego | Service desk |
| Zamknięcie incydentu | Kierownik incydentu | Kierownik incydentu | Zespół reagowania (CSIRT) | Zespół zarządzania kryzysowego, Zarząd |

### Bramka dopuszczenia

Bramka DG5 z polityki (kryteria dopuszczenia do produkcji) musi być spełniona w całości. Brak spełnienia któregokolwiek kryterium blokuje dopuszczenie – odstępstwo zatwierdza wyłącznie Kierownik incydentu wraz z właścicielem procesu i jest wpisywane do rejestru ryzyk.

### Przebieg

#### 1 · Czystość

1. **Zespół reagowania (CSIRT):** Wykonaj skan IoC i reguł YARA oraz pełny skan antywirusowy wszystkich hostów w zakresie.
   _Oczekiwany rezultat:_ Raport skanu: 0 wykryć
2. **SOC:** Przejrzyj telemetrię z ostatnich 72 h: brak połączeń do infrastruktury atakującego, brak użycia narzędzi z incydentu, brak anomalii logowań.
   _Oczekiwany rezultat:_ Notatka z przeglądu
#### 2 · Konfiguracja

3. **Administrator AD:** Porównaj konta, grupy uprzywilejowane, GPO i delegacje z bazą referencyjną.

   ```
   Get-ADGroupMember "Domain Admins" -Recursive | Select SamAccountName
   ```
   _Oczekiwany rezultat:_ Zgodność z bazą referencyjną
4. **Administratorzy:** Potwierdź instalację poprawek, zgodność z bazową konfiguracją bezpieczeństwa i działanie EDR w trybie blokowania na każdym hoście.
   _Oczekiwany rezultat:_ Raport zgodności
#### 3 · Decyzja

5. **Kierownik incydentu:** Wypełnij CL-INF-5.1 dla każdej strefy i podejmij decyzję DG5.
   _Oczekiwany rezultat:_ CL-INF-5.1, wpis DG5
#### 4 · Przywracanie dostępu

6. **Administrator sieci / NAC:** Zdejmuj izolację strefa po strefie (najpierw zasoby krytyczne dla procesów o najwyższym priorytecie), z monitorowaniem SOC przez co najmniej 1 h po każdej zmianie.
   _Oczekiwany rezultat:_ Rejestr zdjętych reguł z godzinami
7. **Service desk:** Przywróć dostęp użytkownikom; przy zmianie haseł zastosuj weryfikację tożsamości poza kanałem e-mail.
   _Oczekiwany rezultat:_ Dostęp przywrócony
#### 5 · Zamknięcie

8. **SOC:** Utrzymaj wzmożony monitoring przez 30 dni z regułami dla IoC i TTP z incydentu.
   _Oczekiwany rezultat:_ Monitoring aktywny do daty
9. **Kierownik incydentu:** Wypełnij CL-INF-5.2, zamknij techniczną obsługę incydentu, przekaż raport końcowy i zwołaj przegląd poincydentalny w ciągu 10 dni roboczych.
   _Oczekiwany rezultat:_ CL-INF-5.2, raport końcowy

### Kryteria wyjścia

- DG5 spełniona dla każdej strefy, izolacje zdjęte, dostęp przywrócony.
- Monitoring wzmożony zaplanowany, raport końcowy przekazany.
- Działania korygujące wpisane z właścicielami i terminami.

### Zapisy (dowody wykonania)

Raporty skanów, CL-INF-5.1 dla stref, wpisy DG5, rejestr zdjętych reguł, CL-INF-5.2, raport końcowy, protokół przeglądu poincydentalnego.

### Instrukcje i checklisty

- Instrukcja: **CL-INF-5.1 · Weryfikacja bezpieczeństwa zasobów** (v0.1, projekt)
- Instrukcja: **CL-INF-5.2 · Zamknięcie technicznej obsługi incydentu** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.5.27
- ISO/IEC 27035 – LEARN
- NIST SP 800-61 Rev. 3 / CSF 2.0 – RC.RP
- NIST CSF 2.0 – RC.RP-05
- NIST CSF 2.0 – RC.RP-06
- NIST CSF 2.0 – RC.CO-03
- NIST SP 800-184 – STRAT
- NIST SP 800-184 – METR
- PCI DSS v4.0.1 – 12.10.6

---

## CL-INF-5.1 · Weryfikacja bezpieczeństwa zasobów

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze → PR-INF-5 · Weryfikacja bezpieczeństwa przed przywróceniem dostępu

### Zastosowanie

Dla każdej strefy lub grupy zasobów przed zdjęciem izolacji (DG5).

### Lista kontrolna

1. **Zespół reagowania (CSIRT):** Skan IoC/YARA bez wykryć
   _Oczekiwany rezultat:_ Raport skanu
2. **Zespół reagowania (CSIRT):** Skan antywirusowy pełny bez wykryć
3. **SOC:** Telemetria 72 h bez aktywności atakującego
4. **Administrator AD:** Konta, grupy, GPO i delegacje zgodne z bazą referencyjną
5. **Administratorzy:** Poprawki krytyczne zainstalowane
6. **Administratorzy:** Konfiguracja zgodna z bazową konfiguracją bezpieczeństwa
7. **Administratorzy:** EDR aktywny w trybie blokowania, logi w SIEM
8. **Zespół reagowania (CSIRT):** Reguły detekcji IoC i TTP z incydentu aktywne
9. **Administrator AD:** Poświadczenia objęte incydentem zmienione
10. **Właściciel procesu biznesowego:** Właściciel procesu zaakceptował zdjęcie izolacji

### Kryteria zaliczenia

Wszystkie punkty spełnione. Bramka DG5 bez odstępstw.

### Zatwierdzenie

Zatwierdzają: Kierownik incydentu i właściciel procesu (data, godzina, strefa).

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.8.8
- ISO/IEC 27001:2022 – A.8.9

---

## CL-INF-5.2 · Zamknięcie technicznej obsługi incydentu

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Kierownik SOC | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze → PR-INF-5 · Weryfikacja bezpieczeństwa przed przywróceniem dostępu

### Zastosowanie

Kierownik incydentu przed zamknięciem incydentu (DG6).

### Lista kontrolna

1. **Kierownik incydentu:** Wszystkie strefy dopuszczone (DG5), izolacje zdjęte
   _Oczekiwany rezultat:_ Wpisy DG5
2. **Kierownik incydentu:** Przyczyna źródłowa i wektor wejścia ustalone i usunięte
3. **Kierownik incydentu:** T0 ostatecznie ustalone, oś czasu kompletna
4. **Analityk informatyki śledczej:** Dowody zabezpieczone, łańcuch dowodowy kompletny
5. **Dział prawny / compliance:** Zgłoszenia regulacyjne wysłane, raporty końcowe w terminach
6. **Inspektor ochrony danych:** Naruszenia ochrony danych udokumentowane w rejestrze
7. **SOC:** Wzmożony monitoring 30 dni zaplanowany
8. **Kierownik incydentu:** Metryki: czas wykrycia, do izolacji, do odtworzenia vs RTO, utrata danych vs RPO
   _Oczekiwany rezultat:_ Tabela metryk
9. **Kierownik incydentu:** Raport końcowy przekazany ZZK i Zarządowi
10. **Kierownik incydentu:** Przegląd poincydentalny zaplanowany w 10 dni roboczych
11. **Kierownik incydentu:** Działania korygujące z właścicielami i terminami wpisane
12. **Kierownik incydentu:** Aktualizacja planów i procedur zlecona

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Zatwierdza: Kierownik incydentu; do wiadomości: przewodniczący ZZK.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-06
- ISO/IEC 27001:2022 – A.5.27
- ISO/IEC 27035 – LEARN
- NIST SP 800-184 – METR
- ISO 22301:2019 – 10.1

---

## PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Plan | techniczna | 0.1 | projekt | Dyrektor IT | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware

### 1. Cel i zakres

Plan opisuje reakcję na szyfrowanie danych na serwerach plików i urządzeniach NAS Rossmann Polska – zwykle przez zainfekowane stanowisko z dostępem do udziałów sieciowych (SMB/NFS).

### 2. Scenariusz

Zainfekowana stacja lub serwer z uprawnieniami zapisu szyfruje pliki w zmapowanych udziałach. Na serwerze plików mogą nie działać żadne złośliwe procesy – szyfrowanie odbywa się zdalnie przez sesję SMB. Równolegle mogą być kopiowane dane (eksfiltracja).

### 2a. Specyfika Rossmann Polska

Udziały działów centrali (handel, marketing, finanse, HR) oraz udziały operacyjne centrów dystrybucyjnych. Dane HR i rekrutacyjne zawierają dane osobowe – priorytet przy ocenie RODO. Technologię NAS przyjęto jako założenie.

### 3. Sygnały wykrycia i wskaźniki naruszenia

- Gwałtowny wzrost operacji zmiany nazw i zapisu plików z jednej sesji lub konta.
- Nowe rozszerzenia plików, notatki okupu w katalogach, pliki-pułapki (honeypot) zmodyfikowane.
- Alerty ochrony przed ransomware na NAS (np. analiza entropii, ONTAP ARP), FSRM, EDR.
- Zgłoszenia użytkowników o braku dostępu do plików.

### 4. Zasoby objęte planem

| System | Technologie | Wymagane RTO / RPO | Osiągalne RTO / RPO | Kopie | Ośrodek zapasowy |
|---|---|---|---|---|---|
| Serwery plików i NAS (udziały centrali i centrów dystrybucyjnych) | NetApp ONTAP | 2 d / 4 h | 8 h / 1 h | Migawki co 1 h, kopia dzienna | Replikacja SnapMirror |

### 5. Wpływ na procesy biznesowe i cele odtworzenia

| Proces | Właściciel | Krytyczność | MTPD | RTO | RPO | MBCO |
|---|---|---|---|---|---|---|
| Zakupy i zarządzanie zapasami | Dyrektor handlowy | 4 | 5 d | 2 d | 4 h | Zamówienia u kluczowych dostawców (ręcznie / EDI) |
| Finanse i płatności do dostawców | Dyrektor finansowy | 4 | 7 d | 3 d | 24 h | Płatności krytyczne (wynagrodzenia, podatki, kluczowi dostawcy) |

### 6. Kryteria aktywacji i klasyfikacja

Aktywacja po potwierdzeniu szyfrowania danych w udziale. Kategoria K2, K1 gdy dotyczy danych krytycznych procesów, danych osobowych w dużej skali lub kilku serwerów.

### 7. Organizacja reagowania

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Ocena zakresu zaszyfrowania | Administrator pamięci masowej, Zespół reagowania (CSIRT) | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |
| Izolacja serwera i udziałów | Administrator pamięci masowej, Administrator sieci / NAC, SOC | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |
| Odtworzenie danych i uprawnień | Administrator pamięci masowej, Administrator kopii zapasowych | Kierownik odtwarzania | Właściciel procesu biznesowego | Kierownik incydentu |
| Weryfikacja integralności | Administrator pamięci masowej, Właściciel procesu biznesowego | Kierownik odtwarzania | Zespół reagowania (CSIRT) | Kierownik incydentu |
| Przywrócenie dostępu | Administrator pamięci masowej | Kierownik incydentu | Właściciel procesu biznesowego | Service desk |

### 8. Przebieg reagowania

| Faza | Cel | Procedura | Cel czasowy |
|---|---|---|---|
| Ocena | źródło szyfrowania, zakres danych, migawki | PR-NAS-1 | 1 h |
| Izolacja | zatrzymanie szyfrowania i odcięcie źródła | PR-NAS-2 | 15 min od wykrycia |
| Odtworzenie | dane i uprawnienia z czystego punktu | PR-NAS-3 | według RTO procesów |
| Weryfikacja | integralność danych i uprawnień | PR-NAS-4 | przed udostępnieniem |
| Dostęp | stopniowe udostępnienie użytkownikom | PR-NAS-5 | po DG5 |

### 9. Ciągłość działania w trakcie incydentu

Właściciele procesów wskazują zbiory niezbędne do pracy w trybie awaryjnym; w pierwszej kolejności odtwarza się je do udziału tylko do odczytu. Użytkownicy pracują na kopiach lokalnych tylko za zgodą KI.

### 10. Punkty decyzyjne

- DG1: zamknięcie wszystkich sesji i ustawienie udziałów tylko do odczytu czy odłączenie serwera od sieci.
- DG2: odtworzenie z migawek NAS (szybko) czy z kopii zapasowych (gdy migawki niepewne).
- Zakres odtworzenia: całe woluminy czy tylko zaszyfrowane pliki (zachowanie zmian po T0).
- Ocena naruszenia RODO dla zbiorów zawierających dane osobowe.

### 11. Komunikacja i obowiązki raportowe

Komunikację wewnętrzną prowadzi się kanałem pozapasmowym. Komunikaty do pracowników, klientów, dostawców i mediów zatwierdza przewodniczący ZZK. Kierownik incydentu raportuje stan co 2 h w fazie ograniczania i co 4 h w fazie odtwarzania (CSF RC.CO-03). Użytkownicy otrzymują informację o utracie zmian z okresu między punktem odtworzenia a incydentem.

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

### 12. Kryteria zakończenia

- Źródło szyfrowania zidentyfikowane i odizolowane.
- Dane odtworzone, integralność i uprawnienia zweryfikowane.
- Migawki niezmienne i ochrona przed ransomware aktywne.
- Dostęp przywrócony, utracone zmiany udokumentowane.

### 13. Błędy, których należy unikać

- Przywracanie danych, zanim zatrzymano źródło szyfrowania – nowe dane zostaną ponownie zaszyfrowane.
- Usunięcie migawek w celu zwolnienia miejsca.
- Przywrócenie danych bez uprawnień NTFS/ACL (nadmierny dostęp).
- Brak oceny, czy z udziału skopiowano dane osobowe.

### 14. Procedury, instrukcje i checklisty

- Procedura: **PR-NAS-1 · Ocena zakresu zaszyfrowania danych** (v0.1, projekt)
- Procedura: **PR-NAS-2 · Izolacja serwera i udziałów plikowych** (v0.1, projekt)
- Procedura: **PR-NAS-3 · Odtworzenie danych i udziałów plikowych** (v0.1, projekt)
- Procedura: **PR-NAS-4 · Weryfikacja integralności odtworzonych danych** (v0.1, projekt)
- Procedura: **PR-NAS-5 · Przywrócenie dostępu użytkowników do udziałów** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.8.13
- ISO/IEC 27001:2022 – A.5.15
- NIST CSF 2.0 – RS.MI-01
- NIST CSF 2.0 – RC.RP-02
- NIST CSF 2.0 – RC.RP-05
- RODO – rozporządzenie (UE) 2016/679 – art. 32(1)(c)
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(c)

---

## PR-NAS-1 · Ocena zakresu zaszyfrowania danych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS

### Cel

Ustalenie źródła szyfrowania (konto, host, sesja), zakresu zaszyfrowanych danych, dostępnych migawek i kopii oraz rodzaju danych (w tym osobowych), aby wybrać metodę odtworzenia i ocenić obowiązki.

### Zakres i wyzwalacz

Serwery plików Windows, NAS (np. NetApp ONTAP), przestrzenie nazw DFS, udziały SMB/NFS w centrali, centrach dystrybucyjnych i placówkach.

**Wyzwalacz:** alert ochrony przed ransomware, FSRM lub EDR, zgłoszenia użytkowników o niedostępnych plikach, notatki okupu w udziałach.

### Warunki wstępne

- Wykaz udziałów z właścicielami danych i klasyfikacją informacji.
- Dostęp do audytu dostępu do plików (zdarzenia 5145 lub audyt NAS).

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Identyfikacja źródła szyfrowania | Administrator pamięci masowej, SOC | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Zakres danych i migawki | Administrator pamięci masowej | Kierownik odtwarzania | Właściciel procesu biznesowego | Kierownik incydentu |
| Klasyfikacja danych i ocena RODO | Właściciel procesu biznesowego, Inspektor ochrony danych | Kierownik incydentu | Dział prawny / compliance | – |

### Przebieg

#### 1 · Źródło

1. **Administrator pamięci masowej:** Ustal aktywne sesje i otwarte pliki z największą liczbą operacji – wskażą konto i host szyfrujący.

   ```
   Get-SmbOpenFile | Group-Object ClientComputerName, ClientUserName | Sort Count -Descending | Select -First 10 Count, Name
   ```
   _Oczekiwany rezultat:_ Podejrzane konto i host
2. **Administrator pamięci masowej:** NAS NetApp: sprawdź raport ochrony przed ransomware i aktywne sesje CIFS.

   ```
   security anti-ransomware volume show -vserver <svm>
   vserver cifs session show -vserver <svm> -fields address,windows-user,files
   ```
   _Oczekiwany rezultat:_ Wolumeny z podejrzeniem ataku, sesje
3. **SOC:** Potwierdź źródło w logach (zdarzenia 5145, EDR) i przekaż host oraz konto do izolacji (PR-NAS-2, IN-INF-2.1, IN-INF-2.3).
   _Oczekiwany rezultat:_ Źródło potwierdzone
#### 2 · Zakres

4. **Administrator pamięci masowej:** Oszacuj zakres: udziały i katalogi z zaszyfrowanymi plikami, liczba plików, czas pierwszej i ostatniej zmiany.

   ```
   Get-ChildItem \\<serwer>\<udział> -Recurse -File -Filter *.<rozszerzenie> | Measure-Object
   Get-ChildItem \\<serwer>\<udział> -Recurse -File -Filter *.<rozszerzenie> | Sort LastWriteTime | Select -First 1 -Last 1 FullName, LastWriteTime
   ```
   _Oczekiwany rezultat:_ Zakres i okno czasowe szyfrowania
#### 3 · Źródła odtworzenia

5. **Administrator pamięci masowej:** Sprawdź dostępne migawki i ich czas względem okna szyfrowania.

   ```
   vssadmin list shadows /for=<wolumin>:
   volume snapshot show -vserver <svm> -volume <vol> -fields create-time
   ```
   _Oczekiwany rezultat:_ Migawki sprzed szyfrowania
6. **Administrator kopii zapasowych:** Wskaż punkty kopii dla zaszyfrowanych udziałów (PR-BKP-1).
   _Oczekiwany rezultat:_ Punkty kopii
#### 4 · Dane i obowiązki

7. **Właściciel procesu biznesowego:** Określ rodzaj danych w udziałach (osobowe, finansowe, tajemnica przedsiębiorstwa) i ich znaczenie dla procesów.
   _Oczekiwany rezultat:_ Klasyfikacja danych
8. **Inspektor ochrony danych:** Oceń ryzyko naruszenia ochrony danych osobowych (utrata dostępności, możliwa eksfiltracja).
   _Oczekiwany rezultat:_ Ocena RODO
#### 5 · Decyzja

9. **Kierownik incydentu:** Wypełnij CL-NAS-1 i zdecyduj o metodzie odtworzenia (migawki / kopie) – DG2.
   _Oczekiwany rezultat:_ CL-NAS-1, wpis DG2

### Kryteria wyjścia

- Źródło szyfrowania wskazane i przekazane do izolacji.
- Zakres danych i okno czasowe znane, źródło odtworzenia wybrane.
- Ocena RODO wykonana.

### Zapisy (dowody wykonania)

Lista sesji i źródeł, zestawienie zakresu, lista migawek i kopii, ocena RODO, CL-NAS-1.

### Instrukcje i checklisty

- Instrukcja: **CL-NAS-1 · Ocena zakresu zaszyfrowania** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.25
- NIST CSF 2.0 – RS.AN-03
- NIST CSF 2.0 – RS.AN-08
- RODO – rozporządzenie (UE) 2016/679 – art. 33

---

## CL-NAS-1 · Ocena zakresu zaszyfrowania

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS → PR-NAS-1 · Ocena zakresu zaszyfrowania danych

### Zastosowanie

Podsumowanie PR-NAS-1.

### Lista kontrolna

1. **Administrator pamięci masowej:** Konto i host źródłowy szyfrowania wskazane
2. **Administrator pamięci masowej:** Udziały i katalogi z zaszyfrowanymi plikami zidentyfikowane
3. **Administrator pamięci masowej:** Liczba plików i okno czasowe szyfrowania ustalone
4. **Administrator pamięci masowej:** Migawki sprzed szyfrowania dostępne
5. **Administrator kopii zapasowych:** Punkty kopii dla udziałów wskazane
6. **Właściciel procesu biznesowego:** Klasyfikacja danych w udziałach określona
7. **Inspektor ochrony danych:** Ocena naruszenia ochrony danych wykonana
8. **Kierownik incydentu:** Metoda odtworzenia wybrana (DG2)

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator pamięci masowej. Zatwierdził: Kierownik incydentu.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.AN-08

---

## PR-NAS-2 · Izolacja serwera i udziałów plikowych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS

### Cel

Natychmiastowe zatrzymanie szyfrowania i ochrona migawek oraz niezaszyfrowanych danych przed dalszym uszkodzeniem.

### Zakres i wyzwalacz

Serwery plików i NAS z udziałami objętymi szyfrowaniem oraz serwery, z którymi współdzielą uprawnienia.

**Wyzwalacz:** potwierdzenie szyfrowania w udziale – bez czekania na pełną analizę (cel: 15 minut).

### Warunki wstępne

- Dostęp administracyjny do serwera plików / NAS z PAW.
- Uprawnienia do NAC i zapór.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Zatrzymanie sesji | Administrator pamięci masowej | Kierownik incydentu | SOC | – |
| Izolacja serwera / NAS | Administrator pamięci masowej, Administrator sieci / NAC | Kierownik incydentu | Właściciel procesu biznesowego | Service desk |
| Ograniczenie w NAC | Administrator sieci / NAC | Kierownik incydentu | Administrator pamięci masowej | – |
| Izolacja źródła szyfrowania | SOC, Administrator AD | Kierownik incydentu | – | – |

### Przebieg

#### 1 · Zatrzymanie

1. **Administrator pamięci masowej:** Zatrzymaj szkodliwe sesje i zablokuj konto szyfrujące na udziałach według IN-NAS-2.1.
   _Oczekiwany rezultat:_ Sesje zamknięte
2. **SOC:** Odizoluj host źródłowy w EDR i zablokuj konto (IN-INF-2.1, IN-INF-2.3).
   _Oczekiwany rezultat:_ Źródło odizolowane
#### 2 · Izolacja

3. **Administrator pamięci masowej:** Odizoluj serwer plików lub NAS według IN-NAS-2.2 (udziały tylko do odczytu albo zatrzymanie usługi SMB).
   _Oczekiwany rezultat:_ Brak zapisu do udziałów
4. **Administrator sieci / NAC:** Ogranicz dostęp do segmentu serwera plików w NAC według IN-NAS-2.3.
   _Oczekiwany rezultat:_ Segment ograniczony
#### 3 · Ochrona migawek

5. **Administrator pamięci masowej:** Zablokuj migawki przed usunięciem (migawki niezmienne lub wydłużona retencja) i wstrzymaj harmonogram usuwania migawek.
   _Oczekiwany rezultat:_ Migawki chronione
#### 4 · Kontrola

6. **Administrator pamięci masowej:** Wypełnij CL-NAS-2 i poinformuj service desk o niedostępności udziałów.
   _Oczekiwany rezultat:_ CL-NAS-2

### Kryteria wyjścia

- Szyfrowanie zatrzymane, liczba zaszyfrowanych plików nie rośnie.
- Migawki chronione, źródło odizolowane.

### Zapisy (dowody wykonania)

Rejestr zamkniętych sesji i blokad, konfiguracja izolacji, CL-NAS-2.

### Instrukcje i checklisty

- Instrukcja: **CL-NAS-2 · Izolacja serwera i udziałów** (v0.1, projekt)
- Instrukcja: **IN-NAS-2.1 · Zatrzymanie szkodliwych sesji** (v0.1, projekt)
- Instrukcja: **IN-NAS-2.2 · Izolacja serwera plików lub NAS** (v0.1, projekt)
- Instrukcja: **IN-NAS-2.3 · Ograniczenie dostępu do segmentu serwera plików lub NAS w NAC** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.8.22
- NIST CSF 2.0 – RS.MI-01

---

## CL-NAS-2 · Izolacja serwera i udziałów

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS → PR-NAS-2 · Izolacja serwera i udziałów plikowych

### Zastosowanie

Kontrola po PR-NAS-2.

### Lista kontrolna

1. **Administrator pamięci masowej:** Lista sesji i otwartych plików zapisana
2. **Administrator pamięci masowej:** Sesje źródła zamknięte, konto zablokowane na udziałach
3. **SOC:** Host źródłowy odizolowany w EDR
4. **Administrator AD:** Konto źródłowe zablokowane w AD
5. **Administrator pamięci masowej:** Udziały tylko do odczytu lub usługa zatrzymana
6. **Administrator sieci / NAC:** Segment serwerów plików ograniczony w NAC
7. **Administrator pamięci masowej:** Migawki chronione przed usunięciem
8. **Administrator pamięci masowej:** Liczba zaszyfrowanych plików nie rośnie

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator pamięci masowej. Zatwierdził: Kierownik incydentu.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.MI-01

---

## IN-NAS-2.1 · Zatrzymanie szkodliwych sesji

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS → PR-NAS-2 · Izolacja serwera i udziałów plikowych

### Cel

Natychmiastowe przerwanie sesji SMB, przez które trwa szyfrowanie, i zablokowanie ich ponownego nawiązania.

### Zastosowanie

Pierwsza czynność po potwierdzeniu szyfrowania udziału. Przykłady dla Windows Server i NetApp ONTAP.

### Wymagane uprawnienia i narzędzia

Uprawnienia administratora serwera plików lub SVM, PowerShell z modułem SmbShare, dostęp CLI do ONTAP.

### Środki ostrożności

- Zamknięcie sesji bez blokady konta pozwoli na natychmiastowe ponowne połączenie.
- Zapisz listę sesji przed zamknięciem (dowód).

### Kroki

#### 1 · Dowód

1. **Administrator pamięci masowej:** Zapisz listę sesji i otwartych plików (dowód).

   ```
   Get-SmbSession | Export-Csv E:\<nr>\smb-sessions.csv -NoTypeInformation
   Get-SmbOpenFile | Export-Csv E:\<nr>\smb-openfiles.csv -NoTypeInformation
   ```
   _Oczekiwany rezultat:_ Pliki CSV
#### 2 · Blokada

2. **Administrator pamięci masowej:** Zablokuj konto szyfrujące na udziałach (do czasu blokady w AD).

   ```
   Block-SmbShareAccess -Name <udział> -AccountName <DOMENA\konto> -Force
   ```
   _Oczekiwany rezultat:_ Konto z odmową dostępu
#### 3 · Zamknięcie sesji

3. **Administrator pamięci masowej:** Windows: zamknij sesje konta lub hosta źródłowego.

   ```
   Close-SmbSession -ClientUserName <DOMENA\konto> -Force
   Close-SmbSession -ClientComputerName <adres-IP> -Force
   ```
   _Oczekiwany rezultat:_ Brak sesji źródła
4. **Administrator pamięci masowej:** NetApp ONTAP: zamknij sesje CIFS źródła.

   ```
   vserver cifs session show -vserver <svm> -windows-user <DOMENA\konto>
   vserver cifs session close -vserver <svm> -session-id <id>
   ```
   _Oczekiwany rezultat:_ Sesje zamknięte
#### 4 · Wariant awaryjny

5. **Administrator pamięci masowej:** Jeśli źródeł jest wiele lub nie da się ich ustalić – zamknij wszystkie sesje i przejdź do izolacji serwera (IN-NAS-2.2).

   ```
   Get-SmbSession | Close-SmbSession -Force
   ```
   _Oczekiwany rezultat:_ Brak sesji
#### 5 · Kontrola

6. **Administrator pamięci masowej:** Obserwuj przez 5 minut liczbę nowych zaszyfrowanych plików.
   _Oczekiwany rezultat:_ Liczba nie rośnie

### Weryfikacja wykonania

Brak sesji konta i hosta źródłowego; brak nowych plików z rozszerzeniem ransomware.

### Wycofanie

`Unblock-SmbShareAccess -Name <udział> -AccountName <konto> -Force` po DG5 i odblokowaniu konta.

### Zapisy

Eksport sesji i plików, lista blokad.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.MI-01

---

## IN-NAS-2.2 · Izolacja serwera plików lub NAS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS → PR-NAS-2 · Izolacja serwera i udziałów plikowych

### Cel

Uniemożliwienie zapisu do udziałów i ochrona danych oraz migawek do czasu odtworzenia.

### Zastosowanie

Po zatrzymaniu sesji (IN-NAS-2.1) lub zamiast niego, gdy źródeł nie da się ustalić.

### Wymagane uprawnienia i narzędzia

Uprawnienia administratora serwera plików / SVM, dostęp do hiperwizora lub przełącznika.

### Środki ostrożności

- Zatrzymanie usługi SMB odcina wszystkich użytkowników – uzgodnij z DG1.
- Nie wyłączaj serwera i nie usuwaj migawek.

### Kroki

#### 1 · Udziały

1. **Administrator pamięci masowej:** Wariant A (łagodny) – Windows: ustaw udziały tylko do odczytu dla wszystkich (zachowaj eksport uprawnień).

   ```
   Get-SmbShare -Special $false | ForEach-Object { Get-SmbShareAccess -Name $_.Name } | Export-Csv E:\<nr>\share-acl.csv -NoTypeInformation
   Grant-SmbShareAccess -Name <udział> -AccountName "Everyone" -AccessRight Read -Force
   Revoke-SmbShareAccess -Name <udział> -AccountName "Authenticated Users" -Force
   ```
   _Oczekiwany rezultat:_ Udział tylko do odczytu
2. **Administrator pamięci masowej:** Wariant A – NetApp: ustaw uprawnienie odczytu na poziomie udziału.

   ```
   vserver cifs share access-control modify -vserver <svm> -share <udział> -user-or-group Everyone -permission Read
   ```
   _Oczekiwany rezultat:_ Udział tylko do odczytu
#### 2 · Usługa

3. **Administrator pamięci masowej:** Wariant B (pełny) – zatrzymaj usługę udostępniania plików.

   ```
   Stop-Service LanmanServer -Force
   vserver cifs stop -vserver <svm>
   ```
   _Oczekiwany rezultat:_ Usługa zatrzymana
#### 3 · Sieć

4. **Administrator pamięci masowej:** Wariant C – odłącz serwer od sieci (karta VM lub port przełącznika), gdy na serwerze działa złośliwy proces.

   ```
   Get-VM "<serwer>" | Get-NetworkAdapter | Set-NetworkAdapter -Connected:$false -Confirm:$false
   ```
   _Oczekiwany rezultat:_ Serwer bez sieci
#### 4 · Migawki

5. **Administrator pamięci masowej:** Wstrzymaj harmonogram migawek i ich usuwanie.

   ```
   volume snapshot policy show -vserver <svm>
   ```
   _Oczekiwany rezultat:_ Migawki chronione
#### 5 · EDR

6. **SOC:** Jeśli na serwerze działa EDR – zastosuj izolację (IN-INF-2.1) przy wariancie C.
   _Oczekiwany rezultat:_ Status: odizolowany

### Weryfikacja wykonania

Próba zapisu pliku testowego do udziału kończy się odmową; liczba zaszyfrowanych plików nie rośnie.

### Wycofanie

Odtworzenie uprawnień udziałów z eksportu (IN-NAS-5.1), uruchomienie usługi (`Start-Service LanmanServer`, `vserver cifs start`).

### Zapisy

Eksport uprawnień udziałów, wybrany wariant i godzina.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.MI-01
- ISO/IEC 27001:2022 – A.8.22

---

## IN-NAS-2.3 · Ograniczenie dostępu do segmentu serwera plików lub NAS w NAC

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS → PR-NAS-2 · Izolacja serwera i udziałów plikowych

### Cel

Odcięcie hostów potencjalnie zainfekowanych od segmentu serwerów plików przy zachowaniu dostępu administracyjnego.

### Zastosowanie

Izolacja serwera i udziałów (PR-NAS-2), szczególnie gdy liczba źródeł szyfrowania jest nieznana.

### Wymagane uprawnienia i narzędzia

Uprawnienia do NAC i zapór; lista adresów PAW i serwerów kopii.

### Środki ostrożności

Pozostaw dostęp serwera kopii do NAS, jeśli jest potrzebny do odtwarzania.

### Kroki

#### 1 · NAC

1. **Administrator sieci / NAC:** Utwórz w NAC profil autoryzacji „PLIKI-ZABLOKOWANE” z dACL blokującym SMB i NFS do podsieci serwerów plików dla segmentów użytkowników.

   ```
   deny tcp any <podsieć-plików> eq 445
   deny tcp any <podsieć-plików> eq 139
   deny tcp any <podsieć-plików> eq 2049
   permit ip any any
   ```
   _Oczekiwany rezultat:_ Profil utworzony
2. **Administrator sieci / NAC:** Przypisz profil segmentom stacji roboczych (zmiana reguły autoryzacji) i wymuś CoA.
   _Oczekiwany rezultat:_ Sesje z nowym profilem
#### 2 · Zapora

3. **Administrator sieci / NAC:** Na zaporze wewnętrznej zezwól na ruch do serwerów plików tylko z PAW i serwerów kopii.
   _Oczekiwany rezultat:_ Reguły aktywne
#### 3 · Rejestracja

4. **Administrator sieci / NAC:** Zarejestruj zmianę awaryjną.
   _Oczekiwany rezultat:_ Numer zmiany

### Weryfikacja wykonania

`Test-NetConnection <serwer-plików> -Port 445` ze stacji użytkownika – False; z PAW – True.

### Wycofanie

Przywrócenie reguły autoryzacji i zdjęcie reguł zapory po DG5 (IN-NAS-5.1).

### Zapisy

Lista reguł, numer zmiany, wyniki testów.

### Mapowanie na wymagania

- NIST CSF 2.0 – PR.IR-01
- ISO/IEC 27001:2022 – A.8.22

---

## PR-NAS-3 · Odtworzenie danych i udziałów plikowych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS

### Cel

Odtworzenie danych i struktury udziałów z czystego źródła, z zachowaniem uprawnień i z minimalną utratą zmian.

### Zakres i wyzwalacz

Zaszyfrowane pliki, katalogi, woluminy i definicje udziałów.

**Wyzwalacz:** decyzja DG2 (metoda i punkt odtworzenia) i potwierdzenie, że źródło szyfrowania jest odizolowane.

### Warunki wstępne

- Źródło szyfrowania odizolowane, serwer / NAS bez złośliwych procesów (skan EDR).
- Zatwierdzony punkt odtworzenia (migawka lub kopia).
- Kopia bazowa uprawnień (eksport ACL) lub uprawnienia w kopii.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Odtworzenie danych | Administrator pamięci masowej, Administrator kopii zapasowych | Kierownik odtwarzania | Właściciel procesu biznesowego | Kierownik incydentu |
| Odtworzenie uprawnień i udziałów | Administrator pamięci masowej | Kierownik odtwarzania | Administrator AD | – |
| Priorytety danych | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego | Kierownik odtwarzania | – |

### Przebieg

#### 1 · Priorytety

1. **Właściciel procesu biznesowego:** Ustal kolejność odtwarzania udziałów według krytyczności procesów (najpierw dane niezbędne w trybie awaryjnym).
   _Oczekiwany rezultat:_ Lista priorytetów
#### 2 · Zabezpieczenie stanu

2. **Administrator pamięci masowej:** Zachowaj zaszyfrowane dane do czasu potwierdzenia odtworzenia (przenieś do katalogu kwarantanny lub zachowaj migawkę stanu po ataku).
   _Oczekiwany rezultat:_ Stan po ataku zachowany
#### 3 · Odtworzenie

3. **Administrator pamięci masowej:** Odtwórz dane i uprawnienia według IN-NAS-3.1 (migawki dla całych woluminów lub katalogów; kopie zapasowe, gdy migawki są niepewne).
   _Oczekiwany rezultat:_ Dane odtworzone
4. **Administrator pamięci masowej:** Odtwórz pliki zmienione po punkcie odtworzenia, które nie zostały zaszyfrowane (zachowanie najnowszych wersji).

   ```
   robocopy <źródło-po-ataku> <cel> /E /XO /XF *.<rozszerzenie> *README*.txt /COPY:DAT /R:1 /W:1 /LOG:<log>
   ```
   _Oczekiwany rezultat:_ Najnowsze niezaszyfrowane pliki zachowane
#### 4 · Oczyszczenie

5. **Administrator pamięci masowej:** Usuń notatki okupu i zaszyfrowane pliki z odtworzonej struktury.
   _Oczekiwany rezultat:_ Brak artefaktów w udziałach
#### 5 · Przekazanie

6. **Administrator pamięci masowej:** Przekaż do weryfikacji (PR-NAS-4).
   _Oczekiwany rezultat:_ Zgłoszenie do weryfikacji

### Kryteria wyjścia

- Dane odtworzone z zatwierdzonego źródła, uprawnienia odtworzone.
- Brak artefaktów ransomware w udziałach.

### Zapisy (dowody wykonania)

Dziennik odtworzenia (źródło, punkt, zakres, czasy), logi robocopy, lista utraconych zmian.

### Instrukcje i checklisty

- Instrukcja: **IN-NAS-3.1 · Odtworzenie udziałów i uprawnień** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- NIST CSF 2.0 – RC.RP-02
- NIST CSF 2.0 – RC.RP-03
- RODO – rozporządzenie (UE) 2016/679 – art. 32(1)(c)
- NIST SP 800-184 – TACT

---

## IN-NAS-3.1 · Odtworzenie udziałów i uprawnień

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS → PR-NAS-3 · Odtworzenie danych i udziałów plikowych

### Cel

Odtworzenie danych, definicji udziałów i uprawnień NTFS/udziałów z zatwierdzonego źródła.

### Zastosowanie

Odtwarzanie w PR-NAS-3. Kolejność metod: migawka NAS (najszybsza) → kopia zapasowa → kopia poza siedzibą.

### Wymagane uprawnienia i narzędzia

Zatwierdzony punkt odtworzenia, uprawnienia administratora, wolna przestrzeń dla odtworzenia równoległego.

### Środki ostrożności

- `volume snapshot restore` przywraca cały wolumin i usuwa nowsze migawki – stosuj tylko, gdy cały wolumin jest zaszyfrowany i zaakceptowano utratę zmian.
- Preferuj odtworzenie do nowej lokalizacji, a potem przełączenie.

### Kroki

#### 1 · Dane

1. **Administrator pamięci masowej:** NetApp – cały wolumin: przywróć wolumin z migawki sprzed szyfrowania (po akceptacji utraty zmian).

   ```
   volume snapshot restore -vserver <svm> -volume <vol> -snapshot <migawka>
   ```
   _Oczekiwany rezultat:_ Wolumin w stanie z migawki
2. **Administrator pamięci masowej:** NetApp – wybrane pliki lub katalogi: przywróć z migawki.

   ```
   volume snapshot restore-file -vserver <svm> -volume <vol> -snapshot <migawka> -path /<katalog>/<plik>
   ```
   _Oczekiwany rezultat:_ Pliki przywrócone
3. **Administrator pamięci masowej:** Windows – kopia migawkowa: skopiuj dane z migawki VSS do nowej lokalizacji z uprawnieniami.

   ```
   robocopy \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy<n>\<ścieżka> <cel> /E /COPYALL /DCOPY:DAT /R:1 /W:1 /LOG:<log>
   ```
   _Oczekiwany rezultat:_ Dane w nowej lokalizacji
4. **Administrator kopii zapasowych:** Kopia zapasowa: przywróć pliki lub cały wolumin z zatwierdzonego punktu z zachowaniem uprawnień.
   _Oczekiwany rezultat:_ Dane przywrócone
#### 2 · Uprawnienia

5. **Administrator pamięci masowej:** Odtwórz uprawnienia NTFS z kopii bazowej ACL, jeśli nie zostały przywrócone z danymi.

   ```
   icacls <katalog-nadrzędny> /restore <plik-acl>.txt /c
   ```
   _Oczekiwany rezultat:_ Uprawnienia odtworzone
6. **Administrator pamięci masowej:** Odtwórz definicje udziałów i uprawnienia udziałów (z eksportu sprzed incydentu, docelowo bez pełnej kontroli dla Everyone).

   ```
   New-SmbShare -Name <udział> -Path <ścieżka> -FullAccess "<DOMENA>\<grupa-adm>" -ChangeAccess "<DOMENA>\<grupa-użytk>" -FolderEnumerationMode AccessBased
   ```
   _Oczekiwany rezultat:_ Udziały zdefiniowane
#### 3 · DFS

7. **Administrator pamięci masowej:** Odtwórz cele DFS (nadal wyłączone dla użytkowników do PR-NAS-5).
   _Oczekiwany rezultat:_ Cele DFS gotowe, wyłączone

### Weryfikacja wykonania

Liczba plików i rozmiar zgodne z punktem odtworzenia; uprawnienia zgodne z kopią bazową (PR-NAS-4).

### Wycofanie

Odtwarzanie do nowej lokalizacji pozwala wrócić do stanu sprzed odtworzenia przez zmianę ścieżki udziału.

### Zapisy

Dziennik odtworzenia, logi robocopy/ONTAP, użyte migawki i kopie.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- NIST CSF 2.0 – RC.RP-02

---

## PR-NAS-4 · Weryfikacja integralności odtworzonych danych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS

### Cel

Potwierdzenie kompletności, poprawności i czystości odtworzonych danych oraz zgodności uprawnień z bazą referencyjną.

### Zakres i wyzwalacz

Odtworzone udziały i katalogi.

**Wyzwalacz:** zakończenie PR-NAS-3.

### Warunki wstępne

- Manifest lub statystyki danych sprzed incydentu (liczba plików, rozmiar, sumy kontrolne próbki).
- Kopia bazowa ACL.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Weryfikacja techniczna | Administrator pamięci masowej | Kierownik odtwarzania | Zespół reagowania (CSIRT) | – |
| Weryfikacja przez właściciela danych | Właściciel procesu biznesowego | Właściciel procesu biznesowego | Administrator pamięci masowej | Kierownik incydentu |

### Przebieg

#### 1 · Weryfikacja techniczna

1. **Administrator pamięci masowej:** Wykonaj weryfikację integralności plików i uprawnień według IN-NAS-4.1.
   _Oczekiwany rezultat:_ Raport weryfikacji
2. **Zespół reagowania (CSIRT):** Przeskanuj odtworzone dane (AV, YARA) – pliki mogą zawierać złośliwe makra lub narzędzia atakującego.
   _Oczekiwany rezultat:_ 0 wykryć
#### 2 · Weryfikacja biznesowa

3. **Właściciel procesu biznesowego:** Sprawdź próbkę dokumentów kluczowych dla procesu (otwarcie, treść, wersja).
   _Oczekiwany rezultat:_ Akceptacja próbki
4. **Właściciel procesu biznesowego:** Zaakceptuj listę utraconych zmian i wskaż, kto je odtworzy (z poczty, wydruków, systemów źródłowych).
   _Oczekiwany rezultat:_ Akceptacja utraty zmian
#### 3 · Kontrola

5. **Administrator pamięci masowej:** Wypełnij CL-NAS-4.
   _Oczekiwany rezultat:_ CL-NAS-4

### Kryteria wyjścia

- Integralność i uprawnienia potwierdzone, skan czysty.
- Właściciel danych zaakceptował odtworzenie i utratę zmian.

### Zapisy (dowody wykonania)

Raport weryfikacji, wyniki skanów, akceptacja właściciela, CL-NAS-4.

### Instrukcje i checklisty

- Instrukcja: **CL-NAS-4 · Weryfikacja danych i uprawnień** (v0.1, projekt)
- Instrukcja: **IN-NAS-4.1 · Weryfikacja integralności plików i uprawnień** (v0.1, projekt)

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.5.15
- ISO/IEC 27001:2022 – A.8.13

---

## CL-NAS-4 · Weryfikacja danych i uprawnień

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS → PR-NAS-4 · Weryfikacja integralności odtworzonych danych

### Zastosowanie

Kontrola po PR-NAS-4.

### Lista kontrolna

1. **Administrator pamięci masowej:** Liczba plików i rozmiar zgodne z punktem odtworzenia
2. **Administrator pamięci masowej:** Sumy kontrolne próbki zgodne
3. **Administrator pamięci masowej:** Brak artefaktów ransomware
4. **Zespół reagowania (CSIRT):** Skan AV/YARA bez wykryć
5. **Administrator pamięci masowej:** Uprawnienia zgodne z kopią bazową, brak nadmiernych uprawnień
6. **Właściciel procesu biznesowego:** Próbka dokumentów zaakceptowana
7. **Właściciel procesu biznesowego:** Utrata zmian zaakceptowana

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator pamięci masowej. Zatwierdził: właściciel danych.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05

---

## IN-NAS-4.1 · Weryfikacja integralności plików i uprawnień

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS → PR-NAS-4 · Weryfikacja integralności odtworzonych danych

### Cel

Obiektywne potwierdzenie kompletności i poprawności odtworzonych plików oraz zgodności uprawnień z bazą referencyjną.

### Zastosowanie

Po odtworzeniu (PR-NAS-4).

### Wymagane uprawnienia i narzędzia

Manifest sprzed incydentu lub punkt odtworzenia jako wzorzec, kopia bazowa ACL, PowerShell.

### Środki ostrożności

Porównania wykonuj na kopii danych lub w trybie tylko do odczytu.

### Kroki

#### 1 · Kompletność

1. **Administrator pamięci masowej:** Porównaj liczbę plików i rozmiar z punktem odtworzenia.

   ```
   robocopy <wzorzec> <odtworzone> /L /E /NJH /NDL /BYTES /LOG:<porównanie>.log
   ```
   _Oczekiwany rezultat:_ Brak różnic poza zaakceptowanymi
#### 2 · Poprawność

2. **Administrator pamięci masowej:** Porównaj sumy kontrolne losowej próbki co najmniej 500 plików lub plików krytycznych.

   ```
   $w = Get-ChildItem <wzorzec> -Recurse -File | Get-Random -Count 500
   $w | ForEach-Object { $o = $_.FullName.Replace("<wzorzec>","<odtworzone>"); [pscustomobject]@{Plik=$_.FullName; Zgodny=((Get-FileHash $_.FullName).Hash -eq (Get-FileHash $o).Hash)} } | Where-Object { -not $_.Zgodny }
   ```
   _Oczekiwany rezultat:_ Wynik pusty
#### 3 · Czystość

3. **Administrator pamięci masowej:** Sprawdź brak artefaktów ransomware.

   ```
   Get-ChildItem <odtworzone> -Recurse -Include *.<rozszerzenie>, *README*, *DECRYPT* -ErrorAction SilentlyContinue
   ```
   _Oczekiwany rezultat:_ Wynik pusty
#### 4 · Uprawnienia

4. **Administrator pamięci masowej:** Wyeksportuj uprawnienia po odtworzeniu i porównaj z kopią bazową.

   ```
   icacls <odtworzone> /save acl-po.txt /t /c
   Compare-Object (Get-Content acl-bazowe.txt) (Get-Content acl-po.txt)
   ```
   _Oczekiwany rezultat:_ Brak nieoczekiwanych różnic
5. **Administrator pamięci masowej:** Sprawdź, czy żaden katalog nie daje Everyone lub Authenticated Users pełnej kontroli lub prawa zmiany bez uzasadnienia.

   ```
   Get-ChildItem <odtworzone> -Directory -Recurse | Get-Acl | Where-Object { $_.Access | Where-Object { $_.IdentityReference -match "Everyone|Authenticated Users" -and $_.FileSystemRights -match "FullControl|Modify" } } | Select Path
   ```
   _Oczekiwany rezultat:_ Wynik pusty lub uzasadniony

### Weryfikacja wykonania

Raport zawiera wyniki wszystkich porównań; różnice są wyjaśnione i zaakceptowane przez właściciela danych.

### Wycofanie

Nie dotyczy.

### Zapisy

Logi porównań, raport weryfikacji.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.5.15

---

## PR-NAS-5 · Przywrócenie dostępu użytkowników do udziałów

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS

### Cel

Kontrolowane udostępnienie udziałów użytkownikom z monitorowaniem, aby szybko wykryć ewentualny nawrót szyfrowania.

### Zakres i wyzwalacz

Udziały zweryfikowane w PR-NAS-4.

**Wyzwalacz:** zaliczona weryfikacja PR-NAS-4 i decyzja DG5.

### Warunki wstępne

Bramka DG5 z polityki (kryteria dopuszczenia do produkcji) musi być spełniona w całości. Brak spełnienia któregokolwiek kryterium blokuje dopuszczenie – odstępstwo zatwierdza wyłącznie Kierownik incydentu wraz z właścicielem procesu i jest wpisywane do rejestru ryzyk.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Decyzja DG5 | Kierownik incydentu | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |
| Udostępnienie udziałów | Administrator pamięci masowej | Kierownik odtwarzania | Administrator sieci / NAC | Service desk |
| Monitorowanie | SOC | Kierownik incydentu | Administrator pamięci masowej | – |
| Komunikat do użytkowników | Komunikacja | Zespół zarządzania kryzysowego | Właściciel procesu biznesowego | użytkownicy |

### Przebieg

#### 1 · Decyzja

1. **Kierownik incydentu:** Podejmij decyzję DG5 dla udziałów.
   _Oczekiwany rezultat:_ Wpis DG5
#### 2 · Przygotowanie

2. **SOC:** Upewnij się, że ochrona przed ransomware na NAS / FSRM i alerty SOC są aktywne przed udostępnieniem.
   _Oczekiwany rezultat:_ Ochrona aktywna
#### 3 · Udostępnienie

3. **Administrator pamięci masowej:** Przywróć dostęp według IN-NAS-5.1 – najpierw grupy pilotażowe, potem pozostali użytkownicy.
   _Oczekiwany rezultat:_ Dostęp przywrócony
#### 4 · Komunikacja

4. **Komunikacja:** Przekaż użytkownikom informację o przywróceniu, utraconych zmianach i sposobie zgłaszania problemów.
   _Oczekiwany rezultat:_ Komunikat wysłany
#### 5 · Kontrola

5. **Administrator pamięci masowej:** Wypełnij CL-NAS-5.
   _Oczekiwany rezultat:_ CL-NAS-5

### Kryteria wyjścia

- Użytkownicy mają dostęp zgodny z uprawnieniami.
- Monitorowanie aktywne, brak nawrotu przez 72 h.

### Zapisy (dowody wykonania)

Wpis DG5, rejestr udostępnienia, komunikat, CL-NAS-5.

### Instrukcje i checklisty

- Instrukcja: **CL-NAS-5 · Przywrócenie dostępu do plików** (v0.1, projekt)
- Instrukcja: **IN-NAS-5.1 · Przywrócenie dostępu do udziałów** (v0.1, projekt)

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- NIST CSF 2.0 – RC.CO-03
- ISO/IEC 27001:2022 – A.5.15
- ISO/IEC 27001:2022 – A.8.16

---

## CL-NAS-5 · Przywrócenie dostępu do plików

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS → PR-NAS-5 · Przywrócenie dostępu użytkowników do udziałów

### Zastosowanie

Kontrola po PR-NAS-5.

### Lista kontrolna

1. **Kierownik incydentu:** DG5 dla udziałów zapisana
2. **SOC:** Ochrona przed ransomware i alerty aktywne
3. **Administrator pamięci masowej:** Grupa pilotażowa – 2 h bez alertów
4. **Administrator pamięci masowej:** Wszystkie fale udostępnione
5. **Administrator pamięci masowej:** Reguły i blokady tymczasowe usunięte
6. **Administrator pamięci masowej:** Harmonogram migawek przywrócony
7. **Komunikacja:** Użytkownicy poinformowani o przywróceniu i utraconych zmianach

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator pamięci masowej. Zatwierdził: Kierownik odtwarzania.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- NIST CSF 2.0 – RC.CO-03

---

## IN-NAS-5.1 · Przywrócenie dostępu do udziałów

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator pamięci masowej | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS → PR-NAS-5 · Przywrócenie dostępu użytkowników do udziałów

### Cel

Stopniowe udostępnienie odtworzonych udziałów użytkownikom z monitorowaniem.

### Zastosowanie

Po decyzji DG5 (PR-NAS-5).

### Wymagane uprawnienia i narzędzia

Uprawnienia administratora serwera plików / NAS, NAC i DFS; lista grup pilotażowych.

### Środki ostrożności

Udostępniaj falami; przy pierwszym sygnale nawrotu wróć do izolacji (IN-NAS-2.2).

### Kroki

#### 1 · Pilotaż

1. **Administrator sieci / NAC:** Zdejmij profil „PLIKI-ZABLOKOWANE” dla segmentu grupy pilotażowej i wymuś CoA.
   _Oczekiwany rezultat:_ Grupa pilotażowa ma dostęp sieciowy
2. **Administrator pamięci masowej:** Uruchom usługę udostępniania plików (jeśli zatrzymana) i włącz cele DFS.

   ```
   Start-Service LanmanServer
   vserver cifs start -vserver <svm>
   ```
   _Oczekiwany rezultat:_ Usługa działa
#### 2 · Monitorowanie

3. **SOC:** Monitoruj przez 2 h operacje na plikach i alerty ochrony przed ransomware.
   _Oczekiwany rezultat:_ Brak alertów
#### 3 · Fale

4. **Administrator pamięci masowej:** Udostępnij pozostałym segmentom falami; po każdej fali – 1 h obserwacji.
   _Oczekiwany rezultat:_ Rejestr fal
#### 4 · Porządkowanie

5. **Administrator pamięci masowej:** Usuń blokady kont na udziałach i zdejmij reguły tymczasowe zgodnie ze zmianą awaryjną.

   ```
   Unblock-SmbShareAccess -Name <udział> -AccountName <konto> -Force
   ```
   _Oczekiwany rezultat:_ Reguły tymczasowe usunięte
#### 5 · Ochrona

6. **Administrator pamięci masowej:** Przywróć harmonogram migawek i potwierdź, że pierwsza migawka po odtworzeniu została wykonana.
   _Oczekiwany rezultat:_ Migawka wykonana

### Weryfikacja wykonania

Użytkownicy z grup docelowych mają dostęp zgodny z uprawnieniami; brak alertów przez 72 h.

### Wycofanie

Powrót do izolacji według IN-NAS-2.2 przy nawrocie.

### Zapisy

Rejestr fal udostępnienia, raporty monitorowania.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.5.15

---

## PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Plan | biznesowo-techniczna | 0.1 | projekt | Dyrektor operacji sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware

### 1. Cel i zakres

Plan opisuje reakcję na ransomware na stanowiskach sprzedażowych (kasy, kasy samoobsługowe, serwery sklepowe) w placówkach Rossmann Polska. Celem jest utrzymanie sprzedaży w placówkach niedotkniętych incydentem, szybka izolacja zainfekowanych stanowisk i bezpieczne odtworzenie z wzorcowych obrazów, z zachowaniem wymagań fiskalnych i PCI DSS.

### 2. Scenariusz

Ransomware rozprzestrzenia się z centrali lub przez narzędzia zarządzania (dystrybucja oprogramowania, zdalny dostęp serwisowy) na stanowiska POS w wielu placówkach. Sprzedaż staje, klienci nie mogą płacić. Istnieje ryzyko dostępu do danych kart, jeśli terminale nie są w pełni odseparowane.

### 2a. Specyfika Rossmann Polska

- Około 2000 drogerii w ponad 700 miejscowościach; kasy tradycyjne i samoobsługowe; płatność w aplikacji (Rossmann GO).
- Program lojalnościowy Klub Rossmanna zintegrowany z kasą – w trybie awaryjnym rabaty Klubu są wstrzymane.
- Kierownicy regionów są głównym kanałem poleceń dla drogerii (SMS / telefon).
- Urządzenia fiskalne (kasy online) przesyłają dane do Centralnego Repozytorium Kas – po odtworzeniu sprawdź brak zaległości.
- Priorytet fal odtwarzania: drogerie o najwyższym obrocie i najniższym zapasie, centra handlowe, miasta z jedną drogerią.

### 3. Sygnały wykrycia i wskaźniki naruszenia

- Kasy nie uruchamiają aplikacji sprzedażowej, ekrany z notatką okupu.
- Alerty EDR z wielu placówek w krótkim czasie.
- Nietypowe zadania w systemie dystrybucji oprogramowania lub zdalnego dostępu do placówek.
- Zgłoszenia kierowników placówek na infolinię.

### 4. Zasoby objęte planem

| System | Technologie | Wymagane RTO / RPO | Osiągalne RTO / RPO | Kopie | Ośrodek zapasowy |
|---|---|---|---|---|---|
| System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) | Kasy POS i terminale płatnicze (sklep), Microsoft Defender for Endpoint | 2 h / 15 min | 4 h / 15 min | Złoty obraz kasy; transakcje replikowane do centrali | Tryb offline kas |
| Płatności kartowe – terminale i agent rozliczeniowy |  | 2 h / 15 min | 2 h / 0 | Usługa zewnętrzna | Łącze terminali niezależne od sieci centrali |

### 5. Wpływ na procesy biznesowe i cele odtworzenia

| Proces | Właściciel | Krytyczność | MTPD | RTO | RPO | MBCO |
|---|---|---|---|---|---|---|
| Sprzedaż w drogeriach | Dyrektor operacji sklepowych | 5 – krytyczna | 4 h | 2 h | 15 min | Sprzedaż (gotówka i karty) w trybie offline w co najmniej 80% drogerii |

### 6. Kryteria aktywacji i klasyfikacja

Aktywacja przy potwierdzeniu ransomware na którymkolwiek stanowisku POS. K2 dla pojedynczych placówek, K1 przy więcej niż 5% placówek lub objawach rozprzestrzeniania.

### 7. Organizacja reagowania

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Ocena zakresu naruszenia POS | Administrator systemów sklepowych, SOC | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |
| Izolacja stanowisk i placówek | SOC, Administrator sieci / NAC, Administrator systemów sklepowych | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |
| Tryb awaryjny sprzedaży | Kierownicy placówek i regionów | Właściciel procesu biznesowego | Administrator systemów sklepowych | Zespół zarządzania kryzysowego |
| Odtworzenie stanowisk | Administrator systemów sklepowych, serwis POS | Kierownik odtwarzania | Dostawca | Kierownik incydentu |
| Dopuszczenie POS | Administrator systemów sklepowych | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |

### 8. Przebieg reagowania

| Faza | Cel | Procedura | Cel czasowy |
|---|---|---|---|
| Ocena | liczba placówek i stanowisk, wektor | PR-POS-1 | 1 h |
| Izolacja | zatrzymanie rozprzestrzeniania, sprzedaż offline | PR-POS-2 | 15 min od DG0 |
| Odtworzenie | stanowiska ze złotego obrazu | PR-POS-3 | według RTO sprzedaży |
| Weryfikacja | bezpieczeństwo i działanie | PR-POS-4 | przed DG5 |
| Dopuszczenie | połączenie z centralą | PR-POS-5 | DG5 |

Odtwarzanie placówek prowadzi się falami: placówki pilotażowe, następnie według obrotów i zapasów, z kontrolą każdej fali.

### 9. Ciągłość działania w trakcie incydentu

- Placówki niedotknięte: sprzedaż w trybie offline po odcięciu od centrali, terminale płatnicze na odrębnym łączu.
- Placówki dotknięte: zainfekowane stanowiska wyłączone z pracy; sprzedaż na sprawnych stanowiskach; przy braku możliwości wystawiania paragonów – zamknięcie decyzją kierownika regionu.
- Wstrzymane: zwroty, karty podarunkowe, rabaty programu lojalnościowego.
- Rejestr papierowy braków i zdarzeń; raport do kierownika regionu co 4 h.
- Kasy fiskalne: nie ingeruje się w pamięć fiskalną; czynności serwisowe wykonuje uprawniony serwis.

### 10. Punkty decyzyjne

- DG1: odcięcie wszystkich placówek od centrali czy tylko dotkniętych.
- DG1: wyłączenie narzędzi dystrybucji oprogramowania i zdalnego dostępu do placówek.
- Zamknięcie placówek (kryteria w trybie awaryjnym).
- DG2: kolejność fal odtwarzania.
- Powiadomienie agenta rozliczeniowego (PCI DSS) przy podejrzeniu dostępu do danych kart.

### 11. Komunikacja i obowiązki raportowe

Komunikację wewnętrzną prowadzi się kanałem pozapasmowym. Komunikaty do pracowników, klientów, dostawców i mediów zatwierdza przewodniczący ZZK. Kierownik incydentu raportuje stan co 2 h w fazie ograniczania i co 4 h w fazie odtwarzania (CSF RC.CO-03). Placówki otrzymują polecenia SMS-em lub telefonicznie od kierowników regionów; klienci – komunikat przy wejściu i w mediach społecznościowych.

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

### 12. Kryteria zakończenia

- Wszystkie stanowiska odtworzone ze złotego obrazu i dopuszczone.
- Dane sprzedaży z trybu offline przesłane i uzgodnione z raportami fiskalnymi.
- Narzędzia zarządzania placówkami zabezpieczone (MFA, ograniczenie dostępu).
- DG5 spełniona dla każdej fali.

### 13. Błędy, których należy unikać

- Restartowanie zainfekowanych kas przez personel placówki.
- Przywracanie połączenia placówek z centralą przed oczyszczeniem centrali.
- Wymiana sprzętu fiskalnego bez serwisu i procedury fiskalnej.
- Pominięcie stanowisk zapasowych i kas samoobsługowych przy odtwarzaniu.

### 14. Procedury, instrukcje i checklisty

- Procedura: **PR-POS-1 · Ocena zakresu naruszenia stanowisk POS** (v0.1, projekt)
- Procedura: **PR-POS-2 · Izolacja stanowisk POS** (v0.1, projekt)
- Procedura: **PR-POS-3 · Odtworzenie stanowisk POS** (v0.1, projekt)
- Procedura: **PR-POS-4 · Weryfikacja bezpieczeństwa i działania POS** (v0.1, projekt)
- Procedura: **PR-POS-5 · Dopuszczenie POS do eksploatacji** (v0.1, projekt)

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.4
- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.5.29
- ISO/IEC 27001:2022 – A.8.7
- NIST CSF 2.0 – RS.MI-01
- NIST CSF 2.0 – RC.RP-05
- PCI DSS v4.0.1 – 12.10.1
- PCI DSS v4.0.1 – 12.10.5
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(c)

---

## PR-POS-1 · Ocena zakresu naruszenia stanowisk POS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym

### Cel

Ustalenie liczby i lokalizacji naruszonych stanowisk POS, drogi rozprzestrzeniania, wpływu na sprzedaż oraz ryzyka dla danych kart płatniczych.

### Zakres i wyzwalacz

Kasy, kasy samoobsługowe, serwery sklepowe, narzędzia zarządzania placówkami (dystrybucja oprogramowania, zdalny dostęp), łącza placówek.

**Wyzwalacz:** zgłoszenie z placówki o notatce okupu lub niedziałającej kasie, alert EDR na stanowisku POS, niedostępność sprzedaży w wielu placówkach.

### Warunki wstępne

- Wykaz placówek i stanowisk (numer placówki, numer kasy, model, wersja obrazu).
- Dostęp do konsoli EDR, NAC, systemu zarządzania placówkami.
- Kontakt do agenta rozliczeniowego i serwisu fiskalnego.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Zbieranie zgłoszeń z placówek | Service desk | Administrator systemów sklepowych | Kierownik regionu | Kierownik incydentu |
| Analiza zakresu i wektora | Administrator systemów sklepowych, SOC | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Wpływ na sprzedaż | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego | Kierownik regionu | – |
| Ocena PCI DSS | Dział prawny / compliance, Administrator systemów sklepowych | Kierownik incydentu | agent rozliczeniowy | – |

### Przebieg

#### 1 · Zgłoszenia

1. **Service desk:** Prowadź rejestr zgłoszeń z placówek: placówka, kasa, objawy, godzina, czy działa sprzedaż.
   _Oczekiwany rezultat:_ Rejestr zgłoszeń
#### 2 · Zakres

2. **SOC:** Wyszukaj w EDR stanowiska POS z alertami i oznakami szyfrowania; oznacz placówki dotknięte.

   ```
   DeviceProcessEvents
   | where Timestamp > ago(3d)
   | where DeviceName startswith "<prefiks-POS>"
   | where ProcessCommandLine has_any ("vssadmin delete", "shadowcopy delete") or FileName in~ ("psexesvc.exe")
   | summarize Pierwsze=min(Timestamp) by DeviceName
   ```
   _Oczekiwany rezultat:_ Lista stanowisk i placówek
3. **Administrator systemów sklepowych:** Sprawdź stanowiska bez łączności z EDR (wyłączony agent) – traktuj jako podejrzane.
   _Oczekiwany rezultat:_ Lista stanowisk bez telemetrii
#### 3 · Wektor

4. **Zespół reagowania (CSIRT):** Ustal drogę rozprzestrzeniania: system dystrybucji oprogramowania, zdalny dostęp serwisowy, konto domenowe, serwer sklepowy, sieć WAN.
   _Oczekiwany rezultat:_ Wektor rozprzestrzeniania
#### 4 · Wpływ

5. **Właściciel procesu biznesowego:** Oszacuj wpływ: liczba placówek bez sprzedaży, z częściową sprzedażą, w trybie offline; szacunkowa utrata obrotu na godzinę.
   _Oczekiwany rezultat:_ Ocena wpływu
6. **Dział prawny / compliance:** Oceń ryzyko dla danych kart (czy terminale płatnicze i aplikacja POS przetwarzają dane kart, czy terminale są P2PE); przy podejrzeniu – powiadom agenta rozliczeniowego.
   _Oczekiwany rezultat:_ Ocena PCI DSS
#### 5 · Decyzja

7. **Kierownik incydentu:** Wypełnij CL-POS-1, ustal kategorię i rekomendację DG1 (odcięcie wszystkich placówek czy wybranych).
   _Oczekiwany rezultat:_ CL-POS-1

### Kryteria wyjścia

- Lista naruszonych stanowisk i placówek, wektor rozprzestrzeniania i wpływ na sprzedaż znane.
- Ocena PCI DSS wykonana, rekomendacja DG1 przygotowana.

### Zapisy (dowody wykonania)

Rejestr zgłoszeń, lista stanowisk, ocena wpływu, ocena PCI, CL-POS-1.

### Instrukcje i checklisty

- Instrukcja: **CL-POS-1 · Ocena naruszenia POS** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.25
- NIST CSF 2.0 – RS.AN-08
- NIST CSF 2.0 – RS.MA-03
- PCI DSS v4.0.1 – 12.10.1
- PCI DSS v4.0.1 – 12.10.5

---

## CL-POS-1 · Ocena naruszenia POS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym → PR-POS-1 · Ocena zakresu naruszenia stanowisk POS

### Zastosowanie

Podsumowanie PR-POS-1.

### Lista kontrolna

1. **Service desk:** Rejestr zgłoszeń z placówek prowadzony
2. **SOC:** Stanowiska z alertami EDR zidentyfikowane
3. **Administrator systemów sklepowych:** Stanowiska bez telemetrii EDR zidentyfikowane
4. **Zespół reagowania (CSIRT):** Droga rozprzestrzeniania ustalona
5. **Właściciel procesu biznesowego:** Liczba placówek bez sprzedaży i z trybem offline ustalona
6. **Dział prawny / compliance:** Ryzyko dla danych kart ocenione, agent rozliczeniowy powiadomiony (jeśli dotyczy)
7. **Kierownik incydentu:** Rekomendacja DG1 przygotowana

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator systemów sklepowych. Zatwierdził: Kierownik incydentu.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.AN-08
- PCI DSS v4.0.1 – 12.10.1

---

## PR-POS-2 · Izolacja stanowisk POS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym

### Cel

Zatrzymanie rozprzestrzeniania na placówki przy utrzymaniu sprzedaży w trybie awaryjnym tam, gdzie jest to bezpieczne.

### Zakres i wyzwalacz

Stanowiska POS, sieć placówek, połączenia placówek z centralą, narzędzia zarządzania placówkami.

**Wyzwalacz:** decyzja DG1 po PR-POS-1 albo natychmiast przy rozprzestrzenianiu się na kolejne placówki.

### Warunki wstępne

- Lista stanowisk i placówek z PR-POS-1.
- Polityki izolacji w EDR i NAC, reguły odcięcia placówek od centrali na SD-WAN.
- Instrukcja trybu awaryjnego dla placówek (PL-POS, rozdz. 9).

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Odcięcie placówek od centrali | Administrator sieci / NAC | Kierownik incydentu | Administrator systemów sklepowych | Zespół zarządzania kryzysowego |
| Izolacja stanowisk | SOC, Administrator sieci / NAC | Kierownik incydentu | Administrator systemów sklepowych | Kierownik placówki |
| Wyłączenie narzędzi zarządzania | Administrator systemów sklepowych | Kierownik incydentu | Zespół reagowania (CSIRT) | – |
| Tryb awaryjny sprzedaży | Kierownik regionu, Kierownik placówki | Właściciel procesu biznesowego | Administrator systemów sklepowych | Zespół zarządzania kryzysowego |

### Przebieg

#### 1 · Zatrzymanie rozprzestrzeniania

1. **Administrator systemów sklepowych:** Wyłącz system dystrybucji oprogramowania i zdalnego dostępu do placówek (wstrzymaj wdrożenia, zablokuj konsole).
   _Oczekiwany rezultat:_ Narzędzia wyłączone
2. **Administrator sieci / NAC:** Odetnij placówki od sieci centrali na SD-WAN/zaporach (zgodnie z DG1: wszystkie lub wybrane), pozostaw łącza terminali płatniczych.
   _Oczekiwany rezultat:_ Placówki odcięte, płatności działają
#### 2 · Stanowiska

3. **SOC:** Odizoluj naruszone stanowiska w EDR według IN-POS-2.1.
   _Oczekiwany rezultat:_ Stanowiska odizolowane
4. **Administrator sieci / NAC:** Stanowiska bez EDR lub z wyłączonym agentem poddaj kwarantannie w NAC według IN-POS-2.2.
   _Oczekiwany rezultat:_ Stanowiska w kwarantannie
#### 3 · Tryb awaryjny

5. **Kierownik regionu:** Przekaż placówkom polecenie trybu awaryjnego (SMS / telefon): sprzedaż offline na sprawnych stanowiskach, nie restartować kas z notatką okupu, zgłaszać objawy.
   _Oczekiwany rezultat:_ Potwierdzenia od placówek
6. **Kierownik placówki:** Oznacz i wyłącz z pracy (bez wyłączania zasilania) stanowiska z objawami; sfotografuj ekran; odłącz kabel sieciowy, jeśli nie zrobiono tego zdalnie.
   _Oczekiwany rezultat:_ Stanowiska oznaczone
#### 4 · Weryfikacja

7. **SOC:** Zweryfikuj skuteczność izolacji (IN-INF-2.4) i monitoruj pozostałe placówki pod kątem nowych alertów.
   _Oczekiwany rezultat:_ Raport weryfikacji

### Kryteria wyjścia

- Brak nowych naruszonych stanowisk przez 2 h.
- Placówki pracują w trybie awaryjnym lub są zamknięte decyzją kierownika regionu.

### Zapisy (dowody wykonania)

Rejestr izolacji (placówka, kasa, godzina), polecenia do placówek, raport weryfikacji.

### Instrukcje i checklisty

- Instrukcja: **IN-POS-2.1 · Izolacja terminala POS w EDR** (v0.1, projekt)
- Instrukcja: **IN-POS-2.2 · Kwarantanna stanowiska POS w NAC** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.8.22
- ISO 22301:2019 – 8.4.4
- NIST CSF 2.0 – RS.MI-01
- PCI DSS v4.0.1 – 12.10.1

---

## IN-POS-2.1 · Izolacja terminala POS w EDR

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym → PR-POS-2 · Izolacja stanowisk POS

### Cel

Odcięcie naruszonego stanowiska POS od sieci z poziomu EDR, bez fizycznej interwencji w placówce.

### Zastosowanie

Stanowiska POS z alertami lub objawami szyfrowania (PR-POS-2). Metoda jak w IN-INF-2.1, z uwagami dla placówek.

### Wymagane uprawnienia i narzędzia

Rola reagowania w EDR, lista identyfikatorów stanowisk (konwencja nazw placówka-kasa).

### Środki ostrożności

- Izolacja EDR odcina też komunikację aplikacji POS – stanowisko przestaje sprzedawać.
- Terminal płatniczy z własnym łączem działa dalej – kasjer może przyjąć płatność na innym stanowisku.
- Przy masowej izolacji użyj API i list, nie konsoli ręcznie.

### Kroki

#### 1 · Przygotowanie

1. **SOC:** Przygotuj listę identyfikatorów stanowisk do izolacji z rejestru PR-POS-1.
   _Oczekiwany rezultat:_ Lista identyfikatorów
#### 2 · Izolacja

2. **SOC:** Wykonaj izolację pełną (pojedynczo lub w pętli przez API).

   ```
   foreach ($id in Get-Content pos-ids.txt) {
     Invoke-RestMethod -Method Post -Uri "https://api.security.microsoft.com/api/machines/$id/isolate" -Headers $h -Body '{"Comment":"IR-<nr> POS","IsolationType":"Full"}' -ContentType "application/json"
   }
   ```
   _Oczekiwany rezultat:_ Akcje: Succeeded
#### 3 · Kontrola

3. **SOC:** Sprawdź stan akcji i wyłapuj stanowiska offline (izolacja wykona się przy połączeniu – do tego czasu kwarantanna NAC).
   _Oczekiwany rezultat:_ Lista stanowisk offline
#### 4 · Komunikacja

4. **SOC:** Przekaż listę izolowanych stanowisk kierownikom regionów.
   _Oczekiwany rezultat:_ Lista przekazana

### Weryfikacja wykonania

Status w EDR „odizolowany”; brak ruchu stanowiska w logach zapory placówki.

### Wycofanie

Stanowisk naruszonych nie zwalnia się z izolacji – są odtwarzane z obrazu (IN-POS-3.1).

### Zapisy

Rejestr izolacji POS.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.MI-01
- ISO/IEC 27001:2022 – A.8.7

---

## IN-POS-2.2 · Kwarantanna stanowiska POS w NAC

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym → PR-POS-2 · Izolacja stanowisk POS

### Cel

Odcięcie stanowiska POS na poziomie sieci placówki, gdy EDR nie działa lub stanowisko jest offline.

### Zastosowanie

Stanowiska bez telemetrii EDR, z wyłączonym agentem lub niepewne (PR-POS-2).

### Wymagane uprawnienia i narzędzia

Uprawnienia do NAC, przełączników i SD-WAN placówek; adresy MAC stanowisk.

### Środki ostrożności

Nie stosuj kwarantanny do portu terminala płatniczego – zweryfikuj adres MAC i port przed wykonaniem.

### Kroki

#### 1 · Identyfikacja

1. **Administrator sieci / NAC:** Ustal adres MAC stanowiska i port przełącznika placówki (rejestr urządzeń, NAC).
   _Oczekiwany rezultat:_ MAC i port
#### 2 · Kwarantanna

2. **Administrator sieci / NAC:** Zastosuj politykę kwarantanny ANC dla adresu MAC stanowiska (IN-INF-2.2).

   ```
   PUT https://<ise>:9060/ers/config/ancendpoint/apply
   {"OperationAdditionalData":{"additionalData":[{"name":"macAddress","value":"<MAC>"},{"name":"policyName","value":"KWARANTANNA"}]}}
   ```
   _Oczekiwany rezultat:_ Sesja w kwarantannie
3. **Administrator sieci / NAC:** Gdy placówka nie ma NAC: wyłącz port przełącznika lub zablokuj adres na urządzeniu SD-WAN placówki.
   _Oczekiwany rezultat:_ Port wyłączony / adres zablokowany
#### 3 · Kontrola

4. **Administrator sieci / NAC:** Potwierdź, że terminal płatniczy i pozostałe stanowiska działają.
   _Oczekiwany rezultat:_ Płatności działają
#### 4 · Rejestracja

5. **Administrator sieci / NAC:** Zapisz placówkę, stanowisko, MAC, port i godzinę w rejestrze izolacji.
   _Oczekiwany rezultat:_ Wpis

### Weryfikacja wykonania

Stanowisko nie ma ruchu poza VLAN/dACL kwarantanny; terminal płatniczy autoryzuje transakcje.

### Wycofanie

`PUT https://<ise>:9060/ers/config/ancendpoint/clear` po odtworzeniu stanowiska i DG5.

### Zapisy

Rejestr izolacji POS.

### Mapowanie na wymagania

- NIST CSF 2.0 – PR.IR-01
- NIST CSF 2.0 – RS.MI-01
- PCI DSS v4.0.1 – 12.10.1

---

## PR-POS-3 · Odtworzenie stanowisk POS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym

### Cel

Odtworzenie stanowisk POS z wzorcowych obrazów i czystej konfiguracji falami, z zachowaniem wymogów fiskalnych i PCI DSS.

### Zakres i wyzwalacz

Stanowiska POS, kasy samoobsługowe i serwery sklepowe w placówkach objętych incydentem.

**Wyzwalacz:** zatwierdzony złoty obraz POS, dostępność czystych systemów centralnych (dane podstawowe, ceny) lub decyzja o pracy offline po odtworzeniu.

### Warunki wstępne

- Złoty obraz POS z sumą kontrolną, zweryfikowany skanem (IN-BKP-1.1).
- Plan fal: placówki pilotażowe, następnie według obrotów i zapasów.
- Serwis fiskalny i POS dostępny dla placówek, w których wymagana jest interwencja na miejscu.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Plan fal odtwarzania | Administrator systemów sklepowych | Kierownik odtwarzania | Właściciel procesu biznesowego, Kierownik regionu | Zespół zarządzania kryzysowego |
| Odtworzenie stanowisk | Administrator systemów sklepowych, serwis POS | Kierownik odtwarzania | Dostawca | Kierownik placówki |
| Konfiguracja i dane podstawowe | Administrator systemów sklepowych | Kierownik odtwarzania | Administrator aplikacji | – |

### Przebieg

#### 1 · Plan

1. **Administrator systemów sklepowych:** Ustal plan fal: 2–3 placówki pilotażowe, następnie fale według priorytetu sprzedażowego; dla każdej fali wyznacz okno i osoby.
   _Oczekiwany rezultat:_ Plan fal zatwierdzony przez KO
#### 2 · Odtworzenie

2. **Administrator systemów sklepowych:** Odtwórz stanowiska według IN-POS-3.1.
   _Oczekiwany rezultat:_ Stanowiska z nowym obrazem
#### 3 · Konfiguracja

3. **Administrator systemów sklepowych:** Przywróć konfigurację stanowisk według IN-POS-3.2.
   _Oczekiwany rezultat:_ Konfiguracja przywrócona
4. **Administrator systemów sklepowych:** Odtwórz serwery sklepowe (jeśli występują) z obrazu i konfiguracji, nie z kopii sprzed incydentu bez weryfikacji.
   _Oczekiwany rezultat:_ Serwery sklepowe gotowe
#### 4 · Kontrola

5. **Administrator systemów sklepowych:** Wypełnij CL-POS-3 dla każdej placówki.
   _Oczekiwany rezultat:_ CL-POS-3

### Kryteria wyjścia

- Wszystkie stanowiska fali odtworzone i skonfigurowane.
- CL-POS-3 dla każdej placówki fali.

### Zapisy (dowody wykonania)

Plan fal, rejestr odtworzonych stanowisk (wersja obrazu, suma, godzina), CL-POS-3.

### Instrukcje i checklisty

- Instrukcja: **CL-POS-3 · Odtworzenie POS** (v0.1, projekt)
- Instrukcja: **IN-POS-3.1 · Odtworzenie terminala POS** (v0.1, projekt)
- Instrukcja: **IN-POS-3.2 · Przywrócenie konfiguracji POS** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.9
- ISO/IEC 27001:2022 – A.5.30
- NIST CSF 2.0 – RC.RP-02
- NIST SP 800-184 – TACT

---

## CL-POS-3 · Odtworzenie POS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym → PR-POS-3 · Odtworzenie stanowisk POS

### Zastosowanie

Dla każdej placówki w fali po PR-POS-3.

### Lista kontrolna

1. **Administrator systemów sklepowych:** Suma kontrolna złotego obrazu zweryfikowana
2. **Administrator systemów sklepowych:** Wszystkie stanowiska placówki odtworzone z obrazu
   _Oczekiwany rezultat:_ Liczba stanowisk
3. **Administrator systemów sklepowych:** Urządzenia fiskalne nienaruszone, wykryte
4. **Administrator systemów sklepowych:** Terminale płatnicze sparowane
5. **Administrator systemów sklepowych:** EDR aktywny, LAPS, brak narzędzi zdalnych spoza listy
6. **Administrator systemów sklepowych:** Identyfikacja stanowisk zgodna z rejestrem
7. **Administrator systemów sklepowych:** Dane podstawowe z dopuszczonego źródła
8. **Administrator systemów sklepowych:** Konta kasjerów skonfigurowane z nowymi hasłami

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator systemów sklepowych / serwis. Potwierdził: Kierownik placówki.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-02

---

## IN-POS-3.1 · Odtworzenie terminala POS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym → PR-POS-3 · Odtworzenie stanowisk POS

### Cel

Ponowna instalacja stanowiska POS z wzorcowego obrazu, z zachowaniem urządzenia fiskalnego i terminala płatniczego w niezmienionym stanie.

### Zastosowanie

Każde stanowisko POS naruszone lub podejrzane (PR-POS-3).

### Wymagane uprawnienia i narzędzia

- Złoty obraz POS z sumą SHA-256 i serwer wdrożeniowy w czystym segmencie lub nośnik USB przygotowany na stacji PAW.
- Lista stanowisk fali.
- Dla wymiany sprzętu – serwis POS; dla urządzeń fiskalnych – serwis uprawniony.

### Środki ostrożności

- Nie ingeruj w pamięć fiskalną drukarki / kasy – reinstalacja dotyczy wyłącznie komputera POS.
- Nie wymieniaj oprogramowania terminala płatniczego (PIN pad) – robi to wyłącznie dostawca terminali.
- Przed reinstalacją upewnij się, że dowody z reprezentatywnych stanowisk zostały zabezpieczone (PR-INF-3).

### Kroki

#### 1 · Obraz

1. **Administrator systemów sklepowych:** Zweryfikuj sumę kontrolną złotego obrazu przed wdrożeniem.

   ```
   Get-FileHash -Algorithm SHA256 <obraz-pos>.wim
   ```
   _Oczekiwany rezultat:_ Suma zgodna z rejestrem obrazów
#### 2 · Przygotowanie

2. **Administrator systemów sklepowych:** Odłącz od stanowiska urządzenie fiskalne i terminal płatniczy na czas instalacji (lub upewnij się, że instalacja ich nie dotyka).
   _Oczekiwany rezultat:_ Urządzenia peryferyjne zabezpieczone
#### 3 · Instalacja

3. **Administrator systemów sklepowych:** Zainstaluj obraz na stanowisku (wdrożenie sieciowe w segmencie kwarantanny-naprawczym lub z nośnika USB) z formatowaniem dysku.
   _Oczekiwany rezultat:_ System zainstalowany
#### 4 · Utwardzenie

4. **Administrator systemów sklepowych:** Zainstaluj aktualne poprawki i EDR (jeśli nie ma ich w obrazie), ustaw unikalne hasło administratora lokalnego (LAPS).
   _Oczekiwany rezultat:_ EDR aktywny, LAPS
5. **Administrator systemów sklepowych:** Sprawdź, że na stanowisku nie ma narzędzi zdalnego dostępu spoza zatwierdzonej listy.

   ```
   Get-Package | Where-Object Name -match "AnyDesk|TeamViewer|ScreenConnect|Atera"
   ```
   _Oczekiwany rezultat:_ Wynik pusty
#### 5 · Peryferia

6. **Administrator systemów sklepowych:** Podłącz urządzenie fiskalne i terminal płatniczy; sprawdź ich wykrycie przez system.
   _Oczekiwany rezultat:_ Urządzenia wykryte
#### 6 · Rejestracja

7. **Administrator systemów sklepowych:** Zapisz w rejestrze: placówka, kasa, wersja obrazu, suma, godzina, wykonawca.
   _Oczekiwany rezultat:_ Wpis

### Weryfikacja wykonania

Stanowisko uruchamia się z nowego obrazu, EDR raportuje, urządzenia peryferyjne wykryte.

### Wycofanie

Ponowna instalacja z obrazu; przy awarii sprzętu – stanowisko zapasowe.

### Zapisy

Rejestr odtworzonych stanowisk.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.9
- NIST CSF 2.0 – RC.RP-02

---

## IN-POS-3.2 · Przywrócenie konfiguracji POS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym → PR-POS-3 · Odtworzenie stanowisk POS

### Cel

Przywrócenie konfiguracji specyficznej dla placówki i stanowiska oraz załadowanie czystych danych podstawowych.

### Zastosowanie

Po odtworzeniu stanowiska z obrazu (IN-POS-3.1).

### Wymagane uprawnienia i narzędzia

Rejestr konfiguracji placówek (numer placówki, numer kasy, ustawienia urządzenia fiskalnego i terminala), dostęp do czystego serwera centralnego POS lub paczki danych podstawowych.

### Środki ostrożności

- Dane podstawowe (towary, ceny, promocje) ładuj wyłącznie z systemu dopuszczonego (DG5) lub z zweryfikowanej paczki.
- Nie przywracaj konfiguracji z plików z naruszonych stanowisk.

### Kroki

#### 1 · Identyfikacja

1. **Administrator systemów sklepowych:** Nadaj identyfikację stanowiska: numer placówki, numer kasy, nazwa hosta zgodna z konwencją.
   _Oczekiwany rezultat:_ Identyfikacja zgodna z rejestrem
#### 2 · Fiskalizacja

2. **Administrator systemów sklepowych:** Skonfiguruj komunikację z urządzeniem fiskalnym (port, protokół) i wykonaj wydruk niefiskalny testowy.
   _Oczekiwany rezultat:_ Wydruk testowy
#### 3 · Płatności

3. **Administrator systemów sklepowych:** Skonfiguruj integrację z terminalem płatniczym (parowanie według instrukcji dostawcy terminali).
   _Oczekiwany rezultat:_ Terminal sparowany
#### 4 · Dane podstawowe

4. **Administrator systemów sklepowych:** Załaduj dane podstawowe (towary, ceny, promocje, stawki VAT) z dopuszczonego systemu centralnego lub zweryfikowanej paczki.
   _Oczekiwany rezultat:_ Wersja danych zgodna z centralą
#### 5 · Użytkownicy

5. **Administrator systemów sklepowych:** Skonfiguruj konta kasjerów (nowe hasła / PIN) i uprawnienia (zwroty, anulacje) zgodnie z rolami.
   _Oczekiwany rezultat:_ Konta skonfigurowane
#### 6 · Integracje

6. **Administrator systemów sklepowych:** Skonfiguruj integracje: program lojalnościowy, karty podarunkowe, serwer sklepowy – na razie w trybie testowym.
   _Oczekiwany rezultat:_ Integracje skonfigurowane

### Weryfikacja wykonania

Stanowisko ma poprawną identyfikację, dane podstawowe w aktualnej wersji, komunikuje się z urządzeniem fiskalnym i terminalem.

### Wycofanie

Ponowne załadowanie konfiguracji z rejestru.

### Zapisy

Rejestr konfiguracji stanowiska, wersja danych podstawowych.

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.9
- NIST CSF 2.0 – RC.RP-02

---

## PR-POS-4 · Weryfikacja bezpieczeństwa i działania POS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym

### Cel

Potwierdzenie, że odtworzone stanowiska są bezpieczne i poprawnie realizują sprzedaż, płatności, wymagania fiskalne i komunikację z centralą.

### Zakres i wyzwalacz

Stanowiska i placówki z danej fali.

**Wyzwalacz:** zakończenie PR-POS-3 dla fali.

### Warunki wstępne

- Systemy centralne POS dopuszczone (DG5) lub decyzja o pracy offline.
- Scenariusz testów funkcjonalnych POS.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Weryfikacja bezpieczeństwa | SOC, Administrator systemów sklepowych | Kierownik incydentu | – | – |
| Testy funkcjonalne | Administrator systemów sklepowych, Kierownik placówki | Kierownik odtwarzania | Właściciel procesu biznesowego | – |
| Testy połączeń z centralą | Administrator systemów sklepowych | Kierownik odtwarzania | Administrator aplikacji | – |

### Przebieg

#### 1 · Bezpieczeństwo

1. **SOC:** Sprawdź, że EDR raportuje z każdego stanowiska w trybie blokowania, a skan IoC jest czysty.
   _Oczekiwany rezultat:_ Telemetria ze wszystkich stanowisk
2. **Administrator systemów sklepowych:** Sprawdź zgodność obrazu (suma kontrolna, wersja), lokalne konta administratora (unikalne hasła, np. LAPS), brak narzędzi zdalnego dostępu spoza listy.
   _Oczekiwany rezultat:_ Zgodność potwierdzona
#### 2 · Połączenia

3. **Administrator systemów sklepowych:** Wykonaj test połączenia POS z systemami centralnymi według IN-POS-4.1.
   _Oczekiwany rezultat:_ Połączenia działają
#### 3 · Funkcje

4. **Kierownik placówki:** Wykonaj testy funkcjonalne (CL-POS-4): sprzedaż gotówkowa i kartowa, zwrot, rabat programu lojalnościowego, raport dobowy.
   _Oczekiwany rezultat:_ CL-POS-4
#### 4 · Fiskalizacja

5. **Administrator systemów sklepowych:** Potwierdź przesyłanie danych z urządzeń fiskalnych do Centralnego Repozytorium Kas (kasy online) i brak zaległości.
   _Oczekiwany rezultat:_ Brak zaległości

### Kryteria wyjścia

- Bezpieczeństwo, połączenia i funkcje potwierdzone dla każdej placówki fali.

### Zapisy (dowody wykonania)

Wyniki weryfikacji, CL-POS-4 dla placówek.

### Instrukcje i checklisty

- Instrukcja: **CL-POS-4 · Testy funkcjonalne POS** (v0.1, projekt)
- Instrukcja: **IN-POS-4.1 · Test połączenia POS z systemami centralnymi** (v0.1, projekt)

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.8.7
- PCI DSS v4.0.1 – 12.10.1

---

## CL-POS-4 · Testy funkcjonalne POS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym → PR-POS-4 · Weryfikacja bezpieczeństwa i działania POS

### Zastosowanie

Testy wykonywane w placówce na każdym odtworzonym stanowisku.

### Lista kontrolna

1. **Kierownik placówki:** Logowanie kasjera
2. **Kierownik placówki:** Sprzedaż gotówkowa – paragon fiskalny poprawny
3. **Kierownik placówki:** Sprzedaż kartą – autoryzacja i wydruk potwierdzenia
4. **Kierownik placówki:** Płatność w aplikacji / BLIK (jeśli dotyczy)
5. **Kierownik placówki:** Zwrot towaru
6. **Kierownik placówki:** Rabat programu lojalnościowego naliczony
7. **Kierownik placówki:** Karta podarunkowa – sprawdzenie salda
8. **Kierownik placówki:** Ceny i promocje zgodne z centralą (próbka 10 produktów)
9. **Kierownik placówki:** Kasa samoobsługowa – pełna transakcja (jeśli dotyczy)
10. **Administrator systemów sklepowych:** Transakcje widoczne w centrali
11. **Administrator systemów sklepowych:** Raport dobowy i przesyłanie do CRK bez zaległości

### Kryteria zaliczenia

Wszystkie punkty spełnione dla każdego stanowiska.

### Zatwierdzenie

Wykonał: Kierownik placówki. Potwierdził: Administrator systemów sklepowych.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05

---

## IN-POS-4.1 · Test połączenia POS z systemami centralnymi

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym → PR-POS-4 · Weryfikacja bezpieczeństwa i działania POS

### Cel

Potwierdzenie poprawnej komunikacji odtworzonego stanowiska z systemami centralnymi i zewnętrznymi.

### Zastosowanie

Przed dopuszczeniem stanowiska (PR-POS-4).

### Wymagane uprawnienia i narzędzia

Dostęp do stanowiska (zdalnie po zabezpieczonym kanale lub na miejscu), dostęp do logów serwera centralnego POS.

### Środki ostrożności

Transakcje testowe wykonuj według procedury fiskalnej (paragony testowe / anulacje zgodnie z przepisami) i oznaczaj w raporcie.

### Kroki

#### 1 · Sieć

1. **Administrator systemów sklepowych:** Sprawdź łączność sieciową z serwerem centralnym POS i serwerem sklepowym.

   ```
   Test-NetConnection <serwer-pos> -Port <port>
   ```
   _Oczekiwany rezultat:_ TcpTestSucceeded: True
2. **Administrator systemów sklepowych:** Sprawdź synchronizację czasu (wymagana dla fiskalizacji i Kerberos).

   ```
   w32tm /query /status
   ```
   _Oczekiwany rezultat:_ Odchylenie < 1 s
#### 2 · Dane podstawowe

3. **Administrator systemów sklepowych:** Wymuś pobranie danych podstawowych i sprawdź wersję na stanowisku i w centrali.
   _Oczekiwany rezultat:_ Wersje zgodne
#### 3 · Sprzedaż

4. **Administrator systemów sklepowych:** Wykonaj transakcję testową i sprawdź jej przesłanie do centrali.
   _Oczekiwany rezultat:_ Transakcja w centrali
#### 4 · Płatności

5. **Administrator systemów sklepowych:** Sprawdź autoryzację płatności kartą (transakcja testowa według procedury agenta rozliczeniowego).
   _Oczekiwany rezultat:_ Autoryzacja poprawna
#### 5 · Lojalność

6. **Administrator systemów sklepowych:** Sprawdź naliczenie rabatu programu lojalnościowego i obsługę karty podarunkowej.
   _Oczekiwany rezultat:_ Integracje działają
#### 6 · Monitoring

7. **Administrator systemów sklepowych:** Sprawdź, że EDR i agent logów raportują do centrali.
   _Oczekiwany rezultat:_ Heartbeat aktywny

### Weryfikacja wykonania

Wszystkie połączenia działają; wynik zapisany w CL-POS-4.

### Wycofanie

Nie dotyczy.

### Zapisy

Wyniki testów połączeń dla stanowiska.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05

---

## PR-POS-5 · Dopuszczenie POS do eksploatacji

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym

### Cel

Formalne dopuszczenie stanowisk POS (DG5) dla każdej fali i przywrócenie normalnej pracy placówek.

### Zakres i wyzwalacz

Placówki z fali zweryfikowanej w PR-POS-4.

**Wyzwalacz:** zaliczone PR-POS-4 dla fali.

### Warunki wstępne

Bramka DG5 z polityki (kryteria dopuszczenia do produkcji) musi być spełniona w całości. Brak spełnienia któregokolwiek kryterium blokuje dopuszczenie – odstępstwo zatwierdza wyłącznie Kierownik incydentu wraz z właścicielem procesu i jest wpisywane do rejestru ryzyk.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Decyzja DG5 dla fali | Kierownik incydentu | Kierownik incydentu | Właściciel procesu biznesowego, Administrator systemów sklepowych | Zespół zarządzania kryzysowego |
| Przywrócenie połączenia z siecią produkcyjną | Administrator sieci / NAC, Administrator systemów sklepowych | Kierownik odtwarzania | SOC | Kierownik placówki |
| Uzgodnienie sprzedaży z trybu awaryjnego | Kierownik placówki, finanse | Właściciel procesu biznesowego | Administrator systemów sklepowych | – |
| Komunikacja z placówkami i klientami | Kierownik regionu, Komunikacja | Zespół zarządzania kryzysowego | – | klienci |

### Przebieg

#### 1 · Decyzja

1. **Kierownik incydentu:** Podejmij decyzję DG5 dla fali (kryteria z CL-APP-5 w zakresie POS).
   _Oczekiwany rezultat:_ Wpis DG5 dla fali
#### 2 · Sieć

2. **Administrator sieci / NAC:** Przywróć połączenie placówek z siecią produkcyjną według IN-POS-5.1.
   _Oczekiwany rezultat:_ Placówki połączone
#### 3 · Uzgodnienia

3. **Administrator systemów sklepowych:** Prześlij do centrali dane sprzedaży z trybu offline i uzgodnij je z raportami dobowymi.
   _Oczekiwany rezultat:_ Brak rozbieżności
#### 4 · Normalna praca

4. **Kierownik placówki:** Przywróć pełną obsługę: zwroty, karty podarunkowe, rabaty programu lojalnościowego; zarchiwizuj rejestr papierowy.
   _Oczekiwany rezultat:_ Pełna obsługa
#### 5 · Narzędzia

5. **Administrator systemów sklepowych:** Włącz system dystrybucji oprogramowania i zdalnego dostępu tylko w nowej, zabezpieczonej konfiguracji (MFA, ograniczone konta, zatwierdzanie wdrożeń).
   _Oczekiwany rezultat:_ Narzędzia w bezpiecznej konfiguracji
#### 6 · Monitoring

6. **SOC:** Wzmożony monitoring stanowisk POS przez 30 dni.
   _Oczekiwany rezultat:_ Monitoring aktywny

### Kryteria wyjścia

- DG5 dla wszystkich fal, placówki w normalnej pracy, dane sprzedaży uzgodnione.

### Zapisy (dowody wykonania)

Wpisy DG5 dla fal, raporty uzgodnień sprzedaży, rejestr przywrócenia placówek.

### Instrukcje i checklisty

- Instrukcja: **IN-POS-5.1 · Przywrócenie połączenia z siecią produkcyjną** (v0.1, projekt)

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- NIST CSF 2.0 – RC.RP-06
- NIST CSF 2.0 – RC.CO-03
- ISO/IEC 27001:2022 – A.8.32

---

## IN-POS-5.1 · Przywrócenie połączenia z siecią produkcyjną

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów sklepowych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym → PR-POS-5 · Dopuszczenie POS do eksploatacji

### Cel

Ponowne połączenie placówek i stanowisk z siecią produkcyjną centrali w kontrolowany sposób, falami.

### Zastosowanie

Po DG5 dla fali (PR-POS-5).

### Wymagane uprawnienia i narzędzia

Uprawnienia do SD-WAN, zapór, NAC; lista placówek fali.

### Środki ostrożności

Placówka łączy się z centralą tylko, gdy wszystkie jej stanowiska są odtworzone lub odizolowane.

### Kroki

#### 1 · Warunki

1. **Administrator sieci / NAC:** Sprawdź, że wszystkie stanowiska placówki mają status „dopuszczone” lub „odizolowane”.
   _Oczekiwany rezultat:_ Brak stanowisk niezweryfikowanych
#### 2 · NAC

2. **Administrator sieci / NAC:** Zdejmij kwarantannę NAC z odtworzonych stanowisk (CoA).

   ```
   PUT https://<ise>:9060/ers/config/ancendpoint/clear
   {"OperationAdditionalData":{"additionalData":[{"name":"macAddress","value":"<MAC>"}]}}
   ```
   _Oczekiwany rezultat:_ Sesje w profilu produkcyjnym
#### 3 · SD-WAN

3. **Administrator sieci / NAC:** Przywróć połączenie placówki z centralą na SD-WAN z docelową polityką przepływów (tylko usługi POS, monitoring, aktualizacje).
   _Oczekiwany rezultat:_ Placówka połączona
#### 4 · Monitoring

4. **SOC:** Monitoruj placówkę przez 1 h po połączeniu (alerty EDR, ruch nietypowy).
   _Oczekiwany rezultat:_ Brak alertów
#### 5 · Rejestracja

5. **Administrator sieci / NAC:** Zapisz godzinę połączenia placówki w rejestrze fal.
   _Oczekiwany rezultat:_ Wpis

### Weryfikacja wykonania

Placówka komunikuje się z centralą tylko w zakresie docelowej polityki; brak alertów przez 1 h.

### Wycofanie

Ponowne odcięcie placówki na SD-WAN przy alercie.

### Zapisy

Rejestr fal z godzinami połączenia.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.8.20
- ISO/IEC 27001:2022 – A.8.32

---

## PL-WMS · Plan reagowania na ransomware w systemie WMS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Plan | biznesowo-techniczna | 0.1 | projekt | Dyrektor logistyki | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware

### 1. Cel i zakres

Plan opisuje reakcję na ransomware w systemie zarządzania magazynem (WMS) i jego otoczeniu: serwerach aplikacyjnych i bazodanowych, systemie sterowania przepływem (WCS), terminalach i skanerach, drukarkach etykiet oraz integracjach z ERP, transportem i automatyką. Celem jest bezpieczne utrzymanie zaopatrzenia placówek i odtworzenie spójnych stanów magazynowych.

### 2. Scenariusz

Szyfrowanie serwerów WMS lub bazy WMS zatrzymuje przyjęcia, kompletację i wydania. Automatyka magazynowa (magazyny wysokiego składowania, shuttle, sortery) może stanąć z powodu braku poleceń z WMS/WCS. Atakujący może próbować dostać się do sieci OT.

### 2a. Specyfika Rossmann Polska

- Centra dystrybucyjne: Łódź (ok. 66 tys. m²), Pyskowice (rozbudowa do 66 tys. m² z automatyką Körber: magazyn wysokiego składowania ok. 27 tys. miejsc paletowych i magazyny shuttle), Grudziądz, Zgierz, Dąbrówka Wielka.
- Automatyka w Pyskowicach ma własne sterowanie (WCS) – tryb awaryjny i procedurę bezpiecznego zatrzymania ustala się z dostawcą automatyki.
- Zapas w drogeriach wystarcza na kilka dni – MTPD zaopatrzenia przyjęto na 72 h.
- Alternatywa: przekierowanie części dostaw do innego centrum dystrybucyjnego (decyzja ZZK).

### 3. Sygnały wykrycia i wskaźniki naruszenia

- Brak odpowiedzi WMS na terminalach i skanerach, błędy wydruku etykiet.
- Zatrzymanie automatyki z powodu braku komunikacji z WCS.
- Notatki okupu na serwerach WMS, zaszyfrowana baza.
- Niespójności stanów, zatrzymane kolejki integracyjne z ERP i transportem.

### 4. Zasoby objęte planem

| System | Technologie | Wymagane RTO / RPO | Osiągalne RTO / RPO | Kopie | Ośrodek zapasowy |
|---|---|---|---|---|---|
| WMS i sterowanie automatyką centrów dystrybucyjnych | VMware vSphere / SRM, Microsoft SQL Server, Veeam Backup & Replication | 24 h / 4 h | 24 h / 4 h | Kopia co 4 h | Brak – do analizy |

### 5. Wpływ na procesy biznesowe i cele odtworzenia

| Proces | Właściciel | Krytyczność | MTPD | RTO | RPO | MBCO |
|---|---|---|---|---|---|---|
| Zaopatrzenie drogerii z centrów dystrybucyjnych | Dyrektor logistyki | 5 – krytyczna | 3 d | 24 h | 4 h | Dostawy uzupełniające produktów o najwyższej rotacji do drogerii z najniższym zapasem |

### 6. Kryteria aktywacji i klasyfikacja

Aktywacja przy niedostępności WMS z przyczyn bezpieczeństwa lub potwierdzeniu szyfrowania komponentu WMS. Kategoria K1 przy zatrzymaniu centrum dystrybucyjnego.

### 7. Organizacja reagowania

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Ocena wpływu na WMS | Administrator systemów logistycznych, Zespół reagowania (CSIRT) | Kierownik incydentu | Właściciel procesu biznesowego, Dostawca | Zespół zarządzania kryzysowego |
| Izolacja komponentów WMS i OT | Administrator systemów logistycznych, Administrator sieci / NAC | Kierownik incydentu | Dostawca | Zespół zarządzania kryzysowego |
| Tryb ręczny centrum dystrybucyjnego | Kierownicy zmian CD | Właściciel procesu biznesowego | Administrator systemów logistycznych | Zespół zarządzania kryzysowego |
| Odtworzenie WMS | Administrator systemów logistycznych, Administrator baz danych, Dostawca | Kierownik odtwarzania | Kierownik incydentu | Zespół zarządzania kryzysowego |
| Weryfikacja stanów i integracji | Administrator systemów logistycznych, Właściciel procesu biznesowego | Kierownik odtwarzania | Dostawca | Kierownik incydentu |
| Dopuszczenie WMS | Administrator systemów logistycznych | Kierownik incydentu | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego |

### 8. Przebieg reagowania

| Faza | Cel | Procedura | Cel czasowy |
|---|---|---|---|
| Ocena | zakres, wpływ na operacje i automatykę | PR-WMS-1 | 1 h |
| Izolacja | odcięcie WMS, ochrona OT, kwarantanna terminali | PR-WMS-2 | 30 min od DG0 |
| Odtworzenie | serwery, baza, usługi WMS w IRE | PR-WMS-3 | według RTO zaopatrzenia |
| Weryfikacja | stany magazynowe, integracje | PR-WMS-4 | przed DG5 |
| Dopuszczenie | integracje, automatyka, praca ciągła | PR-WMS-5 | DG5 |

### 9. Ciągłość działania w trakcie incydentu

- Automatykę zatrzymuje się w stanie bezpiecznym według instrukcji producenta; bezpieczeństwo ludzi w strefach automatyki ma pierwszeństwo.
- Centrum dystrybucyjne przechodzi w tryb ręczny: papierowe listy kompletacyjne priorytetowych produktów dla placówek z najniższym zapasem, ręczne etykiety, rejestr wydań, harmonogram ramp uzgadniany telefonicznie z przewoźnikami.
- Planowanie dostaw korzysta z ostatniego czystego eksportu stanów lub danych z ERP.
- ZZK rozważa przekierowanie dostaw z innego centrum dystrybucyjnego.

### 10. Punkty decyzyjne

- DG1: odcięcie WMS od sieci OT i ERP; zatrzymanie automatyki.
- Uruchomienie trybu ręcznego i jego zakres (lista placówek i produktów).
- DG2: punkt odtworzenia bazy WMS i sposób uzgodnienia ruchów z trybu ręcznego.
- Konieczność inwentaryzacji (pełnej lub cyklicznej) przed dopuszczeniem.

### 11. Komunikacja i obowiązki raportowe

Komunikację wewnętrzną prowadzi się kanałem pozapasmowym. Komunikaty do pracowników, klientów, dostawców i mediów zatwierdza przewodniczący ZZK. Kierownik incydentu raportuje stan co 2 h w fazie ograniczania i co 4 h w fazie odtwarzania (CSF RC.CO-03). Przewoźnicy i placówki otrzymują informację o zmienionym harmonogramie dostaw.

| Reżim | Odbiorca | Raport | Termin |
|---|---|---|---|
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Wczesne ostrzeżenie | 24 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Zgłoszenie incydentu | 72 h |
| NIS2 / KSC – poważny incydent | CSIRT właściwy / organ właściwy | Sprawozdanie końcowe | miesiąc od zgłoszenia incydentu |
| RODO – naruszenie ochrony danych | Prezes UODO | Zgłoszenie naruszenia | 72 h – od stwierdzenia naruszenia; zawiadomienie osób (art. 34) bez zbędnej zwłoki przy wysokim ryzyku |

Terminy są uproszczeniem – zweryfikuj z aktualnymi przepisami i aktami wykonawczymi.

### 12. Kryteria zakończenia

- WMS odtworzony, stany magazynowe uzgodnione ze stanem fizycznym w zakresie ustalonym przez właściciela procesu.
- Integracje z ERP, transportem i automatyką działają, kolejki rozładowane bez błędów.
- Ruchy z trybu ręcznego zaksięgowane.
- DG5 spełniona.

### 13. Błędy, których należy unikać

- Ponowne uruchomienie automatyki bez potwierdzenia stanów lokalizacji (kolizje, błędne kompletacje).
- Przyłączenie odtworzonego WMS do zainfekowanej sieci OT lub ERP.
- Odtworzenie integracji bez kontroli duplikatów komunikatów.
- Brak ewidencji ruchów w trybie ręcznym.

### 14. Procedury, instrukcje i checklisty

- Procedura: **PR-WMS-1 · Ocena wpływu incydentu na WMS** (v0.1, projekt)
- Procedura: **PR-WMS-2 · Izolacja zagrożonych komponentów WMS** (v0.1, projekt)
- Procedura: **PR-WMS-3 · Odtworzenie systemu WMS** (v0.1, projekt)
- Procedura: **PR-WMS-4 · Weryfikacja integralności danych magazynowych** (v0.1, projekt)
- Procedura: **PR-WMS-5 · Dopuszczenie WMS do eksploatacji** (v0.1, projekt)

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.4
- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.5.29
- ISO/IEC 27001:2022 – A.8.22
- ISO/IEC 27031 – IRBC-3
- NIST CSF 2.0 – RC.RP-02
- NIST CSF 2.0 – RC.RP-04
- NIST CSF 2.0 – RC.RP-05
- NIS2 – dyrektywa (UE) 2022/2555 – art. 21(2)(c)

---

## PR-WMS-1 · Ocena wpływu incydentu na WMS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS

### Cel

Ustalenie stanu komponentów WMS i otoczenia (WCS, automatyka, terminale, integracje), wpływu na operacje centrów dystrybucyjnych i zaopatrzenie placówek oraz decyzja o trybie ręcznym.

### Zakres i wyzwalacz

Serwery i baza WMS, system sterowania przepływem (WCS), sieć OT automatyki, terminale ręczne i pojazdowe, drukarki etykiet, integracje z ERP, transportem (TMS) i dostawcami (EDI) we wszystkich centrach dystrybucyjnych.

**Wyzwalacz:** niedostępność WMS z oznakami szyfrowania lub przejęcia, alert EDR w strefie WMS, zatrzymanie automatyki z przyczyn nieustalonych.

### Warunki wstępne

- Mapa architektury WMS i stref OT (strefy i kanały zgodnie z IEC 62443) przechowywana offline.
- Kontakty dyżurowe dostawcy WMS i automatyki.
- Wskaźniki zaopatrzenia: zapas w placówkach (dni), plan wysyłek.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Stan komponentów WMS | Administrator systemów logistycznych, Zespół reagowania (CSIRT) | Kierownik incydentu | Dostawca | – |
| Stan automatyki i bezpieczeństwo ludzi | Kierownik utrzymania ruchu CD | Właściciel procesu biznesowego | Dostawca | Kierownik incydentu |
| Wpływ na zaopatrzenie placówek | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego | planowanie dostaw | Kierownik incydentu |
| Decyzja o trybie ręcznym | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego | Kierownik incydentu, Administrator systemów logistycznych | placówki, przewoźnicy |

### Przebieg

#### 1 · Bezpieczeństwo

1. **Kierownik utrzymania ruchu CD:** Potwierdź bezpieczeństwo ludzi w strefach automatyki; jeśli automatyka pracuje nieprzewidywalnie – zatrzymaj ją w stanie bezpiecznym według instrukcji producenta.
   _Oczekiwany rezultat:_ Strefy bezpieczne
#### 2 · Stan

2. **Administrator systemów logistycznych:** Sporządź tabelę stanu: serwery aplikacyjne i baza WMS, WCS, serwery wydruku, kontroler sieci bezprzewodowej, MDM terminali, integracje.
   _Oczekiwany rezultat:_ Tabela stanu komponentów
3. **Administrator systemów logistycznych:** Sprawdź stan kolejek integracyjnych (ERP, TMS, EDI, WCS): ostatni przetworzony komunikat w każdą stronę.
   _Oczekiwany rezultat:_ Stan kolejek z godzinami
#### 3 · OT

4. **Zespół reagowania (CSIRT):** Oceń, czy atakujący miał dostęp do sieci OT lub WCS (połączenia z segmentu WMS do OT, zdalny dostęp dostawcy automatyki).
   _Oczekiwany rezultat:_ Ocena zagrożenia dla OT
#### 4 · Wpływ

5. **Właściciel procesu biznesowego:** Oceń wpływ: dzienne wolumeny, zapas w placówkach, przyjęcia od dostawców, wysyłki zaplanowane na 72 h, czas do przekroczenia MTPD.
   _Oczekiwany rezultat:_ Ocena wpływu z liczbami
#### 5 · Decyzje

6. **Właściciel procesu biznesowego:** Zdecyduj o trybie ręcznym centrum dystrybucyjnego (PL-WMS, rozdz. 9) i zakresie: lista placówek, produktów, zmian.
   _Oczekiwany rezultat:_ Decyzja o trybie ręcznym
7. **Zespół zarządzania kryzysowego:** Rozważ przekierowanie dostaw z innego centrum dystrybucyjnego i poinformuj przewoźników.
   _Oczekiwany rezultat:_ Decyzja ZZK
#### 6 · Podsumowanie

8. **Kierownik incydentu:** Wypełnij CL-WMS-1 i podejmij decyzje DG1/DG2 dla WMS.
   _Oczekiwany rezultat:_ CL-WMS-1

### Kryteria wyjścia

- Bezpieczeństwo ludzi potwierdzone, stan komponentów i kolejek znany.
- Tryb ręczny uruchomiony lub uzasadniona decyzja o jego braku.
- Decyzje DG1/DG2 zapisane.

### Zapisy (dowody wykonania)

Tabela stanu, stan kolejek, ocena wpływu, decyzja o trybie ręcznym, CL-WMS-1.

### Instrukcje i checklisty

- Instrukcja: **CL-WMS-1 · Ocena wpływu na WMS** (v0.1, projekt)

### Mapowanie na wymagania

- ISO 22301:2019 – 8.4.4
- ISO/IEC 27001:2022 – A.5.25
- NIST CSF 2.0 – RS.AN-08
- NIST CSF 2.0 – RC.RP-04

---

## CL-WMS-1 · Ocena wpływu na WMS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS → PR-WMS-1 · Ocena wpływu incydentu na WMS

### Zastosowanie

Podsumowanie PR-WMS-1.

### Lista kontrolna

1. **Kierownik utrzymania ruchu CD:** Bezpieczeństwo ludzi w strefach automatyki potwierdzone
2. **Administrator systemów logistycznych:** Stan serwerów, bazy, WCS, terminali i drukarek ustalony
3. **Administrator systemów logistycznych:** Stan kolejek integracyjnych zapisany
4. **Zespół reagowania (CSIRT):** Zagrożenie dla sieci OT ocenione
5. **Właściciel procesu biznesowego:** Zapas w placówkach i plan wysyłek 72 h ocenione
6. **Właściciel procesu biznesowego:** Czas do MTPD zaopatrzenia oszacowany
7. **Właściciel procesu biznesowego:** Decyzja o trybie ręcznym i jego zakresie
8. **Zespół zarządzania kryzysowego:** Decyzja o przekierowaniu dostaw z innego CD
9. **Kierownik incydentu:** Decyzje DG1/DG2 zapisane

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator systemów logistycznych i właściciel procesu. Zatwierdził: Kierownik incydentu.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.AN-08
- ISO 22301:2019 – 8.4.4

---

## PR-WMS-2 · Izolacja zagrożonych komponentów WMS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS

### Cel

Odcięcie zainfekowanych komponentów WMS i ochrona sieci OT automatyki przy zachowaniu bezpieczeństwa ludzi i możliwości pracy ręcznej.

### Zakres i wyzwalacz

Serwery WMS, WCS, terminale, drukarki, połączenia z ERP, TMS, EDI i siecią OT.

**Wyzwalacz:** decyzja DG1 po PR-WMS-1 lub natychmiast przy aktywnym szyfrowaniu w strefie WMS.

### Warunki wstępne

- Uzgodnienie z kierownikiem utrzymania ruchu – automatyka w stanie bezpiecznym.
- Dostęp do EDR, NAC, zapór między strefami IT/OT i kontrolera sieci bezprzewodowej.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Izolacja serwerów WMS | Administrator systemów logistycznych, SOC | Kierownik incydentu | Dostawca | – |
| Odcięcie IT/OT | Administrator sieci / NAC | Kierownik incydentu | Kierownik utrzymania ruchu CD | Właściciel procesu biznesowego |
| Kwarantanna urządzeń klienckich | Administrator sieci / NAC | Kierownik incydentu | Administrator systemów logistycznych | kierownicy zmian |
| Wstrzymanie integracji | Administrator systemów logistycznych | Kierownik odtwarzania | właściciele ERP i TMS | – |

### Przebieg

#### 1 · OT

1. **Administrator sieci / NAC:** Zablokuj ruch między siecią IT a siecią OT automatyki na zaporze strefowej (kanał IT/OT), z wyjątkiem uzgodnionego kanału bezpieczeństwa producenta.
   _Oczekiwany rezultat:_ Kanał IT/OT zamknięty
2. **Administrator sieci / NAC:** Wyłącz zdalny dostęp dostawców WMS i automatyki do czasu weryfikacji.
   _Oczekiwany rezultat:_ Dostęp zdalny wyłączony
#### 2 · Serwery

3. **Administrator systemów logistycznych:** Odizoluj serwery WMS według IN-WMS-2.1.
   _Oczekiwany rezultat:_ Serwery odizolowane
#### 3 · Urządzenia klienckie

4. **Administrator sieci / NAC:** Poddaj kwarantannie urządzenia klienckie WMS (terminale, stacje operatorów, drukarki) według IN-WMS-2.2.
   _Oczekiwany rezultat:_ Urządzenia w kwarantannie
#### 4 · Integracje

5. **Administrator systemów logistycznych:** Wstrzymaj integracje WMS z ERP, TMS i EDI po stronie systemów zewnętrznych; zapisz stan kolejek.
   _Oczekiwany rezultat:_ Integracje wstrzymane
#### 5 · Weryfikacja

6. **SOC:** Zweryfikuj skuteczność izolacji (IN-INF-2.4), w tym brak ruchu do sieci OT.
   _Oczekiwany rezultat:_ Raport weryfikacji

### Kryteria wyjścia

- Komponenty WMS odizolowane, sieć OT odcięta od IT, urządzenia klienckie w kwarantannie.
- Integracje wstrzymane, tryb ręczny działa.

### Zapisy (dowody wykonania)

Rejestr izolacji, zmiany reguł IT/OT, stan kolejek, raport weryfikacji.

### Instrukcje i checklisty

- Instrukcja: **IN-WMS-2.1 · Izolacja serwera WMS** (v0.1, projekt)
- Instrukcja: **IN-WMS-2.2 · Kwarantanna zagrożonych urządzeń klienckich WMS w NAC** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.5.26
- ISO/IEC 27001:2022 – A.8.22
- NIST CSF 2.0 – RS.MI-01
- NIST CSF 2.0 – PR.IR-01

---

## IN-WMS-2.1 · Izolacja serwera WMS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS → PR-WMS-2 · Izolacja zagrożonych komponentów WMS

### Cel

Odcięcie serwerów aplikacyjnych i bazy WMS od sieci przy zachowaniu stanu do analizy.

### Zastosowanie

Serwery WMS w zakresie PR-WMS-2.

### Wymagane uprawnienia i narzędzia

Uprawnienia do EDR i konsoli wirtualizacji; uzgodnienie z kierownikiem utrzymania ruchu.

### Środki ostrożności

- Odcięcie WMS zatrzymuje WCS – automatyka musi być wcześniej w stanie bezpiecznym.
- Nie wyłączaj serwerów.

### Kroki

#### 1 · Bezpieczeństwo

1. **Kierownik utrzymania ruchu CD:** Potwierdź, że automatyka jest zatrzymana w stanie bezpiecznym lub pracuje w trybie lokalnym.
   _Oczekiwany rezultat:_ Potwierdzenie
#### 2 · Dowód

2. **Administrator systemów logistycznych:** Zapisz stan połączeń serwerów WMS (dowód).

   ```
   Get-NetTCPConnection -State Established | Export-Csv E:\<nr>\<host>-tcp.csv -NoTypeInformation
   ```
   _Oczekiwany rezultat:_ Plik stanu
#### 3 · Izolacja

3. **SOC:** Odizoluj serwery WMS w EDR (IN-INF-2.1).
   _Oczekiwany rezultat:_ Status: odizolowany
4. **Administrator systemów logistycznych:** Odłącz karty sieciowe VM serwerów WMS (lub porty przełącznika dla serwerów fizycznych).

   ```
   Get-VM "<serwer-wms>" | Get-NetworkAdapter | Set-NetworkAdapter -Connected:$false -Confirm:$false
   ```
   _Oczekiwany rezultat:_ Brak łączności
#### 4 · Dowody

5. **Administrator systemów logistycznych:** Wykonaj migawki VM z pamięcią dla dowodów (PR-INF-3).
   _Oczekiwany rezultat:_ Migawki utworzone
#### 5 · Rejestracja

6. **Administrator systemów logistycznych:** Zapisz w rejestrze izolacji serwery, metodę, godzinę, wykonawcę.
   _Oczekiwany rezultat:_ Wpis

### Weryfikacja wykonania

Brak ruchu z serwerów WMS do sieci IT i OT (logi zapór, IN-INF-2.4).

### Wycofanie

Naruszone serwery nie wracają do produkcji – zastępuje je odtworzony WMS.

### Zapisy

Rejestr izolacji, plik stanu.

### Mapowanie na wymagania

- NIST CSF 2.0 – RS.MI-01

---

## IN-WMS-2.2 · Kwarantanna zagrożonych urządzeń klienckich WMS w NAC

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS → PR-WMS-2 · Izolacja zagrożonych komponentów WMS

### Cel

Odcięcie terminali, stacji operatorów i drukarek WMS od sieci produkcyjnej, aby nie przenosiły zagrożenia i nie łączyły się z naruszonymi serwerami.

### Zastosowanie

Urządzenia klienckie WMS w centrach dystrybucyjnych (sieć przewodowa i bezprzewodowa).

### Wymagane uprawnienia i narzędzia

Uprawnienia do NAC (np. Cisco ISE), kontrolera sieci bezprzewodowej i MDM terminali.

### Środki ostrożności

Kwarantanna wszystkich terminali uniemożliwia skanowanie w trybie ręcznym – tryb ręczny opiera się na listach papierowych i etykietach ręcznych.

### Kroki

#### 1 · NAC

1. **Administrator sieci / NAC:** Utwórz w NAC grupę tożsamości urządzeń WMS (profil urządzenia, SSID magazynowy) i zastosuj profil kwarantanny dla całej grupy.
   _Oczekiwany rezultat:_ Grupa w profilu kwarantanny
2. **Administrator sieci / NAC:** Wymuś ponowną autoryzację sesji bezprzewodowych i przewodowych (CoA).
   _Oczekiwany rezultat:_ Sesje w VLAN/dACL kwarantanny
#### 2 · Stacje

3. **Administrator sieci / NAC:** Stacje operatorów z oznakami infekcji – kwarantanna ANC pojedynczo (IN-INF-2.2) i izolacja w EDR.
   _Oczekiwany rezultat:_ Stacje odizolowane
#### 3 · MDM

4. **Administrator systemów logistycznych:** W MDM zablokuj terminale i wstrzymaj wdrażanie aplikacji do czasu odtworzenia.
   _Oczekiwany rezultat:_ Terminale zablokowane
#### 4 · Rejestracja

5. **Administrator sieci / NAC:** Zapisz grupy i urządzenia w kwarantannie w rejestrze izolacji.
   _Oczekiwany rezultat:_ Wpis

### Weryfikacja wykonania

NAC pokazuje profil kwarantanny dla wszystkich urządzeń grupy; brak ruchu urządzeń do serwerów WMS w logach zapór.

### Wycofanie

Zdjęcie kwarantanny po odtworzeniu terminali i DG5 (PR-WMS-5).

### Zapisy

Rejestr izolacji, lista urządzeń.

### Mapowanie na wymagania

- NIST CSF 2.0 – PR.IR-01
- NIST CSF 2.0 – RS.MI-01

---

## PR-WMS-3 · Odtworzenie systemu WMS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS

### Cel

Odtworzenie WMS (baza, serwery, usługi) z czystych źródeł w IRE we współpracy z dostawcą.

### Zakres i wyzwalacz

Baza WMS, serwery aplikacyjne i usługi WMS, WCS (jeśli naruszony), serwery wydruku i konfiguracja terminali.

**Wyzwalacz:** decyzja DG2 dla WMS, dostępność tożsamości i czystych punktów kopii.

### Warunki wstępne

- IRE z segmentem WMS; zatwierdzone punkty kopii (PR-BKP-3).
- Dostawca WMS dostępny (wersje, licencje, procedury instalacji).
- Rejestry ruchów z trybu ręcznego zabezpieczone.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Odtworzenie bazy WMS | Administrator baz danych, Administrator systemów logistycznych | Kierownik odtwarzania | Dostawca | Kierownik incydentu |
| Odtworzenie serwerów i usług | Administrator systemów logistycznych, Dostawca | Kierownik odtwarzania | Zespół reagowania (CSIRT) | Kierownik incydentu |
| Akceptacja punktu odtworzenia | Właściciel procesu biznesowego | Właściciel procesu biznesowego | Administrator systemów logistycznych | Zespół zarządzania kryzysowego |

### Przebieg

#### 1 · Akceptacja

1. **Właściciel procesu biznesowego:** Zaakceptuj punkt odtworzenia bazy WMS i plan uzgodnienia ruchów od tego punktu (dane z ERP, TMS, trybu ręcznego).
   _Oczekiwany rezultat:_ Akceptacja
#### 2 · Baza

2. **Administrator baz danych:** Odtwórz bazę WMS według IN-WMS-3.2.
   _Oczekiwany rezultat:_ Baza odtworzona
#### 3 · Serwery i usługi

3. **Administrator systemów logistycznych:** Odtwórz serwery i usługi WMS według IN-WMS-3.1.
   _Oczekiwany rezultat:_ Usługi WMS działają w IRE
#### 4 · WCS / automatyka

4. **Administrator systemów logistycznych:** Z dostawcą automatyki zweryfikuj WCS i sterowniki: integralność oprogramowania i konfiguracji, porównanie z kopią wzorcową.
   _Oczekiwany rezultat:_ WCS zweryfikowany lub odtworzony
#### 5 · Urządzenia

5. **Administrator systemów logistycznych:** Przygotuj terminale: reset do ustawień fabrycznych przez MDM i ponowne wdrożenie profilu z nowymi poświadczeniami.
   _Oczekiwany rezultat:_ Terminale gotowe
#### 6 · Kontrola

6. **Administrator systemów logistycznych:** Wypełnij CL-WMS-3.
   _Oczekiwany rezultat:_ CL-WMS-3

### Kryteria wyjścia

- WMS działa w IRE z czystej bazy, z nowymi poświadczeniami.
- WCS i terminale zweryfikowane.

### Zapisy (dowody wykonania)

Dziennik odtworzenia, akceptacja punktu, protokół weryfikacji WCS, CL-WMS-3.

### Instrukcje i checklisty

- Instrukcja: **CL-WMS-3 · Odtworzenie WMS** (v0.1, projekt)
- Instrukcja: **IN-WMS-3.1 · Odtworzenie serwera i usług WMS** (v0.1, projekt)
- Instrukcja: **IN-WMS-3.2 · Odtworzenie bazy danych WMS** (v0.1, projekt)

### Mapowanie na wymagania

- ISO/IEC 27001:2022 – A.8.13
- ISO/IEC 27001:2022 – A.5.30
- ISO/IEC 27031 – IRBC-3
- NIST CSF 2.0 – RC.RP-02
- NIST CSF 2.0 – RC.RP-03
- NIST SP 800-184 – TACT

---

## CL-WMS-3 · Odtworzenie WMS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS → PR-WMS-3 · Odtworzenie systemu WMS

### Zastosowanie

Kontrola po PR-WMS-3.

### Lista kontrolna

1. **Właściciel procesu biznesowego:** Punkt odtworzenia zaakceptowany
2. **Administrator baz danych:** Baza WMS odtworzona i spójna
3. **Administrator systemów logistycznych:** Punkt startowy uzgodnień zapisany
4. **Administrator systemów logistycznych:** Zadania automatyczne wyłączone
5. **Administrator systemów logistycznych:** Serwery i usługi WMS odtworzone z zaufanych źródeł
6. **Administrator systemów logistycznych:** Nowe sekrety wprowadzone
7. **Administrator systemów logistycznych:** WCS i sterowniki zweryfikowane z dostawcą
8. **Administrator systemów logistycznych:** Terminale zresetowane i przygotowane w MDM
9. **Zespół reagowania (CSIRT):** Skan IoC/YARA bez wykryć

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator systemów logistycznych. Zatwierdził: Kierownik odtwarzania.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-02

---

## IN-WMS-3.1 · Odtworzenie serwera i usług WMS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS → PR-WMS-3 · Odtworzenie systemu WMS

### Cel

Uruchomienie serwerów aplikacyjnych i usług WMS w IRE z zaufanych źródeł we współpracy z dostawcą.

### Zastosowanie

Odtwarzanie WMS w PR-WMS-3.

### Wymagane uprawnienia i narzędzia

- Złote obrazy systemów, pakiety instalacyjne WMS w zatwierdzonej wersji (od dostawcy, z sumami).
- Konfiguracja WMS z repozytorium lub dokumentacji, licencje, nowe sekrety.
- Dostęp dostawcy przez stację pośredniczącą z nagrywaniem sesji.

### Środki ostrożności

Dostawca pracuje wyłącznie w IRE, przez kontrolowany dostęp, na kontach utworzonych na czas odtworzenia.

### Kroki

#### 1 · System

1. **Administrator systemów logistycznych:** Wdróż serwery aplikacyjne WMS ze złotych obrazów, z poprawkami, EDR i agentem logów.
   _Oczekiwany rezultat:_ Serwery gotowe
#### 2 · Instalacja

2. **Administrator systemów logistycznych:** Zainstaluj WMS z pakietów dostawcy po weryfikacji sum kontrolnych.

   ```
   Get-FileHash -Algorithm SHA256 <pakiet>
   ```
   _Oczekiwany rezultat:_ Sumy zgodne z deklaracją dostawcy
#### 3 · Konfiguracja

3. **Administrator systemów logistycznych:** Zastosuj konfigurację (magazyny, strefy, lokalizacje, reguły kompletacji, drukarki) z repozytorium.
   _Oczekiwany rezultat:_ Konfiguracja zastosowana
#### 4 · Sekrety

4. **Administrator systemów logistycznych:** Wprowadź nowe poświadczenia: konta serwisowe, połączenia z bazą, klucze integracji z ERP, TMS, WCS.
   _Oczekiwany rezultat:_ Nowe sekrety
#### 5 · Uruchomienie

5. **Administrator systemów logistycznych:** Uruchom usługi WMS (aplikacja, harmonogramy, usługi wydruku, interfejsy) w trybie bez integracji.
   _Oczekiwany rezultat:_ Usługi działają
#### 6 · Test

6. **Administrator systemów logistycznych:** Wykonaj test podstawowy z terminala testowego w IRE: logowanie, zapytanie o lokalizację, wydruk etykiety testowej.
   _Oczekiwany rezultat:_ Test zaliczony
#### 7 · Kontrola

7. **Zespół reagowania (CSIRT):** Przeskanuj serwery skanerem IoC/YARA.
   _Oczekiwany rezultat:_ 0 wykryć

### Weryfikacja wykonania

WMS działa w IRE, test podstawowy zaliczony, skan czysty.

### Wycofanie

Ponowne wdrożenie serwerów z obrazów.

### Zapisy

Dziennik odtworzenia, sumy pakietów, protokół dostępu dostawcy.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-02
- ISO/IEC 27001:2022 – A.8.9

---

## IN-WMS-3.2 · Odtworzenie bazy danych WMS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS → PR-WMS-3 · Odtworzenie systemu WMS

### Cel

Odtworzenie bazy WMS do punktu w czasie sprzed T0 i przygotowanie jej do uzgodnienia ruchów.

### Zastosowanie

Odtwarzanie WMS w PR-WMS-3. Polecenia jak w IN-APP-3.2, z wymaganiami specyficznymi dla WMS.

### Wymagane uprawnienia i narzędzia

Czysty serwer bazodanowy w IRE, zatwierdzone kopie bazy WMS, wsparcie dostawcy WMS.

### Środki ostrożności

- Zanotuj dokładny czas punktu odtworzenia – od niego liczy się zakres uzgodnienia ruchów.
- Nie uruchamiaj zadań automatycznych WMS (fale, uzupełnienia) przed uzgodnieniem stanów.

### Kroki

#### 1 · Weryfikacja

1. **Administrator baz danych:** Zweryfikuj kopie bazy WMS (RESTORE VERIFYONLY / odpowiednik).
   _Oczekiwany rezultat:_ Kopie poprawne
#### 2 · Odtworzenie

2. **Administrator baz danych:** Odtwórz bazę WMS do punktu w czasie sprzed T0 (IN-APP-3.2).
   _Oczekiwany rezultat:_ Baza ONLINE
#### 3 · Oczyszczenie

3. **Administrator baz danych:** Usuń loginy atakującego, zmień hasła kont bazodanowych WMS.
   _Oczekiwany rezultat:_ Konta oczyszczone
#### 4 · Ochrona danych

4. **Administrator systemów logistycznych:** Wyłącz w WMS zadania automatyczne (generowanie fal, uzupełnienia, wysyłka komunikatów) do czasu PR-WMS-4.
   _Oczekiwany rezultat:_ Zadania wyłączone
#### 5 · Punkt startowy

5. **Administrator systemów logistycznych:** Zapisz ostatnie numery dokumentów i znaczniki czasu w bazie (punkt startowy uzgodnień).

   ```
   SELECT MAX(<data_ruchu>) AS ostatni_ruch, MAX(<nr_dokumentu>) AS ostatni_dokument FROM <tabela_ruchów>;
   ```
   _Oczekiwany rezultat:_ Punkt startowy zapisany
#### 6 · Spójność

6. **Administrator baz danych:** Wykonaj test spójności bazy (DBCC CHECKDB / odpowiednik).
   _Oczekiwany rezultat:_ Brak błędów

### Weryfikacja wykonania

Baza WMS spójna, punkt startowy uzgodnień zapisany, zadania automatyczne wyłączone.

### Wycofanie

Ponowne odtworzenie z innego punktu.

### Zapisy

Dziennik odtworzenia bazy, punkt startowy uzgodnień.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-02
- NIST CSF 2.0 – RC.RP-03
- ISO/IEC 27001:2022 – A.8.13

---

## PR-WMS-4 · Weryfikacja integralności danych magazynowych

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS

### Cel

Doprowadzenie stanów magazynowych w WMS do zgodności ze stanem fizycznym i z ERP oraz potwierdzenie poprawnej współpracy WMS z systemami zależnymi.

### Zakres i wyzwalacz

Stany lokalizacji, zapasy według produktów i partii, zlecenia otwarte, przyjęcia i wydania od punktu odtworzenia, ruchy z trybu ręcznego.

**Wyzwalacz:** zakończenie PR-WMS-3.

### Warunki wstępne

- Rejestry ruchów z trybu ręcznego.
- Raporty stanów z ERP i z automatyki (tablice lokalizacji WCS).

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Księgowanie ruchów z trybu ręcznego | Kierownicy zmian CD | Właściciel procesu biznesowego | Administrator systemów logistycznych | – |
| Uzgodnienie stanów | Właściciel procesu biznesowego, Administrator systemów logistycznych | Właściciel procesu biznesowego | Kontroling | Zespół zarządzania kryzysowego |
| Inwentaryzacja kontrolna | Kierownicy zmian CD | Właściciel procesu biznesowego | Kontroling | – |
| Testy integracji | Administrator systemów logistycznych | Kierownik odtwarzania | Dostawca | Kierownik incydentu |

### Przebieg

#### 1 · Ruchy awaryjne

1. **Administrator systemów logistycznych:** Zaksięguj w WMS ruchy z trybu ręcznego (przyjęcia, wydania, przesunięcia) z kontrolą drugiej osoby.
   _Oczekiwany rezultat:_ Ruchy zaksięgowane
#### 2 · Uzgodnienia

2. **Administrator systemów logistycznych:** Uzgodnij przyjęcia i wydania od punktu odtworzenia z ERP, TMS i dokumentami dostawców.
   _Oczekiwany rezultat:_ Lista różnic
3. **Administrator systemów logistycznych:** Porównaj stany WMS z ERP według produktów oraz stany lokalizacji WMS z tablicami lokalizacji WCS (automatyka).
   _Oczekiwany rezultat:_ Raport różnic
#### 3 · Inwentaryzacja

4. **Właściciel procesu biznesowego:** Przeprowadź inwentaryzację kontrolną: pełną dla stref z różnicami i automatyki, cykliczną dla pozostałych (produkty o najwyższej rotacji i wartości).
   _Oczekiwany rezultat:_ Protokół inwentaryzacji
5. **Właściciel procesu biznesowego:** Zatwierdź korekty stanów.
   _Oczekiwany rezultat:_ Korekty zatwierdzone
#### 4 · Integracje

6. **Administrator systemów logistycznych:** Wykonaj testy integracji według IN-WMS-4.1 i wypełnij CL-WMS-4.
   _Oczekiwany rezultat:_ CL-WMS-4

### Kryteria wyjścia

- Stany WMS zgodne ze stanem fizycznym i ERP w zakresie zatwierdzonym przez właściciela procesu.
- Testy integracji zaliczone.

### Zapisy (dowody wykonania)

Rejestr zaksięgowanych ruchów, raporty różnic, protokoły inwentaryzacji, korekty, CL-WMS-4.

### Instrukcje i checklisty

- Instrukcja: **CL-WMS-4 · Testy integracyjne WMS** (v0.1, projekt)
- Instrukcja: **IN-WMS-4.1 · Testy integracji WMS z innymi systemami** (v0.1, projekt)

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- NIST CSF 2.0 – RC.RP-04
- ISO 22301:2019 – 8.4.5

---

## CL-WMS-4 · Testy integracyjne WMS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | biznesowo-techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS → PR-WMS-4 · Weryfikacja integralności danych magazynowych

### Zastosowanie

Wyniki PR-WMS-4 i IN-WMS-4.1.

### Lista kontrolna

1. **Administrator systemów logistycznych:** Ruchy z trybu ręcznego zaksięgowane
2. **Administrator systemów logistycznych:** Przyjęcia i wydania od punktu odtworzenia uzgodnione z ERP i TMS
3. **Administrator systemów logistycznych:** Stany WMS vs ERP uzgodnione
4. **Administrator systemów logistycznych:** Stany lokalizacji WMS vs WCS uzgodnione
5. **Właściciel procesu biznesowego:** Inwentaryzacja kontrolna przeprowadzona, korekty zatwierdzone
6. **Administrator systemów logistycznych:** ERP ↔ WMS przetestowane w obu kierunkach
7. **Administrator systemów logistycznych:** WMS ↔ WCS przetestowane
8. **Administrator systemów logistycznych:** WMS ↔ TMS i EDI przetestowane
9. **Administrator systemów logistycznych:** Test idempotentności zaliczony
10. **Administrator systemów logistycznych:** Plan przetworzenia zaległych kolejek gotowy

### Kryteria zaliczenia

Wszystkie punkty spełnione.

### Zatwierdzenie

Wypełnił: Administrator systemów logistycznych. Zatwierdził: właściciel procesu zaopatrzenia.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05

---

## IN-WMS-4.1 · Testy integracji WMS z innymi systemami

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS → PR-WMS-4 · Weryfikacja integralności danych magazynowych

### Cel

Potwierdzenie poprawnej, jednokrotnej wymiany danych między WMS a ERP, TMS, WCS, EDI i systemami placówek.

### Zastosowanie

Przed dopuszczeniem WMS (PR-WMS-4).

### Wymagane uprawnienia i narzędzia

Środowisko IRE z odtworzonymi systemami zależnymi lub punktami testowymi, dane testowe, wsparcie właścicieli systemów zależnych.

### Środki ostrożności

Komunikaty testowe oznaczaj i usuwaj po testach; nie wysyłaj komunikatów do partnerów zewnętrznych bez uzgodnienia.

### Kroki

#### 1 · ERP

1. **Administrator systemów logistycznych:** ERP → WMS: zlecenie wydania testowego i awizo przyjęcia; sprawdź utworzenie w WMS.
   _Oczekiwany rezultat:_ Dokumenty utworzone raz
2. **Administrator systemów logistycznych:** WMS → ERP: potwierdzenie przyjęcia i wydania; sprawdź księgowanie w ERP.
   _Oczekiwany rezultat:_ Księgowanie poprawne
#### 2 · WCS

3. **Administrator systemów logistycznych:** WMS → WCS: zadanie składowania i pobrania testowego; WCS → WMS: potwierdzenie wykonania.
   _Oczekiwany rezultat:_ Zadania potwierdzone
#### 3 · TMS

4. **Administrator systemów logistycznych:** WMS → TMS: wysyłka testowa; TMS → WMS: potwierdzenie załadunku.
   _Oczekiwany rezultat:_ Wysyłka w TMS
#### 4 · EDI

5. **Administrator systemów logistycznych:** EDI: odbiór awizo dostawy (ASN) z kanału testowego.
   _Oczekiwany rezultat:_ ASN przetworzone
#### 5 · Duplikaty

6. **Administrator systemów logistycznych:** Test idempotentności: ponowne wysłanie tego samego komunikatu nie tworzy duplikatu.
   _Oczekiwany rezultat:_ Brak duplikatów
#### 6 · Zaległości

7. **Administrator systemów logistycznych:** Test kolejek: komunikaty zaległe z okresu incydentu – przegląd, odrzucenie duplikatów, plan przetworzenia.
   _Oczekiwany rezultat:_ Plan przetworzenia kolejek

### Weryfikacja wykonania

Wszystkie przepływy przetestowane w obu kierunkach; wyniki w CL-WMS-4.

### Wycofanie

Wycofanie dokumentów testowych.

### Zapisy

Protokół testów integracji.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05

---

## PR-WMS-5 · Dopuszczenie WMS do eksploatacji

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Procedura | biznesowo-techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS

### Cel

Formalne dopuszczenie WMS (DG5), przywrócenie integracji i automatyki oraz powrót centrum dystrybucyjnego z trybu ręcznego do pracy normalnej.

### Zakres i wyzwalacz

WMS, integracje, WCS i automatyka, terminale i drukarki w centrum dystrybucyjnym.

**Wyzwalacz:** zaliczone PR-WMS-4.

### Warunki wstępne

Bramka DG5 z polityki (kryteria dopuszczenia do produkcji) musi być spełniona w całości. Brak spełnienia któregokolwiek kryterium blokuje dopuszczenie – odstępstwo zatwierdza wyłącznie Kierownik incydentu wraz z właścicielem procesu i jest wpisywane do rejestru ryzyk.

### Role i odpowiedzialności

| Czynność | Wykonuje (R) | Odpowiada (A) | Konsultowany (C) | Informowany (I) |
|---|---|---|---|---|
| Decyzja DG5 | Kierownik incydentu | Kierownik incydentu | Właściciel procesu biznesowego, Dostawca | Zespół zarządzania kryzysowego |
| Przywrócenie integracji | Administrator systemów logistycznych | Kierownik odtwarzania | właściciele ERP, TMS | – |
| Uruchomienie automatyki | Kierownik utrzymania ruchu CD | Właściciel procesu biznesowego | Dostawca | Kierownik incydentu |
| Powrót z trybu ręcznego | Właściciel procesu biznesowego | Zespół zarządzania kryzysowego | kierownicy zmian | placówki, przewoźnicy |

### Przebieg

#### 1 · Decyzja

1. **Kierownik incydentu:** Podejmij decyzję DG5 dla WMS (CL-APP-5 jako lista kryteriów).
   _Oczekiwany rezultat:_ Wpis DG5
#### 2 · Integracje

2. **Administrator systemów logistycznych:** Przywróć integracje WMS według IN-WMS-5.1.
   _Oczekiwany rezultat:_ Integracje działają
#### 3 · Automatyka

3. **Kierownik utrzymania ruchu CD:** Uruchom automatykę etapami z dostawcą: test bez ładunku, test z ładunkiem testowym, praca z ograniczoną wydajnością, pełna wydajność.
   _Oczekiwany rezultat:_ Automatyka w pracy pełnej
4. **Administrator sieci / NAC:** Otwórz kanał IT/OT wyłącznie dla przepływów z docelowej macierzy (WMS ↔ WCS), z monitorowaniem.
   _Oczekiwany rezultat:_ Kanał zgodny z macierzą
#### 4 · Urządzenia

5. **Administrator sieci / NAC:** Zdejmij kwarantannę z odtworzonych terminali i stacji operatorów (CoA).
   _Oczekiwany rezultat:_ Urządzenia w sieci produkcyjnej
#### 5 · Powrót do normalnej pracy

6. **Właściciel procesu biznesowego:** Zakończ tryb ręczny: ostatnie ruchy zaksięgowane, rejestry papierowe zarchiwizowane, placówki i przewoźnicy poinformowani.
   _Oczekiwany rezultat:_ Tryb ręczny zamknięty
#### 6 · Monitoring

7. **SOC:** Wzmożony monitoring WMS i kanału IT/OT przez 30 dni.
   _Oczekiwany rezultat:_ Monitoring aktywny

### Kryteria wyjścia

- DG5 zapisana, integracje i automatyka w pracy normalnej.
- Tryb ręczny zamknięty, rejestry zarchiwizowane.

### Zapisy (dowody wykonania)

Wpis DG5, protokoły uruchomienia automatyki, rejestr zamknięcia trybu ręcznego.

### Instrukcje i checklisty

- Instrukcja: **IN-WMS-5.1 · Przywrócenie integracji WMS** (v0.1, projekt)

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- NIST CSF 2.0 – RC.RP-06
- NIST CSF 2.0 – RC.CO-03
- ISO/IEC 27001:2022 – A.8.32
- ISO 22301:2019 – 8.4.5

---

## IN-WMS-5.1 · Przywrócenie integracji WMS

| Rodzaj | Warstwa | Wersja | Status | Właściciel | Przegląd do |
|---|---|---|---|---|---|
| Instrukcja | techniczna | 0.1 | projekt | Administrator systemów logistycznych | 2027-10-21 |

Dokument nadrzędny: POL-RAN · Polityka ciągłości działania na wypadek ransomware → PL-WMS · Plan reagowania na ransomware w systemie WMS → PR-WMS-5 · Dopuszczenie WMS do eksploatacji

### Cel

Włączenie produkcyjnych integracji WMS w kontrolowanej kolejności, z przetworzeniem zaległych komunikatów bez duplikatów.

### Zastosowanie

Po DG5 dla WMS (PR-WMS-5).

### Wymagane uprawnienia i narzędzia

Plan przetworzenia kolejek z IN-WMS-4.1, uprawnienia do platformy integracyjnej, kontakt z właścicielami ERP, TMS, WCS.

### Środki ostrożności

Zaległe komunikaty przetwarzaj partiami z kontrolą; nie uruchamiaj wszystkich kolejek jednocześnie.

### Kroki

#### 1 · ERP

1. **Administrator systemów logistycznych:** Włącz integrację ERP → WMS i przetwórz zaległe zlecenia partiami, z kontrolą po każdej partii.
   _Oczekiwany rezultat:_ Zlecenia przetworzone
2. **Administrator systemów logistycznych:** Włącz integrację WMS → ERP (potwierdzenia) i sprawdź księgowania.
   _Oczekiwany rezultat:_ Księgowania poprawne
#### 2 · WCS

3. **Administrator systemów logistycznych:** Włącz integrację z WCS po uruchomieniu automatyki w trybie testowym (PR-WMS-5).
   _Oczekiwany rezultat:_ Zadania WCS przetwarzane
#### 3 · TMS i EDI

4. **Administrator systemów logistycznych:** Włącz integrację z TMS i EDI.
   _Oczekiwany rezultat:_ Komunikaty przetwarzane
#### 4 · Zadania

5. **Administrator systemów logistycznych:** Włącz zadania automatyczne WMS (fale, uzupełnienia).
   _Oczekiwany rezultat:_ Zadania działają
#### 5 · Monitoring

6. **SOC:** Monitoruj kolejki i błędy integracji przez 24 h; alerty na narastające zaległości.
   _Oczekiwany rezultat:_ Brak narastających błędów

### Weryfikacja wykonania

Kolejki bez zaległości, brak duplikatów, stany ERP i WMS zgodne po pierwszej dobie.

### Wycofanie

Wstrzymanie danej integracji przy błędach i przetworzenie ręczne.

### Zapisy

Rejestr włączania integracji, raport kolejek.

### Mapowanie na wymagania

- NIST CSF 2.0 – RC.RP-05
- ISO/IEC 27001:2022 – A.8.32