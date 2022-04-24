import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-strength-bar',
  templateUrl: './strength-bar.component.html',
  styleUrls: ['./strength-bar.component.scss'],
})
export class StrengthBarComponent implements OnInit {
  @Input() controller: AbstractControl | null = null;

  private readonly COLORS = {
    default: 'black',
    empty: 'grey',
    error: 'red',
    warning: 'orange',
    moderate: '#EACE09',
    almostCorrect: 'MediumSeaGreen',
    correct: 'green',
  };

  private readonly OPTIONS = {
    empty: {
      message: '',
      color: this.COLORS.empty,
      styles: [this.COLORS.empty, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty],
    },
    veryWeak: {
      message: 'La contraseña es muy debil',
      color: this.COLORS.error,
      styles: [this.COLORS.error, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty],
    },
    weak: {
      message: 'Débil',
      color: this.COLORS.warning,
      styles: [this.COLORS.warning, this.COLORS.warning, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty],
    },
    moderate: {
      message: 'Moderada',
      color: this.COLORS.moderate,
      styles: [this.COLORS.moderate, this.COLORS.moderate, this.COLORS.moderate, this.COLORS.empty, this.COLORS.empty],
    },
    strong: {
      message: 'Fuerte',
      color: this.COLORS.almostCorrect,
      styles: [this.COLORS.almostCorrect, this.COLORS.almostCorrect, this.COLORS.almostCorrect, this.COLORS.almostCorrect, this.COLORS.empty],
    },
    correct: {
      message: 'Segura',
      color: this.COLORS.correct,
      styles: [this.COLORS.correct, this.COLORS.correct, this.COLORS.correct, this.COLORS.correct, this.COLORS.correct],
    },
  };

  message: string = this.OPTIONS.empty.message;
  styles: string[] = this.OPTIONS.empty.styles;
  color: string = this.OPTIONS.empty.color;
  minus = ['a','b','c','d',]

  constructor() {}

  ngOnInit(): void {
    if (!!this.controller) {
      this.controller.valueChanges.subscribe((password: string) => {
        let fortaleza = 0;
        if(this.hasLetters(password)){
          fortaleza += 1;
        }
        if(this.hasUpperLower(password)){
          fortaleza += 2;
        }
        if(this.hasNumbers(password)){
          fortaleza += 1;
        }
        if(this.hasSymbols(password)){
          fortaleza += 2;
        }
        if(this.hasEveryProperty(password)){
          fortaleza += 1;
        }

        if(password.length === 7 || password.length ===8){
          fortaleza += 1;
        }
        else if(password.length >= 9 && password.length <=12){
          fortaleza += 2;
        }
        else if(password.length>12){
          fortaleza += 3;
        }

        this.refreshBar(fortaleza);

      });
    }
  }

  getBackground(color: string) {
    return { 'background-color': color };
  }
  hasLetters(pass:string){
    return /[a-zA-Z]/.test(pass);
  }
  hasUpperLower(pass:string){
    return /[a-z]/.test(pass) && /[A-Z]/.test(pass);
  }
  hasNumbers(pass:string){
    return /[0-9]/.test(pass);
  }
  hasSymbols(pass:string){
    return /[$-/:-?{-~!"^_`\[\]]/.test(pass);
  }
  hasEveryProperty(pass:string){
    return this.hasLetters(pass) && this.hasNumbers(pass) && this.hasUpperLower(pass) && this.hasSymbols(pass);
  }

  refreshBar(fortaleza:number){
    if (fortaleza===0) {
      this.color = this.OPTIONS.empty.color;
      this.message = this.OPTIONS.empty.message;
      this.styles = this.OPTIONS.empty.styles;
    } else if (fortaleza===1 || fortaleza===2) {
      this.color = this.OPTIONS.veryWeak.color;
      this.message = this.OPTIONS.veryWeak.message;
      this.styles = this.OPTIONS.veryWeak.styles;
    } else if (fortaleza >= 3 && fortaleza < 5) {
      this.color = this.OPTIONS.weak.color;
      this.message = this.OPTIONS.weak.message;
      this.styles = this.OPTIONS.weak.styles;
    } else if (fortaleza >= 5 && fortaleza < 7) {
      this.color = this.OPTIONS.moderate.color;
      this.message = this.OPTIONS.moderate.message;
      this.styles = this.OPTIONS.moderate.styles;
    }else if (fortaleza === 8 || fortaleza === 9) {
      this.color = this.OPTIONS.strong.color;
      this.message = this.OPTIONS.strong.message;
      this.styles = this.OPTIONS.strong.styles;
    }else if (fortaleza === 10) {
      this.color = this.OPTIONS.correct.color;
      this.message = this.OPTIONS.correct.message;
      this.styles = this.OPTIONS.correct.styles;
    }

  }
}
