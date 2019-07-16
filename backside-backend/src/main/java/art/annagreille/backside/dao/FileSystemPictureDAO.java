package art.annagreille.backside.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import art.annagreille.backside.core.letter.Picture;
import art.annagreille.backside.util.FileSystemRepositoryUtil;

import java.io.IOException;
import java.util.List;


@Component
public class FileSystemPictureDAO extends FileSystemDAO<Picture> implements DAO<Picture> {

    @Autowired
    FileSystemRepositoryUtil fileSystemRepositoryUtil;

    public FileSystemPictureDAO() {
        setPath(Picture.class);
    }

    public boolean findPicture(String pictureName) {
        return
                fileSystemRepositoryUtil
                        .findFile(getPath(), pictureName);
    }

    public Picture getByName(String pictureName) throws IOException {
        LocalFile localFile = fileSystemRepositoryUtil
                .getFile(getPath(), pictureName);
        Picture picture = new Picture();
        picture.setLocalFile(localFile);
        return picture;
    }

    @Override
    public Picture getById(int id) {
        return null;
    }

    @Override
    public List<Picture> getAll() {
        return null;
    }

    @Override
    public void save(Picture picture) {
        try {
            fileSystemRepositoryUtil.save(
                getPath(),
                picture.getLocalFile()
            );
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

    @Override
    public void update(Picture picture) {

    }

    @Override
    public void delete(Picture picture) {

    }
}
