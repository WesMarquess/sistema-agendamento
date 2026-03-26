package br.com.mulhervirtuosa.mulhervirtuosa.profissional.controller;

import br.com.mulhervirtuosa.mulhervirtuosa.agendamento.model.Agendamento;
import br.com.mulhervirtuosa.mulhervirtuosa.agendamento.repository.AgendamentoRepository;
import br.com.mulhervirtuosa.mulhervirtuosa.profissional.model.Profissional;
import br.com.mulhervirtuosa.mulhervirtuosa.profissional.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profissionais")
@CrossOrigin("*")
public class ProfissionalController {

    @Autowired
    private ProfissionalRepository profRepo;

    @Autowired
    private AgendamentoRepository agendamentoRepo;

    @GetMapping
    public List<Profissional> listar() {
        return profRepo.findAll();
    }

    @PostMapping
    public Profissional criar(@RequestBody Profissional profissional) {
        return profRepo.save(profissional);
    }

    @GetMapping("/meus-agendamentos")
    public ResponseEntity<List<Agendamento>> meusAgendamentos(@RequestParam Long usuarioId) {
        Profissional prof = profRepo.findByUsuarioId(usuarioId);
        if (prof == null) {
            return ResponseEntity.notFound().build();
        }

        List<Agendamento> agendamentos = agendamentoRepo.findByProfissionalId(prof.getId());
        return ResponseEntity.ok(agendamentos);
    }
}