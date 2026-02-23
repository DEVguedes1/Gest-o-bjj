package com.upbizdigitalsolutions.jiujitsu;

import com.upbizdigitalsolutions.jiujitsu.model.Usuario;
import com.upbizdigitalsolutions.jiujitsu.repository.UsuarioRepository;
import com.upbizdigitalsolutions.jiujitsu.service.MatriculaService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GestaoJiujitsuApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestaoJiujitsuApplication.class, args);
	}


}
