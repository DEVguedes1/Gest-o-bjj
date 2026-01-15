package com.upbizdigitalsolutions.jiujitsu.service;

import com.upbizdigitalsolutions.jiujitsu.model.Aluno;
import com.upbizdigitalsolutions.jiujitsu.model.Matricula;
import com.upbizdigitalsolutions.jiujitsu.model.Plano;
import com.upbizdigitalsolutions.jiujitsu.repository.AlunoRepository;
import com.upbizdigitalsolutions.jiujitsu.repository.MatriculaRepository;
import com.upbizdigitalsolutions.jiujitsu.repository.PlanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class MatriculaService {

    @Autowired
    private MatriculaRepository matriculaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private PlanoRepository planoRepository;

    // Arquivo: service/MatriculaService.java
    public Matricula realizarMatricula(Long alunoId, Long planoId) {
        if (alunoId == null || planoId == null) {
            throw new RuntimeException("IDs de aluno ou plano não podem ser nulos");
        }

        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno ID " + alunoId + " não encontrado"));

        Plano plano = planoRepository.findById(planoId)
                .orElseThrow(() -> new RuntimeException("Plano ID " + planoId + " não encontrado"));

        Matricula nova = new Matricula();
        nova.setAluno(aluno);
        nova.setPlano(plano);
        nova.setDataInicio(LocalDate.now());
        nova.setDataFim(LocalDate.now().plusMonths(plano.getDuracaoMeses()));
        nova.setStatus("ATIVA");

        return matriculaRepository.save(nova);
    }
}
