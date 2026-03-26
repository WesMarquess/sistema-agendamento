package br.com.mulhervirtuosa.mulhervirtuosa.usuario.IUsuario;

import br.com.mulhervirtuosa.mulhervirtuosa.usuario.model.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface IUsuario extends CrudRepository<Usuario, Integer> {

    Usuario findByEmail(String email);

}
