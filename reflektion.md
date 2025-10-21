# Reflektion - HabitFlow

En reflektion över hur Clean Code kapitel 2-11 har påverkat utvecklingen av HabitFlow-applikationen.
---

## Kapitel 2: Meningsfulla Namn

Det här kapitel har påverkat hur jag har namngivit krafigt. Många namn bytte jag vid slutet för att ge ett mer klart namn, så som de säger i boken "Use Intention-Revealing Names." T.ex funktionsnamn som `loadHabitsFromStorage()` och `generateHabitId()` följer principen "Use Searchablen Names" och dessutom så förklarar de koden bra.

---

## Kapitel 3: Funktioner

Kapitel 3 som handlar om att funktioner ska göra en sak och vara små påverkad min kod stort. I början så blev det mycket att det vart långa funktioner och då gjorde flera saker, men till slut så gjorde jag en refaktorering och delade upp min kod så mycket som jag kunde till mindre små funktioner, som är tänkt att följa "Do One Thing" principen.


---

## Kapitel 4: Kommentarer

Det finns nästan inga kommentarer i min kod, eftersom att jag har försökt att följa boken budskap "Don't comment bad code, rewrite it". Så istället för kommentarer har jag försökt skriva om min kod enligt kapitel 2 och 3. Så jag har skrivit om funktionsnamn och gjort de mindre så att det inte ska behövas kommentarer.

---

## Kapitel 5: Formatering

Jag har försökt följa "The Newspaper Metaphor" genom att organisera koden med det viktigaste först och sedan detaljer. State-deklarationer kommer högst upp i klassen, sedan lifecycle-metoder och till sist render-metoden. Jag har också tänkt på "Vertical Distance" genom att placera funktioner som anropar varandra nära varandra, så att det blir lättare att följa koden.

---

## Kapitel 6: Objekt och Datastrukturer

Jag har använt TypeScript interfaces för att skapa tydliga kontrakt för min data, vilket följer "Data Abstraction". Habit-interfacet visar vilken data som finns men döljer hur streak-beräkningar fungerar internt. Även om jag använder funktionella komponenter istället för klasser har jag försökt kapsla in relaterad logik tillsammans enligt bokens principer om att separera data från implementation.

---

## Kapitel 7: Felhantering

Felhantering är integrerad i min kod genom try-catch block och en centraliserad `getErrorMessage()` funktion som följer "Use Exceptions Rather Than Return Codes". Jag undviker att returnera null genom att alltid returnera tomma arrayer vid fel (`return []`), vilket följer "Don't Return Null" och gör att jag slipper null-checks överallt i koden.

---

## Kapitel 8: Gränser (Boundaries)

Jag har kapsulat externa beroenden som AsyncStorage och habitManager genom wrapper-funktioner enligt "Using Third-Party Code". Funktioner som `loadStoredHabits()` och `registerHabitInManager()` isolerar resten av koden från externa API:er. Om jag skulle byta ut AsyncStorage mot något annat så behöver jag bara ändra på ett ställe istället för överallt i koden. 

---

## Kapitel 9: Enhetstester

Även om jag har testat manuellt så har jag designat koden för att vara testbar genom små, isolerade funktioner. Funktioner som `isValidHabitName()` och `generateHabitId()` är pure functions som enkelt kan testas automatiskt. Jag följer bokens princip om att kod ska vara enkel att test.

---

## Kapitel 10: Klasser

Just i den här uppgiften så använder jag inte mig av klasser eftersom att enligt React's officiella dokumentation är funktionella komponenter det rekommenderade sättet. Men även om jag har använt funktionella komponenter så har jag tillämpat "Single Responsibility Principle" genom att dela upp koden i små, fokuserade funktioner. Varje funktion har ett tydligt ansvar och all relaterad logik grupperas tillsammans vilket ger hög "Cohesion". Jag har organiserat koden enligt "Class Organization"-principerna med state-hantering först, sedan hjälpfunktioner, och slutligen render-logik, även om det tekniskt inte är en klass.

---

## Kapitel 11: System

Jag har försökt separera konstruktion från användning genom att lägga initialization-logik i `useEffect`, men jag inser att jag kunde gjort det bättre. Mina event handlers blandar fortfarande construction (skapar nya habits, sparar till storage) med användning, vilket gör koden svårare att testa. Jag har hårdkodade dependencies istället för dependency injection, så AsyncStorage och habitManager importeras direkt i komponenten. Ett service layer hade varit bättre enligt kapitel 11, men nu är systemet funktionellt även om det inte följer alla principerna perfekt.

---

## Sammanfattande Reflektion

Clean Code kapitel 2-11 har påverkat min kod genom att göra den mer läsbar och strukturerad. De viktigaste lärdomar är att använda beskrivande namn (Kap 2), dela upp stora funktioner i små fokuserade funktioner (Kap 3), och ta bort onödiga kommentarer genom att göra koden självförklarande (Kap 4). Jag märkte att det finns ett spänningsförhållande mellan att göra funktioner små och att hålla relaterad logik tillsammans - ibland kan för många små funktioner sprida ut logiken för mycket.

Det jag tyckte var svårast var att tillämpa Kapitel 11 om systems fullt ut, eftersom jag har hårdkodade dependencies istället för dependency injection. I efterhand inser jag att ett service layer hade gjort koden mer testbar och flexibel. Jag är nöjd med min namngivning och funktionsstruktur, men jag ser att separation of concerns kunde varit bättre. Det har varit en lärorik process att reflektera över min kod och identifiera förbättringsområden, även om all kod inte blev perfekt enligt boken.