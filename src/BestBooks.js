import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Jumbotron, Card, Container, Row } from "react-bootstrap";
import "./BestBooks.css";

import { withAuth0 } from "@auth0/auth0-react";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showBooksComponent: false,
      booksArr: [],
    };
  }
  
  componentDidMount = async () => {
    const { user, isAuthenticated } = this.props.auth0;
    console.log(this.props.auth0);
    await this.setState({
      email: user.email,
    });
    let booksUrl = `${process.env.REACT_APP_SITE_URL}/books?email=${this.state.email}`;
    let resData = await axios.get(booksUrl);
    
    await this.setState({
      showBooksComponent: true,
      booksArr: [resData.data],
    })
  };

  render() {
    return (
      <div className="BestBooks">
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>
        </Jumbotron>
        <Container fluid>
          <Row>
            {this.props.showBooksComponent &&
              this.props.booksArr.map((book, idx) => {
                return (
                  <div key={idx}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={book.cover} />
                      <Card.Body>
                        <Card.Title>{book.bookName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {book.author} -{book.year}-
                        </Card.Subtitle>
                        <Card.Text style={{ height: "12rem", overflow: "auto" }}>{book.description}</Card.Text>
                        <Card.Text>User notes: {book.userNotes}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
