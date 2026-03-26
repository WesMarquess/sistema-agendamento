package br.com.mulhervirtuosa.mulhervirtuosa.agendamento.service;

import br.com.mulhervirtuosa.mulhervirtuosa.agendamento.model.Agendamento;
import br.com.mulhervirtuosa.mulhervirtuosa.agendamento.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository repository;


    public Agendamento salvar(Agendamento agendamento) {

        boolean existe = repository.existsByProfissionalIdAndDataAndHora(
                Math.toIntExact(agendamento.getProfissional().getId()),
                agendamento.getData(),
                agendamento.getHora()
        );

        if (existe) {
            throw new RuntimeException("Horário já está ocupado para este profissional.");
        }
        return repository.save(agendamento);
    }


}
