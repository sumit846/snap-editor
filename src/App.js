import './App.css';
import { useState } from 'react';
import Slider from './Slider';


import SideBarItem from './SideBarItem'

const DEFAULT_OPTIONS = [
  {
    id:1,
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    id:2,
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    id:3,
    name: 'Saturation',
    property: 'saturate',
    value: 300,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    id:4,
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    id:5,
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    id:6,
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    id:7,
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  },

]


function App() {
  const [selectedOptionsIndex, setSelectedOptionsIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionsIndex];


  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
  };
 



  function handleSliderChange({target}){
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionsIndex) return option
        return { ...option, value: target.value }
      })
    })
  }



  function getImageStyle() {
    var inde=0;
    const filters = options.map((option,index) => {
  if(index<6){
      return `${option.property}(${option.value}${option.unit})`
  }else{
    return null
  }
    })
    console.log(filters.join(' '));
    console.log(inde);

    const  transforms = options.map((option,index) => {
      if(index>6){
        inde=option.id
          return `${option.property}(${option.value}${option.unit})`
      }
        })
        console.log( transforms.join(' '));

    
    return { filter: filters.join(' '), transform:  transforms.join(' ')  }
    
  
  
  }


const handleCrop=(img)=>{
  setPreviewImage(img);
}

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage));
  };

 
  const handleImageDownload = () => {
    const canvas = document.createElement('canvas');
    const img = document.createElement('img');
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      context.filter = getImageStyle().filter;
      context.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = image.name;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    img.src = previewImage;
  };

  return (
    <div className="container">
        <div className='main-image' >
        
      <form    >
        <div>
       
       
      
        {previewImage ? (
        
            <div id='imgE'>

              <img src={previewImage} alt="Preview" style={getImageStyle()}   />
              
            </div>
   
        ):( <>
          <div style={{height:'50px'}}></div>
        <div id='dropDown' style={{ 
          width: '80%', 
         }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      
      >
        <div style={{height:'350px'}}></div>
        <div style={{display: "flex",justifyContent: "center",height:"80%"}}>

        <label htmlFor="image-upload">Select an image:</label>
        <input type="file" id="image-upload" onChange={handleImageUpload} />
        </div></div>
        </>
        )}
      </div>
      </form>
        {previewImage &&  <button onClick={handleImageDownload}>Download Image</button>}
    </div>
  
        <div className='sidebar'>
          {
            options.map((item,index)=>{
              return(
                <SideBarItem
                key={index}
                name={item.name}
                active={index === selectedOptionsIndex}
                handleClick={()=>setSelectedOptionsIndex(index)}
                />
                )
              })
            }
        </div>

        <Slider
        
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
        />

    </div>
  );
}

export default App;
