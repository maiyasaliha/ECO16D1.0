import React, { useEffect, useState, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';
import './ecoStyles.css';
import { columnHeaders, columns } from './EcoSheetStructure';
import ToolBar from '../ToolBar';
import { getColorClassForIMEI } from './ConditionalColoring';
import { useDate } from '../../contexts/DateContext';

function EcoSpreadsheet() {
    const [hotInstance, setHotInstance] = useState(null);
    const [data, setData] = useState([]);
    const [haveData, sethaveData] = useState(false);
    const hotElementRef = useRef(null);
    const { year, quarter } = useDate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoints = [
                    '1', '2', '3', '4', '5', '6', 
                    '7', '3', '9', '10', '11', '12'
                ];
                sethaveData(false);
                const requests = endpoints.map(endpoint => axios.get(`${API_URL}:3001/eco?year=${year}&quarter=${quarter}&column=${endpoint}`));
                const responses = await Promise.all(requests);
                const returnsBmid = await axios.get(`${API_URL}:3001/eco?year=${year}&quarter=${quarter}&column=8`);
                const extractedBMIDs = returnsBmid.data;
                const combinedData = responses.reduce((acc, response, index) => {
                    const colData = response.data;
                    colData.forEach((item, rowIndex) => {
                        if (!acc[rowIndex]) {
                            acc[rowIndex] = Array(endpoints.length).fill('');
                        }
                        if (index === 7 && !extractedBMIDs.includes(item)) {
                            acc[rowIndex][index] = "";
                        } else {
                            acc[rowIndex][index] = item;
                        }
                    });
                    return acc;
                }, []);
                console.log(combinedData.length);
                if(combinedData.length > 0) {
                    sethaveData(true);
                }
                setData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [year, quarter]);

    useEffect(() => {
        if (hotElementRef.current && data.length > 0 && !hotInstance) {
            const hot = new Handsontable(hotElementRef.current, {
                data: data,
                rowHeaders: true,
                colHeaders: columnHeaders,
                columns: columns,
                className: 'custom-tablee',
                readOnly: true,
                afterGetCellMeta: function (row, col, cellProperties) {
                    if (col === 2 || col === 7) {
                        const valueAt7 = this.getDataAtCell(row, 7);
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
            if (hotInstance && !hotInstance.isDestroyed) {
                try {
                  hotInstance.destroy();
                } catch (err) {
                  console.error('Error destroying Handsontable instance:', err);
                }
                setHotInstance(null);
            }
        };
    }, [data, hotInstance]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <ToolBar eco={true}/>
            <div
                style={{
                    display: haveData ? 'none' : 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    marginTop: '120px',
                    background: '#ffffff',
                    zIndex: 1,
                }}
            >
                No data for specified range
            </div>
            <div
                ref={hotElementRef}
                style={{
                    display: haveData ? 'block' : 'none',
                    width: '100%',
                    height: 'calc(100vh - 70px)',
                    marginTop: '70px',
                }}
            ></div>
        </div>
);
}

export default EcoSpreadsheet;
