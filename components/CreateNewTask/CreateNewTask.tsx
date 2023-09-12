import { FC, useLayoutEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import Colors from '../../constants/colors';
import { LAYOUT_PADDING_HORIZONTAL, LAYOUT_WIDTH_WITHOUT_PADDING } from './constants';

interface CreateNewTaskProps {
  onCreateTask: (task: string) => void;
}

const CreateNewTask: FC<CreateNewTaskProps> = ({ onCreateTask }) => {
  const [task, setTask] = useState<string>('');
  const inputWidth = useSharedValue<number>(LAYOUT_WIDTH_WITHOUT_PADDING);
  const buttonLeftOffset = useSharedValue<number>(LAYOUT_PADDING_HORIZONTAL);

  useLayoutEffect(() => {
    inputWidth.value = buttonLeftOffset.value = withSpring(task.length ? 0 : 1);
  }, [task]);

  const animatedInputStyles = useAnimatedStyle(() => ({
    width: interpolate(
      inputWidth.value,
      [0, 1],
      [0.75 * LAYOUT_WIDTH_WITHOUT_PADDING, LAYOUT_WIDTH_WITHOUT_PADDING]
    )
  }));

  const animatedButtonStyles = useAnimatedStyle(() => ({
    left: interpolate(
      inputWidth.value,
      [0, 1],
      [0, LAYOUT_PADDING_HORIZONTAL]
    )
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
