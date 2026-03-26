let chart;

// 🔐 LOGIN
function login(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "kikwika" && pass === "1234"){
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";
        updateDashboard();
        loadAllData(); // 🔥 charger les anciennes données
    } else {
        alert("Identifiants incorrects");
    }
}

// 💾 DATA
let employes = JSON.parse(localStorage.getItem("employes")) || [];
let clients = JSON.parse(localStorage.getItem("clients")) || [];
let projets = JSON.parse(localStorage.getItem("projets")) || [];
let finances = JSON.parse(localStorage.getItem("finances")) || [];

let totalFinance = finances.reduce((a,b)=>a+b,0);

// 💾 SAVE
function saveData(){
    localStorage.setItem("employes", JSON.stringify(employes));
    localStorage.setItem("clients", JSON.stringify(clients));
    localStorage.setItem("projets", JSON.stringify(projets));
    localStorage.setItem("finances", JSON.stringify(finances));
}

// 📊 DASHBOARD
function updateDashboard(){
    document.getElementById("totalEmployes").innerText = employes.length;
    document.getElementById("totalClients").innerText = clients.length;
    document.getElementById("totalProjets").innerText = projets.length;
    document.getElementById("totalFinances").innerText = totalFinance;
    document.getElementById("totalFinanceDisplay").innerText = totalFinance;

    drawChart();
}

// 📊 GRAPH
function drawChart(){
    if(chart){
        chart.destroy();
    }

    chart = new Chart(document.getElementById("myChart"), {
        type: 'bar',
        data: {
            labels: ["Employés", "Clients", "Projets"],
            datasets: [{
                label: "Statistiques",
                data: [employes.length, clients.length, projets.length]
            }]
        }
    });
}

// ➕ CREATE ITEM
function createItem(name, array, listId){
    array.push(name);
    saveData();

    let li = document.createElement("li");
    li.innerHTML = name + " <button onclick='deleteItem(this)'>❌</button>";

    document.getElementById(listId).appendChild(li);
    updateDashboard();
}

// ❌ DELETE ITEM
function deleteItem(btn){
    btn.parentElement.remove();
}

// 🔄 CHARGER LES DONNÉES AU DÉMARRAGE
function loadAllData(){

    // Employés
    employes.forEach(nom => {
        let li = document.createElement("li");
        li.innerHTML = nom + " <button onclick='deleteItem(this)'>❌</button>";
        document.getElementById("listeEmployes").appendChild(li);
    });

    // Clients
    clients.forEach(nom => {
        let li = document.createElement("li");
        li.innerHTML = nom + " <button onclick='deleteItem(this)'>❌</button>";
        document.getElementById("listeClients").appendChild(li);
    });

    // Projets
    projets.forEach(nom => {
        let li = document.createElement("li");
        li.innerHTML = nom + " <button onclick='deleteItem(this)'>❌</button>";
        document.getElementById("listeProjets").appendChild(li);
    });

    // Finances
    finances.forEach(montant => {
        let li = document.createElement("li");
        li.innerHTML = montant + " <button onclick='deleteItem(this)'>❌</button>";
        document.getElementById("listeFinances").appendChild(li);
    });

    updateDashboard();
}

// 📌 EVENTS

// Employés
document.getElementById("formEmploye").addEventListener("submit", function(e){
    e.preventDefault();
    createItem(document.getElementById("nomEmploye").value, employes, "listeEmployes");
    this.reset();
});

// Clients
document.getElementById("formClient").addEventListener("submit", function(e){
    e.preventDefault();
    createItem(document.getElementById("nomClient").value, clients, "listeClients");
    this.reset();
});

// Projets
document.getElementById("formProjet").addEventListener("submit", function(e){
    e.preventDefault();
    createItem(document.getElementById("nomProjet").value, projets, "listeProjets");
    this.reset();
});

// Finances
document.getElementById("formFinance").addEventListener("submit", function(e){
    e.preventDefault();

    let montant = Number(document.getElementById("montant").value);

    finances.push(montant);
    totalFinance += montant;

    saveData();

    let li = document.createElement("li");
    li.innerHTML = montant + " <button onclick='deleteItem(this)'>❌</button>";

    document.getElementById("listeFinances").appendChild(li);

    this.reset();
    updateDashboard();
});
