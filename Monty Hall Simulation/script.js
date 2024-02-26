let doors = [];
let chosenIndex;

function initialize() {
  // Reset doors
  doors = ['car', 'goat', 'goat'];

  // Shuffle doors
  for (let i = doors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doors[i], doors[j]] = [doors[j], doors[i]];
  }

  // Clear previous results and door content
  document.getElementById('result').innerText = '';
  const doorElements = document.querySelectorAll('.door');
  doorElements.forEach(door => {
    door.innerHTML = '';
    door.classList.remove('chosen', 'revealed');
    door.addEventListener('click', () => chooseDoor(door));
  });

  // Reset chosenIndex
  chosenIndex = undefined;
}

function chooseDoor(door) {
  if (!chosenIndex) {
    chosenIndex = parseInt(door.id.slice(-1)) - 1;
    door.classList.add('chosen');

    // Reveal a goat behind one of the unchosen doors
    const remainingDoors = doors.filter((_, index) => index !== chosenIndex);
    const goatIndex = remainingDoors.indexOf('goat');
    const revealedDoorIndex = remainingDoors.length === 2 ? goatIndex : Math.floor(Math.random() * 2);
    const revealedDoor = document.getElementById(`door${revealedDoorIndex + 1}`);
    revealedDoor.classList.add('revealed');
  }
}

function simulate() {
  if (chosenIndex === undefined) {
    alert('Please choose a door first!');
    return;
  }

  const change = confirm('Do you want to change your choice?');
  const finalChoice = change ? doors.filter((_, index) => index !== chosenIndex)[0] : doors[chosenIndex];

  const result = finalChoice === 'car' ? 'Congratulations! You won the car!' : 'Sorry, you got a goat.';
  document.getElementById('result').innerText = result;

  // Reveal all doors
  const doorElements = document.querySelectorAll('.door');
  doorElements.forEach(door => {
    const imgPath = doors[parseInt(door.id.slice(-1)) - 1] === 'car' ? 'car.jpeg' : 'goat.jpeg';
    door.innerHTML = `<img src="${imgPath}" alt="${doors[parseInt(door.id.slice(-1)) - 1]}" />`;
  });
}

// Initialize the simulation
initialize();
