import { Component } from "@angular/core";

@Component({
    selector: 'mi-componente',
    templateUrl: './mi-componente.component.html'
})
export class MiComponente{
    public titulo?: string;
    public comentario?: string;
    public year?: number;

    constructor(){
        this.titulo = "hola mundo desde mi constructor"
        this.comentario = "hijita me esta ayudando pasar web 2";
        this.year = 2025;
        console.log("mi componente esta cargado.....");
    }
}