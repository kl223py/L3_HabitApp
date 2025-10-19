import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Switch} from "react-native";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Habits() {
  const [modalVisible, setModalVisible] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [allowMissedDays, setAllowMissedDays] = useState(false);
  const [maxMissedDays, setMaxMissedDays] = useState('');

  const handleAddHabit = async () => {
    if (!habitName.trim()) {
      alert('Please enter a habit name.');
      return;
    }

    const habitId = habitName.toLowerCase().replace(/\s+/g, '-');

    const newHabit = {
      id: habitId,
      name: habitName,
      description: habitDescription || habitName,
      allowMissedDays: allowMissedDays,
      maxMissedDays: allowMissedDays ? parseInt(maxMissedDays) || 0 : undefined,
      createdAt: new Date().toISOString(),
    }

    await saveHabit(newHabit);

    setHabitName('');
    setHabitDescription('');
    setAllowMissedDays(false);
    setMaxMissedDays('');
    setModalVisible(false);
  }

  const saveHabit = async (habit) => {
    try {
      const existingHabits = await AsyncStorage.getItem('habits');
      const habits = existingHabits ? JSON.parse(existingHabits) : [];
      habits.push(habit);
      await AsyncStorage.setItem('habits', JSON.stringify(habits));
      console.log('Habit saved successfully');
    } catch (error) {
      console.error('Error saving habit:', error);
      alert('Failed to save habit.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instructionsText}>
        To add a new habit, press the &quot;+&quot; button below.
      </Text>


      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.5}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
                trackColor={{ false: '#ddd', true: '#A58BFF'}}
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

                <Text style={styles.saveButtonText}> Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={() => {
                  setHabitName('');
                  setHabitDescription('');
                  setModalVisible(false)
                }}
              >
                <Text style={styles.cancelButtonText}>Close</Text>
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
  }
});
