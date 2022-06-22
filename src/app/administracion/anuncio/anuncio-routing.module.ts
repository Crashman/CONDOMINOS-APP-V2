import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnuncioComponent } from './anuncio.component';

const routes: Routes = [
    {
        path: '',
        component: AnuncioComponent,
        data: {
            title: 'Anuncios',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnuncioRoutingModule {
}
