import { Simbolo, Tipo } from "./simbolo.interface";

export class Entorno {

    Simbolos: Simbolo[];
    Display: number[];

    constructor(){
        this.Simbolos = [];
        this.Display = [];
        this.Display.push(0);

        this.Simbolos.push({
            id: "p",
            valor: 0,
            tipo: Tipo.NUMERO
        });

        this.Simbolos.push({
            id: "h",
            valor: 0,
            tipo: Tipo.NUMERO
        });

        this.Simbolos.push({
            id: "stack",
            valor: [],
            tipo: Tipo.ARREGLO
        });

        this.Simbolos.push({
            id: "heap",
            valor: [],
            tipo: Tipo.ARREGLO
        });
    }

    addSimbolo(s: Simbolo){
        this.Simbolos.push(s);
    }

    getSimbolo(id: String): Simbolo{
        const elSimbolo = this.Simbolos.find((item) =>{
            return item.id === id;
        }); 
        return elSimbolo;
    }

    getLabel(id: String): Simbolo{

        for(let i = 0; i < this.Simbolos.length; i++){
            let s = this.Simbolos[i];
            if(s.tipo == Tipo.LABEL){
                if(s.id === id){
                    return s;
                }
            }
        }

        return null;
    }

    getTipo(id: String): Tipo{
        const elSimbolo = this.Simbolos.find((item) =>{
            return item.id === id;
        })
        return elSimbolo.tipo;
    }

}