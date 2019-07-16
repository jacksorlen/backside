package art.annagreille.backside.payload;


public class FileMetaResponse {

    private String fileName;

    public FileMetaResponse(String fileName) {
        this.fileName = fileName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
