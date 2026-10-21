# Rossmann Polska – plan na wypadek ataku ransomware

Projekt z 2026-10-21. Przygotowany na podstawie źródeł publicznych w BCM Studio. Do importu: `examples/rossmann-ransomware.json` (Ustawienia → Gotowe projekty).

## Kontekst organizacji (OSINT) i założenia

FAKTY (źródła publiczne, stan na 2026-10-21, do weryfikacji w KRS i sprawozdaniach):
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

## Macierz dokumentów

| Typ | Nieznany aktor w infrastrukturze | Zaszyfrowany kontroler domeny | Ransomware w kopii zapasowej | Serwer plików / NAS | Serwer aplikacyjny / baza danych | WMS | Stanowisko sprzedażowe / POS |
|---|---|---|---|---|---|---|---|
| Polityka | POL-RAN · Polityka ciągłości działania na wypadek ransomware |  |  |  |  |  |  |
| Plan | PL-INF · Plan reagowania na detekcję nieznanego aktora w infrastrukturze | PL-AD · Plan reagowania na zaszyfrowany kontroler domeny | PL-BKP · Plan reagowania na ransomware w kopii zapasowej | PL-NAS · Plan reagowania na zaszyfrowanie serwera plików lub zasobów NAS | PL-APP · Plan reagowania na zaszyfrowanie serwera aplikacyjnego lub bazy danych | PL-WMS · Plan reagowania na ransomware w systemie WMS | PL-POS · Plan reagowania na ransomware na stanowisku sprzedażowym |
| Procedura | PR-INF-1 · Ocena i kwalifikacja naruszenia<br>PR-INF-2 · Izolacja zagrożonych zasobów<br>PR-INF-3 · Zabezpieczenie materiału dowodowego<br>PR-INF-4 · Usunięcie zagrożenia i mechanizmów utrzymania dostępu<br>PR-INF-5 · Weryfikacja bezpieczeństwa przed przywróceniem dostępu | PR-AD-1 · Ocena zakresu naruszenia AD<br>PR-AD-2 · Izolacja naruszonych kontrolerów domeny<br>PR-AD-3 · Zabezpieczenie logów i dowodów z AD<br>PR-AD-4 · Odtworzenie usług AD<br>PR-AD-5 · Weryfikacja i dopuszczenie usług domenowych | PR-BKP-1 · Ocena integralności i dostępności kopii zapasowych<br>PR-BKP-2 · Izolacja infrastruktury backupu<br>PR-BKP-3 · Zabezpieczenie niezainfekowanych kopii zapasowych<br>PR-BKP-4 · Odtworzenie działania infrastruktury backupu<br>PR-BKP-5 · Weryfikacja bezpieczeństwa i sprawności backupu | PR-NAS-1 · Ocena zakresu zaszyfrowania danych<br>PR-NAS-2 · Izolacja serwera i udziałów plikowych<br>PR-NAS-3 · Odtworzenie danych i udziałów plikowych<br>PR-NAS-4 · Weryfikacja integralności odtworzonych danych<br>PR-NAS-5 · Przywrócenie dostępu użytkowników do udziałów | PR-APP-1 · Ocena zakresu naruszenia aplikacji lub bazy<br>PR-APP-2 · Izolacja naruszonego serwera lub aplikacji<br>PR-APP-3 · Odtworzenie aplikacji i baz danych<br>PR-APP-4 · Weryfikacja integralności i spójności danych<br>PR-APP-5 · Dopuszczenie aplikacji do produkcji | PR-WMS-1 · Ocena wpływu incydentu na WMS<br>PR-WMS-2 · Izolacja zagrożonych komponentów WMS<br>PR-WMS-3 · Odtworzenie systemu WMS<br>PR-WMS-4 · Weryfikacja integralności danych magazynowych<br>PR-WMS-5 · Dopuszczenie WMS do eksploatacji | PR-POS-1 · Ocena zakresu naruszenia stanowisk POS<br>PR-POS-2 · Izolacja stanowisk POS<br>PR-POS-3 · Odtworzenie stanowisk POS<br>PR-POS-4 · Weryfikacja bezpieczeństwa i działania POS<br>PR-POS-5 · Dopuszczenie POS do eksploatacji |
| Instrukcja | IN-INF-1.1 · Analiza alertów i ruchu sieciowego<br>IN-INF-2.1 · Izolacja urządzenia w EDR<br>IN-INF-2.2 · Kwarantanna zagrożonego urządzenia w NAC<br>IN-INF-2.3 · Blokowanie podejrzanych kont i sesji<br>IN-INF-2.4 · Weryfikacja skuteczności izolacji<br>IN-INF-3.1 · Zebranie i zabezpieczenie logów SIEM / EDR | IN-AD-2.1 · Izolacja kontrolera domeny<br>IN-AD-2.2 · Ograniczenie dostępu sieciowego dla źródeł ataku z wykorzystaniem NAC<br>IN-AD-4.1 · Odtworzenie usług AD z zatwierdzonej kopii<br>IN-AD-5.1 · Testowanie AD<br>IN-AD-5.2 · Weryfikacja bezpieczeństwa i poprawności działania AD | IN-BKP-1.1 · Weryfikacja integralności kopii zapasowych<br>IN-BKP-2.1 · Ograniczenie dostępu do segmentu infrastruktury backupu w NAC<br>IN-BKP-3.1 · Zabezpieczenie repozytorium kopii zapasowych<br>IN-BKP-4.1 · Odtworzenie serwera backupu<br>IN-BKP-4.2 · Przywrócenie harmonogramów backupu<br>IN-BKP-5.1 · Test odtwarzania z wybranej kopii | IN-NAS-2.1 · Zatrzymanie szkodliwych sesji<br>IN-NAS-2.2 · Izolacja serwera plików lub NAS<br>IN-NAS-2.3 · Ograniczenie dostępu do segmentu serwera plików lub NAS w NAC<br>IN-NAS-3.1 · Odtworzenie udziałów i uprawnień<br>IN-NAS-4.1 · Weryfikacja integralności plików i uprawnień<br>IN-NAS-5.1 · Przywrócenie dostępu do udziałów | IN-APP-2.1 · Izolacja serwera aplikacyjnego<br>IN-APP-2.2 · Ograniczenie dostępu do segmentu serwera aplikacyjnego lub bazy danych w NAC<br>IN-APP-3.1 · Odtworzenie serwera aplikacyjnego<br>IN-APP-3.2 · Odtworzenie bazy danych<br>IN-APP-4.1 · Testy aplikacji i spójności bazy danych<br>IN-APP-5.1 · Przywrócenie ruchu produkcyjnego | IN-WMS-2.1 · Izolacja serwera WMS<br>IN-WMS-2.2 · Kwarantanna zagrożonych urządzeń klienckich WMS w NAC<br>IN-WMS-3.1 · Odtworzenie serwera i usług WMS<br>IN-WMS-3.2 · Odtworzenie bazy danych WMS<br>IN-WMS-4.1 · Testy integracji WMS z innymi systemami<br>IN-WMS-5.1 · Przywrócenie integracji WMS | IN-POS-2.1 · Izolacja terminala POS w EDR<br>IN-POS-2.2 · Kwarantanna stanowiska POS w NAC<br>IN-POS-3.1 · Odtworzenie terminala POS<br>IN-POS-3.2 · Przywrócenie konfiguracji POS<br>IN-POS-4.1 · Test połączenia POS z systemami centralnymi<br>IN-POS-5.1 · Przywrócenie połączenia z siecią produkcyjną |
| Checklista | CL-INF-1 · Ocena i kwalifikacja naruszenia<br>CL-INF-2 · Izolacja i ograniczenie zagrożenia<br>CL-INF-5.1 · Weryfikacja bezpieczeństwa zasobów<br>CL-INF-5.2 · Zamknięcie technicznej obsługi incydentu | CL-AD-1 · Ocena naruszenia AD<br>CL-AD-4 · Odtworzenie usług AD<br>CL-AD-5.1 · Weryfikacja i odbiór usług domenowych<br>CL-AD-5.2 · Dopuszczenie AD do eksploatacji | CL-BKP-1 · Ocena bezpieczeństwa kopii zapasowych<br>CL-BKP-3 · Zabezpieczenie infrastruktury backupu<br>CL-BKP-4 · Przywrócenie i kontrola backupu<br>CL-BKP-5 · Test odtwarzania kopii | CL-NAS-1 · Ocena zakresu zaszyfrowania<br>CL-NAS-2 · Izolacja serwera i udziałów<br>CL-NAS-4 · Weryfikacja danych i uprawnień<br>CL-NAS-5 · Przywrócenie dostępu do plików | CL-APP-1 · Ocena naruszenia aplikacji i bazy<br>CL-APP-3 · Odtworzenie aplikacji i bazy<br>CL-APP-5 · Dopuszczenie usługi do produkcji | CL-WMS-1 · Ocena wpływu na WMS<br>CL-WMS-3 · Odtworzenie WMS<br>CL-WMS-4 · Testy integracyjne WMS | CL-POS-1 · Ocena naruszenia POS<br>CL-POS-3 · Odtworzenie POS<br>CL-POS-4 · Testy funkcjonalne POS |

## Program testów

| Data | Test | Rodzaj |
|---|---|---|
| 2026-11-04 | Przegląd polityki i planów ransomware z właścicielami procesów | review |
| 2026-11-18 | Ćwiczenie sztabowe: ransomware w sieci drogerii | tabletop |
| 2026-11-25 | Test izolacji w EDR i NAC (laboratorium) | technical |
| 2026-12-09 | Odtworzenie lasu AD z kopii w IRE | technical |
| 2026-12-16 | Weryfikacja czystości i test odtworzenia kopii | technical |
| 2026-12-23 | Odtworzenie udziałów plikowych z migawek | technical |
| 2027-01-06 | Odtworzenie bazy i aplikacji sklepu internetowego | technical |
| 2027-01-13 | Tryb ręczny centrum dystrybucyjnego i testy integracji WMS | walk |
| 2027-01-27 | Odtworzenie stanowisk POS w drogeriach pilotażowych | technical |

## Pokrycie wymagań (projekt): 41%

- ISO 22301:2019: 48%
- ISO/IEC 27001:2022: 45%
- ISO/IEC 27031: 38%
- ISO/IEC 27035: 50%
- NIST SP 800-34 Rev. 1: 21%
- NIST SP 800-61 Rev. 3 / CSF 2.0: 33%
- PCI DSS v4.0.1: 36%
- NIST CSF 2.0: 44%
- NIST SP 800-184: 50%
- ISO/IEC 27037: 50%
- NIS2 – dyrektywa (UE) 2022/2555: 29%
- Ustawa o KSC: 50%
- RODO – rozporządzenie (UE) 2016/679: 30%

Pokrycie wzrośnie po zatwierdzeniu dokumentów i przeprowadzeniu testów.

## Normy i metodyki

Dokumenty są zgodne z ISO 22301:2019, ISO/IEC 27001:2022 (A.5.24–A.5.30, A.8.7, A.8.13, A.8.15, A.8.16, A.8.20, A.8.22), ISO/IEC 27031, ISO/IEC 27035-1:2023, ISO/IEC 27037, NIST CSF 2.0 (profil ransomware NIST IR 8374), NIST SP 800-61 Rev. 3, NIST SP 800-184, NIST SP 800-34 Rev. 1, CISA #StopRansomware Guide oraz przewodnikiem Microsoft dotyczącym odtwarzania lasu AD. Mapowanie każdego dokumentu na wymagania jest w aplikacji (moduł Zgodność) i na końcu każdego dokumentu.

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