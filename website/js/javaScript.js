
var count=1;


window.addEventListener('load', function(){
    console.log("page has loaded")

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            textadd(xmlHttp.responseText);
    }
    xmlHttp.open("GET", "http://localhost:5000/getTODO", true); // true for asynchronous 
    xmlHttp.send(null);
})

function textadd(text){
    const obj = JSON.parse(text);
    
    var c1ID="";
    var c1name="";
    var c1c="";
    var c2ID="";
    var c3ID="";
    var cont="";
    
    console.log(text);

    for(var i = 0; i < obj.length; i++) {
        var data = obj[i];
        c1ID=count;

        if (data.status ==1) {
            c1name="statuscellR"
            c1c="red";
        } else {
            c1name="statuscellG"
            c1c="Green";
        }
        c2ID=count;
        c3ID=count;
        cont=data.content;
        makeRow(c1ID,c1name,c2ID,c3ID,cont,c1c);
        //console.log(data);

      }


//make rows that give relevent data from request



}

function addTask() {
   var c1ID = "statuscell"+count;
   var c1name = "statuscellR";
   var c2ID = "taskCell"+count;
   var c3ID = "removeCell"+count;
   var cont = prompt("Please enter your Task:", "Edit, Task");
   var c1c="red";
    makeRow(c1ID,c1name,c2ID,c3ID,cont,c1c);
    console.log("row has been added");
//    console.log(tableToJson(taskList));




//    let xhr = new XMLHttpRequest();
//            let url = "http://localhost:5000/postTODO";
//       
//            xhr.open("POST", url, true);
// 
//            xhr.setRequestHeader("Content-Type", "application/json");
// 
//            xhr.onreadystatechange = function () {
//                if (xhr.readyState === 4 && xhr.status === 200) {
// 
//                  
//                    result.innerHTML = this.responseText;
//                }
//            };

//    var data = JSON.stringify({
//            "ID":count,
//            "content":"",
//            "status":"0",
//            "userOwned":"1"
//        });
//        xhr.send(data);
    }
function tableToJson(table) { 
    var data = [];
    for (var i = 1; i < table.rows.length; i++) { 
        var tableRow = table.rows[i]; 

        var rowData = []; 
        for (var j = 0; j < tableRow.cells.length; j++) { 
            rowData.push(tableRow.cells[j].innerHTML);
 
        } 
    } 

    var id=table.rows.length - 1;
    var content;
    var status;
    var userOwned="1";
    console.log();
    console.log(table.rows[ table.rows.length - 1 ]);
    console.log(table.rows.length - 1);
    console.log(data);

    return data; 

}//


function makeRow(c1ID,c1name,c2ID,c3ID,cont,c1c){
    var table = document.getElementById("taskList");
    var row = table.insertRow(-1);
    row.id = "row"+count;

    var cell1 = row.insertCell(0);
    cell1.id=c1ID;
    cell1.className=c1name;
    cell1.style.backgroundColor =c1c;
    cell1.addEventListener("click",function(){cycleColour(cell1.id,row.id)});

    var cell2 = row.insertCell(1);
    cell2.id = c2ID;
    cell2.addEventListener("input",function(){console.log(cell2.id+" has been edited")});

    

    var cell3 = row.insertCell(2);
    cell3.addEventListener("click",function(){cellRemover(row.id)});
    cell3.id = c3ID;
    cell3.className = "remover";

    cell1.innerHTML = "";
    cell2.innerHTML = "";
    cell3.innerHTML = "X"

    var div2 = document.createElement('div');
    div2.innerHTML = cont;
    cell2.appendChild(div2);
    div2.contentEditable = true;

    count = count+1;
}




function cycleColour(id,row){
    
    var whereSwap = document.getElementById(id);
    if(whereSwap.classList == "statuscellR"){
        whereSwap.style.backgroundColor ="Green"; 
        whereSwap.className="statuscellG"
        console.log("changed status in "+row+" to done");

    }else{
        whereSwap.style.backgroundColor ="red"; 
        whereSwap.className="statuscellR";
        console.log("changed status in "+row+" to not done");
    }

}




function cellRemover(row){
    console.log("removed "+row)
    //document.getElementById("taskList").deleteRow();

}