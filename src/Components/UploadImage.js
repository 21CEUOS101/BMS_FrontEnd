import Axios from 'axios';
import React, { useContext } from 'react'
import { AppContext } from '../App';

function UploadImage() {

  const { setImage } = useContext(AppContext);
  const [inform, setInform] = React.useState("");

  const UploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "ay14f6cv");

    Axios.post("https://api.cloudinary.com/v1_1/dhmfl6vxk/image/upload", formData).then((response) => {
      console.log(response.data);
      setImage(response.data.url);
      setInform("Image Uploaded Successfully");
    }
    );  

  };

  return (
      <>
      <input type="file" className='custom-file-input' onChange={(event) => { UploadImage(event.target.files) }} />
      <p>{inform}</p>
      </>
  )
}

export default UploadImage