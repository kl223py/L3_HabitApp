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
    addCompletion(date: Date): boolean;
    removeCompletion(date: Date): boolean;
    getCompletions(): Date[];
    hasCompletionOnDate(date: Date): boolean;
  }

  export default class HabitManager {
    constructor();
    
    createHabit(habitId: string, name: string, options?: HabitOptions): Habit;
    
    addCompletion(habitId: string, date?: Date): boolean;
    
    removeCompletion(habitId: string, date: Date): boolean;
    
    getCurrentStreak(habitId: string): number;
    
    isStreakBroken(habitId: string): boolean;
    
    getHabit(habitId: string): Habit | undefined;
    
    getAllHabits(): Habit[];
    
    deleteHabit(habitId: string): boolean;
  }
}