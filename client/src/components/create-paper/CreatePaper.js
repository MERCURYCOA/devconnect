// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
// import InputGroup from "../common/InputGroup";
// import SelectListGroup from "../common/SelectListGroup";
// import { createPaper } from "../../actions/paperActions";

// class CreatePaper extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       displaySocialInputs: false,
//       handle: "",
//       school: "",
//       website: "",
//       location: "",
//       status: "",
//       skills: "",
//       githubusername: "",
//       bio: "",
//       twitter: "",
//       facebook: "",
//       linkedin: "",
//       youtube: "",
//       instagram: "",
//       errors: {}
//     };

//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const paperData = {
//       handle: this.state.handle,
//       school: this.state.school,
//       website: this.state.website,
//       location: this.state.location,
//       status: this.state.status,
//       skills: this.state.skills,
//       githubusername: this.state.githubusername,
//       bio: this.state.bio,
//       twitter: this.state.twitter,
//       facebook: this.state.facebook,
//       linkedin: this.state.linkedin,
//       youtube: this.state.youtube,
//       instagram: this.state.instagram
//     };

//     this.props.createPaper(paperData, this.props.history);
//   }

//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   render() {
//     const { errors, displaySocialInputs } = this.state;

//     let socialInputs;

//     if (displaySocialInputs) {
//       socialInputs = (
//         <div>
//           <InputGroup
//             placeholder="Twitter Paper URL"
//             name="twitter"
//             icon="fab fa-twitter"
//             value={this.state.twitter}
//             onChange={this.onChange}
//             error={errors.twitter}
//           />

//           <InputGroup
//             placeholder="Facebook Page URL"
//             name="facebook"
//             icon="fab fa-facebook"
//             value={this.state.facebook}
//             onChange={this.onChange}
//             error={errors.facebook}
//           />

//           <InputGroup
//             placeholder="Linkedin Paper URL"
//             name="linkedin"
//             icon="fab fa-linkedin"
//             value={this.state.linkedin}
//             onChange={this.onChange}
//             error={errors.linkedin}
//           />

//           <InputGroup
//             placeholder="YouTube Channel URL"
//             name="youtube"
//             icon="fab fa-youtube"
//             value={this.state.youtube}
//             onChange={this.onChange}
//             error={errors.youtube}
//           />

//           <InputGroup
//             placeholder="Instagram Page URL"
//             name="instagram"
//             icon="fab fa-instagram"
//             value={this.state.instagram}
//             onChange={this.onChange}
//             error={errors.instagram}
//           />
//         </div>
//       );
//     }

//     // Select options for status
//     const options = [
//       { label: "* Select Professional Status", value: 0 },
//       { label: "PhD", value: "PhD" },
//       { label: "Assistant Professor", value: "Assistant Professor" },
//       { label: "Associate Professor", value: "Associate Professor" },
//       { label: "Professor", value: "Professor" },
//       { label: "Student", value: "Student" },
//       { label: "Other", value: "Other" }
//     ];

//     return (
//       <div className="create-paper">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8 m-auto">
//               <h1 className="display-4 text-center">Create Your Paper</h1>
//               <p className="lead text-center">
//                 Let's get some information to make your paper stand out
//               </p>
//               <small className="d-block pb-3">* = required fields</small>
//               <form onSubmit={this.onSubmit}>
//                 <TextFieldGroup
//                   placeholder="* Paper Handle"
//                   name="handle"
//                   value={this.state.handle}
//                   onChange={this.onChange}
//                   error={errors.handle}
//                   info="A unique handle for your paper URL. Your full name, school, nickname"
//                 />
//                 <SelectListGroup
//                   placeholder="Status"
//                   name="status"
//                   value={this.state.status}
//                   onChange={this.onChange}
//                   options={options}
//                   error={errors.status}
//                   info="Give us an idea of where you are at in your career"
//                 />
//                 <TextFieldGroup
//                   placeholder="School"
//                   name="school"
//                   value={this.state.school}
//                   onChange={this.onChange}
//                   error={errors.school}
//                   info="Your own school"
//                 />
//                 <TextFieldGroup
//                   placeholder="Website"
//                   name="website"
//                   value={this.state.website}
//                   onChange={this.onChange}
//                   error={errors.website}
//                   info="Could be your own website or a school one"
//                 />
//                 <TextFieldGroup
//                   placeholder="Location"
//                   name="location"
//                   value={this.state.location}
//                   onChange={this.onChange}
//                   error={errors.location}
//                   info="City or city & state suggested (eg. Boston, MA)"
//                 />
//                 <TextFieldGroup
//                   placeholder="* Skills"
//                   name="skills"
//                   value={this.state.skills}
//                   onChange={this.onChange}
//                   error={errors.skills}
//                   info="Please use comma separated values (eg.
//                     Organic Chemistry,Curriculum,Teaching)"
//                 />
//                 <TextFieldGroup
//                   placeholder="Github Username"
//                   name="githubusername"
//                   value={this.state.githubusername}
//                   onChange={this.onChange}
//                   error={errors.githubusername}
//                   info="If you want your latest repos and a Github link, include your username"
//                 />
//                 <TextAreaFieldGroup
//                   placeholder="Short Bio"
//                   name="bio"
//                   value={this.state.bio}
//                   onChange={this.onChange}
//                   error={errors.bio}
//                   info="Tell us a little about yourself"
//                 />

//                 <div className="mb-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       this.setState(prevState => ({
//                         displaySocialInputs: !prevState.displaySocialInputs
//                       }));
//                     }}
//                     className="btn btn-light"
//                   >
//                     Add Social Network Links
//                   </button>
//                   <span className="text-muted">Optional</span>
//                 </div>
//                 {socialInputs}
//                 <input
//                   type="submit"
//                   value="Submit"
//                   className="btn btn-info btn-block mt-4"
//                 />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// CreatePaper.propTypes = {
//   paper: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   paper: state.paper,
//   errors: state.errors
// });

// export default connect(
//   mapStateToProps,
//   { createPaper }
// )(withRouter(CreatePaper));

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createPaper } from "../../actions/paperActions";
import TextFieldGroup from "../common/TextFieldGroup";

class CreatePaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const paperData = {
      school: this.state.school
    };

    this.props.createPaper(paperData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    let socialInputs;

    return (
      // <div className="create-paper">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col-md-8 m-auto">
      //         <h1 className="display-4 text-center">Create Your Paper</h1>
      //         <p className="card-body">Paste content here</p>
      //         {/* <p className="lead text-center">Paste content here</p> */}
      //         {/* <small className="d-block pb-3">* = required fields</small> */}
      //         <form onSubmit={this.onSubmit}>
      //           <TextFieldGroup
      //             placeholder="Paste here"
      //             name="school"
      //             value={this.state.school}
      //             onChange={this.onChange}
      //             // info="Your own school"
      //           />

      //           {socialInputs}
      //           <input
      //             type="submit"
      //             value="Submit"
      //             className="btn btn-info btn-block mt-4"
      //           />
      //         </form>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Paste your paper in box
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder=""
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  // error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreatePaper.propTypes = {
  paper: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  paper: state.paper,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createPaper }
)(withRouter(CreatePaper));
