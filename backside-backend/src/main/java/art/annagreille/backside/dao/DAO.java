package art.annagreille.backside.dao;

import java.util.List;


public interface DAO<T> {

    T getById(int id);

    List<T> getAll();

    void save(T object);

    void update(T object);

    void delete(T object);
}
