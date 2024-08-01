import React, { useState } from 'react';
import { Button, Drawer, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

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
      const response = await axios.get(`http://localhost:3001/search${sheet}?keyword=${value}`);
      setSearchResults(response.data);
      console.log('Search results:', response.data);
    } catch (error) {
      console.error('Error searching documents:', error);
    }
  };
  const ccolumns = [
    {
      title: 'date créée',
      dataIndex: 'dateCreee',
      key: 'dateCreee',
    },
    {
      title: 'BMID',
      dataIndex: 'BMID',
      key: 'BMID',
    },
    {
      title: 'Nom du client',
      dataIndex: 'nomDuClient',
      key: 'nomDuClient',
    },
    {
      title: 'INFORMATIONS CRÉÉES SUR LA PAGE PRINCIPALE',
      dataIndex: 'informations',
      key: 'informations',
    }
  ];
  const pcolumns = [
    {
      title: 'date ajoutée',
      dataIndex: 'dateAjoutee',
      key: 'dateAjoutee',
    },
    {
      title: 'BMID',
      dataIndex: 'BMID',
      key: 'BMID',
    },
    {
      title: 'Nom du client',
      dataIndex: 'nomDuClient',
      key: 'nomDuClient',
    },
    {
      title: 'Raison du retour',
      dataIndex: 'raisonDuRetour',
      key: 'raisonDuRetour',
    },
    {
      title: 'BM Raison du retour',
      dataIndex: 'bmRaisonDuRetour',
      key: 'bmRaisonDuRetour',
    },
    {
      title: 'SKU',
      dataIndex: 'SKU',
      key: 'SKU',
    },
    {
      title: 'Nom du produit',
      dataIndex: 'nomDuProduit',
      key: 'nomDuProduit',
    },
    {
      title: 'IMEI',
      dataIndex: 'IMEI',
      key: 'IMEI',
    },
    {
      title: 'Transporteur',
      dataIndex: 'transporteur',
      key: 'transporteur',
    },
    {
      title: 'Numéro de suivi',
      dataIndex: 'numeroDeSuivi',
      key: 'numeroDeSuivi',
    },
    {
      title: 'Customer Informed about non-compliance',
      dataIndex: 'customerInformedAboutNonCompliance',
      key: 'customerInformedAboutNonCompliance',
    },
    {
      title: 'Customer informed if locked?',
      dataIndex: 'customerInformedIfLocked',
      key: 'customerInformedIfLocked',
    },
    {
      title: 'Refunded',
      dataIndex: 'refunded',
      key: 'refunded',
    },
    {
      title: 'Returned to SG',
      dataIndex: 'returnedToSG',
      key: 'returnedToSG',
    },
    {
      title: 'Date returned to SG',
      dataIndex: 'dateReturnedToSG',
      key: 'dateReturnedToSG',
    },
    {
      title: 'Waybill No.',
      dataIndex: 'waybillNo',
      key: 'waybillNo',
    },
    {
      title: 'Date de réception Axe',
      dataIndex: 'dateDeReceptionAxe',
      key: 'dateDeReceptionAxe',
    },
    {
      title: 'Contenu conforme ?',
      dataIndex: 'contenuConforme',
      key: 'contenuConforme',
    },
    {
      title: 'IMEI de réception',
      dataIndex: 'IMEIDeReception',
      key: 'IMEIDeReception',
    },
    {
      title: 'État de l`appareil',
      dataIndex: 'etatDeLAppareil',
      key: 'etatDeLAppareil',
    },
    {
      title: 'Commentaires (Rayures ? Bosses ?)',
      dataIndex: 'commentaires',
      key: 'commentaires',
    },
    {
      title: 'Lien Google pour les images',
      dataIndex: 'lienGooglePourLesImages',
      key: 'lienGooglePourLesImages',
    },
  ];

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
