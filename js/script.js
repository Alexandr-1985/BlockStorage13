"user strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

//создаем массив в виде объекта
const toDoData = [
    /*{
text: "Сварить кофе",
completed: false,
},
{
text: "Помыть посуду",
completed: true,
},*/
];

const showText = () => {
    toDoData.text.textContent = localStorage.getItem("text");
};

//ф-я для отрисовки перебором данный массив
const render = () => {
    //отчищаем списки
    todoCompleted.innerHTML = "";
    todoList.innerHTML = "";

    // console.log(toDoData);
    toDoData.forEach = (item, index) => {
        //console.log(item);
        //создаем элемент li
        const li = document.createElement("li");
        //даем класс todo- item
        li.classList.add("todo - item");

        //вставляем верстку в ТЕГ li
        li.innerHTML =
            '<span class="text-todo">' +
            item.text +
            "</span>" +
            '<div class = "todo-buttons">' +
            '<button class = "todo-remove"></button>' +
            '<button class = "todo-complete"></button>' +
            "</div>";

        //    console.log(li);
        //делаем проверку на true false для разделения на разделы
        if (item.comleted) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        /*  //добавляем элементы в список
//todoList.append(li); 
*/
        //кнопка выполнения задачи кликая по галочке, находим сначала
        li.querySelector(".todo-complete").addEventListener("click", () => {
            item.comleted = !item.comleted;
            addToLocalStorage(toDoData);
            render();
        });

        li.querySelector("todo-remove").addEventListener("click", () => {
            toDoData.splice(index, 1);
            addToLocalStorage(toDoData);
            showText();
            render();
        });
    };
};

//submit - событие каждой формы
todoControl.addEventListener("submit", (event) => {
    event.preventDefault();

    const checkValue = headerInput.value.trim();
    //создаем новы newToDo при submit, куда будут сохранять данные
    if (checkValue !== "") {
        const newToDo = {
            text: checkValue,
            comleted: false,
        };

        toDoData.push(newToDo);
        addToLocalStorage(toDoData);
        headerInput.value = "";

        render();
    }
});

const addToLocalStorage = () => {
    localStorage.setItem("toDoData", JSON.stringify(toDoData));
    render();
};

const getFromLocalStorage = () => {
    const reference = localStorage.getItem("toDoData");
    if (reference) {
        toDoData = JSON.parse(reference);
        render();
    }
};

getFromLocalStorage();