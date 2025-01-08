import React, { useState } from 'react';

export default function Home() {
    const [task, setTask] = useState('');  // Input field value
    const [tasks, setTasks] = useState({
        todo: [],       // Tasks in To-Do
        ongoing: [],    // Tasks in Ongoing
        completed: []   // Tasks in Completed
    });

    // Handle input change
    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    // Add task to "To-Do" section
    const addTask = () => {
        if (task.trim() !== '') {
            setTasks((prevTasks) => ({
                ...prevTasks,
                todo: [...prevTasks.todo, task]
            }));
            setTask(''); // Clear input after adding task
        }
    };

    // Move task to another category
    const moveTask = (currentCategory, targetCategory, taskToMove) => {
        setTasks((prevTasks) => {
            // Remove task from current category
            const updatedCurrent = prevTasks[currentCategory].filter(
                (t) => t !== taskToMove
            );

            // Add task to target category
            const updatedTarget = [...prevTasks[targetCategory], taskToMove];

            return { 
                ...prevTasks, 
                [currentCategory]: updatedCurrent, 
                [targetCategory]: updatedTarget 
            };
        });
    };

    return (
        <div className="home">
            <h1 className="app-title">To-Do App</h1>

            <form
                className="task-form"
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent page reload on form submit
                    addTask();
                }}
            >
                <input
                    type="text"
                    placeholder="Enter task..."
                    className="task-input"
                    value={task}
                    onChange={handleInputChange}
                />
                <button
                    type="button"
                    className="add-task-button"
                    onClick={addTask}
                >
                    ADD TASK
                </button>
            </form>

            <div className="task-sections">
                {/* To-Do Section */}
                <div className="task-section">
                    <h2>To-Do Tasks</h2>
                    <ul>
                        {tasks.todo.length === 0 ? (
                            <li className="empty">No tasks yet!</li>
                        ) : (
                            tasks.todo.map((t, index) => (
                                <li key={index}>
                                    {t}
                                    <select
                                        onChange={(e) =>
                                            moveTask('todo', e.target.value, t)
                                        }
                                    >
                                        <option value="">Move to...</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Ongoing Section */}
                <div className="task-section">
                    <h2>Ongoing Tasks</h2>
                    <ul>
                        {tasks.ongoing.length === 0 ? (
                            <li className="empty">No ongoing tasks!</li>
                        ) : (
                            tasks.ongoing.map((t, index) => (
                                <li key={index}>
                                    {t}
                                    <select
                                        onChange={(e) =>
                                            moveTask('ongoing', e.target.value, t)
                                        }
                                    >
                                        <option value="">Move to...</option>
                                        <option value="todo">To-Do</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Completed Section */}
                <div className="task-section">
                    <h2>Completed Tasks</h2>
                    <ul>
                        {tasks.completed.length === 0 ? (
                            <li className="empty">No completed tasks!</li>
                        ) : (
                            tasks.completed.map((t, index) => (
                                <li key={index}>
                                    {t}
                                    <select
                                        onChange={(e) =>
                                            moveTask('completed', e.target.value, t)
                                        }
                                    >
                                        <option value="">Move to...</option>
                                        <option value="todo">To-Do</option>
                                        <option value="ongoing">Ongoing</option>
                                    </select>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
