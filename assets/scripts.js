const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER STRONG ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER HEAL';
const LOG_GAME_OVER = 'GAME OVER';
const SPECIAL_COOLDOWN = 2;
let roundCounter = 0;
//hardcode string values of normal and strong attack later.

const enteredHealthValue = parseInt(
  prompt('Choose maximum life for the player and the beast', '100')
);

let chosenMaxLife = enteredHealthValue;
let battleLog = [];

//Find how to throw the alert for user inputs containing both numbers and letters.
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  alert("It's alright, I'm here to help!");
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry;
  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: 'MONSTER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: 'MONSTER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_PLAYER_HEAL) {
    logEntry = {
      event: event,
      value: value,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_GAME_OVER) {
    logEntry = {
      event: event,
      value: value,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  }
  battleLog.push(logEntry);
  
  const logList = document.getElementById('log-list');

  const listItem = document.createElement('li');
  listItem.textContent = `Event: ${logEntry.event}, Value: ${
    logEntry.value
  }, Target: ${logEntry.target}, Monster Health: ${
    logEntry.finalMonsterHealth
  }, Player Health: ${logEntry.finalPlayerHealth}`;

  logList.appendChild(listItem);

}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
    writeToLog(
      LOG_GAME_OVER,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
    writeToLog(
      LOG_GAME_OVER,
      'THE BEAST WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth < 0) {
    alert('You have a draw!');
    writeToLog(
      LOG_GAME_OVER,
      'DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(type) {
  let maxDamage;
  let logEvent;
  if (type === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (type === 'STRONG ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // (roundCounter - SPECIAL_COOLDOWN <= 2) {
    //strongAttackBtn.disabled = true;
    // } else {
    //   alert('You can only perform a strong attack once every two rounds.');
    //   //strongAttackBtn.disabled = false;
    //   return;
    // }
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
  //roundCounter++; // Increment roundCounter after each action
}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG ATTACK');
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    //&& roundCounter - SPECIAL_COOLDOWN <= 2)
    healValue = chosenMaxLife - currentPlayerHealth;
    //healBtn.disabled = false;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  //healBtn.disabled = true;
  writeToLog(
    LOG_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler(){
  logContainer.classList.toggle('hidden');
}

// function printLogHandler() {
 
//   if(logContainer.classList.contains('hidden')) {
//     logContainer.innerHTML = '';
//     const logList = document.createElement('ol');
//     battleLog.forEach((logEntry, index) => {
//       const listItem = document.createElement('li');
//       listItem.textContent = `${index + 1}. Event: ${logEntry.event}, Value: ${
//         logEntry.value
//       }, Target: ${logEntry.value}, Monster Health: ${
//         logEntry.finalMonsterHealth
//       }, Player Health ${logEntry.finalPlayerHealth}`;
//       logList.appendChild(listItem);
//       logContainer.classList.remove('hidden');
//     });
//     logContainer.appendChild(logList); 
//   }else {
//     logContainer.classList.add('hidden');
//   }
// }


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
