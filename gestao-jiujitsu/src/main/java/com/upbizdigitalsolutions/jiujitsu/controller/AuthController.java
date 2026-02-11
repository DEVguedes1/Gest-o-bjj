package com.upbizdigitalsolutions.jiujitsu.controller;

import com.upbizdigitalsolutions.jiujitsu.model.Usuario;
import com.upbizdigitalsolutions.jiujitsu.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) {
        // O campo loginRequest.getLogin() agora pode conter tanto o username quanto o e-mail
        String identificador = loginRequest.getLogin();

        // Tenta buscar primeiro pelo login
        Optional<Usuario> usuarioOpt = usuarioRepository.findByLogin(identificador);

        // Se não encontrar, tenta buscar pelo e-mail
        if (usuarioOpt.isEmpty()) {
            usuarioOpt = usuarioRepository.findByEmail(identificador);
        }

        if (usuarioOpt.isPresent() && usuarioOpt.get().getSenha().equals(loginRequest.getSenha())) {
            Usuario usuario = usuarioOpt.get();
            Map<String, Object> response = new HashMap<>();

            // Dados que o Frontend precisa para não dar tela branca
            response.put("nome", usuario.getNome());
            response.put("login", usuario.getLogin());

            // Lógica de Role baseada no prefixo 'admin.' no login
            String role = (usuario.getLogin() != null && usuario.getLogin().startsWith("admin."))
                    ? "ADMIN" : "ALUNO";
            response.put("role", role);

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário/E-mail ou senha incorretos");
    }
}