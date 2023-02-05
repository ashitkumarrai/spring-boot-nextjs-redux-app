package com.aipedia.backend.controller;

import org.springframework.web.bind.annotation.RestController;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import com.aipedia.backend.exceptionhandler.RecordNotFoundException;
import com.aipedia.backend.repository.FileRepository;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;




@Slf4j
@RestController
public class FileController {


  

    @Autowired
    FileRepository fr;

  
    @PostMapping("/image/upload")
	public @ResponseBody ResponseEntity<?> uploadImage( HttpServletRequest request,final @RequestBody MultipartFile file) {
		try {
            //String uploadDirectory = System.getProperty("user.dir") + uploadFolder;
            String name = file.getOriginalFilename();
            log.info(name); //download.jpg

            if (name == null || name.contains("..") || name.contains(" ")) {
                Map<String, String> hasMap = new HashMap<>();
   
           hasMap.put("Error", "Sorry! Filename contains invalid path sequence, correct name format before upload");
        
        

      
        return new ResponseEntity<Map<String,String>>(hasMap,HttpStatus.BAD_REQUEST);
			
            
			}
            
            byte[] imageData = file.getBytes();


            com.aipedia.backend.entity.File f = com.aipedia.backend.entity.File.builder().image(imageData)
        
                    .imageContentType(file.getContentType().toString()).id(UUID.randomUUID().toString()+file.getOriginalFilename()).build();
            
                    
            fr.save(f);

            
        
         
            Map<String, String> hasMap = new HashMap<>();
            hasMap.put("imageUrl", new URI("/image/show/" + f.getId()).toString());
            

            return new ResponseEntity<>(hasMap, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			log.info("Exception: " + e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
    @GetMapping("/image/show/{id}")
	@ResponseBody
	void showImage(@PathVariable("id") String id, HttpServletResponse response)
            throws ServletException, IOException {
        log.info("Id :: " + id);
        Optional<com.aipedia.backend.entity.File> ff = fr.findById(id);
        response.setContentType("image/jpeg, image/jpg, image/png, image/gif");

        if (!ff.isPresent()) {
            throw new RecordNotFoundException("image not found with id: " + id);
        }
        response.getOutputStream().write(ff.get().getImage());
        response.getOutputStream().close();
    }
    @GetMapping("/image/show/all")
	List< com.aipedia.backend.entity.File> showAllImage() {
       
        return fr.findAll();
    }

}
