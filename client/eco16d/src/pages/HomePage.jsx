import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';

function HomePage() {
    const { userData, logout } = useAuth();
    const organisation = userData?.organisation;
    console.log(userData);

    const handleLogout = async () => {
        await logout();
    };

  return (
    <div className='register'>
        <Card className='form-container'>
            <Flex vertical gap="small" align="center">
                <Typography.Title level={2} strong>
                    {organisation}
                </Typography.Title>
                <Typography.Text type="secondary" strong>
                    Name: {userData?.name}
                </Typography.Text>
                <Typography.Text type="secondary" strong>
                    Email: {userData?.email}
                </Typography.Text>
                <Button type="primary" onClick={handleLogout}>
                    <Link to="/login">
                        Logout
                    </Link>
                </Button>
                <div>
                    <Button style={{ marginRight: '10px'}}>
                        <Link to={`/principale?organisation=${organisation}`}>
                            PRINCIPALE
                        </Link>
                    </Button>
                    { organisation === 'ECO' ?
                    <Button style={{ marginRight: '10px'}}>
                        <Link to="/eco">
                            ECO
                        </Link>
                    </Button> : ''
                    }
                    <Button>
                        <Link to={`/colis?organisation=${organisation}`}>
                            COLIS MANQUANTS
                        </Link>
                    </Button>
                </div>
            </Flex>
        </Card>
    </div>
  )
}

export default HomePage