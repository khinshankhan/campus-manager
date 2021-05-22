import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import NavBarView from "./NavBarView";

const AllCampusesView = ({ allCampuses }) => {
  return (
    <>
      <NavBarView />
      <div>
        {allCampuses.length ?
         allCampuses.map((campus) => (
           <div key={campus.id}>
             <Link to={`/campus/${campus.id}`}>
               <h1>{campus.name}</h1>
             </Link>
             <p>{campus.description}</p>
           </div>
         ))
         : <div>There are no campuses.</div>}
      </div>
    </>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
