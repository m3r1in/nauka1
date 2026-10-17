# Rossmann Polska – plan na wypadek ataku ransomware

Projekt z 2026-10-17. Przygotowany na podstawie źródeł publicznych w BCM Studio. Do importu: `examples/rossmann-ransomware.json` (Ustawienia → Gotowe projekty).

## Kontekst organizacji (OSINT) i założenia

FAKTY (źródła publiczne, stan na 2026-10-17, do weryfikacji w KRS i sprawozdaniach):
- Podmiot: Rossmann Supermarkety Drogeryjne Polska Sp. z o.o. (nazwę i dane rejestrowe potwierdź w KRS); centrala w Łodzi.
- Sieć: ok. 1925 drogerii w 709 miejscowościach na koniec 2024 r.; próg 2000 drogerii przekroczony w październiku 2025 r.
- Skala: sprzedaż netto 2024 ok. 15,0 mld zł (inne źródła podają 17,9 mld zł – różne miary), zysk netto ok. 1,47 mld zł; zatrudnienie rzędu kilkunastu tysięcy osób (2023: ok. 17,1 tys.).
- Logistyka: centra dystrybucyjne w Łodzi (ok. 66 tys. m²), Pyskowicach (rozbudowa do 66 tys. m² z automatyką Körber: magazyn wysokiego składowania i magazyny shuttle, zakończenie planowane na 2. połowę 2027 r.), Grudziądzu, Zgierzu i Dąbrówce Wielkiej.
- Kanały cyfrowe: sklep internetowy rossmann.pl, aplikacja Rossmann PL z wirtualną kartą Klubu Rossmanna, click & collect, dostawa do domu, płatność w aplikacji (Rossmann GO); kasy samoobsługowe w drogeriach.
- Zagrożenia obserwowane: kampanie oszustów podszywających się pod markę (fałszywe karty podarunkowe, ankiety). Nie znaleziono publicznych informacji o ataku ransomware na Rossmann Polska.
- Kontekst branżowy: ataki ransomware na Marks & Spencer i Co-op (UK, 2025) – wstrzymanie sprzedaży online, płatności zbliżeniowych, automatycznych zamówień i dostaw, kradzież danych klientów; incydent w Żabce (2026) – przejęcie kont z dostępem do infrastruktury i wyciek kodu.

ZAŁOŻENIA (do potwierdzenia):
- Konkretne produkty (wirtualizacja, bazy danych, kopie, zapory, EDR) przyjęto jako typowe dla organizacji tej skali – zastąp je faktycznymi.
- Wartości RTO/RPO/MTPD to propozycje do warsztatu BIA z właścicielami procesów.
- Status wobec NIS2/ustawy o KSC wymaga analizy prawnej (handel detaliczny nie jest wprost sektorem kluczowym; możliwe powiązania: dystrybucja substancji chemicznych, żywność, usługi cyfrowe). Plan przyjmuje podejście ostrożne i uwzględnia terminy NIS2/KSC.
- PCI DSS: obowiązki zależą od modelu obsługi kart (agent rozliczeniowy, terminale P2PE) – do potwierdzenia.

## Analiza luk RTO/RPO (wymagane przez procesy vs osiągalne – założenia)

| Luka | Proces | System | Wymagane | Osiągalne |
|---|---|---|---|---|
| RTO | Sprzedaż w drogeriach | Tożsamość: Active Directory i Entra ID (zależność) | 2 h | 24 h |
| RTO | Komunikacja kryzysowa i obsługa klienta | Tożsamość: Active Directory i Entra ID (zależność) | 4 h | 24 h |
| RTO | Sprzedaż w drogeriach | Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) | 2 h | 4 h |
| RTO | Sprzedaż w drogeriach | System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) | 2 h | 4 h |
| RTO | Zaopatrzenie drogerii z centrów dystrybucyjnych | ERP: towar, ceny, zakupy, finanse (zależność) | 24 h | 2 d |
| RPO | Zakupy i zarządzanie zapasami | ERP: towar, ceny, zakupy, finanse | 4 h | 24 h |
| RTO | Sprzedaż internetowa i click & collect | ERP: towar, ceny, zakupy, finanse (zależność) | 24 h | 2 d |

Najważniejszy wniosek: kasy, sklep internetowy i WMS zależą od tożsamości (AD/Entra ID), której odtworzenie po ransomware trwa realnie 1–3 doby. Trzeba potwierdzić, czy kasy pracują offline niezależnie od AD i centrali, oraz skrócić czas odtworzenia tożsamości (gotowy plan odtworzenia lasu AD, izolowane kopie, ćwiczenia).

## Dokumenty

- Polityka zarządzania ciągłością działania
- Polityka zarządzania incydentami bezpieczeństwa
- Polityka kopii zapasowych i odtwarzania
- Plan ciągłości działania (BCP)
- Plan odtwarzania po awarii (DRP)
- Plan reagowania na incydenty (IRP)
- Plan komunikacji kryzysowej
-   Procedura eskalacji i aktywacji planu
-   Procedura odtworzenia systemu
-   Procedura przełączenia do ośrodka zapasowego
-   Procedura obsługi i zgłaszania incydentu
-   Procedura obsługi naruszenia ochrony danych osobowych
-   Procedura testowania i ćwiczeń
-   Procedura przeglądu poincydentalnego
-     Instrukcja powiadamiania (drzewo telefoniczne)
-     Tryb awaryjny – Sprzedaż w drogeriach
-     Tryb awaryjny – Zaopatrzenie drogerii z centrów dystrybucyjnych
-     Tryb awaryjny – Zakupy i zarządzanie zapasami
-     Tryb awaryjny – Sprzedaż internetowa i click & collect
-     Tryb awaryjny – Finanse i płatności do dostawców
-     Tryb awaryjny – Komunikacja kryzysowa i obsługa klienta
-     Odtworzenie – Tożsamość: Active Directory i Entra ID · Active Directory (Windows Server)
-     Izolacja i dowody – Tożsamość: Active Directory i Entra ID · Active Directory (Windows Server)
-     Odtworzenie – Tożsamość: Active Directory i Entra ID · Microsoft 365 / Entra ID
-     Izolacja i dowody – Tożsamość: Active Directory i Entra ID · Microsoft 365 / Entra ID
-     Odtworzenie – Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) · Zapora FortiGate
-     Izolacja i dowody – Sieć WAN drogerii i centrów dystrybucyjnych (SD-WAN, zapory) · Zapora FortiGate
-     Odtworzenie – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Kasy POS i terminale płatnicze (sklep)
-     Izolacja i dowody – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Kasy POS i terminale płatnicze (sklep)
-     Odtworzenie – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Microsoft Defender for Endpoint
-     Izolacja i dowody – System kasowy drogerii (ok. 2000 placówek, kasy samoobsługowe) · Microsoft Defender for Endpoint
-     Odtworzenie – ERP: towar, ceny, zakupy, finanse · VMware vSphere / SRM
-     Izolacja i dowody – ERP: towar, ceny, zakupy, finanse · VMware vSphere / SRM
-     Odtworzenie – ERP: towar, ceny, zakupy, finanse · Microsoft SQL Server
-     Odtworzenie – ERP: towar, ceny, zakupy, finanse · Veeam Backup & Replication
-     Odtworzenie – WMS i sterowanie automatyką centrów dystrybucyjnych · VMware vSphere / SRM
-     Izolacja i dowody – WMS i sterowanie automatyką centrów dystrybucyjnych · VMware vSphere / SRM
-     Odtworzenie – WMS i sterowanie automatyką centrów dystrybucyjnych · Microsoft SQL Server
-     Odtworzenie – WMS i sterowanie automatyką centrów dystrybucyjnych · Veeam Backup & Replication
-     Odtworzenie – EDI / B2B z dostawcami · Serwer Linux (RHEL / Ubuntu)
-     Izolacja i dowody – EDI / B2B z dostawcami · Serwer Linux (RHEL / Ubuntu)
-     Odtworzenie – Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) · Kubernetes (Velero)
-     Izolacja i dowody – Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) · Kubernetes (Velero)
-     Odtworzenie – Sklep rossmann.pl i aplikacja Rossmann PL (w tym Rossmann GO) · PostgreSQL
-     Odtworzenie – Program lojalnościowy Klub Rossmanna (CRM, dane klientów) · PostgreSQL
-     Odtworzenie – Microsoft 365: poczta i Teams · Microsoft 365 / Entra ID
-     Izolacja i dowody – Microsoft 365: poczta i Teams · Microsoft 365 / Entra ID
-     Odtworzenie – Platforma kopii zapasowych (kopie niezmienne, odizolowane) · Veeam Backup & Replication
-     Odtworzenie – Platforma kopii zapasowych (kopie niezmienne, odizolowane) · Serwer Linux (RHEL / Ubuntu)
-     Izolacja i dowody – Platforma kopii zapasowych (kopie niezmienne, odizolowane) · Serwer Linux (RHEL / Ubuntu)
-     Odtworzenie – Kadry i płace · Microsoft SQL Server
-   Playbook: atak ransomware
-   Procedura decyzyjna – żądanie okupu
-   Procedura odtworzenia po ransomware (czyste środowisko)
-   Procedura pracy drogerii przy niedostępności systemów centralnych
-   Procedura awaryjnej obsługi centrum dystrybucyjnego
-     Checklista: pierwsza godzina – kierownik incydentu
-     Checklista: izolacja sieci i tożsamości (SOC / NOC)
-     Checklista: ocena naruszenia RODO przy kradzieży danych
-     Checklista: komunikacja w pierwszych 24 h
-     Checklista kierownika drogerii: systemy niedostępne
-     Checklista kierownika zmiany centrum dystrybucyjnego
-     Checklista: odtworzenie tożsamości (AD / Entra ID) po ransomware

## Program testów

| Data | Test | Rodzaj |
|---|---|---|
| 2026-10-31 | Przegląd dokumentacji ransomware z właścicielami procesów | review |
| 2026-11-07 | Test drzewa powiadomień i kanału pozapasmowego | walk |
| 2026-11-21 | Ćwiczenie sztabowe: ransomware w sieci drogerii | tabletop |
| 2026-12-05 | Przejście procedury pracy offline w 3 drogeriach pilotażowych | walk |
| 2026-12-19 | Odtworzenie AD z kopii niezmiennej w środowisku izolowanym | technical |
| 2027-01-02 | Test ręcznej obsługi centrum dystrybucyjnego bez WMS | walk |
| 2027-01-16 | Test odtworzenia sklepu internetowego i aplikacji | technical |

## Pokrycie wymagań (projekt): 43%

- ISO 22301:2019: 36%
- ISO/IEC 27001:2022: 50%
- ISO/IEC 27035: 50%
- NIST SP 800-61 Rev. 3 / CSF 2.0: 50%
- PCI DSS v4.0.1: 43%
- NIS2 – dyrektywa (UE) 2022/2555: 36%
- Ustawa o KSC: 50%
- RODO – rozporządzenie (UE) 2016/679: 50%

Pokrycie wzrośnie po zatwierdzeniu dokumentów i przeprowadzeniu testów.

## Źródła

- https://fashionbiznes.pl/rekordowe-wyniki-sieci-rossmann-2024/
- https://www.bankier.pl/wiadomosc/Rekordowy-rok-Rossmanna-w-Polsce-Obroty-przerosly-oczekiwania-8879935.html
- https://www.wiadomoscikosmetyczne.pl/dystrybucja-kosmetykow/sieci-drogeryjne/rossmann-jest-nie-do-zatrzymania-w-tym-roku-siec-przekroczy-2-tys-placowek-polsce-2526672
- https://www.wiadomoscihandlowe.pl/handel-i-dystrybucja/drogerie-i-apteki/rossmann-wyda-pol-miliarda-zl-na-najwieksza-inwestycje-w-polsce-2538326
- https://retail-optimiser.de/en/rossmann-automates-logistics-centre-in-poland-with-koerber/
- https://www.wiadomoscikosmetyczne.pl/dystrybucja-kosmetykow/hurtownie-kosmetyczne/rossmann-logistycznie-rosnie-w-sile-kolejny-magazyn-sieci-wiekszy-o-tysiace-metrow-2446378
- https://spidersweb.pl/2025/04/rosmann-pl-aplikacja-nowosci.html
- https://apps.apple.com/app/id791525539
- https://www.wiadomoscikosmetyczne.pl/dystrybucja-kosmetykow/sieci-drogeryjne/rossmann-ostrzega-strzez-sie-oszustow-oferujacych-karty-podarunkowe-2521951
- https://www.blackfog.com/marks-and-spencer-ransomware-attack/
- https://amp.rte.ie/amp/1510480
- https://spidersweb.pl/2026/08/atak-na-zabke-hakerzy.html