import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  
  forma: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'nombre': ['', [Validators.required, this.spacesValidator]],
      'apellido': ['', [Validators.required]],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'sexo': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'terminos': ['', [Validators.required]]
    });
  }

  Aceptar(){
    console.log(this.forma);
  }

  private spacesValidator(control: AbstractControl): null | object{
    const nombre = <string>control.value;
    const espacios = nombre.includes(' ');

    if(espacios){
      return {
        contieneEspacios: true
      };
    }
    else{
        return null;
    }
  }
}
