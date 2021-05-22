import { Link } from "react-router-dom";

import NavBarView from "./NavBarView";

const StudentView = ({ student, allCampuses }) => {
  return (
    <>
      <NavBarView />
      <div style={{display:"flex", flexFlow:"row wrap", width:"90vw", margin:"10vw auto"}}>
        {student ?
         <>
           <img id="student-pfp" style={{height:"15vw"}} alt="pfp" src={student.imageUrl}/>
           <div id="student-details" style={{padding:"0 5%"}}>
             <h1>{student.firstname} {student.lastname}</h1>
             <p>{student.email}</p>
             <p>{student.gpa}</p>
             <div id="student-options">
               <button>Edit</button>
               <button>X</button>
               {student.campus ?
                <>
                  <h2>This student is registered to
                    <Link to={`/campus/${student.campus.id}`}>
                      {student.campus}
                    </Link>
                  </h2>
                </>
               : <><h2>This student is not registered to a campus.</h2></>
               }
               <form>
               <select name="Campuses">
                 {allCampuses.length ?
                  allCampuses.map((campus) => (
                    <option value={campus.id} key={campus.id}>
                      {campus.name}
                    </option>
                  ))
                 : <></>}
               </select>
               <input type="submit" value="Change Campus"></input>
               </form>
             </div>
           </div>
         </>
        : <div> invalid student id </div>
        }
      </div>
    </>
  );
};

export default StudentView;
