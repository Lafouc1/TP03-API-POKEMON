/**
* Serveur Backend Pokedex
*/
//console.log ("Hello World!");
// Définir l'emplacement des fichiers bases de données
const POKEDEX_SRC = "./DATA/pokedex.json";
// Définir l'emplacement des types
const TYPES_SRC = "./DATA/types.json";
// Définir l'emplacement des images
const IMAGES_SRC = "./FILES/images";
// Définir un port
const PORT = 5001;
// ************************************************
// Lancer un serveur express sur un port défini
const fs = require('fs');

// npm install express
const express = require('express');
const app = express();
// Lancement du serveur et attendre
app.listen(
 PORT,
 '172.16.196.1',
 () => {
 console.log('Server Pokedex is listening on ' + PORT);
 }
)

//Route tous les pokemons
app.get('/pokemon', (req, res) => {
  // Ouvrir le fichier
  fs.readFile(POKEDEX_SRC, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier:', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    // Renvoyer le contenu du fichier
    res.send(JSON.parse(data));
  });
});

//Route par ID du pokemon
app.get('/pokemon/:id', (req, res) => {
  const pokedex = JSON.parse(fs.readFileSync(POKEDEX_SRC, 'utf8'));
  const id = parseInt(req.params.id, 10);
  const pokemon = pokedex.find(p => p.id === id);

  //Ajout du lien vers l'image dans le JSON renvoyé
  if (pokemon) {
    pokemon.image = `${IMAGES_SRC}/${pokemon.id}.png`;
  }
  console.log(pokemon);

  res.send(pokemon);

});

//Route hasard
app.get('/hasard', (req, res) => {
  // Ouvrir le fichier
  fs.readFile(POKEDEX_SRC, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier:', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    // Renvoyer un pokémon au hasard
    const pokedex = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * pokedex.length);
    res.send(pokedex[randomIndex]);
  });
});

//Route par nom français du pokemon
app.get('/name/french/:name', (req, res) => {
  const pokedex = JSON.parse(fs.readFileSync(POKEDEX_SRC, 'utf8'));
  const name = req.params.name;
  const pokemon = pokedex.find(p => p.name.french === name);
  res.send(pokemon);
});

//Route par type du pokemon
app.get('/type/:type', (req, res) => {
  const pokedex = JSON.parse(fs.readFileSync(POKEDEX_SRC, 'utf8'));
  const types = JSON.parse(fs.readFileSync(TYPES_SRC, 'utf8'));
  const type = req.params.type;
  const typeInfo = types.find(t => t.english === type);
  if (!typeInfo) {
    res.status(404).send('Type not found');
    return;
  }
  const pokemon = pokedex.filter(p => p.type.includes(typeInfo.english));
  res.send(pokemon);
});

//Route pour tous les types
app.get('/types', (req, res) => {
  const types = JSON.parse(fs.readFileSync(TYPES_SRC, 'utf8'));
  res.send(types);
});
