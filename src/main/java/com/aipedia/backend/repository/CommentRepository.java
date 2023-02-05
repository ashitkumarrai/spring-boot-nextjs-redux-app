package com.aipedia.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import com.aipedia.backend.entity.Comment;


public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select comment from Comment comment where comment.creator.username = ?#{principal.username}")
    List<Comment> findByCreatorIsCurrentUser();


    
    Page<Comment> findAll(Pageable pageable);

}
