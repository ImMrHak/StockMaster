package com.project.StockMaster.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.StockMaster.dao.Role;

import lombok.Data;

@Service @Data
public class GestionRole {
	
	private final IGestionRole iGR;
	
	/* OPERATION CRUD */
	
	public boolean ajouterRole(Role r) {
		if(r == null) return false;
		iGR.save(r);
		return true;
	}
	
	public boolean supprimerRole(int idRole) {
		if(idRole < 1) return false;
		iGR.deleteById(idRole);
        return true;
    }
	
	public boolean modifierRole(Role r) {
		if(r == null) return false;
		iGR.save(r);
		return true;
    }
	
	public Role chercherRole(int idRole) {
		return iGR.findById(idRole).get();
	}
	
	public List<Role> afficherRoles() {
        return iGR.findAll();
    }
	
	/* OPERATION PERSONNALISER */
}
