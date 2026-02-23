package com.upbizdigitalsolutions.jiujitsu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service
public class NotificacaoService {

    @Autowired
    private WhatsappService whatsappService;

    public void enviarNotificacaoMatricula(String telefone, String nome) {
        String mensagem = "Oss " + nome + "! Sua matrícula na Bruno Caetano BJJ foi confirmada. 🥋";

        // Passamos BigDecimal.ZERO para corrigir o erro de compilação,
        // já que o método agora exige um valor.
        whatsappService.enviarCobranca(telefone, nome, BigDecimal.ZERO);
    }
}