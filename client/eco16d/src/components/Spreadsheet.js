import React, { useEffect, useState, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';

function Spreadsheet() {
    const [hotInstance, setHotInstance] = useState(null);
    const [data, setData] = useState([]);
    const hotElementRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/cellRows');
                const extractedData = response.data.map(({ _id, ...rest }) => rest);
                setData(extractedData);
                console.log(extractedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (hotElementRef.current && data.length > 0 && !hotInstance) {
            const hot = Handsontable(hotElementRef.current, {
                data: data,
                rowHeaders: true,
                colHeaders: true,
                contextMenu: true,
                dropdownMenu: true,
                licenseKey: 'non-commercial-and-evaluation',
                language: 'en-US',
                stretchH: 'all',
                manualRowResize: true,
                manualColumnResize: true,
                afterChange: (changes, source) => {
                    if (source === 'edit') {
                        // Handle change if needed
                    }
                }
            });
    
            setHotInstance(hot);
        }
    
        return () => {
            if (hotInstance && data.length === 0) {
                hotInstance.destroy();
                setHotInstance(null);
            }
        };
    }, [data, hotInstance]);
    

    return (
        <div ref={hotElementRef} style={{ width: '100%', height: '100vh' }}></div>
    );
}

export default Spreadsheet;
