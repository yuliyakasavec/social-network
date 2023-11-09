import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';

const Profile = () => {
    return (
      <div>
      <div>
      <img className={classes.contentImage} src='https://shop-cdn1-2.vigbo.tech/shops/2544/products/16486697/images/3-9f0ed407d8ba2537f38b8b2d9765ccdb.jpg' />
      </div>
      <div>
        ava + description
      </div>
      <MyPosts />
    </div>
    )
}

export default Profile;