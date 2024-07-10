import React, { useEffect, useState, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';
import io from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import './principaleStyles.css';
import { nestedHeaders, getColumns } from './PrincipaleSheetStructure';
import { getColorClassForCb, getColorClassForDd, getColorClassForBMID, getColorClassForIMEI } from './ConditionalColoring'
import { validate, getCompliance, getLocked, getWaybill, getWaybill13 } from './ValidateFunctions';
import ToolBar from '../ToolBar';
import { useDate } from '../../contexts/DateContext';
import { useAuth } from '../../contexts/AuthContext';

const socket = io('http://localhost:3001');

function Spreadsheet() {
    const [hotInstance, setHotInstance] = useState(null);
    const [data, setData] = useState([]);
    const [haveData, setHaveData] = useState(false);
    const hotElementRef = useRef(null);
    const customBorders = [];
    const [rows, setRows] = useState([]);
    const [principaleBmids, setPrincipaleBmids] = useState([]);
    const [principaleBmidsId, setPrincipaleBmidsId] = useState([]);
    const [sheetBmid, setsheetBmid] = useState([]);
    const [colisBmids, setColisBmids] = useState([]);
    const [searchParams] = useSearchParams();
    const [update, setupdate] = useState(0);
    const [duplicateBmids, setduplicateBmids] = useState([]);
    const duplicateBmidRef = useRef([]);
    const [bmid, setbmid] = useState(null);
    const [years, setyears] = useState(null);
    const [quarters, setquarters] = useState(null);

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
                console.log(data);
                if (newValue !== data.previousData.value 
                    && year === data.updateData.year 
                    && quarter === data.updateData.quarter) {
                    hotInstance.setDataAtCell(rowIndex, colIndex, newValue);
                }
                // if (colIndex === 1) {
                //     // if (data.updateData.bmid.includes(newValue) || data.updateData.bmid.includes(data.previousData.value)) {
                //         // setbmid(data.updateData.newValue);
                //         // setyears(data.updateData.year);
                //         // setquarters(data.updateData.quarter);
                //         console.log("yearsAndQuarters");
                //         console.log(data.duplicateBmidRef.current);
                //         console.log(data.duplicateBmidRef.current.length);
                //         console.log("year " + year);
                //         console.log("quarter " + quarter);
                //         for (let i = 0; i < data.duplicateBmidRef.current.length; i++) {
                //             //for evry other copy of the instance
                //             if (year === data.duplicateBmidRef.current[i].year && quarter === data.duplicateBmidRef.current[i].quarter) {
                //                 //if the open window has year and quarter the same as the ones of the copies
                //                console.log(data.duplicateBmidRef.current[i].year);
                //                console.log(data.duplicateBmidRef.current[i].quarter);
                //                //then update 'update' and then refetch data
                //                setupdate((previousData) => previousData + 1);
                //             }
                //         }
                //     // }
                // }
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
        const getYearandQuarter = async () => {
            try {
                console.log("yaq for ");
                console.log(bmid + " " + years + " " + quarters);
                if (bmid !== null & years !== null && quarters !== null) {
                    const response = await axios.get(`http://localhost:3001/principaleBmidsQuarter?bmid=${bmid}&year=${years}&quarter=${quarters}`);
                    setduplicateBmids(response.data);
                    duplicateBmidRef.current = response.data;
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getYearandQuarter();
    }, [bmid, years, quarters]);
    

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data");
            try {
                setHaveData(false);
                console.log("fetching data inside");
                const response = await axios.get(`http://localhost:3001/principaleQuarter?year=${year}&quarter=${quarter}`);
                const principaleBmid = await axios.get('http://localhost:3001/principaleBmids');
                const colisBmid = await axios.get('http://localhost:3001/colisBmids');
                
                if (response.data.length === 0) {
                    setHaveData(false);
                } else {
                    const extractedData = response.data;
                    const extractedPBMIDsId = principaleBmid.data;
                    const extractedPBMIDs = extractedPBMIDsId.map(set => set.BMID);
                    const extractedCBMIDs = colisBmid.data;
                    setData(extractedData);
                    setPrincipaleBmidsId(extractedPBMIDsId);
                    setPrincipaleBmids(extractedPBMIDs);
                    setColisBmids(extractedCBMIDs);
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
            col: 15,
            right: {
                width: 3,
                color: 'black',
            },
        });
    }

    useEffect(() => {
        if (hotElementRef.current && data.length > 0 && !hotInstance) {
            const mappedData = data.map(row => [
                row.dateAjoutee,
                row.BMID,
                row.nomDuClient,
                row.raisonDuRetour,
                row.bmRaisonDuRetour,
                row.SKU,
                row.nomDuProduit,
                row.IMEI,
                row.transporteur,
                row.numeroDeSuivi,
                row.customerInformedAboutNonCompliance,
                row.customerInformedIfLocked,
                row.refunded,
                row.returnedToSG,
                row.dateReturnedToSG,
                row.waybillNo,
                row.dateDeReceptionAxe,
                row.contenuConforme,
                row.IMEIDeReception,
                row.etatDeLAppareil,
                row.commentaires,
                row.lienGooglePourLesImages,
                row._id
            ]);

            const hot = new Handsontable(hotElementRef.current, {
                data: mappedData,
                rowHeaders: true,
                colHeaders: true,
                nestedHeaders: nestedHeaders,
                customBorders: customBorders,
                columns: getColumns(organisation),
                className: 'custom-table',
                afterGetCellMeta: function (row, col, cellProperties) {
                    const cellValue = this.getDataAtCell(row, col);

                    if (col === 1) {
                        const bmidValues = this.getDataAtCol(col);
                        setsheetBmid(bmidValues);
                        const id = this.getDataAtCell(row, 22);
                        const cellClass = getColorClassForBMID(cellValue, bmidValues, colisBmids, principaleBmidsId, id);
                        cellProperties.className = cellClass;
                    } else if (col === 7 || col === 18) {
                        let other;
                        col === 7 ? (other = 18) : (other = 7);
                        const compareValue = this.getDataAtCell(row, other);
                        const cellClass = getColorClassForIMEI(validate(cellValue, compareValue));
                        cellProperties.className = cellClass;
                    } else if (col === 10) {
                        const compareValue = this.getDataAtCell(row, 17);
                        const cellClass = getColorClassForCb(getCompliance(cellValue, compareValue));
                        cellProperties.className = cellClass;
                    } else if (col === 11) {
                        const compareValue = this.getDataAtCell(row, 19);
                        const cellClass = getColorClassForCb(getLocked(cellValue, compareValue));
                        cellProperties.className = cellClass;
                    } else if (col === 12) {
                        const compareValue = this.getDataAtCell(row, 15);
                        const oow = this.getDataAtCell(row, 3);
                        const inter = getWaybill(cellValue, compareValue, oow);
                        const cellClass = getColorClassForCb(inter);
                        cellProperties.className = cellClass;
                    } else if (col === 13) {
                        const compareValue = this.getDataAtCell(row, 15);
                        const cellClass = getColorClassForCb(getWaybill13(cellValue, compareValue));
                        cellProperties.className = cellClass;
                    } else if (col === 17 || col === 19) {
                        const cellClass = getColorClassForDd(cellValue);
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
                            // if (change[1] === 1) {
                            //     setbmid(change[3] == null ? "" : change[3]);
                            //     setyears(year);
                            //     setquarters(quarter);
                            // }
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
                            // socket.emit('cellUpdate', {updateData, previousData, duplicateBmidRef});
                            return axios.post('http://localhost:3001/principaleCellQuarter', updateData);
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
    }, [data, hotInstance, organisation, colisBmids, principaleBmids, rows]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <ToolBar principale={true}/>
        {!haveData ? (
            <div style={{ textAlign: 'center', marginTop: '120px' }}>No data for specified range</div>
        ) : (
            <div ref={hotElementRef} style={{ width: '100%', height: 'calc(100vh - 70px)', marginTop: '70px' }}></div>
        )}
    </div>
    );
}

export default Spreadsheet;