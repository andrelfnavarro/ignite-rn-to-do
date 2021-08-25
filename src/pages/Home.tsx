import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find((task) => task.title === newTaskTitle);

    if (taskWithSameTitle) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

      return;
    }

    setTasks((oldTasks) => [
      ...oldTasks,
      { done: false, title: newTaskTitle, id: new Date().getTime() },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const findTaskIndex = tasks.findIndex((task) => task.id === id);

    if (findTaskIndex !== -1) {
      setTasks((oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === id) {
            return { ...task, done: !task.done };
          }

          return task;
        });
      });
    }
  }

  function promptDeletionAlert(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => handleRemoveTask(id),
        },
        {
          text: "Não",
        },
      ]
    );
  }

  function handleRemoveTask(id: number) {
    setTasks((oldTasks) => {
      return oldTasks.filter((task) => task.id !== id);
    });
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const findTaskIndex = tasks.findIndex((task) => task.id === taskId);

    if (findTaskIndex !== -1) {
      setTasks((oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, title: taskNewTitle };
          }

          return task;
        });
      });
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={promptDeletionAlert}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
