import s from './Post.module.css'


const Post = ({message,likes}) => {
  return (
      <div className={s.item}>
        <img src='https://econet.ru/uploads/pictures/456175/content_photo_1.jpg' />
       {message}
        <div>
          <span>like</span> {likes}
        </div>
        </div>
  );
};

export default Post;
