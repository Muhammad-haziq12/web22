alert(zbi2("Voici la date"));


function zbi2(message){
    const dateTimeNow = new Date();
    const day = dateTimeNow.toLocaleDateString();
    const hour = dateTimeNow.toLocaleTimeString();
    return   day + " " + hour + " " + message;
}
