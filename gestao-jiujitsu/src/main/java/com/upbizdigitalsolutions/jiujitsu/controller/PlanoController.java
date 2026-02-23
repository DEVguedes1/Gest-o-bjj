package com.upbizdigitalsolutions.jiujitsu.controller;

import com.upbizdigitalsolutions.jiujitsu.model.Aluno;
import com.upbizdigitalsolutions.jiujitsu.model.Plano;
import com.upbizdigitalsolutions.jiujitsu.repository.PlanoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planos")
@CrossOrigin(origins = "*")
public class PlanoController {

    @Autowired
    private PlanoRepository planoRepository;

    @GetMapping
    public List<Plano> listarTodos(){
        return planoRepository.findAll();
    }

    @PostMapping
    public Plano salvar(@RequestBody Plano plano) {
        // O Spring vai mapear automaticamente 'nome', 'valor' e 'qtdTreinos' do JSON
        return planoRepository.save(plano);
    }

    @DeleteMapping("/{id}")
    @Transactional // IMPORTANTE: Adicione esta anotação do Spring
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            Plano plano = planoRepository.findById(id).orElse(null);
            if (plano == null) {
                return ResponseEntity.notFound().build();
            }

            // PASSO 1: Desvincular alunos antes de apagar
            if (plano.getAlunos() != null) {
                for (Aluno aluno : plano.getAlunos()) {
                    aluno.setPlano(null); // Tira o plano do aluno mas mantém o aluno no banco
                }
            }

            // PASSO 2: Agora que as referências foram limpas, apaga o plano
            planoRepository.delete(plano);

            return ResponseEntity.ok().body("{\"message\": \"Plano apagado com sucesso\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"error\": \"Erro ao apagar: existem matrículas ou registros financeiros vinculados a este plano no banco de dados.\"}");
        }
    }
}