import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class PaperHeader extends Component {
  render() {
    const { paper } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={paper.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{paper.user.name}</h1>
              <p className="lead text-center">
                {paper.status}{" "}
                {isEmpty(paper.company) ? null : (
                  <span>at {paper.company}</span>
                )}
              </p>
              {isEmpty(paper.location) ? null : <p>{paper.location}</p>}
              <p>
                {isEmpty(paper.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={paper.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(paper.social && paper.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={paper.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(paper.social && paper.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={paper.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(paper.social && paper.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={paper.social.linkedin}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(paper.social && paper.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={paper.social.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}

                {isEmpty(paper.social && paper.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={paper.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaperHeader;
