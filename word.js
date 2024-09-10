const officegen = require('officegen');
const fs = require('fs');

// Création d'un nouveau document Word
const docx = officegen('docx');

// Ajout d'un paragraphe avec le texte "Hello"
const paragraph = docx.createP();
paragraph.addText('Hello');

// Sauvegarde du document Word
const outputPath = 'output.docx';
const outputStream = fs.createWriteStream(outputPath);
docx.generate(outputStream);
outputStream.on('close', () => {
  console.log(`Le document Word avec le texte 'Hello' a été créé : ${outputPath}`);
});

// Ouvrir le document Word
const { exec } = require('child_process');
const wordExecutablePath = 'C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE';
const openWordCommand = `"${wordExecutablePath}" "${outputPath}"`;
exec(openWordCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Une erreur s'est produite : ${error.message}`);
    return;
  }
  console.log('Microsoft Word ouvert avec le document contenant le texte "Hello" !');
});
