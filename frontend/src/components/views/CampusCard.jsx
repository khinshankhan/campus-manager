import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { deleteCampusThunk } from "../../store/thunks";

// Map state to props;
const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    deleteCampus: (id) => dispatch(deleteCampusThunk(id)),
  };
};

const useStyles = makeStyles({
  root: {
    backgroundColor: '#C0C0C0',
  },
});


const CampusCard = (props) => {
  const campus = props.campus;
  const classes = useStyles();

  const handleDelete = (e) => {
    props.deleteCampus(campus.id);
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <img src={campus.imageUrl} width="100%" alt={campus.name} />
          <Link to={`/campus/${campus.id}`}>
            <h1>{campus.name}</h1>
          </Link>
          <p> Number of Students: {campus.students.length} </p>
          <Link to={`/editcampus/${campus.id}`}>
            <Button
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
             Delete
           </Button>
          }
          <br />
        </CardContent>
      </Card>
    </>
  );
};

export default connect(mapState, mapDispatch)(CampusCard);
