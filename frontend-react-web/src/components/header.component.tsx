import * as React from 'react';

// custom logo
import logo from '../img/logo_small.png';

class HeaderComponent extends React.Component {

  public render() {
    return (
      <div>
        <img src={logo}/>
      </div>
    );
  }

}

export default HeaderComponent;