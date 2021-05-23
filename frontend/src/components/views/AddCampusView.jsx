import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import NavBarView from "./NavBarView";
import StudentCard from "./StudentCard";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: "2vw",
  },
  form: {
    margin: "auto",
    width: "25vw",
  },
}));

const AddCampusView = (props) => {
  let history = useHistory();
  const classes = useStyles();

  const fields = ["name", "address", "description", "imageUrl"];
  const fieldTypes = ["text", "text", "text", "url"];
  const required = ["name", "address"];

  const [campusInfo, setCampusInfo] = useState({});
  const [displayNoStudentMessage, setNoStudentMessage] = useState(false);
  const [availableStudents, setAvailableStudents] = useState(
    props.allStudents.filter((student) => student.campusId == null)
  );
  const [queuedStudents, setQueuedStudents] = useState([]);

  const updateCampusInfo = (e) => {
    setCampusInfo({ ...campusInfo, [e.target.name]: e.target.value });
  };

  const handleStudentAdd = (e) => {
    e.preventDefault();
    if (e.target && e.target.value) {
      const index = +e.target.value;
      setQueuedStudents([...queuedStudents, availableStudents[index]]);
      setAvailableStudents((prev) =>
        prev.filter((_student, currentIndex) => index !== currentIndex)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let params = { ...campusInfo };
    if (params.imageUrl === "") {
      delete params.imageUrl;
    }
    const campusId = await axios
      .post("/api/campuses/", params)
      .then((res) => res.data.id);

    const addStudents = queuedStudents.map(async (student) =>
      axios.put(`/api/students/${student.id}`, { campusId })
    );
    await Promise.all(addStudents);

    history.push("/campus/" + campusId);
  };

  return (
    <>
      <NavBarView />
      <br />
      <div className={classes.root}>
        <h1>Add Campus</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <React.Fragment key={index}>
              <TextField
                type={fieldTypes[index]}
                name={field}
                label={`${field
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .toLowerCase()} ${
                  !required.includes(field) ? "(optional)" : ""
                }`}
                placeholder={field
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .toLowerCase()}
                variant="outlined"
                required={required.includes(field)}
                fullWidth
                onChange={updateCampusInfo}
              />
              <br />
              <br />
            </React.Fragment>
          ))}
          <Button type="submit" variant="contained" color="primary">
            Add Campus
          </Button>
        </form>

        <br />

        <h2>Add Students</h2>
        <select name="Students" onChange={handleStudentAdd} onClick={()=>{setNoStudentMessage(true)}} value="">
          <option value="" disabled hidden>
            Pick Students
          </option>

          {availableStudents.length &&
            availableStudents.map((student, index) => (
              <option value={index} key={index}>
                {student.firstname} {student.lastname}
              </option>
            ))}
        </select>

        {availableStudents.length === 0 && displayNoStudentMessage && 
          <h2>
              Error, cannot pick students because there are no available students.
              <br /><br />
              <Link to={'/addstudent'} >
                <Button style={{float: 'center'}} variant="contained" color="primary">
                  Add Student
                </Button>
              </Link>
          </h2>
        }

        <br />
        <br />

        {queuedStudents.length ? (
          <div>
            <Grid container spacing={1}>
              {queuedStudents.map((student, index) => (
                <Grid key={student.id} item md={3}>
                  <StudentCard student={student} />
                  <br />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setAvailableStudents((prev) => [
                        ...availableStudents,
                        queuedStudents[index],
                      ]);
                      setQueuedStudents((prev) =>
                        prev.filter(
                          (_student, currentIndex) => index !== currentIndex
                        )
                      );
                    }}
                  >
                    Don't Add
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <div>There are no students picked for the campus.</div>
        )}
      </div>
    </>
  );
};

export default AddCampusView;
