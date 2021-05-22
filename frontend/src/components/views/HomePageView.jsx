import { makeStyles } from '@material-ui/core/styles';

import NavBarView from './NavBarView';

const useStyles = makeStyles(theme => ({
  greeting:{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: "50%",
    margin: "auto",
  },
}));

const HomePageView = () => {
  const classes = useStyles();
  return (
    <>
      <NavBarView />
      <br />
      <div className={classes.greeting}><h1>Home Page</h1></div>
    </>
  );
};

export default HomePageView;
