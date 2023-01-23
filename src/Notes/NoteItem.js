import Modal from "./Modal"

function NoteItem({onClose, open, title, content, category}) {

  return (
    <Modal modalLabel='Note Item' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{title}</h2>
        <p>{category}</p>
        <p>{content}</p>
      </div>
    </Modal>
  )
}

export default NoteItem