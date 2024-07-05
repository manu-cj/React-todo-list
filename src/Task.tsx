function Task() {


    return (
      <>
       <section className='card all-task'>
        <div className="header-card">
          <input type="text" name="task-input" id="task--input" placeholder="What needs to be done"/>
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