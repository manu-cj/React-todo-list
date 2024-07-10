  import { useState, useEffect } from 'react'

import './App.css'
// import Task from './Task';
import ActiveTasks from './ActiveTasks';
import CompletedTasks from './completedTask';


interface TaskItem {
  name: string;
  active: boolean;
  completed: boolean;
  end: string;
}

function App() {
  const [style, setStyle] = useState<React.CSSProperties>({
    zIndex: '3',
    animationName: 'showCard',
    animationDuration: '4s',
    left: '0',
    top: '0'
  });

  const [style2, setStyle2] = useState<React.CSSProperties>({
    zIndex: '1',
    animationName: 'hideCard',
    animationDuration: '4s',
    left: '5px',
    bottom: '395px'
  });


  const getActive = () => {
    setStyle2(prevStyle => ({
      ...prevStyle,
      zIndex: prevStyle.zIndex === '1' ? '4' : '1',
      animationName: prevStyle.animationName === 'hideCard' ? 'showCard' : 'hideCard',
      left: prevStyle.left === '5px' ? '0' : '5px',
      bottom: prevStyle.bottom === '395px' ? '400px' : '395px',
    }));

    setStyle(prevStyle => ({
      ...prevStyle,
      animationName: prevStyle.animationName === 'showCard' ? 'hideCard' : 'showCard',
      left: prevStyle.left === '0' ? '5px' : '0',
      top: prevStyle.top === '0' ? '5px' : '0',
    }));

    setTimeout(() => {
      setStyle(prevStyle => ({
        ...prevStyle,
        zIndex: prevStyle.zIndex === '3' ? '1' : '3',
      }));
    }, 400);
  };

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    return storedTasks;
});

useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
  

  return (
    <>
      <header>
        <h1>Todos</h1>
      </header>
      {/* <Task style={style} changeDisplay={getActive} changeDisplay2={getCompleted}/> */}
      <ActiveTasks tasks={tasks} setTasks={setTasks} style={style} changeDisplay={getActive} />
      <CompletedTasks tasks={tasks} setTasks={setTasks} style={style2} changeDisplay={getActive} />
    </>
  );
}

export default App;