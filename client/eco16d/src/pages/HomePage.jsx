import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function HomePage() {
    const { userData, logout } = useAuth();

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
                Role: {userData?.role}
            </Typography.Text>
            <Button>
                <Link to="/principale">
                    PRINCIPALE
                </Link>
            </Button>
            <Button>
                <Link to="/eco">
                    ECO
                </Link>
            </Button>
            <Button>
                <Link to="/colis">
                    COLIS MANQUANTS
                </Link>
            </Button>
            <Button type="primary" onClick={handleLogout}>
                <Link to="/login">
                    Logout
                </Link>
            </Button>
        </Flex>
    </Card>
  )
}

export default HomePage