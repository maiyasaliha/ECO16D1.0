const columnHeaders = 
    [
        'List of Orders Non-Compliant or Standby but Customer not Informed', 
        'List of Orders LOCKED but Customer not Informed', 
        'List of Orders Compliant, with IMEI and Unlocked but Customer not refunded and does not contain the term "OOW" in PRINCIPALE', 
        'List of iPhones that are received by Axe but not returned to SG. Column M + Column U in ECO = Column G in ECO', 
        'List of Samsung Phones that are received by Axe with case insensitive issues listed such as "Screen", "LCD", "Auto", "Dead" but not returned to SG', 
        'List of Samsung Phones that are received by Axe with case insensitive issues listed such as "Screen", "LCD", "Auto", "Dead" but not returned to SG with IMEI MATCHING in Column H and Column S in PRINCIPALE and does not contain the term "OOW" in PRINCIPALE', 
        'List of iPhones that are received by Axe but not returned to SG with wrong IMEI whereby Column H does not match Column S in PRINCIPALE', 
        'Formula to Check Devices waiting for customer/Yuqi to be refunded', 
        'List of Samsung Phones that are received by Axe with SKU beginning with KS23 but not returned to SG', 
        'List of Samsung Phones that are received by Axe with SKU beginning with KS23 but not returned to SG with IMEI MATCHING in Column H and Column S in PRINCIPALE and does not contain the term "OOW" in PRINCIPALE', 
        'List of iPhones that are received by Axe but not returned to SG with IMEI matching in column H and Column S in PRINCIPALE and does not contain the term "OOW" in PRINCIPALE', 
        'List of Any Order that contain OOW at Column D in PRINCIPALE without any data in Column O or Column P which could suggest it was returned or a case handled', 
    ]

const columns = [
    { type: 'text' },
    { type: 'text' },
    { type: 'text' },
    { type: 'text' },
    { type: 'text' },
    { type: 'text' },
    { type: 'text' },
    { type: 'text' },
    { type: 'text' },
    { type: 'text' },
    { type: 'text' },
    { type: 'text' }
];

export {columnHeaders, columns};