import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDate } from '../contexts/DateContext';
import './ToolBar.css';
import VersionHistoryOverlay from './VersionHistory/VersionHistoryOverlay';

function ToolBar({ principale, eco, colis, selectedCell }) {
  const { userData } = useAuth();
  const organisation = userData?.organisation;

  const { year, setYear, quarter, setQuarter } = useDate();

  const onQuarterClick = (selectedQuarter) => () => {
    setQuarter(selectedQuarter);
  };

  const onYearClick = (selectedYear) => () => {
    setYear(selectedYear);
  };

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
      {!eco ? <VersionHistoryOverlay selectedCell={selectedCell} sheet={findSheet()} /> : null}
      <div>
        <Button onClick={onYearClick(year - 1)}>{year - 1}</Button>
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
        <Button onClick={onYearClick(year + 1)}>{year + 1}</Button>
      </div>
    </div>
  );
}

export default ToolBar;
