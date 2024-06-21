const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { connectToDb, getDb } = require('./database/database');
const { ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let db
let collection = 'principal'
connectToDb((err) => {
    if (!err) {
        const server = http.createServer(app);
        const io = socketIo(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });

        io.on('connection', (socket) => {
            console.log('A user connected hehe');

            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });

            socket.on('updateCell', async (data) => {
                console.log('Received updateCell event:', data);
                try {
                    const { rowIndex, colIndex, newValue } = data;

                    const skip = parseInt(rowIndex, 10) || 0;
                    const fieldIndex = parseInt(colIndex, 10);

                    const results = await db.collection(collection)
                        .find({})
                        .skip(skip)
                        .limit(1)
                        .toArray();

                    if (results.length === 0) {
                        console.error('No data found for the given rowIndex.');
                        return;
                    }

                    const rowData = results[0];
                    const values = Object.values(rowData);

                    if (fieldIndex < 0 || fieldIndex >= values.length) {
                        console.error('Invalid colIndex.');
                        return;
                    }

                    const keys = Object.keys(rowData);
                    const keyToUpdate = keys[fieldIndex + 1];
                    const updatedDocument = {
                        ...rowData,
                        [keyToUpdate]: newValue
                    };

                    await db.collection(collection).updateOne(
                        { _id: rowData._id },
                        { $set: { [keyToUpdate]: newValue } }
                    );

                    console.log(`Document with _id ${rowData._id} updated with ${keyToUpdate} successfully.`);

                    socket.broadcast.emit('cellUpdated', data);
                } catch (error) {
                    console.error('Error updating document:', error);
                }
            });
        });

        server.listen(3001, () => {
            console.log('Server is running on port 3001');
        });

        db = getDb();
    } else {
        console.error('Failed to connect to database:', err);
    }
});

app.get('/cellRows', (req, res) => {
    let cr = []
    db.collection(collection)
        .find()
        .forEach(r => cr.push(r))
        .then(() => {
            res.status(200).json(cr)
        })
        .catch(() => {
            res.status(500). json({error: 'Could not fetch Cell Rows documents'})
        })
})

app.get('/cellRows/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection(collection)
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch Cell Rows documents'})
        })
    } else {
        res.status(500).json({error: 'not a valid Cell Row id'})
    }
    
})


app.post('/postCellRow', (req, res) => {
    const cr = req.body;
    db.collection(collection)
    .insertOne(cr)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create a new Cell Row document'})

    })

})

app.post('/updateCellRow', (req, res) => {
    const { _id, field, value } = req.body;
    
    if (ObjectId.isValid(_id)) {
        db.collection(collection)
            .updateOne({ _id: new ObjectId(_id) }, { $set: { [field]: value } })
            .then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: 'Document updated successfully' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the document', details: err });
            });
    } else {
        res.status(400).json({ error: 'Invalid document ID' });
    }
});

app.put('/updateCellValue/:id', (req, res) => {
    const { id } = req.params;
    const { field, value } = req.body;

    if (ObjectId.isValid(id)) {
        const updateQuery = { $set: {} };
        updateQuery.$set[field] = value;

        db.collection(collection)
            .updateOne({ _id: new ObjectId(id) }, updateQuery)
            .then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: `Field ${field} updated successfully` });
                } else {
                    res.status(404).json({ error: 'Document not found' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the field', details: err });
            });
    } else {
        res.status(400).json({ error: 'Invalid document ID' });
    }
});

app.get('/getCell/:rowIndex/:colIndex', async (req, res) => {
    try {
        const { rowIndex, colIndex } = req.params;
        const skip = parseInt(rowIndex, 10) || 0;
        const fieldIndex = parseInt(colIndex, 10);

        const results = await db.collection(collection)
            .find({})
            .skip(skip)
            .limit(1)
            .toArray();

        if (results.length === 0) {
            return res.status(404).json({ error: 'No data found for the given rowIndex.' });
        }

        const rowData = results[0];
        const values = Object.values(rowData);
        
        if (fieldIndex < 0 || fieldIndex >= values.length) {
            return res.status(400).json({ error: 'Invalid colIndex.' });
        }

        const fieldValue = values[fieldIndex + 1];

        console.log('Field value:', fieldValue);
        res.status(200).json({ value: fieldValue });
    } catch (error) {
        console.error('Error fetching cell data:', error);
        res.status(500).json({ error: 'An error occurred while fetching cell data.' });
    }
});

app.post('/updateCell', async (req, res) => {
    try {
        const { rowIndex, colIndex, newValue } = req.body;

        const skip = parseInt(rowIndex, 10) || 0;
        const fieldIndex = parseInt(colIndex, 10);

        const results = await db.collection(collection)
            .find({})
            .skip(skip)
            .limit(1)
            .toArray();

        if (results.length === 0) {
            return res.status(404).json({ error: 'No data found for the given rowIndex.' });
        }

        const rowData = results[0];
        const values = Object.values(rowData);

        if (fieldIndex < 0 || fieldIndex >= values.length) {
            return res.status(400).json({ error: 'Invalid colIndex.' });
        }

        const keys = Object.keys(rowData);
        const keyToUpdate = keys[fieldIndex + 1];
        const updatedDocument = {
            ...rowData,
            [keyToUpdate]: newValue
        };

        await db.collection(collection).updateOne(
            { _id: rowData._id },
            { $set: updatedDocument }
        );

        console.log(`Document with _id ${rowData._id} updated with ${keyToUpdate} successfully.`);
        res.status(200).json({ message: 'Cell updated successfully.' });
    } catch (error) {
        console.error('Error updating cell data:', error);
        res.status(500).json({ error: 'An error occurred while updating cell data.' });
    }
});

app.get('/BMID/:bmid', async (req, res) => {
    try {
        const bmid = req.params.bmid;        
        const records = await db.collection(collection).find({ BMID: bmid }).toArray();
        const length = records.length;
        
        if (records.length > 0) {
            res.status(200).json(length);
        } else {
            res.status(404).json({ message: 'No documents found with the given BMID' });
        }
    } catch (error) {
        console.error('Error fetching documents by BMID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});