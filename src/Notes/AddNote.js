import {useState} from 'react'
import {db} from "../services/firebase"
import {collection, addDoc, Timestamp} from 'firebase/firestore'

function AddNote() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState("")

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'notes'), {
        title: title,
        content: content,
        category: category,
        created: Timestamp.now()
      })
    } catch (err) {
      alert(err)
    }
  }

  return (
        <div className='taskManager'>
          <div>
          <form onSubmit={handleSubmit} className='addForm' name='addTask'>
            <div class="form-group">
              <label for="fromName">Title</label>
                <input 
                  type='text' 
                  name='title' 
                  class="form-control"
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title}
                  placeholder='Enter title'
                />
            </div>
            <div class="form-group">
              <label for="fromName">Set Category</label>
                <input 
                  type='text' 
                  name='category'
                  class="form-control" 
                  onChange={(e) => setCategory(e.target.value)} 
                  value={category}
                  placeholder='Enter category'
                />
            </div>
            <div class="form-group">
              <label for="content">Enter Content</label>
                <textarea 
                  onChange={(e) => setContent(e.target.value)}
                  placeholder='Enter centent'
                  class="form-control"
                  rows="5"
                  value={content}
                ></textarea>
            </div>
            <button type='submit' class="btn btn-primary">
              Save Note
            </button>
          </form> 
          </div>
      </div>

  )
}

export default AddNote