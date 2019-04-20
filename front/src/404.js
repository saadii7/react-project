import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';

export const Error404 = () => {
    return (
        <Jumbotron color="warning" fluid>
            <h1 className="display-3">Error 404 Page Not Found</h1>
            <p className="lead"></p>
            <Button color="primary" tag={Link} href="/" to="/">Home</Button>
        </Jumbotron>
    );
}