package com.upbizdigitalsolutions.jiujitsu.repository;

import com.upbizdigitalsolutions.jiujitsu.model.Aluno;
import com.upbizdigitalsolutions.jiujitsu.model.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    // Verifica se já existe um registro para este aluno nesta data
    boolean existsByAlunoAndDataEnvio(Aluno aluno, LocalDate dataEnvio);
}