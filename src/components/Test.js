import { queries } from "@testing-library/react";
import React from "react";

const Test = props => {
    var queries = [
        ["ADD_FILE", "/file-a.txt", "4"],
        ["ADD_FILE", "/file-a.txt", "8"],
        ["ADD_FILE", "/dir-a/dir-c/file-b.txt", "11"],
        ["ADD_FILE", "/dir-a/dir-c/file-c.txt", "1"],
        ["ADD_FILE", "/dir-b/file-f.txt", "3"],
        ["GET_FILE_SIZE", "/file-a.txt"],
        ["GET_FILE_SIZE", "/file-c.txt"],
        ["MOVE_FILE", "/dir-b/file-f.txt", "/dir-b/file-e.txt"],
        ["MOVE_FILE", "/dir-b/file-a.txt", "/dir-b/file"],
        ["MOVE_FILE", "/file-a.txt", "/dir-b/file-e.txt"]
    ];

    var queries2 = [
        ["ADD_FILE", "/dir/file1.txt", "5"],
        ["ADD_FILE", "/dir/file2", "20"],
        ["ADD_FILE", "/dir/deeper/file3.mov", "9"],
        ["GET_N_LARGEST", "/dir", "2"],
        ["GET_N_LARGEST", "/dir/file", "3"],
        ["GET_N_LARGEST", "/another_dir", "file.txt"],
        ["ADD_FILE", "/big_file.mp4", "20"],
        ["GET_N_LARGEST", "/", "2"]
      ]

    function solution(param) {
        let files = {}
        let result = []
        param.forEach((query) => {
            switch(query[0]){
                case "ADD_FILE":
                    if(files[query[1]] === undefined){
                        let newfile = {}
                        newfile[query[1]] = query[2];  
                        files = {...files, ...newfile};
                        result.push("created");
                    }else{
                        files[query[1]] = query[2]; 
                        result.push("overwritten");
                    }
                    break;
                case "GET_FILE_SIZE":
                    if(files[query[1]] === undefined){
                        result.push("");
                    }else{
                        result.push(files[query[1]]);
                    }
                    break;
                case "MOVE_FILE":
                    if(files[query[1]] === undefined){
                        result.push("false");
                    }else if(files[query[2]] !== undefined){
                        result.push("false");
                    }else{
                        let newfile = {}
                        newfile[query[2]] = files[query[1]]; 
                        delete files[query[1]];
                        files = {...files, ...newfile};
                        result.push("true");
                    }
                    break;
                case "GET_N_LARGEST":
                    let vals = []
                    for (var key in files){
                        if(key.includes(query[1])){
                            if(vals.length === 0){
                                vals.push(key+"("+files[key]+")");
                            }else if( (vals.length < Number(query[2])) && (Number(files[vals[vals.length - 1].split("(")[0]]) < Number(files[key]) ) ){
                                //vals = [key+"("+files[key]+")", ...vals];
                                vals = insertVal(vals, key+"("+files[key]+")"); 
                            }else if( (vals.length < Number(query[2])) && (Number(files[vals[vals.length - 1].split("(")[0]]) > Number(files[key]) ) ){
                                vals = [...vals, key+"("+files[key]+")"];
                            }else if( (vals.length < Number(query[2])) && (Number(files[vals[vals.length - 1].split("(")[0]]) === Number(files[key]) ) && vals[vals.length - 1].split("(")[0] > key ){
                                //vals = [key+"("+files[key]+")", ...vals];
                                vals = insertVal(vals, key+"("+files[key]+")"); 
                            }else if( (vals.length < Number(query[2])) && (Number(files[vals[vals.length - 1].split("(")[0]]) === Number(files[key]) ) && vals[vals.length - 1].split("(")[0] < key ){
                                vals = [...vals, key+"("+files[key]+")"];
                            }else if( (vals.length >= Number(query[2])) && (Number(files[vals[vals.length - 1].split("(")[0]]) < Number(files[key]) ) ){
                                //vals[vals.length - 1] = key+"("+files[key]+")"; 
                                vals = replaceVal(vals, key+"("+files[key]+")"); 

                            }else if( (vals.length >= Number(query[2])) && (Number(files[vals[vals.length - 1].split("(")[0]]) === Number(files[key]) ) && vals[vals.length - 1].split("(")[0] > key){
                                //vals[vals.length - 1] = key+"("+files[key]+")"; 
                                vals = replaceVal(vals, key+"("+files[key]+")"); 
                            }
                        }
                    }
                    result.push(vals.toString());
                default:
                    break;
            }
        })
        return result;
    }

    function insertVal(arr, val){
        var idx = findPosX(arr,val,0,arr.length-1);
        arr.splice(idx, 0, val);
        return arr;
    }

    function replaceVal(arr, val){
        var idx = findPosX(arr,val,0,arr.length-1);
        arr.pop();
        arr.splice(idx, 0, val);
        return arr;
    }

    function findPosX(arr, val, start, end){
        if (start > end) return start;
        //if (arr[start] < val) return arr[start];

        let mid=Math.floor((start + end)/2);
        //console.log(mid);
        //console.log(val.split("(")[1].split(")")[0]);
        if (Number(arr[mid].split("(")[1].split(")")[0]) === Number(val.split("(")[1].split(")")[0])){
            if(arr[mid].split("(")[0] > val.split("(")[0]){
                return findPos(arr, val, start, mid-1);
            }else{
                return findPos(arr, val, mid+1, end);
            }
        }else if (Number(arr[mid].split("(")[1].split(")")[0]) < Number(val.split("(")[1].split(")")[0])){
            return findPos(arr, val, start, mid-1);
        }else{
            return findPos(arr, val, mid+1, end);
        }

    }

    function findPos(arr, val, start, end){
        if (start > end) return start;
        //if (arr[start] < val) return arr[start];

        let mid=Math.floor((start + end)/2);
        if (arr[mid] < val){
            return findPos(arr, val, start, mid-1);
        }else{
            return findPos(arr, val, mid+1, end);
        }

    }

    function getCount (arr,int){
        var count = 0;
        arr.filter(element => element === int && (count +=1));
        return count;
    }

    
    var newtest = [1,2];
    newtest[0]= 10;
    newtest[1]= 20;
    newtest[2]= 30;
    console.log(newtest);

    var array = [7,5,3,2,1,3,3];
    //console.log(solution(queries2));
    //console.log(findPos(array,5,0,array.length-1));
    console.log(getCount(array,3));
    return(
        <div className="hero" style={{overflowY:"scroll"}}>
            <div className="hero-body">
                <h1> Test </h1>
                
                <div className="box">
                    <h1>testing</h1>
                    <embed type="image/jpg" src={`${process.env.PUBLIC_URL}/images/defaults/volunteers/Animals.jpg`} width="300" height="200" />
                    <embed src="https://twitter.com/i/status/1634628743762149376"/>
                    <blockquote className="twitter-tweet"><p lang="en" dir="ltr">6️⃣.7️⃣0️⃣ for Tyreek Hill! <a href="https://twitter.com/cheetah?ref_src=twsrc%5Etfw">@cheetah</a> won the men’s 60m at the USATF Masters Indoor Championships 💥<a href="https://twitter.com/hashtag/USATF?src=hash&amp;ref_src=twsrc%5Etfw">#USATF</a> <a href="https://t.co/2DVWzoeOqe">pic.twitter.com/2DVWzoeOqe</a></p>&mdash; USATF (@usatf) <a href="https://twitter.com/usatf/status/1634628743762149376?ref_src=twsrc%5Etfw">March 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js"></script>
                    <embed type="image/jpg" src="http://127.0.0.1:5000/api/test-function4/test"/>
                    <br/>
                    {/*<iframe src="http://127.0.0.1:5000/api/test-function3" width="600" height="600"/>*/}
                    <iframe title="test4" src="http://127.0.0.1:5000/api/test-function4/test-name" width="600" height="600"/>
                    <iframe title="test5" src="http://127.0.0.1:5000/api/test-function5?username=cheyko" width="600" height="600"/>
                    <iframe title="test6" className="iframe-container" src="http://127.0.0.1:5000/api/test-function6?username=super-man" width="600" height="600"/>

                </div>
            </div>
        </div>
    )
}
export default Test;