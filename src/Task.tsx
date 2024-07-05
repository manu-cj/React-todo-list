import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

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
    const newTask = { name: task, active:false ,completed: false, end:date };
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

  const listTasks = tasks.map((task, index) => (
    <li className="task" key={index}>
      <div className="task-data">
        <p><strong>End : </strong>{task.end} </p>
        <p className='task-name'>{task.name}</p>
      </div>
      <button className='task-button'>take</button>
      <FontAwesomeIcon className='add-task-button' icon={faTrash} onClick={addTask} />
    </li>
  ));

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
          <div className="item-number"><p>Item : {countTask} </p></div>
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