/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function carica() {
    let x = new XMLHttpRequest();
    
    x.onloadstart = function(e) {
        console.log("loadStart", e.loaded, e.total);
    };

    x.onprogress = function(e) {
        console.log("progress", e.loaded, e.total);
    };
    
    x.abort = function(e) {
        console.log("abort", e.loaded, e.total);
    };
    
    x.onerror = function(e) {
        console.log("error", e.loaded, e.total);
    };
    
    x.onload = function(e) {
        console.log("load", e.loaded, e.total);
        console.log("dati", x.responseText);
        let oggJson = JSON.parse(x.responseText);
        creaTabellaDaJson(oggJson, "", "tabAnagrafica", "tabella", "#contenitoreTab");
    };
    
    x.ontimeout = function(e) {
        console.log("timeout", e.loaded, e.total);
    };
    
    x.onloadend = function(e) {
        console.log("loadEnd", e.loaded, e.total);
    };
    
    x.onreadystatechange = function(e) {
        console.log("readyStateChange", e.loaded, e.total);
    };
    
    x.open("GET", "./ArrayJson.json", true);
    
    x.send();
}

function creaTabellaDaJson(oggJson, listaCampi, idTabella, classeTabella, contenitore="body") {
    let tabella = document.createElement("table");
    tabella.id = idTabella;
    tabella.className = classeTabella;

    // riga intestazione
    let tHead = document.createElement("thead");
    let riga = document.createElement("tr");
    if (listaCampi == "") {
        let v = [];
        for (campo in oggJson[0]) {
            v.push(campo);
        }
        listaCampi = v.join(",");
    }
    let vCampi = listaCampi.split(",");
    vCampi.forEach(function (campo, i) {
        let th = document.createElement("th");
        th.innerHTML = campo;
        riga.appendChild(th);
    });
    tHead.appendChild(riga);
    tabella.appendChild(tHead);

    // tbody
    let tBody = document.createElement("tbody");
    oggJson.forEach(function (record, i) {
        riga = document.createElement("tr");
        vCampi.forEach(function (campo, j) {
            let cella = document.createElement("td");
            cella.innerHTML = record[campo];    // oggJson[j][campo]
            riga.appendChild(cella);
        });
        tBody.appendChild(riga);
    });
    tabella.appendChild(tBody);

    // append della tabella al contenitore
    document.querySelector(contenitore).appendChild(tabella);
}

carica();
/*
 j.forEach(function (record, k) {
 let riga = document.createElement("tr");
 
 let cellaNome = document.createElement("td");
 let cellaCognome = document.createElement("td");
 let cellaEmail = document.createElement("td");
 
 cellaNome.innerHTML = record.nome;
 cellaCognome.innerHTML = record.cognome;
 cellaEmail.innerHTML = record.email;
 
 riga.appendChild(cellaNome);
 riga.appendChild(cellaCognome);
 riga.appendChild(cellaEmail);
 
 document.querySelector("#tabAnagrafica tbody").appendChild(riga);
 //  document.querySelector("#tabAnagrafica tbody").append(riga);    //  IDEM COME SOPRA IN QUESTO CASO
 });
 
 function creaElencoJson(objson) {
 objson.forEach(function (record, k) {
 let voceCognome = document.createElement("li");
 
 let sottoElenco = document.createElement("ul");
 
 let voceNome = document.createElement("li");
 let voceEmail = document.createElement("li");
 
 voceCognome.innerHTML = record.cognome;
 voceNome.innerHTML = record.nome;
 voceEmail.innerHTML = record.email;
 
 sottoElenco.appendChild(voceNome);
 sottoElenco.appendChild(voceEmail);
 
 document.querySelector("#elAnagrafica").appendChild(voceCognome);
 document.querySelector("#elAnagrafica").appendChild(sottoElenco);
 });
 }
 
 creaElencoJson(j);
 */