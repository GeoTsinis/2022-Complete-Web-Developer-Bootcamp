let isActive = true;
let userInput = "";
let todoList = [];
let newTodo = "";
let deleteIndex;

while (isActive) {
    
  userInput = prompt("Choose a command: ");
        if (userInput === "quit"){
            console.log("*********");
            console.log("goodbye!!!");
            isActive = false; }
        else if (userInput === "new") {
            newTodo = prompt("What do you what to add?");
            todoList.push(newTodo);
            console.log(`${newTodo} added to the list.`);  
        } else if (userInput === "list") {
            console.log("********");
            if (todoList.length > 0) {
                for (let i=0; i<todoList.length; i++){
                    console.log(`${i}: ${todoList[i]}`);
                } 
            } else { console.log("The list is empty!"); }
        } else if (userInput === "delete") {
            deleteIndex = prompt("Choose an index to delete");
            let index = parseInt(deleteIndex);
            if (index > todoList.length -1 || Number.isNaN(index)) {
                console.log("**********");
                console.log("Index out of bounds");
                deleteIndex = prompt("Choose an index to delete");
                index = parseInt(deleteIndex);
            } else {
                todoList.splice(deleteIndex,1);
                console.log("**********");
                console.log("todo deleted."); }
        } else {
            userInput = prompt("Choose a command: ");
        }
}