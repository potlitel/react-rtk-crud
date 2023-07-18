import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  /**
   * Description
   * @param {any} e
   * @returns {any}
   *  */
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Description
   * @param {any} e
   * @returns {any}
   *  */
  const handleSubmit = (e) => {
    e.preventDefault(); //evitamos que se refresque la página
    // console.log(task);
    if (params.id) {
      dispatch(updateTask({ ...task, id: params.id }));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      const foundTask = tasks.find((task) => task.id === params.id);
      foundTask && setTask(foundTask); //Evitamos el error de task not found
      //faltaría adicionar un mensaje de info al usuario en caso de no encontrarse la tarea a editar
      // setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks]);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label className="block text-xs font-bold mb-2">Task:</label>
      <input
        name="title"
        type="text"
        onChange={handleChange}
        value={task.title !== "" ? task.title : ""}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        placeholder="Write a title"
        autoFocus
      ></input>
      <label className="block text-xs font-bold mb-2">Description:</label>
      <input
        name="description"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        placeholder="Write a description"
        onChange={handleChange}
        value={task.description ? task.description : ""}
      ></input>
      <button className="bg-indigo-600 rounded-sm px-2 py-1">Save</button>
    </form>
  );
}

export default TaskForm;
