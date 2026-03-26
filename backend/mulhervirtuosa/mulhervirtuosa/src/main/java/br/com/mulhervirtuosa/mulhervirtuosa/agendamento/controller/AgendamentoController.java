package br.com.mulhervirtuosa.mulhervirtuosa.agendamento.controller;

import br.com.mulhervirtuosa.mulhervirtuosa.agendamento.model.Agendamento;
import br.com.mulhervirtuosa.mulhervirtuosa.agendamento.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin("*")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository repo;

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Agendamento agendamento) {

        LocalDate hoje = LocalDate.now();
        LocalTime agora = LocalTime.now();

        if (agendamento.getData().isBefore(hoje)) {
            return ResponseEntity.badRequest().body("Não é permitido agendar em datas passadas.");
        }

        if (agendamento.getData().isEqual(hoje)) {
            if (agendamento.getHora().isBefore(agora)) {
                return ResponseEntity.badRequest().body("Não é permitido agendar horários passados para hoje.");
            }
        }

        boolean ocupado = repo.existsByProfissionalIdAndDataAndHora(
                Math.toIntExact(agendamento.getProfissional().getId()),
                agendamento.getData(),
                agendamento.getHora()
        );

        if (ocupado) {
            return ResponseEntity.badRequest().body("Horário já ocupado para este profissional.");
        }

        Agendamento salvo = repo.save(agendamento);
        return ResponseEntity.ok(salvo);
    }

    private List<LocalTime> gerarHorarios() {
        List<LocalTime> horarios = new ArrayList<>();

        for (int h = 8; h <= 21; h++) {
            horarios.add(LocalTime.of(h, 0));
        }

        return horarios;
    }

    @GetMapping("/horarios")
    public List<LocalTime> horarios(
            @RequestParam Integer profissionalId,
            @RequestParam String data) {

        LocalDate dataConvertida = LocalDate.parse(data);

        List<LocalTime> todosHorarios = gerarHorarios();

        List<Agendamento> ocupados = repo.findByProfissionalIdAndData(
                profissionalId,
                LocalDate.parse(String.valueOf(dataConvertida))
        );

        List<LocalTime> horariosOcupados = ocupados.stream()
                .map(Agendamento::getHora)
                .toList();

        return todosHorarios.stream()
                .filter(h -> !horariosOcupados.contains(h))
                .toList();
    }

    @GetMapping("/profissional")
    public ResponseEntity<?> agendamentosDoDia(
            @RequestParam Integer profissionalId,
            @RequestParam(required = false) String data
    ) {
        LocalDate dia = (data != null) ? LocalDate.parse(data) : LocalDate.now();

        List<Agendamento> agendamentos = repo.findByProfissionalIdAndData(
                profissionalId,
                LocalDate.parse(dia.toString())
        );

        return ResponseEntity.ok(agendamentos);
    }
}