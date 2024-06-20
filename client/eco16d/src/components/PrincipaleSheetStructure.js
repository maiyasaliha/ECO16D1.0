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
];
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

function getColorClassForDd(value) {
    switch (value) {
        case 'Yes':
            return 'custom-cell-green';
        case 'No':
            return 'custom-cell-red';
        case 'Unlocked':
            return 'custom-cell-green';
        case 'LOCKED':
            return 'custom-cell-red';
        case 'Standby':
            return 'custom-cell-cream';
        default:
            return '';
    }
}

function getColorClassForCb(value) {
    switch (value) {
        case 'TRUE':
            return 'custom-cell-true';
        case true:
            return 'custom-cell-true';
        case 'FALSE':
            return 'custom-cell-false';
        case false:
            return 'custom-cell-false';
        default:
            return '';
    }
}

export {nestedHeaders, columns, getColorClassForCb, getColorClassForDd};