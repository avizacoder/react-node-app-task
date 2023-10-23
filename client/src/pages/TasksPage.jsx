import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TasksCard from "../components/TasksCard"

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return (<h2>No hay tareas</h2>)

  return <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-2 mx-10">
      {tasks.map((task) => (
        <TasksCard task={task} key={task.id}/>
      ))}
    </div>
}

export default TasksPage;
