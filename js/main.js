let siteName = document.getElementById("site");
let siteUrl = document.getElementById("url");
let buttonSubmit = document.getElementById("submit");
let tbodyTable = document.getElementById("tbodyTable");
var popup = document.getElementById("popup");
var iconClose = document.getElementById("x");
var page = document.getElementById("page");


var tableList = JSON.parse(localStorage.getItem("tableslist")) || [];
displayTable();

buttonSubmit.onclick = function() {
    if (validate(siteName, siteRegex) && validate(siteUrl, urlRegex)) {
        var trInfo = {
            name: siteName.value,
            url: siteUrl.value,
        }
        tableList.push(trInfo);
        localStorage.setItem("tableslist", JSON.stringify(tableList))
        displayTr(tableList.length - 1);
        clearForm();
    }else{
        popup.classList.remove("d-none");
        page.style.cssText = "filter: blur(10px);"
    }
}

iconClose.onclick = function(){
    popup.classList.add("d-none");
    page.style.cssText = "filter: blur(0px);"
}
function displayTr(index) {
    var tbodyTr = `
     <tr>
        <td>${index + 1}</td>
        <td>${tableList[index].name}</td>
        <td onclick='openLink(${index})'><button class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></td>
        <td onclick='deleteLink(${index})'><button class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>   
     </tr> 
    `
    tbodyTable.innerHTML += tbodyTr;
}

function displayTable() {
    tbodyTable.innerHTML = "";
    for (var i = 0; i < tableList.length; i++) {
        displayTr(i);
    }
}

function openLink(index) {
    var url = tableList[index].url;
    if (url) {
        window.open(url, '_blank');
    }
}

function deleteLink(index) {
    tableList.splice(index, 1);
    localStorage.setItem("tableslist", JSON.stringify(tableList))
    displayTable();
}

function clearForm() {
    siteName.value = "";
    siteName.classList.remove("is-valid");
    siteName.classList.remove("is-invalid");
    siteUrl.value = "";
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.remove("is-invalid");
}

var siteRegex = /^[A-Z][a-z]{5,}$/;
var urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;  


function validate(ele, regex) {
    if (regex.test(ele.value)) {
        ele.classList.add("is-valid");
        ele.classList.remove("is-invalid");
        return true;
    } else {
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
        return false;
    }
}

siteName.oninput = function () {
    validate(siteName, siteRegex);
}

siteUrl.oninput = function() {
    validate(siteUrl, urlRegex);
}
