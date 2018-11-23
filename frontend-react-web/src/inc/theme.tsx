import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';
// import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: blue
  }
})

export default theme;