import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskPropsType>
}

const App = () => {


    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
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

    let removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl=>tl.id !== todolistId))
        delete tasks[todolistId]
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(st => st.id === taskId ? {...st, isDone} : st)})
    }


    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            todolistId={tl.id}
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



