import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import axios from 'axios';
import io from 'socket.io-client';
import './styles.css'
import LinkRenderer from './LinkRenderer';

const socket = io('http://localhost:3001');

function Spreadsheet({ selectedCell, 
    setSelectedCell, bgcolor, color, clear, setClear, bold, italic, 
    underline, strikeThrough, b, i, s, u, fontFamily, fontSize, textAlign, a, 
    format, f, editor, e, z, m, merge, mr, mergeRow, bg, fc}) {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);
    const gridRef = useRef(null);
    const [selectionRange, setSelectionRange] = useState(null);
    const [mouseDown, setMouseDown] = useState(false);


    useEffect(() => {
        socket.on('connect', () => {});

        const handleCellUpdated = (updatedCell) => {
            fetchData();
        };

        socket.on('cellUpdated', handleCellUpdated);

        return () => {
            socket.off('connect');
            socket.off('cellUpdated', handleCellUpdated);
        };
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3001/cellRows')
            .then(response => {
                const data = response.data.map((row, index) => ({
                    ...row,
                    index: index + 1
                }));
                setRowData(data);
                generateColDefs(data);
            })
            .catch(err => {
                console.log('Error fetching data:', err);
            });
    }

    useEffect(() => {
        clearSelected();
        fetchData();
    }, []);

    const generateColDefs = async (data) => {
        if (data.length > 0) {
            const keys = Object.keys(data[0]);
            const filteredKeys = keys.filter(key => key !== '_id' && key !== 'index' && key != 'undefined' && key != 'pin');
            const promises = filteredKeys.map(async key => {
                let date = false;
                const width = data[0][key].width || null;
                return {
                    headerName: key,
                    field: key,
                    editable: true,
                    filter: true,
                    suppressMovable: true,
                    width: width,
                    cellEditorSelector: (params) => {
                        const cellEditorFramework = params.data[key]?.cellRenderer;
                        console.log("editor taken as " + cellEditorFramework)
                        if (cellEditorFramework === 'agCheckboxCellEditor') {
                            return { component: 'agCheckboxCellEditor' };
                        }
                        if (cellEditorFramework === 'agDateStringCellEditor') {
                            date = true;
                            return { component: 'agDateStringCellEditor' };
                        }
                        if (cellEditorFramework === 'agSelectCellEditor') {
                            return { 
                                component: 'agSelectCellEditor', 
                                params: { values: params.data[key]?.values || [] } 
                            };
                        }
                        return null;
                    },
                    cellRendererSelector: (params) => {
                        const cellRenderer = params.data[key]?.cellRenderer;
                        if (cellRenderer === 'agCheckboxCellEditor') {
                            return { component: 'agCheckboxCellRenderer' };
                        }
                        if (key === 'lienGooglePourLesImages' && params.data[key]?.value) {
                            return { component: LinkRenderer }
                        }
                        return null;
                    },
                    wrapHeaderText: true,
                    autoHeaderHeight: true,
                    colSpan: (params) => params.data[key]?.span || '',
                    rowSpan: (params) => params.data[key]?.spanrow || '',
                    valueGetter: (params) => params.data[key]?.value || '',
                    valueFormatter: date ? (params) => {
                        const value = params.value;
                        if (!value) return '';
                        const dateValue = new Date(value);
                        const formattedDate = `${('0' + (dateValue.getMonth() + 1)).slice(-2)}-${('0' + dateValue.getDate()).slice(-2)}-${dateValue.getFullYear()}`;
                        return formattedDate;
                    } : null,
                    cellStyle: (params) => {
                        const style = params.data[key];
                        return {
                            fontFamily: style?.fontFamily,
                            fontSize: style?.fontSize,
                            fontWeight: style?.fontWeight,
                            fontStyle: style?.fontStyle,
                            textDecoration: style?.textDecoration,
                            color: style?.color,
                            backgroundColor: style.selected? '#e5f3fd' : style?.backgroundColor,
                            borderRight: style?.borderRight,
                            textAlign: style?.textAlign,
                            verticalAlign: style?.verticalAlign,
                        };
                    }
                };
            });
            const resolvedColDefs = await Promise.all(promises);
            const colDefs = [
                {
                    headerName: '',
                    field: 'index',
                    pinned: 'left',
                    lockPinned: true,
                    width: 70,
                    sortable: false,
                    headerCheckboxSelection: true,
                    resizable: false,
                    cellStyle: {textAlign: 'center'}
                },
            {
                headerName: 'le rouge suggère un identifiant de commande incorrect de plus de 8 caractères',
                children: [
                    {
                        headerName: 'Last Updated [GMT+8]',
                        children: resolvedColDefs.slice(0, 2),
                        headerClass: 'header-group-style1',
                    },
                    {
                        headerName: '16/05/2024 16:03:39',
                        children: resolvedColDefs.slice(2, 4),
                        headerClass: 'header-group-style2',
                    },
                ],
                headerClass: 'header-group-style5',

            },
            {
                headerName: 'le vert suggère que le numéro de commande existe déjà dans la page colis manquants',
                children: [
                    {
                        headerName: 'ECO À REMPLIR',
                        children: resolvedColDefs.slice(4, 16),
                        headerClass: 'header-group-style3',
                    },
                ],
                headerClass: 'header-group-style4',
            },
            {
                headerName: '',
                children: [
                    {
                        headerName: 'AXE À REMPLIR',
                        children: resolvedColDefs.slice(16),
                        headerClass: 'header-group-style4',
                    }
                ],
                headerClass: 'header-group-style4'
            }
            ];
            setColDefs(colDefs);
        }
    };

    const onColumnResized = (params) => {
        if (params.finished && params.column) {
            const colId = params.column.getColId();
            const newWidth = params.column.getActualWidth();
            console.log(params)
            console.log(colId);
            console.log(newWidth)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'width',
                value: newWidth
            };
            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
            }
        };

    const onCellValueChanged = (params) => {
        const field = params.colDef.field;
        const updateData = {
            _id: params.data._id,
            field: field,
            property: "value",
            value: params.data[field]
        };

        axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(err => {
                console.log('Error updating data:', err);
            });
    };

    const onCellClicked = (params) => {
        const colId = params.column.getId();
        const cellData = params.data[colId];
        setSelectedCell({
            rowIndex: params.rowIndex,
            colId: colId,
            data: cellData ? cellData.value : null,
            _id: params.data._id
        });
        console.log("selected cell");
        console.log(selectedCell);
    };

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && bgcolor && bg) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'backgroundColor',
                value: bgcolor
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [bg]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && color && fc) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'color',
                value: color
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [fc]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && fontFamily) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'fontFamily',
                value: fontFamily
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [fontFamily]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && fontSize && z) {
            console.log("increasing size " + fontSize)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'fontSize',
                value: fontSize
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [z]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && bold && b) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'fontWeight',
                value: bold
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [b]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && italic && i) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'fontStyle',
                value: italic
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [i]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && underline && u) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'textDecoration',
                value: underline
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [u]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && strikeThrough && s) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'textDecoration',
                value: strikeThrough
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [s]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && clear) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId
            };
            axios.post('http://localhost:3001/clearCellProperty', updateData)
            .then(response => {
                console.log(response.data.message);
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error clearing formatting:', error);
            });
        } else {
        }
        setClear(false);
    }, [clear]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && textAlign && a) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'textAlign',
                value: textAlign
            };
            axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
        } else {
        }
    }, [a]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && format && f) {
            console.log("setting " + format + " for " + selectedCell._id + " " + selectedCell.colId)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'format',
                value: format
            };
            axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
        } else {
        }
    }, [f]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && merge && m) {
            console.log("setting " + merge + " for " + selectedCell._id + " " + selectedCell.colId)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'span',
                value: merge
            };
            axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
        } else {
        }
    }, [m]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && mergeRow && mr) {
            console.log("setting merge row" + mergeRow + " for " + selectedCell._id + " " + selectedCell.colId)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'spanrow',
                value: mergeRow
            };
            axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
        } else {
        }
    }, [mr]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && editor && e) {
            console.log("setting " + editor + " for " + selectedCell._id + " " + selectedCell.colId)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'cellRenderer',
                value: editor
            };
            axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
        } else {
        }
    }, [e]);

    const clearSelected = () => {
        axios.post('http://localhost:3001/clearSelected')
        .then(response => {
            //socket.emit('updateCell');
            fetchData();
        })
        .catch(error => {
            console.error('Error updating data:', error);
        });
    }
    

    const setSelection = (params) => {
        const field = params.column.getId();

        const updateData = {
            _id: params.data._id,
            field: field,
            property: 'selected',
            value: true,
        };
        axios.post('http://localhost:3001/updateCellProperty', updateData)
        .then(response => {
            socket.emit('updateCell', updateData);
            fetchData();
        })
        .catch(error => {
            console.error('Error updating data:', error);
        });
    }

    const addColumn = () => {
        const newColumnName = prompt('Enter new column name:');
        if (newColumnName) {
            const updatedColDefs = [...colDefs];
            updatedColDefs[1].children.push({
                headerName: newColumnName,
                field: newColumnName,
                editable: true,
                filter: true,
                suppressMovable: true,
                width: 150,
                cellEditorSelector: null,
                cellRendererSelector: null,
                wrapHeaderText: true,
                autoHeaderHeight: true,
                valueGetter: (params) => params.data[newColumnName]?.value || '',
                cellStyle: (params) => {
                    const style = params.data[newColumnName];
                    return {
                        fontFamily: style?.fontFamily,
                        fontSize: style?.fontSize,
                        fontWeight: style?.fontWeight,
                        fontStyle: style?.fontStyle,
                        textDecoration: style?.textDecoration,
                        color: style?.color,
                        backgroundColor: style?.backgroundColor,
                        borderRight: style?.borderRight,
                        textAlign: style?.textAlign,
                        verticalAlign: style?.verticalAlign,
                    };
                }
            });
            setColDefs(updatedColDefs);
        }
    };

    const onCellMouseDown = (params) => {
        setMouseDown(false);
        setMouseDown(true);
        console.log("mouse down")
        // setStartRow(params.rowIndex);
        // setStartCol(params.column.getId());
        setSelectionRange({
            startRowIndex: params.rowIndex,
            startColId: params.column.getId(),
            endRowIndex: params.rowIndex,
            endColId: params.column.getId()
        });
        setSelection(params);
        console.log("selecting range")
        console.log("setting range start r " + params.rowIndex)
        console.log("setting range start c " + params.column.getId())
    };

    const onCellMouseOver = (params) => {
        if (selectionRange && mouseDown) {
            console.log("mouse over")
            // setEndRow(params.rowIndex);
            // setEndCol(params.column.getId());
            setSelectionRange(prevRange => ({
                ...prevRange,
                endRowIndex: params.rowIndex,
                endColId: params.column.getId()
            }));
            setSelection(params);
        }
    };

    const onCellMouseUp = () => {
        if (mouseDown) {
            console.log("mouse up")
            setMouseDown(false);
            setSelectionRange(null);
        }
    };


    return (
        <div>
            <button onClick={addColumn}>Add Column</button>
            <div 
                className="ag-theme-quartz" 
                style={{ height: '100vh', width: '100%' }}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    rowSelection={'multiple'}
                    defaultColDef={{ 
                        editable: true,
                        wrapHeaderText: true,
                        autoHeaderHeight: true,
                        resizable: true,
                    }}
                    onCellValueChanged={onCellValueChanged}
                    onCellClicked={onCellClicked}
                    onCellMouseUp={onCellMouseUp}
                    onCellMouseDown={onCellMouseDown}
                    onCellMouseOver={onCellMouseOver}
                    columnHoverHighlight={true}
                    suppressDragLeaveHidesColumns={true}
                    suppressRowTransform={true}
                    onColumnResized={onColumnResized}
                    ref={gridRef}
                    
                />
            </div>
        </div>
    );
}

export default Spreadsheet;
