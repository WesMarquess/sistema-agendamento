package br.com.mulhervirtuosa.mulhervirtuosa.agendamento.repository;

import br.com.mulhervirtuosa.mulhervirtuosa.agendamento.model.Agendamento;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AgendamentoRepository extends CrudRepository<Agendamento, Integer> {

    List<Agendamento> findByProfissionalIdAndData(Integer profissionalId, LocalDate data);

    boolean existsByProfissionalIdAndDataAndHora(Integer profissionalId, LocalDate data, LocalTime hora);

    List<Agendamento> findByProfissionalId(Long profissionalId);

}