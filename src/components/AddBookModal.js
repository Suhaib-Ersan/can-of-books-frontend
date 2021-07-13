import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

class AddBookModal extends React.Component {
  render() {
    return (
      <div className="AddBookModal">
        <Modal show={this.props.showModal} onHide={() => this.props.modalOnPage(false)}>
          <Modal.Header >
            <Modal.Title>Add a book to your books list</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="addBookForm" onSubmit={this.props.sendBookData}>
              <Form.Group>
                <Form.Control className="mb-2" type="text" placeholder="Book name" name="bookName" />
                <Form.Control className="mb-2" type="text" placeholder="Year this book was published" name="publishYear"/>
                <Form.Control className="mb-2" type="text" placeholder="Book description" name="description"/>
                <Form.Control className="mb-2" type="text" placeholder="Author name" name="author"/>
                <Form.Control className="mb-2" type="text" placeholder="Cover Image URL" name="coverUrl"/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.props.modalOnPage(false)}>
              Cancel
            </Button>
            <Button type="submit" form="addBookForm" variant="primary" onClick={() => this.props.modalOnPage(false)}>
              Add book
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddBookModal;
