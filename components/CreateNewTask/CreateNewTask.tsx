import { FC, useEffect, useState } from 'react';
import { DimensionValue, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import Colors from '../../constants/colors';
import { LAYOUT_PADDING_HORIZONTAL } from './constants';

interface CreateNewTaskProps {
  onCreateTask: (task: string) => void;
}

const CreateNewTask: FC<CreateNewTaskProps> = ({ onCreateTask }) => {
  const [task, setTask] = useState<string>('');
  const inputWidth = useSharedValue<DimensionValue>('100%');
  const buttonLeftOffset = useSharedValue<DimensionValue>(LAYOUT_PADDING_HORIZONTAL);

  useEffect(() => {
    if (task.length) {
      inputWidth.value = withSpring('75%');
      buttonLeftOffset.value = withSpring(0);
    } else {
      inputWidth.value = withSpring('100%');
      buttonLeftOffset.value = withSpring(LAYOUT_PADDING_HORIZONTAL);
    }
  }, [task]);

  const animatedInputStyles = useAnimatedStyle(() => ({
    width: inputWidth.value
  }));

  const animatedButtonStyles = useAnimatedStyle(() => ({
    left: buttonLeftOffset.value
  }));

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
