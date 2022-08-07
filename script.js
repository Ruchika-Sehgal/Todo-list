let tasks = [];
let optVis = false;
let n = 1;
let prority = 5;
let enddate = Date.today;
console.log("enddate=" + enddate);
let doneTasks = 0;
let addTaskVis=false;



//set Priority function
function setBorder(id, priority) {
    console.log(priority);
    console.log("setBorder: id" + id);
    if (priority == 5) document.getElementById(id).style.border = "0.2rem solid red";
    else if (priority == 4) document.getElementById(id).style.border = "0.2rem solid salmon";
    else if (priority == 3) document.getElementById(id).style.border = "0.2rem solid orange";

    else if (priority == 2) document.getElementById(id).style.border = "0.2rem solid blue";

    else if (priority == 1) document.getElementById(id).style.border = "0.2rem solid cyan";
    // else document.getElementById(id).style.borderColor = "red";
}



//Add Task function
document.getElementById("addForm").onsubmit = function (e) {
    e.preventDefault();
    if (document.getElementById("Priority").value == "") {
        alert("Please enter a priority");
    }
    else {
        var Itext = document.getElementById("Itext").value;
        var priority = document.getElementById("Priority").value;
        var enddate = document.getElementById("EndDate").value;
        let res = checkDate(document.getElementById("EndDate"))
        if(res == false) return;
        console.log(tasks);
        if (tasks.includes(Itext)) return
        tasks.push(Itext);
        var newItem = document.createElement("div");



        var str = n.toString();
        // console.log("task"+str);

        //Complete Task Div
        let CompleteTaskDiv = document.createElement("div");
        document.getElementById("tasks").appendChild(CompleteTaskDiv);
        CompleteTaskDiv.id = "CompleteTaskDiv";



        //Wrapper Div
        let wrapperDiv = document.createElement("div");
        CompleteTaskDiv.appendChild(wrapperDiv);
        wrapperDiv.setAttribute("id", ("task" + str));
        wrapperDiv.setAttribute("class", "data-task");
        // wrapperDiv.innerText="Hello"

        // Clear Task Div

        let deleteDiv = document.createElement("div");
        deleteDiv.setAttribute("style", "padding:0rem 3rem;");
        deleteDiv.classList.add("data-cross");
        deleteDiv.innerText = "X"
        if (n % 2 == 0) {
            deleteDiv.style.background = "aquamarine";
            console.log(str)
        }
        else {
            deleteDiv.setAttribute("Style", "padding:0rem 3rem;" + " background:lightyellow");
        }
        wrapperDiv.appendChild(deleteDiv);

        //Content Div
        let contentDiv = document.createElement("div");
        // el2.setAttribute("id", ());
        // contentDiv.innerText="Hii"
        wrapperDiv.appendChild(contentDiv);
        if (n % 2 == 0) {
            wrapperDiv.style.background = "aquamarine";
        }
        else {
            wrapperDiv.style.background = "lightyellow";
        }


        //Status Div
        let statusDiv = document.createElement("div");
        // statusDiv.setAttribute("class", "statusDiv");
        statusDiv.setAttribute("style", "width:1rem; display:flex; justify-content:center; margin-inline:2rem; cursor:pointer; border:0.1rem solid black; align-items:center;");
        statusDiv.innerHTML = "&nbsp;"
        if (n % 2 == 0) {
            statusDiv.style.background = "aquamarine";
        }
        else {
            statusDiv.style.background = "lightyellow";
        }

        contentDiv.appendChild(statusDiv);


        //TaskDiv Div
        taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "data-task-data");
        taskDiv.innerText = Itext;
        taskDiv.setAttribute("title", Itext);
        if (n % 2 == 0) {
            taskDiv.style.background = "aquamarine";
        }
        else {
            taskDiv.style.background = "lightyellow";
        }


        contentDiv.appendChild(taskDiv);


        //Enddate Div
        let EndDateDiv = document.createElement("div");
        EndDateDiv.setAttribute("class", "data-task-data");
        EndDateDiv.setAttribute("id", "task" + n + "EDate")
        
        EndDateDiv.innerText = enddate;
        contentDiv.appendChild(EndDateDiv);
        //Due Div
        let DueDiv = document.createElement("div");
        let date = new Date()
        DueDiv.style.color = "red";
        DueDiv.style.marginBlock = "2rem"
        DueDiv.setAttribute("class", "data-task-due");
        DueDiv.setAttribute("id", "task" + n + "EDate")
        DueDiv.innerText = `Due In: ${getDate(enddate, date.getTime())} (According To GMT)`;
        contentDiv.appendChild(DueDiv);
        

        //Onclick functions
        statusDiv.onclick = function () {
            if (statusDiv.innerHTML == "&nbsp;") {
                statusDiv.innerHTML = "&check;"
                taskDiv.style.textDecoration = "line-through";
                EndDateDiv.style.textDecoration = "line-through";
                DueDiv.style.textDecoration = "line-through";
                doneTasks++;
                console.log("done"+doneTasks);
                console.log("Pending"+(n-doneTasks-1));
                document.getElementById("statusOfAll").innerText = `${n-1-doneTasks} tasks pending out of ${n-1}`;
            }
            else {
                statusDiv.innerHTML = "&nbsp;"
                taskDiv.style.textDecoration = "none";
                EndDateDiv.style.textDecoration = "none";
                DueDiv.style.textDecoration = "none";
                doneTasks--;
                console.log("done"+doneTasks);
                console.log("Pending"+(n-doneTasks-1));
                document.getElementById("statusOfAll").innerText = `${n-1-doneTasks} tasks pending out of ${n-1}`;
            }
        }
        deleteDiv.onclick = function () {
            if (confirm("Are you sure you want to delete this task?") == true) {
                tasks.splice(deleteDiv.parentNode.id, 1);
                wrapperDiv.remove(deleteDiv);
            }
        }
        console.log(wrapperDiv.id)
        setBorder(wrapperDiv.id, priority);
        
        //Options Div
        let opDiv = document.createElement("div");
        wrapperDiv.appendChild(opDiv);
        opDiv.id = "task" + n + "Op";
        opDiv.innerHTML = "<i class=\"fa-solid fa-bars\"></i>";
        opDiv.style.padding = "0rem 1.5rem";
        opDiv.className = "opDiv";
        console.log(opDiv.parentElement.id);
        // opDiv.style.margin="0rem 1rem 0 rem 0rem";
        
        opDiv.setAttribute("onclick", "appendOpTab(this.parentElement.id)");
        n = n + 1;
        console.log("done " + doneTasks);
        console.log("Pending" + (n - doneTasks-1));
    }
    document.getElementById("statusOfAll").innerText = `${n-1-doneTasks} tasks pending out of ${n-1}`;
}
let lastId;
function appendOpTab(id) {
    
    console.log("appending at " + id);
    if (optVis == false || lastId != id) {
        let appendant = document.getElementById(id);
        console.log("in appendOPTab " + id);
        console.log(appendant);
        appendant.appendChild(document.getElementById("opTab"));
        optVis = true;
        lastId = id;
        
    }
    else {
        document.body.appendChild(document.getElementById("opTab"));
        optVis = false;
    }
    
    console.log(optVis);
}


// Remove option tab and append priority div
document.getElementById("PriorityChangeOp").onclick = function () {
    console.log("Changing priority " + document.getElementById("opTab").parentElement.parentElement.id);
    let wrapperDiv = document.getElementById("opTab").parentElement;
    // console.log(wrapperDiv);
    try {
        document.body.appendChild(document.getElementById("opTab"));
        
    } catch (exception) {
        console.log("exception")
    }
    wrapperDiv.appendChild(document.getElementById("ChangePrioDiv"));
    optVis = false;
    console.log("optVis" + optVis);
    // ChangePrior()
    console.log("Should terminate without placing appendOp here")
}

//Change Priority function
document.getElementById("ChangeP").setAttribute("onclick", "ChangePriority()");
function ChangePriority() {
    let newP = document.getElementsByClassName("changeI")[0].value;
    console.log("change " + document.getElementById("ChangeP").parentElement.parentElement.id);
    let id = document.getElementById("ChangeP").parentElement.parentElement.id;
    console.log("id " + id);
    setBorder(id, newP);
    try {
        document.body.appendChild(document.getElementById("ChangePrioDiv"));
        
    } catch (exception) {
        console.log("exception prior")
    }
}

//remove opTab and append enddate change
document.getElementById("editEnddateOp").onclick = function () {
    console.log("Changing enddate " + document.getElementById("opTab").parentElement.parentElement.id);
    let wrapperDiv = document.getElementById("opTab").parentElement;
    // console.log(wrapperDiv);
    try {
        document.body.appendChild(document.getElementById("opTab"));
        
    } catch (exception) {
        console.log("exception")
    }
    wrapperDiv.appendChild(document.getElementById("ChangeEndDateDiv"));
    optVis = false;
    console.log("optVis" + optVis);
    // ChangePrior()
    console.log("Should terminate without placing appendOp here")
}
//Change Enddate function
document.getElementById("ChangeE").setAttribute("onclick", "ChangeEdate()");
function ChangeEdate() {

    let newEDate = document.getElementsByClassName("changeI")[0].value;
    let EDateDiv = document.getElementById("ChangeE").parentElement.parentElement.getElementsByClassName("data-task-data")[1];
    console.log(document.getElementById("ChangeE").parentElement.parentElement.getElementsByClassName("data-task-data")[1].innerText);
    EDateDiv.innerText = newEDate;
    console.log("date changed");
    try {
        document.body.appendChild(document.getElementById("ChangeEndDateDiv"));

    } catch (exception) {
        console.log("exception prior")
    }

    // console.log(document.getElementsByClassName("changeI")[0].value);
}



//remove opTab and append changeTaskDiv

document.getElementById("editTOp").onclick = function () {
    console.log("into function");
    console.log("Changing task data " + document.getElementById("opTab").parentElement.id);
    let wrapperDiv = document.getElementById("opTab").parentElement;
    // console.log(wrapperDiv);
    try {
        document.body.appendChild(document.getElementById("opTab"));

    } catch (exception) {
        console.log("exception")
    }
    wrapperDiv.appendChild(document.getElementById("ChangeTaskDiv"));
    console.log("268 " + wrapperDiv.children[1].children[1].innerHTML)
    let taskDiv = wrapperDiv.children[1].children[1];
    document.getElementsByClassName("changeI")[0].value = taskDiv.innerText;
    // console.log(taskDiv);
    optVis = false;
    console.log("optVis" + optVis);
    // ChangePrior()
    console.log("Should terminate without placing appendOp here")
}

document.getElementById("ChangeT").setAttribute("onclick", "ChangeTask()");
function ChangeTask() {

    let newTask = document.getElementsByClassName("changeI")[0].value;
    // console.log(newTask);
    // console.log("task"+ document.getElementsByClassName("changeI")[0].value);
    let EDateDiv = document.getElementById("ChangeT").parentElement.parentElement.getElementsByClassName("data-task-data")[0];
    console.log(document.getElementById("ChangeT").parentElement.parentElement.getElementsByClassName("data-task-data")[0].innerText);
    EDateDiv.innerText = newTask;
    console.log("Task changed");
    try {
        document.body.appendChild(document.getElementById("ChangeTaskDiv"));

    } catch (exception) {
        console.log("exception prior")
    }

}



function getDate(gdate, sdate) {
    const oldDate = new Date(gdate);
    const date = new Date(sdate);
    if (oldDate < date) return "OverDue"
    else {
        console.log();
        return `${((oldDate.getTime() - date.getTime()) / (1000 * 3600)).toFixed(2)} Hours`;
    }
}

function checkDate(e){
    console.log(e);
    const newDate = new Date(e.value);
    const date = new Date();
    if(newDate < date){
        alert("Invalid date");
        return false
    }
}
function appendAddTask(){
    if(addTaskVis==false){
        let plusDiv=document.getElementsByClassName("taskFormAdder")[0];
        let formElem=document.getElementsByClassName("form")[0];
        console.log(plusDiv)
        console.log(formElem);
        console.log("appending...");
        plusDiv.appendChild(formElem);
        formElem.style.display="flex";
        // plusDiv.appendChild(formElem);
        addTaskVis=true;

    }
    else{
        let formElem=document.getElementsByClassName("form")[0];
        let actualFormDiv=document.getElementsByClassName("hiddenTAdder")[0];
        console.log(actualFormDiv);
        actualFormDiv.appendChild(formElem);
        // formElem.style.display="none";
        let TAdderDiv=document.getElementsByClassName("taskAdderDiv")[0];
        TAdderDiv.style.width="5rem";
        TAdderDiv.style.right="2rem";
        // document.body.style.opacity="0.5";
        addTaskVis=false;
    }
}
document.getElementsByClassName("addNewT")[0].setAttribute("onclick", "appendAddTask()");