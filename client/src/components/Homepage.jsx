import React, { useEffect } from "react";
import { logout } from "../redux/actions/session";
import { useState } from "react";

import {
  getItem,
  // getItemId,
  // addItem,
  // deleteItem,
} from "../redux/actions/apartmentAction";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Col,
  Row,
  Container,
  Input,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";

// const RenderCard = ({ item }) => {
//   return (
//     <Card>
//       <CardImg src={item.image} alt={item.name} />
//       <CardBody>
//         <CardTitle>{item.name}</CardTitle>
//         <CardText>{item.description}</CardText>
//       </CardBody>
//     </Card>
//   );
// };

const HomePage = () => {
  const apartments = useSelector((state) => state.apartments.apartments);
  const [popover, setPopover] = useState(false);
  const dispatch = useDispatch();
  console.log(apartments);
  useEffect(() => {
    getItem(dispatch);
  }, []);

  const toggle = () => {
    setPopover(!popover);
  };
  return (
    <div>
      <div className="col-9 mx-auto">
        <Form>
          <FormGroup>
            <Input placeholder="Search by Address" />
          </FormGroup>
        </Form>
      </div>
      <div className="col-9 mx-auto my-auto ">
        <Container>
          <Row>
            {apartments.map((apartment) => {
              return (
                // <div key={apartment._id} className="mb-3">
                  <Col md={4} className="mb-3">
                    <Card outline id="Popover1" onClick={toggle}>
                      <CardImg
                        top
                        width="100%"
                        src={apartment.image}
                        alt={apartment.address}
                      />
                      <CardBody>
                        <CardTitle tag="h5">{apartment.address}</CardTitle>
                        <CardSubtitle>
                          Rent Price: {apartment.rentPrice}
                        </CardSubtitle>
                        <CardText>Bedrooms: {apartment.bedrooms}</CardText>
                      </CardBody>
                      <Modal
                        placement="bottom"
                        isOpen={popover}
                        target="Popover1"
                        toggle={toggle}
                      >
                        <ModalHeader>Contact Landlord</ModalHeader>
                        <ModalBody>
                          <Form>
                            <FormGroup>
                              <Label for="exampleText">Send Message</Label>
                              <Input
                                type="textarea"
                                name="text"
                                id="exampleText"
                              />
                            </FormGroup>
                            <Input type="submit" value="Contact Landlord" />
                          </Form>
                        </ModalBody>
                      </Modal>
                    </Card>
                  </Col>
                // </div>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
