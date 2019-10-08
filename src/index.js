function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
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
    // expr to RPN
    for (i=0; i<str.length; i++) {
        if ( str[i].replace(/\d/g, '') == '' ) {
            // 1-9 ---> out
            out.push(str[i]);
        }
        if ( str[i] == '(' ) {
            // ---> stack
            stack.push(str[i]);
        }
        if ( str[i] == ')' ) {
            // steck ---> out to '('
            while ( stack[stack.length-1] != '(' ) {
                // let data = stack.pop();
                // if (stack.length == 0) return "ExpressionError: Brackets must be paired";
                let data = stack.pop();
                if (data == undefined) { return "ExpressionError: Brackets must be paired";}
                else { out.push(data);}
            }
            // del '('
            stack.pop();
        }
        if ( str[i] == '+' || str[i] == '-' ) {
            // if ( steck.[oper] hi prior them 'i' or steck.[oper] prior = 'i' ) { steck ---> out }
            // and oper ---> stack
            while ( stack[stack.length-1] == '*' || stack[stack.length-1] == '/' || stack[stack.length-1] == '-' || stack[stack.length-1] == '+' ) {
                let data = stack.pop();
                out.push(data);
            }
            stack.push(str[i]);
        }
        if ( str[i] == '*' || str[i] == '/' ) {
            // if ( steck.[oper] hi prior them 'i' or steck.[oper] prior = 'i' ) { steck ---> out }
            // and oper ---> stack
            while ( stack[stack.length-1] == '*' || stack[stack.length-1] == '/' ) {
                let data = stack.pop();
                out.push(data);
            }
            stack.push(str[i]);
        }
    }
    // stack ---> out (in stack  should be onli oper )
    console.log('out: ' + out.join(' '));
    console.log('stack end: ' + stack.join('') );
    while ( stack.length > 0 ) {
        let data = stack.pop();
        out.push(data);
    }
    

    var data
    // calculation RPN
    while ( out.length > 0 ) {
        data = out.shift();
        // if 1-9 --->  stack
        // if ( + - * / ) stack.last.1 oper stack.last.2  and calc ---> stack 
        if ( data.replace(/\d/g, '') == '' ) { 
            stack.push(data);
        }
        else {
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