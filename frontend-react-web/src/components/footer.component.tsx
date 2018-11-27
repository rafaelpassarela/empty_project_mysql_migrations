import * as React from 'react';

class FooterComponent extends React.Component {



  render() {
    let datetime = new Date().toLocaleString();
    return (
      <div>
        Page Footer - Date/Time = {datetime}
      </div>
    );
  }

}

export default FooterComponent;