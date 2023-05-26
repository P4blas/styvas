
let items = document.querySelectorAll('.item');
let vipList = document.getElementById('vip-list');

loadPositions();

items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragover', dragOver);
  item.addEventListener('drop', drop);
  item.addEventListener('dragend', savePositions); 
});

let draggedItem = null;

function dragStart(event) {
  draggedItem = this;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', this.innerHTML);
}

function dragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function drop(event) {
  event.preventDefault();
  if (draggedItem !== this) {
    draggedItem.innerHTML = this.innerHTML;
    this.innerHTML = event.dataTransfer.getData('text/html');
  }
}

function savePositions() {
  let positions = Array.from(items).map(item => item.innerHTML);
  localStorage.setItem('vipListPositions', JSON.stringify(positions));
}

function loadPositions() {
  let positions = JSON.parse(localStorage.getItem('vipListPositions'));
  if (positions) {
    items.forEach((item, index) => {
      item.innerHTML = positions[index];
    });
  }
}

function exportFile() {
    const positions = Array.from(items).map(item => item.innerHTML);
    const fileContent = positions.join('\n');
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vip_positions.txt';
    link.click();
}

function handleFileLoad(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const positions = event.target.result.split('\n');
      items.forEach((item, index) => {
        item.innerHTML = positions[index];
      });
      savePositions();
    };
  
    reader.readAsText(file);
    fileInput.value = '';
}

let fileInput = document.getElementById('input');
fileInput.addEventListener('change', handleFileLoad);

function fullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
}