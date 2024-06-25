import React, { useEffect, useState, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';
import io from 'socket.io-client';
import './colisStyles.css';
import { nestedHeaders, columns } from './ColisSheetStructure';
import { getColorClassForBMID } from './ConditionalColoring'
import ToolBar from '../ToolBar';



// const socket = io('http://localhost:3001');


function ColisSpreadsheet() {
    const [hotInstance, setHotInstance] = useState(null);
    const [data, setData] = useState([]);
    const hotElementRef = useRef(null);
    const customBorders = [];
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
                row.dateAjoutee,
                row.BMID,
                row.nomDuClient
            ]);

            const hot = new Handsontable(hotElementRef.current, {
                data: mappedData,
                rowHeaders: true,
                colHeaders: true,
                nestedHeaders: nestedHeaders,
                customBorders: customBorders,
                columns: columns,
                className: 'custom-tablec',
                // afterGetCellMeta: function (row, col, cellProperties) {
                //     const cellValue = this.getDataAtCell(row, col);

                //     if (col === 1) {
                //         const bmidValues = this.getDataAtCol(col);
                //         const cellClass = getColorClassForBMID(cellValue, bmidValues);
                //         cellProperties.className = cellClass;
                //     }
                // },
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
            <ToolBar colis={true}/>
            <div ref={hotElementRef} style={{ width: '100%', height: '100vh' }}></div>
        </>

    );
}

export default ColisSpreadsheet;
