import React, { useState } from 'react';
import {Form, Input, Button, message, Select} from 'antd';
import axios from 'axios';
import {Md5} from "ts-md5";

interface AddUserFormValues {
    username: string;
    password: string;
    rights: string[];
}

const rightsOptions = [
    'USER',
    'TRAINEE',
    'ADD_USERS',
    'REMOVE_USERS',
    'ORDER_FOOD',
    'ADD_RESERVATIONS',
    'REMOVE_RESERVATIONS'
];

const base64Encode = (str: string) => {
    return btoa(decodeURI(encodeURIComponent(str)));
};

const md5Hash = (str: string) => {
    return Md5.hashAsciiStr(str);
};

const hashedPasswd = (login: string, password: string) => {
    const md5 = md5Hash(login + ":" + password);
    console.log(md5);
    return base64Encode(md5)
}

const UserAddForm: React.FC<{ token: string }> = ({ token }) => {
    const [loading, setLoading] = useState(false);
    // Helper function to extract first 10 characters of a string
    const getFirst10Chars = (str: string) => {
        return str.slice(0, 10);
    };

    const onFinish = async (values: AddUserFormValues) => {
        const { username, password, rights } = values;
        const pwHash = hashedPasswd(username, password);
        const passwordFirst10Chars = getFirst10Chars(pwHash);
        const passwordWithoutFirst10Chars = pwHash.slice(10);

        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:8081/v2/authentication/add',
                {
                    username,
                    password: passwordWithoutFirst10Chars,
                    rights
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'user-id': passwordFirst10Chars,
                        'token': token
                    }
                }
            );

            if (response.status === 200) {
                message.success('User added successfully!');
                // Handle additional logic after successful user addition (e.g., redirect)
            } else {
                message.error('Failed to add user.');
            }
        } catch (error) {
            message.error('Failed to add user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            name="addUser"
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input the username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input the password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Rights"
                name="rights"
                rules={[{ required: true, message: 'Please select user rights!' }]}
            >
                <Select
                    mode="multiple"
                    placeholder="Select user rights"
                    options={rightsOptions.map(right => ({ label: right, value: right }))}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Add User
                </Button>
            </Form.Item>
        </Form>
    );
};

    export default UserAddForm;