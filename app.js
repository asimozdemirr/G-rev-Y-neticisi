// LocalStorage'dan görevleri çek veya boş liste başlat
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        // Görev tamamlandıysa yeşil ve üzeri çizili tasarım
        li.className = `flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border ${task.completed ? 'border-green-200 bg-green-50' : 'border-gray-100'}`;
        
        li.innerHTML = `
            <div class="flex items-center gap-3 overflow-hidden">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})" class="w-6 h-6 rounded text-blue-600 focus:ring-blue-500">
                <span class="${task.completed ? 'line-through text-gray-400' : 'text-gray-700'} truncate font-medium text-lg">${task.text}</span>
            </div>
            <button onclick="deleteTask(${index})" class="text-red-500 font-semibold p-2 rounded-lg">
                Sil
            </button>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text) {
        tasks.push({ text: text, completed: false });
        input.value = '';
        saveTasks();
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Klavyeden "Git/Enter" tuşuna basıldığında da görev eklensin
document.getElementById('taskInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Sayfa açıldığında görevleri ekrana bas
document.addEventListener('DOMContentLoaded', renderTasks);
