import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { getUser } from '../helpers/cookie.helper';

class HomeHeader extends Component {
    
    render() {
        let name = getUser();
        name = (name) ? name : 'Visitor';

        return (
            <header className="App-header">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} sm={4} md={4} lg={1}>
                            <img src="http://mrrafael.ca/img/home_profile.png" className="App-logo center-block" alt="It's me, Rafael Passarela" />
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={11}>
                            <p className="App-title">
                                Hi <b>{name}</b>, I'm Rafael and this is my Fullstack-Backend application!
                            </p>
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={11} xsHidden>
                            <p className="App-title">
                                I hope you enjoy it !
                            </p>
                        </Col>
                    </Row>
                </Grid>
            </header>
        );
    }

}

export default HomeHeader;