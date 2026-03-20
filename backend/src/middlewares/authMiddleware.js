const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Busca o token no cabeçalho da requisição
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: "Sem token, autorização negada." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adiciona os dados do usuário na requisição
        next(); // Autorizado! Pode ir para a rota
    } catch (err) {
        res.status(401).json({ msg: "Token inválido." });
    }
};