# BCM Studio

Aplikacja PWA do budowania i testowania planów ciągłości działania (BCP), odtwarzania po awarii (DRP) i reagowania na incydenty (IRP). Prowadzi od polityk przez plany i procedury do instrukcji technicznych dla konkretnych technologii. Warstwa biznesowa i techniczna są ze sobą powiązane, a całość mapuje się na standardy i akty prawne.

Działa w przeglądarce, także na telefonie i bez internetu. Nie wymaga serwera ani instalacji zależności.

## Co potrafi

| Moduł | Zakres |
|---|---|
| **Biznes (BIA)** | procesy, krytyczność, macierz wpływu w czasie (4 h / 24 h / 72 h / 1 tydz.), MTPD, RTO, RPO, MBCO, systemy wspierające; ostrzeżenia o niespójnościach (np. RTO > MTPD) |
| **Technika** | systemy, technologie, osiągalne RTO/RPO, kopie, ośrodek zapasowy, zależności; **analiza luk** wymagane vs osiągalne (także przez zależności) i wyliczona **kolejność odtwarzania** |
| **Dokumenty** | hierarchia Polityka → Plan → Procedura → Instrukcja, warstwa biznesowa/techniczna, statusy, wersje, przeglądy; szablony z mapowaniem na wymagania; **generator struktury** z danych BIA i systemów; „żywe” znaczniki (`{{table:processes}}`, `{{table:gaps}}`, `{{reporting}}` …) aktualizowane z danych |
| **Instrukcje technologiczne** | biblioteka kroków dla 15 technologii (VMware/SRM, Hyper-V, Veeam, MS SQL, PostgreSQL, Oracle, Active Directory, Microsoft 365/Entra ID, AWS, Azure, Kubernetes/Velero, Linux, Defender for Endpoint, FortiGate, NetApp) i scenariuszy (kopia, odtworzenie, przełączenie, powrót, izolacja, dowody, weryfikacja) |
| **Testy i ćwiczenia** | 6 rodzajów testów (od przeglądu do pełnej symulacji), scenariusze ćwiczeń sztabowych z wstrzyknięciami (ransomware, utrata DC, dostawca chmurowy, przejęcie konta, personel), wykonanie krok po kroku ze stoperem, rzeczywiste RTO/RPO, ustalenia i działania korygujące, raport |
| **Zgodność** | ocena pokrycia wymagań z dowodami (dokument zatwierdzony + test w 12 mies. / BIA) i podpowiedzią szablonu dla luk |
| **Pakiet ransomware** | 109 dokumentów w 7 scenariuszach (nieznany aktor, kontroler domeny, kopie zapasowe, serwer plików/NAS, aplikacje i bazy, WMS, POS): polityka, plany, procedury, instrukcje z poleceniami i checklisty, bramki decyzyjne DG0–DG6, widok macierzy; zgodny z ISO 22301, ISO/IEC 27001/27031/27035/27037, NIST CSF 2.0, SP 800-61r3, SP 800-184 |
| **Zegar raportowy** | terminy zgłoszeń NIS2/KSC (24 h / 72 h / 1 mies.), DORA (4 h od klasyfikacji, maks. 24 h / 72 h / 1 mies.), RODO (72 h) |
| **Dane** | przechowywane lokalnie w przeglądarce; eksport/import JSON, eksport dokumentów i pakietu do Markdown, druk do PDF |

### Ramy odniesienia

ISO 22301, ISO/IEC 27001:2022 (zał. A), ISO/IEC 27031, ISO/IEC 27035, NIST SP 800-34, NIST SP 800-61r3 / CSF 2.0, NIST CSF 2.0, NIST SP 800-184, ISO/IEC 27037, PCI DSS v4.0.1, NIS2, ustawa o KSC, DORA, RODO.

Opisy wymagań są parafrazami, a nie cytatami norm. Terminy raportowe są uproszczone. Treść jest punktem startowym i wymaga weryfikacji z aktualnymi przepisami (w szczególności ustawą o KSC po nowelizacji wdrażającej NIS2) oraz dokumentacją używanych produktów.

## Gotowe projekty

| Projekt | Pliki |
|---|---|
| Rossmann Polska – plan na wypadek ataku ransomware (OSINT + założenia) | [`examples/rossmann/README.md`](examples/rossmann/README.md) – kontekst, luki, testy, źródła · [`examples/rossmann/dokumentacja.md`](examples/rossmann/dokumentacja.md) – pełna dokumentacja · `examples/rossmann-ransomware.json` – import do aplikacji |

W aplikacji: **Ustawienia → Gotowe projekty → Wczytaj**. Projekt odtworzysz skryptem `node tools/build-rossmann.mjs`.

## Uruchomienie

PWA wymaga serwowania przez HTTP(S), nie z `file://`:

```bash
python3 -m http.server 8000
# otwórz http://localhost:8000
```

### Na telefonie (GitHub Pages)

1. W repozytorium: **Settings → Pages → Source: Deploy from a branch**, wybierz gałąź i katalog `/ (root)`.
2. Otwórz adres strony na telefonie.
3. Android/Chrome: menu → **Zainstaluj aplikację**. iOS/Safari: **Udostępnij → Do ekranu początkowego**.

Po pierwszym otwarciu aplikacja działa offline.

## Struktura

```
index.html              powłoka aplikacji
manifest.webmanifest    manifest PWA
sw.js                   service worker (offline)
css/app.css             style (jasny i ciemny motyw, układ mobilny)
js/app.js               widoki, routing, interakcje
js/logic.js             BIA, luki, kolejność odtwarzania, zgodność, terminy, generator, Markdown
js/data/frameworks.js   standardy i akty prawne z wymaganiami
js/data/templates.js    szablony dokumentów
js/data/technologies.js biblioteka kroków dla technologii
js/data/exercises.js    rodzaje testów i scenariusze ćwiczeń
js/data/sample.js       dane przykładowe
```

Rozszerzanie: nową technologię dodasz w `technologies.js`, nowy szablon dokumentu w `templates.js`, nowe ramy w `frameworks.js` (identyfikatory wymagań `ramy:kod` wiążą je z szablonami).
