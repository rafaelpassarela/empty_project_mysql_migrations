import * as React from 'react';
import './inc/App.css';

// import logo from './logo.svg';
import HomePage from './pages/home.page.component';
import HeaderComponent from './components/header.component';
import FooterComponent from './components/footer.component';

// set brand colors
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './inc/theme';

class App extends React.Component {
  public render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <HeaderComponent/>
          <HomePage/>
          <FooterComponent/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
