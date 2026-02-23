const express = require('express');
const app = express();
app.use(express.json());

function setupServer(sock) {
    app.post('/send-message', async (req, res) => {
        const { number, message } = req.body;
        
        if (!number || !message) {
            return res.status(400).json({ error: "Número ou mensagem ausentes" });
        }

        try {
            // 1. Limpa o número: remove tudo que não é dígito
            const cleanNumber = number.replace(/\D/g, '');
            
            // 2. Formata para o JID do WhatsApp
            const jid = `${cleanNumber}@s.whatsapp.net`;
            
            console.log(`[Bot] Tentando enviar para: ${jid}`);

            // 3. Envia a mensagem
            const sentMsg = await sock.sendMessage(jid, { text: message });
            
            // Retorna sucesso sem tentar ler propriedades profundas de sentMsg
            res.status(200).json({ status: 'success', messageId: sentMsg?.key?.id || 'enviado' });
        } catch (error) {
            console.error("[Bot Error]", error);
            res.status(500).json({ error: error.message });
        }
    });

    app.listen(3001, () => console.log('🚀 API do Bot ativa na porta 3001'));
}

module.exports = setupServer;