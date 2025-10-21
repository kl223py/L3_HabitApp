declare module 'habit_tracker_module' {
  export interface HabitOptions {
    allowMissedDays?: boolean;
    maxMissedDays?: number;
  }

  export interface Habit {
    id: string;
    name: string;
    completions: Date[];
    allowMissedDays: boolean;
    maxMissedDays: number;
    addCompletion(date?: Date): boolean;
    removeCompletion(date: Date): boolean;
    getCompletions(): Date[];
    hasCompletionOnDate(date: Date): boolean;
  }

  export class HabitManager {
    constructor();
    
    createHabit(habitId: string, name: string, options?: HabitOptions): Habit;

    getCurrentStreak(habitId: string): number;

    isStreakbroken(habitId: string): boolean;

    getHabit(habitId: string): Habit | undefined
    
    getAllHabits(): Habit[];

    deleteHabit(habitId: string): boolean;
  }

  const habitManager: HabitManager;
  export default habitManager;
}