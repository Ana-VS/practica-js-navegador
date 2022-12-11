const addNewMovement = document.querySelector("#addNewMovement");
const movementsList = document.querySelector ("#movementsList");
const balance = document.querySelector ("#balance")
const income = document.querySelector ("#income")
const expense = document.querySelector("#expense")
let id = 0;
let movsList = [];


addNewMovement.addEventListener ("submit", (event) =>{
    event.preventDefault();
    id += 1
    const movementConcept = document.querySelector ("#movementConcept");
    const movementAmount = document.querySelector ("#movementAmount");
    let movement = {
        concept : movementConcept.value,
        amount : parseFloat(movementAmount.value),
    }
    if (movementAmount.value > 0) {
        movement.type = "income"
    } else {
        movement.type = "expense"
    }
    movement.id = id
    movsList.push (movement);
    //id += 1

    drawMovements()
    addValues()  
       
    movementConcept.value = "";
    movementAmount.value = "";

    
}
);


        

function drawMovements () {
    movementsList.innerHTML =""
    movsList.forEach(movement => {
        let movementContent = `<li id="${movement.id}">${movement.concept}: ${movement.amount} €<button class ="remove" onclick="removeElement(${movement.id})">X</button></li> `
        const newMovement = document.createElement("li");
        newMovement.innerHTML = movementContent;
        movementsList.appendChild(newMovement);
    });
}

function removeElement (id) {
        movsList = movsList.filter (mov => id !== mov.id)
        
        drawMovements()
        addValues() 
    }


function addValues () {
    let totalIncome = sumIncome(movsList);
    let totalExpense = sumExpense (movsList);
    income.innerHTML = `${totalIncome} €`;
    expense.innerHTML = `${totalExpense} €`;
    let totalBalance = calculateBalance (totalIncome, totalExpense);
    balance.innerHTML = `${totalBalance} €`
}

function sumIncome (elements) {
    let sum = 0
    elements.forEach(element=> {
        if (element.type === "income") {
            sum += element.amount
        } 
    });
    return sum
}

function sumExpense (elements) {
    let sum = 0
    elements.forEach(element=> {
        if (element.type === "expense") {
            sum += element.amount
        } 
    });
    return sum
}

function calculateBalance (income, expense) {
    return income - Math.abs(expense)
}