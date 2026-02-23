package com.upbizdigitalsolutions.jiujitsu.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class WhatsappService {
    private final String BOT_URL = "http://localhost:3001/send-message";
    private final RestTemplate restTemplate = new RestTemplate();

    // Chave Pix da Academia (Substitua pela real)
    private final String CHAVE_PIX = "suachavepix@email.com";

    public void enviarCobranca(String numeroDestino, String nomeAluno, BigDecimal valor) {
        try {
            String numeroLimpo = numeroDestino.replaceAll("[^0-9]", "");
            if (numeroLimpo.length() <= 11) numeroLimpo = "55" + numeroLimpo;

            // Opção A: Formatação Profissional
            // Opção B: Dados para o Pix
            StringBuilder sb = new StringBuilder();
            sb.append("*SISTEMA BRUNO CAETANO BJJ* 🥋\n\n");
            sb.append("Olá, *").append(nomeAluno).append("*!\n\n");
            sb.append("Lembramos que sua mensalidade vence hoje.\n");
            sb.append("💰 *Valor:* R$ ").append(String.format("%.2f", valor)).append("\n\n");
            sb.append("Para facilitar, use nossa chave Pix abaixo:\n");
            sb.append("🔑 *Chave:* ").append(CHAVE_PIX).append("\n\n");
            sb.append("_Após o pagamento, envie o comprovante por aqui._\n");
            sb.append("Oss! 💪");

            Map<String, String> body = new HashMap<>();
            body.put("number", numeroLimpo);
            body.put("message", sb.toString());

            restTemplate.postForEntity(BOT_URL, body, String.class);
            System.out.println("✅ Cobrança formatada enviada para: " + nomeAluno);

        } catch (Exception e) {
            System.err.println("❌ Erro ao enviar mensagem formatada: " + e.getMessage());
        }
    }
}