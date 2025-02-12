const fs = require('fs');
const path = require('path');

const nojekyllPath = path.join(__dirname, 'out', '.nojekyll');

fs.writeFile(nojekyllPath, '', (err) => {
  if (err) {
    console.error('Error creating .nojekyll file:', err);
  } else {
    console.log('.nojekyll file created successfully.');
  }
}); 