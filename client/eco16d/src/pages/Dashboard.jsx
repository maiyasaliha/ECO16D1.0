import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Typography, Table, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const { userData, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState('toVerify');
    const organisation = userData?.organisation;

    const handleLogout = async () => {
        await logout();
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                setUsers(response.data.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const verifyUser = async (userId) => {
        try {
            await axios.patch(`http://localhost:3001/verifyUser/${userId}`);
            message.success('User verified successfully');
            setUsers(users.map(user => user._id === userId ? { ...user, isVerified: true } : user));
        } catch (error) {
            message.error('Error verifying user');
            console.error('Error verifying user:', error);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Organisation',
            dataIndex: 'organisation',
            key: 'organisation',
        },
        {
            title: 'Verified',
            dataIndex: 'isVerified',
            key: 'isVerified',
            render: (text, record) => (
                record.isVerified ? 'Yes' : (
                    <Button type="primary" onClick={() => verifyUser(record._id)}>
                        Verify
                    </Button>
                )
            ),
        },
    ];

    const filteredUsers = currentPage === 'toVerify' 
        ? users.filter(user => !user.isVerified)
        : users.filter(user => user.isVerified);

    return (
        <div className='register'>
            <Card className='form-container'>
                <Typography.Title level={2} strong>
                    {organisation} ADMIN
                </Typography.Title>
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Button 
                        type={currentPage === 'toVerify' ? 'primary' : 'default'} 
                        onClick={() => setCurrentPage('toVerify')}
                        style={{ marginRight: '10px' }}
                    >
                        To Verify
                    </Button>
                    <Button 
                        type={currentPage === 'verified' ? 'primary' : 'default'} 
                        onClick={() => setCurrentPage('verified')}
                    >
                        Verified
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey={record => record._id}
                    pagination={{ pageSize: 5 }}
                    style={{ marginTop: '20px' }}
                />
                <div>
                    <Button style={{ marginRight: '10px'}}>
                        <Link to={`/principale?organisation=${organisation}`}>
                            PRINCIPALE
                        </Link>
                    </Button>
                    {organisation === 'ECO' && (
                        <Button style={{ marginRight: '10px'}}>
                            <Link to="/eco">
                                ECO
                            </Link>
                        </Button>
                    )}
                    <Button style={{ marginRight: '10px'}}>
                        <Link to={`/colis?organisation=${organisation}`}>
                            COLIS MANQUANTS
                        </Link>
                    </Button>
                    <Button type="primary" onClick={handleLogout}>
                        <Link to="/login">
                            Logout
                        </Link>
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Dashboard;
