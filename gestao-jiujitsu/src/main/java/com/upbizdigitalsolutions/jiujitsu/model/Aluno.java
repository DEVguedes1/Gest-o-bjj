package com.upbizdigitalsolutions.jiujitsu.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "alunos")
@Data
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(unique = true, nullable = false)
    private String cpf;

    private String email;

    private String telefone;

    @Column(name = "dia_vencimento")
    private Integer diaVencimento;

    private String faixa;

    private LocalDate dataInscricao = LocalDate.now();

    @Column(nullable = false)
    private String senha;

    // Adiciona este campo se ainda não existir
    private String role; // Pode ser "ADMIN" ou "USER"

    @ManyToOne
    @JoinColumn(name = "plano_id")
    private Plano plano;
}
