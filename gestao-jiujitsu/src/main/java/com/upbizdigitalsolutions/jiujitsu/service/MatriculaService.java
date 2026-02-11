package com.upbizdigitalsolutions.jiujitsu.service;

import com.upbizdigitalsolutions.jiujitsu.model.*;
import com.upbizdigitalsolutions.jiujitsu.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class MatriculaService {

    @Autowired
    private MatriculaRepository matriculaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private PlanoRepository planoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MensalidadeRepository mensalidadeRepository;

    @Transactional
    public Matricula realizarMatricula(Matricula matricula) {
        // 1. Salva a Matrícula e o Aluno vinculado
        // A matrícula já traz o Plano selecionado do Frontend
        Matricula novaMatricula = matriculaRepository.save(matricula);
        Aluno aluno = novaMatricula.getAluno();

        // 2. CRIAÇÃO DO USUÁRIO (Login)
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(aluno.getNome());
        novoUsuario.setLogin(aluno.getEmail());
        novoUsuario.setEmail(aluno.getEmail());
        novoUsuario.setSenha("123456"); // Senha padrão
        usuarioRepository.save(novoUsuario);

        // 3. GERAÇÃO DA PRIMEIRA MENSALIDADE
        // Baseado no valor do Plano escolhido na matrícula
        Mensalidade primeiraMensalidade = new Mensalidade();
        primeiraMensalidade.setAluno(aluno);
        primeiraMensalidade.setValor(novaMatricula.getPlano().getPreco());
        primeiraMensalidade.setDataVencimento(novaMatricula.getDataMatricula().plusMonths(1));
        primeiraMensalidade.setStatus("PENDENTE");
        mensalidadeRepository.save(primeiraMensalidade);

        return novaMatricula;
    }
}
