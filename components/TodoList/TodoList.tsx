import { FC, useCallback } from 'react';
import { FlatList } from 'react-native';

import TodoItem from './TodoItem/TodoItem';
import { MIN_HEIGHT } from './TodoItem/constants';

interface TodoListProps {
  tasks: string[];
  onDeleteTask: (index: number) => void;
}

const TodoList: FC<TodoListProps> = ({ tasks, onDeleteTask }) => {
  const renderTodoItem = useCallback(({ item, index }: { item: string, index: number }) => <TodoItem
    task={item}
    onDeleteTask={onDeleteTask.bind(null, index)}
  />, []);

  return (
    <FlatList
      getItemLayout={(_, index) => ({ length: MIN_HEIGHT, offset: MIN_HEIGHT * index, index })}
      keyExtractor={(_, index) => index.toString()}
      data={tasks}
      renderItem={renderTodoItem}
    />
  );
};

export default TodoList;
