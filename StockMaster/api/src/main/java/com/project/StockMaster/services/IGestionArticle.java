package com.project.StockMaster.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.StockMaster.dao.Article;

public interface IGestionArticle extends JpaRepository<Article, Integer>{

}
