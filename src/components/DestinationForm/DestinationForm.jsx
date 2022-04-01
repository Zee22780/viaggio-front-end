import { useState, useEffect, useRef } from 'react';
import './DestinationForm.css'

const DestinationForm = (props) => {
  const [formData, setFormData] = useState({
    destName: '',
    location: '',
    category: 'Beach',
  })

  const [validForm, setValidForm] = useState(false)
  const formElement = useRef()

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    const postFormData = new FormData()
    postFormData.append('destName', formData.destName)
    postFormData.append('location', formData.location)
    postFormData.append('category', formData.category)
    props.handleAddDestination(postFormData)
    setFormData({
      destName: '',
      location: '',
    })
  }

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  return ( 
    <div 
    className="dest-form-container">
      <form 
      autoComplete='off'
      ref={formElement}
      onSubmit={handleSubmit}
      >
        <div className="dest-form"> Name:
          <label 
          htmlFor="dest-input"
          className="dest-input">
          </label>
          <input 
          type="text"
          className="dest-form"
          name="destName"
          onChange={handleChange}
          required
          placeholder='e.g. Santa Monica Beach'
          />
         </div>
         <div className="dest-form"> Location:
          <label 
          htmlFor="dest-input"
          className="dest-input">
          </label>
          <input 
          type="text"
          className="dest-form"
          name="location"
          onChange={handleChange}
          required
          placeholder='e.g. California, USA'
          />
         </div>
         <div className="dest-form"> Category:
          <label 
          htmlFor="dest-input"
          className="dest-input">
          </label>
          <select 
          name="category"
          onChange={handleChange}
          className="dest-form">
            <option value="Beach">Beach</option>
            <option value="Park/Trail">Park or Trail</option>
            <option value="Art Venue">Art Venue</option>
          </select>
         </div>
         <button
         type="submit"
         className="btn btn-success btn-lg">Add</button>
      </form>
    </div>
   );
}
 
export default DestinationForm;