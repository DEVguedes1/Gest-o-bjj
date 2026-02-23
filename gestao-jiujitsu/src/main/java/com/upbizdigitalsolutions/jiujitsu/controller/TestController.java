package com.upbizdigitalsolutions.jiujitsu.controller;

import com.upbizdigitalsolutions.jiujitsu.service.WhatsappService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
public class TestController {

    @Autowired
    private WhatsappService whatsappService;

    // No arquivo TestController.java
    @GetMapping("/testar-bot")
    public String testarBot(@RequestParam String numero) {
        whatsappService.enviarCobranca(numero, "Aluno Teste", java.math.BigDecimal.valueOf(80.00));
        return "Pedido de envio feito!";
    }
}