import { useState } from "react";
import axios from "axios";

function App() {

  const [title, setTitle] = useState("");
  const [todos,setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/boards", {title});
      setTitle("");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-400 justify-center items-center p-4">
      <form onSubmit={onSubmitForm} className="flex items-center gap-2 p-4 bg-gray-50 outline-none rounded-2x1 shadow-xl">
        <input type="text" onChange={(e) =>
        setTitle(e.target.value)} 
        value={title} placeholder="What needs to be done?" required />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium">
          Add Board </button>
      </form>
    </div>
  )
}

export default App
