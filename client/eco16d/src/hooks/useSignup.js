import React, { useState } from 'react'

const useSignup = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const registerUser = async (values) => {
        if(values.password !== values.reenterPassword) {
            return setError('Passwords are not the same');
        }

        // try {
        //     setError(null);
        //     setLoading(false);
        //     const res = await fetch
        // }
    }

    return {};
};

export default useSignup;