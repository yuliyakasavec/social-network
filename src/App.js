import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app_reducer";
import Preloader from "./components/common/Preloader/Preloader";

const App = (props) => {

  useEffect(() => {
    props.initializeApp();
  }, []);

  if (!props.initialized) {
    return <Preloader />
  }

  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/dialogs/*" element={<DialogsContainer />} />
          <Route path="/profile/:userId?" element={<ProfileContainer />} />
          <Route path="/users/*" element={<UsersContainer />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}
export default connect(mapStateToProps, {initializeApp})(App);
