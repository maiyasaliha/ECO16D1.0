import React from 'react';
import { Card, Flex, Form, Input, Typography, Button, Alert, Spin, Select } from 'antd';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import './AuthPages.css';

export const Register = () => {
  const { loading, error, registerUser } = useSignup();

    const handleRegister = (values) => {
        registerUser(values);
    }
    
    const { Option } = Select;

  return (
    <div className='register'>
      <Card className='form-container'>
          <Flex vertical flex={1}>
              <Typography.Title 
              level={3} 
              strong 
              className='title'
              >
                Create an Account to access ECO 16D
              </Typography.Title>
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
                        label="Organisation"
                        name="organisation"
                        rules={[
                          {
                            required: true,
                            message: 'Please select your organisation'
                          },
                        ]}
                      >
                        <Select
                          placeholder="Organisation"
                          allowClear
                        >
                          <Option value="ECO">Eco</Option>
                          <Option value="AXE">Axe</Option>
                        </Select>
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
                  <div className='buttons'>
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
                            <Button type="link">Already have an account?</Button>
                        </Link>
                    </Form.Item>
                  </div>
              </Form>
          </Flex>
      </Card>
    </div>
  )
}
