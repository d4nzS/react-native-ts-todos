import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Colors from '../../../constants/colors';
import { TODO_ITEM_HEIGHT } from './constants';

interface TodoItemProps {
  task: string;
  onDeleteTask: () => void;
}

const TodoItem: FC<TodoItemProps> = ({ task, onDeleteTask }) => {
  const deleteTaskHandler = (): void => {
    onDeleteTask();
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.squareIcon}></View>
        <View style={styles.taskTextContainer}>
          <Text>{task}</Text>
        </View>
      </View>
      <Pressable
        style={styles.circularIcon}
        onPress={deleteTaskHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SECONDARY,
    height: TODO_ITEM_HEIGHT,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTextContainer: {
    flex: 1,
    maxWidth: '80%'
  },
  squareIcon: {
    width: 24,
    height: 24,
    backgroundColor: Colors.ACCENT,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  circularIcon: {
    width: 12,
    height: 12,
    borderColor: Colors.ACCENT,
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default TodoItem;
