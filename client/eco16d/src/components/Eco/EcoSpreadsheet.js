import React, { useEffect, useState, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';
import io from 'socket.io-client';
import './ecoStyles.css';
import { nestedHeaders, columns } from './EcoSheetStructure';
import ToolBar from '../ToolBar';
import { getColorClassForIMEI } from './ConditionalColoring';

// const socket = io('http://localhost:3001');

function EcoSpreadsheet() {
    const [hotInstance, setHotInstance] = useState(null);
    const [data, setData] = useState([]);
    const hotElementRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoints = [
                    '1stcol', '2ndcol', '3rdcol', '4thcol', '5thcol', '6thcol', 
                    '7thcol', '3rdcol', '9thcol', '10thcol', '11thcol', '12thcol'
                ];
                
                const requests = endpoints.map(endpoint => axios.get(`http://localhost:3001/${endpoint}`));
                const responses = await Promise.all(requests);
                const returnsBmid = await axios.get('http://localhost:3001/8thcol');
                const extractedBMIDs = returnsBmid.data;
                
                const combinedData = responses.reduce((acc, response, index) => {
                    const colData = response.data;
                    console.log("columns " + index + " data is " + colData);
                    colData.forEach((item, rowIndex) => {
                        if (!acc[rowIndex]) {
                            acc[rowIndex] = Array(endpoints.length).fill('');
                        }
                        if (index === 7 && !extractedBMIDs.includes(item)) {
                            acc[rowIndex][index] = '';
                        } else {
                            acc[rowIndex][index] = item;
                        }
                    });
                    console.log("acc is " + acc);
                    return acc;
                }, []);

                setData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (hotElementRef.current && data.length > 0 && !hotInstance) {
            const hot = new Handsontable(hotElementRef.current, {
                data: data,
                rowHeaders: true,
                colHeaders: true,
                nestedHeaders: nestedHeaders,
                columns: columns,
                className: 'custom-tablee',
                afterGetCellMeta: function (row, col, cellProperties) {
                    if (col === 2 || col === 7) {
                        const valueAt7 = this.getDataAtCol(7);
                        const cellClass = getColorClassForIMEI(valueAt7);
                        cellProperties.className = cellClass;
                    }
                },
                contextMenu: true,
                dropdownMenu: true,
                licenseKey: 'non-commercial-and-evaluation',
                language: 'en-US',
                autoWrapCol: true,
                autoWrapRow: true,
                wordWrap: true,
                manualColumnResize: true,
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
