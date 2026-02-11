package com.upbizdigitalsolutions.jiujitsu.controller;

import com.upbizdigitalsolutions.jiujitsu.model.Aluno;
import com.upbizdigitalsolutions.jiujitsu.model.Matricula;
import com.upbizdigitalsolutions.jiujitsu.repository.AlunoRepository;
import com.upbizdigitalsolutions.jiujitsu.service.MatriculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/matriculas")
@CrossOrigin(origins = "*")
public class MatriculaController {

    @Autowired
    private MatriculaService matriculaService;

    @Autowired
    private AlunoRepository alunoRepository;

    @PostMapping
    public Matricula criar(@RequestBody Map<String, Object> payload) {
        try {
            // 1. Criar o Aluno com validação de tipos
            Aluno aluno = new Aluno();
            aluno.setNome((String) payload.get("nome"));
            aluno.setEmail((String) payload.get("email"));
            aluno.setTelefone((String) payload.get("telefone"));
            aluno.setCpf((String) payload.get("cpf"));
            aluno.setSenha((String) payload.get("senha")); // Captura a senha do payload
            aluno.setFaixa("Branca");

            // Garante que o CPF não é nulo antes de salvar
            if (aluno.getCpf() == null || aluno.getCpf().isEmpty()) {
                throw new RuntimeException("CPF é obrigatório");
            }

            alunoRepository.save(aluno);

            // 2. Conversão segura do planoId
            Object planoIdObj = payload.get("planoId");
            if (planoIdObj == null) {
                throw new RuntimeException("ID do plano não enviado");
            }

            Long planoId = Long.valueOf(planoIdObj.toString());

            // 3. Finalizar a matrícula
            return matriculaService.realizarMatricula(aluno.getId(), planoId);
        } catch (Exception e) {
            // Log para você ver o erro real no console do IntelliJ
            System.out.println("Erro na Matrícula: " + e.getMessage());
            throw e;
        }
    }

}
