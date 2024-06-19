import React, { useEffect, useState, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';
import io from 'socket.io-client';
import './styles.css';

const socket = io('http://localhost:3001');

function Spreadsheet() {
    const [hotInstance, setHotInstance] = useState(null);
    const [data, setData] = useState([]);
    const hotElementRef = useRef(null);
    const customBorders = [];
    const [rows, setRows] = useState([]);
    const [selectedCell, setSelectedCell] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/cellRows');
                const extractedDataBeforeMap = response.data;
                const extractedData = extractedDataBeforeMap.map(({ _id, ...rest }) => rest);
                setData(extractedData);
                setRows(extractedData.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    Handsontable.renderers.registerRenderer('customStylesRenderer', (hotInstance, TD, ...rest) => {
        Handsontable.renderers.TextRenderer(hotInstance, TD, ...rest);
      
        TD.style.fontWeight = 'bold';
        TD.style.color = 'green';
        TD.style.background = '#d7f1e1';
      });


    for (let row = 0; row < rows; row++) {
        customBorders.push({
            row: row,
            col: 15,
            right: {
                width: 3,
                color: 'black',
            },
        });
    }

    useEffect(() => {
        if (hotElementRef.current && data.length > 0 && !hotInstance) {

            const nestedHeaders = [
                [{ label: 'le rouge suggère un identifiant de commande incorrect de plus de 8 caractères', colspan: 16, className: 'header-group-style5' }, 
                    { label: 'le vert suggère que le numéro de commande existe déjà dans la page colis manquants', colspan: 6, className: 'header-group-style4' }],
                [{ label: 'Last Updated [GMT+8]', colspan: 2, className: 'header-group-style1' }, { label: '16/05/2024 16:03:39', colspan: 2, className: 'header-group-style5' },
                     { label: 'ECO À REMPLIR', colspan: 12, className: 'header-group-style3' }, { label: 'AXE À REMPLIR', colspan: 6, className: 'header-group-style4' }],
                [
                    'date ajoutée', 'BMID', 'Nom du client', 'Raison du retour', 'BM Raison du retour', 'SKU', 'Nom du produit', 
                    'IMEI', 'Transporteur', 'Numéro de suivi', 'Customer Informed about non-compliance', 'Customer informed if locked?', 
                    'Refunded', 'Returned to SG', 'Date returned to SG', 'Waybill No.', 'Date de réception Axe', 'Contenu conforme ?', 
                    'IMEI de réception', 'État de l`appareil', 'Commentaires (Rayures ? Bosses ?)', 
                    'Lien Google pour les images (https://drive.google.com/drive/folders/1SNzn0LkNwHqi_IO4i-FcuWr7ytwRjS3D?usp=sharing)'
                ],
              ]
              const columns = [
                { type: 'date', dateFormat: 'DD/MM/YYYY' }, // date ajoutée
                { type: 'numeric' }, // BMID
                { type: 'text' }, // Nom du client
                { type: 'text' }, // Raison du retour
                { type: 'text' }, // BM Raison du retour
                { type: 'text' }, // SKU
                { type: 'text' }, // Nom du produit
                { type: 'text' }, // IMEI
                { type: 'text' }, // Transporteur
                { type: 'text' }, // Numéro de suivi
                { type: 'checkbox', className: 'htCenter htMiddle' }, // Customer Informed about non-compliance
                { type: 'checkbox', className: 'htCenter htMiddle' }, // Customer informed if locked?
                { type: 'checkbox', className: 'htCenter htMiddle' }, // Refunded
                { type: 'checkbox', className: 'htCenter htMiddle' }, // Returned to SG
                { type: 'date', dateFormat: 'MM/DD/YYYY' }, // Date returned to SG
                { type: 'numeric' }, // Waybill No.
                { type: 'date', dateFormat: 'DD/MM/YYYY' }, // Date de réception Axe
                { type: 'dropdown', source: ['', 'Yes', 'No', 'Standby'] }, // Contenu conforme?
                { type: 'text' }, // IMEI de réception
                { type: 'dropdown', source: ['', 'Unlocked', 'LOCKED', 'Standby'] }, // État de l`appareil
                { type: 'text' }, // Commentaires (Rayures ? Bosses ?)
                { type: 'text' }, // Lien Google pour les images
            ];

            const mappedData = data.map(row => [
                row.dateAjoutee,
                row.BMID,
                row.nomDuClient,
                row.raisonDuRetour,
                row.bmRaisonDuRetour,
                row.SKU,
                row.nomDuProduit,
                row.IMEI,
                row.transporteur,
                row.numeroDeSuivi,
                row.customerInformedAboutNonCompliance,
                row.customerInformedIfLocked,
                row.refunded,
                row.returnedToSG,
                row.dateReturnedToSG,
                row.waybillNo,
                row.dateDeReceptionAxe,
                row.contenuConforme,
                row.IMEIDeReception,
                row.etatDeLAppareil,
                row.commentaires,
                row.lienGooglePourLesImages
            ]);

            const hot = new Handsontable(hotElementRef.current, {
                data: mappedData,
                rowHeaders: true,
                colHeaders: true,
                nestedHeaders: nestedHeaders,
                customBorders: customBorders,
                columns: columns,
                contextMenu: true,
                dropdownMenu: true,
                licenseKey: 'non-commercial-and-evaluation',
                language: 'en-US',
                manualRowResize: true,
                manualColumnResize: true,
                colWidths: 120,

                afterChange: (changes, source) => {
                    console.log("source");
                    console.log(source);
                    if (source !== 'loadData' && changes) {
                        const updateRequests = changes.map(change => {
                            const updateData = {
                                rowIndex: change[0],
                                colIndex: change[1],
                                newValue: change[3] == null ? "" : change[3]
                            };
                            console.log(updateData);
                
                            return axios.post('http://localhost:3001/updateCell', updateData);
                        });
                
                        axios.all(updateRequests)
                            .then(axios.spread((...responses) => {
                                console.log('All cells updated successfully.');
                            }))
                            .catch(err => {
                                console.log('Error updating data:', err);
                            });
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
