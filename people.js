function getSelectedOption(){
    var option = document.getElementsByName("search_option");

    if (option[0].checked) {
        console.log("Selected Option: " + option[0].value);
        return option[0].value;
    }
    if (option[1].checked) {
        console.log("Selected Option: " + option[1].value);
        return option[1].value;
    }
    else{
        console.log("No option was selected");
    }
}

