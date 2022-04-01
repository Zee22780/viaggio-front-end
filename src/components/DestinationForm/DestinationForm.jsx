import { useState, useEffect, useRef } from 'react';



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
    <>
      <p>hey there form goes here</p>
      <form 
      autoComplete='off'
      ref={formElement}
      onSubmit={handleSubmit}
      >
        <div> Where do you want to go?
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
         <div> Where is your destination located?
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
         <div> How would you categorize this destination?
          <label 
          htmlFor="dest-input"
          className="dest-input">
          </label>
          <select 
          name="category"
          onChange={handleChange}>
            <option value="Beach">Beach</option>
            <option value="Park/Trail">Park or Trail</option>
            <option value="Art Venue">Art Venue</option>
          </select>
         </div>
         <button
         type="submit"
         className="btn">Add a Destination</button>
      </form>
    </>
   );
}
 
export default DestinationForm;