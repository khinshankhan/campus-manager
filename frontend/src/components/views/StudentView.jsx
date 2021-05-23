import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

import NavBarView from "./NavBarView";

const StudentView = ({ student, allCampuses }) => {
  let history = useHistory();
  const [newCampus, setNewCampus] = useState(null);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/students/${student.id}`)
      .then((res) => history.push("/students/"));
  };

  const handleCampusChange = (e) => {
    setNewCampus(e.target.value);
  };

  const handleCampusUpdate = (e) => {
    e.preventDefault();
    if (newCampus)
      axios
        .put(`/api/students/${student.id}`, { campusId: newCampus })
        .then(() => e.target.submit());
  };

  return (
    <>
      <NavBarView />
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          width: "90vw",
          margin: "10vw auto",
        }}
      >
        {student ? (
          <>
            <img
              id="student-pfp"
              style={{ height: "15vw" }}
              alt="pfp"
              src={student.imageUrl}
            />
            <div id="student-details" style={{ padding: "0 5%" }}>
              <h1>
                {student.firstname} {student.lastname}
              </h1>
              <Link to={`/editstudent/${student.id}`}>
                <Button variant="contained" color="primary">
                  Edit Student
                </Button>
              </Link>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                Remove Student
              </Button>

              <p>{student.email}</p>
              <p>{student.gpa}</p>
              <div id="student-options">
                {student.campus ? (
                  <>
                    <h2>
                      This student is registered to{" "}
                      <Link to={`/campus/${student.campus.id}`}>
                        {student.campus.name}
                      </Link>
                    </h2>
                  </>
                ) : (
                  <>
                    <h2>This student is not registered to a campus.</h2>
                  </>
                )}
                <form onSubmit={handleCampusUpdate}>
                  <select
                    name="Campuses"
                    onChange={handleCampusChange}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Pick Campus
                    </option>
                    {allCampuses.length &&
                      allCampuses.map((campus) => (
                        <option value={campus.id} key={campus.id}>
                          {campus.name}
                        </option>
                      ))}
                  </select>
                  <input type="submit" value="Change Campus"></input>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div> invalid student id </div>
        )}
      </div>
    </>
  );
};

export default StudentView;
