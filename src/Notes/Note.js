import {useState} from 'react'
import NoteItem from './NoteItem'
import EditNote from './EditNote'
import { doc, deleteDoc} from "firebase/firestore";
import {db} from "../services/firebase"

function Note({id, title, category, content}) {

  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  /* function to delete a document from firstore */ 
  const handleDelete = async () => {
    const taskDocRef = doc(db, 'tasks', id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className='task'>
      <div className='task__body'>
        <h2>{title}</h2>
        <p>{category}</p>
        <p>{content}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit : true})}>
              Edit
            </button>
            <button className='task__deleteButton' onClick={handleDelete}>Delete</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <NoteItem 
          onClose={handleClose} 
          title={title} 
          category={category}
          content={content} 
          open={open.view} />
      }

      {open.edit &&
        <EditNote 
          onClose={handleClose} 
          toEditTitle={title} 
          toEditCategory={category}
          toEditContent={content} 
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Note