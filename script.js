const correctSequence = ['1', '5', '3', '6', '2', '4'];
let clickedSequence = [];

document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', () => {
    if (tile.classList.contains('clicked')) return;

    tile.classList.add('clicked');
    clickedSequence.push(tile.dataset.index);

    if (clickedSequence.length === 6) {
      if (arraysEqual(clickedSequence, correctSequence)) {
        showSplash(true);
      } else {
        triggerWiggle();
      }
    }
  });
});

function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
}

function showSplash(success) {
  const splash = document.createElement('div');
  splash.id = 'splash';
  splash.innerHTML = success
    ? `
      <div class="splash-inner">
        <h2>🎉 Correct!</h2>
        <p>Password: <strong>constant</strong></p>
        <p><em>Click anywhere to reset.</em></p>
      </div>`
    : `
      <div class="splash-inner">
        <h2>❌ Incorrect</h2>
        <p>Try again.</p>
        <p><em>Click anywhere to reset.</em></p>
      </div>`;

  splash.addEventListener('click', () => {
    splash.remove();
    resetTiles();
  });

  document.body.appendChild(splash);
}

function triggerWiggle() {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => tile.classList.add('wiggle'));

  setTimeout(() => {
    tiles.forEach(tile => tile.classList.remove('wiggle'));
    resetTiles();
  }, 600);
}

function resetTiles() {
  clickedSequence = [];
  document.querySelectorAll('.tile').forEach(tile => {
    tile.classList.remove('clicked');
  });
}
