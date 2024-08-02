import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';

function UnverifiedPage() {
    const { userData, logout } = useAuth();
    const isVerified = userData?.isVerified;
    console.log(userData);

    const handleLogout = async () => {
        await logout();
    };

  return (
    <div className='register'>
        <Card className='form-container'>
            <Flex vertical gap="small" align="center">
                <Typography.Title level={2} strong>
                    Please wait to be verified by Admin before you can access ECO 16 D
                </Typography.Title>
                <Button type="primary" onClick={handleLogout}>
                    <Link to="/login">
                        Logout
                    </Link>
                </Button>
            </Flex>
        </Card>
    </div>
  )
}

export default UnverifiedPage