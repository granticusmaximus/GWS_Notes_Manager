import Note from './Note'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from "../services/firebase"
import { useNavigate } from "react-router-dom";

function NoteManager() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([])


  const addNote = () => {
    navigate("/add-note");
  }

  useEffect(() => {
    const taskColRef = query(collection(db, 'notes'), orderBy('created', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  return (
    <div className='taskManager'>
      <header><center>Note Manager</center></header>
      <div className='taskManager__container'>
        <button 
          onClick={addNote}>
          Add note +
        </button>
        <div className='taskManager__tasks'>

          {tasks.map((task) => (
            <Note
              id={task.id}
              key={task.id}
              title={task.data.title} 
              content={task.data.content}
            />
          ))}

        </div>
      </div>
    </div>
  )
}

export default NoteManager