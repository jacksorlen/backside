package art.annagreille.backside;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import art.annagreille.backside.core.Author;
import art.annagreille.backside.core.Role;
import art.annagreille.backside.dao.HbrUserDAO;
import javax.annotation.PostConstruct;
import java.util.TimeZone;


@SpringBootApplication
@EntityScan(basePackageClasses = {
		BacksideApplication.class
})
public class BacksideApplication extends SpringBootServletInitializer {

	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(BacksideApplication.class);
	}
	
	private static void signUp(String[] registerData) {
		Author author;
		if(registerData.length == 4 && registerData[0].equals("-u") && registerData[2].equals("-p")) {
			author = new Author(registerData[1], registerData[3]);
		} else {
			return;
		}		
		
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		author.setPassword(passwordEncoder.encode(author.getPassword()));
		author.setRole(Role.ROLE_USER);
		
		HbrUserDAO hbrUserDAO = new HbrUserDAO();
		hbrUserDAO.deleteAllUsers();
		hbrUserDAO.save(author);
	}

	public static void main(String[] args) {
		SpringApplication.run(BacksideApplication.class, args);
		signUp(args);
	}
}
