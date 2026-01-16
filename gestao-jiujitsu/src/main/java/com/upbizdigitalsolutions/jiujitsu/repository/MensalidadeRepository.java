package com.upbizdigitalsolutions.jiujitsu.repository;

import com.upbizdigitalsolutions.jiujitsu.model.Aluno;
import com.upbizdigitalsolutions.jiujitsu.model.Mensalidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MensalidadeRepository extends JpaRepository<Mensalidade, Long> {

    // Busca mensalidades por data e status (Ex: Hoje + PENDENTE)
    List<Mensalidade> findByDataVencimentoAndStatus(LocalDate data, String status);

    // Verifica se o aluno já tem mensalidade gerada para um mês/ano específico
    @Query("SELECT COUNT(m) > 0 FROM Mensalidade m WHERE m.aluno = :aluno " +
            "AND MONTH(m.dataVencimento) = :mes AND YEAR(m.dataVencimento) = :ano")
    boolean existsByAlunoAndMesReferencia(
            @Param("aluno") Aluno aluno,
            @Param("mes") int mes,
            @Param("ano") int ano
    );
}
