// 🔐 LOGIN
function login(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "admin" && pass === "1234"){
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";
        updateDashboard();
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
    new Chart(document.getElementById("myChart"), {
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

// 👨‍💼 EMPLOYES
document.getElementById("formEmploye").addEventListener("submit", function(e){
    e.preventDefault();
    let nom = document.getElementById("nomEmploye").value;

    employes.push(nom);
    saveData();

    let li = document.createElement("li");
    li.textContent = nom;
    document.getElementById("listeEmployes").appendChild(li);

    this.reset();
    updateDashboard();
});

// 👥 CLIENTS
document.getElementById("formClient").addEventListener("submit", function(e){
    e.preventDefault();
    let nom = document.getElementById("nomClient").value;

    clients.push(nom);
    saveData();

    let li = document.createElement("li");
    li.textContent = nom;
    document.getElementById("listeClients").appendChild(li);

    this.reset();
    updateDashboard();
});

// 📁 PROJETS
document.getElementById("formProjet").addEventListener("submit", function(e){
    e.preventDefault();
    let nom = document.getElementById("nomProjet").value;

    projets.push(nom);
    saveData();

    let li = document.createElement("li");
    li.textContent = nom;
    document.getElementById("listeProjets").appendChild(li);

    this.reset();
    updateDashboard();
});

// 💰 FINANCES
document.getElementById("formFinance").addEventListener("submit", function(e){
    e.preventDefault();
    let montant = Number(document.getElementById("montant").value);

    finances.push(montant);
    totalFinance += montant;

    saveData();

    let li = document.createElement("li");
    li.textContent = montant;
    document.getElementById("listeFinances").appendChild(li);

    this.reset();
    updateDashboard();
});
