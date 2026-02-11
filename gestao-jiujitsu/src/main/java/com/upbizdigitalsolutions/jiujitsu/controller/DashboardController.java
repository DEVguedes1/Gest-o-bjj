package com.upbizdigitalsolutions.jiujitsu.controller;

import com.upbizdigitalsolutions.jiujitsu.repository.AlunoRepository;
import com.upbizdigitalsolutions.jiujitsu.repository.MatriculaRepository;
import com.upbizdigitalsolutions.jiujitsu.repository.MensalidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private MensalidadeRepository mensalidadeRepository;

    @Autowired
    private MatriculaRepository matriculaRepository;

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalAlunos = alunoRepository.count();

        // Soma apenas o que realmente entrou no caixa (Status PAGO)
        Double faturamentoReal = mensalidadeRepository.findAll().stream()
                .filter(m -> "PAGO".equalsIgnoreCase(m.getStatus()))
                .mapToDouble(m -> m.getValor().doubleValue())
                .sum();

        stats.put("totalAlunos", totalAlunos);
        stats.put("faturamentoTotal", faturamentoReal);
        // Alunos que não desistiram
        stats.put("ativos", matriculaRepository.countByStatus("ATIVO"));

        return ResponseEntity.ok(stats);
    }
}