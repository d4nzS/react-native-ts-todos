import { FC } from 'react';
import { FlatList } from 'react-native';

import TodoItem from './TodoItem/TodoItem';

interface TodoListProps {
  tasks: string[];
  onDeleteTask: (index: number) => void;
}

const TodoList: FC<TodoListProps> = ({ tasks, onDeleteTask }) => {
  return (
    <FlatList
      keyExtractor={(_, index) => index.toString()}
      data={tasks}
      renderItem={({ item, index }) => <TodoItem
        task={item}
        onDeleteTask={onDeleteTask.bind(null, index)}
      />}
    />
  );
};

export default TodoList;
