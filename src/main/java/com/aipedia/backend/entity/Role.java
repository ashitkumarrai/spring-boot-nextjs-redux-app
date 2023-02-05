package com.aipedia.backend.entity;


 


import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role {


    @Id
    private Long id;
     
    private String name;
  
    
  
}
