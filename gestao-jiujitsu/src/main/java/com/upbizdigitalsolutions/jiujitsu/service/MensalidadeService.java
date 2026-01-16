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

    // Roda no dia 1 de cada mês às 01:00 da manhã
    @Scheduled(cron = "0 0 1 1 * *")
    public void gerarMensalidadesAutomaticas() {
        List<Aluno> alunosAtivos = alunoRepository.findAll();
        LocalDate hoje = LocalDate.now();

        for (Aluno aluno : alunosAtivos) {
            // Regra de Ouro: Só cria se não existir mensalidade para este aluno no mês/ano atual
            if (!mensalidadeRepository.existsByAlunoAndMesReferencia(
                    aluno, hoje.getMonthValue(), hoje.getYear())) {

                Mensalidade nova = new Mensalidade();
                nova.setAluno(aluno);
                nova.setStatus("PENDENTE");

                // Busca o preço do plano. Se o aluno não tiver plano, define um valor padrão
                BigDecimal valor = (aluno.getPlano() != null)
                        ? aluno.getPlano().getPreco()
                        : BigDecimal.valueOf(80.00);
                nova.setValor(valor);

                // Define o vencimento com base no dia escolhido no cadastro do aluno
                nova.setDataVencimento(LocalDate.of(hoje.getYear(), hoje.getMonth(), aluno.getDiaVencimento()));

                mensalidadeRepository.save(nova);
            }
        }
        System.out.println("Cron executado: Mensalidades de " + hoje.getMonth() + " geradas!");
    }

    public void testarGeracaoAgora() {
        gerarMensalidadesAutomaticas();
    }
}