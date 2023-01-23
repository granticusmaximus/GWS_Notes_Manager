import {useState} from 'react'
import { doc, updateDoc } from "firebase/firestore"
import {db} from "../services/firebase"

function EditNote({open, onClose, toEditTitle, toEditContent, toEditCategory , id}) {

  const [title, setTitle] = useState(toEditTitle)
  const [content, setContent] = useState(toEditContent)
  const [category, setCategory] = useState(toEditCategory)

  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'notes', id)
    try{
      await updateDoc(taskDocRef, {
        title: title,
        content: content,
        category: category
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }

  return (
    <div className='taskManager'>
      <header><center>Note Manager</center></header>
      <form onSubmit={handleUpdate} className='editTask'>
        <input type='text' name='title' onChange={(e) => setTitle(e.target.value.toUpperCase())} value={title}/>
        <input type='text' name='category' onChange={(e) => setCategory(e.target.value)} value={category}/>
        <textarea onChange={(e) => setContent(e.target.value)} value={content}></textarea>
        <button type='submit'>Edit</button>
      </form> 
    </div>
  )
}

export default EditNote