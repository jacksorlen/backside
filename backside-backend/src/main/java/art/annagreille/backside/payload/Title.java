package art.annagreille.backside.payload;

import java.util.Date;
import art.annagreille.backside.core.letter.State;


public class Title {

    private int id;

    private String title;

    private Date dateOfPublication;

    private State state;

    public Title() {}

    public Title(int id, String title, Date dateOfPublication, State state) {
        this.id = id;
        this.title = title;
        this.dateOfPublication = dateOfPublication;
        this.state = state;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDateOfPublication() {
        return dateOfPublication;
    }

    public void setDateOfPublication(Date dateOfPublication) {
        this.dateOfPublication = dateOfPublication;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }
}
