import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class PaperAbout extends Component {
  render() {
    const { paper } = this.props;

    // Get first name
    const firstName = paper.user.name.trim().split(" ")[0];

    // Skill List
    const skills = paper.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName} 's Bio</h3>
            <p className="lead">
              {isEmpty(paper.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{paper.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Expertise </h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PaperAbout.propTypes = {
  paper: PropTypes.object.isRequired
};

export default PaperAbout;
