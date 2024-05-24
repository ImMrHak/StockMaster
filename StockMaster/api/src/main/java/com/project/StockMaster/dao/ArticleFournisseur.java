package com.project.StockMaster.dao;

import java.sql.Date;

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
public class ArticleFournisseur {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idArticleFournisseur;
	
	private Date date;

    private int quantite;

    @ManyToOne
    private Fournisseur fournisseur;

    @ManyToOne
    private Article article;
}
