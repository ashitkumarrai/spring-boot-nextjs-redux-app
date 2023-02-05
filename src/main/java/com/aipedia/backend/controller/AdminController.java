package com.aipedia.backend.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aipedia.backend.entity.TopHashtag;
import com.aipedia.backend.exceptionhandler.RecordNotFoundException;
import com.aipedia.backend.repository.TopHashTagRepository;


@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private TopHashTagRepository tr;
   


   @PostMapping("/topPostHashtag")
   public ResponseEntity<Map<String, String>> createHashtagTopPost(@RequestBody TopHashtag topHashtag)
           throws URISyntaxException {
       TopHashtag result = tr.save(topHashtag);
       Map<String, String> hasMap = new HashMap<>();
       hasMap.put("response", "created sucessfully!");
       hasMap.put("URI", new URI("/admin/topPostHashtag" + result.getId()).toString());

       return new ResponseEntity<Map<String, String>>(hasMap, HttpStatus.CREATED);

   }
   
   @GetMapping("/topPostHashtag/{hashTagId}")
   public TopHashtag getAllTopToolCardsofOneHashTag(@PathVariable("hashTagId") Long id) throws RecordNotFoundException {
       TopHashtag temp = tr.findById(id)
               .orElseThrow(() -> new RecordNotFoundException(" No Top toolcard is not found in db"));
       
       temp.getTop().sort((p1, p2) -> (int)(p1.getRank() - p2.getRank()));
       return temp;


}

                      
       
     
   

         


    
}
