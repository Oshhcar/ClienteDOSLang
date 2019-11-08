/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-insensitive

comment_simple      "//"[^\r\n]*
comment_multi       "/*""/"*([^*/]|[^*]"/"|"*"[^/])*"*"*"*/"
digit               [0-9]
/*number             {digit}+("."{digit}+)?*/
entero              {digit}+
decimal             {digit}+"."{digit}+
label               "l"{digit}+
temp                "t"{digit}+
letter              [a-zA-ZñÑ]
identifier          ({letter}|"_")({letter}|{digit}|"_")*
%%

\s+                 /* skip whitespace */
{comment_simple}    /* skip comment */
{comment_multi}     /* skip comment */

/* reserved words */
"jmp"               return 'jmp'
"je"                return 'je'
"jne"               return 'jne'
"jg"                return 'jg'
"jl"                return 'jl'
"jge"               return 'jge'
"jle"               return 'jle'
"begin"             return 'begin'
"end"               return 'end'
"call"              return 'call'
"print"             return 'print'
"c"                 return 'c'
"e"                 return 'e'
"d"                 return 'd'
"$_in_value"        return 'in_vaule'

/* arithmetic operators  */
"+"                 return '+'
"-"                 return '-'
"*"                 return '*'
"/"                 return '/'
"%"                 return '%'

/* Symbols */
"="                 return '='
":"                 return 'colon'
","                 return 'comma'
"("                 return '('
")"                 return ')'

{label}             return 'label'
{temp}              return 'temp'
/*{number}            return 'number'*/
{decimal}           return 'decimal'
{entero}            return 'entero'
{identifier}        return 'identifier'

<<EOF>>             return 'EOF'
.                   return 'INVALID'

/lex

%{
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
%}

%start START

%% /* language grammar */

START
    : INSTRUCTIONS EOF
        { 
            console.log("DOCUMENTO OK!");
            return new AST($1);
        }
    ;

INSTRUCTIONS
    : INSTRUCTION 
        {
            $$ = [];
            $$.push($1);
        }
    | INSTRUCTIONS INSTRUCTION
        {
            $$ = $1;
            $$.push($2);
        }
    ;

INSTRUCTION
    :  ASSIGNMENT
        { $$ = $1; }
    | label colon
        { $$ = new Label($1, (yylineno + 1), (@1.first_column + 1)); }
    | JUMP
        { $$ = $1; }
    | begin comma comma comma identifier   
        { $$ = new Metodo($5, (yylineno + 1), (@1.first_column + 1)); }
    | end comma comma comma identifier
        { $$ = new End($5, (yylineno + 1), (@1.first_column + 1)); }
    | call comma comma comma identifier
        { $$ = new Call($5, (yylineno + 1), (@1.first_column + 1)); }
    | print '('  '%' CHART comma LITERAL ')' 
        { $$ = new Print($4, $6, (yylineno + 1), (@1.first_column + 1)); }
    | call comma comma comma in_vaule
        { $$ = new Read((yylineno + 1), (@1.first_column + 1)); }
    ;

ASSIGNMENT
    : E comma temp
        { 
            $$ = $1;
            $$.target = $3;
            $$.temp = true;
        }
    | E comma identifier
        { 
            $$ = $1;
            $$.target = $3;
            $$.temp = false;
        }
    ;

E 
    : '=' comma LITERAL comma
        { $$ = new Asignacion(0, $3, null, (yylineno + 1), (@1.first_column + 1)); }
    | '=' comma LITERAL comma LITERAL
        { $$ = new Asignacion(0, $3, $5, (yylineno + 1), (@1.first_column + 1)); }
    | '+' comma LITERAL comma LITERAL
        { $$ = new Asignacion(1, $3, $5, (yylineno + 1), (@1.first_column + 1)); }
    | '-' comma LITERAL comma LITERAL
        { $$ = new Asignacion(2, $3, $5, (yylineno + 1), (@1.first_column + 1)); }
    | '*' comma LITERAL comma LITERAL
        { $$ = new Asignacion(3, $3, $5, (yylineno + 1), (@1.first_column + 1)); }
    | '/' comma LITERAL comma LITERAL
        { $$ = new Asignacion(4, $3, $5, (yylineno + 1), (@1.first_column + 1)); }
    | '%' comma LITERAL comma LITERAL
        { $$ = new Asignacion(5, $3, $5, (yylineno + 1), (@1.first_column + 1)); }
    ;

LITERAL
    : entero
        { $$ = new Literal(0, Number(yytext), (yylineno + 1), (@1.first_column + 1)); }
    | decimal
        { $$ = new Literal(1, Number(yytext), (yylineno + 1), (@1.first_column + 1)); }
    | temp
        { $$ = new Temporal($1, (yylineno + 1), (@1.first_column + 1)); }
    | identifier
        { $$ = new Identificador($1, (yylineno + 1), (@1.first_column + 1)); }
    ;

JUMP
    : jmp comma comma comma label
        { $$ = new Salto($5, (yylineno + 1), (@1.first_column + 1)); }
    | COND comma LITERAL comma LITERAL comma label
        { $$ = new SaltoCond($1, $3, $5, $7, (yylineno + 1), (@1.first_column + 1)); }
    ;

COND 
    : je 
        { $$ = 0; }
    | jne
        { $$ = 1; }
    | jg
        { $$ = 2; }
    | jl
        { $$ = 3; }
    | jge
        { $$ = 4; }
    | jle
        { $$ = 5; }
    ;

CHART
    : c
        { $$ = $1; }
    | e
        { $$ = $1; }
    | d
        { $$ = $1; }
    ;