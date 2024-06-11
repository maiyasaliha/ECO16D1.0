import React from 'react'
import StrikeImg from '../icons/strikethrough-svgrepo-com.svg'
import axios from 'axios';

const styles = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
}

function StrikethroughButton({selectedCell, setS, setStrikeThrough}) {
  const handleStrike = () => {
    if (selectedCell) {
      fetchStrikeThrough();
    }
  }

  const fetchStrikeThrough = () => {
    axios.get(`http://localhost:3001/getCellProperty/${selectedCell._id}/${selectedCell.colId}/textDecoration`)
      .then(response => {
        const currentDeco = response.data[selectedCell.colId].textDecoration;
        const newDeco = currentDeco === "line-through" ? "none" : "line-through";
        setStrikeThrough(newDeco);
        setS(prevS => prevS + 1);
      })
      .catch(err => {
        console.log('Error fetching strike:', err);
      });
  }

  return (
    <button onClick={handleStrike} style={styles}>
      <img src={StrikeImg} style={{ width: '18px', height: '18px' }}/>
    </button>
  )
}

export default StrikethroughButton