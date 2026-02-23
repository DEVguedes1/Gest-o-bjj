package com.upbizdigitalsolutions.jiujitsu.controller;

import com.upbizdigitalsolutions.jiujitsu.dto.MatriculaDTO;
import com.upbizdigitalsolutions.jiujitsu.model.Aluno;
import com.upbizdigitalsolutions.jiujitsu.model.Matricula;
import com.upbizdigitalsolutions.jiujitsu.model.Plano;
import com.upbizdigitalsolutions.jiujitsu.repository.AlunoRepository;
import com.upbizdigitalsolutions.jiujitsu.repository.PlanoRepository;
import com.upbizdigitalsolutions.jiujitsu.service.MatriculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/matriculas")
@CrossOrigin(origins = "*")
public class MatriculaController {

    @Autowired
    private MatriculaService matriculaService;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private PlanoRepository planoRepository;

    @PostMapping
    public ResponseEntity<Matricula> realizarMatricula(@RequestBody MatriculaDTO dto) {
        // 1. Busca o plano escolhido
        Plano planoSelecionado = planoRepository.findById(dto.getPlanoId())
                .orElseThrow(() -> new RuntimeException("Plano não encontrado"));

        // 2. Cria o Aluno com os dados do formulário
        Aluno novoAluno = new Aluno();
        novoAluno.setNome(dto.getNome());
        novoAluno.setCpf(dto.getCpf());
        novoAluno.setEmail(dto.getEmail());
        novoAluno.setTelefone(dto.getTelefone());
        novoAluno.setSenha(dto.getSenha()); // Salvando a senha no aluno
        novoAluno.setDiaVencimento(dto.getDiaVencimento());
        novoAluno.setFaixa("BRANCA");      // Definindo faixa inicial
        novoAluno.setRole("USER");         // Cargo no modelo Aluno
        novoAluno.setPlano(planoSelecionado);

        // 3. Monta a Matrícula
        Matricula matricula = new Matricula();
        matricula.setAluno(novoAluno);
        matricula.setPlano(planoSelecionado);
        matricula.setDataMatricula(LocalDate.now());

        return ResponseEntity.ok(matriculaService.realizarMatricula(matricula));
    }
}
