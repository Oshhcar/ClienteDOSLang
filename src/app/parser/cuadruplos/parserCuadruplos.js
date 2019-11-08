/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parserCuadruplos = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,7],$V2=[1,8],$V3=[1,9],$V4=[1,10],$V5=[1,19],$V6=[1,14],$V7=[1,15],$V8=[1,16],$V9=[1,17],$Va=[1,18],$Vb=[1,12],$Vc=[1,20],$Vd=[1,21],$Ve=[1,22],$Vf=[1,23],$Vg=[1,24],$Vh=[1,25],$Vi=[5,8,11,14,15,16,18,25,26,27,28,29,32,34,35,36,37,38,39],$Vj=[1,53],$Vk=[1,52],$Vl=[1,50],$Vm=[1,51],$Vn=[12,21];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"INSTRUCTIONS":4,"EOF":5,"INSTRUCTION":6,"ASSIGNMENT":7,"label":8,"colon":9,"JUMP":10,"begin":11,"comma":12,"identifier":13,"end":14,"call":15,"print":16,"(":17,"%":18,"CHART":19,"LITERAL":20,")":21,"in_vaule":22,"E":23,"temp":24,"=":25,"+":26,"-":27,"*":28,"/":29,"entero":30,"decimal":31,"jmp":32,"COND":33,"je":34,"jne":35,"jg":36,"jl":37,"jge":38,"jle":39,"c":40,"e":41,"d":42,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"label",9:"colon",11:"begin",12:"comma",13:"identifier",14:"end",15:"call",16:"print",17:"(",18:"%",21:")",22:"in_vaule",24:"temp",25:"=",26:"+",27:"-",28:"*",29:"/",30:"entero",31:"decimal",32:"jmp",34:"je",35:"jne",36:"jg",37:"jl",38:"jge",39:"jle",40:"c",41:"e",42:"d"},
productions_: [0,[3,2],[4,1],[4,2],[6,1],[6,2],[6,1],[6,5],[6,5],[6,5],[6,7],[6,5],[7,3],[7,3],[23,4],[23,5],[23,5],[23,5],[23,5],[23,5],[23,5],[20,1],[20,1],[20,1],[20,1],[10,5],[10,7],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1],[19,1],[19,1],[19,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 
            console.log("DOCUMENTO OK!");
            return new AST($$[$0-1]);
        
break;
case 2:

            this.$ = [];
            this.$.push($$[$0]);
        
break;
case 3:

            this.$ = $$[$0-1];
            this.$.push($$[$0]);
        
break;
case 4: case 6: case 33: case 34: case 35:
 this.$ = $$[$0]; 
break;
case 5:
 this.$ = new Label($$[$0-1], (yylineno + 1), (_$[$0-1].first_column + 1)); 
break;
case 7:
 this.$ = new Metodo($$[$0], (yylineno + 1), (_$[$0-4].first_column + 1)); 
break;
case 8:
 this.$ = new End($$[$0], (yylineno + 1), (_$[$0-4].first_column + 1)); 
break;
case 9:
 this.$ = new Call($$[$0], (yylineno + 1), (_$[$0-4].first_column + 1)); 
break;
case 10:
 this.$ = new Print($$[$0-3], $$[$0-1], (yylineno + 1), (_$[$0-6].first_column + 1)); 
break;
case 11:
 this.$ = new Read((yylineno + 1), (_$[$0-4].first_column + 1)); 
break;
case 12:
 
            this.$ = $$[$0-2];
            this.$.target = $$[$0];
            this.$.temp = true;
        
break;
case 13:
 
            this.$ = $$[$0-2];
            this.$.target = $$[$0];
            this.$.temp = false;
        
break;
case 14:
 this.$ = new Asignacion(0, $$[$0-1], null, (yylineno + 1), (_$[$0-3].first_column + 1)); 
break;
case 15:
 this.$ = new Asignacion(0, $$[$0-2], $$[$0], (yylineno + 1), (_$[$0-4].first_column + 1)); 
break;
case 16:
 this.$ = new Asignacion(1, $$[$0-2], $$[$0], (yylineno + 1), (_$[$0-4].first_column + 1)); 
break;
case 17:
 this.$ = new Asignacion(2, $$[$0-2], $$[$0], (yylineno + 1), (_$[$0-4].first_column + 1)); 
break;
case 18:
 this.$ = new Asignacion(3, $$[$0-2], $$[$0], (yylineno + 1), (_$[$0-4].first_column + 1)); 
break;
case 19:
 this.$ = new Asignacion(4, $$[$0-2], $$[$0], (yylineno + 1), (_$[$0-4].first_column + 1)); 
break;
case 20:
 this.$ = new Asignacion(5, $$[$0-2], $$[$0], (yylineno + 1), (_$[$0-4].first_column + 1)); 
break;
case 21:
 this.$ = new Literal(0, Number(yytext), (yylineno + 1), (_$[$0].first_column + 1)); 
break;
case 22:
 this.$ = new Literal(1, Number(yytext), (yylineno + 1), (_$[$0].first_column + 1)); 
break;
case 23:
 this.$ = new Temporal($$[$0], (yylineno + 1), (_$[$0].first_column + 1)); 
break;
case 24:
 this.$ = new Identificador($$[$0], (yylineno + 1), (_$[$0].first_column + 1)); 
break;
case 25:
 this.$ = new Salto($$[$0], (yylineno + 1), (_$[$0-4].first_column + 1)); 
break;
case 26:
 this.$ = new SaltoCond($$[$0-6], $$[$0-4], $$[$0-2], $$[$0], (yylineno + 1), (_$[$0-6].first_column + 1)); 
break;
case 27:
 this.$ = 0; 
break;
case 28:
 this.$ = 1; 
break;
case 29:
 this.$ = 2; 
break;
case 30:
 this.$ = 3; 
break;
case 31:
 this.$ = 4; 
break;
case 32:
 this.$ = 5; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:$V0,10:6,11:$V1,14:$V2,15:$V3,16:$V4,18:$V5,23:11,25:$V6,26:$V7,27:$V8,28:$V9,29:$Va,32:$Vb,33:13,34:$Vc,35:$Vd,36:$Ve,37:$Vf,38:$Vg,39:$Vh},{1:[3]},{5:[1,26],6:27,7:4,8:$V0,10:6,11:$V1,14:$V2,15:$V3,16:$V4,18:$V5,23:11,25:$V6,26:$V7,27:$V8,28:$V9,29:$Va,32:$Vb,33:13,34:$Vc,35:$Vd,36:$Ve,37:$Vf,38:$Vg,39:$Vh},o($Vi,[2,2]),o($Vi,[2,4]),{9:[1,28]},o($Vi,[2,6]),{12:[1,29]},{12:[1,30]},{12:[1,31]},{17:[1,32]},{12:[1,33]},{12:[1,34]},{12:[1,35]},{12:[1,36]},{12:[1,37]},{12:[1,38]},{12:[1,39]},{12:[1,40]},{12:[1,41]},{12:[2,27]},{12:[2,28]},{12:[2,29]},{12:[2,30]},{12:[2,31]},{12:[2,32]},{1:[2,1]},o($Vi,[2,3]),o($Vi,[2,5]),{12:[1,42]},{12:[1,43]},{12:[1,44]},{18:[1,45]},{13:[1,47],24:[1,46]},{12:[1,48]},{13:$Vj,20:49,24:$Vk,30:$Vl,31:$Vm},{13:$Vj,20:54,24:$Vk,30:$Vl,31:$Vm},{13:$Vj,20:55,24:$Vk,30:$Vl,31:$Vm},{13:$Vj,20:56,24:$Vk,30:$Vl,31:$Vm},{13:$Vj,20:57,24:$Vk,30:$Vl,31:$Vm},{13:$Vj,20:58,24:$Vk,30:$Vl,31:$Vm},{13:$Vj,20:59,24:$Vk,30:$Vl,31:$Vm},{12:[1,60]},{12:[1,61]},{12:[1,62]},{19:63,40:[1,64],41:[1,65],42:[1,66]},o($Vi,[2,12]),o($Vi,[2,13]),{12:[1,67]},{12:[1,68]},o($Vn,[2,21]),o($Vn,[2,22]),o($Vn,[2,23]),o($Vn,[2,24]),{12:[1,69]},{12:[1,70]},{12:[1,71]},{12:[1,72]},{12:[1,73]},{12:[1,74]},{13:[1,75]},{13:[1,76]},{13:[1,77],22:[1,78]},{12:[1,79]},{12:[2,33]},{12:[2,34]},{12:[2,35]},{8:[1,80]},{13:$Vj,20:81,24:$Vk,30:$Vl,31:$Vm},{12:[2,14],13:$Vj,20:82,24:$Vk,30:$Vl,31:$Vm},{13:$Vj,20:83,24:$Vk,30:$Vl,31:$Vm},{13:$Vj,20:84,24:$Vk,30:$Vl,31:$Vm},{13:$Vj,20:85,24:$Vk,30:$Vl,31:$Vm},{13:$Vj,20:86,24:$Vk,30:$Vl,31:$Vm},{13:$Vj,20:87,24:$Vk,30:$Vl,31:$Vm},o($Vi,[2,7]),o($Vi,[2,8]),o($Vi,[2,9]),o($Vi,[2,11]),{13:$Vj,20:88,24:$Vk,30:$Vl,31:$Vm},o($Vi,[2,25]),{12:[1,89]},{12:[2,15]},{12:[2,16]},{12:[2,17]},{12:[2,18]},{12:[2,19]},{12:[2,20]},{21:[1,90]},{8:[1,91]},o($Vi,[2,10]),o($Vi,[2,26])],
defaultActions: {20:[2,27],21:[2,28],22:[2,29],23:[2,30],24:[2,31],25:[2,32],26:[2,1],64:[2,33],65:[2,34],66:[2,35],82:[2,15],83:[2,16],84:[2,17],85:[2,18],86:[2,19],87:[2,20]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const AST = require('./ast/ast').AST;
    const Label = require('./ast/instruccion/label').Label;
    const Literal = require('./ast/expresion/literal').Literal;
    const Print = require('./ast/instruccion/print').Print;
    const Asignacion = require('./ast/instruccion/asignacion').Asignacion;
    const Identificador = require('./ast/expresion/identificador').Identificador;
    const Salto = require('./ast/instruccion/salto').Salto;
    const SaltoCond = require('./ast/instruccion/saltoCond').SaltoCond;
    const Metodo = require('./ast/instruccion/metodo').Metodo;
    const End = require('./ast/instruccion/end').End;
    const Temporal = require('./ast/expresion/temporal').Temporal;
    const Call = require('./ast/instruccion/call').Call;
    const Read = require('./ast/instruccion/read').Read;
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* skip comment */
break;
case 2:/* skip comment */
break;
case 3:return 32
break;
case 4:return 34
break;
case 5:return 35
break;
case 6:return 36
break;
case 7:return 37
break;
case 8:return 38
break;
case 9:return 39
break;
case 10:return 11
break;
case 11:return 14
break;
case 12:return 15
break;
case 13:return 16
break;
case 14:return 40
break;
case 15:return 41
break;
case 16:return 42
break;
case 17:return 22
break;
case 18:return 26
break;
case 19:return 27
break;
case 20:return 28
break;
case 21:return 29
break;
case 22:return 18
break;
case 23:return 25
break;
case 24:return 9
break;
case 25:return 12
break;
case 26:return 17
break;
case 27:return 21
break;
case 28:return 8
break;
case 29:return 24
break;
case 30:return 31
break;
case 31:return 30
break;
case 32:return 13
break;
case 33:return 5
break;
case 34:return 'INVALID'
break;
}
},
rules: [/^(?:\s+)/i,/^(?:(\/\/[^\r\n]*))/i,/^(?:(\/\*\/*([^*\/]|[^*]\/|\*[^\/])*\**\*\/))/i,/^(?:jmp\b)/i,/^(?:je\b)/i,/^(?:jne\b)/i,/^(?:jg\b)/i,/^(?:jl\b)/i,/^(?:jge\b)/i,/^(?:jle\b)/i,/^(?:begin\b)/i,/^(?:end\b)/i,/^(?:call\b)/i,/^(?:print\b)/i,/^(?:c\b)/i,/^(?:e\b)/i,/^(?:d\b)/i,/^(?:\$_in_value\b)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:=)/i,/^(?::)/i,/^(?:,)/i,/^(?:\()/i,/^(?:\))/i,/^(?:(l([0-9])+))/i,/^(?:(t([0-9])+))/i,/^(?:(([0-9])+\.([0-9])+))/i,/^(?:(([0-9])+))/i,/^(?:((([a-zA-ZñÑ])|_)(([a-zA-ZñÑ])|([0-9])|_)*))/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parserCuadruplos;
exports.Parser = parserCuadruplos.Parser;
exports.parse = function () { return parserCuadruplos.parse.apply(parserCuadruplos, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}