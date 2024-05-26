package com.project.StockMaster.presentation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.StockMaster.dao.Utilisateur;
import com.project.StockMaster.services.GestionArticle;
import com.project.StockMaster.services.GestionArticleFournisseur;
import com.project.StockMaster.services.GestionCommande;
import com.project.StockMaster.services.GestionCommandeArticle;
import com.project.StockMaster.services.GestionFournisseur;
import com.project.StockMaster.services.GestionRole;
import com.project.StockMaster.services.GestionUtilisateur;
import com.project.StockMaster.services.Utils;

import lombok.Data;

@Controller
@RequestMapping("/StockMaster/api")
@Data
public class UserController {
	private final GestionArticle GA;
	private final GestionArticleFournisseur GAF;
	private final GestionCommande GC;
	private final GestionCommandeArticle GCA;
	private final GestionFournisseur GF;
	private final GestionRole GR;
	private final GestionUtilisateur GU;
	
	@PostMapping("/user/listCommandeArticles/{idCommande}")
	public @ResponseBody ResponseEntity<?> listCommandeArticles(@RequestBody Utilisateur u, @PathVariable int idCommande){
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_USER) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
		
		return ResponseEntity.ok().body(GCA.afficherCommandeArticles().stream().filter(ca -> ca.getCommande().getUtilisateur().getIdUtilisateur().equals(utilisateurTrouver.getIdUtilisateur()) && ca.getCommande().getIdCommande().equals(idCommande)).toList());
	}
	
	@PostMapping("/user/listCommandes")
	public @ResponseBody ResponseEntity<?> listCommandesUtilisateur(@RequestBody Utilisateur u){
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_USER) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
		
		return ResponseEntity.ok().body(GC.afficherCommandes().stream().filter(c -> c.getUtilisateur().getIdUtilisateur().equals(u.getIdUtilisateur())));
	}
}