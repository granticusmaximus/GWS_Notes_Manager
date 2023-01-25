function NoteItem({title, content, category}) {
  return (
    <div>
      <div className='taskItem'>
        <div className='container'>
          <h2>{title}</h2>
          <p>{category}</p>
          <p>{content}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem