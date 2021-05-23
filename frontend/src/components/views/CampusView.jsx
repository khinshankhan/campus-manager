import { Link } from "react-router-dom";
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
  const classes = useStyles();

  return (
    <>
      <NavBarView />
      <div className={classes.root}>
        {campus ? (
          <>
            <h1>
              {campus.name}
              <Link to={`/editcampus/${campus.id}`}>
                <Button
                  style={{ float: "right" }}
                  variant="contained"
                  color="primary"
                >
                  Edit Campus
                </Button>
              </Link>
            </h1>
            <p>{campus.description}</p>

            {campus.students.length ? (
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
          </>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    </>
  );
};

export default CampusView;
