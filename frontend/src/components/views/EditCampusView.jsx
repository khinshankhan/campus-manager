import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

const EditCampusView = (props) => {
  let history = useHistory();
  const classes = useStyles();

  const fields = ["name", "description", "address", "imageUrl"];
  const required = ["name", "description", "address"];

  const [campusInfo, setCampusInfo] = useState(
    fields.reduce(
      (stored, field) => ({ ...stored, [field]: props.campus[field] }),
      {}
    )
  );
  const [availableStudents, setAvailableStudents] = useState(
    props.allStudents.filter((student) => student.campusId == null)
  );
  const [queuedStudents, setQueuedStudents] = useState(
    props.campus.students || []
  );

  useEffect(() => {
    const fields = ["name", "description", "address", "imageUrl"];
    setCampusInfo(
      fields.reduce(
        (stored, field) => ({ ...stored, [field]: props.campus[field] }),
        {}
      )
    );
    setAvailableStudents(
      props.allStudents.filter((student) => student.campusId == null)
    );
    setQueuedStudents(
      props.campus.students || []
    );
  }, [props.campus, props.allStudents])

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
    const campusId = props.campus.id;
    let params = { ...campusInfo };
    await axios
      .put(`/api/campuses/${campusId}`, params)
      .then((res) => res.data.id);

    const studentsToAdd = queuedStudents.filter(
      (student) =>
        !props.campus.students.some(
          (originalStudent) => originalStudent.id === student.id
        )
    );
    const studentsToRemove = availableStudents.filter((student) =>
      props.campus.students.some(
        (originalStudent) => originalStudent.id === student.id
      )
    );

    const addStudents = studentsToAdd.map(async (student) =>
      axios.put(`/api/students/${student.id}`, { campusId })
    );
    const removeStudents = studentsToRemove.map(async (student) =>
      axios.put(`/api/students/${student.id}`, { campusId: null })
    );

    await Promise.all([...addStudents, ...removeStudents]);

    history.push("/campus/" + campusId);
  };

  return (
    <>
      <NavBarView />
      <br />
      <div className={classes.root}>
        <h1>Edit Campus</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <React.Fragment key={index}>
              <TextField
                InputLabelProps={{ shrink: true }}
                type="text"
                name={field}
                value={campusInfo[field]}
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
            Apply Campus Changes
          </Button>
        </form>

        <br />

        <h2>Add Students</h2>
        <select name="Students" onChange={handleStudentAdd} value="">
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

        <br />
        <br />

        {queuedStudents.length ? (
          <div>
            <Grid container spacing={1}>
              {queuedStudents.map((student, index) => (
                <Grid key={student.id} item md={3}>
                  <StudentCard
                    student={{ ...student, campus: { ...props.campus } }}
                  />
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
                    Remove
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

export default EditCampusView;
