import Profile from "./Profile";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStatus, getUsersProfile, savePhoto, saveProfile, updateStatus } from "../../redux/profile_reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux_store";
import { ProfileType } from "../../types/types";

type MapStatePropsType = {
  profile: ProfileType | null,
  status: string,
  userId: number
}

type MapDispatchPropsType = {
  getUsersProfile: (userId: number) => void, 
  getStatus: (userId: number) => void, 
  updateStatus: (status: string) => void, 
  savePhoto: (v: any) => void, 
  saveProfile: (profile: ProfileType) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

function ProfileContainer(props: PropsType) {
  let { userId } = useParams();
  // if (!userId) {
  //   userId = 2;
  // }

  useEffect(() => {
    props.getUsersProfile(Number(userId) || props.userId);
    props.getStatus(Number(userId) || props.userId);
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



let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userId: state.auth.userId
});

export default compose(
  connect(mapStateToProps, { getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withAuthRedirect
)
(ProfileContainer);;
