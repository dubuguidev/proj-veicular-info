const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'vehicles.json');

app.use(cors());
app.use(bodyParser.json());

// Ler dados
const readData = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data || '[]');
    } catch (err) {
        return [];
    }
};

// Salvar dados
const saveData = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// READ (Listar todos)
app.get('/veiculos', (req, res) => {
    const vehicles = readData();
    res.json(vehicles);
});

// CREATE (Criar novo)
app.post('/veiculos', (req, res) => {
    const vehicles = readData();
    const newVehicle = req.body;
    
    // Gera ID simples baseado no timestamp se não vier
    newVehicle.id = newVehicle.id || Date.now(); 
    
    vehicles.push(newVehicle);
    saveData(vehicles);
    res.status(201).json(newVehicle);
});

// UPDATE (Atualizar)
app.put('/veiculos/:id', (req, res) => {
    const vehicles = readData();
    const id = parseInt(req.params.id);
    const index = vehicles.findIndex(v => v.id === id);

    if (index !== -1) {
        vehicles[index] = { ...vehicles[index], ...req.body, id: id };
        saveData(vehicles);
        res.json(vehicles[index]);
    } else {
        res.status(404).json({ message: 'Veículo não encontrado' });
    }
});

// DELETE (Remover)
app.delete('/veiculos/:id', (req, res) => {
    let vehicles = readData();
    const id = parseInt(req.params.id);
    const initialLength = vehicles.length;
    
    vehicles = vehicles.filter(v => v.id !== id);

    if (vehicles.length < initialLength) {
        saveData(vehicles);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Veículo não encontrado' });
    }
});

// Exporta app para testes e inicia servidor se não for teste
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}

module.exports = app;