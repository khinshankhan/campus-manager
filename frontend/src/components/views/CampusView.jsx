import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import NavBarView from "./NavBarView";
import StudentCard from "./StudentCard";

const useStyles = makeStyles({
  root: {
    padding: "2vw",
  },
});

const CampusView = ({ campus }) => {
  let history = useHistory();
  const classes = useStyles();

  const removeCampus = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/campuses/${campus.id}`)
      .then(() => history.push("/campuses/"));
  };

  return (
    <>
      <NavBarView />
      <div className={classes.root}>
        {campus ? (
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              width: "90vw",
              margin: "10vw auto",
            }}
          >
            <img
              id="campus-pfp"
              style={{ height: "15vw" }}
              alt="pfp"
              src={campus.imageUrl}
            />

            <div id="campus-details" style={{ padding: "0 5%" }}>
              <h1>{campus.name}</h1>

              <Link to={`/editcampus/${campus.id}`}>
                <Button variant="contained" color="primary">
                  Edit Campus
                </Button>
              </Link>

              <Button
                variant="contained"
                color="secondary"
                onClick={removeCampus}
              >
                Remove Campus
              </Button>

              <p>{campus.description}</p>
            </div>
          </div>
        ) : (
          <div> Loading... </div>
        )}

        {campus && campus.students.length ? (
          <div>
            <Grid container spacing={1}>
              {campus.students.map((student, index) => (
                <Grid key={student.id} item md={3}>
                  <StudentCard student={student} />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <div>This campus has no registered students.</div>
        )}
      </div>
    </>
  );
};

export default CampusView;
