import React from 'react';
import ClearFormatImg from "../icons/clear-formatting-svgrepo-com.svg"

const styles = {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
}

function ClearFormatting({ selectedCell, setClear }) {
    const onChangeHandler = () => {
        if (selectedCell) {
            setClear(true);
        }
    };

    return (
        <div>
            <button onClick={onChangeHandler} style={styles}>
                <img src={ClearFormatImg} style={{ width: '18px', height: '18px' }}/>
            </button>
        </div>
    );
}

export default ClearFormatting;
