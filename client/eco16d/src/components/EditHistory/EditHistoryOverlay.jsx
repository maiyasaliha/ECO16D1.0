import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import EditHistory from './EditHistory';

function EditHistoryOverlay() {
    const [visible, setVisible] = useState(false);
    const [pressed, setPressed] = useState(0)

    const showModal = () => {
        setPressed(pressed + 1);
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button type="text" style={{ color: '#808080' }} onClick={showModal}>
                Edit History
            </Button>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <EditHistory pressed={pressed}/>
            </Modal>
        </div>
    );
}

export default EditHistoryOverlay;
