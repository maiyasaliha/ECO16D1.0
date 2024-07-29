import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDate } from '../contexts/DateContext';
import { PlusOutlined } from '@ant-design/icons';
import './ToolBar.css';
import VersionHistoryOverlay from './VersionHistory/VersionHistoryOverlay';

function ToolBar({ principale, eco, colis, selectedCell }) {
  const { userData } = useAuth();
  const organisation = userData?.organisation;

  const { year, setYear, quarter, setQuarter, newPage, setnewPage } = useDate();
  const [quarterClick, setquarterClick] = useState(true);

  const onQuarterClick = (selectedQuarter) => () => {
    setQuarter(selectedQuarter);
    setquarterClick(true);
    setnewPage(false);
    console.log("clicking quarter: " + selectedQuarter)
  };

  const onYearClick = (selectedYear) => () => {
    setYear(selectedYear);
    newPage ? setquarterClick(false) : setquarterClick(true);
    console.log("clicking year: " + selectedYear)
  };

  const onNewClick = () => {
    setnewPage(!newPage);
    setquarterClick(false);
    console.log("clicking new: ")
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
      {eco || newPage ? null : <VersionHistoryOverlay selectedCell={selectedCell} sheet={findSheet()} />}
      <div>
      {!eco ? <Button
          type={newPage ? 'primary' : 'default'}
          icon={<PlusOutlined />}
          onClick={onNewClick}
        >
          {principale ? <Link to="/newPrincipale">New</Link> : colis? <Link to="/newColis">New</Link> : null}
        </Button> : null}
        <Button onClick={onYearClick(year - 1)}>{year - 1}</Button>
        <Button
          type={quarterClick && quarter === 1 ? 'primary' : 'default'}
          onClick={onQuarterClick(1)}
        >
          Jan-Mar
        </Button>
        <Button
          type={quarterClick && quarter === 2 ? 'primary' : 'default'}
          onClick={onQuarterClick(2)}
        >
          Apr-Jun
        </Button>
        <Button
          type={quarterClick && quarter === 3 ? 'primary' : 'default'}
          onClick={onQuarterClick(3)}
        >
          Jul-Sep
        </Button>
        <Button
          type={quarterClick && quarter === 4 ? 'primary' : 'default'}
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
