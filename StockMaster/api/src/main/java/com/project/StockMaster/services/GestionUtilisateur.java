package com.project.StockMaster.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.StockMaster.Security.Encrypt;
import com.project.StockMaster.dao.Utilisateur;

import lombok.Data;

@Service @Data
public class GestionUtilisateur {
	
	private final IGestionUtilisateur iGU;
	private final GestionRole GR;
	
	/* OPERATION CRUD */
	
	public boolean ajouterCustomUtilisateur(Utilisateur u) {
		if(u == null) return false;
		u.setMotpasse(Encrypt.encryptPassword(u.getMotpasse())); 
		iGU.save(u);
		return true;
	}
	
	public boolean ajouterUtilisateur(Utilisateur u) {
		if(u == null) return false;
		u.setRole(GR.chercherRole(Utils.ROLE_USER));
		u.setMotpasse(Encrypt.encryptPassword(u.getMotpasse())); 
		iGU.save(u);
		return true;
	}
	
	public boolean supprimerUtilisateur(int idUtilisateur) {
		if(idUtilisateur < 1) return false;
        iGU.deleteById(idUtilisateur);
        return true;
    }
	
	public boolean modifierUtilisateur(Utilisateur u) {
		if(u == null) return false;
		iGU.save(u);
		return true;
    }
	
	public Utilisateur chercherUtilisateur(int idUtilisateur) {
		return iGU.findById(idUtilisateur).get();
	}
	
	public List<Utilisateur> afficherUtilisateurs() {
        return iGU.findAll();
    }
	
	/* OPERATION PERSONNALISER */
	
	public Utilisateur authentifierUtilisateur(String email, String motpasse) {
	    return iGU.findAll()
	            .stream()
	            .filter(user -> user.getEmail().equals(email))
	            .findFirst()
	            .filter(user -> Encrypt.matches(motpasse, user.getMotpasse()))
	            .orElse(null);
	}
	
	public List<Utilisateur> chercherUttilisateurEmail(String email){
		return iGU.findAll()
	            .stream()
	            .filter(user -> user.getEmail().startsWith(email))
	            .toList();
	}
}
