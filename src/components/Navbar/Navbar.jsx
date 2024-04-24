import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import Friends from '../Friends/Friends';

const Navbar = (props) => {

console.log(props)

  let sidebarElements = props.state?.sidebar.map( s => <Friends name={s.name} id={s.id} avatar={s.avatar} />);

    return (
      <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/dialogs">Messages</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/news">News</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/music">Music</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/settings">Settings</NavLink>
      </div>
      <div className={classes.item}>
        <div className={classes.side}>Friends</div>
        <div className={classes.photos}>
        {sidebarElements}
        </div>
      </div>
    </nav>
    )
}

export default Navbar;