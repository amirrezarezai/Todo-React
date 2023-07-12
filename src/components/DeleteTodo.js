import { useContext } from "react"
import TodoContext from "../context/TodoContext"

const DeleteTodo = ({todoId}) => {

    const { deleteTodo } = useContext(TodoContext)

    const handleDelete = () => {
        deleteTodo(todoId)
    }

    return(
        <i onClick={() => handleDelete()} className="bi bi-trash-fill fs-6"></i>
    )
}
export default DeleteTodo