package com.aipedia.backend.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aipedia.backend.entity.Like;
import com.aipedia.backend.entity.ToolCard;
import com.aipedia.backend.entity.User;
import com.aipedia.backend.exceptionhandler.RecordNotFoundException;
import com.aipedia.backend.jwtconfig.SecurityUtils;
import com.aipedia.backend.repository.LikeRepository;
import com.aipedia.backend.repository.ToolCardRepository;
import com.aipedia.backend.repository.UserRepository;




@RestController
public class LikeController {
@Autowired
LikeRepository lr;

@Autowired
UserRepository ur;

@Autowired
ToolCardRepository tr;

    @GetMapping("/post/{id}/like")
    public ResponseEntity<Map<String,String>> createLike(@PathVariable Long id) throws RecordNotFoundException{
        User user = ur.findByUsername(SecurityUtils.getCurrentUserLogin().get()).get();

        tr.findById(id)
               .orElseThrow(() -> new RecordNotFoundException(" toolcard is not found in db"));
       
        List<Like> likeList = lr.findByToolcardAndUser(id,user.getId());
        Map<String, String> hashMap = new HashMap<>();



        if (likeList.size() > 0) {

            lr.delete(likeList.get(0));
            hashMap.put("response", "Unliked sucessfully!");

        }
        else {
            hashMap.put("response", "Liked sucessfully");
            lr.save(new Like(tr.findById(id).get(),user));
        }



      
        return new ResponseEntity<Map<String,String>>(hashMap,HttpStatus.ACCEPTED);
                
    }


}
