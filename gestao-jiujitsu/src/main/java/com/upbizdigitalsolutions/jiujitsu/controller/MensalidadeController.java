package com.upbizdigitalsolutions.jiujitsu.controller;

import com.upbizdigitalsolutions.jiujitsu.model.Mensalidade;
import com.upbizdigitalsolutions.jiujitsu.repository.MensalidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/mensalidades")
@CrossOrigin(origins = "*") // Permite que o seu React (porta 5173) acesse o Java
public class MensalidadeController {

    @Autowired
    private MensalidadeRepository mensalidadeRepository;

    // Lista todas as mensalidades para o Dashboard
    @GetMapping
    public List<Mensalidade> listarTodas() {
        return mensalidadeRepository.findAll();
    }

    // Endpoint para o professor dar "Baixa" no pagamento
    @PutMapping("/{id}/pagar")
    public ResponseEntity<Mensalidade> marcarComoPago(@PathVariable Long id) {
        return mensalidadeRepository.findById(id).map(mensalidade -> {
            mensalidade.setStatus("PAGO");
            mensalidade.setDataPagamento(LocalDate.now()); // Registra o dia do recebimento
            Mensalidade atualizada = mensalidadeRepository.save(mensalidade);
            return ResponseEntity.ok(atualizada);
        }).orElse(ResponseEntity.notFound().build());
    }
}
