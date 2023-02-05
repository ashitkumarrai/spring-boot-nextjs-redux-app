package com.aipedia.backend.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aipedia.backend.entity.BookMark;
import com.aipedia.backend.entity.Like;
import com.aipedia.backend.entity.User;
import com.aipedia.backend.jwtconfig.SecurityUtils;
import com.aipedia.backend.repository.BookMarkRepository;
import com.aipedia.backend.repository.LikeRepository;
import com.aipedia.backend.repository.ToolCardRepository;
import com.aipedia.backend.repository.UserRepository;




@RestController
public class BookMarkController {
@Autowired
BookMarkRepository br;

@Autowired
UserRepository ur;

@Autowired
ToolCardRepository tr;

    @GetMapping("/post/{id}/bookmark")
    public ResponseEntity<Map<String,String>> createBookMark(@PathVariable Long id) {
        User user = ur.findByUsername(SecurityUtils.getCurrentUserLogin().get()).get();
        List<BookMark> likeList = br.findByToolcardAndUser(id,user.getId());
        Map<String, String> hashMap = new HashMap<>();

        if (likeList.size() > 0) {

            br.delete(likeList.get(0));
            hashMap.put("response", "UnBookMarked sucessfully!");

        }
        else {
            hashMap.put("response", "BookMarked sucessfully");
            br.save(new BookMark(tr.findById(id).get(),user));
        }



      
        return new ResponseEntity<Map<String,String>>(hashMap,HttpStatus.ACCEPTED);
                
    }


}
