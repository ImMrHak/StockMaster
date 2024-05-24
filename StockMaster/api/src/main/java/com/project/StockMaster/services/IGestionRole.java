package com.project.StockMaster.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.StockMaster.dao.Role;

public interface IGestionRole extends JpaRepository<Role, Integer>{

	 List<Role> findByLibelle (String Libelle);
}
