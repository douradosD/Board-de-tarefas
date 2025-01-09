document.addEventListener('DOMContentLoaded', () => {
    // Elementos iniciais
    const mainSection = document.querySelector('main');
    const initialButton = document.querySelector('button');

    // Criar container da lista de tarefas
    const taskListContainer = document.createElement('div');
    taskListContainer.classList.add('task-list-container');
    taskListContainer.style.display = 'none';
    mainSection.appendChild(taskListContainer);

    // Criar input para novas tarefas
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Digite uma nova tarefa...';
    taskInput.classList.add('taskinput')
   
    taskListContainer.appendChild(taskInput);

    // Criar lista de tarefas
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');
    taskListContainer.appendChild(taskList);

    // Carregar tarefas do localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Função para renderizar tarefas
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
           

            // Checkbox para marcar como concluída
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
           
            checkbox.classList.add('custom-checkbox')

            // Texto da tarefa
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.style.textDecoration = task.completed ? 'line-through' : 'none';

            // Adicionar elementos à tarefa
            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            taskList.appendChild(taskItem);

            // Evento para marcar/desmarcar tarefa
            checkbox.addEventListener('change', () => {
                tasks[index].completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });
        });
    }

    // Função para salvar tarefas
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Evento do botão inicial
    initialButton.addEventListener('click', () => {
        taskListContainer.style.display =
            taskListContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Evento para adicionar nova tarefa
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && taskInput.value.trim()) {
            // Adicionar nova tarefa
            tasks.push({
                text: taskInput.value.trim(),
                completed: false
            });

            // Limpar input e atualizar lista
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    // Renderizar tarefas iniciais
    renderTasks();
});