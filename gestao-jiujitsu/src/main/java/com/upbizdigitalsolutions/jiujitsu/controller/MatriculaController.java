package com.upbizdigitalsolutions.jiujitsu.controller;

import com.upbizdigitalsolutions.jiujitsu.model.Matricula;
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

    @PostMapping
    public Matricula criar(@RequestBody Map<String, Long> payload) {
        // Recebe um JSON como {"alunoId": 1, "planoId": 2}
        return matriculaService.realizarMatricula(
                payload.get("alunoId"),
                payload.get("planoId")
        );
    }
}
