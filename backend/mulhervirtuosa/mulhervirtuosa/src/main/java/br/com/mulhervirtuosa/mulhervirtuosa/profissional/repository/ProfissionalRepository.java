package br.com.mulhervirtuosa.mulhervirtuosa.profissional.repository;

import br.com.mulhervirtuosa.mulhervirtuosa.profissional.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {
    Profissional findByUsuarioId(Long usuarioId);
}