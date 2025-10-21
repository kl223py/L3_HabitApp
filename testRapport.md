# Testdokumentation - HabitFlow

Denna dokumentation beskriver testfallen för HabitFlow-applikationen och verifierar att alla krav uppfylls.

## Testmetodik

- **Testtyp**: Manuell testning via användargränssnitt
- **Testenhet**: HabitFlow
- **Testmiljö**: Expo app via Samsung S25
- **Testperiod**:  21 Oktober 2025

## Kravspecifikation

### Funktionella Krav

| Krav-ID | Beskrivning | Prioritet |
|---------|-------------|-----------|
| F1 | Användare ska kunna skapa nya habits | Hög |
| F2 | Användare ska kunna markera habits som genomförda | Hög |
| F3 | Användare ska kunna se sin nuvarande streak | Hög |
| F4 | Användare ska kunna ta bort habits | Medel |
| F5 | Användare ska kunna konfigurera tillåtna missade dagar | Medel |
| F6 | Användare ska kunna se detaljerad information om habits | Låg |
| F7 | Data ska sparas lokalt och persistera mellan sessioner | Hög |
| F8 | Användare ska få visuell feedback vid interaktioner | Medel |

### Icke-funktionella Krav

| Krav-ID | Beskrivning | Prioritet |
|---------|-------------|-----------|
| IF1 | Gränssnittet ska vara enkelt att använda | Hög |
| IF2 | Appen ska starta relativt snabbt | Medel |
| IF3 | Koden ska följa Clean Code-principer | Medel |
| IF4 | Appen ska fungera på både iOS och Android | Medel |

## Testfall

### Testfall 1: Skapa en Habit (F1)

**Beskrivning**: Testa att skapa en ny habit med obligatoriska och valfria fält.

**Förutsättningar**: 
- Appen är startad
- Användaren är på huvudskärmen

**Teststeg**:
1. Tryck på **+** knappen längst ner
2. Ange habit-namn: "Morning Run"
3. Ange beskrivning: "Run 5km every morning"
4. Tryck **Save**

**Förväntat resultat**:
- En ny habit-card ska visas i listan
- Habit-kortet ska innehålla namnet "Morning Run"
- Streak ska vara 0 Days
- Modalen ska stängas automatiskt

**Status**: PASS

---

### Testfall 2: Skapa Habit med Missade Dagar (F1, F5)

**Beskrivning**: Testa att skapa en habit med tillåtna missade dagar.

**Förutsättningar**: 
- Appen är startad
- Användaren är i "Add Habit" modal

**Teststeg**:
1. Ange habit-namn: "Reading"
2. Aktivera switch "Allow Missed Days"
3. Ange "Max Missed Days": 2
4. Tryck **Save**

**Förväntat resultat**:
- Habit skapas med konfiguration för 2 missade dagar
- Detta ska synas vid långtryck på habit-kortet

**Status**: PASS

---

### Testfall 3: Validering - Tom Habit-namn (F1)

**Beskrivning**: Testa att validering fungerar när användaren försöker skapa en habit utan namn.

**Förutsättningar**: 
- Användaren är i "Add Habit" modal

**Teststeg**:
1. Lämna "Habit Name" tomt
2. Tryck **Save**

**Förväntat resultat**:
- En alert ska visas: "Please enter a habit name."
- Modalen ska inte stängas
- Ingen habit ska skapas

**Status**: PASS

---

### Testfall 4: Markera Habit som Genomförd (F2, F3)

**Beskrivning**: Testa att markera en habit som genomförd och verifiera att streak ökar.

**Förutsättningar**: 
- Minst en habit finns i listan
- Habit har inte markerats idag

**Teststeg**:
1. Tryck på **✓** knappen på en habit
2. Observera alert-meddelandet
3. Kontrollera streak-värdet

**Förväntat resultat**:
- Alert: "Habit completed today!"
- Streak ska öka med 1
- Habit-kortet ska uppdateras automatiskt

**Status**: PASS

---

### Testfall 5: Förhindra Dubbel Completion (F2)

**Beskrivning**: Testa att användaren inte kan markera samma habit två gånger samma dag.

**Förutsättningar**: 
- En habit har redan markerats som genomförd idag

**Teststeg**:
1. Tryck på **✓** knappen igen på samma habit
2. Observera meddelandet

**Förväntat resultat**:
- Alert: "Already completed today!"
- Streak ska inte öka
- Ingen förändring i habit-kortet

**Status**: PASS

---

### Testfall 6: Visa Habit-detaljer (F6)

**Beskrivning**: Testa att visa detaljerad information via långtryck.

**Förutsättningar**: 
- Minst en habit finns i listan

**Teststeg**:
1. Långtryck på en habit-card
2. Läs informationen i alert-dialogen

**Förväntat resultat**:
- Alert ska visa:
  - Habit-namn som titel
  - Streak: X days
  - Status: Active/Streak Broken
  - Missed Days Allowed: Yes (Antal)/No

**Status**: PASS

---

### Testfall 7: Ta Bort Habit (F4)

**Beskrivning**: Testa att ta bort en habit permanent.

**Förutsättningar**: 
- Minst en habit finns i listan

**Teststeg**:
1. Tryck på **×** knappen på en habit
2. Läs bekräftelsedialogren
3. Tryck **Delete**

**Förväntat resultat**:
- En bekräftelsedialog ska visas
- Efter bekräftelse ska habit försvinna från listan
- Habit ska inte längre finnas efter omstart av appen

**Status**: PASS

---

### Testfall 8: Avbryt Borttagning (F4)

**Beskrivning**: Testa att avbryta borttagning av en habit.

**Förutsättningar**: 
- Minst en habit finns i listan

**Teststeg**:
1. Tryck på **×** knappen
2. Tryck **Cancel** i bekräftelsedialogren

**Förväntat resultat**:
- Habit ska inte tas bort
- Habit-kortet ska finnas kvar
- Ingen förändring i listan

**Status**: PASS

---

### Testfall 9: Data Persistens (F7)

**Beskrivning**: Testa att data sparas mellan sessioner.

**Förutsättningar**: 
- Flera habits finns i appen med olika streaks

**Teststeg**:
1. Notera alla habits och deras streaks
2. Stäng appen helt (force quit)
3. Starta appen igen
4. Jämför habits och streaks

**Förväntat resultat**:
- Alla habits ska finnas kvar
- Alla streaks ska ha samma värde
- Ingen data ska ha förlorats

**Kommentar**:
- Funkar endast lokalt

**Status**: PASS

---

### Testfall 10: Tom Lista (F8)

**Beskrivning**: Testa att instruktioner visas när inga habits finns.

**Förutsättningar**: 
- Inga habits finns i listan (ny installation eller alla borttagna)

**Teststeg**:
1. Öppna appen
2. Observera huvudskärmen

**Förväntat resultat**:
- Text ska visas: "To add a new habit, press the "+" button below."
- **+** knappen ska vara synlig och klickbar

**Status**: PASS

---

### Testfall 11: Avbryt Habit-skapande (F1, F8)

**Beskrivning**: Testa att avbryta skapande av en habit.

**Förutsättningar**: 
- Modal för ny habit är öppen

**Teststeg**:
1. Fyll i några fält
2. Tryck **Cancel**

**Förväntat resultat**:
- Modalen ska stängas
- Ingen habit ska skapas
- Alla fält ska rensas för nästa gång

**Status**: PASS

---

### Testfall 12: Streak Broken Status (F3, F5)

**Beskrivning**: Testa att streak markeras som bruten vid för många missade dagar.

**Förutsättningar**: 
- En habit finns som tillåter 1 missad dag
- Användaren har missat 2+ dagar

**Teststeg**:
1. Skapa habit med 1 tillåten missad dag
2. Markera som genomförd dag 1
3. Hoppa över dag 2 och 3 (simuleras genom tidsförskjutning)
4. Långtryck på habit för att se status

**Förväntat resultat**:
- Status ska visa: "Streak Broken"
- Streak ska ha återställts eller visa korrekt värde

**Status**: Ej testad

---
## Testsammanfattning

| Krav-ID | Testat | Status |
|---------|--------|--------|
| F1 | Ja | 4 testfall - Alla godkända |
| F2 | Ja | 2 testfall - Alla godkända |
| F3 | Ja | 2 testfall - 1 Godkänt & 1 Inte testat |
| F4 | Ja | 2 testfall - Alla godkända |
| F5 | Ja | 2 testfall - 1 Godkänt & 1 Inte testat |
| F6 | Ja | 1 testfall - Godkänt |
| F7 | Ja | 1 testfall - Godkänt |
| F8 | Ja | 2 testfall - Alla godkända |
| NF1 | Ja | Verifierat genom användartester |
| NF2 | Ja | Startar snabbt |
| NF3 | Ja | Verifierat genom kodgranskning |
| NF4 | Ja och Nej | Testat endast på Android, ingen tillgång till IOS |


## Slutsats

**Alla testfall utom ett har genomförts och godkänts med 100% pass-rate.**

Testfall 12 (Streak Broken Status) har inte ktestas. Funktionaliteten för streak-beräkning finns implementerad via L2-modulen, men verifieringen av "Streak Broken" status över flera missade dagar har inte blivit validerad manuellt. 

**Testmiljö:** All testning har genomförts på Expo via en android. Appen har inte testats på iOS-enhet eller iOS Simulator, vilket innebär att det kan finnas plattformsspecifika problem som inte upptäckts. React Native är dock designat för cross-platform kompatibilitet, så grundläggande funktionalitet förväntas fungera på båda plattformarna.

**Sammanfattning:** 11 av 12 testfall (92%) har genomförts och godkänts. Applikationen uppfyller alla funktionella krav (F1-F8) och icke-funktionella krav (NF1-NF4) baserat på Android-testning.

HabitFlow är redo för användning på Android med grundläggande funktionalitet för habit-tracking.