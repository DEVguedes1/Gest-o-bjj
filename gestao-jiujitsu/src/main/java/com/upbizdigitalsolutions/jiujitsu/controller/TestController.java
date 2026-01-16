package com.upbizdigitalsolutions.jiujitsu.controller;

import com.upbizdigitalsolutions.jiujitsu.service.MensalidadeService;
import com.upbizdigitalsolutions.jiujitsu.service.NotificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/teste")
public class TestController {

    @Autowired
    private NotificacaoService notificacaoService;

    @Autowired
    private MensalidadeService mensalidadeService;

    // Testa o envio do WhatsApp (o que já validamos com Twilio)
    @GetMapping("/whatsapp")
    public String testarEnvio() {
        notificacaoService.verificarCobrancasManual();
        return "Processo de envio iniciado! Verifique o console e seu WhatsApp.";
    }

    // Testa a geração de mensalidades no MySQL (o que estamos automatizando agora)
    @GetMapping("/gerar-mensalidades")
    public String dispararGeracao() {
        try {
            mensalidadeService.testarGeracaoAgora();
            return "Geração de mensalidades concluída! Verifique a tabela no MySQL.";
        } catch (Exception e) {
            return "Erro ao gerar mensalidades: " + e.getMessage();
        }
    }
}