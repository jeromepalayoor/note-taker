document.addEventListener('DOMContentLoaded', function() {
const noteInput = document.getElementById('noteInput');
const saveButton = document.getElementById('saveButton');
const notesList = document.getElementById('notesList');

// Load notes from local storage when the page loads
loadNotes();

// Event listener for the save button
saveButton.addEventListener('click', function() {
    const note = noteInput.value.trim();

    if (note !== '') {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteInput.value = '';
    loadNotes(); // Reload notes after saving
    } else {
    // nothing lol 
    }
});

// Function to load notes from local storage and display them
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = ''; // Clear previous notes
    notes.forEach(function(note, index) {
    const li = document.createElement('li');
    li.textContent = note;
    
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    
    // Add event listener to delete button
    deleteButton.addEventListener('click', function() {
        const confirmation = confirm('Are you sure you want to delete this note?');
        if (confirmation) {
        notes.splice(index, 1); // Remove note from array
        localStorage.setItem('notes', JSON.stringify(notes)); // Update local storage
        loadNotes(); // Reload notes after deletion
        }
    });
    
    li.appendChild(deleteButton);
    notesList.appendChild(li);
    });
}
});
  