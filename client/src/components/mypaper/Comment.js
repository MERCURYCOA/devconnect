import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteComment } from "../../actions/paperActions";

class Comment extends Component {
  onDeleteClick(id) {
    this.props.deleteComment(id);
  }

  render() {
    const comment = this.props.comment;
    //if (this.props.comment) {
    comment.map(cmt => (
      <tr key={cmt._id}>
        <td>{cmt.company}</td>
        <td>{cmt.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{cmt.from}</Moment> -
          {cmt.to === null ? (
            " Present"
          ) : (
            <Moment format="YYYY/MM/DD">{cmt.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, cmt._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    //}

    return (
      <div>
        <h4 className="mb-4">Comments/Paper Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {comment}
          </thead>
        </table>
      </div>
    );
  }
}

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteComment }
)(Comment);
