import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { useHistory } from 'react-router-dom';

import NavBarView from './NavBarView';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  form: {
    margin: 'auto',
    width: '25vw'
  }
}));

const EditStudentView = ({student}) => {
  let history = useHistory();
  const [error, setError] = useState(null);
  const [firstname, setFirstname] = useState(student.firstname);
  const [lastname, setLastname] = useState(student.lastname);
  const [email, setEmail] = useState(student.email);
  const [gpa, setGPA] = useState(student.gpa);
  const [image, setImage] = useState(student.imageUrl);

  useEffect(() => {
    setFirstname(student.firstname);
    setLastname(student.lastname);
    setEmail(student.email);
    setGPA(student.gpa);
    setImage(student.imageUrl);
  }, [student]);

  const updateFirst = (e) => {
    setFirstname(e.target.value);
  }

  const updateLast = (e) => {
    setLastname(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updateGPA = (e) => {
    setGPA(e.target.value);
  }

  const updateImage = (e) => {
    setImage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
      setError("GPA must be between 0 and 4");
    } else {
      setError(null);
      let params = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        gpa: gpa
      };
      if(image) {
        params.imageUrl = image;
      }
      axios.put(`/api/students/${student.id}`,params)
        .then((res) => history.push("/student/" + res.data.id));
    }
  }

  const classes = useStyles();
  return (
    <>
      <NavBarView />
      <br />
      <div className={classes.root}>
        <h1>Edit Student: {student.firstname} {student.lastname}</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            type="text"
            label="first name"
            placeholder="first name"
            variant="outlined"
            value={firstname}
            required
            fullWidth
            onChange={updateFirst}
          />
          <br />
          <br />
          <TextField
            type="text"
            label="last name"
            placeholder="last name"
            value={lastname}
            variant="outlined"
            required
            fullWidth
            onChange={updateLast}
          />
          <br />
          <br />
          <TextField
            type="email"
            label="email"
            placeholder="email"
            value={email}
            variant="outlined"
            required
            fullWidth
            onChange={updateEmail}
          />
          <br />
          <br />
          <TextField
            type="text"
            label="GPA"
            placeholder="GPA"
            variant="outlined"
            value={gpa}
            required
            fullWidth
            onChange={updateGPA}
          />
          <br />
          <br />
          <TextField
            type="url"
            label="url (optional)"
            placeholder="url (optional)"
            value={image}
            variant="outlined"
            fullWidth
            onChange={updateImage}
          />
          <br />
          <br />
          {error && <h2> {error} </h2> }
          <Button type="submit" variant="contained" color="primary">
            Apply Changes
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditStudentView;
