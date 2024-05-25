//selector
const inputTask = document.querySelector("#inputTask");
const addTaskList = document.querySelector("#addTaskList");
const listGroup = document.querySelector("#listGroup");
const taskTotal = document.querySelector("#taskTotal");
const taskDoneTotal = document.querySelector("#taskDoneTotal");


//process
const addList = () => {
    // console.log(inputTask.value);
    // mount to to document
    listGroup.append(createNewList(inputTask.value));
    inputTask.value = null;
    updateTaskTotal();
}

const updateTaskTotal = () => {
    const lists = document.querySelectorAll(".list");
    taskTotal.innerText = lists.length;
}

const updateDoneTaskTotal = () => {
    const lists = document.querySelectorAll(".list input:checked");
    taskDoneTotal.innerText = lists.length;
}

// create list
const createNewList = (currentValue) => {
    const list = document.createElement("div");
    list.classList.add("list");
    // console.log(list);
    list.innerHTML = `
    <div class="flex justify-between items-center mt-5 border border-stone-950 p-4">
        <div class="flex gap-3 justify-center items-center">
            <input type="checkbox" class="list-done-check">
            <p class="font-mono line-task">${currentValue}</p>
        </div>
        <div>
            <button class="border border-stone-900 p-2 edit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
            <button class="border border-stone-900 p-2 del-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
        </div>
    </div>
    `;
    const listDoneCheck = list.querySelector(".list-done-check");
    const lineTask = list.querySelector(".line-task");
    
    listDoneCheck.addEventListener("change",() => {
        updateDoneTaskTotal();
        lineTask.classList.toggle("line-through");
        lineTask.classList.toggle("opacity-30");
        list.classList.toggle("opacity-20");
        list.classList.toggle("scale-90");
        if(listDoneCheck.checked){
            editBtn.setAttribute('disabled',true);
        }else{
            editBtn.removeAttribute('disabled',false);
        }
    });

    const editBtn = list.querySelector(".edit-btn");
    editBtn.addEventListener('click',() => {
        const newTaskInput = document.createElement('input');
        const taskList = lineTask.innerText;
        newTaskInput.className = "border border-stone-950 focus-visible:outline-none p-1";
        newTaskInput.focus();
        newTaskInput.value = taskList;
        lineTask.after(newTaskInput);
        lineTask.classList.add('hidden');
        editBtn.setAttribute('disabled',true);
        listDoneCheck.setAttribute('disabled',true);


        newTaskInput.addEventListener('blur',() => {
            editBtn.removeAttribute('disabled');
            listDoneCheck.removeAttribute('disabled');
            console.log("object");
            lineTask.innerText = newTaskInput.value;
            lineTask.classList.remove('hidden');
            newTaskInput.classList.add("hidden");
        })

    });
    const delBtn = list.querySelector(".del-btn");

    delBtn.addEventListener("click",() => {
        if (window.confirm("Are you sure to delete?")) {
            list.remove();
        }
    });
    return list;
    console.log(list);
};


// event
addTaskList.addEventListener('click', addList);