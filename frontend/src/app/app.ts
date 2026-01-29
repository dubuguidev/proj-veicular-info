import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  veiculos: any[] = [];

  novoVeiculo = {
    placa: '',
    modelo: '',
    marca: '',
    ano: null,
    chassi: '',
    renavam: ''
  };

  salvarVeiculo() {
    const novo = {
      id: Date.now(),
      ...this.novoVeiculo
    };

    this.veiculos.push(novo);

    this.novoVeiculo = {
      placa: '',
      modelo: '',
      marca: '',
      ano: null,
      chassi: '',
      renavam: ''
    };
  }

  deletarVeiculo(id: number) {
    this.veiculos = this.veiculos.filter(v => v.id !== id);
  }
}
