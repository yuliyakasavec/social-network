import Preloader from "../../common/Preloader/Preloader";
import classes from "./ProfileInfo.module.css";
import React from "react";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      {/* <div>
        <img
          className={classes.contentImage}
          src="https://shop-cdn1-2.vigbo.tech/shops/2544/products/16486697/images/3-9f0ed407d8ba2537f38b8b2d9765ccdb.jpg"
        />
      </div> */}
      <div className={classes.descriptionBlock}>
        <img src={props.profile.photos.large} />
        <div>
        <span className={classes.color}>Моя страничка на фейсбуке:</span> 
        <span>{props.profile.contacts.facebook}</span>
        </div>
        <ProfileStatus status={"Hello my friends"}/>
      </div>
    </div>
  );
};

export default ProfileInfo;
