import { Link } from "react-router-dom";

import NavBarView from "./NavBarView";

const CampusView = ({ campus }) => {
  return (
    <>
      <NavBarView />
      <div>
        {campus && campus.students ? (
          <>
            <h1>{campus.name}</h1>
            <p>{campus.description}</p>
            <ul>
              {campus.students.map((student) => {
                let name = student.firstname + " " + student.lastname;
                return <li key={student.id}>{name}</li>;
              })}
            </ul>
            <Link to={`/editcampus/${campus.id}`}>Edit</Link>
          </>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    </>
  );
};

export default CampusView;
