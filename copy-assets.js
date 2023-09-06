const fs = require('fs');
const ncp = require('ncp').ncp;

// Create the destination directories
fs.mkdirSync('public/assets/rpg-awesome/fonts', { recursive: true });
fs.mkdirSync('public/assets/rpg-awesome/css', { recursive: true });

// Copy RPG Awesome assets
ncp('node_modules/rpg-awesome/fonts', 'public/assets/rpg-awesome/fonts', function (err) {
    if (err) {
        console.error('Error copying RPG Awesome fonts:', err);
    } else {
        console.log('RPG Awesome fonts copied successfully');
    }
});

ncp('node_modules/rpg-awesome/css', 'public/assets/rpg-awesome/css', function (err) {
    if (err) {
        console.error('Error copying RPG Awesome CSS:', err);
    } else {
        console.log('RPG Awesome CSS copied successfully');
    }
});
