import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface TaskItem {
  task: string;
  active: boolean;
  completed: boolean;
}

function Task() {
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");

   function addTask() {
    const newTask = { task: task, active:false ,completed: false, end:date };
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as TaskItem[];
    const newTasks = [...storedTasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTask(newTasks[0].task);
    setTask('');
    setDate(''); 
   }

   const handleDateChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value); // Mettre à jour l'état 'date' lorsque l'entrée de la date change
  }

    return (
      <>
       <section className='card all-task'>
        <div className="header-card">
          <input type="text" name="task-input" className="task-input" placeholder="What needs to be done" value={task} onChange={(e) => setTask(e.target.value)}/>
          <input type="date" name="date-input" className="date-input"  value={date} onChange={handleDateChange}/>
          <FontAwesomeIcon className='add-task-button' icon={faPlus} onClick={addTask} />
        </div>
        <div className="main-card">
          <li className="task"><input type="checkbox" name="check-task" className="check-task" />Learn React</li>
          <li className="task"><input type="checkbox" name="check-task" className="check-task" />Learn TypeScript</li>
        </div>
        <div className="footer-card">
          <div className="item-number"><p>Item : 2</p></div>
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