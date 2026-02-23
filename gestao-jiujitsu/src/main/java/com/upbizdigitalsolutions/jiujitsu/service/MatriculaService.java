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
    private WhatsappService whatsappService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MensalidadeRepository mensalidadeRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Transactional
    public Matricula realizarMatricula(Matricula matricula) {
        // 1. Salva o Aluno (isso gera o ID e salva CPF/Senha no banco)
        Aluno alunoSalvo = alunoRepository.save(matricula.getAluno());

        // 2. Cria o Usuário para login no sistema
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(alunoSalvo.getNome());
        novoUsuario.setLogin(alunoSalvo.getEmail()); // Login será o e-mail
        novoUsuario.setEmail(alunoSalvo.getEmail());
        novoUsuario.setSenha(alunoSalvo.getSenha());
        novoUsuario.setCargo("ALUNO");
        usuarioRepository.save(novoUsuario);

        // 3. Salva a Matrícula vinculada ao aluno salvo
        matricula.setAluno(alunoSalvo);
        Matricula novaMatricula = matriculaRepository.save(matricula);

        // 4. Mensalidade e WhatsApp
        Mensalidade primeira = new Mensalidade();
        primeira.setAluno(alunoSalvo);
        primeira.setValor(novaMatricula.getPlano().getPreco());
        primeira.setDataVencimento(LocalDate.now().plusMonths(1));
        primeira.setStatus("PENDENTE");
        mensalidadeRepository.save(primeira);

        whatsappService.enviarCobranca(
                alunoSalvo.getTelefone(),
                alunoSalvo.getNome(),
                novaMatricula.getPlano().getPreco()
        );

        return novaMatricula;
    }
}
