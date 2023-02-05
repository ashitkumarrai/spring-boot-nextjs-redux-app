package com.aipedia.backend.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.aipedia.backend.entity.ToolCard;

/**
 * Spring Data JPA repository for the ToolCard entity.
 *
 * When extending this class, extend ToolCardRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface ToolCardRepository extends JpaRepository<ToolCard, Long> {
    @Query("select toolCard from ToolCard toolCard where toolCard.creator.username = ?#{principal.username}")
    Page<ToolCard>findByCreatorIsCurrentUser(Pageable pageable);

    
    

    @Query("SELECT p FROM ToolCard p WHERE " +
    "p.title LIKE CONCAT('%',:query, '%')" +
    "Or p.description LIKE CONCAT('%', :query, '%')")
    List<ToolCard> searchToolCards(@Param("query") String query);


    Page<ToolCard> findAll(Pageable pageable);

   
    @Query("select toolCard from ToolCard toolCard join  toolCard.likes  tl where tl.user.username = ?#{principal.username}")
    Page<ToolCard> findByCurrentUserLiked(Pageable pageable);



    @Query("select toolCard from ToolCard toolCard join  toolCard.hashtags  tl where tl.name LIKE CONCAT('%', :hashtag, '%')")
    Page<ToolCard> findByHashtags(@Param("hashtag") String hashtags,Pageable pageable);




    @Query("select toolCard from ToolCard toolCard join  toolCard.bookmarks  tl where tl.user.username = ?#{principal.username}")
    Page<ToolCard> findByCurrentUserBookMarked(Pageable pageable);



    @Query("select toolCard from ToolCard toolCard join  toolCard.tags  tl where tl.name LIKE CONCAT('%', :tag, '%')")
    Page<ToolCard> findByTags(@Param("tag") String tags,Pageable pageable);
}

