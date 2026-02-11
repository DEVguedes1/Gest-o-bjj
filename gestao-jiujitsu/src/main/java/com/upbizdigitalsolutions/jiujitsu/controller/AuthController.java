package com.upbizdigitalsolutions.jiujitsu.controller;

import com.upbizdigitalsolutions.jiujitsu.model.Aluno;
import com.upbizdigitalsolutions.jiujitsu.model.Usuario;
import com.upbizdigitalsolutions.jiujitsu.repository.AlunoRepository;
import com.upbizdigitalsolutions.jiujitsu.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Permite a comunicação com o React
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String login = credentials.get("login"); // Pode ser e-mail ou CPF
        String senha = credentials.get("senha");

        // 1. Tenta buscar na tabela de Administradores
        Optional<Usuario> admin = usuarioRepository.findByLogin(login);
        if (admin.isPresent() && admin.get().getSenha().equals(senha)) {
            return ResponseEntity.ok(Map.of(
                    "role", "ADMIN",
                    "nome", admin.get().getNome(),
                    "token", "token-sessao-admin"
            ));
        }

        // 2. Se não for admin, tenta buscar na tabela de Alunos (por e-mail)
        // Certifica-te que adicionaste o findByEmail no AlunoRepository
        Optional<Aluno> aluno = alunoRepository.findByEmail(login);
        if (aluno.isPresent() && aluno.get().getSenha().equals(senha)) {
            return ResponseEntity.ok(Map.of(
                    "role", "ALUNO",
                    "nome", aluno.get().getNome(),
                    "token", "token-sessao-aluno",
                    "id", aluno.get().getId() // Importante para o aluno ver os seus dados
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }
}