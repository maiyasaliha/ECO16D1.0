import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDate } from '../contexts/DateContext';
import { PlusOutlined } from '@ant-design/icons';
import './ToolBar.css';
import VersionHistoryOverlay from './VersionHistory/VersionHistoryOverlay';

function ToolBar({ principale, eco, colis, selectedCell }) {
  const { userData } = useAuth();
  const organisation = userData?.organisation;
  const navigate = useNavigate();

  const { year, setYear, quarter, setQuarter, newPage, setnewPage } = useDate();

  const onQuarterClick = (selectedQuarter) => () => {
    setQuarter(selectedQuarter);
    setnewPage(false);
    console.log("clicking quarter: " + selectedQuarter);
  };

  const onYearClick = (selectedYear) => () => {
    setYear(selectedYear);
    console.log("clicking year: " + selectedYear);
  };

  const onNewClick = () => {
    setnewPage(!newPage);
    if (newPage) {
      if (principale) {
        navigate("/newPrincipale");
      } else if (colis) {
        navigate("/newColis");
      }
    } else {
      if (principale) {
        navigate(`/principale?organisation=${organisation}`);
      } else if (colis) {
        navigate(`/colis?organisation=${organisation}`);
      }
    }
    console.log("clicking new: ");
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
        {organisation === 'ECO' && (
          <Button type={eco ? 'primary' : 'default'}>
            <Link to="/eco">ECO</Link>
          </Button>
        )}
        <Button type={colis ? 'primary' : 'default'}>
          <Link to={`/colis?organisation=${organisation}`}>COLIS MANQUANTS</Link>
        </Button>
      </div>
      {eco || newPage ? null : <VersionHistoryOverlay selectedCell={selectedCell} sheet={findSheet()} />}
      <div>
        {!eco ? (
          <Button
            type={newPage ? 'primary' : 'default'}
            icon={<PlusOutlined />}
            onClick={onNewClick}
          >
            New
          </Button>
        ) : null}
        <Button 
          disabled={newPage}
          onClick={onYearClick(year - 1)}>{year - 1}
        </Button>
        <Button
          type={quarter === 1 ? 'primary' : 'default'}
          disabled={newPage}
          onClick={onQuarterClick(1)}
        >
          Jan-Mar
        </Button>
        <Button
          type={quarter === 2 ? 'primary' : 'default'}
          disabled={newPage}
          onClick={onQuarterClick(2)}
        >
          Apr-Jun
        </Button>
        <Button
          type={quarter === 3 ? 'primary' : 'default'}
          disabled={newPage}
          onClick={onQuarterClick(3)}
        >
          Jul-Sep
        </Button>
        <Button
          type={quarter === 4 ? 'primary' : 'default'}
          disabled={newPage}
          onClick={onQuarterClick(4)}
        >
          Oct-Dec
        </Button>
        <Button 
          disabled={newPage}
          onClick={onYearClick(year + 1)}>{year + 1}
        </Button>
      </div>
    </div>
  );
}

export default ToolBar;
