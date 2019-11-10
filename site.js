// global variables
var arr = new Array();

//load information from local storage
function loadFromLocalStorage() {
    var loadArr = localStorage.getItem("notes");

    if (loadArr === null) {
        arr = new Array();
    }
    else {
        arr = JSON.parse(loadArr);
        displayNotes(arr,0);
    }
}

// displays notes
function buildNotes(arr) {

    if (arr.length == 1) {
        var i = 0;
        displayNotes(arr, i)
    }
    else {

        i = arr.length-1;
        displayNotes(arr, i)
    }


}

function displayNotes(arr, i) {

    var container = document.getElementById("container");
    for ( i ; i < arr.length; i++) {

        var div = document.createElement("div");
        div.className = "taskNote";
        container.appendChild(div);

        var del = document.createElement("button");
        del.className = "delete";
        del.id = arr[i].id;
        del.onclick = deleteNoteFromHTML;
        div.appendChild(del);

        var pUserTask = document.createElement("p");
        pUserTask.className = "showUserTask";
        pUserTask.innerText = arr[i].text;
        div.appendChild(pUserTask);

        var pDate = document.createElement("span");
        pDate.className = "showDate";
        pDate.innerText = arr[i].date + "\n";
        div.appendChild(pDate);

        var pTime = document.createElement("span");
        pTime.className = "showTime";
        pTime.innerText = arr[i].time;
        div.appendChild(pTime);

    }
}
//input validation
function checkDetails() {

    var inputDate = document.getElementById("inputDate");
    var inputTime = document.getElementById("inputTime");
    var textareaUserTask = document.getElementById("textareaUserTask");
    var spanMessage = document.getElementById("spanMessage");
    spanMessage.innerText = "";

    if (inputDate.value == "") {
        spanMessage.innerText = "Please enter the date.";
        spanMessage.style.color = "red";
        return;
    }
    if (inputTime.value == "") {
        spanMessage.innerText = "Please enter the time.";
        spanMessage.style.color = "red";
        return;
    }
    if (textareaUserTask.value == "") {
        spanMessage.innerText = "Please enter a description.";
        spanMessage.style.color = "red";
        return;
    }

    var noteDate = inputDate.value;
    var noteTime = inputTime.value;
    var userTask = textareaUserTask.value;

    var id = createUniqueID();

    makeObjForLS(noteDate, noteTime, userTask, id);
    addToLS();
    buildNotes(arr);
    clearTask();
}

// create Unique ID
function createUniqueID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

//makes object and pushs into array
function makeObjForLS(noteDate, noteTime, userTask, id) {

    var note = { date: noteDate, time: noteTime, text: userTask, 'id': id };

    arr.push(note);

    var str = JSON.stringify(arr);
    localStorage.setItem("notes", str);
}

//adds array to local storage
function addToLS() {
    var str = JSON.stringify(arr);
    localStorage.setItem("notes", str);
}

//clears all fields
function clearTask() {
    document.getElementById("inputDate").value = "";
    document.getElementById("inputTime").value = "";
    document.getElementById("textareaUserTask").value = "";
}

// deletes note from HTML
function deleteNoteFromHTML() {

    var objToDelete = event.target.id;
    var answer = confirm("Delete this note?");

    if (answer) {

        this.parentNode.parentNode.removeChild(this.parentNode);
        deleteNoteFromLS(objToDelete);

        alert("Note deleted!")

    }
}

//deletes note from local storage
function deleteNoteFromLS(id) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
            arr.splice(i, 1);
            addToLS();

            if (arr == "") {
                localStorage.clear();
            }

        }
    }
}
