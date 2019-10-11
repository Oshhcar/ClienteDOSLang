export interface Simbolo {
    id?: String;
    valor?: any;
    tipo?: Tipo;
}


export const enum Tipo{
    NUMERO, //0
    ARREGLO, //1
    VAR, //2
    LABEL, //3
    BOOL, //4
    METODO //5
}