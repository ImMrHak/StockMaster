package com.project.StockMaster.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.StockMaster.dao.Article;

import lombok.Data;

@Service @Data
public class GestionArticle {
	
	private final IGestionArticle iGA;
	
	/* OPERATION CRUD */
	
	public boolean ajouterArticle(Article a) {
		if(a == null) return false;
		iGA.save(a);
		return true;
	}
	
	public boolean supprimerArticle(int idArticle) {
		if(idArticle < 1) return false;
		iGA.deleteById(idArticle);
        return true;
    }
	
	public boolean modifierArticle(Article a) {
		if(a == null) return false;
		iGA.save(a);
		return true;
    }
	
	public Article chercherArticle(int idArticle) {
		return iGA.findById(idArticle).get();
	}
	
	public List<Article> afficherArticles() {
        return iGA.findAll();
    }
	
	/* OPERATION PERSONNALISER */
}
