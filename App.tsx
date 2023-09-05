import { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import CreateNewTask from './components/CreateNewTask/CreateNewTask';

const App: FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const createTaskHandler = (newTask: string): void => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const deleteTaskHandler = (taskIndex: number): void => {
    setTasks(prevTasks => prevTasks.filter((_, index) => index !== taskIndex));
  };

  return (
    <View style={styles.container}>
      <Header/>
      <TodoList
        tasks={tasks}
        onDeleteTask={deleteTaskHandler}
      />
      <CreateNewTask onCreateTask={createTaskHandler}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20
  }
});

export default App;
