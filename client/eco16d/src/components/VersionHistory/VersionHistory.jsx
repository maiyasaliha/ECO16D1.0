import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import './VersionHistory.css';

function VersionHistory({ pressed }) {
    const [versionHistory, setVersionHistory] = useState([]);

    useEffect(() => {
        const fetchVersionHistory = async () => {
            try {
                const response = await axios.get('http://localhost:3001/versions');
                setVersionHistory(response.data);
            } catch (error) {
                console.error('Error fetching edit history:', error);
            }
        };

        fetchVersionHistory();
    }, [pressed]);

    const onVersionPress = () => {
        console.log()
    }

    return (
        <div>
             {versionHistory.map((edit, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                    <Button 
                        type="link" 
                        style={{ textAlign: 'left', paddingBottom: 30}}
                        className="version-button"
                        onpre
                    >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: '1rem' }}>
                                {new Date(edit.timestamp).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })}
                            </div>
                            {index === 0 ? (
                                <div style={{ fontStyle: 'italic' }}>Current version</div>
                            ) : null}
                            <div>{edit.userName}</div>
                        </div>
                    </Button>
                </div>
            ))}
        </div>
    );
}

export default VersionHistory;