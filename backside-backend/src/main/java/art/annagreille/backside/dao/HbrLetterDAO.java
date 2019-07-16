package art.annagreille.backside.dao;

import org.springframework.stereotype.Component;

import art.annagreille.backside.core.letter.Letter;
import art.annagreille.backside.payload.Title;

import java.util.List;


@Component
public class HbrLetterDAO extends HbrDAO<Letter> implements DAO<Letter> {

    public HbrLetterDAO() {
        setClass(Letter.class);
    }

    public List<Title> getTitles() {

        boolean isActiveTransactionBefore =
                getCurrentSession().getTransaction().isActive();

        if(isActiveTransactionBefore == false)
            getCurrentSession().beginTransaction();

        String titleQuery =
                "SELECT new art.annagreille.backside.payload.Title(t.id, t.title, t.dateOfPublication, t.state)"
                        + " FROM Letter t";

        List<Title> titles =  getCurrentSession()
                .createQuery(titleQuery).list();

        if(isActiveTransactionBefore == false)
            getCurrentSession().getTransaction().commit();

        return titles;
    }
}
