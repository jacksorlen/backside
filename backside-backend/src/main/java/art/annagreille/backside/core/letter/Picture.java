package art.annagreille.backside.core.letter;


import art.annagreille.backside.dao.FileSystemSerializable;
import art.annagreille.backside.dao.LocalFile;
import java.util.HashSet;
import java.util.Set;


public class Picture implements FileSystemSerializable {

    private int id = -1;

    private LocalFile localFile;

    private Set<Letter> letters = new HashSet<>();

    public Picture() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public LocalFile getLocalFile() {
        return localFile;
    }

    public void setLocalFile(LocalFile localFile) {
        this.localFile = localFile;
    }

    public Set<Letter> getLetters() {
        return letters;
    }

    public void setLetters(Set<Letter> letter) {
        this.letters = letter;
    }
}
