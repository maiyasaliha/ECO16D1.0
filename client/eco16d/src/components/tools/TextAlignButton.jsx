import React, { useState } from 'react';
import AlignImg from '../icons/align-center-svgrepo-com.svg'
import axios from 'axios';

const styles = {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
}

function TextAlignButton({ selectedCell, setA, setTextAlign }) {
    
    const handleAlignChange = () => {
        if (selectedCell) {
            fetchAlign();
        }
    };

    const fetchAlign = () => {
        axios.get(`http://localhost:3001/getCellProperty/${selectedCell._id}/${selectedCell.colId}/textAlign`)
          .then(response => {
            const currentAlign = response.data[selectedCell.colId].textAlign;
            const newAlign = currentAlign === "left" ?
             "center" :
              currentAlign === "center" ?
              "right" :
              "left";
            setTextAlign(newAlign);
            setA(prevA => prevA + 1);
          })
          .catch(err => {
            console.log('Error fetching bold:', err);
          });
      }

    return (
        <div>
            <button onClick={handleAlignChange} style={styles}>
                <img src={AlignImg} style={{ width: '24px', height: '24px'}}/>
            </button>
        </div>
    );
}

export default TextAlignButton;
