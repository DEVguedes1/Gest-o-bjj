package com.upbizdigitalsolutions.jiujitsu.controller;

import com.upbizdigitalsolutions.jiujitsu.model.Plano;
import com.upbizdigitalsolutions.jiujitsu.repository.PlanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        return planoRepository.save(plano);
    }

}
