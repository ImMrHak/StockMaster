package com.project.StockMaster.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Entity
public class CommandeArticle {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCommandeArticle;

    private int quantite;

    @ManyToOne
    private Commande commande;

    @ManyToOne
    private Article article;
}
