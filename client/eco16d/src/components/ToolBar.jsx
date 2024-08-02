import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDate } from '../contexts/DateContext';
import { PlusOutlined } from '@ant-design/icons';
import { SearchBar } from '../'
import './ToolBar.css';
import axios from 'axios';
import VersionHistoryOverlay from './VersionHistory/VersionHistoryOverlay';
import SearchResultsDrawer from './SearchResultsDrawer/SearchResultsDrawer';
import { API_URL } from '../EcoSetup';

function ToolBar({ principale, eco, colis, selectedCell, version }) {
  const { userData } = useAuth();
  const organisation = userData?.organisation;
  const { year, setYear, quarter, setQuarter, setadd } = useDate();
  const [searchResults, setSearchResults] = useState([]);
  
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
      setadd();
      return axios.post(`${API_URL}:3001/100principaleRows`);
    }
    if (colis) {
      setadd();
      return axios.post(`${API_URL}:3001/100colisRows`);
    }
  };

  const findSheet = () => {
    if (principale) {
      return "principale";
    }
    if (colis) {
      return "colis";
    }
  };

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
      {eco || !version ? null : <VersionHistoryOverlay selectedCell={selectedCell} sheet={findSheet()} />}
      {eco ? null : <SearchResultsDrawer sheet={findSheet()} />}
      <div>
        {!eco ? (
          <Button
            type='dashed'
            icon={<PlusOutlined />}
            onClick={on100Click}
          >
            Add 100 rows
          </Button>
        ) : null}
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
