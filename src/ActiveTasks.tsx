import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckDouble } from "@fortawesome/free-solid-svg-icons";

interface TaskItem {
  name: string;
  active: boolean;
  completed: boolean;
  end: string;
}

interface ActiveTasksProps {
  style: React.CSSProperties;
  changeDisplay: () => void;
}

const ActiveTasks: React.FC<ActiveTasksProps> = ({ style, changeDisplay }) => {
  const tasks: TaskItem[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  const countTask = tasks.length;

 

  const listTasks = tasks.map((task: TaskItem, index: number) =>
    task.active === true ? (
      <li className="task" key={index}>
        <p className="active">Active</p>
        <div className="task-data">
          <p>End : {task.end}</p>
          <p className="task-name">
            <strong>{task.name}</strong>
          </p>
        </div>
        <FontAwesomeIcon
          className="add-doing-button"
          title="Mark this task as completed"
          icon={faCheckDouble}
          // onClick={() => completedTask(index)}
        />
        <FontAwesomeIcon
          className="delete-button"
          title="Delete this task"
          icon={faTrash}
          // onClick={() => deleteTaskActived(index)}
        />
      </li>
    ) : null
  );

  return (
    <section className="card active-task" style={style}>
      <div className="header-card">
        <h2>Active Tasks</h2>
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
            <li onClick={changeDisplay}>All</li>
            <li className="selected">Active</li>
            <li>Completed</li>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ActiveTasks;
