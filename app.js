const spellSlotsData = {};

function logGeneratedHTML() {
  const monstersContainer = document.getElementById("monstersContainer");
  const monsterBoxes = monstersContainer.querySelectorAll(".monster-box");

  monsterBoxes.forEach((monsterBox, index) => {
    console.log(`Monster ${index + 1} Box:`, monsterBox.innerHTML);
    const spellSlotsContainer = monsterBox.querySelector(`#spellSlotsContainer_${index + 1}`);
    console.log(`Monster ${index + 1} Spell Slots:`, spellSlotsContainer.innerHTML);
  });
}


function generateSpellSlotLevels(index) {
  let spellSlotLevels = "";

  for (let level = 1; level <= 9; level++) {
    const spellSlotAmount = spellSlotsData[`${index}-${level}`] || 0;
    spellSlotLevels += `
      <div>
        <span class="spell-slot-level">Spell Slots Level ${level}:</span>
        <input class="monster_input_spell_amount" type="number" id="spellSlotAmount_${index}_${level}" min="0" max="9" step="1" data-monster-index="${index}" data-spell-slot-level="${level}" onchange="updateSpellSlotAmount(${index}, ${level}, this.value)" value="${spellSlotAmount}">
        <div class="spell-slots" id="spellSlotsContainer_${index}_${level}">
          ${generateSpellSlots(index, level, spellSlotAmount)}
        </div>
      </div>
    `;
  }

  return spellSlotLevels;
}

function createMonsterBox(index) {
  const monsterBox = document.createElement("div");
  monsterBox.className = "monster-box";
  monsterBox.innerHTML = `
    <h2 class="monster-name" data-monster-index="${index}" onclick="renameMonster(${index})">Monster ${index}</h2>
    ${generateSpellSlotLevels(index)}
  `;
  return monsterBox;
}

function generateSpellSlots(index, level, slots) {
  let spellSlots = "";
  const maxSlotsToShow = 9;
  const slotsToShow = Math.min(maxSlotsToShow, slots);

  for (let i = 1; i <= maxSlotsToShow; i++) {
    const usedClass = i <= slotsToShow ? "used" : "hidden";
    spellSlots += `<img class="spell-slot ${usedClass}" src="assets/Regular Circle.png" data-monster-index="${index}" data-spell-slot-level="${level}" data-spell-slot="${i}" onclick="toggleSpellSlot(${index}, ${level}, ${i})">`;
  }

  return spellSlots;
}

function updateSpellSlotAmount(index, level, amount) {
  spellSlotsData[`${index}-${level}`] = parseInt(amount);
  const spellSlotsContainer = document.querySelector(`#spellSlotsContainer_${index}_${level}`);
  spellSlotsContainer.innerHTML = generateSpellSlots(index, level, amount);
}

function toggleSpellSlot(index, level, slot) {
  const spellSlot = document.querySelector(`#spellSlotsContainer_${index}_${level} img[data-spell-slot-level="${level}"][data-spell-slot="${slot}"]`);

  if (spellSlot) {
    if (spellSlot.classList.contains("used")) {
      // Toggle to empty spell slot image
      spellSlot.src = "assets/Circle.png";
      spellSlot.classList.remove("used");
    } else {
      // Toggle to used spell slot image
      spellSlot.src = "assets/Regular Circle.png";
      spellSlot.classList.add("used");
    }

    // Update spellSlotsData immediately
    spellSlotsData[`${index}-${level}`] = document.querySelectorAll(`#spellSlotsContainer_${index}_${level} img.used`).length;
    const spellSlotAmountInput = document.getElementById(`spellSlotAmount_${index}_${level}`);
    spellSlotAmountInput.value = spellSlotsData[`${index}-${level}`];
  } else {
    console.log("Spell slot not found!");
  }
}


function renameMonster(index) {
  const monsterName = document.querySelector(`h2[data-monster-index="${index}"]`);
  monsterName.contentEditable = true;
  monsterName.focus();

  // Save the updated name when Enter key is pressed or focus is lost
  monsterName.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      monsterName.contentEditable = false;
    }
  });

  monsterName.addEventListener("blur", function() {
    monsterName.contentEditable = false;
  });
}

function createMonsters() {
  const monsterCountInput = document.getElementById("monsterCount");
  let monsterCount = parseInt(monsterCountInput.value);

  // Check if the input is empty or not a number
  if (isNaN(monsterCount) || monsterCount <= 0) {
    monsterCount = 1; // Set default value to 1 if input is empty or not a valid number
  }

  const monstersContainer = document.getElementById("monstersContainer");
  monstersContainer.innerHTML = "";

  for (let i = 1; i <= monsterCount; i++) {
    const monsterBox = createMonsterBox(i);
    monstersContainer.appendChild(monsterBox);
  }
}

document.addEventListener("change", function(event) {
  if (event.target.matches('input[type="checkbox"]')) {
    const checkbox = event.target;
    const monsterIndex = checkbox.getAttribute("data-monster-index");
    const spellSlotsInput = document.getElementById(`spellSlots_${monsterIndex}`);
    const spellSlots = parseInt(spellSlotsInput.value);

    if (!Number.isInteger(spellSlots) || spellSlots < 0) {
      alert("Please enter a valid number of spell slots (>= 0).");
      checkbox.checked = false;
      return;
    }

    const checkboxContainer = document.getElementById(`checkboxContainer_${monsterIndex}`);
    checkboxContainer.innerHTML = "";

    for (let i = 1; i <= spellSlots; i++) {
      const checkboxLabel = document.createElement("label");
      checkboxLabel.innerHTML = `
        <input type="checkbox" data-monster-index="${monsterIndex}" data-spell-slot="${i}">
        Spell Slot ${i}
      `;
      checkboxContainer.appendChild(checkboxLabel);
    }
  }
});

// This event listener will execute the createMonsters function with a default value of 1 when the page loads.
document.addEventListener("DOMContentLoaded", function() {
  createMonsters(1); // Call createMonsters with 1 as the default value
});