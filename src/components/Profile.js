import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import {Card,} from "react-bootstrap/";

class Profile extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth0;

    return (
      <>
        {isAuthenticated && (
          <>
            <Card style={{ width: "18rem", marginTop: "2rem", marginBot: "2rem"}}>
              <Card.Img variant="top" src={user.picture} style={{width: "100px", marginLeft: "auto", marginRight: "auto", borderRadius: "50%", marginTop: "1.25rem"}} />
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>{user.email}</Card.Text>
              </Card.Body>
            </Card>
          </>
        )}
      </>
    );
  }
}

export default withAuth0(Profile);
