import * as React from 'react';
import './inc/App.css';

// import logo from './logo.svg';
import HomePage from './pages/home.page.component';
import HeaderComponent from './components/header.component';
import FooterComponent from './components/footer.component';

class App extends React.Component {
  public render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React TypeScript</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.tsx</code> and save to reload.
      //   </p>
      // </div>
      <div>
        <HeaderComponent/>
        <HomePage/>
        <FooterComponent/>
      </div>
    );
  }
}

export default App;
