package art.annagreille.backside.core.letter;

import java.sql.Timestamp;
import java.util.Date;


public class Letter {

    private int id = -1;

    private String title;

    private Timestamp dateOfPublication;

    private String pictureName;

    private String htmlText;

    private State state;

    public Letter() {

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

    public void setDateOfPublication(Timestamp dateOfPublication) {
        this.dateOfPublication = dateOfPublication;
    }

    public String getPictureName() {
        return pictureName;
    }

    public void setPictureName(String pictureName) {
        this.pictureName = pictureName;
    }

    public String getHtmlText() {
        return htmlText;
    }

    public void setHtmlText(String htmlText) {
        this.htmlText = htmlText;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }
}