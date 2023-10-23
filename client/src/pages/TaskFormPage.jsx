import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./task.css";

export default function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
    navigate("/tasks");
  });

  return (
    <div className="add-task">
      <form onSubmit={onSubmit}>
        <h1>ADD TASK</h1>
        <input
          type="text"
          {...register("title")}
          placeholder="Title"
          autoFocus
        />

        <textarea
          type="text"
          rows="3"
          {...register("description", { required: true })}
          placeholder="Description"
        ></textarea>
        <button>Save</button>
      </form>
    </div>
  );
}
