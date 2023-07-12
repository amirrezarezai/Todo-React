import { useReducer } from "react"
import TodoContext from "./TodoContext"
import todoReducer from "./TodoReducer"
import axios from "axios";
import Swal from "sweetalert2";



const TodoProvider = ({ children }) =>{
    const initialstate ={
        todos : [] ,
        error : null
    }
    const [state , dispatch] = useReducer(todoReducer,initialstate)
    const filterTodos = (value) => {

        axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${value}`)
            .then(res => {
                dispatch({ type: "FILTER_TODOS", payload: res.data })
                dispatch({ type: "SET_ERRORS", payload: null })
            })
            .catch(err => {
                dispatch({ type: "SET_ERRORS", payload: err.message })
                dispatch({ type: "FILTER_TODOS", payload: [] })
            })
    }
    const addTodos = (value) => {
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title:value,
            completed:false
          })
          .then(res =>{
            dispatch({ type: "ADD_TODOS", payload: res.data })
            dispatch({ type: "SET_ERRORS", payload: null })
            Swal.fire({
                text: 'Todo Created',
                position: 'top',
                icon: 'success',
                timer: 2000,
              })
          }
          )
          .catch(err => {
            dispatch({ type: "SET_ERRORS", payload: err.message })
            dispatch({ type: "ADD_TODOS", payload: [] })
          });
    }
    const updateTodos = (todo) => {
        axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
            title:todo.title,
            completed:!todo.completed,
          })
          .then(res =>{
            dispatch({ type: "UPDATE_TODOS", payload: res.data })
            dispatch({ type: "SET_ERRORS", payload: null })
            Swal.fire({
                text: 'Todo Updated',
                position: 'top',
                icon: 'success',
                timer: 2000,
              })
          }
          )
          .catch(err => {
            dispatch({ type: "SET_ERRORS", payload: err.message })
            dispatch({ type: "UPDATE_TODOS", payload: [] })
          });
    }
    const deleteTodo = (todoId) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
          .then(res =>{
            dispatch({ type: "DELETE_TODOS", payload: todoId })
            dispatch({ type: "SET_ERRORS", payload: null })
            Swal.fire({
                text: 'Todo deleted',
                position: 'top',
                icon: 'warning',
                timer: 2000,
              })
          }
          )
          .catch(err => {
            dispatch({ type: "SET_ERRORS", payload: err.message })
            dispatch({ type: "DELETE_TODOS", payload: [] })
          });
    }
    return(
        <TodoContext.Provider value={{...state,dispatch,filterTodos,addTodos,updateTodos,deleteTodo}}>
             {children}
        </TodoContext.Provider>
    )
}
export default TodoProvider