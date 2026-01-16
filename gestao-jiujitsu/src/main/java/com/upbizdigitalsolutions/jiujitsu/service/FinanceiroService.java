package com.upbizdigitalsolutions.jiujitsu.service;

import com.upbizdigitalsolutions.jiujitsu.model.Aluno;
import com.upbizdigitalsolutions.jiujitsu.model.Mensalidade;
import com.upbizdigitalsolutions.jiujitsu.model.Plano;
import com.upbizdigitalsolutions.jiujitsu.repository.MensalidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class FinanceiroService {

    @Autowired
    private MensalidadeRepository mensalidadeRepository;

    public Mensalidade gerarMensalidadeMes(Aluno aluno, Plano plano) {
        Mensalidade m = new Mensalidade();
        m.setAluno(aluno);
        m.setValor(plano.getPreco());

        // Lógica do Dia 15: Vencimento para o dia 15 do próximo mês
        LocalDate vencimento = LocalDate.now().plusMonths(1).withDayOfMonth(15);
        m.setDataVencimento(vencimento);

        m.setStatus("PENDENTE");
        return mensalidadeRepository.save(m);
    }
}
