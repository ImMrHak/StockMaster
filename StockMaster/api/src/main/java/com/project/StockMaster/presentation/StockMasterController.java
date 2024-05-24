package com.project.StockMaster.presentation;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.StockMaster.dao.Utilisateur;
import com.project.StockMaster.services.GestionUtilisateur;

import lombok.Data;

@Controller
@RequestMapping("/StockMaster/api")
@Data
public class StockMasterController {
	
	private final GestionUtilisateur GU;
	
	/*@PostMapping("/inscrire")
	public ResponseEntity<?> sInscrire(@RequestBody Utilisateur u) {
		return (GU.ajouterUtilisateur(u)) ? ResponseEntity.ok("Created") : ResponseEntity.status(HttpStatus.CONFLICT).body("Not Created");
	}*/
	
	@PostMapping("/authentifier")
	public @ResponseBody ResponseEntity<?> sAuthentifier(@RequestBody Map<String, String> iu) {
		String email = iu.get("email");
	    String motpasse = iu.get("motpasse");
	    Utilisateur u = GU.authentifierUtilisateur(email, motpasse);
	    return (u != null) ? ResponseEntity.ok().body(u) : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
	}
}
