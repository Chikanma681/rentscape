import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/actions/apartmentAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PostComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
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

    const data = await fetch(url, {
      method: "POST",
      body: formData,
    }).then((r) => r.json());

    const apartment = {
      address: e.target[0].value,
      bedrooms: e.target[1].value,
      rentPrice: e.target[2].value,
      image: data.secure_url,
    };

    const response = dispatch(addItem(apartment))
      .then(() => {
        return navigate("/");
      })
      .catch((err) => {
        setError(!error);
        console.log(err);
      });
    return response;
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
