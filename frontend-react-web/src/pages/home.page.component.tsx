import * as React from 'react';
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
      </div>
    );
  }
}

export default HomePage;