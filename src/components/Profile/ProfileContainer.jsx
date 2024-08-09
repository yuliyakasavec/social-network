import Profile from "./Profile";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStatus, getUsersProfile, savePhoto, saveProfile, updateStatus } from "../../redux/profile_reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

function ProfileContainer(props) {
  let { userId } = useParams();
  // if (!userId) {
  //   userId = 2;
  // }

  useEffect(() => {
    props.getUsersProfile(userId || props.userId);
    props.getStatus(userId || props.userId);
    // profileAPI
    //   .profileGetUsers(userId)
    //   .then((data) => {
    //     props.setUserProfile(data);
    //   });
  }, [userId]);


  return (
    <div>
      <Profile isOwner={!userId} profile={props.profile} status={props.status} updateStatus={props.updateStatus} savePhoto={props.savePhoto} saveProfile={props.saveProfile} />
    </div>
  );
}



let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userId: state.auth.userId
});

export default compose(
  connect(mapStateToProps, { getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withAuthRedirect
)
(ProfileContainer);;
