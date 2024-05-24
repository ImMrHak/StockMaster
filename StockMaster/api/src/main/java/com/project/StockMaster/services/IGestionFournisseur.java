package com.project.StockMaster.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.StockMaster.dao.Fournisseur;

public interface IGestionFournisseur extends JpaRepository<Fournisseur, Integer>{

}
