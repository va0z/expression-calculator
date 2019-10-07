function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    var res;
    var str = expr.replace(/ /g, "");

    var out = [];
    var stack = [];
    console.log("str: " + str);
    // expr to opn
    for (i=0; i<str.length; i++) {
        // test num
        // console.log( "!: " + str[i] );
        if ( str[i].replace(/\d/g, '') == '' ) {
            // ---> out
            // console.log( "!!: " + str[i] );
            out.push(str[i]);
            // console.log( "!!: " + out.join('') );
        }
        if ( str[i] == '(' ) {
            // ---> steck
            stack.splice(stack.length, 1, str[i]);
        }
        if ( str[i] == ')' ) {
            // steck ---> out to '('
            while ( stack[stack.length] != '(' ) {
                let data = stack.pop();
                stack.splice(stack.length-1, 1);
                out.push(str[i]);
            }
            // del '('
            stack.splice(stack.length-1, 1); 
        }
        if ( str[i] == '+' || str[i] == '-' ) {
            // if ( steck.[oper] hi prior them 'i' or steck.[oper] prior = 'i' ) { steck ---> out }
            // and oper ---> stack
            // console.log( "!!!: " + stack.length );
            if ( stack[stack.length] == '*' || stack[stack.length] == '/' || stack[stack.length] == '-' || stack[stack.length] == '+' ) {
                let data = stack.pop();
                stack.splice(stack.length-1, 1);
                out.push(data);
            }
            stack.push(str[i]);
        }
        if ( str[i] == '*' || str[i] == '/' ) {
            // if ( steck.[oper] hi prior them 'i' or steck.[oper] prior = 'i' ) { steck ---> out }
            // and oper ---> stack
            if ( stack[stack.length] == '*' || stack[stack.length] == '/' ) {
                let data = stack.pop();
                stack.splice(stack.length-1, 1);
                out.push(data);
            }
            stack.push(str[i]);
        }
    }
    // stack ---> out (in stack  should be onli oper )
    console.log('stack: ' + stack.join('') );
    while ( stack.length > 0 ) {
        let data = stack.pop();
        // console.log('stack: ' + data );
        stack.splice(stack.length-1, 1);
        out.push(data);
    }
    console.log('out: ' + out.join(''));







    // for (i=0; i<str.length; i++) {
    //     // console.log("i: " + str[i]);
    //     if (str[i]=="+") { 
    //         // console.log("i: " + str[i]);
    //         res=Number.parseInt(str[i-1]) + Number.parseInt(str[i+1]);
    //     }
    //     if (str[i]=="-") { 
    //         // console.log("i: " + str[i]);
    //         res=Number.parseInt(str[i-1]) - Number.parseInt(str[i+1]);
    //     }
    //     if (str[i]=="*") { 
    //         // console.log("i: " + str[i]);
    //         res=Number.parseInt(str[i-1]) * Number.parseInt(str[i+1]);
    //     }
    //     if (str[i]=="/") { 
    //         // console.log("i: " + str[i]);
    //         // test division by zero
    //         res=Number.parseInt(str[i-1]) / Number.parseInt(str[i+1]);
    //     }
    // }
    // console.log(res);
    // return (res);
}

module.exports = {
    expressionCalculator
}