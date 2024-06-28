const nestedHeaders = [
    [
        { label: 'le vert suggère que le numéro de commande existe déjà dans la page principale', colspan: 4 }, 
    ],
    [
        { label: 'le rouge suggère un identifiant de commande incorrect de plus de 8 caractères', colspan: 4 },
    ],
    [
        { label: 'orange suggère un doublon', colspan: 4 },
    ],
    [
        { label: 'AXE', colspan: 3 },
        { label: 'ECO', colspan: 1 },

    ],
    [
        'date créée', 'BMID', 'Nom du client', 'INFORMATIONS CRÉÉES SUR LA PAGE PRINCIPALE'
    ],
];
const columns = [
    { type: 'date', dateFormat: 'DD/MM/YYYY' }, // date ajoutée
    { type: 'text' }, // BMID
    { type: 'text' }, // Nom du client
    { type: 'checkbox', className: 'htCenter htMiddle' }, // INFORMATIONS CRÉÉES SUR LA PAGE PRINCIPALE
];

export {nestedHeaders, columns};