import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavItem from 'react-bootstrap/lib/NavItem';

class NavbarItem extends Component {
    
    render() {

        const caption = this.props.caption;
        const to = this.props.to;
        const key = this.props.eventKey;

        return (
            <NavItem eventKey={key} componentClass={Link} href={to} to={to}>{caption}</NavItem>
        );

    }

}

export default NavbarItem;
