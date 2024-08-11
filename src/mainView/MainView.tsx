import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import UserAddForm from "../addUser/UserAddForm.tsx";
import React from "react";

const MainView: React.FC<{ token: string }> = ({ token }) => {
    return (
        <>
            { token.includes("ADD_USER") ? (
                <Layout style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Content style={{ width: '100%', maxWidth: '400px' }}>
                        <UserAddForm token={token} />
                    </Content>
                </Layout>
            ) : (
                <div>
                   You do not chava permissions
                </div>
            )}
        </>
    );
}

export default MainView;
