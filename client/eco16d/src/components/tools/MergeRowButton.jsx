import React, {useState} from 'react';
import MergeImg from '../icons/merge-cells-svgrepo-com.svg'
import axios from 'axios';

const styles = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
}

function MergeRowButton({ selectedCell, setMr, setMergeRow }) {
  const [inputValue, setInputValue] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
      setShowPicker(!showPicker);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleMerge = () => {
    if (selectedCell) {
      fetchMerge(inputValue);
      togglePicker();
    }
  }

  const fetchMerge = (inputValue) => {
    axios.get(`http://localhost:3001/getCellProperty/${selectedCell._id}/${selectedCell.colId}/span`)
      .then(response => {
        const currentSpan = response.data[selectedCell.colId].span;
        const newSpan = inputValue;
        console.log("merge row pressed: " + newSpan)
        setMergeRow(newSpan);
        setMr(prevM => prevM + 1);
      })
      .catch(err => {
        console.log('Error fetching span:', err);
      });
  }

  return (
    <div style={{display:'flex', flexDirection: "column"}}>
      <button onClick={handleMerge} style={styles}>
        <img src={MergeImg} style={{ width: '18px', height: '22px', transform: 'rotate(90deg)' }} />
      </button>
      {showPicker &&
        <input 
          type="number" 
          value={inputValue} 
          onChange={handleInputChange} 
          style={{width: '40px'}}
        />
      }
    </div>
  );
}

export default MergeRowButton;
