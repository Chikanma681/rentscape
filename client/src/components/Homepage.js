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
  Label,
} from "reactstrap";

const HomePage = () => {
  const apartments = useSelector((state) => state.apartments.apartments);
  const dispatch = useDispatch();
  const [filtered, setFilter] = useState("");
  const [output, setOutput] = useState(null);
  useEffect(() => {
    getItem(dispatch);
  }, []);

  const handleSearch = (e) => {
    setFilter(e.target.value);
    handleFilter();
  };
  const handleFilter = () => {
    const results = apartments.filter((apartment) =>
      apartment.address.toLowerCase().includes(filtered.toLowerCase())
    );
    console.log(results);
    setOutput(results);
  };

  if (filtered === "") {
    return (
      <div>
        <div className="col-9 mx-auto">
          <Form>
            <FormGroup>
              <Input placeholder="Search by Address" onChange={handleSearch} />
            </FormGroup>
          </Form>
        </div>
        <div className="col-9 mx-auto my-auto ">
          <Container>
            <Row>
              {apartments.map((apartment) => {
                return (
                  // <div key={apartment._id} className="mb-3">
                  <Col md={4} className="mb-3" key={apartment._id}>
                    <Card outline id="Popover1">
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

                        <Button
                          color="primary"
                          href={
                            "mailto:" +
                            apartment.email +
                            "?subject=The%20subject%20of%20the%20mail"
                          }
                        >
                          Contact Landlord
                        </Button>
                      </CardBody>
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
  }

  return (
    <div>
      <div className="col-9 mx-auto">
        <Form>
          <FormGroup>
            <Input placeholder="Search by Address" onChange={handleSearch} />
          </FormGroup>
        </Form>
      </div>
      <div className="col-9 mx-auto my-auto ">
        <Container>
          <Row>
            {output.map((apartment) => {
              return (
                // <div key={apartment._id} className="mb-3">
                <Col md={4} className="mb-3" key={apartment._id}>
                  <Card outline id="Popover1">
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

                      <Button
                        color="primary"
                        href={
                          "mailto:" +
                          apartment.email +
                          "?subject=The%20subject%20of%20the%20mail"
                        }
                      >
                        Contact Landlord
                      </Button>
                    </CardBody>
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
