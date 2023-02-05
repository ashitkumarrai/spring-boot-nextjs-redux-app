package com.aipedia.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aipedia.backend.entity.TopHashtag;


@Repository
public interface TopHashTagRepository  extends JpaRepository<TopHashtag, Long>{
    
}
