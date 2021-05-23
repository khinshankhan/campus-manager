import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, fetchAllStudentsThunk } from "../../store/thunks";

import { EditCampusView } from "../views";

class EditCampusContainer extends Component {
  componentDidMount() {
    //getting campus ID from url
    this.props.fetchCampus(this.props.match.params.id);
    this.props.fetchAllStudents();
  }

  render() {
    return (
      <EditCampusView
        campus={this.props.campus}
        allStudents={this.props.allStudents}
      />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    campus: state.campus,
    allStudents: state.allStudents,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);
