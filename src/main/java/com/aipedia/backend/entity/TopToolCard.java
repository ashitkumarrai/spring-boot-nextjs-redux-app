package com.aipedia.backend.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TopToolCard {


     
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    
    private Long id;
    
   
    private Long rank;

    @OneToOne(cascade = CascadeType.MERGE)
    private ToolCard toolcard;

    

  

}
