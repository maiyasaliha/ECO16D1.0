import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getColHeader } from '../Principale/ValidateFunctions';

function EditHistory({ pressed }) {
    const [editHistory, setEditHistory] = useState([]);

    useEffect(() => {
        const fetchEditHistory = async () => {
            try {
                const response = await axios.get('http://localhost:3001/edithistory');
                setEditHistory(response.data);
            } catch (error) {
                console.error('Error fetching edit history:', error);
            }
        };

        fetchEditHistory();
    }, [pressed]);

    return (
        <div>
            <h2>Edit History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Row</th>
                        <th>Column</th>
                        <th>Old Value</th>
                        <th>New Value</th>
                        <th>Edited By</th>
                        <th>Edit Date</th>
                    </tr>
                </thead>
                <tbody>
                    {editHistory.map((edit, index) => (
                        <tr key={index}>
                            <td>{edit.rowIndex + 1}</td>
                            <td>{getColHeader(edit.colIndex)}</td>
                            <td>{edit.previousValue}</td>
                            <td>{edit.newValue}</td>
                            <td>{edit.editedBy}</td>
                            <td>{new Date(edit.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EditHistory;
