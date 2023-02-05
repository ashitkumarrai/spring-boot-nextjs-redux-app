package com.aipedia.backend.entity;

import java.util.List;
import java.util.PriorityQueue;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TopHashtag{

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private Long id;
    @OneToOne(cascade = CascadeType.MERGE)
     private HashTag hashTag;
    
     @OneToMany(cascade = CascadeType.ALL)
     private List<TopToolCard> top;

     




    

    
}
