import { useContext, useState } from "react"
import TodoContext from "../context/TodoContext"


const CreateTodos = () =>{
    const { addTodos } = useContext(TodoContext)
    const [title,setTitle] = useState('')

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(title){
            await addTodos(title)
        }
    }
    return(
        <div className="row">
            <h3>Create Todo :</h3>
            <form className="row mt-3" onSubmit={(e) => handleSubmit(e)}>
                <div className="col-md-6">
                    <input type="text" onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="todo ..." />
                    <div className="text text-danger">
                        {title ? '' : 'This is required'}
                    </div>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-dark">Create</button>
                </div>
            </form>
        </div>
    )
}
export default CreateTodos