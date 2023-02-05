package com.aipedia.backend.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import com.aipedia.backend.entity.HashTag;
import java.util.*;

/**
 * Spring Data JPA repository for the HashTag entity.
 */

@Repository
public interface HashTagRepository extends JpaRepository<HashTag, Long> {


    Page<HashTag> findAll(Pageable pageable);

    List<HashTag> findByName(String name);
}
