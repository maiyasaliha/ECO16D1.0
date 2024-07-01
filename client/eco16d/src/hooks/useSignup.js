import React, { useState } from 'react';
import { message } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const useSignup = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const registerUser = async (values) => {
        if(values.password !== values.reenterPassword) {
            return setError('Re-enter correct password');
        }

        try {
            setError(null);
            setLoading(true);
        
            const res = await axios.post('http://localhost:3001/signup', values);
        
            const data = res.data;
            if (res.status === 201) {
                message.success(data.message);
                login(data.token, data.user);
            } else if (res.status === 400) {
                setError(data.message);
            } else {
                message.error('Registration failed');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                message.error(error.response.data.message);
            } else {
                message.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, registerUser };
};

export default useSignup;