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

  const onQuarterClick = (selectedQuarter) => () => {
    setQuarter(selectedQuarter);
    setnewPage(false);
    console.log("clicking quarter: " + selectedQuarter)
  };

  const onYearClick = (selectedYear) => () => {
    setYear(selectedYear);
    console.log("clicking year: " + selectedYear)
  };

  const onNewClick = (pressed) => () => {
    setnewPage(pressed);
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
        <div>
          <Button>
            <Link to="/home">HOME</Link>
          </Button>
          <Button onClick={onNewClick(false)} type={!newPage && principale ? 'primary' : 'default'}>
            <Link to={`/principale?organisation=${organisation}`}>PRINCIPALE</Link>
          </Button>
          {
            organisation === 'ECO' &&
            <Button onClick={onNewClick(false)} type={!newPage && eco ? 'primary' : 'default'}>
              <Link to="/eco">ECO</Link>
            </Button>
          }
          <Button onClick={onNewClick(false)} type={!newPage && colis ? 'primary' : 'default'}>
            <Link to={`/colis?organisation=${organisation}`}>COLIS MANQUANTS</Link>
          </Button>
          {!eco ? 
          <div>
            <Button
              type={newPage ? 'primary' : 'default'}
              icon={<PlusOutlined />}
              onClick={onNewClick(true)}
            >
              New
            </Button> 
            { newPage ?
              <Button onClick={onNewClick(false)} type={!newPage && colis ? 'primary' : 'default'}>
                {principale ? <Link to="/newPrincipale">New Colis</Link> : colis? <Link to="/newColis">New Pri</Link> : null}
              </Button>
              : null
            }
          </div>
          : null}
        </div>
      </div>
      {eco || newPage ? null : <VersionHistoryOverlay selectedCell={selectedCell} sheet={findSheet()} />}
      <div>
        <Button onClick={onYearClick(year - 1)}>{year - 1}</Button>
        <Button
          type={!newPage && quarter === 1 ? 'primary' : 'default'}
          onClick={onQuarterClick(1)}
        >
          Jan-Mar
        </Button>
        <Button
          type={!newPage && quarter === 2 ? 'primary' : 'default'}
          onClick={onQuarterClick(2)}
        >
          Apr-Jun
        </Button>
        <Button
          type={!newPage && quarter === 3 ? 'primary' : 'default'}
          onClick={onQuarterClick(3)}
        >
          Jul-Sep
        </Button>
        <Button
          type={!newPage && quarter === 4 ? 'primary' : 'default'}
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
