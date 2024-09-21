document.addEventListener('DOMContentLoaded', () => {
    const confessionList = document.getElementById('confessionList');
    
    function loadConfessions() {
        const confessions = JSON.parse(localStorage.getItem('confessions')) || [];
        confessionList.innerHTML = '';

        confessions.forEach((confession, index) => {
            const confessionItem = document.createElement('div');
            confessionItem.classList.add('confession-item');
            confessionItem.textContent = confession;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteConfession(index);
            });

            confessionItem.appendChild(deleteButton);
            confessionList.appendChild(confessionItem);
        });
    }

    function deleteConfession(index) {
        let confessions = JSON.parse(localStorage.getItem('confessions')) || [];
        confessions.splice(index, 1);
        localStorage.setItem('confessions', JSON.stringify(confessions));
        loadConfessions();
    }

    loadConfessions();
});
