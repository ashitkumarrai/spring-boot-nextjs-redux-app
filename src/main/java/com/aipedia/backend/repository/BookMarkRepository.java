package com.aipedia.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import com.aipedia.backend.entity.BookMark;
import com.aipedia.backend.entity.Like;

/**
 * Spring Data JPA repository for the Like entity.
 */
@Repository
public interface BookMarkRepository extends JpaRepository<BookMark, Long> {
    @Query("select jhiLike from Like jhiLike where jhiLike.user.username = ?#{principal.username}")
    List<BookMark> findByUserIsCurrentUser();

    

   

    @Query("SELECT l FROM BookMark l WHERE l.toolcard.id = ?1 and l.user.id = ?2")
    List<BookMark> findByToolcardAndUser(long t, Long u);
}

