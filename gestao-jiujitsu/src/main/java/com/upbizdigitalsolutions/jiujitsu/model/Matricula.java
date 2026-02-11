package com.upbizdigitalsolutions.jiujitsu.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "matriculas")
@Data
public class Matricula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "aluno_id",nullable = false)
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "plano_id",nullable = false)
    private Plano plano;

    private LocalDate dataInicio = LocalDate.now();
    private LocalDate dataFim;
    private String status = "ATIVA";

    public LocalDate getDataMatricula() {
        return dataInicio;
    }
}
