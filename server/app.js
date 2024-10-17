const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});

// Catch-all route for handling 404 errors (i.e., unknown routes)
app.use((req, res, next) => {
  const error = new Error("Sorry, the requested resource couldn't be found.");
  error.statusCode = 404;
  next(error); // Pass the error to the error-handling middleware
});

// Error-handling middleware
app.use((err, req, res, next) => {
  // Log the error to the console
  console.error(err);

  // Extract status code from error or set default to 500
  const statusCode = err.statusCode || 500;

  // Respond with a JSON object containing the error message and status code
  res.status(statusCode).json({
    message: err.message,
    statusCode: statusCode
  });
});


const port = 5001;
app.listen(port, () => console.log('Server is listening on port', port));
