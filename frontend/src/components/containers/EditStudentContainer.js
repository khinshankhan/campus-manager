import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk } from "../../store/thunks";

import { EditStudentView } from "../views";

class EditStudentContainer extends Component {
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
  }

  render() {
    return (
      <EditStudentView
        student={this.props.student} />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    student: state.student
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id))
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);
