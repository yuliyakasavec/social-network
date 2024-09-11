import {
  Routes,
  Route,
  Navigate,
  NavLink,
  useLocation,
} from "react-router-dom";
import "./App.css";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { UsersPage } from "./components/Users/UsersContainer";
import React, { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app_reducer";
import Preloader from "./components/common/Preloader/Preloader";
import { AppStateType } from "./redux/redux_store";
import { Login } from "./components/Login/Login";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { HeaderPage } from "./components/Header/HeaderPage";

const { Header, Content, Sider } = Layout;

const sideNavConfig = [
  {
    title: "My Profile",
    icon: UserOutlined,
    links: [
      {
        name: "Profile",
        link: "/profile",
      },
      {
        name: "Messages",
        link: "/dialogs",
      },
    ],
  },
  {
    title: "Developers",
    icon: LaptopOutlined,
    links: [
      {
        name: "Users",
        link: "/users",
      },
    ],
  },
  {
    title: "Notifications",
    icon: NotificationOutlined,
    links: [
      {
        name: "ChatPage",
        link: "/chat",
      },
    ],
  },
];

const items1: MenuProps["items"] = ["Developers"].map((key) => ({
  key,
  label: key,
}));

const items2: MenuProps["items"] = sideNavConfig.map((sideNav) => {
  return {
    key: sideNav.title,
    icon: React.createElement(sideNav.icon),
    label: sideNav.title,

    children: sideNav.links.map((nav) => {
      return {
        key: nav.link,
        label: (
          <NavLink to={nav.link} end>
            {nav.name}
          </NavLink>
        ),
      };
    }),
  };
});

const DialogsContainer = lazy(
  () => import("./components/Dialogs/DialogsContainer")
);

const ProfileContainer = lazy(
  () => import("./components/Profile/ProfileContainer")
);

const ChatPage = lazy(
  () => import("./pages/Chat/ChatPage")
);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

const App: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    props.initializeApp();
  }, []);

  let loc = useLocation();

  const getActiveSideNav = () => {
    const result = {
      title: "",
      link: "",
    };
    sideNavConfig.forEach((sideItem) => {
      const activeLink = sideItem.links.find((link) =>
        loc.pathname.includes(link.link)
      );
      if (activeLink) {
        result.title = sideItem.title;
        result.link = activeLink.link;
      }
    });
    return result;
  };

  if (!props.initialized) {
    return <Preloader />;
  }

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["Developers"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
        <HeaderPage />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[getActiveSideNav().link]}
            defaultOpenKeys={[getActiveSideNav().title]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path="/" element={<Navigate to={"/profile"} />} />
                <Route path="/dialogs/*" element={<DialogsContainer />} />
                <Route
                  path="/profile/:userId?"
                  element={<ProfileContainer />}
                />
                <Route
                  path="/users/*"
                  element={<UsersPage pageTitle={"Samurai"} />}
                />
                <Route path="/login/*" element={<Login />} />
                <Route path="/chat/*" element={<ChatPage />} />
                <Route path="/news" element={<News />} />
                <Route path="/music" element={<Music />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<div>404 NOT FOUND</div>} />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    // <div className="app-wrapper">
    //   <script
    //     async
    //     type="text/javascript"
    //     dangerouslySetInnerHTML={{
    //       __html: `(function(l) {
    //           if (l.search[1] === '/' ) {
    //             var decoded = l.search.slice(1).split('&').map(function(s) {
    //               return s.replace(/~and~/g, '&')
    //             }).join('?');
    //             window.history.replaceState(null, null,
    //                 l.pathname.slice(0, -1) + decoded + l.hash
    //             );
    //           }
    //         }(window.location))`,
    //     }}
    //   />
    //   <HeaderContainer />
    //   <Navbar />
    //   <div className="app-wrapper-content">
    //     <Suspense fallback={<Preloader />}>
    //       <Routes>
    //         <Route path="/" element={<Navigate to={"/profile"} />} />
    //         <Route path="/dialogs/*" element={<DialogsContainer />} />
    //         <Route path="/profile/:userId?" element={<ProfileContainer />} />
    //         <Route path="/users/*" element={<UsersPage pageTitle={"Samurai"} />} />
    //         <Route path="/login/*" element={<Login />} />
    //         <Route path="/news" element={<News />} />
    //         <Route path="/music" element={<Music />} />
    //         <Route path="/settings" element={<Settings />} />
    //         <Route path="*" element={<div>404 NOT FOUND</div>} />
    //       </Routes>
    //     </Suspense>
    //   </div>
    // </div>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
  };
};
export default connect(mapStateToProps, { initializeApp })(App);
