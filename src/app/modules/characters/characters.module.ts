import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from '../characters/characters.component';


@NgModule({
  declarations: [CharactersComponent],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [CharactersComponent]
})
export class CharactersModule { }
