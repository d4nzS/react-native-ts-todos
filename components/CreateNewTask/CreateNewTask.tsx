import { FC, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Colors from '../../constants/colors';

interface CreateNewTaskProps {
  onCreateTask: (task: string) => void;
}

const CreateNewTask: FC<CreateNewTaskProps> = ({ onCreateTask }) => {
  const [task, setTask] = useState<string>('');

  const changeTaskTextInputHandler = (text: string): void => {
    setTask(text);
  };

  const createNewTaskHandler = (): void => {
    if (task.trim()) {
      onCreateTask(task);

      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write a task"
        placeholderTextColor={Colors.PRIMARY}
        style={styles.input}
        value={task}
        onChangeText={changeTaskTextInputHandler}
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={createNewTaskHandler}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20
  },
  input: {
    textAlign: 'center',
    backgroundColor: Colors.SECONDARY,
    width: 250,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 60
  },
  buttonContainer: {
    backgroundColor: Colors.SECONDARY,
    width: 60,
    height: 60,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontSize: 18
  }
});

export default CreateNewTask;
