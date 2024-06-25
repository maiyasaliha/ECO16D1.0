import React, { useEffect, useState, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';
import io from 'socket.io-client';
import './ecoStyles.css';
import { nestedHeaders, columns } from './EcoSheetStructure';
import ToolBar from '../ToolBar';



// const socket = io('http://localhost:3001');


function EcoSpreadsheet() {
    const [hotInstance, setHotInstance] = useState(null);
    const [data, setData] = useState([]);
    const hotElementRef = useRef(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/principale');
                const extractedDataBeforeMap = response.data;
                const extractedData = extractedDataBeforeMap.map(({ _id, ...rest }) => rest);
                setData(extractedData);
                setRows(extractedData.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (hotElementRef.current && data.length > 0 && !hotInstance) {
            const mappedData = data.map(row => [
                row.dateAjoutee,
                row.BMID,
                row.nomDuClient,
                row.dateAjoutee,
                row.BMID,
                row.nomDuClient,
                row.dateAjoutee,
                row.BMID,
                row.nomDuClient,
                row.dateAjoutee,
                row.BMID,
                row.nomDuClient
            ]);

            const hot = new Handsontable(hotElementRef.current, {
                data: mappedData,
                rowHeaders: true,
                colHeaders: true,
                nestedHeaders: nestedHeaders,
                columns: columns,
                className: 'custom-tablee',
                contextMenu: true,
                dropdownMenu: true,
                licenseKey: 'non-commercial-and-evaluation',
                language: 'en-US',
                manualRowResize: true,
                manualColumnResize: true,
                colWidths: 120,
                allowHtml: true,
                afterChange: (changes, source) => {
                    if (source !== 'loadData' && changes) {
                        const updateRequests = changes.map(change => {
                            const updateData = {
                                rowIndex: change[0],
                                colIndex: change[1],
                                newValue: change[3] == null ? "" : change[3]
                            };
                
                            return axios.post('http://localhost:3001/principaleCell', updateData);
                        });
                
                        axios.all(updateRequests)
                            .then(axios.spread((...responses) => {
                                console.log('All cells updated successfully.');
                            }))
                            .catch(err => {
                                console.log('Error updating data:', err);
                            });
                    }
                }                
            });

            setHotInstance(hot);
        }

        return () => {
            if (hotInstance && data.length === 0) {
                hotInstance.destroy();
                setHotInstance(null);
            }
        };
    }, [data, hotInstance]);

    return (
        <>
            <ToolBar eco={true}/>
            <div ref={hotElementRef} style={{ width: '100%', height: '100vh' }}></div>
        </>

    );
}

export default EcoSpreadsheet;
