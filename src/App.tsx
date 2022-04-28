import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskPropsType>
}

const App = () => {

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...newTasks]
        setTasks({...tasks})
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }

        setTasks({...tasks})
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Apples", isDone: true},
            {id: v1(), title: "Cheese", isDone: false},
            {id: v1(), title: "Potatoes", isDone: false},
            {id: v1(), title: "Juice", isDone: false}
        ]
    })

    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}

                        />
                    )
                })
            }

        </div>
    );
}

export default App;



