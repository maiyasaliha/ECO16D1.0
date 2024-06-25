import React from 'react';
import { Card, Flex, Form, Input, Typography, Button, Alert, Spin } from 'antd';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

export const Register = () => {
  const { loading, error, registerUser } = useSignup();

    const handleRegister = (values) => {
        registerUser(values);
    }

  return (
    <Card>
        <Flex vertical align="center" flex={1} style={{width: '100%'}}>
            <Typography.Title level={3} strong>Create an Account</Typography.Title>
            <Form 
            layout='vertical' 
            onFinish={handleRegister}
            >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                        required: true,
                        message: 'Please enter your name'
                    },
                  ]}
                >
                    <Input placeholder="Full Name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                        required: true,
                        message: 'Please enter your email'
                    },
                    {
                        type: 'email',
                        message: 'The input is not a valid Email'
                    }
                  ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                        required: true,
                        message: 'Please enter your password'
                    }
                  ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                  label="Confirmed Password"
                  name="reenterPassword"
                  rules={[
                    {
                        required: true,
                        message: 'Please re-enter your password'
                    }
                  ]}
                >
                    <Input.Password placeholder="Re-enter Password" />
                </Form.Item>
                {
                    error && 
                        <Alert 
                            description={error} 
                            type='error' 
                            showIcon closable 
                        />
                }
                <Form.Item>
                    <Button
                      type={`${loading ? '' : "primary"}`}
                      htmlType='submit'
                    >
                        {loading ? <Spin /> : 'Create Account' }
                        </Button>
                </Form.Item>
                <Form.Item>
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                </Form.Item>
            </Form>
        </Flex>
    </Card>
  )
}
