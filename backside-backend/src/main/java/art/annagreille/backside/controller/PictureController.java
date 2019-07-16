package art.annagreille.backside.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import art.annagreille.backside.core.letter.Picture;
import art.annagreille.backside.dao.FileSystemPictureDAO;
import art.annagreille.backside.dao.LocalFile;
import art.annagreille.backside.payload.ApiResponse;
import art.annagreille.backside.payload.FileMetaResponse;
import java.io.IOException;
import java.nio.file.NoSuchFileException;
import java.util.Date;


@RestController
@RequestMapping
public class PictureController {

    @Autowired
    FileSystemPictureDAO fileSystemPictureDAO;

    @GetMapping(value = "/public/pictures/{pictureName}")
    public ResponseEntity getPictureByName(@PathVariable String pictureName) {

        HttpHeaders headers = new HttpHeaders();
        headers.setCacheControl(CacheControl.noCache().getHeaderValue());

        try {
            Picture picture = fileSystemPictureDAO.getByName(pictureName);
            headers.setContentType(MediaType.IMAGE_JPEG);
            ResponseEntity<byte[]> responseEntity =
                    new ResponseEntity<>(
                            picture.getLocalFile().getFileBytes(),
                            headers,
                            HttpStatus.OK);
            return responseEntity;
        } catch(NoSuchFileException NoSuchFileException) {
            return
                    new ResponseEntity(HttpStatus.NOT_FOUND);
        } catch(Exception e) {
            return
                    new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping("/authorship/pictures/save_picture")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> savePicture(@RequestParam MultipartFile pictureFile) throws IOException {

        String fileName = pictureFile.getOriginalFilename();

        LocalFile localFile =
                new LocalFile(fileName, pictureFile.getBytes());
        Picture picture = new Picture();
        picture.setLocalFile(localFile);

        if(!fileSystemPictureDAO.findPicture(fileName)) {
            fileSystemPictureDAO.save(picture);

            return
                    ResponseEntity
                            .ok(new FileMetaResponse(fileName));

        } else if(fileSystemPictureDAO.findPicture(fileName)) {
            fileName =
                    String.valueOf(new Date().getTime())
                            + fileName;

            localFile.setFileName(fileName);
            picture.setLocalFile(localFile);
            fileSystemPictureDAO.save(picture);

            return
                    ResponseEntity
                            .ok(new FileMetaResponse(fileName));

        } else {

            return
                    ResponseEntity
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(new ApiResponse(false, "Oops..."));
        }
    }
}
