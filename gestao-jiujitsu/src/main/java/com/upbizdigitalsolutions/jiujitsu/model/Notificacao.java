package com.upbizdigitalsolutions.jiujitsu.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "notificacoes_enviadas")
@Data
public class Notificacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Aluno aluno;

    private LocalDate dataEnvio;
    private String status;
}