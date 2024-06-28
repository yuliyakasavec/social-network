import Profile from "./Profile";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStatus, getUsersProfile, updateStatus } from "../../redux/profile_reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

function ProfileContainer(props) {
  let { userId } = useParams();
  // if (!userId) {
  //   userId = 2;
  // }

  useEffect(() => {
    props.getUsersProfile(userId);
    props.getStatus(userId);
    // profileAPI
    //   .profileGetUsers(userId)
    //   .then((data) => {
    //     props.setUserProfile(data);
    //   });
  }, [userId]);


  return (
    <div>
      <Profile profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
    </div>
  );
}



let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
});

export default compose(
  connect(mapStateToProps, { getUsersProfile, getStatus, updateStatus }),
  withAuthRedirect
)
(ProfileContainer);;
