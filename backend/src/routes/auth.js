const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ROTA DE REGISTRO (Cadastro)
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha, cargo } = req.body;

        // 1. Verifica se os campos chegaram
        if (!nome || !email || !senha || !cargo) {
            return res.status(400).json({ msg: "Preencha todos os campos!" });
        }

        // 2. Verifica se o e-mail já existe
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "E-mail já cadastrado." });

        // 3. Criptografa a senha (Segurança)
        const salt = await bcrypt.genSalt(10);
        const hashedSenha = await bcrypt.hash(senha, salt);

        // 4. Salva no Banco
        user = new User({
            nome,
            email,
            senha: hashedSenha,
            cargo
        });

        await user.save();
        res.status(201).json({ msg: "Usuário criado com sucesso!" });

    } catch (err) {
        console.error("ERRO NO REGISTRO:", err);
        res.status(500).json({ msg: "Erro interno no servidor ao cadastrar." });
    }
});

// ROTA DE LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // 1. Busca o usuário
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Usuário não encontrado." });

        // 2. Compara a senha digitada com a criptografada no banco
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) return res.status(400).json({ msg: "Senha incorreta." });

        // 3. Gera o Token (Use uma string fixa se não tiver .env configurado)
        const secret = process.env.JWT_SECRET || 'CHAVE_MESTRA_CLINICA_123';
        const token = jwt.sign(
            { id: user._id, cargo: user.cargo }, 
            secret, 
            { expiresIn: '1d' }
        );

        res.json({ 
            token, 
            user: { id: user._id, nome: user.nome, cargo: user.cargo } 
        });

    } catch (err) {
        console.error("ERRO NO LOGIN:", err);
        res.status(500).json({ msg: "Erro interno no servidor ao logar." });
    }
});

module.exports = router;