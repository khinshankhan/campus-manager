import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
//import FormControl from '@material-ui/core/FormControl';
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
  const [firstname, setFirstname] = useState(student.firstname);
  const [lastname, setLastname] = useState(student.lastname);
  const [email, setEmail] = useState(student.email);
  const [gpa, setGPA] = useState(student.gpa);
  const [image, setImage] = useState(student.imageUrl);

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
    const val = e.target.value;
    if (val !== "" && !isNaN(val)) {
      const num = +val;
      if (num >= 0 && num <= 4) {
        setGPA(num);
        console.log(num);
      }
    }
  }

  const updateImage = (e) => {
    setImage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(gpa) {
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
          <TextField
            type="url"
            label="url (optional)"
            placeholder="url (optional)"
            value={image}
            variant="outlined"
            fullWidth
            onChange={updateImage}
          />
          <input type="submit" value="Edit Student" />
        </form>
      </div>
    </>
  );
};

export default EditStudentView;
