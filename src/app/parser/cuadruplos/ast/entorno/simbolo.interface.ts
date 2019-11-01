export interface Simbolo {
    id?: String;
    valor?: any;
    tipo?: Tipo;
}


export const enum Tipo{
    //NUMERO, //0
    ENTERO, //0
    DECIMAL, //1
    ARREGLO, //2
    VAR, //3
    LABEL, //4
    BOOL, //5
    METODO //6
}