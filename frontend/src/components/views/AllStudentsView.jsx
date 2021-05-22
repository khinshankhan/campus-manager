import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import NavBarView from "./NavBarView";
import StudentCard from "./StudentCard";

const useStyles = makeStyles({
  root: {
    padding: '2vw',
  },
});


const AllStudentsView = ({ allStudents }) => {
  const classes = useStyles();

  return (
    <>
      <NavBarView />
      <div className={classes.root}>
        <h1>
          All Students
          <Link to={'/addstudent'} >
            <Button style={{float: 'right'}} variant="contained" color="primary">
              Add Student
            </Button>
          </Link>
        </h1>


        {allStudents.length ?
         <>
           <Grid container spacing={3}>
             {allStudents.map((student) => (
               <Grid key={student.id} item md={3}>
                 <StudentCard student={student} />
               </Grid>
             ))}
           </Grid>
         </>
         : <div>There are no students registered in the database.</div>}
      </div>
    </>
  );
};

AllStudentsView.propTypes = {
  allStudents: PropTypes.array.isRequired,
};

export default AllStudentsView;
