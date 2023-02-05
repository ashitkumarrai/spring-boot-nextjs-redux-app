package com.aipedia.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.aipedia.backend.entity.HashTag;
import com.aipedia.backend.entity.Tag;
import com.aipedia.backend.entity.ToolCard;
import com.aipedia.backend.exceptionhandler.RecordNotFoundException;
import com.aipedia.backend.jwtconfig.SecurityUtils;
import com.aipedia.backend.repository.HashTagRepository;
import com.aipedia.backend.repository.TagRepository;

import com.aipedia.backend.repository.ToolCardRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.spi.ToolProvider;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.aipedia.backend.repository.*;
import org.springframework.web.bind.annotation.*;
@RequestMapping("/toolcard")
@RestController
public class ToolCardController {
     @Autowired
     private ToolCardRepository toolCardRepository;
     @Autowired
     HashTagRepository hashTagRepository;
     @Autowired
     TagRepository tagRepository;


     @Autowired
     UserRepository userRepo;
    


    @PostMapping("/")
    public ResponseEntity<Map<String, String>> createToolCard(@RequestBody ToolCard toolCard)
            throws URISyntaxException {
        Set<HashTag> hs1 = new HashSet<>();
        Set<Tag> ts1 = new HashSet<>();
        toolCard.getHashtags().forEach(hs -> {
            if (hashTagRepository.findByName(hs.getName()).size() <= 0)
            {
                hs1.add(hashTagRepository.save(hs));
                
            }
            else {
                hs1.add(hashTagRepository.findByName(hs.getName()).get(0));
               
            }

        });

       


       
        toolCard.getTags().forEach(ts-> {
            if (tagRepository.findByName(ts.getName()).size() <= 0) 
            {
                ts1.add(tagRepository.save(ts));

            }
                
            else {
                ts1.add(tagRepository.findByName(ts.getName()).get(0));
               
            }
        });

        toolCard.setCreator(userRepo.findByUsername(SecurityUtils.getCurrentUserLogin().get()).get());
        toolCard.setHashtags(hs1);
        toolCard.setTags(ts1);
        

          
          
    
        ToolCard result = toolCardRepository.save(toolCard);
        Map<String, String> hasMap = new HashMap<>();
        hasMap.put("response", "created sucessfully!");
        hasMap.put("URI", new URI("/toolcard/" + result.getId()).toString());
        
        

      
        return new ResponseEntity<Map<String,String>>(hasMap,HttpStatus.CREATED);
                
    }

  
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ToolCard> partialUpdateToolCard(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ToolCard toolCard
    ) throws URISyntaxException {
  
       

        if (!toolCardRepository.existsById(id)) {
            throw new RecordNotFoundException("Entity not found");
        }

        Optional<ToolCard> result = toolCardRepository
            .findById(id)
            .map(existingToolCard -> {
                if (toolCard.getTitle() != null) {
                    existingToolCard.setTitle(toolCard.getTitle());
                }
             
                if (toolCard.getDescription() != null) {
                    existingToolCard.setDescription(toolCard.getDescription());
                }
                if (toolCard.getImageUrl() != null) {
                    existingToolCard.setImageUrl(toolCard.getImageUrl());
                }
             

                return existingToolCard;
            })
            .map(toolCardRepository::save);

        return ResponseEntity.created(new URI("/toolcard/" + result.get().getId())).body(result.get());
        
    }

    @GetMapping("")
    public ResponseEntity<List<ToolCard>> getAllToolCards( @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "lastUpdate") String sortBy,
            @RequestParam(defaultValue = "desc") String order ,@RequestParam(defaultValue = "default")String tag) {
             


        Pageable paging = null;
        if (order.contains("asc")) {
            paging = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        }
        else {
             paging = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }
                       
           
        Page<ToolCard> pagedResult;
        
        if(tag.equals("default"))
        
            pagedResult = toolCardRepository.findAll(paging);
        else
             pagedResult = toolCardRepository.findByTags(tag, paging);
                
        
        return ResponseEntity.ok().body(pagedResult.getContent());
    }

  
    @GetMapping(value = "/{id}")
    public ToolCard getToolCardById(@PathVariable("id") Long id) throws RecordNotFoundException {

        return toolCardRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("toolcard is not found in db"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteToolCard(@PathVariable Long id) {
        try {
            toolCardRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new RecordNotFoundException(e.getLocalizedMessage());
        }

        return ResponseEntity
                .noContent()
                .build();

    }
    
    @GetMapping("/currentuser/liked")
    public ResponseEntity<List<ToolCard>> getAllLikedToolCards( @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "lastUpdate") String sortBy,
            @RequestParam(defaultValue = "desc") String order) {

        Pageable paging = null;
        if (order.contains("asc")) {
            paging = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        } else {
            paging = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }

        Page<ToolCard> pagedResult = toolCardRepository.findByCurrentUserLiked(paging);

        return ResponseEntity.ok().body(pagedResult.getContent());
    }


    @GetMapping("/currentuser/bookmarked")
    public ResponseEntity<List<ToolCard>> getAllBookMarkedToolCards( @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "lastUpdate") String sortBy,
            @RequestParam(defaultValue = "desc") String order) {

        Pageable paging = null;
        if (order.contains("asc")) {
            paging = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        } else {
            paging = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }

        Page<ToolCard> pagedResult = toolCardRepository.findByCurrentUserBookMarked(paging);

        return ResponseEntity.ok().body(pagedResult.getContent());
    }

    




    @GetMapping("/currentuser/created")
    public ResponseEntity<List<ToolCard>> getAllCreatedToolCards( @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "lastUpdate") String sortBy,
            @RequestParam(defaultValue = "desc") String order) {

        Pageable paging = null;
        if (order.contains("asc")) {
            paging = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        } else {
            paging = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }

        Page<ToolCard> pagedResult = toolCardRepository.findByCreatorIsCurrentUser(paging);

        return ResponseEntity.ok().body(pagedResult.getContent());
    }
    




    @GetMapping("/search/hashtag/{hashtag}")
    public ResponseEntity<List<ToolCard>> getAllCreatedToolCards( @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "lastUpdate") String sortBy,
            @RequestParam(defaultValue = "desc") String order, @PathVariable("hashtag") String hashtag) {
                

             


        Pageable paging = null;
        if (order.contains("asc")) {
            paging = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        }
        else {
             paging = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }
                       
        
                Page<ToolCard> pagedResult = toolCardRepository.findByHashtags(hashtag,paging);
                
        
        return ResponseEntity.ok().body(pagedResult.getContent());
    }
}
   

