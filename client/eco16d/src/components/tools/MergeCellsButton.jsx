import React, {useState} from 'react';
import MergeImg from '../icons/merge-cells-svgrepo-com.svg'
import axios from 'axios';

const styles = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
}

function MergeCellsButton({ selectedCell, setM, setMerge }) {
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
        console.log("merge pressed: " + newSpan)
        setMerge(newSpan);
        setM(prevM => prevM + 1);
      })
      .catch(err => {
        console.log('Error fetching span:', err);
      });
  }

  return (
    <div style={{display:'flex', flexDirection: "column"}}>
      <button onClick={handleMerge} style={styles}>
        <img src={MergeImg} style={{ width: '18px', height: '18px' }} />
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

export default MergeCellsButton;
