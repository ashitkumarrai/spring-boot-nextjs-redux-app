package com.aipedia.backend.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aipedia.backend.entity.Comment;
import com.aipedia.backend.exceptionhandler.RecordNotFoundException;
import com.aipedia.backend.repository.CommentRepository;
import com.aipedia.backend.repository.UserRepository;


@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentRepository cr;

    @Autowired
    UserRepository ur;

    

    @PostMapping("/")
    public ResponseEntity<Map<String,String>> createComment( @RequestBody Comment toolCard) throws URISyntaxException {
        Comment result = cr.save(toolCard);
        Map<String, String> hasMap = new HashMap<>();
        hasMap.put("response", "created sucessfully!");
        hasMap.put("URI", new URI("/comment/" + result.getId()).toString());
        
        

      
        return new ResponseEntity<Map<String,String>>(hasMap,HttpStatus.CREATED);
                
    }


    @GetMapping("")
    public ResponseEntity<List<Comment>> getAllComments( @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "lastUpdate") String sortBy,
            @RequestParam(defaultValue = "desc") String order) {
             


        Pageable paging = null;
        if (order.contains("asc")) {
            paging = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        }
        else {
             paging = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }
                       
        
                Page<Comment> pagedResult = cr.findAll(paging);
                
        
        return ResponseEntity.ok().body(pagedResult.getContent());
    }

  
    @GetMapping(value = "/{id}")
    public Comment getCommentById(@PathVariable("id") Long id) throws RecordNotFoundException {

        return cr.findById(id).orElseThrow(() -> new RecordNotFoundException("Comment is not found in db"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        try {
            cr.deleteById(id);
        } 
       catch (EmptyResultDataAccessException e) {
            throw new RecordNotFoundException(e.getLocalizedMessage());
        }
        
        return ResponseEntity
            .noContent()
                .build();
            

    }




    
}
