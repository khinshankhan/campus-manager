import * as at from "../actions/actionTypes";

// REDUCER;
const allCampuses = (state = [], action) => {
  switch (action.type) {
    case at.FETCH_ALL_CAMPUSES:
      return action.payload;
    case at.ADD_CAMPUS:
      return [...state, action.payload];
    case at.DELETE_CAMPUS:
      return state.filter(campus => campus.id!==action.payload);
    case at.EDIT_CAMPUS:
      return state.map(campus => {
        return (
          campus.id===action.payload.id ? action.payload : campus
        );
      });
    default:
      return state;
  }
};

export default allCampuses;
