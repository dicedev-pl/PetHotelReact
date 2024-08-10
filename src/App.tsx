import './App.css'
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import LoginForm from "./login/LoginForm.tsx";

function App() {


    return (
        <>
            <Layout style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <Content>
                    <LoginForm />
                </Content>
            </Layout>
        </>
    )
}

export default App