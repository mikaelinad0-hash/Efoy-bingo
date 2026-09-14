const express = require('express');
const admin = require('firebase-admin');
const app = express();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://efoy-bingo-default-rtdb.firebaseio.com"
  });
}

const db = admin.database();
let timer = null;
let availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1);

function startGameLoop(gameId) {
  if (timer) clearInterval(timer);

  timer = setInterval(async () => {
    if (availableNumbers.length === 0) {
      clearInterval(timer);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const nextCall = availableNumbers.splice(randomIndex, 1)[0];

    const gameRef = db.ref(`games/${gameId}`);
    const snapshot = await gameRef.once('value');
    const gameData = snapshot.val() || {};
    const calledNumbers = gameData.calledNumbers || [];
    calledNumbers.push(nextCall);

    await gameRef.update({
      currentCall: nextCall,
      calledNumbers: calledNumbers,
      status: "PLAYING"
    });
  }, 4000);
}

app.get('/', (req, res) => res.send('Efoy Bingo Server Running!'));

app.get('/start-game', (req, res) => {
  availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
  startGameLoop('game_PS9731');
  res.send('Game Started!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
