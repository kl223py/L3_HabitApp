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
