import { Layout, Menu } from "antd";
import { rightsOptions } from "../utils/Enums.ts";
import ph_icon from "../assets/ph_icon.svg"
import { useState } from "react";
import InDevelop from "../inDevelop/InDevelop.tsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddUserForm from "../addUser/AddUserForm.tsx";
import { ItemType } from "antd/es/menu/interface";
import { MenuInfo } from "rc-menu/lib/interface";

const { Header, Content, Footer, Sider } = Layout;

type RouterItemType = ItemType & {
  path?: string;
}

interface MainViewProps {
  token?: string
}

const items = (): RouterItemType[] => {
  return Object.values(rightsOptions).map((value) => ({
    key: value,
    label: value,
    path: value.toLowerCase().replace("_", "-"),
  }));
}

const MainView = ({ token }: MainViewProps) => {
  const [currentView, setCurrentView] = useState<string | undefined>("USER");
  const navigate = useNavigate();

  const menuChoose = (e: MenuInfo) => {
    const selectedItem: RouterItemType = items()
      .find(item => item.key === e.key)
            ?? { key: "", label: "", path: "/" };
    const item = selectedItem as unknown as RouterItemType;

    setCurrentView(item.key as string);
    navigate(item.path as string);
  }

  const containsString = (i: string) => token?.includes(i);

  return (
    <Layout style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu
            onClick={e => menuChoose(e)}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['USER']}
            items={items()}
          />
        </Sider>
        <Header style={{ padding: 0 }}/>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Routes>
              <Route path="/" element={<InDevelop/>}/>
              <Route
                path="/user"
                element={<AddUserForm token={token}/>}
              />
            </Routes>
            {/*{currentView === "USER" && containsString("USER") &&*/}
            {/*<>*/}
            {/*  User*/}
            {/*</> || <>No Permissions</>}*/}
            {/*{currentView === "TRAINEE" && containsString("TRAINEE") &&*/}
            {/*<>*/}
            {/*  <InDevelop />*/}
            {/*</> || <>No Permissions</>}*/}
            {/*{currentView === "ADD_USERS" && containsString("ADD_USERS") &&*/}
            {/*<>*/}
            {/*  User*/}
            {/*</> || <>No Permissions</>}*/}
            {/*{currentView === "REMOVE_USERS" && containsString("REMOVE_USERS") &&*/}
            {/*<>*/}
            {/*  User*/}
            {/*</> || <>No Permissions</>}*/}
            {/*{currentView === "ORDER_FOOD" && containsString("ORDER_FOOD") &&*/}
            {/*<>*/}
            {/*  User*/}
            {/*</> || <>No Permissions</>}*/}
            {/*{currentView === "ADD_RESERVATIONS" && containsString("ADD_RESERVATIONS") &&*/}
            {/*<>*/}
            {/*  User*/}
            {/*</> || <>No Permissions</>}*/}
            {/*{currentView === "REMOVE_RESERVATIONS" && containsString("REMOVE_RESERVATIONS") &&*/}
            {/*<>*/}
            {/*  User*/}
            {/*</> || <>No Permissions</>}*/}
          </div>
        </Content>
      </Layout>
      <Footer style={{
        textAlign: 'center', background: '#aa8181', display: 'flex', height: '80px',
        justifyContent: 'center',
      }}>
        <img src={ph_icon} alt="mini_logo"/>
        <div style={{ padding: "8px" }}>
          PetHotel by DiceDev {new Date().getFullYear()}
        </div>
      </Footer>
    </Layout>
  );
};

export default MainView;
