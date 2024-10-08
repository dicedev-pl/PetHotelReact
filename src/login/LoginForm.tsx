import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { Md5 } from "ts-md5";


const base64Encode = (str: string) => {
  return btoa(decodeURI(encodeURIComponent(str)));
};

const md5Hash = (str: string) => {
  return Md5.hashAsciiStr(str);
};

const hashedPasswd = (login: string, password: string) => {
  const md5 = md5Hash(login + ":" + password);
  return base64Encode(md5)
}

interface LoginFormProps {
  setLogged: (value: boolean) => void
}

const LoginForm = ({ setLogged }: LoginFormProps) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { login: string; password: string }) => {
    const { login, password } = values;
    const pwHash = hashedPasswd(login, password);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8081/v2/authentication/login', {
        login,
        password: pwHash,
      });

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);  // Save token in localStorage
        message.success('Login successful!');
        setLogged(true);
        // Handle additional logic after successful login (e.g., redirect)
      } else if (response.data.token === null) {
        message.error('Incorrect login or password.');
      } else {
        message.error('Login failed.');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      name="login"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="Username"
        name="login"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
