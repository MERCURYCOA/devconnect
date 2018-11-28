import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PaperHeader from "./PaperHeader";
import PaperAbout from "./PaperAbout";
import PaperCreds from "./PaperCreds";
import Spinner from "../common/Spinner";
import { getPaperByHandle } from "../../actions/paperActions";

class Paper extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getPaperByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paper.paper === null && this.props.paper.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { paper, loading } = this.props.paper;
    let paperContent;

    if (paper === null || loading) {
      paperContent = <Spinner />;
    } else {
      paperContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/papers" className="btn btn-light mb-3 float-left">
                Back To Papers
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <PaperHeader paper={paper} />
          <PaperAbout paper={paper} />
          <PaperCreds comment={paper.comment} />
        </div>
      );
    }

    return (
      <div className="paper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{paperContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Paper.propTypes = {
  getPaperByHandle: PropTypes.func.isRequired,
  paper: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  paper: state.paper
});

export default connect(
  mapStateToProps,
  { getPaperByHandle }
)(Paper);
