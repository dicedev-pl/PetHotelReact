import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Select, message } from 'antd';
import axios from 'axios';
import { rightsOptions } from "../utils/Enums.ts";

const { Option } = Select;

interface User {
  id: string;
  username: string;
  rights: string[];
}

interface UserFormProps {
  token?: string
}

const UserList = ({ token } : UserFormProps ) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8081/v2/users'); // Adjust the endpoint as needed
      setUsers(response.data);
    } catch (error) {
      message.error(`Failed to fetch users. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    if (token?.includes("USER")) {
      setEditingUser(user);
      setIsModalVisible(true);
    }
  };

  const handleUpdatePermissions = async (values: { rights: string[] }) => {
    if (!editingUser) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.put(`http://localhost:8081/v2/users/${editingUser.id}/rights`, {
        rights: values.rights,
      }); // Adjust the endpoint as needed
      message.success('User rights updated successfully.');
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === editingUser.id ? { ...user, rights: values.rights } : user
        )
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Failed to update user rights.');
    } finally {
      setIsModalVisible(false);
    }
  };

  const columns = [
    {
      title: 'Login',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Rights',
      dataIndex: 'rights',
      key: 'rights',
      render: (rights: string[]) => rights.join(', '),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, user: User) => (
        <Button onClick={() => handleEdit(user)}>Edit Permissions</Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      {editingUser && (
        <EditPermissionsModal
          user={editingUser}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onUpdate={handleUpdatePermissions}
        />
      )}
    </div>
  );
};

interface EditPermissionsModalProps {
  user: User;
  visible: boolean;
  onCancel: () => void;
  onUpdate: (values: { rights: string[] }) => void;
}

const EditPermissionsModal: React.FC<EditPermissionsModalProps> = ({
  user,
  visible,
  onCancel,
  onUpdate,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={`Edit Permissions for ${user.username}`}
      open={visible}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onUpdate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ rights: user.rights }}
      >
        <Form.Item
          name="rights"
          label="Rights"
          rules={[{ required: true, message: 'Please select at least one right.' }]}
        >
          <Select mode="multiple" placeholder="Select rights">
            {rightsOptions.map(right => (
              <Option key={right} value={right}>
                {right}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserList;
