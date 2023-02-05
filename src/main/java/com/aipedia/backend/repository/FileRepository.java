package com.aipedia.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aipedia.backend.entity.File;

public interface FileRepository extends JpaRepository<File, String> {
    
}
