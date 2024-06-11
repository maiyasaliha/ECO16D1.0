import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const options = [
  'Text', 'Number', 'Check Box', 'Date', 'Drop Down'
];

const defaultOption = options[0];

function CellFormatButton({ selectedCell, setF, setFormat, setE, setEditor }) {
    
    const handleFormatChange = (format) => {
        if (selectedCell) {
            console.log(selectedCell)
            if (format.value === 'Date') {
                setEditor('agDateStringCellEditor')
                setE(prevE => prevE + 1)
                setFormat('dateString')
                setF(prevF => prevF + 1)
            }
            if (format.value === 'Number') {
                setEditor('agNumberCellEditor')
                setE(prevE => prevE + 1)
                setFormat('number')
                setF(prevF => prevF + 1)
            }
            if (format.value === 'Check Box') {
                setEditor('agCheckboxCellEditor')
                setE(prevE => prevE + 1)
                setFormat('boolean')
                setF(prevF => prevF + 1)
            }
            if (format.value === 'Text') {
                setEditor('agTextCellEditor')
                setE(prevE => prevE + 1)
                setFormat('text')
                setF(prevF => prevF + 1)
            }
            if (format.value === 'Drop Down') {
                setEditor('agSelectCellEditor')
                setE(prevE => prevE + 1)
                setFormat('text')
                setF(prevF => prevF + 1)
            }
            if (format.value === 'Long Text') {
                setEditor('agSelectCellEditor')
                setE(prevE => prevE + 1)
                setFormat('text')
                setF(prevF => prevF + 1)
            }
        }
    };

    return (
        <div>
            <Dropdown options={options} onChange={handleFormatChange} value={defaultOption} />
        </div>
    );
}

export default CellFormatButton;
