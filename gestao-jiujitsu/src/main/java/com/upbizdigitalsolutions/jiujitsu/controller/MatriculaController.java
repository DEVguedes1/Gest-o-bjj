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
        // 1. Validação de IDs
        if (dto.getAlunoId() == null || dto.getPlanoId() == null) {
            return ResponseEntity.badRequest().build();
        }

        // 2. Busca o aluno e o plano (Primeira definição de 'aluno')
        // Se você já buscou aqui, não precisa declarar novamente depois
        Aluno alunoExistente = alunoRepository.findById(dto.getAlunoId())
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        Plano planoSelecionado = planoRepository.findById(dto.getPlanoId())
                .orElseThrow(() -> new RuntimeException("Plano não encontrado"));

        // 3. Monta o objeto matrícula
        Matricula matricula = new Matricula();
        matricula.setAluno(alunoExistente);
        matricula.setPlano(planoSelecionado);
        matricula.setDataMatricula(LocalDate.now());

        // 4. Chama o serviço (que já deve estar corrigido para receber o objeto Matricula)
        return ResponseEntity.ok(matriculaService.realizarMatricula(matricula));
    }
}
