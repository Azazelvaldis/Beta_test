// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQsD1jeOuVDe09jIqxTvSELTLLnzIGuOM",
    authDomain: "confessionapp-b1ab4.firebaseapp.com",
    databaseURL: "https://confessionapp-b1ab4.firebaseio.com",
    projectId: "confessionapp-b1ab4",
    storageBucket: "confessionapp-b1ab4.appspot.com",
    messagingSenderId: "786547259525",
    appId: "Y1:786547259525:web:1165a236d2c783d1cb91ec",
    measurementId: "G-8HJ36XDNGP"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Handle form submission
const confessionForm = document.getElementById('confessionForm');
const confessionInput = document.getElementById('confessionInput');

confessionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const confessionText = confessionInput.value.trim();
    if (confessionText !== "") {
        // Save confession to Firebase
        database.ref('confessions').push({
            text: confessionText,
            timestamp: new Date().toISOString()
        });

        confessionInput.value = "";  // Clear input after submission
        alert('Confession submitted!');
    }
});

// Fetch and display confessions for admin
const confessionList = document.getElementById('confessionList');

database.ref('confessions').on('value', (snapshot) => {
    confessionList.innerHTML = '';  // Clear the current list
    snapshot.forEach((confessionSnapshot) => {
        const confessionData = confessionSnapshot.val();
        const confessionItem = document.createElement('div');
        confessionItem.textContent = confessionData.text;

        // Optionally, add a delete button for each confession
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            confessionSnapshot.ref.remove();
        });

        confessionItem.appendChild(deleteButton);
        confessionList.appendChild(confessionItem);
    });
});
