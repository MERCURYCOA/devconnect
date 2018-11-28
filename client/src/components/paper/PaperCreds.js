import React, { Component } from "react";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";

class PaperCreds extends Component {
  render() {
    // const { comment } = this.props;
    const cmtItems = this.props.comment;
    if (this.props.comment) {
      cmtItems.map(cmt => (
        <li key={cmt._id} className="list-group-item">
          <h4>{cmt.company}</h4>
          <p>
            <Moment format="YYYY/MM/DD">{cmt.from}</Moment> -
            {cmt.to === null ? (
              " Present"
            ) : (
              <Moment format="YYYY/MM/DD">{cmt.to}</Moment>
            )}
          </p>
          <p>
            <strong>Position:</strong> {cmt.title}
          </p>
          <p>
            {cmt.location === "" ? null : (
              <span>
                <strong>Location: </strong> {cmt.location}
              </span>
            )}
          </p>
          <p>
            {cmt.description === "" ? null : (
              <span>
                <strong>Description: </strong> {cmt.description}
              </span>
            )}
          </p>
        </li>
      ));
    }

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Comment</h3>

          {isEmpty(cmtItems) ? (
            <p className="text-center">No Comment Listed</p>
          ) : (
            <ul className="list-group">{cmtItems}</ul>
          )}
        </div>
      </div>
    );
  }
}

export default PaperCreds;
