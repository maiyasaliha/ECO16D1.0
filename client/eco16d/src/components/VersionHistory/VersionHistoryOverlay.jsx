import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import VersionHistory from './VersionHistory';

function VersionHistoryOverlay({ selectedCell, sheet }) {
    const [visible, setVisible] = useState(false);
    const [pressed, setPressed] = useState(0);

    const showDrawer = () => {
        setPressed(pressed + 1);
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button type="text" icon={<HistoryOutlined />} onClick={showDrawer} />
            <Drawer
                title="Version History"
                placement="bottom"
                closable={true}
                onClose={onClose}
                open={visible}
                width={400}
            >
                <VersionHistory pressed={pressed} selectedCell={selectedCell} sheet={sheet} />
            </Drawer>
        </div>
    );
}

export default VersionHistoryOverlay;