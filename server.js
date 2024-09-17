const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/sih2024', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const committeeSchema = new mongoose.Schema({
    name: String,
    role: String,
    imageUrl: String,
});

const CommitteeMember = mongoose.model('CommitteeMember', committeeSchema);

app.get('/api/members', async (req, res) => {
    try {
        const members = await CommitteeMember.find();
        res.json(members);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/members', async (req, res) => {
    const newMember = new CommitteeMember(req.body);
    try {
        await newMember.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
