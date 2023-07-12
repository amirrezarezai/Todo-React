import { useContext, useEffect, useState } from "react"
import TodoContext from "../context/TodoContext"
import axios from "axios";
import FilterTodos from "../components/FilterTodos";
import CreateTodos from "../components/CreateTodos";
import UpdateTodo from "../components/UpdateTodo";
import DeleteTodo from "../components/DeleteTodo";

const Todos = () => {
    const { todos, dispatch, error } = useContext(TodoContext)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/')
            .then(res => {
                dispatch({ type: "SET_TODOS", payload: res.data })
                dispatch({ type: "SET_ERRORS", payload: null })
                setLoading(false)
            })
            .catch(err => {
                dispatch({ type: "SET_ERRORS", payload: err.message })
                dispatch({ type: "SET_TODOS", payload: [] })
                setLoading(false)
            })
    }, []);
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    < CreateTodos />
                    <FilterTodos />
                    {error && <div>{error}</div>}
                    {loading && <div className="spinner-border"></div>}
                    {todos && todos.map(todo => (
                        <div className="col-md-3 g-3" key={todo.id}>
                            <div className={"card " + (todo.completed && 'bg-light')}>
                                <div className="card-body d-flex justify-content-beetwen align-items-center">
                                    <div> {todo.completed ? <del>{todo.title}</del> : <span>{todo.title}</span>}
                                        <div className="d-flex align-items-center">
                                            <UpdateTodo todo={todo} />
                                            <DeleteTodo todoId={todo.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Todos