import React, { useState } from 'react';
import FontPicker from 'react-font-picker';
import FontImg from '../icons/difffont-svgrepo-com.svg'

const styles = {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
}

function FontPickerButton({ selectedCell, fontFamily, setFontFamily }) {
    const [showPicker, setShowPicker] = useState(false);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleFontChange = (font) => {
        if (selectedCell) {
            setFontFamily(font);
            togglePicker();
        }
    };

    return (
        <div>
            <button onClick={togglePicker} style={styles}>
                <img src={FontImg} style={{ width: '100px', height: '18px'}}/>
            </button>
            {showPicker && (
                <FontPicker
                    activeFontFamily={fontFamily}
                    onChange={handleFontChange}
                />
            )}
        </div>
    );
}

export default FontPickerButton;
