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
  body: {
    textAlign: "center"
  }
}));

const HomePageView = () => {
  const classes = useStyles();
  return (
    <>
      <NavBarView />
      <br />
      <div className={classes.greeting}><h1>Campus Manager</h1></div>
      <br />
      <div className={classes.body}>
        <img alt="Campus" width="55%" src="https://gogocharters.com/blog/wp-content/uploads/2017/11/columbia-university-campus.jpg" />
        <br />
        <br />
        <h1> Navigate to Campus List or Student List Using Nav Links </h1>
      </div>
    </>
  );
};

export default HomePageView;
