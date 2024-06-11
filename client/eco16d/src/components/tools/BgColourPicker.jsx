import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import BgColorImg from '../icons/paint-bucket-color-colour-svgrepo-com.svg'

const styles = {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
}

function ColourPicker({ selectedCell, color, setColor, setBg }) {
    const [showPicker, setShowPicker] = useState(false);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChangeHandler = (updatedColor) => {
        if (selectedCell) {
            setColor(updatedColor.hex);
            setBg(prevBg => prevBg + 1);
            togglePicker();
        }
    };

    return (
        <div>
            <button onClick={togglePicker} style={styles}>
                <img src={BgColorImg} style={{ width: '18px', height: '18px' }}/>
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

export default ColourPicker;
