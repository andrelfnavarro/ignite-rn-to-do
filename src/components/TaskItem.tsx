import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/trash/pen.png";
import { Task } from "./TasksList";

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isBeingEdited]);

  const handleStartEditing = () => {
    setIsBeingEdited(true);
  };

  const handleCancelEditing = () => {
    setNewTitle(task.title);
    setIsBeingEdited(false);
  };

  const handleSubmitEditing = () => {
    editTask(task.id, newTitle);
    setIsBeingEdited(false);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
      >
        <View
          testID={`marker-${index}`}
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          {task.done && <Icon name="check" size={12} color="#FFF" />}
        </View>

        <TextInput
          ref={textInputRef}
          style={task.done ? styles.taskTextDone : styles.taskText}
          onChangeText={setNewTitle}
          value={newTitle}
          editable={isBeingEdited}
          onSubmitEditing={handleSubmitEditing}
          onBlur={handleCancelEditing}
          returnKeyType="send"
        />
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        {isBeingEdited ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          disabled={isBeingEdited}
          onPress={() => removeTask(task.id)}
        >
          <Image
            source={trashIcon}
            style={{ opacity: isBeingEdited ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 32,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    marginRight: 20,
    marginLeft: "auto",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconsDivider: {
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    width: 1,
    height: 24,
    marginHorizontal: 12,
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
