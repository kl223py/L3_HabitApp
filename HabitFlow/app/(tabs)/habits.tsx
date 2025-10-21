import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Switch, FlatList, Alert } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import habitManager from "../../utils/habitManagerWrapper";

interface Habit {
  id: string;
  name: string;
  description: string;
  allowMissedDays: boolean;
  maxMissedDays?: number;
  currentStreak?: number;
  isStreakBroken?: boolean;
  createdAt?: string;
}

const STORAGE_KEY = 'habits';

export default function Habits() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [allowMissedDays, setAllowMissedDays] = useState(false);
  const [maxMissedDays, setMaxMissedDays] = useState('');
  const [habits, setHabits] = useState<Habit[]>([]);

  async function loadStoredHabits(): Promise<Habit[]> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading habits:', error);
      return [];
    }
  }

  function registerHabitInManager(habit: Habit) {
    try {
      const options = habit.allowMissedDays
        ? { allowMissedDays: true, maxMissedDays: habit.maxMissedDays || 0 }
        : undefined;

      habitManager.createHabit(habit.id, habit.description, options);
    } catch (error) {
      console.error(`Error initializing habit ${habit.id}:`, error);
    }
  }

  function addStreakDataToHabit(habit: Habit): Habit {
    try {
      return {
        ...habit,
        currentStreak: habitManager.getCurrentStreak(habit.id),
        isStreakBroken: habitManager.isStreakBroken(habit.id)
      };
    } catch (error) {
      console.error(`Error loading habit ${habit.id}:`, error);
      return habit;
    }
  }

  const initializeHabitManager = useCallback(async () => {
    const storedHabits = await loadStoredHabits();
    storedHabits.forEach(registerHabitInManager);
  }, []);

  const loadHabitsFromStorage = useCallback(async () => {
    const storedHabits = await loadStoredHabits();
    const enrichedHabits = storedHabits.map(addStreakDataToHabit);
    setHabits(enrichedHabits);
  }, []);

  useEffect(() => {
    initializeHabitManager();
    loadHabitsFromStorage();
  }, [initializeHabitManager, loadHabitsFromStorage]);

  async function handleAddHabit() {
    if (!isValidHabitName(habitName)) {
      alert('Please enter a habit name.');
      return;
    }

    try {
      const newHabit = createHabitFromInputs();
      registerHabitInManager(newHabit);
      await saveHabitToStorage(newHabit);
      await loadHabitsFromStorage();
      resetFormAndCloseModal();
    } catch (error) {
      alert(getErrorMessage(error));
    }
  }

  function isValidHabitName(name: string): boolean {
    return name.trim().length > 0;
  }

  function createHabitFromInputs(): Habit {
    return {
      id: generateHabitId(habitName),
      name: habitName,
      description: habitDescription || habitName,
      allowMissedDays: allowMissedDays,
      maxMissedDays: allowMissedDays ? parseInt(maxMissedDays) || 0 : undefined,
      createdAt: new Date().toISOString(),
    };
  }

  function generateHabitId(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  async function saveHabitToStorage(habit: Habit) {
    const existingHabits = await loadStoredHabits();
    existingHabits.push(habit);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existingHabits));
  }

  function resetFormAndCloseModal() {
    setHabitName('');
    setHabitDescription('');
    setAllowMissedDays(false);
    setMaxMissedDays('');
    setIsModalVisible(false);
  }

  async function markHabitComplete(habitId: string) {
    try {
      const wasCompleted = habitManager.addCompletion(habitId, new Date());
      const message = wasCompleted ? 'Habit completed today!' : 'Already completed today!';
      alert(message);
      await loadHabitsFromStorage();
    } catch (error) {
      alert(getErrorMessage(error));
    }
  }

  async function deleteHabit(habitId: string) {
    try {
      habitManager.deleteHabit(habitId);
      await removeHabitFromStorage(habitId);
      await loadHabitsFromStorage();
    } catch (error) {
      console.error('Error deleting habit:', error);
      alert('Failed to delete habit.');
    }
  }

  async function removeHabitFromStorage(habitId: string) {
    const existingHabits = await loadStoredHabits();
    const filteredHabits = existingHabits.filter(habit => habit.id !== habitId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHabits));
  }

  function confirmDelete(habitId: string, habitName: string) {
    Alert.alert(
      'Delete Habit',
      `Are you sure you want to delete the habit "${habitName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteHabit(habitId) }
      ]
    );
  }

  function showHabitDetails(habitId: string) {
    try {
      const habit = habitManager.getHabit(habitId);
      if (!habit) return;

      const details = formatHabitDetailsMessage(habit, habitId);
      Alert.alert(habit.name, details, [{ text: 'OK' }]);
    } catch (error) {
      alert(getErrorMessage(error));
    }
  }

  function formatHabitDetailsMessage(habit: any, habitId: string): string {
    const currentStreak = habitManager.getCurrentStreak(habitId);
    const isBroken = habitManager.isStreakBroken(habitId);
    const status = isBroken ? 'Streak Broken' : 'Active';
    const missedDaysInfo = habit.allowMissedDays 
      ? `Yes (${habit.maxMissedDays})` 
      : 'No';

    return `Streak: ${currentStreak} days\nStatus: ${status}\nMissed Days Allowed: ${missedDaysInfo}`;
  }

  function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return 'An error occurred';
  }

  function renderHabitCard({ item }: { item: Habit }) {
    return (
      <TouchableOpacity
        style={styles.habitCard}
        onLongPress={() => showHabitDetails(item.id)}
      >
        <View style={styles.habitInfo}>
          <Text style={styles.habitName}>{item.name}</Text>
          <Text style={styles.habitDescription}>{item.description}</Text>
          <Text style={styles.habitDetails}>
            Streak: {item.currentStreak || 0} Days
            {item.isStreakBroken && ' (Broken)'}
          </Text>
          {item.allowMissedDays && (
            <Text style={styles.habitDetails}>
              Max missed days: {item.maxMissedDays} days
            </Text>
          )}
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => markHabitComplete(item.id)}
          >
            <Text style={styles.completeButtonText}>✓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmDelete(item.id, item.name)}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  function renderEmptyState() {
    return (
      <Text style={styles.instructionsText}>
        To add a new habit, press the &quot;+&quot;  button below.
      </Text>
    );
  }

  function renderHabitList() {
    if (habits.length === 0) {
      return renderEmptyState();
    }

    return (
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabitCard}
        contentContainerStyle={styles.listContainer}
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderHabitList()}

      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.5}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add new Habit</Text>

            <TextInput
              style={styles.input}
              placeholder="Habit Name (e.g., 'Exercise')"
              value={habitName}
              onChangeText={setHabitName}
            />

            <TextInput
              style={styles.input}
              placeholder="Habit Description"
              value={habitDescription}
              onChangeText={setHabitDescription}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Allow Missed Days</Text>
              <Switch
                value={allowMissedDays}
                onValueChange={setAllowMissedDays}
                trackColor={{ false: '#ddd', true: '#A58BFF' }}
                thumbColor={allowMissedDays ? '#fff' : '#f4f3f4'}
              />
            </View>

            {allowMissedDays && (
              <TextInput
                style={styles.input}
                placeholder="Max Missed Days"
                value={maxMissedDays}
                onChangeText={setMaxMissedDays}
                keyboardType="numeric"
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleAddHabit}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={resetFormAndCloseModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  instructionsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 100,
  },
  habitCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
  },
  habitInfo: {
    flex: 1,
    marginRight: 10,
  },
  habitName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  habitDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  habitDetails: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  buttonGroup: {
    flexDirection: 'column',
    gap: 8,
  },
  completeButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#A58BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#6C63FF',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#A58BFF',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  switchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingVertical: 5,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333'
  },
});