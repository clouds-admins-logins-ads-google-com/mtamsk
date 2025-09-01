const express = require('express');
const ngrok = require("ngrok");
 const fs = require('fs');
 const path = require('path');
 const app = express();
 const PORT = 3000;
 let redirect = false;
 app.get('/', (req, res) => {
     redirect = true;
     res.setHeader('Cache-Control', 'no-store');
     res.redirect('/index1.html');
 });
 app.get('/index1.html', (req, res) => {
     res.setHeader('Cache-Control', 'no-store');
     if (redirect) {
         redirect = false;
         res.sendFile(path.join(__dirname, 'index1.html'));
     } else {
         res.redirect('/data');
     }
 });
app.get('/data', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
     <script>
    eval(atob("YWxlcnQoIkhlbGxvISBBbmRhIG1lbmdha2VzIC9kYXRhIik7"));
</script>
    `);
});
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // expose via ngrok
  const url = await ngrok.connect(PORT);
  console.log("Public URL:", url);
});