import React, { useState } from 'react';

export default function Home() {
    // State to manage the current task input by the user
    const [task, setTask] = useState('');
    
    // State to manage tasks in different categories (To-Do, Ongoing, Completed)
    const [tasks, setTasks] = useState({
        todo: [],
        ongoing: [],
        completed: []
    });

    // Handles the change in the task input field
    const handleInputChange = (e) => {
        setTask(e.target.value); // Update task state with the input value
    };

    // Generates a unique ID for each task (used to track tasks)
    const generateTaskId = () => '_' + Math.random().toString(36).substr(2, 9);

    // Adds a new task to the 'todo' category if the input is not empty
    const addTask = () => {
        if (task.trim() !== '') {
            setTasks((prevTasks) => ({
                ...prevTasks,
                todo: [
                    ...prevTasks.todo, // Add new task to the existing tasks in 'todo'
                    { id: generateTaskId(), text: task } // New task with unique ID
                ]
            }));
            setTask(''); // Clear the input field after adding the task
        }
    };

    // Moves a task from one category to another (todo, ongoing, completed)
    const moveTask = (currentCategory, targetCategory, taskToMove) => {
        setTasks((prevTasks) => {
            // Remove the task from the current category
            const updatedCurrentCategory = prevTasks[currentCategory].filter(
                (t) => t.id !== taskToMove.id
            );

            // Add the task to the target category
            const updatedTargetCategory = [...prevTasks[targetCategory], taskToMove];

            return {
                ...prevTasks,
                [currentCategory]: updatedCurrentCategory, // Update the current category
                [targetCategory]: updatedTargetCategory // Update the target category
            };
        });
    };

    // Deletes a task from a specified category
    const deleteTask = (category, taskToDelete) => {
        setTasks((prevTasks) => {
            // Filter out the task that needs to be deleted
            const updatedCategory = prevTasks[category].filter(
                (task) => task.id !== taskToDelete.id
            );

            return {
                ...prevTasks,
                [category]: updatedCategory // Update the category after deletion
            };
        });
    };

    // Clears all tasks from all categories, with a confirmation prompt
    const clearAllTasks = () => {
        if (window.confirm('Are you sure you want to clear all tasks?')) {
            setTasks({
                todo: [],
                ongoing: [],
                completed: []
            });
        }
    };

    return (
        <div className="home">
            <h1 className="app-title">To-Do App</h1>

            {/* Task form to enter new tasks */}
            <form
                className="task-form"
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent form submission from reloading page
                    addTask(); // Add the new task
                }}
            >
                <input
                    type="text"
                    placeholder="Enter task..."
                    className="task-input"
                    value={task} // Set the current value of the input to the task state
                    onChange={handleInputChange} // Update task state on input change
                />
                <button
                    type="button"
                    className="add-task-button"
                    onClick={addTask} // Call addTask function when button is clicked
                >
                    ADD TASK
                </button>
            </form>

            {/* Task sections to display tasks based on their categories */}
            <div className="task-sections">
                {/* To-Do Tasks Section */}
                <div className="task-section todo">
                    <h2>To-Do Tasks</h2>
                    <ul>
                        {/* If no tasks in To-Do, show a placeholder message */}
                        {tasks.todo.length === 0 ? (
                            <li className="empty">No tasks yet!</li>
                        ) : (
                            tasks.todo.map((t) => (
                                <li key={t.id}>
                                    {t.text}
                                    {/* Dropdown to move or delete tasks */}
                                    <select
                                        value=""
                                        onChange={(e) =>
                                            e.target.value === 'delete'
                                                ? deleteTask('todo', t)
                                                : moveTask('todo', e.target.value, t)
                                        }
                                    >
                                        <option value="" disabled>
                                            Move to...
                                        </option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                        <option value="delete">Delete</option>
                                    </select>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Ongoing Tasks Section */}
                <div className="task-section ongoing">
                    <h2>Ongoing Tasks</h2>
                    <ul>
                        {tasks.ongoing.length === 0 ? (
                            <li className="empty">No ongoing tasks!</li>
                        ) : (
                            tasks.ongoing.map((t) => (
                                <li key={t.id}>
                                    {t.text}
                                    <select
                                        value=""
                                        onChange={(e) =>
                                            e.target.value === 'delete'
                                                ? deleteTask('ongoing', t)
                                                : moveTask('ongoing', e.target.value, t)
                                        }
                                    >
                                        <option value="" disabled>
                                            Move to...
                                        </option>
                                        <option value="todo">To-Do</option>
                                        <option value="completed">Completed</option>
                                        <option value="delete">Delete</option>
                                    </select>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Completed Tasks Section */}
                <div className="task-section completed">
                    <h2>Completed Tasks</h2>
                    <ul>
                        {tasks.completed.length === 0 ? (
                            <li className="empty">No completed tasks!</li>
                        ) : (
                            tasks.completed.map((t) => (
                                <li key={t.id}>
                                    {t.text}
                                    <select
                                        value=""
                                        onChange={(e) =>
                                            e.target.value === 'delete'
                                                ? deleteTask('completed', t)
                                                : moveTask('completed', e.target.value, t)
                                        }
                                    >
                                        <option value="" disabled>
                                            Move to...
                                        </option>
                                        <option value="todo">To-Do</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="delete">Delete</option>
                                    </select>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            {/* Button to clear all tasks from all categories */}
            <button className="clear-all-button" onClick={clearAllTasks}>
                Clear All Tasks
            </button>
        </div>
    );
}
