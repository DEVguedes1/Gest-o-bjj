package com.upbizdigitalsolutions.jiujitsu.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;

public class WhatsappService {
    // Substitua pelos seus dados do console Twilio
    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    public void enviarCobranca(String numeroDestino, String nomeAluno) {
        Twilio.init(accountSid, authToken);

        Message message = Message.creator(
                new PhoneNumber("whatsapp:" + numeroDestino), // Ex: +55839...
                new PhoneNumber("whatsapp:+14155238886"),    // Número do Sandbox
                "Oss! " + nomeAluno + ", sua mensalidade da Bruno Caetano BJJ vence hoje (dia 15). 🥋"
        ).create();

        System.out.println("Status da mensagem: " + message.getStatus());
    }
}
