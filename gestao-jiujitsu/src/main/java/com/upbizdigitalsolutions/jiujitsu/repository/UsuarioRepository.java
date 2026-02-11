package com.upbizdigitalsolutions.jiujitsu.repository;

import com.upbizdigitalsolutions.jiujitsu.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByLogin(String login);
    Optional<Usuario> findByEmail(String email);
}