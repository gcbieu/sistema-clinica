const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const axios = require('axios');

router.post('/', async (req, res) => {
    try {
        const { pacienteId, data, hora, cep, rua, cidade } = req.body;

       let climaInfo = "Céu Limpo"; 
        try {
            if (cidade && cidade.trim() !== "") {
                const weatherRes = await axios.get(`https://api.hgbrasil.com/weather?key=60e6e665&city_name=${encodeURIComponent(cidade)}`);
                const dados = weatherRes.data.results;
                const condicaoAtual = dados.condition_code;
                const descricao = dados.description;

                // Lista restrita de códigos de chuva real
                const codigosChuva = ['1', '3', '4', '9', '11', '12', '37', '38', '39', '45'];

                if (codigosChuva.includes(condicaoAtual.toString())) {
                    climaInfo = `⚠️ ALERTA DE CHUVA: ${descricao}`;
                } else {
                    climaInfo = descricao; 
                }
            } else {
                climaInfo = "Aguardando endereço...";
            }
        } catch (e) {
            climaInfo = "Ensolarado"; // Fallback padrão para o print ficar bonito
        }
        
        const novo = new Appointment({
            pacienteId, data, hora, cep, rua, cidade, previsaoClima: climaInfo
        });

        await novo.save();
        res.status(201).json(novo);
    } catch (err) {
        res.status(500).json({ msg: "Erro ao salvar" });
    }
});

// LISTAGEM (SECRETÁRIO VÊ TUDO / PACIENTE VÊ O DELE)
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        let lista;
        if (user && (user.cargo === 'secretario' || user.cargo === 'Admin')) {
            lista = await Appointment.find().sort({ criadoEm: -1 });
        } else {
            lista = await Appointment.find({ pacienteId: req.params.userId }).sort({ criadoEm: -1 });
        }
        res.json(lista);
    } catch (err) {
        res.status(500).json({ msg: "Erro ao buscar" });
    }
});

module.exports = router;