function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    var res;
    var str = expr.replace(/ /g, "");
    console.log(str);
    for (i=0; i<str.length; i++) {
        // console.log("i: " + str[i]);
        if (str[i]=="+") { 
            // console.log("i: " + str[i]);
            res=Number.parseInt(str[i-1]) + Number.parseInt(str[i+1]);
        }
        if (str[i]=="-") { 
            // console.log("i: " + str[i]);
            res=Number.parseInt(str[i-1]) - Number.parseInt(str[i+1]);
        }
        if (str[i]=="*") { 
            // console.log("i: " + str[i]);
            res=Number.parseInt(str[i-1]) * Number.parseInt(str[i+1]);
        }
        if (str[i]=="/") { 
            // console.log("i: " + str[i]);
            // test division by zero
            res=Number.parseInt(str[i-1]) / Number.parseInt(str[i+1]);
        }
    }
    console.log(res);
    return (res);
}

module.exports = {
    expressionCalculator
}