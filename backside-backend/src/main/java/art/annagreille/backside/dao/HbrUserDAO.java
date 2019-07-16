package art.annagreille.backside.dao;

import org.hibernate.query.Query;
import org.springframework.stereotype.Component;

import art.annagreille.backside.core.Author;


@Component
public class HbrUserDAO extends HbrDAO<Author> implements DAO<Author> {

    public HbrUserDAO() {
        setClass(Author.class);
    }

    public Author getByUsername(String username) {
        boolean isActiveTransactionBefore =
                getCurrentSession().getTransaction().isActive();

        if(isActiveTransactionBefore == false)
            getCurrentSession().beginTransaction();

        String hql = "FROM Author U WHERE U.username = " + "\'" + username + "\'";
        Query query = getCurrentSession().createQuery(hql);

        Author author = (Author) query.getSingleResult();

        if(isActiveTransactionBefore == false)
            getCurrentSession().getTransaction().commit();

        return author;
    }
    
    public void deleteAllUsers() {
    	boolean isActiveTransactionBefore =
                getCurrentSession().getTransaction().isActive();

        if(isActiveTransactionBefore == false)
            getCurrentSession().beginTransaction();
        
        String hql = "DELETE FROM Author";
        Query query = getCurrentSession().createQuery(hql);
        query.executeUpdate();
        
        if(isActiveTransactionBefore == false)
            getCurrentSession().getTransaction().commit();
    }
}
