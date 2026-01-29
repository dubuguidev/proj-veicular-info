import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
  ano: number | null;
  chassi: string;
  renavam: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  veiculos: Veiculo[] = [];

  veiculoSelecionadoId: number | null = null;

  novoVeiculo: Omit<Veiculo, 'id'> = {
    placa: '',
    modelo: '',
    marca: '',
    ano: null,
    chassi: '',
    renavam: ''
  };

  salvarVeiculo() {

    if (!this.novoVeiculo.placa || !this.novoVeiculo.modelo) {
      return;
    }

    const novo: Veiculo = {
      id: Date.now(),
      ...this.novoVeiculo
    };

    this.veiculos.push(novo);

    this.resetForm();
  }

  deletarVeiculo(id: number) {
    this.veiculos = this.veiculos.filter(v => v.id !== id);

    if (this.veiculoSelecionadoId === id) {
      this.veiculoSelecionadoId = null;
    }
  }

  toggleInfo(id: number) {
    this.veiculoSelecionadoId =
      this.veiculoSelecionadoId === id ? null : id;
  }

  private resetForm() {
    this.novoVeiculo = {
      placa: '',
      modelo: '',
      marca: '',
      ano: null,
      chassi: '',
      renavam: ''
    };
  }
}
