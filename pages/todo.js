import Head from 'next/head';
import { useState, useEffect } from "react";
import { BiPlus, BiSend, BiCircle, BiCheckCircle, BiTrash } from "react-icons/bi"
import { IconContext } from "react-icons";
import { TodoEndpoints } from "./api/todo";

export default function Todo() {
    const [value, setValue] = useState(''); // value of input
    const [todos, setTodos] = useState([]); // todos array
    const [filterTodos, setFilterTodos] = useState([]); // filtered todos array
    const [tab, setTab] = useState(false); // selected tab

    useEffect(() => {
        // get todos from api from frist place
        TodoEndpoints.getTodos().then(response => {
            setTodos(response);
            setFilterTodos(response.filter(todo => todo.status === tab));
        });
    }, []);

    // user logout
    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    // change tab function
    const changeTab = (t) => {
        if (t) {
            if (tab === false) {
                setTab(true);
                // filter completed todos
                setFilterTodos(todos.filter(todo => todo.status === true));
            }
            else {
                setTab(false);
                // filter uncompleted todos
                setFilterTodos(todos.filter(todo => todo.status === false));
            }
        }
    };

    // delete todo function
    const deleteTodo = (id) => {
        TodoEndpoints.deleteTodo(id).then(response => {
            setTodos(todos.filter(todo => todo._id !== id));
            setFilterTodos(filterTodos.filter(todo => todo._id !== id));
        });
    };

    // update todo function
    const updateTodo = (todo) => {
        const old = todo;
        todo.status = !todo.status;
        TodoEndpoints.updateTodo(todo._id, todo).then(response => {
            setFilterTodos(filterTodos.filter(todo => todo.status === tab));
            setTodos(todos.map(t => t._id === old._id ? old : t));
        });
    };

    // add todo function
    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = {
            content: value,
            status: false
        };
        TodoEndpoints.addTodo(todo).then(response => {
            setTodos([...todos, response]);
            const t = [...todos, response];
            setFilterTodos(t.filter(todo => todo.status === tab));
            setValue('');
        });
    };

    return (
        <div>
            <Head>
                <title>Todo App</title>
                <meta name="description" content="Sample todo application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen">
                <div className="w-full border-b border-black/10 ">
                    <div className="max-w-4xl mx-auto flex justify-between gap-8 px-8 sm:px-16 items-center h-16 font-semibold text-md">
                        <h3>Todo List</h3>
                        <button onClick={logout} className="fade font-semibold hover:text-purple-900 transition-all duration-300">
                            Logout
                        </button>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="mt-6 px-8 sm:px-16">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row gap-2 bg-slate-100 rounded px-3 justify-between">
                                <div className="flex items-center">
                                    <IconContext.Provider value={{ size: "1.5rem", className: "text-black/60" }}>
                                        <BiPlus />
                                    </IconContext.Provider>
                                </div>
                                <input
                                    className="bg-transparent text-black/60 outline-none font-semibold py-3 grow"
                                    type="text"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <button onClick={handleSubmit} type="submit">
                                    <IconContext.Provider value={{ size: "1.5rem", className: "text-black/60" }}>
                                        <BiSend />
                                    </IconContext.Provider>
                                </button>

                            </div>
                        </form>
                    </div>
                    <div className="mt-6 px-8 sm:px-16">
                        <div className="flex flex-row gap-3 mb-1 text-black">
                            <button onClick={changeTab.bind(this, tab === false ? false : true)} className={(tab === false ? "bg-blue-500 text-white" : "bg-slate-100") + " px-3 py-2 font-semibold rounded"}>
                                Pending
                            </button>
                            <button onClick={changeTab.bind(this, tab === true ? false : true)} className={(tab === true ? "bg-blue-500 text-white" : "bg-slate-100") + " px-3 py-2 font-semibold rounded"}>
                                Completed
                            </button>
                        </div >
                    </div>
                    <div className="mt-2 px-8 sm:px-16">
                        {filterTodos.map((todo, index) => (
                            <div key={index} className="flex flex-row mb-2 gap-2 bg-slate-100 rounded px-3 justify-between">
                                <button onClick={updateTodo.bind(this, todo)} className="flex items-center">
                                    <IconContext.Provider value={{ size: "1.5rem", className: "text-black/60" }}>
                                        {todo.status ? <BiCheckCircle /> : <BiCircle />}
                                    </IconContext.Provider>
                                </button>
                                <input
                                    className="bg-transparent text-black/60 outline-none font-semibold py-3 grow"
                                    type="text"
                                    value={todo.content}
                                    readOnly
                                />
                                <button onClick={deleteTodo.bind(this, todo._id)}>
                                    <IconContext.Provider value={{ size: "1.5rem", className: "text-black/60" }}>
                                        <BiTrash />
                                    </IconContext.Provider>
                                </button>

                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </div>
    );
}