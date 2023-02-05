package com.aipedia.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.aipedia.backend.entity.HashTag;
import com.aipedia.backend.entity.ToolCard;
import com.aipedia.backend.exceptionhandler.RecordNotFoundException;
import com.aipedia.backend.repository.HashTagRepository;
import com.aipedia.backend.repository.ToolCardRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
public class HashTagController {


    @Autowired
    HashTagRepository hr;


    @GetMapping("/hashtags")
    public ResponseEntity<List<HashTag>> getAllHashtags( @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "desc") String order) {
             


        Pageable paging = null;
        if (order.contains("asc")) {
            paging = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        }
        else {
             paging = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }
                       
        
                Page<HashTag> pagedResult = hr.findAll(paging);
                
        
        return ResponseEntity.ok().body(pagedResult.getContent());
    }

    

    
}
