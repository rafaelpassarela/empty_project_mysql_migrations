import * as React from 'react';
import Button from '@material-ui/core/Button';

class HomePage extends React.Component {

  public render() {
    return (
      <div>
        <p>
          This is the default page!
          We use Material-UI .
        </p>
        <Button variant="contained" color="primary">
      		Hello World
    	</Button>
      </div>
    );
  }
}

export default HomePage;