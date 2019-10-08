function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    // var res;
    // var str = expr.replace(/ /g, "");
    let testBr = expr.replace(/[0-9\+\-\*\\\s]/, '');
    let brOpen = 0;
    let brClose = 0;
    for ( i=0; i < testBr.length; i++) {
        if (testBr[i] == '(') { brOpen ++;}
        if (testBr[i] == ')') { brClose ++;}
    }
    if (brClose != brOpen) { throw "ExpressionError: Brackets must be paired";}

    var str;
    if (expr.indexOf(' ') == -1 ) { str = expr.split('');}
    else {
        expr = expr.replace(/\s+/g, ' ').trim();
        str = expr.split(' ');
    }

    var out = [];
    var stack = [];
    // console.log("str: " + str.join(' '));
    // expr to RPN
    for (i=0; i<str.length; i++) {
        // test num
        // console.log( "!: " + str[i] );
        // console.log( "i:  " + i + " #: " + stack.length );
        if ( str[i].replace(/\d/g, '') == '' ) {
            // 1-9 ---> out
            // console.log( "!!: " + str[i] );
            out.push(str[i]);
            // console.log( "!!: " + out.join('') );
        }
        if ( str[i] == '(' ) {
            // ---> steck
            stack.push(str[i]);
        }
        if ( str[i] == ')' ) {
            // steck ---> out to '('
            while ( stack[stack.length-1] != '(' ) {
                // console.log( "!!!: " + stack.length );
                // let data = stack.pop();
                // if (stack.length == 0) return "ExpressionError: Brackets must be paired";
                // stack.splice(stack.length-1, 1);
                // console.log( "i:  " + i + " st.length: " + stack.length + " st.last: " + stack[stack.length-1] );
                // console.log(  " st.last: " + stack[stack.length-1] );
                let data = stack.pop();
                if (data == undefined) { return "ExpressionError: Brackets must be paired";}
                else { out.push(data);}
                // console.log( "!!!: " + stack.length );
            }
            // del '('
            // stack.splice(stack.length-1, 1); 
            stack.pop();
        }
        if ( str[i] == '+' || str[i] == '-' ) {
            // if ( steck.[oper] hi prior them 'i' or steck.[oper] prior = 'i' ) { steck ---> out }
            // and oper ---> stack
            // console.log( "!!!: " + str[i] + " stack: " + stack );
            // console.log( "#1: " + stack.length + " st: " + stack[stack.length]);
            while ( stack[stack.length-1] == '*' || stack[stack.length-1] == '/' || stack[stack.length-1] == '-' || stack[stack.length-1] == '+' ) {
                let data = stack.pop();
                // console.log( "#: " + data );
                // stack.splice(stack.length-1, 1);
                out.push(data);
            }
            stack.push(str[i]);
        }
        if ( str[i] == '*' || str[i] == '/' ) {
            // if ( steck.[oper] hi prior them 'i' or steck.[oper] prior = 'i' ) { steck ---> out }
            // and oper ---> stack
            while ( stack[stack.length-1] == '*' || stack[stack.length-1] == '/' ) {
                let data = stack.pop();
                // stack.splice(stack.length-1, 1);
                out.push(data);
            }
            stack.push(str[i]);
        }
        // console.log('stack: ' + stack.join('') );
    }
    // stack ---> out (in stack  should be onli oper )
    console.log('out: ' + out.join(' '));
    console.log('stack end: ' + stack.join('') );
    while ( stack.length > 0 ) {
        let data = stack.pop();
        // console.log('stack: ' + data );
        // stack.splice(stack.length-1, 1);
        out.push(data);
    }
    
    // console.log('stack f: ' + stack.join('') );
    // console.log('out: ' + out.join(' '));
    var data
    // calculation RPN
    while ( out.length > 0 ) {
        data = out.shift();
        // console.log('data: ' + data);
        // if 1-9 --->  stack
        // if ( + - * / ) stack.last.1 oper stack.last.2  and calc ---> stack 
        if ( data.replace(/\d/g, '') == '' ) { 
            stack.push(data);
            // console.log('stack num: ' + stack.join(' ') );
        }
        else {
            // let data1 = Number.parseInt(stack.pop());
            // let data2 = Number.parseInt(stack.pop());
            // let data1 = stack.pop();
            // let data2 = stack.pop();
            var data1 = parseFloat(stack.pop());
            var data2 = parseFloat(stack.pop());
            var rez;
            if ( data == '+' ) { 
                rez = data2 + data1 ;
                stack.push(rez);
            }
            if ( data == '-' ) { 
                rez = data2 - data1 ;
                stack.push(rez);
            }
            if ( data == '*' ) { 
                rez = data2 * data1 ;
                stack.push(rez);
            }
            if ( data == '/' ) { 
                if ( data1 == 0 ) { throw "TypeError: Division by zero.";}
                rez = data2 / data1 ;
                stack.push(rez);
            }
            // console.log(': ' + data2 + ' ' + data + ' ' + ' ' + data1 + ' = ' + rez );
            // console.log('stack !num: ' + stack.join(' ') );
        }

    }
    // res
    let res = stack.pop();
    console.log(res);
    return res;
}

module.exports = {
    expressionCalculator
}