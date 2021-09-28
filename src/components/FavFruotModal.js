import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
class FavFruotModal extends Component {
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleclose}>
          <Modal.Header closeButton>
            <Modal.Title>Udating Form</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.props.updateData}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={this.props.item.name}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                defaultValue={this.props.item.image}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="text"
                name="price"
                defaultValue={this.props.item.price}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.handleclose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

export default FavFruotModal;