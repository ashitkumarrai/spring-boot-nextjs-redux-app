package com.aipedia.backend.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aipedia.backend.entity.ToolCard;
import com.aipedia.backend.entity.TopHashtag;
import com.aipedia.backend.repository.TopHashTagRepository;

@RestController
public class TopToolCardController {


    @Autowired
    TopHashTagRepository th;
    @PostMapping("/toptoolcard")
    public ResponseEntity<Map<String,String>> createToolCard( @RequestBody TopHashtag topHashtag) throws URISyntaxException {
        TopHashtag result = th.save(topHashtag);
        Map<String, String> hasMap = new HashMap<>();
        hasMap.put("response", "created sucessfully!");
        hasMap.put("URI", new URI("/toptoolcard/" + result.getId()).toString());
        
        

      
        return new ResponseEntity<Map<String,String>>(hasMap,HttpStatus.CREATED);
                
    }

}
