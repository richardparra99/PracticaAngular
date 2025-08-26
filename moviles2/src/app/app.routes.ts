import { Routes } from '@angular/router';
import { ComponenteImagen } from './pages/componente-imagen/componente-imagen';
import { DatosPersonales } from './pages/datos-personales/datos-personales';

export const routes: Routes = [
    {
        path: '',
        component: ComponenteImagen
    },
    {
        path: 'formulario',
        component: DatosPersonales
    }
];
