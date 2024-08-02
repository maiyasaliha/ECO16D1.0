import { useState } from 'react';
import { message } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../EcoSetup';

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const loginUser = async (values) => {
        
        try {
            setError(null);
            setLoading(true);
        
            const res = await axios.post(`${API_URL}:3001/login`, values);
        
            const data = res.data;
            if (res.status === 200) {
                message.success(data.message);
                login(data.token, data.user);
            } else if (res.status === 404) {
                setError(data.message);
            } else {
                message.error('Login failed');
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

    return { loading, error, loginUser };
};

export default useLogin;