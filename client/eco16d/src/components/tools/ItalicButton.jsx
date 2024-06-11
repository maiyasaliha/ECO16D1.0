import React from 'react'
import ItalicImg from '../icons/italic-svgrepo-com.svg'
import axios from 'axios';

const styles = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
}

function ItalicButton({selectedCell, setI, setItalic}) {
  const handleItalic = () => {
    if (selectedCell) {
      fetchItalic();
    }
  }

  const fetchItalic = () => {
    axios.get(`http://localhost:3001/getCellProperty/${selectedCell._id}/${selectedCell.colId}/fontStyle`)
      .then(response => {
        const currentStyle = response.data[selectedCell.colId].fontStyle;
        const newStyle = currentStyle === "italic" ? "normal" : "italic";
        setItalic(newStyle);
        setI(prevI => prevI + 1);
      })
      .catch(err => {
        console.log('Error fetching italic:', err);
      });
  }

  return (
    <button onClick={handleItalic} style={styles}>
      <img src={ItalicImg} style={{ width: '18px', height: '18px' }}/>
    </button>
  )
}

export default ItalicButton