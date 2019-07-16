package art.annagreille.backside.util;

import org.springframework.stereotype.Component;
import art.annagreille.backside.dao.LocalFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.*;


@Component
public class FileSystemRepositoryUtil {

    private static volatile FileSystemRepositoryUtil fileSystemRepositoryUtil;

    private final String repositoryPath = "./repository";

    private FileSystemRepositoryUtil() {
        makeRepository(repositoryPath);
    }

    public static FileSystemRepositoryUtil getFileSystemRepositoryUtil() {
        FileSystemRepositoryUtil localFileSystemRepositoryUtil = fileSystemRepositoryUtil;
        if (localFileSystemRepositoryUtil == null) {
            synchronized (FileSystemRepositoryUtil.class) {
                localFileSystemRepositoryUtil = fileSystemRepositoryUtil;
                if (localFileSystemRepositoryUtil == null) {
                    fileSystemRepositoryUtil =
                            localFileSystemRepositoryUtil =
                                     new FileSystemRepositoryUtil();
                }
            }
        }
        return localFileSystemRepositoryUtil;
    }

    private boolean makeRepository(String path) {
        return
            new File(repositoryPath).mkdir();
    }

    public boolean makeSubfolders(String path) {
        return
            new File(repositoryPath + path).mkdirs();
    }

    public boolean findFile(String localFilePath, String fileName) {
        String filePath = new StringBuilder()
                .append(repositoryPath)
                .append(localFilePath)
                .append("/")
                .append(fileName)
                .toString();

        return Files.exists(Paths.get(filePath));
    }

    public LocalFile getFile(String localFilePath, String fileName) throws IOException {

        String filePath = new StringBuilder()
                .append(repositoryPath)
                .append(localFilePath)
                .append("/")
                .append(fileName)
                .toString();

        byte[] bytes = Files.readAllBytes(Paths.get(filePath));

        return new LocalFile(fileName, bytes);
    }

    public void save(String localFilePath, LocalFile localFile) throws IOException {
        String path = new StringBuilder()
                .append(repositoryPath)
                .append(localFilePath)
                .append("/")
                .append(localFile.getFileName())
                .toString();

        Files.write(Paths.get(path), localFile.getFileBytes());
    }
}