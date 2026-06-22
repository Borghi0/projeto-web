const admForm = document.getElementById('adm-form');
const admName = document.getElementById('adm-name');
const admEmail = document.getElementById('adm-email');
const btnClear = document.getElementById('btn-clear');
const btnClearAll = document.getElementById('btn-clear-all');
const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const STORAGE_KEY = 'usuarios_adm';

function getStoredUsers() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function renderList(usersToRender = null) {
    const users = usersToRender !== null ? usersToRender : getStoredUsers();

    userList.innerHTML = '';

    users.forEach((user, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <div>
                <strong>[${user.date}]</strong> ${user.name} (${user.email})
            </div>
            <button class="btn-delete-item" onclick="deleteUser(${index})">Excluir</button>
        `;
        
        userList.appendChild(li);
    });
}

admForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameValue = admName.value.trim();
    const emailValue = admEmail.value.trim();
    
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR');

    const newUser = {
        name: nameValue,
        email: emailValue,
        date: formattedDate
    };

    const currentUsers = getStoredUsers();
    currentUsers.push(newUser);

    saveUsers(currentUsers);
    renderList();

    admForm.reset();
});

window.deleteUser = function(index) {
    const confirmDelete = confirm("Tem certeza de que deseja excluir este usuário?");
    if (confirmDelete) {
        const currentUsers = getStoredUsers();
        currentUsers.splice(index, 1);
        
        saveUsers(currentUsers);
        renderList();
    }
};

btnClearAll.addEventListener('click', function() {
    const currentUsers = getStoredUsers();
    
    if (currentUsers.length === 0) {
        alert("A lista já está vazia.");
        return;
    }

    const confirmAll = confirm("Atenção! Deseja realmente deletar TODOS os usuários cadastrados?");
    if (confirmAll) {
        localStorage.removeItem(STORAGE_KEY);
        renderList();
    }
});

searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const allUsers = getStoredUsers();

    const filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm)
    );

    renderList(filteredUsers);
});

btnClear.addEventListener('click', function() {
    admForm.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    renderList();
});