package com.upbizdigitalsolutions.jiujitsu.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "planos")
@Data
public class Plano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(name = "treinos_semana")
    private Integer treinosSemana;

    private BigDecimal preco;

    @Column(name = "duracao_meses")
    private Integer duracaoMeses;

    private String status;

    @OneToMany(mappedBy = "plano")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Aluno> alunos;
}
