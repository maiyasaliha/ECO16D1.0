import React from 'react'
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function ToolBar({principale, eco, colis}) {
 
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '10px'}}>
      <div>
        <Button>
            <Link to="/home">HOME</Link>
        </Button>
        <Button type={principale ? 'primary' : 'default'}>
            <Link to="/principale">PRINCIPALE</Link>
        </Button>
        <Button type={eco ? 'primary' : 'default'}>
            <Link to="/eco">ECO</Link>
        </Button>
        <Button type={colis ? 'primary' : 'default'}>
            <Link to="/colis">COLIS MANQUANTS</Link>
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