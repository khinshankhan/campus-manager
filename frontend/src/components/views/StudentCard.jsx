import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { deleteStudentThunk } from "../../store/thunks";

// Map state to props;
const mapState = (state) => {
  return {
    allStudents: state.allStudents,
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    deleteStudent: (id) => dispatch(deleteStudentThunk(id)),
  };
};

const useStyles = makeStyles({
  root: {
    backgroundColor: '#C0C0C0',
  },
});

const StudentCard = (props) => {
  const classes = useStyles();
  const student = props.student;

  const handleDelete = (e) => {
    props.deleteStudent(student.id);
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <img src={student.imageUrl} width="100%" alt={student.firstname} />
          <Link to={`/student/${student.id}`}>
            <h1>{student.firstname} {student.lastname}</h1>
          </Link>
          {student.campus
           ? <Link to={`/campus/${student.campus.id}`}>
               <p>{student.campus.name}</p>
             </Link>
           : <p> No Campus </p>
          }
          <Link to={`/editstudent/${student.id}`}>
            <Button
              style={{ float: "left" }}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          </Link>
          {props.includeDelete &&
           <Button
             style={{ float: "right" }}
             variant="contained"
             color="secondary"
             onClick={handleDelete}
           >
             Delete Student
           </Button>
          }
          <br />
        </CardContent>
      </Card>
    </>
  );
};

export default connect(mapState, mapDispatch)(StudentCard);
