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