import { useTasks } from "../context/TasksContext"
import { Link } from "react-router-dom"

function TasksCard({ task }) {
  
  const { deleteTask } = useTasks()

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <header className="flex justify-between">
        <h2 className="text-2xl font-bold">{task.title}</h2>
        <div className="flex gap-x-2 ">
          <Link to={`/tasks/${task.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
            Update
          </Link>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
            onClick={() => {
              deleteTask(task.id)
            }}
          >
            Delete
          </button>
        </div>
      </header>
      <p>{task.description}</p>
    </div>
  );
}

export default TasksCard;
