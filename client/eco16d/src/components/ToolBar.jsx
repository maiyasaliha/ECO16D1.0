import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './ToolBar.css';

function ToolBar({principale, eco, colis}) {
  const { userData } = useAuth();
  const organisation = userData?.organisation;
 
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
          organisation == 'ECO' ?
          <Button type={eco ? 'primary' : 'default'}>
            <Link to="/eco">ECO</Link>
          </Button> : ''
        }
        <Button type={colis ? 'primary' : 'default'}>
            <Link to={`/colis?organisation=${organisation}`}>COLIS MANQUANTS</Link>
        </Button>
      </div>
      <div>
        <Button>Jan-Mar</Button>
        <Button>Apr-Jun</Button>
        <Button>Jul-Sep</Button>
        <Button>Oct-Dec</Button>
      </div>
    </div>
  )
}

export default ToolBar