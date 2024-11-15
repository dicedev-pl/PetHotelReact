import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

interface AddReservationsFormValues {
  customerName: string;
  startDate: string;
  endDate: string;
  guestType: string;
  roomType: string;
}

interface AddReservationsFormProps {
  token?: string
}

const AddReservationForm = ({ token } : AddReservationsFormProps) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: AddReservationsFormValues) => {
    const { customerName, startDate, endDate, guestType, roomType } = values;

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8082/vi/reservations',
        {
          customerName,
          startDate,
          endDate,
          guestType,
          roomType,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        }
      );

      if (response.status === 200) {
        message.success('Reservation added successfully!');
        // Handle additional logic after successful user addition (e.g., redirect)
      } else {
        message.error('Failed to add reservation.');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Failed to add Reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="addReservation"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Customer Name"
        name="customerName"
        rules={[{ required: true, message: 'Please input the customer name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Guest Type"
        name="guestType"
        rules={[{ required: true, message: 'Please input the guest type!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Room Type"
        name="roomType"
        rules={[{ required: true, message: 'Please select room type!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Room VIPType"
        name="roomType"
        rules={[{ required: true, message: 'Please select room type!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Reservation
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddReservationForm;