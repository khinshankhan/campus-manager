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

const AddStudentView = props => {
  let history = useHistory();
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [gpa, setGPA] = useState(null);
  const [image, setImage] = useState(null);

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
        params.imageURL = image;
      }
      axios.post("/api/students/", params)
        .then(() => history.push("/students" + res.data.id));
    }
  }

  const classes = useStyles();
  return (
    <>
      <NavBarView />
      <br />
      <div className={classes.root}>
        <h1>Add Student</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            type="text"
            label="first name"
            placeholder="first name"
            variant="outlined"
            required
            fullWidth
            onChange={updateFirst}
          />
          <TextField
            type="text"
            label="last name"
            placeholder="last name"
            variant="outlined"
            required
            fullWidth
            onChange={updateLast}
          />
          <TextField
            type="email"
            label="email"
            placeholder="email"
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
            required
            fullWidth
            onChange={updateGPA}
          />
          <TextField
            type="url"
            label="url (optional)"
            placeholder="url (optional)"
            variant="outlined"
            fullWidth
            onChange={updateImage}
          />
          <input type="submit" value="Add Student" />
        </form>
      </div>
    </>
  );
};

export default AddStudentView;
