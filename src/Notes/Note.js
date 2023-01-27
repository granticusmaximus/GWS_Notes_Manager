import { doc, deleteDoc} from "firebase/firestore";
import {db} from "../services/firebase"
import {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EditNote from "./EditNote";
import NoteItem from "./NoteItem";

function Note({id, title, category, content}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [editModal, setEditModal] = useState(false);
  const neToggle = () => setEditModal(!editModal);

  const handleDelete = async () => {
    const taskDocRef = doc(db, 'notes', id)
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
        <p><em>{category}</em></p>
        <p>{content}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <Button onClick={neToggle}>
              Edit Note
            </Button>
            <button className='task__deleteButton' onClick={handleDelete}>Delete</button>
          </div>
          <Button onClick={toggle}>
            View Note
          </Button>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <NoteItem
            title={title}
            category={category}
            content={content}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={editModal} neToggle={neToggle}>
        <ModalHeader neToggle={neToggle}>Edit Note</ModalHeader>
        <ModalBody>
          <EditNote
           toEditTitle={title} 
           toEditCategory={category}
           toEditContent={content} 
           id={id} />
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={neToggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Note