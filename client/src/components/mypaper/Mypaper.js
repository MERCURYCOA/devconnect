import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentPaper, deleteAccount } from "../../actions/paperActions";
import Spinner from "../common/Spinner";
import PaperActions from "./PaperActions";
import Comment from "./Comment";

class Mypaper extends Component {
  componentDidMount() {
    this.props.getCurrentPaper();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { paper, loading } = this.props.paper;

    let mypaperContent;

    if (paper === null || loading) {
      mypaperContent = <Spinner />;
    } else {
      // Check if logged in user has paper data
      if (Object.keys(paper).length > 0) {
        mypaperContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${paper.handle}`}>{user.name}</Link>
            </p>
            <PaperActions />
            <Comment comment={paper.comment} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no paper
        mypaperContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet upload paper, please add some paper</p>
            <Link to="/create-paper" className="btn btn-lg btn-info">
              Upload Paper
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="mypaper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">My paper</h1>
              {mypaperContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Mypaper.propTypes = {
  getCurrentPaper: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  paper: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  paper: state.paper,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentPaper, deleteAccount }
)(Mypaper);
