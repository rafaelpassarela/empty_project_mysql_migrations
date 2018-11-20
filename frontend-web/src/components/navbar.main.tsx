import React, { Component } from 'react';

// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';

// import NavbarItem from './navbar.item';
// import { getIsUserLogged } from '../helpers/cookie.helper';

import logo from '/img/vh_logo.png';

class NavbarMain extends Component {

    constructor(props) {
        super(props);

        this.getUserMenu = this.getUserMenu.bind(this);
    }

    // getUserMenu() {
    //     const userMenu = (getIsUserLogged()) ?
    //         <Nav pullRight>
    //             <NavbarItem eventKey={1} to="/Account/Logout" caption="Logout" />
    //         </Nav>
    //         :
    //         <Nav pullRight>
    //             <NavbarItem to="/Account/Register" caption="Register" />
    //             <NavbarItem to="/Account/Login" caption="Login" />
    //         </Nav>;

    //     return userMenu;
    // }

    render() {
        // const userMenu = this.getUserMenu();

        // // if logged, can add new post
        // const newPost = (getIsUserLogged()) ? <NavbarItem eventKey={1} to="/NewPost" caption="New Post" /> : null;

        // const navbarInstance =
        //     <Navbar inverse collapseOnSelect fixedTop>
        //         <Navbar.Header>
        //             <Navbar.Brand>
        //                 <a href="/">
        //                     <img src={logo} alt="Vanhack Fullstack/Backend" />
        //                 </a>
        //             </Navbar.Brand>
        //             <Navbar.Toggle />
        //         </Navbar.Header>
        //         <Navbar.Collapse>
        //             <Nav>
        //                 <NavbarItem eventKey={1} to="/" caption="Home" />
        //                 {newPost}
        //             </Nav>
        //             {userMenu}
        //         </Navbar.Collapse>
        //     </Navbar >;

        // return navbarInstance;
        return <h1>NAV BAR MAIN</h1>;
    }
}

export default NavbarMain;