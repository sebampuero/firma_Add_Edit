/*
* Get the current date in format yyyy-mm-dd
* @return the formated date of today
*/
function getTodayDate(){
    var today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth()+1,
        yyyy = today.getFullYear();

    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    return yyyy+'-'+mm+'-'+dd;
}
