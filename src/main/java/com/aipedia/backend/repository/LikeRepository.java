package com.aipedia.backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.aipedia.backend.entity.Like;

/**
 * Spring Data JPA repository for the Like entity.
 */
@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    @Query("select jhiLike from Like jhiLike where jhiLike.user.username = ?#{principal.username}")
    List<Like> findByUserIsCurrentUser();

    

   

    @Query("SELECT l FROM Like l WHERE l.toolcard.id = ?1 and l.user.id = ?2")
    List<Like> findByToolcardAndUser(long t, Long u);
}
