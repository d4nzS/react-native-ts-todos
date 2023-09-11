import { FC, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Colors from '../../constants/colors';
import { LAYOUT_PADDING_HORIZONTAL, LAYOUT_WIDTH_WITHOUT_PADDINGS } from './constants';

interface CreateNewTaskProps {
  onCreateTask: (task: string) => void;
}

const CreateNewTask: FC<CreateNewTaskProps> = ({ onCreateTask }) => {
  const [task, setTask] = useState<string>('');
  const inputWidth =  useRef(new Animated.Value(LAYOUT_WIDTH_WITHOUT_PADDINGS)).current;
  const buttonLeftOffset = useRef(new Animated.Value(LAYOUT_PADDING_HORIZONTAL)).current;

  useEffect(() => {
    if (task.length) {
      Animated.spring(inputWidth, {
        toValue: 0.75 * LAYOUT_WIDTH_WITHOUT_PADDINGS,
        useNativeDriver: false,
      }).start();
      Animated.spring(buttonLeftOffset, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(inputWidth, {
        toValue: LAYOUT_WIDTH_WITHOUT_PADDINGS,
        useNativeDriver: false,
      }).start();
      Animated.spring(buttonLeftOffset, {
        toValue: LAYOUT_PADDING_HORIZONTAL,
        useNativeDriver: false,
      }).start();
    }
  }, [task]);

  const changeTaskTextInputHandler = (text: string): void => {
    setTask(text);
  };

  const createNewTaskHandler = (): void => {
    if (task.trim()) {
      onCreateTask(task);

      setTask('');
    }
  };

  const animatedInputStyles = {
    width: inputWidth
  };

  const animatedButtonStyles = {
    left: buttonLeftOffset
  };

  return (
    <View style={styles.container}>
      <Animated.View style={animatedInputStyles}>
        <TextInput
          placeholder="Write a task"
          placeholderTextColor={Colors.PRIMARY}
          style={styles.input}
          value={task}
          onChangeText={changeTaskTextInputHandler}
        />
      </Animated.View>
      <Animated.View style={[styles.buttonContainer, animatedButtonStyles]}>
        <Pressable onPress={createNewTaskHandler}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </Animated.View>
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
    left: LAYOUT_PADDING_HORIZONTAL,
    right: LAYOUT_PADDING_HORIZONTAL
  },
  input: {
    textAlign: 'center',
    backgroundColor: Colors.SECONDARY,
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
    justifyContent: 'center',
    position: 'relative'
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontSize: 18
  }
});

export default CreateNewTask;
