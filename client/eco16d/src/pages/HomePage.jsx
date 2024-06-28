import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function HomePage() {
    const { userData, logout } = useAuth();
    console.log(userData);

    const handleLogout = async () => {
        await logout();
    };

  return (
    <div className='register'>
        <Card className='form-container'>
            <Flex vertical gap="small" align="center">
                <Typography.Title level={2} strong>
                    Hello {userData?.name},
                </Typography.Title>
                <Typography.Text type="secondary" strong>
                    Email: {userData?.email}
                </Typography.Text>
                <Typography.Text type="secondary">
                    Organisation: {userData?.organisation}
                </Typography.Text>
                <Button type="primary" onClick={handleLogout}>
                    <Link to="/login">
                        Logout
                    </Link>
                </Button>
                <Button>
                    <Link to="/principale">
                        PRINCIPALE
                    </Link>
                </Button>
                { userData?.organisation == 'ECO' ?
                <Button>
                    <Link to="/eco">
                        ECO
                    </Link>
                </Button> : ''
                }
                <Button>
                    <Link to="/colis">
                        COLIS MANQUANTS
                    </Link>
                </Button>
            </Flex>
        </Card>
    </div>
  )
}

export default HomePage