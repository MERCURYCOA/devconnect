// import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import Spinner from "../common/Spinner";
// import PaperItem from "./PaperItem";
// import { getProfiles } from "../../actions/profileActions";

// class Profiles extends Component {
//   componentDidMount() {
//     this.props.getProfiles();
//   }

//   render() {
//     const { profiles, loading } = this.props.profile;
//     let profileItems;

//     if (profiles === null || loading) {
//       profileItems = <Spinner />;
//     } else {
//       if (profiles.length > 0) {
//         profileItems = profiles.map(profile => (
//           <PaperItem key={profile._id} profile={profile} />
//         ));
//       } else {
//         profileItems = <h4>No profiles found...</h4>;
//       }
//     }

//     return (
//       <div className="profiles">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <h1 className="display-4 text-center">Researcher Profiles</h1>
//               <p className="lead text-center">
//                 Browse and connect with other researchers
//               </p>
//               {profileItems}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// Profiles.propTypes = {
//   getProfiles: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   profile: state.profile
// });

// export default connect(
//   mapStateToProps,
//   { getProfiles }
// )(Profiles);

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import PaperItem from "./PaperItem";
import { getPapers } from "../../actions/paperActions";

class Papers extends Component {
  componentDidMount() {
    this.props.getPapers();
  }

  render() {
    const { papers, loading } = this.props.paper;
    let paperItems;

    if (papers === null || loading) {
      paperItems = <Spinner />;
    } else {
      if (papers.length > 0) {
        paperItems = papers.map(paper => (
          <PaperItem key={paper._id} paper={paper} />
        ));
      } else {
        paperItems = <h4>No papers found...</h4>;
      }
    }

    return (
      <div className="papers">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Papers</h1>
              <p className="lead text-center">Browse paper</p>
              {paperItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Papers.propTypes = {
  getPapers: PropTypes.func.isRequired,
  paper: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  paper: state.paper
});

export default connect(
  mapStateToProps,
  { getPapers }
)(Papers);
