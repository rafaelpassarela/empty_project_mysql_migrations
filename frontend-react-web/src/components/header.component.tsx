import * as React from 'react';
import { Link } from 'react-router-dom';

// custom logo
import logo from '../img/logo_small.png';

class HeaderComponent extends React.Component {

  public render() {

    return (
      <div>
        <Link to="/">
          <img src={logo}/>
        </Link>
      </div>
    );
  }

}

export default HeaderComponent;