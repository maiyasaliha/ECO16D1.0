import React, { useEffect, useState, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';
import io from 'socket.io-client';
import './principaleStyles.css';
import { nestedHeaders, columns } from './PrincipaleSheetStructure';
import { getColorClassForCb, getColorClassForDd, getColorClassForBMID, getColorClassForIMEI } from './ConditionalColoring'
import { validate, getCompliance, getLocked, getWaybill, getWaybill13 } from './ValidateFunctions';
import ToolBar from '../ToolBar';

// const socket = io('http://localhost:3001');

function Spreadsheet() {
    const [hotInstance, setHotInstance] = useState(null);
    const [data, setData] = useState([]);
    const hotElementRef = useRef(null);
    const customBorders = [];
    const [rows, setRows] = useState([]);
    const [colisBmids, setColisBmids] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/principale');
                const colisBmid = await axios.get('http://localhost:3001/colisBmids');
                const extractedDataBeforeMap = response.data;
                const extractedBMIDs = colisBmid.data;
                const extractedData = extractedDataBeforeMap.map(({ _id, ...rest }) => rest);
                setData(extractedData);
                setColisBmids(extractedBMIDs);
                setRows(extractedData.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                row.lienGooglePourLesImages
            ]);

            const hot = new Handsontable(hotElementRef.current, {
                data: mappedData,
                rowHeaders: true,
                colHeaders: true,
                nestedHeaders: nestedHeaders,
                customBorders: customBorders,
                columns: columns,
                className: 'custom-table',
                afterGetCellMeta: function (row, col, cellProperties) {
                    const cellValue = this.getDataAtCell(row, col);

                    if (col === 1) {
                        const bmidValues = this.getDataAtCol(col);
                        const cellClass = getColorClassForBMID(cellValue, bmidValues, colisBmids);
                        cellProperties.className = cellClass;
                    } else if (col === 7 || col === 18) {
                        let other;
                        col === 7 ? (other = 18) : (other = 7);
                        const compareValue = this.getDataAtCell(row, other);
                        const cellClass = getColorClassForIMEI(validate(cellValue, compareValue));
                        cellProperties.className = cellClass;
                    } else if (col === 17 || col === 19) {
                        const cellClass = getColorClassForDd(cellValue);
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
                        const cellClass = getColorClassForCb(getWaybill(cellValue, compareValue));
                        cellProperties.className = cellClass;
                    } else if (col === 13) {
                        const compareValue = this.getDataAtCell(row, 15);
                        const cellClass = getColorClassForCb(getWaybill13(cellValue, compareValue));
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
            <ToolBar principale={true}/>
            <div ref={hotElementRef} style={{ width: '100%', height: '100vh' }}></div>
        </>

    );
}

export default Spreadsheet;
