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
        // 1. Criar o Aluno com os dados do formulário
        Aluno aluno = new Aluno();
        aluno.setNome((String) payload.get("nome"));
        aluno.setEmail((String) payload.get("email"));
        aluno.setTelefone((String) payload.get("telefone"));
        aluno.setCpf((String) payload.get("cpf"));
        aluno.setFaixa("Branca"); // Padrão inicial

        // Salva o aluno para gerar o ID (Necessário para a matrícula)
        alunoRepository.save(aluno);

        // 2. Extrair o ID do plano (convertendo de Object para Long)
        Long planoId = Long.valueOf(payload.get("planoId").toString());

        // 3. Finalizar a matrícula usando o seu serviço atual
        return matriculaService.realizarMatricula(aluno.getId(), planoId);
    }

}
