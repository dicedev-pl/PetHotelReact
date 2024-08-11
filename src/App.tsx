import './App.css'
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import LoginForm from "./login/LoginForm.tsx";
import MainView from "./mainView/MainView.tsx";

function App() {

  const token = localStorage.getItem('authToken');

  return (
    <>
      { token ? (
        <MainView token={token} />
      ) : (
        <Layout style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <Content>
            <LoginForm />
          </Content>
        </Layout>
      )}
    </>
  )
}

export default App
