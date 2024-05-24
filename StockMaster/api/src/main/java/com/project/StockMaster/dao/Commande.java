package com.project.StockMaster.dao;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Entity
public class Commande {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCommande;
    private Date date;
    private float prixTotal;
    private int status;

    @ManyToOne
    private Utilisateur utilisateur; 
    
    @OneToMany(mappedBy = "commande", cascade = CascadeType.REMOVE) @JsonIgnore
    private List<CommandeArticle> commandeArticles;
}

