package com.upbizdigitalsolutions.jiujitsu.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import com.upbizdigitalsolutions.jiujitsu.model.Mensalidade;
import com.upbizdigitalsolutions.jiujitsu.model.Notificacao;
import com.upbizdigitalsolutions.jiujitsu.repository.AlunoRepository;
import com.upbizdigitalsolutions.jiujitsu.model.Aluno;
import com.upbizdigitalsolutions.jiujitsu.repository.MensalidadeRepository;
import com.upbizdigitalsolutions.jiujitsu.repository.NotificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotificacaoService {

    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private NotificacaoRepository notificacaoRepository;
    @Autowired
    private MensalidadeRepository mensalidadeRepository;

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.sandbox.number}")
    private String numeroSandbox;

    // 1. O AGENDADOR (Roda sozinho todo dia)
    @Scheduled(cron = "0 0 9 * * *")
    public void verificarCobrancasAgendadas() {
        executarLogicaDeCobranca(LocalDate.now());
    }

    // 2. O TESTE MANUAL (O que você chama pelo Controller)
    public void verificarCobrancasManual() {
        // Forçamos o dia 16 para o seu teste de hoje funcionar
        executarLogicaDeCobranca(LocalDate.now());
    }

    // 3. A LÓGICA CENTRALIZADA (O "Coração" do Service)
    private void executarLogicaDeCobranca(LocalDate data) {
        System.out.println("Iniciando processamento de cobranças para a data: " + data);

        // Busca mensalidades PENDENTES que vencem na data informada
        List<Mensalidade> pendentes = mensalidadeRepository.findByDataVencimentoAndStatus(data, "PENDENTE");

        for (Mensalidade mensalidade : pendentes) {
            Aluno aluno = mensalidade.getAluno();

            // Verifica se já não enviamos hoje para este aluno
            if (!notificacaoRepository.existsByAlunoAndDataEnvio(aluno, data)) {
                try {
                    dispararTwilio(aluno.getTelefone(), aluno.getNome());
                    registrarNotificacao(aluno, data);
                    System.out.println("Sucesso para: " + aluno.getNome());
                } catch (Exception e) {
                    System.err.println("Erro ao processar " + aluno.getNome() + ": " + e.getMessage());
                }
            } else {
                System.out.println("Aluno " + aluno.getNome() + " já foi notificado hoje. Pulando.");
            }
        }
    }

    private void dispararTwilio(String telefoneDestino, String nomeAluno) {
        Twilio.init(accountSid, authToken);

        String corpoMensagem = "Oss, " + nomeAluno + "! 🥋 Sua mensalidade da Bruno Caetano BJJ vence hoje. " +
                "Garanta sua presença nos treinos mantendo o pagamento em dia!";

        Message.creator(
                new PhoneNumber("whatsapp:" + telefoneDestino),
                new PhoneNumber(numeroSandbox),
                corpoMensagem
        ).create();
    }

    private void registrarNotificacao(Aluno aluno, LocalDate data) {
        Notificacao registro = new Notificacao();
        registro.setAluno(aluno);
        registro.setDataEnvio(data);
        registro.setStatus("SUCESSO");
        notificacaoRepository.save(registro);
    }
}