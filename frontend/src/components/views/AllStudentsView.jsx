import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import NavBarView from "./NavBarView";

const AllStudentsView = ({ allStudents }) => {
  return (
    <>
      <NavBarView />
      <div>
        {allStudents.length ?
         allStudents.map((student) => (
           <div key={student.id}>
             <Link to={`/student/${student.id}`}>
               <h1>{student.firstname} {student.lastname}</h1>
             </Link>
             <Link to={`/campus/${student.campus.id}`}>
               <p>{student.campus.name}</p>
             </Link>
           </div>
         ))
         : <div>There are no students.</div>}
      </div>
    </>
  );
};

AllStudentsView.propTypes = {
  allStudents: PropTypes.array.isRequired,
};

export default AllStudentsView;
