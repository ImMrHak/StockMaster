package com.project.StockMaster.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.StockMaster.dao.CommandeArticle;

import lombok.Data;

@Service @Data
public class GestionCommandeArticle {
	
	private final IGestionCommandeArticle iGCA;
	
	/* OPERATION CRUD */
	
	public boolean ajouterCommandeArticle(CommandeArticle ca) {
		if(ca == null) return false;
		iGCA.save(ca);
		return true;
	}
	
	public boolean supprimerCommandeArticle(int idCommandeArticle) {
		if(idCommandeArticle < 1) return false;
		iGCA.deleteById(idCommandeArticle);
        return true;
    }
	
	public boolean modifierCommandeArticle(CommandeArticle ca) {
		if(ca == null) return false;
		iGCA.save(ca);
		return true;
    }
	
	public CommandeArticle chercherCommandeArticle(int idCommandeArticle) {
		return iGCA.findById(idCommandeArticle).get();
	}
	
	public List<CommandeArticle> afficherCommandeArticles() {
        return iGCA.findAll();
    }
	
	/* OPERATION PERSONNALISER */
}
