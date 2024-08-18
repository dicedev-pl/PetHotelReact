import './App.css'
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import LoginForm from "./login/LoginForm.tsx";
import MainView from "./mainView/MainView.tsx";
import { useEffect, useState } from "react";

function App() {
  const [logged, setLogged] = useState<boolean>(false);
  const token: string | null = localStorage.getItem('authToken');

  useEffect(() => {
    if (token) {setLogged(true);}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      { (token && logged) ? (
        <MainView token={ token } />
      ) : (
        <Layout style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <Content>
            <LoginForm setLogged={setLogged} />
          </Content>
        </Layout>
      )}
    </>
  )
}

export default App
