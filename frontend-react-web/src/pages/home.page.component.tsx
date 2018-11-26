import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { setUser, getUser, removeUser } from '../helpers/cookie.helper';
import '../inc/App.css';

class HomePage extends React.Component {

  handleSave = () => {
    setUser('Luke');
  };

  handleLoad = () => {
    var name = getUser();
    if (name != undefined)  
      window.alert(name);
    else 
      window.alert('save first!');
    removeUser();
  }

  public render() {
    return (
      <div className="Home">
        <p>
          This is the default page!
          We use Boostrap. <br/>
          <Button bsStyle="primary" onClick={this.handleSave}>Save</Button>&nbsp;
          <Button bsStyle="success" onClick={this.handleLoad}>Load</Button>
        </p>
        To <Link to="/about">About</Link> Page. <br/>
        To <Link to="/PageNotFound">Error</Link> Page.<br/>
      </div>
    );
  }
}

export default HomePage;