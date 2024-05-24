package com.project.StockMaster.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.StockMaster.dao.ArticleFournisseur;

import lombok.Data;

@Service @Data
public class GestionArticleFournisseur {
	
	private final IGestionArticleFournisseur iGAF;
	
	/* OPERATION CRUD */
	
	public boolean ajouterArticleFournisseur(ArticleFournisseur af) {
		if(af == null) return false;
		iGAF.save(af);
		return true;
	}
	
	public boolean supprimerArticleFournisseur(int idArticleFournisseur) {
		if(idArticleFournisseur < 1) return false;
		iGAF.deleteById(idArticleFournisseur);
        return true;
    }
	
	public boolean modifierArticleFournisseur(ArticleFournisseur af) {
		if(af == null) return false;
		iGAF.save(af);
		return true;
    }
	
	public ArticleFournisseur chercherArticleFournisseur(int idArticleFournisseur) {
		return iGAF.findById(idArticleFournisseur).get();
	}
	
	public List<ArticleFournisseur> afficherArticleFournisseurs() {
        return iGAF.findAll();
    }
	
	/* OPERATION PERSONNALISER */
}
