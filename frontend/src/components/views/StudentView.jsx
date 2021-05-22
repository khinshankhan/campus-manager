import NavBarView from "./NavBarView";

const StudentView = ({ student }) => {
  return (
    <>
      <NavBarView />
      <div>
        {student ?
         <>
           <h1>{student.firstname} {student.lastname}</h1>
           <p>{student.email}</p>
           <p>{student.gpa}</p>
         </>
         : <div> invalid student id </div>
        }
      </div>
    </>
  );
};

export default StudentView;
