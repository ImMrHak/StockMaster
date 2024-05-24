package com.project.StockMaster.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.StockMaster.dao.Utilisateur;

public interface IGestionUtilisateur extends JpaRepository<Utilisateur, Integer>{
	
}
