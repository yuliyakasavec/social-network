import classes from './Profile.module.css';

const Profile = () => {
    return (
      <div className={classes.content}>
      <div>
      <img src='https://shop-cdn1-2.vigbo.tech/shops/2544/products/16486697/images/3-9f0ed407d8ba2537f38b8b2d9765ccdb.jpg' />
      </div>
      <div>
        ava + description
      </div>
      <div>
        My posts
        <div>
          New post
        </div>
        <div className={classes.posts}>
          <div className={classes.item}>
            post 1
          </div>
          <div className={classes.item}>
            post 2
          </div>
        </div>
      </div>
    </div>
    )
}

export default Profile;