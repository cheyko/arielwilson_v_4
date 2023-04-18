function getDateTime(){
    const original = new Date();
    const isoVal = original.toString();
    const result = isoVal.split("GMT")[0];
    //console.log(result);
    return result;
}

function formatTime(param){
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var now = new Date();
    var before = new Date(param + "UTC");
    var seconds = (now.getTime() - before.getTime())/1000;
    let answer;
    if (seconds <= 5){
        answer = "just now";
    }else if (seconds > 5 && seconds < 60){
        answer = Math.round(seconds) + " secs ago";
    }else if(seconds > 60 && seconds < 3600){
        answer = Math.round(seconds / 60) + (Math.round(seconds / 60) > 1 ? "mins" : "min");
    }else if(seconds > 3600 && seconds < 86400){
        answer = Math.round(seconds / 3600) + ( Math.round(seconds / 3600) > 1 ?  "hrs" : "hr" );
    }else{
        answer = months[before.getMonth()] + " " + before.getDate(); 
    }
    return answer;
}

/*function getFullTime(aTime){
    //console.log(aTime.getHours());
    if (aTime.getHours() < 12){
        return aTime.getHours() + ":" + (aTime.getMinutes() < 10 ? ("0" + aTime.getMinutes()) : aTime.getMinutes()) + "am";
    }else if (aTime.getHours() === 12){
        return aTime.getHours() + ":" + (aTime.getMinutes() < 10 ? ("0" + aTime.getMinutes()) : aTime.getMinutes()) + "pm"
    }else{
        return aTime.getHours() % 12 + ":" + (aTime.getMinutes() < 10 ? ("0" + aTime.getMinutes()) : aTime.getMinutes()) + "pm"
    }
}*/

function formatReaction(num){
    if(num > 9999 && num < 1000000){
        return (`${Math.floor(num / 1000).toFixed(0)}K`);
    }else if(num > 999999 && num < 1000000000){
        return (`${Math.floor(num / 1000000).toFixed(0)}M`);
    }else if(num > 999999999){
        return (`${Math.floor(num / 1000000000).toFixed(0)}B`);
    }else{
        return num;
    }
}

export {getDateTime, formatTime, formatReaction};