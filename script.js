document.addEventListener('DOMContentLoaded', () => {
    const confessionForm = document.getElementById('confessionForm');
    const confessionInput = document.getElementById('confessionInput');

    confessionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const confessionText = confessionInput.value.trim();
        if (confessionText !== "") {
            // Save confessions in local storage (or send to a server if needed)
            saveConfession(confessionText);

            // Clear the input
            confessionInput.value = "";
            alert('Confession submitted successfully!');
        }
    });

    function saveConfession(confession) {
        let confessions = JSON.parse(localStorage.getItem('confessions')) || [];
        confessions.push(confession);
        localStorage.setItem('confessions', JSON.stringify(confessions));
    }
});
