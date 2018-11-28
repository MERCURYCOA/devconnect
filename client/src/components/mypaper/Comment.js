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
    const comment = this.props.comment.map(com => (
      <tr key={com._id}>
        <td>{com.company}</td>
        <td>{com.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{com.from}</Moment> -
          {com.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{com.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, com._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
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
