package art.annagreille.backside.dao;

import art.annagreille.backside.util.FileSystemRepositoryUtil;


public abstract class FileSystemDAO<FileSystemSerializable> implements DAO<FileSystemSerializable> {

    private String path;

    public void setPath(Class<FileSystemSerializable> FSSclass) {
        FSSclass.getSimpleName().toLowerCase();
        path = "/"
            + FSSclass.getSimpleName().toLowerCase();

        FileSystemRepositoryUtil
                .getFileSystemRepositoryUtil()
                .makeSubfolders(path);
    }

    public String getPath() {
        return path;
    }
}