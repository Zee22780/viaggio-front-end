import styles from './AddPost.css'
import { useState, useEffect, useRef } from 'react';
import { create } from '../../services/postService';


const AddPost = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    story: '',
  })

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }
  
  const [validForm, setValidForm] = useState(false)

  const formElement = useRef()
  
  const handleSubmit = evt => {
    evt.preventDefault()
    const postFormData = new FormData()
    postFormData.append('postPhoto', formData.postPhoto)
    postFormData.append('title', formData.title)
    postFormData.append('story', formData.story)
    props.handleAddPost(postFormData)
  }

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleChangePhoto = (evt) => {
  setFormData({...formData, postPhoto: evt.target.files[0]})
}

  return (
    <>
    <div className='full-container'>
    <h5>Add Post</h5>
    <form autoComplete="off"
    ref={formElement}
    onSubmit={handleSubmit}
    >
    <div> Title:
      <label 
      htmlFor="post-input"
      className="post-label">

      </label>
      <input 
      type="text"
      className="post-form"
      name="title"
      value={formData.title}
      required
      onChange={handleChange}
      />
      
    </div>
    <div> Story:
      <label 
      htmlFor="post-input"
      className="post-label">
      </label>
      <textarea 
      type="text"
      className="post-form"
      name="story"
      value={formData.story}
      required
      onChange={handleChange}
      />
    </div>
    <div>
      <label 
      htmlFor="post-input"
      className="post-label">
        Upload Photo
      </label>
      <input 
      type="file"
      className="post-form"
      
      name="postPhoto"
      onChange={handleChangePhoto}
      />
    </div>
    <button id="btn"
    type="submit"
    className="btn"
    disabled={!validForm}
    >
      Add Your Story</button>
    </form>
    </div>
    </> 
  );
}

export default AddPost;