import { Simbolo, Tipo } from "./simbolo.interface";

export class Entorno {

    Simbolos: Simbolo[];

    constructor(){
        this.Simbolos = [];
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

    getTemporal(id: String): Simbolo{
        for(let i = 0; i < this.Simbolos.length; i++){
            let s = this.Simbolos[i];
            if(s.id === id){
                return s;
            }
        }

        return null;
    }

    getIdentificador(id: String): Simbolo{
        for(let i = 0; i < this.Simbolos.length; i++){
            let s = this.Simbolos[i];
            if(s.id === id){
                return s;
            }
        }

        return null;
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

    getMetodo(id: String): Simbolo{

        for(let i = 0; i < this.Simbolos.length; i++){
            let s = this.Simbolos[i];
            if(s.tipo == Tipo.METODO){
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

    Recorrer(){
        for(let i = 0; i < this.Simbolos.length; i++){
            let s = this.Simbolos[i];
            console.log(s.id+': '+s.tipo.toString()+" = "+s.valor);
        }
    }
}