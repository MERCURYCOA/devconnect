import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class PaperItem extends Component {
  render() {
    const { paper } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={paper.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{paper.user.name}</h3>
            <p>
              {paper.status}{" "}
              {isEmpty(paper.company) ? null : <span>at {paper.company}</span>}
            </p>
            <p>
              {isEmpty(paper.location) ? null : <span>{paper.location}</span>}
            </p>
            <Link to={`/paper/${paper.handle}`} className="btn btn-info">
              View Paper
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Abstract</h4>
            <ul className="list-group">
              {paper.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

PaperItem.propTypes = {
  paper: PropTypes.object.isRequired
};

export default PaperItem;