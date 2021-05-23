import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllStudentsThunk } from "../../store/thunks";

import { AddCampusView } from "../views";

class AddCampusContainer extends Component {
  componentDidMount() {
    //getting student ID from url
    this.props.fetchAllStudents();
  }

  render() {
    return <AddCampusView allStudents={this.props.allStudents} />;
  }
}

// map state to props
const mapState = (state) => {
  console.log({ state });
  return {
    allStudents: state.allStudents,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
  };
};

export default connect(mapState, mapDispatch)(AddCampusContainer);
