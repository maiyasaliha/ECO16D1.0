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
    const [length, setlength] = useState(0);
    const hotElementRef = useRef(null);
    const { year, quarter } = useDate();
    // let haveData = false;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoints = [
                    '1', '2', '3', '4', '5', '6', 
                    '7', '3', '9', '10', '11', '12'
                ];
                // haveData = false;
                sethaveData(false);
                console.log("Setting to false before getting data " + haveData);
                const requests = endpoints.map(endpoint => axios.get(`http://localhost:3001/eco?year=${year}&quarter=${quarter}&column=${endpoint}`));
                const responses = await Promise.all(requests);
                const returnsBmid = await axios.get(`http://localhost:3001/eco?year=${year}&quarter=${quarter}&column=8`);
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
                    // haveData = true;
                    sethaveData(true);
                    setlength(combinedData.length);
                }
                console.log("Setting haveData after getting data " + haveData);
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
                  console.log("Setting haveData to false afer destroying hot instance " + haveData);
                } catch (err) {
                  console.error('Error destroying Handsontable instance:', err);
                }
                setHotInstance(null);
            }
        };
    }, [data, hotInstance]);

    return (
        <div>
            <ToolBar eco={true}/>
            {!haveData ? (
                <div style={{ textAlign: 'center', marginTop: '120px' }}>No data for specified range</div>
            ) : (
                <div ref={hotElementRef} style={{ width: '100%', height: 'calc(100vh - 70px)', marginTop: '70px' }}></div>
            )}
        </div>

    );
}

export default EcoSpreadsheet;
