import Profile from "./Profile";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUsersProfile } from "../../redux/profile_reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

function ProfileContainer(props) {
  let { userId } = useParams();
  // if (!userId) {
  //   userId = 2;
  // }

  useEffect(() => {
    props.getUsersProfile(userId);
    // profileAPI
    //   .profileGetUsers(userId)
    //   .then((data) => {
    //     props.setUserProfile(data);
    //   });
  }, [userId]);


  return (
    <div>
      <Profile profile={props.profile} />
    </div>
  );
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

export default connect(mapStateToProps, { getUsersProfile })(AuthRedirectComponent);
