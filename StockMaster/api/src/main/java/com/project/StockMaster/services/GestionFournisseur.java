package com.project.StockMaster.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.StockMaster.dao.Fournisseur;

import lombok.Data;

@Service @Data
public class GestionFournisseur {
	
	private final IGestionFournisseur iGF;
	
	/* OPERATION CRUD */
	
	public boolean ajouterFournisseur(Fournisseur f) {
		if(f == null) return false;
		iGF.save(f);
		return true;
	}
	
	public boolean supprimerFournisseur(int idFournisseur) {
		if(idFournisseur < 1) return false;
		iGF.deleteById(idFournisseur);
        return true;
    }
	
	public boolean modifierFournisseur(Fournisseur f) {
		if(f == null) return false;
		iGF.save(f);
		return true;
    }
	
	public Fournisseur chercherFournisseur(int idFournisseur) {
		return iGF.findById(idFournisseur).get();
	}
	
	public List<Fournisseur> afficherFournisseurs() {
        return iGF.findAll();
    }
	
	/* OPERATION PERSONNALISER */
}
