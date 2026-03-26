package br.com.mulhervirtuosa.mulhervirtuosa.usuario.controller;

import br.com.mulhervirtuosa.mulhervirtuosa.usuario.IUsuario.IUsuario;
import br.com.mulhervirtuosa.mulhervirtuosa.usuario.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {


    @Autowired
    private IUsuario dao;

    @GetMapping
    public List<Usuario> listaUsuarios() {
        return (List<Usuario>) dao.findAll();
    }

    @PostMapping
    public ResponseEntity<?> criarUsuario(@RequestBody Usuario usuario) {

        if (dao.findByEmail(usuario.getEmail()) != null) {
            return ResponseEntity.status(400).body("Email já cadastrado");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        usuario.setSenha(encoder.encode(usuario.getSenha()));
        usuario.setRole("USER");
        return ResponseEntity.ok(dao.save(usuario));
    }

    @PutMapping
    public Usuario editarUsuario(@RequestBody Usuario usuario) {
        return dao.save(usuario);
    }

    @DeleteMapping("/{id}")
    public Optional<Usuario> deletarUsuario(@PathVariable Integer id) {
        Optional<Usuario> usuario = dao.findById(id);
        dao.deleteById(id);
        return usuario;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario login) {

        Usuario usuario = dao.findByEmail(login.getEmail());

        if (usuario == null) {
            return ResponseEntity.status(401).body("Usuário não encontrado");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (!encoder.matches(login.getSenha(), usuario.getSenha())) {
            return ResponseEntity.status(401).body("Senha inválida");
        }

        return ResponseEntity.ok(usuario);
    }
}