import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importante para o formulário
import { VeiculoService } from './services/veiculo.service';
import { Veiculo } from './models/veiculo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  veiculos: Veiculo[] = [];
  
  // Objeto para novo veículo
  novoVeiculo: Veiculo = {
    placa: '', chassi: '', renavam: '', modelo: '', marca: '', ano: 2024
  };

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.veiculoService.getVeiculos().subscribe({
      next: (data) => this.veiculos = data,
      error: (e) => console.error(e)
    });
  }

  salvarVeiculo() {
    if(!this.novoVeiculo.placa || !this.novoVeiculo.modelo) {
        alert('Preencha pelo menos Placa e Modelo');
        return;
    }

    this.veiculoService.createVeiculo(this.novoVeiculo).subscribe({
      next: () => {
        alert('Veículo salvo!');
        this.carregarVeiculos();
        // Limpar formulário
        this.novoVeiculo = { placa: '', chassi: '', renavam: '', modelo: '', marca: '', ano: 2024 };
      },
      error: (e) => alert('Erro ao salvar')
    });
  }

  deletarVeiculo(id: number | undefined) {
    if (id && confirm('Tem certeza que deseja excluir?')) {
      this.veiculoService.deleteVeiculo(id).subscribe(() => {
        this.carregarVeiculos();
      });
    }
  }
}