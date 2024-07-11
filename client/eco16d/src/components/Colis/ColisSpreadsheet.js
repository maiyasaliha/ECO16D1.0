import React, { useEffect, useState, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';
import io from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import './colisStyles.css';
import { nestedHeaders, getColumns } from './ColisSheetStructure';
import { getColorClassForBMID } from './ConditionalColoring'
import ToolBar from '../ToolBar';
import { useDate } from '../../contexts/DateContext';
import { useAuth } from '../../contexts/AuthContext';

const socket = io('http://localhost:3001');

function ColisSpreadsheet() {
    const [hotInstance, setHotInstance] = useState(null);
    const [data, setData] = useState([]);
    const [haveData, setHaveData] = useState(false);
    const hotElementRef = useRef(null);
    const customBorders = [];
    const [rows, setRows] = useState([]);
    const [colisBmids, setColisBmids] = useState([]);
    const [principaleBmids, setPrincipaleBmids] = useState([]);
    const [colisBmidsId, setColisBmidsId] = useState([]);
    const [searchParams] = useSearchParams();
    const [sheetBmid, setsheetBmid] = useState([]);
    const [update, setupdate] = useState(0);

    const organisation = searchParams.get('organisation');
    const { year, quarter } = useDate();
    const { userData } = useAuth();

    useEffect(() => {
        socket.on('connect', () => {
            console.log( userData?.name + ' Connected to Socket.IO server');
        });

        socket.on('cellUpdate', (data) => {

            if (hotInstance) {
                const { rowIndex, colIndex, newValue } = data.updateData;

                if (newValue !== data.previousData.value 
                    && year === data.updateData.year 
                    && quarter === data.updateData.quarter) {
                    console.log("setting");
                    hotInstance.setDataAtCell(rowIndex, colIndex, newValue);
                }
                if (colIndex === 1) {
                    if (sheetBmid.includes(newValue) || sheetBmid.includes(data.previousData.value)) {
                        setupdate((previousData) => previousData + 1);
                    }
                }
            }
        });

        socket.on('connect_error', (error) => {
            console.error('Socket.IO connection error:', error);
        });

        socket.on('disconnect', () => {
            console.log(userData?.name + ' Disconnected from Socket.IO server');
        });

        return () => {
            socket.off('connect');
            socket.off('cellUpdate');
            socket.off('connect_error');
            socket.off('disconnect');
        };
    }, [hotInstance, userData, data]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHaveData(false);
                const response = await axios.get(`http://localhost:3001/colisQuarter?year=${year}&quarter=${quarter}`);
                const principaleBmid = await axios.get('http://localhost:3001/principaleBmids');
                const colisBmid = await axios.get('http://localhost:3001/colisBmidsId');

                if (response.data.length === 0) {
                    setHaveData(false);
                } else {
                    const extractedData = response.data;
                    const extractedPBMIDs = principaleBmid.data;
                    const extractedCBMIDsId = colisBmid.data;
                    const extractedCBMIDs = extractedCBMIDsId.map(set => set.BMID);
                    setData(extractedData);
                    setPrincipaleBmids(extractedPBMIDs);
                    setColisBmids(extractedCBMIDs);
                    setColisBmidsId(extractedCBMIDsId);
                    setRows(extractedData.length);
                    setHaveData(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [year, quarter, update]);

    for (let row = 0; row < rows; row++) {
        customBorders.push({
            row: row,
            col: 2,
            right: {
                width: 3,
                color: 'black',
            },
        });
    }

    useEffect(() => {
        if (hotElementRef.current && data.length > 0 && !hotInstance) {
            const mappedData = data.map(row => [
                row.dateCreee,
                row.BMID,
                row.nomDuClient,
                row.informations,
                row._id
            ]);

            const hot = new Handsontable(hotElementRef.current, {
                data: mappedData,
                rowHeaders: true,
                colHeaders: true,
                nestedHeaders: nestedHeaders,
                customBorders: customBorders,
                columns: getColumns(organisation),
                className: 'custom-tablec',
                afterGetCellMeta: function (row, col, cellProperties) {
                    const cellValue = this.getDataAtCell(row, col);

                    if (col === 1) {
                        const bmidValues = this.getDataAtCol(col);
                        setsheetBmid(bmidValues);
                        const id = this.getDataAtCell(row, 4);
                        const cellClass = getColorClassForBMID(cellValue, bmidValues, colisBmidsId, principaleBmids, id);
                        cellProperties.className = cellClass;
                    }
                },
                contextMenu: true,
                dropdownMenu: true,
                licenseKey: 'non-commercial-and-evaluation',
                language: 'en-US',
                manualRowResize: true,
                manualColumnResize: true,
                colWidths: 120,
                allowHtml: true,
                afterChange: (changes, source) => {
                    let updateData;
                    let previousData;
                    if (source !== 'loadData' && changes) {
                        const updateRequests = changes.map(change => {
                            updateData = {
                                rowIndex: change[0],
                                colIndex: change[1],
                                newValue: change[3] == null ? "" : change[3],
                                year: year,
                                quarter: quarter
                            };
                            previousData = {
                                value: change[2]
                            }
                            socket.emit('cellUpdate', {updateData, previousData});
                            return axios.post('http://localhost:3001/colisCellQuarter', updateData);
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
            if (hotInstance && !hotInstance.isDestroyed) {
                try {
                  hotInstance.destroy();
                } catch (err) {
                  console.error('Error destroying Handsontable instance:', err);
                }
                setHotInstance(null);
            }
        };
    }, [data, hotInstance, organisation, principaleBmids, colisBmids, rows]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <ToolBar colis={true}/>
            {!haveData ? (
                <div style={{ textAlign: 'center', marginTop: '120px' }}>No data for specified range</div>
            ) : (
                <div ref={hotElementRef} style={{ width: '100%', height: 'calc(100vh - 70px)', marginTop: '70px' }}></div>
            )}
        </div>
    );
}

export default ColisSpreadsheet;
