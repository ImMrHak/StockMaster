package com.project.StockMaster.dao;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Entity
public class Fournisseur {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFournisseur;
    private String numeroTelephone;
    private String nom;
    private String email;
    
    @OneToMany(mappedBy = "fournisseur", cascade = CascadeType.REMOVE) @JsonIgnore
    private List<ArticleFournisseur> articleFournisseurs;
}