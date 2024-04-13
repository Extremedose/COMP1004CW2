const peopleCSV = 'People.csv';

function getSelectedOption() {
  const option = document.getElementsByName("search_option");

  if (option[0].checked) {
    console.log("Selected Option: " + option[0].value);
    filterByName();
    return option[0].value;
  }
  if (option[1].checked) {
    console.log("Selected Option: " + option[1].value);
    filterByLicenceNo();
    return option[1].value;
  } else {
    console.log("No option was selected");
  }
}

function filterByName() {
  const inputElement = document.getElementById("search_input_text");
  const inputValueName = inputElement.value;
  console.log("Name to search for:", inputValueName);
  const column = 0;
  readCSVFile(inputValueName, column);
}

function filterByLicenceNo() {
  const inputElement = document.getElementById("search_input_text");
  const inputValueLicenceNo = inputElement.value;
  console.log("Licence number to search for:", inputValueLicenceNo);
  const column = 4;
  readCSVFile(inputValueLicenceNo, column);
}

function readCSVFile(dataToFilter, column) {
  
}
