const NodeWebcam = require('node-webcam');

// Définir les options de la webcam
const options = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: false,
  output: "jpeg",
  device: false,
  callbackReturn: "location",
  verbose: false
};

// Créer une instance de webcam
const Webcam = NodeWebcam.create(options);

// Prendre une photo et enregistrer l'image
Webcam.capture("photo", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Photo prise avec succès. Emplacement : " + data);
  }
});
