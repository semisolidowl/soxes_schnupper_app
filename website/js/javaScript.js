
var count=1;


window.addEventListener('load', function(){
    console.log("page has loaded")
})

function addTask() {
    var table = document.getElementById("taskList");
    var row = table.insertRow(-1);
    row.id = "row"+count;

    var cell1 = row.insertCell(0);
    cell1.id="statuscell"+count;
    cell1.className="statuscellR";
    cell1.style.backgroundColor ="red";
    cell1.addEventListener("click",function(){cycleColour(cell1.id,row.id)});

    var cell2 = row.insertCell(1);
    cell2.id = "taskCell"+count;
    cell2.addEventListener("input",function(){console.log(cell2.id+" has been edited")});

    

    var cell3 = row.insertCell(2);
    cell3.addEventListener("click",function(){cellRemover(row.id)});
    cell3.id = "removeCell"+count;
    cell3.className = "remover";

    cell1.innerHTML = "";
    cell2.innerHTML = "";
    cell3.innerHTML = "X"

    var div2 = document.createElement('div');
    div2.innerHTML = "click here to edit";
    cell2.appendChild(div2);
    div2.contentEditable = true;

    count = count+1;
    console.log("row has been added")
}

function cycleColour(id,row){
    
    var whereSwap = document.getElementById(id);
    if(whereSwap.classList == "statuscellR"){
        whereSwap.style.backgroundColor ="Green"; 
        whereSwap.className="statuscellG"
        console.log("changed status in "+row+" to done");

    }else{
        whereSwap.style.backgroundColor ="red"; 
        whereSwap.className="statuscellR"
        console.log("changed status in "+row+" to not done");
    }

}

function cellRemover(row){
    console.log("removed "+row)
    //document.getElementById("taskList").deleteRow();

}