import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, updateTask, toggleTaskCompletion } from "../store/todoSlice";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
import { CiSaveUp2 } from "react-icons/ci";
import "./TodoList.css";

function TodoList() {
    const [task, setTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [updatedTask, setUpdatedTask] = useState("");
    const tasks = useSelector((state) => state.todos.tasks);
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (task.trim() !== "") {
            dispatch(addTask(task));
            setTask("");
        }
    };

    const handleDelete = (index) => {
        dispatch(deleteTask(index));
    };

    const handleUpdate = () => {
        if (updatedTask.trim() !== "") {
            dispatch(updateTask({ index: editIndex, newTask: updatedTask }));
            setEditIndex(null);
            setUpdatedTask("");
        }
    };

    const handleToggleCompletion = (index) => {
        dispatch(toggleTaskCompletion(index)); 
    };

 
    useEffect(() => {
        if (task !== "") {
            document.querySelector(".todo-input").focus();
        }
    }, [task]);

    return (
        <div className="todo-page">
            <div className="list">
                <input
                    style={{ width: "100px" }}
                    className="todo-input w-50"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter task"
                />
                <Button className="todo-button" onClick={handleAdd} aria-label="Add Task">
                    Add
                </Button>
            </div>
            <div className="task-list">
                <p className="headings">Task List</p>
                <div>
                    {tasks.map((task, index) => (
                        <div key={index} className="task-item">
                            {editIndex === index ? (
                                <div className="edit-input">
                                    <input
                                        className="edit-input form-control w-50"
                                        value={updatedTask}
                                        onChange={(e) => setUpdatedTask(e.target.value)}
                                    />
                                    <Button className="editButton" onClick={handleUpdate} aria-label="Save Update">
                                        <CiSaveUp2 />
                                    </Button>
                                    <Button
                                        className="editButton"
                                        onClick={() => setEditIndex(null)}
                                        aria-label="Cancel Update"
                                    >
                                        <MdOutlineCancel />
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleCompletion(index)}
                                        aria-label="Toggle Task Completion"
                                    />
                                    <b className={`task-out ${task.completed ? 'completed' : ''}`}>{task.task}</b>
                                    <Button
                                        className="editButton"
                                        onClick={() => handleDelete(index)}
                                        aria-label="Delete Task"
                                    >
                                        <FaTrash />
                                    </Button>
                                    <Button
                                        className="editButton"
                                        onClick={() => {
                                            setEditIndex(index);
                                            setUpdatedTask(task.task);
                                        }}
                                        aria-label="Edit Task"
                                    >
                                        <FaEdit />
                                    </Button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TodoList;
