package art.annagreille.backside.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import art.annagreille.backside.core.Author;
import art.annagreille.backside.dao.HbrUserDAO;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    HbrUserDAO hbrUserDAO = new HbrUserDAO();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {   
        Author author = hbrUserDAO.getByUsername(username);
        return UserPrincipal.create(author);
    }

    public UserDetails loadUserById(int id) {
        Author author = hbrUserDAO.getById(id);

        return UserPrincipal.create(author);
    }
}