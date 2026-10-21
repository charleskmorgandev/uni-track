import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [title, setTitle] = useState("");
  const [boards,setBoards] = useState([]);
  const [editBoard, setEditBoard] = useState(null);
  const [editedText, setEditedText] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/boards", {title});
      setTitle("");
      getBoards();
    } catch (err) {
      console.error(err.message);
    }
  }

  const getBoards = async () => {
    try {
      const res = await axios.get("http://localhost:3000/boards");
      setBoards(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getBoards();

  }, []);

  return (
    <div className="min-h-screen flex bg-gray-400 justify-center items-center p-4">
      <form onSubmit={onSubmitForm} className="flex items-center gap-2 p-4 bg-gray-50 outline-none rounded-2x1 shadow-xl">
        <input type="text" onChange={(e) =>
        setTitle(e.target.value)} 
        value={title} placeholder="What needs to be done?" required />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium">
          Add Board </button>
      </form>
      <div>
        {boards.length === 0 ? (
          <p>No boards, make one.</p>
          ) : (
            <div>
              {boards.map((board) => (
                <div className="bg-blue-200 rounded-md px-4 py-2 flex items-center justify-center">
                  <span>{board.title}</span>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

export default App
