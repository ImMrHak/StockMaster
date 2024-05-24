package com.project.StockMaster.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.StockMaster.dao.Commande;

public interface IGestionCommande extends JpaRepository<Commande,Integer>{
	
}
