package com.project.StockMaster.dao;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
public class Article {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idArticle;
    @Column(unique=true)
    private String libelle;
    @Nullable
    private int quantite;
    private float prixUnitaire;
    
    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE) @JsonIgnore
    private List<CommandeArticle> commandeArticles;
    
    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE) @JsonIgnore
    private List<ArticleFournisseur> articleFournisseurs;
}
