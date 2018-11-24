import * as React from 'react';
import '../inc/App.css';
import Button from '@material-ui/core/Button';
import { setUser, getUser, removeUser } from '../helpers/cookie.helper';


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
          We use Material-UI .
        </p>
        <Button variant="contained" color="primary" onClick={this.handleSave}>
          Test User Save
        </Button> &nbsp;
        <Button variant="contained" color="secondary" onClick={this.handleLoad}>
          Test User Load
        </Button>
      </div>
    );
  }
}

export default HomePage;