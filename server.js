const express = require('express');
const path = require('path');
const app = express();

// Static ፋይሎችን (admin.html, index.html ወዘተ) ለማስተናገድ
app.use(express.static(path.join(__dirname)));

// /admin ሲባል admin.html ን እንዲከፍት
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// ለሌሎች የroute ጥሪዎች index.html እንዲከፈት
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
