import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import './VersionHistory.css';

function VersionHistory({ pressed, selectedCell }) {
    const [versionHistory, setVersionHistory] = useState([]);

    useEffect(() => {
        const fetchVersionHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/versions?columnName=${selectedCell.column}&rowNumber=${selectedCell.row}`);
                setVersionHistory(response.data);
            } catch (error) {
                console.error('Error fetching edit history:', error);
            }
        };

        fetchVersionHistory();
    }, [pressed]);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (text) => new Date(text).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            }),
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Column Header',
            dataIndex: 'columnName',
            key: 'columnName',
        },
        {
            title: 'Row Number',
            dataIndex: 'rowNumber',
            key: 'rowNumber',
        },
        {
            title: 'Previous Value',
            dataIndex: 'oldValue',
            key: 'oldValue',
        },
        {
            title: 'New Value',
            dataIndex: 'newValue',
            key: 'newValue',
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={versionHistory}
                rowKey={(record) => record._id}
                pagination={false}
                className="version-history-table"
            />
        </div>
    );
}

export default VersionHistory;
