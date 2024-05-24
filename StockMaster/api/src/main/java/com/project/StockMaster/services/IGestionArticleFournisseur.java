package com.project.StockMaster.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.StockMaster.dao.ArticleFournisseur;

public interface IGestionArticleFournisseur extends JpaRepository<ArticleFournisseur, Integer>{

}
