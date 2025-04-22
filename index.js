const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from GitHub Actions Demo!' });
});

// Only start the server if this file is run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
