// habitManagerWrapper.ts
// Placera denna fil i HabitFlow/utils/ eller HabitFlow/lib/

// Import direkt från source filerna
import HabitManager from 'habit_tracker_module';

// Skapa en singleton instans
const habitManager = new HabitManager();

// Exportera instansen
export default habitManager;

// Exportera även klassen om någon behöver den
export { HabitManager };