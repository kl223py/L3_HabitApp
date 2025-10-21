# L3_HabitApp


## Om Projektet

### Vision

## Funktioner

### För Slutanvändare
- Skapa vanor - Lägg till egna habits med namn och beskrivning
- Spåra streaks - Se hur många dagar i rad du följt en vana
- Markera som genomförd - Enkelt markera dagens aktivitet
- Ta bort vanor - Radera habits du inte längre följer
- Streak-status - Se om din streak är aktiv eller bruten
- Tillåt missade dagaqr - Konfigurera flexibilitet för vissa habits (0-n missade dagar)
- Långtryck för detaljer - Se fullständig information om en habit
## Komma Igång / Starta upp

### Förutsättningar
- Node.js (v16 eller senare)
- npm eller yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app (för testning på mobil)

### Installation

1. **Klona repositoryt**
```bash
git clone https://github.com/kl223py/L3_HabitApp
cd HabitFlow
```

2. **Installera beroenden**
```bash
npm install
```

3. **Starta utvecklingsservern**
```bash
npx expo start eller npm start
```

4. **Kör appen**
- Scanna QR-koden med Expo Go (iOS/Android)
- Tryck `i` för iOS Simulator
- Tryck `a` för Android Emulator
- Tryck `w` för webb

## Beroenden

### L2 Habit Tracker Module
Appen använder habit tracker-modulen från Laboration 2:
- Repository: [L2HabitTracker](https://github.com/lissovkevin/L2HabitTracker)
- Version: 1.0.0
- Integration: Via lokal npm-länk

Modulen hanterar:
- Habit-skapande och hantering
- Streak-beräkning
- Completion-spårning
- Validering av indata

## Användning

### Skapa en Habit
1. Tryck på **+** knappen längst ner
2. Fyll i habit-namn (obligatoriskt)
3. Lägg till beskrivning (valfritt)
4. Aktivera "Allow Missed Days" om du vill tillåta mer en 1 missad dag
5. Ange max antal missade dagar (om aktiverat)
6. Tryck **Save**

### Markera som Genomförd
- Tryck på **✓** knappen på en habit för att markera dagens aktivitet

### Se Detaljer
- **Långtryck** på en habit för att se fullständig information:
  - Nuvarande streak
  - Status (Active/Broken)
  - Konfiguration för missade dagar

### Ta Bort en Habit
- Tryck på **×** knappen och bekräfta borttagning

## 🧪 Testning

Se [testfall.md](./testfall.md) för detaljerad testdokumentation.


## Målgrupper

### Slutanvändare
Personer som letar efter en enkel app så att de kan bibehålla sina goda vanor och ha koll på hur långt de har kommit. 

### App-utvecklare
Utvecklare som vill förstå eller bidra till HabitFlow-koden.

### Modul-användare
Utvecklare som vill integrera habit-tracker modulen i egna projekt.

## Teknisk Stack

Appen är uppbyggd på React Native med Expo som framework, den har AsyncStorage för lagring och använder TypeScript för typ säkerhet.
## Kända Begränsningar

Just nu så sparas data endast lokalt och det finns ingen backup så alla data förloras vid avinstallation.

## Framtida Förbättringar

- Lägga till en cloud så att data sparas och synkroniseras\
- Log in funktion
- Påminnelser
- TODO listor

## 📄 Licens

MIT License - Se LICENSE fil för detaljer
