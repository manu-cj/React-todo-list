import { useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
interface TaskItem {
    name: string;
    active: boolean;
    completed: boolean;
    end: string;
  }


export default function CalendarPage() {
  const [value, onChange] = useState<Value>();

  const [tasks] = useState<TaskItem[]>(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    return storedTasks;
});

const getTasksForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return tasks.filter(task => task.end === dateString);
  };
  return (
    <>
    <header>
        <nav><li><a href="/">home</a></li></nav>
        <h1>Calendar</h1>
      </header>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={({ date, view }) => {
            if (view === 'month') {
              const tasksForDate = getTasksForDate(date);
              return (
                <>
                  {tasksForDate.map((task, index) => (
                    <p key={index}>{task.name}</p>
                  ))}
                </>
              );
            }
            return null;
          }}
      />
    </>
  );
}
