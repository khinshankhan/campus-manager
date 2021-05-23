import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useHistory } from "react-router-dom";

import NavBarView from "./NavBarView";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  form: {
    margin: "auto",
    width: "25vw",
  },
}));

const AddCampusView = (props) => {
  let history = useHistory();
  const classes = useStyles();

  const fields = ["name", "description", "address", "imageUrl"];
  const required = ["name", "description", "address"];

  const [campusInfo, setCampusInfo] = useState({});

  const updateCampusInfo = (e) => {
    setCampusInfo({ ...campusInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let params = { ...campusInfo };
    axios
      .post("/api/campuses/", params)
      .then((res) => history.push("/campus/" + res.data.id));
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
                type="text"
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
      </div>
    </>
  );
};

export default AddCampusView;
