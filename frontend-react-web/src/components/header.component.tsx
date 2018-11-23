import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

  const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

class HeaderComponent extends React.Component {

  public render() {
    return (
      <div style={styles.root}>
        <AppBar position="static" color="primary">
          <Toolbar>

            <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>

            <Typography style={styles.grow} variant="h6" color="inherit">
              Teste
            </Typography>

            <Button color="inherit">Login</Button>

          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

export default HeaderComponent;