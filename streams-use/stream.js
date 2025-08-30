const fs = require('fs');

// Create a readable stream from a file
const readableStream = fs.createReadStream('input.txt', 'utf8');
// Create a writable stream to a file
const writableStream = fs.createWriteStream('output.txt');

// Pipe the data from readable to writable stream
readableStream.pipe(writableStream);

// Handle completion and errors
writableStream.on('finish', () => {
  console.log('File copy completed!');
});

readableStream.on('error', (err) => {
  console.error('Error reading file:', err);
});

writableStream.on('error', (err) => {
  console.error('Error writing file:', err);
});