import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
<<<<<<< HEAD
import postReducer from "./postReducer";
import uploaderReducer from "./uploaderReducer";
=======
import paperReducer from "./paperReducer";
import postReducer from "./postReducer";
>>>>>>> f96d156021edcf4b6ff15af47f4f066d193358ee

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
<<<<<<< HEAD
  uploader: uploaderReducer
=======
  paper: paperReducer
>>>>>>> f96d156021edcf4b6ff15af47f4f066d193358ee
});
