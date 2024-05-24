package com.project.StockMaster.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.StockMaster.dao.CommandeArticle;

public interface IGestionCommandeArticle extends JpaRepository<CommandeArticle, Integer>{

}
