import React from 'react';
import { Card, Flex, Form, Input, Typography, Button, Alert, Spin } from 'antd';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export const Login = () => {
    const { error, loading, loginUser } = useLogin();
    const handleLogin = async (values) => {
        await loginUser(values);
    }

  return (
    <div className='register'>
        <Card className='form-container'>
            <Flex>
                <Flex vertical flex={1}>
                    <Typography.Title 
                    level={3}
                    strong
                    className='title'
                    >
                      Log in to ECO 16D
                    </Typography.Title>
                    <Form 
                    layout='vertical' 
                    onFinish={handleLogin}
                    >
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
                        {
                            error && 
                                <Alert 
                                    description={error} 
                                    type='error' 
                                    showIcon closable 
                                />
                        }
                        <div className='buttons'>
                            <Form.Item>
                                <Button
                                type={`${loading ? '' : "primary"}`}
                                htmlType='submit'
                                >
                                    {loading ? <Spin /> : 'Login' }
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Link to="/">
                                    <Button>Sign Up</Button>
                                </Link>
                            </Form.Item>
                        </div>
                    </Form>
                </Flex>
            </Flex>
        </Card>
    </div>
  )
}
