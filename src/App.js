import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app_reducer";
import Preloader from "./components/common/Preloader/Preloader";

const DialogsContainer = lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = lazy(() =>
  import("./components/Profile/ProfileContainer")
);

const App = (props) => {
  
  useEffect(() => {
    props.initializeApp();
  }, []);
  
  if (!props.initialized) {
    return <Preloader />;
  }

  return (
    <div className="app-wrapper">
      <script
        async
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `(function(l) {
              if (l.search[1] === '/' ) {
                var decoded = l.search.slice(1).split('&').map(function(s) { 
                  return s.replace(/~and~/g, '&')
                }).join('?');
                window.history.replaceState(null, null,
                    l.pathname.slice(0, -1) + decoded + l.hash
                );
              }
            }(window.location))`,
        }}
      />
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Navigate to={"/profile"} />} />
            <Route path="/dialogs/*" element={<DialogsContainer />} />
            <Route path="/profile/:userId?" element={<ProfileContainer />} />
            <Route path="/users/*" element={<UsersContainer pageTitle={"Samurai"} />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<div>404 NOT FOUND</div>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  };
};
export default connect(mapStateToProps, { initializeApp })(App);
