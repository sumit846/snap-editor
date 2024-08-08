import { useState } from "react"

const Slider = ({min,max,handleChange,value}) => {
    const [text,setText] = useState(0);

window.addEventListener('input', (event) => {
    setText( event.target.value)
  });
  

  return (
    <div className="slider-container">
        <input type="range" className="slider" min={min} max={max} value={value} onChange={handleChange } list="markers"/>
        <datalist id="markers">
  <option value="0"></option>
  <option value="50"></option>
  <option value="100"></option>
  <option value="150"></option>
  <option value="200"></option>
<option value="250"></option>
<option value="300"></option>
<option value="350"></option>
<option value="400"></option>
</datalist>
<p>Value: <output id="value">{text}</output></p>
    </div>
  )
}

//       const value = document.querySelector("#value")
// const input = document.querySelector(".slider")
// value.textContent = input.value
// input.addEventListener("input", (event) => {
//   value.textContent = event.target.value
// })
export default Slider

