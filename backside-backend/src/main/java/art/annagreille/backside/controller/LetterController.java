package art.annagreille.backside.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import art.annagreille.backside.core.letter.Letter;
import art.annagreille.backside.core.letter.State;
import art.annagreille.backside.dao.HbrLetterDAO;
import art.annagreille.backside.payload.ApiResponse;
import art.annagreille.backside.payload.Title;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping
public class LetterController {

    @Autowired
    HbrLetterDAO hbrLetterDAO;

    @RequestMapping(path="/public/letters/{id}", produces="application/json; charset=UTF-8")
    public ResponseEntity<?> getPublicLetterById(@PathVariable int id) {

        Letter letter = hbrLetterDAO.getById(id);

        if(letter != null && letter.getState().equals(State.PUBLIC)) {
            return ResponseEntity.ok(letter);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(path="/authorship/letters/{id}", produces="application/json; charset=UTF-8")
    public ResponseEntity<?> getAnyLetterById(@PathVariable int id) {

        Letter letter = hbrLetterDAO.getById(id);

        if(letter != null) {
            return ResponseEntity.ok(letter);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(path="/public/letters/titles", produces="application/json; charset=UTF-8")
    public List<Title> getPublicTitles() {
        List<Title> titles = hbrLetterDAO.getTitles();
        ArrayList<Title> publicTitles = new ArrayList<>();
        for(Title title: titles) {
            if(title.getState().equals(State.PUBLIC))
                publicTitles.add(title);
        }

        return publicTitles;
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(path="/authorship/letters/titles", produces="application/json; charset=UTF-8")
    public List<Title> getAllTitles() {

        List<Title> allTitles = hbrLetterDAO.getTitles();

        return allTitles;
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping("/authorship/letters/save_letter")
    public ResponseEntity<?> saveLetter(@RequestBody Letter letter) {

        if(hbrLetterDAO.getById(letter.getId()) == null) {
            hbrLetterDAO.save(letter);

            return
                    ResponseEntity
                            .ok(new ApiResponse(true, "Letter was saved"));

        } else if(hbrLetterDAO.getById(letter.getId()) != null) {
            hbrLetterDAO.update(letter);

            return
                    ResponseEntity
                            .ok(new ApiResponse(true, "Letter was updated"));

        } else {
            return
                    ResponseEntity
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(new ApiResponse(false, "Oops..."));
        }
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping("/authorship/letters/delete_letter/{id}")
    public ResponseEntity<?> deleteLetter(@PathVariable int id) {

        Letter letter = hbrLetterDAO.getById(id);
        hbrLetterDAO.delete((letter));

        return
                ResponseEntity
                        .ok(new ApiResponse(true, "Letter is deleted."));
    }
}
