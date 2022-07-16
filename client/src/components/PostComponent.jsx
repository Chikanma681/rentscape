import React, { useEffect } from "react";
import Axios from "axios";
import {
  Form,
  FormGroup,
  Navbar,
  Input,
  Label,
  Button,
  Alert,
  UncontrolledAlert,
} from "reactstrap";
// import { ImgurClient } from "imgur";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../redux/actions/apartmentAction";
import { useHistory } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Image } from "cloudinary-react";

const PostComponent = () => {
  // const errors = useSelector((state) => state.error);
  // const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const fileSelectedHandler = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://api.cloudinary.com/v1_1/chikanma681/upload";

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "someRandomName");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/chikanma681/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    // console.log(data);
    // console.log(data.secure_url)

    // console.log(imageUrl)
    const apartment = {
      address: e.target[0].value,
      bedrooms: e.target[1].value,
      rentPrice: e.target[2].value,
      image: data.secure_url,
    };
    // console.log(apartment);

    const p = dispatch(addItem(apartment))
      .then(() => {
        return navigate("/");
      })
      .catch((err) => {
        setError(!error);
        console.log(err);
      });
    // console.log(p)
    return p;
  };

  return (
    <div>
      <div className="col-12">
        <div className="mx-auto">
          <h6>Post Apartment</h6>
        </div>
        <h6>
          <Form
            className="col-8 mx-auto"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <FormGroup>
              <Label type="text">Address</Label>
              <Input placeholder="Address" required />
            </FormGroup>
            <FormGroup>
              <Label type="text">Number of Bedrooms</Label>
              <Input placeholder="Bedrooms" required />
            </FormGroup>
            <FormGroup>
              <Label type="text">Rent Price</Label>
              <Input placeholder="Rent Price" required />
            </FormGroup>
            <FormGroup>
              <Label type="text">Upload Image</Label>
              <br />
              <Input
                className="file"
                type="file"
                name="image"
                accept="image/*"
                onChange={fileSelectedHandler}
              />
            </FormGroup>
            <Input type="submit" value="Submit" />
          </Form>
        </h6>
      </div>
    </div>
  );
};

export default PostComponent;

// // import React, { useState } from "react";

// // const PostComponent = () => {
// //   const [selectedImage, setSelectedImage] = useState(null);

// //   return (
// //     <div>
// //       <h1>Upload and Display Image usign React Hook's</h1>
// //       {selectedImage && (
// //         <div>
// //         <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
// //         <br />
// //         <button onClick={()=>setSelectedImage(null)}>Remove</button>
// //         </div>
// //       )}
// //       <br />

// //       <br />
// //       <input
// //         type="file"
// //         name="myImage"
// //         onChange={(event) => {
// //           console.log(event.target.files[0]);
// //           setSelectedImage(event.target.files[0]);
// //         }}
// //       />
// //     </div>
// //   );
// // };

// // export default PostComponent;

// import axios from 'axios';

// import React,{Component} from 'react';

// class PostComponent extends Component {

//     state = {

//       // Initially, no file is selected
//       selectedFile: null
//     };

//     // On file select (from the pop up)
//     onFileChange = event => {

//       // Update the state
//       this.setState({ selectedFile: event.target.files[0] });

//     };

//     // On file upload (click the upload button)
//     onFileUpload = () => {

//       // Create an object of formData
//       const formData = new FormData();

//       // Update the formData object
//       formData.append(
//         "myFile",
//         this.state.selectedFile,
//         this.state.selectedFile.name
//       );

//       // Details of the uploaded file
//       console.log(this.state.selectedFile);

//       // Request made to the backend api
//       // Send formData object
//       axios.post("api/uploadfile", formData);
//     };

//     // File content to be displayed after
//     // file upload is complete
//     fileData = () => {

//       if (this.state.selectedFile) {

//         return (
//           <div>
//             <h2>File Details:</h2>

// <p>File Name: {this.state.selectedFile.name}</p>

// <p>File Type: {this.state.selectedFile.type}</p>

// <p>
//               Last Modified:{" "}
//               {this.state.selectedFile.lastModifiedDate.toDateString()}
//             </p>

//           </div>
//         );
//       } else {
//         return (
//           <div>
//             <br />
//             <h4>Choose before Pressing the Upload button</h4>
//           </div>
//         );
//       }
//     };

//     render() {

//       return (
//         <div>
//             <h1>
//               GeeksforGeeks
//             </h1>
//             <h3>
//               File Upload using React!
//             </h3>
//             <div>
//                 <input type="file" onChange={this.onFileChange} />
//                 <button onClick={this.onFileUpload}>
//                   Upload!
//                 </button>
//             </div>
//           {this.fileData()}
//         </div>
//       );
//     }
//   }

//   export default PostComponent;
