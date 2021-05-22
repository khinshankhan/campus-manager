import NavBarView from "./NavBarView";

const CampusView = ({ campus }) => {
  return (
    <>
      <NavBarView />
      <div>
        {campus && campus.students ?
         <>
           <h1>{campus.name}</h1>
           <p>{campus.description}</p>
           <ul>
             {campus.students.map( student => {
               let name = student.firstname + " " + student.lastname;
               return (
                 <li key={student.id}>{name}</li>
               );
             })}
           </ul>
         </>
         : <div> Loading... </div>
        }
      </div>
    </>
  );
};

export default CampusView;
