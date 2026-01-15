package com.upbizdigitalsolutions.jiujitsu.service;

import com.upbizdigitalsolutions.jiujitsu.model.Plano;
import com.upbizdigitalsolutions.jiujitsu.repository.PlanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanoService {

    @Autowired
    private PlanoRepository planoRepository;

    public List<Plano> listarTodos(){
        return planoRepository.findAll();
    }

    public Plano salvar(Plano plano) {

        return planoRepository.save(plano);
    }
}
