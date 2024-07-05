import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons'

interface TaskItem {
  name: string;
  active: boolean;
  completed: boolean;
  end : string;
}

function Task() {
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");

   function addTask() {
    const newTask = { name: task, active:false, completed: false, end:date };
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as TaskItem[];
    const newTasks = [...storedTasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTask(newTasks[0].name);
    setTask('');
    setDate(''); 
   }

   const handleDateChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  }

  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as TaskItem[];
  console.log(tasks);

  //TODO Remanier pour afficher les tache selon leurs etat completed -> active
  const listTasks = tasks.map((task, index) => (
   !task.completed ? 
    task.active ?
    <li className="task" key={index}>
      <p className='active'>Active</p>
      <div className="task-data">
        <p>End : {task.end} </p>
        <p className='task-name'><strong>{task.name}</strong></p>
      </div>
      <FontAwesomeIcon className='add-doing-button' title='add this task in completed' icon={faCheckDouble}  />
      <FontAwesomeIcon className='delete-button' title='delete this task' icon={faTrash}  />
    </li>
    :
    <li className="task" key={index}>
      <p className='todo'>Todo</p>
      <div className="task-data">
        <p>End : {task.end} </p>
        <p className='task-name'><strong>{task.name}</strong></p>
      </div>
      <FontAwesomeIcon className='add-doing-button' title='add this task in active' icon={faCheck}  />
      <FontAwesomeIcon className='delete-button' title='delete this task' icon={faTrash}  />
    </li>

    : 

    <li className="task" key={index}>
      <p className='completed'>Completed</p>
      <div className="task-data">
        <p className='task-name'><strong>{task.name}</strong></p>
      </div>
      <FontAwesomeIcon className='delete-button' title='delete this task' icon={faTrash}  />
    </li>
  )) 

  const countTask = tasks.length;

    return (
      <>
       <section className='card all-task'>
        <div className="header-card">
          <input type="text" name="task-input" className="task-input" placeholder="What needs to be done" value={task} onChange={(e) => setTask(e.target.value)}/>
          <input type="date" name="date-input" className="date-input"  value={date} onChange={handleDateChange}/>
          <FontAwesomeIcon className='add-task-button' icon={faPlus} onClick={addTask} />
        </div>
        <div className="main-card">
          {listTasks}
        </div>
        <div className="footer-card">
          <div className="item-number"><p><strong>Tasks : {countTask}</strong></p></div>
          <div className="control-div">
            <nav>
              <li className="selected">All</li>
              <li>Active</li>
              <li>Completed</li>
            </nav>
          </div>
          
        </div>
       </section>
      </>
    )
  }
  
  export default Task