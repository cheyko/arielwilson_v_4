function getDateTime(){
    const original = new Date();
    const isoVal = original.toString();
    const result = isoVal.split("GMT")[0];
    //console.log(result);
    return result;
}