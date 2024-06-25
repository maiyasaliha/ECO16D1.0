import React from 'react'
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function ToolBar() {
  return (
    <div>
        <Button>
            <Link to="/home">Back to home</Link>
        </Button>
        <Button>Jan-Mar</Button>
        <Button>Apr-Jun</Button>
        <Button>Jul-Sep</Button>
        <Button>Oct-Dec</Button>
    </div>
  )
}

export default ToolBar