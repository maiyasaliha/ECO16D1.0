import React from 'react'
import UnderlineImg from '../icons/format-underline-svgrepo-com.svg'
import axios from 'axios';

const styles = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
}

function UnderlineButton({selectedCell, setU, setUnderline}) {
  const handleUnderline = () => {
    if (selectedCell) {
      fetchUnderline();
    }
  }
  const fetchUnderline = () => {
    axios.get(`http://localhost:3001/getCellProperty/${selectedCell._id}/${selectedCell.colId}/textDecoration`)
      .then(response => {
        const currentDeco = response.data[selectedCell.colId].textDecoration;
        const newDeco = currentDeco === "underline" ? "none" : "underline";
        setUnderline(newDeco);
        setU(prevU => prevU + 1);
      })
      .catch(err => {
        console.log('Error fetching underline:', err);
      });
  }

  return (
    <button onClick={handleUnderline} style={styles}>
      <img src={UnderlineImg} style={{ width: '18px', height: '18px' }}/>
    </button>
  )
}

export default UnderlineButton