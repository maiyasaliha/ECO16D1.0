import React, { useState } from 'react';
import { Button, Drawer, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { pcolumns, ccolumns } from './SearchTablesStructure';
import { API_URL } from '../../EcoSetup';
const { Search } = Input;

function SearchResultsDrawer({sheet}) {
  const [visible, setVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSearch = async (value) => {
    try {
      const response = await axios.get(`${API_URL}:3001/search${sheet}?keyword=${value}`);
      setSearchResults(response.data);
      console.log('Search results:', response.data);
    } catch (error) {
      console.error('Error searching documents:', error);
    }
  };

  return (
    <div>
      <Button type="text" icon={<SearchOutlined />} onClick={showDrawer} />
      <Drawer
        title="Search Results"
        placement="bottom"
        closable={true}
        onClose={onClose}
        open={visible}
        height={400}
      >
        <Search
          placeholder="Search..."
          onSearch={onSearch}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <Table
          columns={sheet === "colis" ? ccolumns : pcolumns}
          dataSource={searchResults}
          rowKey={(record) => record._id}
          pagination={false}
          className="search-results-table"
        />
      </Drawer>
    </div>
  );
}

export default SearchResultsDrawer;
