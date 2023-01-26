import Note from './Note'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import { Button, Modal } from 'reactstrap';
import {db} from "../services/firebase"
import AddNote from './AddNote';

function NoteManager() {
  const [tasks, setTasks] = useState([])
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
        <Button onClick={toggle}>
            Add Note +
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <AddNote/>
          <Button color="red" onClick={toggle}>
            Close
          </Button>
        </Modal>
        <div className='taskManager__tasks'>

          {tasks.map((task) => (
            <Note
              id={task.id}
              key={task.id}
              title={task.data.title} 
              category={task.data.category}
              content={task.data.content}
            />
          ))}

        </div>
      </div>
    </div>
  )
}

export default NoteManager