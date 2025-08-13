import { Component } from "@angular/core";

@Component({
    selector: 'mi-componente',
    template: `
    <h1>{{titulo}}</h1>
    <p>{{comentario}}</p>
    <p>{{year}}</p>
    `
})
export class MiComponente {
    public titulo:string;
    public comentario: string;
    public year: number;

    constructor(){
        this.titulo = "hola mundo desde el constructor";
        this.comentario = "este es comentario del constructor";
        this.year = 2025;
        console.log("Componente cargado...");
        console.log(this.titulo, this.comentario, this.year);
    }
}