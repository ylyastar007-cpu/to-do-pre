let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedItems = localStorage.getItem('to-do');
	if (savedItems) {
		return JSON.parse(savedItems);
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  	textElement.textContent = item;
	deleteButton.addEventListener('click', function() {
		clone.remove();
		items = getTasksFromDOM();
		saveTasks(items);
	});
	duplicateButton.addEventListener('click', function() {
		const itemName = textElement.textContent ;
		const newItem = createItem(item);
		listElement.prepend(newItem);
		items = getTasksFromDOM();
		saveTasks(items);
	});
	editButton.addEventListener('click', function() {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});
	textElement.addEventListener('blur', function() {
		textElement.removeAttribute('contenteditable');
		items = getTasksFromDOM();
		saveTasks(items);
	});
	return clone;
}

items = loadTasks();
items.forEach(item => listElement.append(createItem(item)));

formElement.addEventListener('submit', function(evnt) {
	evnt.preventDefault();
	const item = inputElement.value.trim();
	if (item) {
		const taskElements = createItem(item);
		listElement.prepend(taskElements);
		items = getTasksFromDOM();
		saveTasks(items);
		inputElement.value = '';
	};
});

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	let tasks = [];
	itemsNamesElements.forEach(function(element) {
		tasks.push(element.textContent);
	});
	return tasks;
};

function saveTasks(tasks) {
	localStorage.setItem('to-do', JSON.stringify(tasks));	
}
