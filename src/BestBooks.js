import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Jumbotron, Card, Container, Row, Button } from "react-bootstrap";
import "./BestBooks.css";

import { withAuth0 } from "@auth0/auth0-react";

import AddBookModal from "./components/AddBookModal";
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showBooksComponent: false,
      booksArr: [],
      showModal: false,
    };
  }

  componentDidMount = async () => {
    const { user, isAuthenticated } = this.props.auth0;
    // console.log(this.props.auth0);

    await this.setState({
      email: user.email,
    });
    // console.log("email = ", this.email);

    let booksUrl = `${process.env.REACT_APP_SITE_URL}/books?email=${this.state.email}`;
    let resData = await axios.get(booksUrl);
    // console.log("resData = ", resData);
    // console.log("resData.data = ", resData.data);

    await this.setState({
      showBooksComponent: true,
      booksArr: resData.data,
    });

    // console.log("booksArr = ", this.state.booksArr);
    // console.log("showBooksComponent = ", this.state.showBooksComponent);
  };
  modalOnPage = async (state) => {
    await this.setState({
      showModal: state,
    });
  };

  sendBookData = async (event) => {
    event.preventDefault();
    // console.log(event.target);

    let bookName = event.target.bookName.value;
    let publishYear = event.target.publishYear.value;
    let description = event.target.description.value;
    let author = event.target.author.value;
    let coverUrl = event.target.coverUrl.value;

    let bookDataObj = {
      email: this.state.email,
      bookName,
      publishYear,
      description,
      author,
      coverUrl,
    };
    // console.table(bookDataObj);
    let resData = await axios.post(`${process.env.REACT_APP_SITE_URL}/addbook`, bookDataObj);

    await this.setState({
      booksArr: resData.data,
    });
  };
  deleteBook = async (index) => {
    console.log(this.state.email);
    let paramsObj = {
      email: this.state.email,
    };

    let resData = await axios.delete(`${process.env.REACT_APP_SITE_URL}/deletebook/${index}`, { params: paramsObj });

    await this.setState({
      booksArr: resData.data,
    });
  };

  render() {
    return (
      <div className="BestBooks">
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>
          <Button variant="primary" onClick={() => this.modalOnPage(true)}>
            Add book
          </Button>
        </Jumbotron>
        <Container fluid>
          <Row>
            {this.state.showBooksComponent &&
              this.state.booksArr.map((book, idx) => {
                return (
                  <div key={idx}>
                    <Card style={{ width: "15rem", height: "53rem", overflow: "auto"}} className="m-3">
                      {/* {() => {if (book.cover == (undefined || null || "")){
                        return 'something';
                      }}} */}
                      <Card.Img
                        variant="top"
                        src={book.cover}
                        // src={() => {
                        //   return () => {
                        //   if (book.cover == (undefined || null)) {
                        //     return "https://i.imgur.com/kXhmeku.png";
                        //   } else {
                        //     return book.cover;
                        //   }
                        //   }}}
                        style={{ height: "25rem",width: "auto",  overflow: "hidden", objectFit: "cover" }}
                      />

                      <Card.Body>
                        <Card.Title style={{ maxHeight: "6.1rem", overflow: "hidden" }}>{book.bookName}</Card.Title>
                        <Card.Subtitle className="text-muted" style={{ maxHeight: "2rem", overflow: "hidden", paddingBottom: "2.5rem"}}>
                          {book.author} -{book.year}-
                        </Card.Subtitle>
                        <Card.Text style={{ maxHeight: "7.9rem", overflow: "auto" }}>{book.description}</Card.Text>
                        <Button variant="bottom" variant="danger" onClick={() => this.deleteBook(idx)}>
                          Delete book
                        </Button>
                      </Card.Body>
                      <Card.Footer style={{ height: "5rem", overflow: "auto" }}>User notes: {book.userNotes}</Card.Footer>
                    </Card>
                  </div>
                );
              })}
          </Row>
        </Container>
        {<AddBookModal modalOnPage={this.modalOnPage} showModal={this.state.showModal} sendBookData={this.sendBookData} />}
      </div>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
