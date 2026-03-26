package br.com.mulhervirtuosa.mulhervirtuosa.agendamento.model;

import br.com.mulhervirtuosa.mulhervirtuosa.usuario.model.Usuario;
import br.com.mulhervirtuosa.mulhervirtuosa.profissional.model.Profissional;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String servico;
    private LocalDate data;
    private LocalTime hora;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "profissional_id", referencedColumnName = "id")
    private Profissional profissional;

    public Agendamento() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServico() {
        return servico;
    }

    public void setServico(String servico) {
        this.servico = servico;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Profissional getProfissional() {
        return profissional;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }
}