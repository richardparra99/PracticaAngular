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
        this.titulo = "hola este texto es de mi constructor";
        this.comentario = "esto es editado desde mi contructor porque me enseño erick xd"
        this.year = 2025;
        console.log("mi proyecto con module esta cargando....")
    }
}