import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDate } from '../contexts/DateContext';
import { PlusOutlined } from '@ant-design/icons';
import './ToolBar.css';
import axios from 'axios';
import VersionHistoryOverlay from './VersionHistory/VersionHistoryOverlay';

function ToolBar({ principale, eco, colis, selectedCell }) {
  const { userData } = useAuth();
  const organisation = userData?.organisation;

  const { year, setYear, quarter, setQuarter } = useDate();

  const onQuarterClick = (selectedQuarter) => () => {
    setQuarter(selectedQuarter);
    console.log("clicking quarter: " + selectedQuarter)
  };

  const onYearClick = (selectedYear) => () => {
    setYear(selectedYear);
    console.log("clicking year: " + selectedYear)
  };

  const on100Click = () => {
    if (principale) {
      return axios.post('http://localhost:3001/100principaleRows');
    }
    if (colis) {
      return axios.post('http://localhost:3001/100colisRows');
    }
  }

  const findSheet = () => {
    if (principale) {
      return "principale";
    }
    if (colis) {
      return "colis";
    }
  }

  return (
    <div className='toolbar'>
      <div>
        <Button>
          <Link to="/home">HOME</Link>
        </Button>
        <Button type={principale ? 'primary' : 'default'}>
          <Link to={`/principale?organisation=${organisation}`}>PRINCIPALE</Link>
        </Button>
        {
          organisation === 'ECO' &&
          <Button type={eco ? 'primary' : 'default'}>
            <Link to="/eco">ECO</Link>
          </Button>
        }
        <Button type={colis ? 'primary' : 'default'}>
          <Link to={`/colis?organisation=${organisation}`}>COLIS MANQUANTS</Link>
        </Button>
      </div>
      {eco ? null : <VersionHistoryOverlay selectedCell={selectedCell} sheet={findSheet()} />}
      <div>
        {!eco ? <Button
          type='dashed'
          icon={<PlusOutlined />}
          onClick={on100Click}
        >
          Add 100 rows
        </Button> : null}
        <Button 
          onClick={onYearClick(year - 1)}>{year - 1}
        </Button>
        <Button
          type={quarter === 1 ? 'primary' : 'default'}
          onClick={onQuarterClick(1)}
        >
          Jan-Mar
        </Button>
        <Button
          type={quarter === 2 ? 'primary' : 'default'}
          onClick={onQuarterClick(2)}
        >
          Apr-Jun
        </Button>
        <Button
          type={quarter === 3 ? 'primary' : 'default'}
          onClick={onQuarterClick(3)}
        >
          Jul-Sep
        </Button>
        <Button
          type={quarter === 4 ? 'primary' : 'default'}
          onClick={onQuarterClick(4)}
        >
          Oct-Dec
        </Button>
        <Button 
          onClick={onYearClick(year + 1)}>{year + 1}
        </Button>
      </div>
    </div>
  );
}

export default ToolBar;
