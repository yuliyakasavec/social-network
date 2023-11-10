import classes from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
      <div>
      <div>
      <img className={classes.contentImage} src='https://shop-cdn1-2.vigbo.tech/shops/2544/products/16486697/images/3-9f0ed407d8ba2537f38b8b2d9765ccdb.jpg' />
      </div>
      <div className={classes.descriptionBlock}>
        ava + description
      </div>
    </div>
    )
}

export default ProfileInfo;