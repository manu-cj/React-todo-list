import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

interface TaskItem {
  name: string;
  active: boolean;
  completed: boolean;
  end: string;
}

interface ActiveTasksProps {
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  style: React.CSSProperties;
  changeDisplay: () => void;  
}

const CompletedTasks: React.FC<ActiveTasksProps> = ({tasks, setTasks, style, changeDisplay }) => {
    const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
    const [taskNameUpdate, setTaskNameUpdate] = useState<string>("");
    const [taskDateUpdate, setTaskDateUpdate] = useState<string>("");
    const [deleteTaskIndex, setDeleteTaskIndex] = useState<number | null>(null);
    // const [tasks, setTasks] = useState<TaskItem[]>(() => {
    //   const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    //   return storedTasks;
    // });

    const activeTask = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
          i === index ? { ...task, active: true, completed: false } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
      };

      const activeUpdate = (index: number) => {
        setEditingTaskIndex(index);
        setTaskNameUpdate(tasks[index].name);
        setTaskDateUpdate(tasks[index].end);
      };
    
      const stopUpdate = () => {
        setEditingTaskIndex(null);
      };
    
      const updateTask = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
          i === index ? { ...task, name: taskNameUpdate, end: taskDateUpdate } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setEditingTaskIndex(null);
        setTaskNameUpdate("");
        setTaskDateUpdate("");
      };
    
      const deleteTaskActived = (index: number) => {
        setDeleteTaskIndex(index);
      };
    
      const confirmDeleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setDeleteTaskIndex(null);
      };

  let countTask = 0;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.completed === true) {
        countTask +=1;
    }
  }

 

  const listTasks = tasks.map((task: TaskItem, index: number) =>
    task.completed === true ? (
        <li className="task" key={index} onDoubleClick={() => activeUpdate(index)}>
        {editingTaskIndex === index ? (
          <div className="taskUpdate">
            <input
              type="text"
              value={taskNameUpdate}
              onChange={(e) => setTaskNameUpdate(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  updateTask(index);
                }
                if (e.code === "Escape") {
                  stopUpdate();
                }
              }}
            />
            <input
              type="date"
              value={taskDateUpdate}
              onChange={(e) => setTaskDateUpdate(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  updateTask(index);
                }
                if (e.code === "Escape") {
                  stopUpdate();
                }
              }}
            />
            <button onClick={() => updateTask(index)}>Update</button>
            <FontAwesomeIcon
              className="delete-button"
              title="Stop update"
              icon={faTimes}
              onClick={stopUpdate}
            />
          </div>
        ) : deleteTaskIndex === index ? (
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this task?</p>
            <button className="deleteTask" onClick={() => confirmDeleteTask(index)}>Yes</button>
            <button onClick={() => setDeleteTaskIndex(null)}>No</button>
          </div>
        ) : (
          <>
            <p className="completed">Completed</p>
            <div className="task-data">
              <p>End : {task.end} </p>
              <p className="task-name">
                <strong>{task.name}</strong>
              </p>
            </div>
            <FontAwesomeIcon
                className="add-doing-button"
                title="Mark this task as active"
                icon={faCheck}
                onClick={() => activeTask(index)}
              />
            <FontAwesomeIcon
              className="delete-button"
              title="Delete this task"
              icon={faTrash}
              onClick={() => deleteTaskActived(index)}
            />
          </>
        )}
      </li>
    ) : null
  );

  return (
    <section className="card completed-task" style={style}>
      <div className="header-card">
        <h2>Completed Tasks</h2>
      </div>
      <div className="main-card">{listTasks}</div>
      <div className="footer-card">
        <div className="item-number">
          <p>
            <strong>Tasks: {countTask}</strong>
          </p>
        </div>
        <div className="control-div">
          <nav>
            <li onClick={changeDisplay}>Active</li>
            <li className="selected">Completed</li>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default CompletedTasks;
