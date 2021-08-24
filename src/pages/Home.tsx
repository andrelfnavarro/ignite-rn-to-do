import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks(oldTasks => [...oldTasks, {done: false, title: newTaskTitle, id: new Date().getTime()}])
  }

  function handleToggleTaskDone(id: number) {
    const findTaskIndex = tasks.findIndex(task => task.id === id);

    if (findTaskIndex !== -1) {
      setTasks(oldTasks => {
        return oldTasks.map(task => {
          if (task.id === id ) {
            return {...task, done: !task.done}
          }

          return task
        })
      })
    }
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => {
      return oldTasks.filter(task => task.id !== id);
    })
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})