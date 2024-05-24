package com.project.StockMaster.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.StockMaster.dao.Commande;
import lombok.Data;

@Service @Data
public class GestionCommande {
	
	private final IGestionCommande iGC;
	
	/* OPERATION CRUD */
	
	public boolean ajouterCommande(Commande c) {
		if(c == null) return false;
		iGC.save(c);
		return true;
	}
	
	public boolean supprimerCommande(int idCommande) {
		if(idCommande < 1) return false;
		iGC.deleteById(idCommande);
        return true;
    }
	
	public boolean modifierCommande(Commande c) {
		if(c == null) return false;
		iGC.save(c);
		return true;
    }
	
	public Commande chercherCommande(int idCommande) {
		return iGC.findById(idCommande).get();
	}
	
	public List<Commande> afficherCommandes() {
        return iGC.findAll();
    }
	
	/* OPERATION PERSONNALISER */
}
