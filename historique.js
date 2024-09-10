const browserHistory = require('node-browser-history');

browserHistory.getChromeHistory().then(history => {
  console.log('Historique de navigation Chrome:');
  console.log(history);
}).catch(error => {
  console.error('Une erreur s\'est produite:', error);
});

browserHistory.getFirefoxHistory().then(history => {
  console.log('Historique de navigation Firefox:');
  console.log(history);
}).catch(error => {
  console.error('Une erreur s\'est produite:', error);
});
