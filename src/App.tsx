  import { useState } from 'react'

import './App.css'
import Task from './Task';
import ActiveTasks from './ActiveTasks';


function App() {
  const [style, setStyle] = useState<React.CSSProperties>({
    zIndex: '4'
  });

  // const [style2, setStyle2] = useState<React.CSSProperties>({
  //   backgroundColor: 'green',
  //   color: 'white',
  //   padding: '20px',
  //   textAlign: 'center'
  // });

  const getActive = () => {
    setStyle(prevStyle => ({
      ...prevStyle,
      zIndex: prevStyle.zIndex === '4' ? '0' : '4',
    }));
  };

  // const handleClick2 = () => {
  //   setStyle2(prevStyle => ({
  //     ...prevStyle,
  //     backgroundColor: prevStyle.backgroundColor === 'green' ? 'purple' : 'green',
  //   }));
  

  return (
    <>
      <header>
        <h1>Todos</h1>
      </header>
      <Task />
      <ActiveTasks style={style} changeDisplay={getActive} />
    </>
  );
}

export default App;