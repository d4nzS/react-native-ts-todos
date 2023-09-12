import { FC, useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import TodoItem from './TodoItem/TodoItem';
import { TODO_ITEM_HEIGHT } from './TodoItem/constants';

interface TodoListProps {
  tasks: string[];
  onDeleteTask: (index: number) => void;
}

const TodoList: FC<TodoListProps> = ({ tasks, onDeleteTask }) => {
  const getTodoItemLayout = useCallback((_: ArrayLike<string> | null | undefined, index: number) => ({
    length: TODO_ITEM_HEIGHT,
    offset: TODO_ITEM_HEIGHT * index,
    index
  }), []);

  const renderTodoItem = useCallback(({ item, index }: ListRenderItemInfo<string>) => <TodoItem
    task={item}
    onDeleteTask={onDeleteTask.bind(null, index)}
  />, []);

  return (
    <FlatList
      getItemLayout={getTodoItemLayout}
      keyExtractor={(_, index) => index.toString()}
      data={tasks}
      renderItem={renderTodoItem}
    />
  );
};

export default TodoList;
