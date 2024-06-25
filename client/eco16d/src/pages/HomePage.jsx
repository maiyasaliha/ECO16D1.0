import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function HomePage() {
    const { userData, logout } = useAuth();
    console.log(userData);

    const handleLogout = async () => {
        await logout();
    };

  return (
    <Card>
        <Flex vertical gap="small" align="center">
            <Avatar size={150} icon={<UserOutlined />} />
            <Typography.Title level={2} strong>
                {userData?.name}
            </Typography.Title>
            <Typography.Text type="secondary" strong>
                Email: {userData?.email}
            </Typography.Text>
            <Typography.Text type="secondary">
                Organisation: {userData?.organisation}
            </Typography.Text>
            <Button>
                <Link to="/principale">
                    Principale Sheet
                </Link>
            </Button>
            <Button onClick={handleLogout}>
                <Link to="/login">
                    Logout
                </Link>
            </Button>
        </Flex>
    </Card>
  )
}

export default HomePage