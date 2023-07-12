import { useContext } from "react"
import TodoContext from "../context/TodoContext"

const UpdateTodo = ({todo}) => {
    const { updateTodos } = useContext(TodoContext)

    const handleUpdate = async() =>{
        await updateTodos(todo)
    }
    
    return (
        <>
            {todo.completed ? 
            <i onClick={() => handleUpdate()} className="bi bi-check-all fs-4" /> : 
            <i onClick={() => handleUpdate()} className="bi bi-check fs-4"></i>}
            
        </>
    )
}
export default UpdateTodo