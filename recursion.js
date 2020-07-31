function countingSheep(sheep) {
    if(sheep>=1) {
        console.log(`${sheep}:Another sheep jumps over the fence`)
        return countingSheep(sheep-1)
    }
    console.log('All sheep jumped over the fence');
}
countingSheep(3)

function powerCalculator(base, exponent) {
    if(exponent>0){
        return base * powerCalculator(base, exponent-1)
    }
    else if (exponent === 0) {
        return 1
    }
    console.log('exponent should be >= 0');
}

console.log(powerCalculator(2, 3));

function reverseString(string) {
    if(string.length === 1){
        return string
    }
    return reverseString(string.slice(1)) + string.slice(0,1)
}

function calculateNth(n) {
    if(n === 0) {
        return 0
    }
    return n + calculateNth(n-1)
}

function stringSplitter(string, separator, array, currIndex) {
 if(!separator){
     return string
 }
 if(string[currIndex] == separator ) {
     array.push(string.slice(0, currIndex))
     string = string.slice(currIndex + 1)
     currIndex = -1
 }
 if(currIndex == string.length-1) {
    array.push(string.slice(0, currIndex+1))

     return array
 }
 return stringSplitter(string, separator, array, currIndex+1)

}
console.log(stringSplitter("02/20/2020", "/", [], 0));



function fibonacci(numIt, nth, cur, prev ) { 
    if(numIt == nth) {
        return
    }
    if(numIt == 0 ) {
        console.log('1')
        cur = 1
        prev = 0
        fibonacci(numIt+1, nth, cur + prev, cur ); 
    }
    else if(numIt <= nth-1 ) {
        console.log(cur);
        fibonacci(numIt + 1, nth, cur + prev, cur ); 
    }
}

fibonacci(0,2,0,0);


function factorial(num) {
    if(num > 1) {
       return num * factorial(num-1)
    } else if (num == 1) {
        return num
    }
}

console.log(factorial(3));

function maze(x, y, mazeArr) {
    if(mazeArr[y][x] == 'e') {
        console.log('made it!')
        return
    }
    if(y < mazeArr.length-1 && (mazeArr[y+1][x] == ' ' || mazeArr[y+1][x] == 'e')) {
        console.log('y+1')
        return maze(x, y+1, mazeArr)
    }
    else if(x < mazeArr[y].length-1 && (mazeArr[y][x+1] == ' ' || mazeArr[y][x+1] == 'e')) {
        console.log('x+1')
        return maze(x+1, y, mazeArr)
    }
}

maze(0,0,[
    [' ', ' ', ' ', '*', ' ', ' ', ' '],
    ['*', '*', ' ', '*', ' ', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', '*', '*', '*', '*', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'e']
]);

function escapeMazeExhaustive(previousPositions, maze, direction){
    //console.log('entering with numpositions: ',previousPositions.length)
    //each iteration returns an array of arrays, all possible sets of future moves
    //console.log('entered with ',previousPositions)
    let latestPos=previousPositions[previousPositions.length-1]
    if(direction){

        let newPosition=null
        if(direction==="L"){
            if(latestPos.x < 1){
                console.log('end condition cannot move left');
                return null;
            }
            else{
                newPosition={x:latestPos.x-1, y:latestPos.y, direction:'L'};
            }
        }
        if(direction==="R"){
            //console.log('latestPos: ',latestPos)
            if(latestPos.x >= maze[latestPos.y].length-1){
                console.log('end condition cannot move right');
                return null;
            }
            else{
                newPosition={x:latestPos.x+1, y:latestPos.y, direction:'R'}
            }
        }
        if(direction==="U"){
            if(latestPos.y < 1){
                console.log('end condition cannot move up');
                return null;
            }
            else{
                newPosition={x:latestPos.x, y:latestPos.y-1, direction:'U'}
            }
        }
        if(direction==="D"){
            if(latestPos.y >= maze.length-1){
                console.log('end condition cannot move down');
                return null;
            }
            else{
                newPosition={x:latestPos.x, y:latestPos.y+1, direction:'D'}
            }
        }

        if(previousPositions.find(function(item){
            return item.x === newPosition.x && item.y === newPosition.y
        })){
            console.log('end condition, moving to a previous position')
            return null
        }
        //return an array of all possible future positions, that can be concatd with current array of positions
        
        if(maze[newPosition.y][newPosition.x] === '*'){
            console.log('end condition, trying to move into wall')
            return null
        }
        
        if(newPosition.x===maze[0].length-1 && newPosition.y===maze.length-1){
            console.log('end condition found maze end')
            return [[latestPos,newPosition]];
        }
        else{
            console.log('SUCCESS FOR DIRECTION: ',newPosition.direction)
            let results=[];
            let newPositions=previousPositions.concat([newPosition]);
            console.log('newPositions is: ',newPositions)
            results.push(escapeMazeExhaustive(newPositions,maze,'L'));
            results.push(escapeMazeExhaustive(newPositions,maze,'R'));
            results.push(escapeMazeExhaustive(newPositions,maze,'U'));
            results.push(escapeMazeExhaustive(newPositions,maze,'D'));
            
            let branches=[];
            for(let i=0; i<results.length; i++){
                //console.log('result[i] is: ',results[i]);
                if(results[i]){//array of sets of future positions
                    for(let x=0; x<results[i].length; x++){//an array of future positions
                        //console.log('result[i][x] is: ',results[i][x]);
                        if(results[i][x]){
                            let merged=[latestPos].concat(results[i][x]);
                            //console.log('merged is ',merged)
                            branches.push(merged);
                        }
                    }
                }
            }

            return branches.length ? branches : null;
        }
    }
    else{
        let results=[];
        results.push(escapeMazeExhaustive(previousPositions,maze,'L'));
        results.push(escapeMazeExhaustive(previousPositions,maze,'R'));
        results.push(escapeMazeExhaustive(previousPositions,maze,'U'));
        results.push(escapeMazeExhaustive(previousPositions,maze,'D'));
        
        for(let i=0; i<results.length; i++){
            if(results[i]){
                let branch=[latestPos].concat(results[i]);
                /*
                let invalid=false;
                for(let i=0; i<branch.length; i++){
                    if(branch.find(function(item,index){
                        return (index != i && item.x === branch[i].x && item.y === branch[i].y)
                    })){
                        invalid=true;
                    }
                }
                */
                if(1){//!invalid){
                    for(let i=0; i<branch.length; i++){
                        let string='';
                        for(let x=0; x<branch[i].length; x++){
                            string+=branch[i][x].direction;
                        }

                        console.log(string);
                    }
                }
                else{
                    console.log('found one that is invalid, should not happen')
                }
            }
        }
        console.log('results',JSON.stringify(results))
        
    }
}
/*
[' ', ' ', ' ', '*', ' ', ' ', ' '],
['*', '*', ' ', '*', ' ', '*', ' '],
[' ', ' ', ' ', ' ', ' ', ' ', ' '],
[' ', '*', '*', '*', '*', '*', ' '],
[' ', ' ', ' ', ' ', ' ', ' ', 'e']
RRDDLLDDRRRRR
RRDDRRRRD
RRDDRRUURRDDD
*/
console.log('result of maze is: ',escapeMazeExhaustive([{x:0,y:0,direction:''}],maze,''));

function createAnagrams(string){
    let results=[];
    if(string.length === 1){
        return [string];
    }
    
    for(let i=0; i<string.length; i++){
        let strarr=string.split('');
        let removed=strarr.splice(i,1);
        let result=createAnagrams(strarr.join(''));
        for(let x=0; x<result.length; x++){
            results.push(removed+result[x])
        }
    }
    
    return results;
}
console.log(createAnagrams("asd"));
function binaryRepresentation(num,str){
    if(num<=0){
        return str;
    }
    let bit=Math.floor(Math.log2(num))
    let strlen=str.length;
    for(let i=0; i < (bit+1)-strlen; i++){  
        str+='0';
    }
    console.log('num,bit',num,bit,str);
    str=str.slice(0,str.length-1-(bit))+'1'+str.slice(str.length-1-(bit)+1);
    console.log('str after',str)
    num-=2**bit;
    return binaryRepresentation(num,str);
}
console.log(binaryRepresentation(257,''));
function allWaysOut() {
//take starting position, move left, right, up, down, call function
//each of those will move left, right, up, down again
// exploring every single outcome of every combination of moves
//can never go backwards, have to keep track of every move you've already made
//take the ones that actually reach the exit, merge all of those into
//different series of options
//lukes version - didnt make it completely recursive
//my version - needs to be similar to a recursive/not have any extra stuff outside of it
}

function anagram(word) {

}