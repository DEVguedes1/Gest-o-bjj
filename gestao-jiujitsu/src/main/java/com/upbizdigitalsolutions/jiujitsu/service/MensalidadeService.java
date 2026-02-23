package com.upbizdigitalsolutions.jiujitsu.service;

import com.upbizdigitalsolutions.jiujitsu.model.Aluno;
import com.upbizdigitalsolutions.jiujitsu.model.Mensalidade;
import com.upbizdigitalsolutions.jiujitsu.repository.AlunoRepository;
import com.upbizdigitalsolutions.jiujitsu.repository.MensalidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class MensalidadeService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private MensalidadeRepository mensalidadeRepository;

    @Autowired
    private WhatsappService whatsappService;

    @Scheduled(cron = "0 0 1 1 * *")
    public void gerarMensalidadesAutomaticas() {
        List<Aluno> alunosAtivos = alunoRepository.findAll();
        LocalDate hoje = LocalDate.now();

        for (Aluno aluno : alunosAtivos) {
            if (!mensalidadeRepository.existsByAlunoAndMesReferencia(
                    aluno, hoje.getMonthValue(), hoje.getYear())) {

                Mensalidade nova = new Mensalidade();
                nova.setAluno(aluno);
                nova.setStatus("PENDENTE");

                BigDecimal valor = (aluno.getPlano() != null)
                        ? aluno.getPlano().getPreco()
                        : BigDecimal.valueOf(80.00);
                nova.setValor(valor);

                nova.setDataVencimento(LocalDate.of(hoje.getYear(), hoje.getMonth(), aluno.getDiaVencimento()));

                mensalidadeRepository.save(nova);

                if (aluno.getTelefone() != null && !aluno.getTelefone().isEmpty()) {
                    whatsappService.enviarCobranca(aluno.getTelefone(), aluno.getNome(), nova.getValor());
                }
            }
        }
        System.out.println("Mensalidades geradas!");
    }

    @Scheduled(cron = "0 0 9 * * *")
    public void notificarVencimentosHoje() {
        LocalDate hoje = LocalDate.now();
        // Busca as mensalidades que vencem hoje
        List<Mensalidade> pendentes = mensalidadeRepository.findByDataVencimentoAndStatus(hoje, "PENDENTE");

        for (Mensalidade m : pendentes) {
            // CORREÇÃO: Usar o objeto 'm' do loop para pegar o aluno e o valor
            BigDecimal valor = m.getValor();
            Aluno aluno = m.getAluno();

            if (aluno.getTelefone() != null) {
                whatsappService.enviarCobranca(aluno.getTelefone(), aluno.getNome(), valor);
            }
        }
    }

    public void testarGeracaoAgora() {
        gerarMensalidadesAutomaticas();
    }
}