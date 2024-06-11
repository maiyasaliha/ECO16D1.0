import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import FontImg from '../icons/font-color-svgrepo-com.svg'

const styles = {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
}

function FontColourPicker({ selectedCell, color, setColor, setFc }) {
    const [showPicker, setShowPicker] = useState(false);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChangeHandler = (updatedColor) => {
        if (selectedCell) {
            setColor(updatedColor.hex);
            setFc(prevFc => prevFc + 1);
            togglePicker();
        }
    };

    return (
        <div>
            <button onClick={togglePicker} style={styles}>
                <img src={FontImg} style={{ width: '20px', height: '20px'}}/>
            </button>
            {showPicker && (
                <SketchPicker
                    color={color}
                    onChange={onChangeHandler}
                />
            )}
        </div>
    );
}

export default FontColourPicker;
