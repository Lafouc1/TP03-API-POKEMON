## 1. Objectif du TP

Créer un **serveur backend NodeJS** qui expose une API de type Pokedex. Vous manipulerez des fichiers JSON pour répondre à différentes routes/vues, en utilisant ExpressJS.

---

## 2. Mise en place du projet

**Arborescence à respecter :**
```
BACKEND/
├── DATA/
│   ├── items.json
│   ├── moves.json
│   ├── pokedex.json
│   └── types.json
├── FILES/
│   ├── images/
│   ├── sprites/
│   └── thumbnails/
├── index.js
└── README.md
```

**Démarrer le dépôt git :**
```
git init
```

**Installer NodeJS, npm et Express :**
```
sudo apt install nodejs npm -y
npm install express
npm install -g nodemon
```

---

## 3. Lancer le serveur

```
// index.js
const express = require('express');
const fs = require('fs');
const app = express();

const POKEDEX_SRC = './DATA/pokedex.json';
const PORT = 5001;

app.listen(PORT, '127.0.0.1', () => {
  console.log('Server Pokedex is listening on ' + PORT);
});
```

Pour démarrer en mode monitoring :
```
nodemon index.js
```

---

## 4. Les routes à créer

### a) `/`  
**Affiche tous les pokémons**

- Lire le fichier `pokedex.json`
- Envoyer tout le contenu en réponse (809 pokémons)

### b) `/hasard`  
**Affiche un pokémon au hasard**

- Générer un nombre aléatoire entre min et max id
- Renvoyer le pokémon correspondant

**Questions à répondre :**
- Quel est l'ID minimum possible ?  
  → C'est l'ID du premier pokémon dans `pokedex.json`
- Quel est l'ID maximum possible ?  
  → C'est l'ID du dernier pokémon dans `pokedex.json`
- Quelle est la taille du pokédex ?  
  → C'est la longueur du tableau pokémons.

### c) `/pokemon/:id`  
**Affiche un pokémon par son identifiant**

- Récupérer l’ID depuis l’URL
- Chercher le pokémon avec cet ID dans le pokédex
- Renvoyer ce pokémon ou un message d'erreur si absent

### d) `/pokemon/:nom`
**Affiche un pokémon par son nom**

- Récupérer le nom depuis l’URL (paramètre texte)
- Chercher dans le pokédex le pokémon correspondant
- Renvoyer ce pokémon ou un message d'erreur si absent

---

## 5. Pour manipuler et lire le JSON en NodeJS

- Utiliser le module `fs` pour lire un fichier JSON
- Utiliser `JSON.parse()` pour transformer le texte lu en objet manipulable

```
const data = fs.readFileSync(POKEDEX_SRC, 'utf-8');
const pokedex = JSON.parse(data);
```

---

## 6. Pour générer un nombre aléatoire
```
const min = ... // à déterminer selon les IDs du pokédex
const max = ... // à déterminer selon les IDs du pokédex
const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
```

---

## 7. Conseils

- Utiliser Postman ou le navigateur pour tester vos endpoints.
- Commitez régulièrement !
- Documentez dans README.md !

---

## 8. Travail à faire ensuite

- Créer un dépôt distant GitHub
- Commit & push vers GitHub
- Cloner sur la VM distante
- Documenter le projet
- Éventuellement, créer le frontend !

---
```

Utilise et adapte ce modèle pour rédiger tes réponses ou la documentation demandée par le TP, en complétant les parties variables (IDs, tailles, etc.) selon ce que tu trouves dans `pokedex.json`, ou selon le code que tu écris !

[1](file:///X:/COURSNC/B2/03-Node/%F0%9F%9A%80%20TP%20-%2002.%20NodeJS%20-%20Serveur%20API%20Pokedex.pdf)