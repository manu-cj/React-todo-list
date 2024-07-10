import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckDouble, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

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

const ActiveTasks: React.FC<ActiveTasksProps> = ({tasks, setTasks, style, changeDisplay }) => {

  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
  const [taskNameUpdate, setTaskNameUpdate] = useState<string>("");
  const [taskDateUpdate, setTaskDateUpdate] = useState<string>("");
  const [deleteTaskIndex, setDeleteTaskIndex] = useState<number | null>(null);


  function addTask() {
    const newTask = { name: task, active: true, completed: false, end: date };
    const newTasks = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    setTask("");
    setDate("");
  }


  const completedTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, active: false, completed: true } : task
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


  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };





  let countTask = 0;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.active === true) {
        countTask +=1;
    }
  }

 

  const listTasks = tasks.map((task, index) =>
    task.active === true ? (
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
              <p className="active">Active</p>
              <div className="task-data">
                <p>End : {task.end} </p>
                <p className="task-name">
                  <strong>{task.name}</strong>
                </p>
              </div>
              <FontAwesomeIcon
                className="add-doing-button"
                title="Mark this task as completed"
                icon={faCheckDouble}
                onClick={() => completedTask(index)}
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
    <section className="card active-task" style={style}>
      <div className="header-card">
          <input
            type="text"
            name="task-input"
            className="task-input"
            placeholder="What needs to be done"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="date"
            name="date-input"
            className="date-input"
            value={date}
            onChange={handleDateChange}
          />
          <FontAwesomeIcon
            className="add-task-button"
            icon={faPlus}
            onClick={addTask}
          />
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
            <li className="selected">Active</li>
            <li onClick={changeDisplay}>Completed</li>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ActiveTasks;
