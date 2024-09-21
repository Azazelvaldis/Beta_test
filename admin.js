// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQsD1jeOuVDe09jIqxTvSELTLLnzIGuOM",
    authDomain: "confessionapp-b1ab4.firebaseapp.com",
    databaseURL: "https://confessionapp-b1ab4.firebaseio.com",
    projectId: "confessionapp-b1ab4",
    storageBucket: "confessionapp-b1ab4.appspot.com",
    messagingSenderId: "786547259525",
    appId: "1:786547259525:web:1165a236d2c783d1cb91ec",
    measurementId: "G-8HJ36XDNGP"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to confession list in the HTML
const confessionList = document.getElementById('confessionList');

// Fetch and display confessions in real-time
database.ref('confessions').on('value', (snapshot) => {
    confessionList.innerHTML = '';  // Clear the current list
    snapshot.forEach((confessionSnapshot) => {
        const confessionData = confessionSnapshot.val();
        const confessionId = confessionSnapshot.key;

        const confessionItem = document.createElement('div');
        confessionItem.classList.add('confession-item');
        confessionItem.textContent = confessionData.text;

        // Add delete button for admin
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            deleteConfession(confessionId);
        });

        confessionItem.appendChild(deleteButton);
        confessionList.appendChild(confessionItem);
    });
});

// Function to delete a confession
function deleteConfession(confessionId) {
    const confirmation = confirm("Are you sure you want to delete this confession?");
    if (confirmation) {
        database.ref('confessions/' + confessionId).remove()
        .then(() => {
            alert("Confession deleted!");
        })
        .catch((error) => {
            console.error("Error deleting confession: ", error);
        });
    }
}
