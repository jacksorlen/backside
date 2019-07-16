package art.annagreille.backside.dao;

import org.hibernate.Session;

import art.annagreille.backside.util.HibernateUtil;

import java.util.List;


public abstract class HbrDAO<T> implements DAO<T> {

    private Class<T> clazz;

    public void setClass(Class<T> clazz){
        this.clazz = clazz;
    }

    @Override
    public T getById(int id) {
        boolean isActiveTransactionBefore =
                getCurrentSession().getTransaction().isActive();

        if(isActiveTransactionBefore == false)
            getCurrentSession().beginTransaction();

        T object = (T) getCurrentSession().get(clazz, id);

        if(isActiveTransactionBefore == false)
            getCurrentSession().getTransaction().commit();

        return object;
    }

    @Override
    public List<T> getAll() {
        boolean isActiveTransactionBefore =
            getCurrentSession().getTransaction().isActive();

        if(isActiveTransactionBefore == false)
            getCurrentSession().beginTransaction();

        List<T> allObjects = getCurrentSession().
                createQuery("FROM " + clazz.getSimpleName()).list();

        if(isActiveTransactionBefore == false)
            getCurrentSession().getTransaction().commit();

        return allObjects;
    }

    @Override
    public void save(T object) {
        boolean isActiveTransactionBefore =
            getCurrentSession().getTransaction().isActive();

        if(isActiveTransactionBefore == false)
            getCurrentSession().beginTransaction();

        getCurrentSession().save(object);

        if(isActiveTransactionBefore == false)
            getCurrentSession().getTransaction().commit();
    }

    @Override
    public void update(T object) {
      boolean isActiveTransactionBefore =
            getCurrentSession().getTransaction().isActive();

        if(isActiveTransactionBefore == false)
            getCurrentSession().beginTransaction();

        T mergedOne = (T) getCurrentSession().merge(object);
        getCurrentSession().saveOrUpdate(mergedOne);

        if(isActiveTransactionBefore == false)
            getCurrentSession().getTransaction().commit();
    }

    @Override
    public void delete(T object) {
        boolean isActiveTransactionBefore =
                getCurrentSession().getTransaction().isActive();

        if(isActiveTransactionBefore == false)
            getCurrentSession().beginTransaction();

        getCurrentSession().delete(object);

        if(isActiveTransactionBefore == false)
            getCurrentSession().getTransaction().commit();
    }

    protected final Session getCurrentSession() {
        return HibernateUtil
                .getSessionFactory()
                .getCurrentSession();
    }
}
