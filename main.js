const editIcon = `<i class="fas fa-edit"></i>` 
const deleteIcon = `<i class="fas fa-trash"></i>` 

const caloriesPerMinute = {
    workout: 8, // Calories burned per minute for workout
    running: 10, // Calories burned per minute for running
    walking: 4, // Calories burned per minute for walking
    swimming: 7 // Calories burned per minute for swimming
    
};

function calculateCalories(exerciseType, duration) {
    return caloriesPerMinute[exerciseType] * duration;
}

function clearInputs() { 
    wInput.value = ""
    eInput.value = ""
    tInput.value = ""
} 

function addToLocalStorage() { 
    localStorage.setItem("date", JSON.stringify(date)) 
    localStorage.setItem("water", JSON.stringify(water)) 
    localStorage.setItem("exercise", JSON.stringify(exercise)) 
    localStorage.setItem("exerciseType", JSON.stringify(exerciseType)) 
    localStorage.setItem("calories", JSON.stringify(calories))
} 

function activateEdit(i) { 
    wInput.value = water[i] 
    eInput.value = exercise[i] 
    tInput.value = exerciseType[i] 
    editIndex = i 
    submitButton.classList.add("hidden") 
    editSection.classList.remove("hidden") 
} 

function cancelEdit() { 
    clearInputs() 
    editIndex = -1 
    submitButton.classList.remove("hidden") 
    editSection.classList.add("hidden") 
} 

function editRow() { 
    if(editIndex==-1) return
    water[editIndex] = wInput.value 
    exercise[editIndex] = eInput.value 
    exerciseType[editIndex] = tInput.value 
    calories[editIndex] = calculateCalories(tInput.value, eInput.value);
    fillTable() 
    addToLocalStorage() 
    clearInputs() 
    editIndex = -1 
    submitButton.classList.remove("hidden") 
    editSection.classList.add("hidden") 
    setTimeout(() => fillTable(), 400) 
} 

function deleteRow(i) { 
    const toDelete = document.querySelectorAll("tbody tr")[i] 
    toDelete.classList.add("delete-animation") 
    setTimeout(() => { 
        date.splice(i, 1) 
        water.splice(i, 1) 
        exercise.splice(i, 1) 
        exerciseType.splice(i, 1) 
        calories.splice(i, 1)
        fillTable() 
        addToLocalStorage() 
    }, 400) 
    setTimeout(() => fillTable(), 400) 
} 

function fillTable() { 
    let output = "" 
    for(let i=0; i<date.length; ++i) { 
        output += ` 
        <tr> 
            <td>${date[i]}</td> 
            <td>${water[i]}</td> 
            <td>${exercise[i]}</td> 
            <td>${exerciseType[i]}</td>
            <td>${calories[i]}</td>
            <td><button class="edit" onclick="activateEdit(${i})">${editIcon}</button></td> 
            <td><button class="delete" onclick="deleteRow(${i})">${deleteIcon}</button></td> 
        </tr>
        ` 
    } 
    tableBody.innerHTML = output 
} 

const tableBody = document.querySelector("tbody#output") 
const submitButton = document.querySelector("button#submit") 
const editSection = document.querySelector("div#editSection") 
const wInput = document.querySelector("input#water") 
const eInput = document.querySelector("input#exercise") 
const tInput = document.querySelector("select#exerciseType") 

const date = JSON.parse(localStorage.getItem("date")) || [] 
const water = JSON.parse(localStorage.getItem("water")) || [] 
const exercise = JSON.parse(localStorage.getItem("exercise")) || [] 
const exerciseType = JSON.parse(localStorage.getItem("exerciseType")) || [] 
const calories = JSON.parse(localStorage.getItem("calories")) || []
let editIndex = -1 

submitButton.onclick = () => { 
    const today = new Date().toLocaleDateString("en-us", { month:"2-digit", day:"2-digit", year:"numeric" }) 
    date.push(today) 
    water.push(wInput.value) 
    exercise.push(eInput.value) 
    exerciseType.push(tInput.value)
    calories.push(calculateCalories(tInput.value, eInput.value))
    fillTable() 
    addToLocalStorage() 
    clearInputs() 
} 

fillTable()
const ctx = document.getElementById('progressChart').getContext('2d');
let progressChart;

function generateChart() {
    const dates = date;
    const caloriesData = calories;

    if (progressChart) {
        progressChart.destroy(); // Destroy the old chart instance if it exists
    }

    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Calories Burned',
                data: caloriesData,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderWidth: 2,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Calories Burned'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

submitButton.onclick = () => {
    const today = new Date().toLocaleDateString("en-us", { month:"2-digit", day:"2-digit", year:"numeric" });
    date.push(today);
    water.push(wInput.value);
    exercise.push(eInput.value);
    exerciseType.push(tInput.value);
    calories.push(calculateCalories(tInput.value, eInput.value));
    fillTable();
    addToLocalStorage();
    clearInputs();
    generateChart(); // Update chart after adding new data
};

generateChart(); // Generate chart on page load
