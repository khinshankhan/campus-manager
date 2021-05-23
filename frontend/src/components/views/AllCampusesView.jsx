import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CampusCard from "./CampusCard";
import NavBarView from "./NavBarView";

const useStyles = makeStyles({
  root: {
    padding: '2vw',
  },
});

const AllCampusesView = ({ allCampuses }) => {
  const classes = useStyles();
  return (
    <>
      <NavBarView />
      <div className={classes.root}>
        <h1>
            All Campuses
        </h1>
        <div>
          {allCampuses.length ?
          <>
          <Grid container spacing={3}>
            {allCampuses.map((campus) => (
            <Grid key={campus.id} item md={3}>
              <CampusCard campus={campus} />
            </Grid>
            ))}
          </Grid>
          </>
          : <div>There are no campuses.</div>}
        </div>
      </div>
    </>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
