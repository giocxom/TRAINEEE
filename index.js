var selectedRow = null

let formData= {};
const LS = localStorage;
const form = document.querySelector('form');


form.addEventListener('input',function(event){
    formData[event.target.name]= event.target.value;
    LS.setItem('formData', JSON.stringify(formData));
});
if(LS.getItem('formData')){
    formData = JSON.parse(LS.getItem('formData'));
    for(let key in formData){
        form.elements[key].value = formData[key]
    }
    
}




function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    formData["fullName"] = document.getElementById("fullName").value;
    formData["lastName"] = document.getElementById("lastName").value;
    formData["address"] = document.getElementById("address").value;
    formData["date"] = document.getElementById("date").value;
    formData["Gender"] = document.getElementById("Gender").value;
    formData["note"] = document.getElementById("note").value;
    formData["ID"] = document.getElementById("ID").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("Table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.address;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.date;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.Gender;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.ID;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.note;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = `<a onClick="onEdit(this)" style="background-color:yellow ; color:black;cursor: pointer;">Edit</a>
                       <a onClick="onDelete(this)" style="background-color:red ;color:black;cursor: pointer;">Delete</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("address").value = "";
    document.getElementById("date").value = "";
    document.getElementById("Gender").value = "";
    document.getElementById("note").value = "";
    document.getElementById("ID").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("address").value = selectedRow.cells[2].innerHTML;
    document.getElementById("date").value = selectedRow.cells[3].innerHTML;
    document.getElementById("Gender").value = selectedRow.cells[4].innerHTML;
    document.getElementById("note").value = selectedRow.cells[5].innerHTML;
    document.getElementById("ID").value = selectedRow.cells[6].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.lastName;
    selectedRow.cells[2].innerHTML = formData.address;
    selectedRow.cells[3].innerHTML = formData.date;
    selectedRow.cells[4].innerHTML = formData.Gender;
    selectedRow.cells[5].innerHTML = formData.ID;
    selectedRow.cells[6].innerHTML = formData.note;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("Table").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "" ||document.getElementById("lastName").value == "" || document.getElementById("address").value == "" ) {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
        document.getElementById("lastNameValidationError").classList.remove("hide");
        document.getElementById("addressValidationError").classList.remove("hide");
        alert('Fill lanes with red tags')
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide")|| document.getElementById("lastNameValidationError").classList.contains("hide") || document.getElementById("addressValidationError").classList.contains("hide") )
            document.getElementById("fullNameValidationError").classList.add("hide");
            document.getElementById("lastNameValidationError").classList.add("hide");
            document.getElementById("addressValidationError").classList.add("hide");
    }
    return isValid;
}