package com.project.StockMaster.presentation;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.StockMaster.Security.Encrypt;
import com.project.StockMaster.dao.Article;
import com.project.StockMaster.dao.ArticleFournisseur;
import com.project.StockMaster.dao.Commande;
import com.project.StockMaster.dao.CommandeArticle;
import com.project.StockMaster.dao.Fournisseur;
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
public class AdminController {
	private final GestionArticle GA;
	private final GestionArticleFournisseur GAF;
	private final GestionCommande GC;
	private final GestionCommandeArticle GCA;
	private final GestionFournisseur GF;
	private final GestionRole GR;
	private final GestionUtilisateur GU;
	
	
	
	
	@PostMapping("/admin/totalUtilisateurs")
	public @ResponseBody ResponseEntity<?> totalUtilisateurs(@RequestBody Utilisateur u) {
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
	    if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
	    return ResponseEntity.ok().body(GU.afficherUtilisateurs().size());
	}
	
	@PostMapping("/admin/totalCommandes")
	public @ResponseBody ResponseEntity<?> totalCommandes(@RequestBody Utilisateur u) {
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
	    return ResponseEntity.ok().body(GC.afficherCommandes().size());
	}
	
	@PostMapping("/admin/totalArticles")
	public @ResponseBody ResponseEntity<?> totalArticles(@RequestBody Utilisateur u) {
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
	    return ResponseEntity.ok().body(GA.afficherArticles().size());
	}
	
	
	
	
	@PostMapping("/admin/listUtilisateurs")
	public @ResponseBody ResponseEntity<?> listUtilisateurs(@RequestBody Utilisateur u){
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
		return ResponseEntity.ok().body(GU.afficherUtilisateurs());
	}
	
	@PostMapping("/admin/listCommandes")
	public @ResponseBody ResponseEntity<?> listCommandes(@RequestBody Utilisateur u){
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
		
		return ResponseEntity.ok().body(GC.afficherCommandes());
	}
	
	@PostMapping("/admin/listCommandeArticles/{idCommande}")
	public @ResponseBody ResponseEntity<?> listCommandeArticles(@RequestBody Utilisateur u, @PathVariable int idCommande){
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
		return ResponseEntity.ok().body(GCA.afficherCommandeArticles().stream().filter(ca -> ca.getCommande().getIdCommande().equals(idCommande)));
	}
	
	@PostMapping("/admin/listCommandes/{idUtilisateur}")
	public @ResponseBody ResponseEntity<?> listCommandesUtilisateur(@RequestBody Utilisateur u, @PathVariable int idUtilisateur){
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
		
		return ResponseEntity.ok().body(GC.afficherCommandes().stream().filter(c -> c.getUtilisateur().getIdUtilisateur().equals(idUtilisateur)));
	}
	
	@PostMapping("/admin/listArticles")
	public @ResponseBody ResponseEntity<?> listArticles(@RequestBody Utilisateur u){
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
		return ResponseEntity.ok().body(GA.afficherArticles());
	}
	
	@PostMapping("/admin/listArticlesFournisseurs")
    public @ResponseBody ResponseEntity<?> listArticlesFournisseurs(@RequestBody Utilisateur u) {
        if (u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");

        Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
        if (u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
        if (!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
        if (utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");

        List<ArticleFournisseur> allArticleFournisseurs = GAF.afficherArticleFournisseurs();

        Map<Integer, ArticleFournisseur> latestArticleFournisseurs = allArticleFournisseurs.stream()
            .collect(Collectors.toMap(
                af -> af.getArticle().getIdArticle(),
                af -> af,
                (af1, af2) -> af1.getDate().after(af2.getDate()) ? af1 : af2
            ));

        List<ArticleFournisseur> latestArticleFournisseurList = latestArticleFournisseurs.values().stream().collect(Collectors.toList());

        return ResponseEntity.ok().body(latestArticleFournisseurList);
    }
	
	@PostMapping("/admin/listFournisseurs")
	public @ResponseBody ResponseEntity<?> listFournisseurs(@RequestBody Utilisateur u){
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
		return ResponseEntity.ok().body(GF.afficherFournisseurs());
	}
	
	@PostMapping("/admin/listRoles")
	public @ResponseBody ResponseEntity<?> listRoles(@RequestBody Utilisateur u){
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
		return ResponseEntity.ok().body(GR.afficherRoles());
	}
	
	
	
	
	@PostMapping("/admin/ajouterUtilisateur")
	public @ResponseBody ResponseEntity<?> adminAjouteUtilisateur(@RequestBody Map<Object, Object> us){
		Utilisateur u = null;
	    Utilisateur ua = null;
	    
	    ObjectMapper objectMapper = new ObjectMapper();
	    
	    for (Map.Entry<Object, Object> entry : us.entrySet()) {
            if ("u".equals(entry.getKey())) {
                u = objectMapper.convertValue(entry.getValue(), Utilisateur.class);
            } else if ("ua".equals(entry.getKey())) {
                ua = objectMapper.convertValue(entry.getValue(), Utilisateur.class);
            }
	    }
	    
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
		
		return ResponseEntity.ok().body(GU.ajouterCustomUtilisateur(ua));
	}

	@DeleteMapping("/admin/supprimerUtilisateur/{idUtilisateur}")
	public @ResponseBody ResponseEntity<?> adminSupprimeUtilisateur(@RequestBody Utilisateur u, @PathVariable int idUtilisateur){
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
		return ResponseEntity.ok().body(GU.supprimerUtilisateur(idUtilisateur));
	}
	
	@PutMapping("/admin/modifierUtilisateur/{idUtilisateur}")
	public @ResponseBody ResponseEntity<?> adminModifierUtilisateur(@RequestBody Map<Object, Object> us, @PathVariable int idUtilisateur){
		Utilisateur u = null;
	    Utilisateur ua = null;
	    
	    ObjectMapper objectMapper = new ObjectMapper();
	    
	    for (Map.Entry<Object, Object> entry : us.entrySet()) {
            if ("u".equals(entry.getKey())) {
                u = objectMapper.convertValue(entry.getValue(), Utilisateur.class);
            } else if ("ua".equals(entry.getKey())) {
                ua = objectMapper.convertValue(entry.getValue(), Utilisateur.class);
            }
	    }
		
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
		
		if(ua.getIdUtilisateur() != idUtilisateur) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked id");
		if(ua.getIdUtilisateur() != GU.chercherUtilisateur(idUtilisateur).getIdUtilisateur()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("introuvable");
		
		ua.setMotpasse(Encrypt.encryptPassword(ua.getMotpasse()));
		return ResponseEntity.ok().body(GU.modifierUtilisateur(ua));
	}
	
	@PutMapping("/admin/modifierProfil")
	public @ResponseBody ResponseEntity<?> adminModifieSonProfil(@RequestBody Utilisateur u){
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
		
		return ResponseEntity.ok().body(GU.modifierUtilisateur(u));
	}
	
	
	
	
	@PostMapping("/admin/ajouterFournisseur")
	public @ResponseBody ResponseEntity<?> adminAjouteFournisseur(@RequestBody Map<Object, Object> us){
		Utilisateur u = null;
	    Fournisseur fa = null;
	    
	    ObjectMapper objectMapper = new ObjectMapper();
	    
	    for (Map.Entry<Object, Object> entry : us.entrySet()) {
            if ("u".equals(entry.getKey())) {
                u = objectMapper.convertValue(entry.getValue(), Utilisateur.class);
            } else if ("ua".equals(entry.getKey())) {
                fa = objectMapper.convertValue(entry.getValue(), Fournisseur.class);
            }
	    }
	    
	    if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
		return ResponseEntity.ok().body(GF.ajouterFournisseur(fa));
	}

	@DeleteMapping("/admin/supprimerFournisseur/{idFournisseur}")
    public @ResponseBody ResponseEntity<?> adminSupprimeFournisseur(@RequestBody Utilisateur u, @PathVariable int idFournisseur){
        if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
        Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
        if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
        if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
        if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");

        return ResponseEntity.ok().body(GF.supprimerFournisseur(idFournisseur));
    }
	
	@PutMapping("/admin/modifierFournisseur/{idFournisseur}")
	public @ResponseBody ResponseEntity<?> adminModifierFournisseur(@RequestBody Map<Object, Object> us, @PathVariable int idFournisseur){
		Utilisateur u = null;
	    Fournisseur fa = null;
	    
	    ObjectMapper objectMapper = new ObjectMapper();
	    
	    for (Map.Entry<Object, Object> entry : us.entrySet()) {
            if ("u".equals(entry.getKey())) {
                u = objectMapper.convertValue(entry.getValue(), Utilisateur.class);
            } else if ("ua".equals(entry.getKey())) {
                fa = objectMapper.convertValue(entry.getValue(), Fournisseur.class);
            }
	    }
		
		if(u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
		Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
		if(u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
		if(!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
		if(utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
		
		if(fa.getIdFournisseur() != idFournisseur) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked id");
		if(fa.getIdFournisseur() != GF.chercherFournisseur(idFournisseur).getIdFournisseur()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("introuvable");

		return ResponseEntity.ok().body(GF.modifierFournisseur(fa));
	}
	
	
	
	
	@PostMapping("/admin/ajouterArticle")
	public @ResponseBody ResponseEntity<?> adminAjouteArticle(@RequestBody Map<Object, Map<Object, Object>> us) {
	    Utilisateur u = null;
	    Article aa = null;
	    Fournisseur fa = null;

	    ObjectMapper objectMapper = new ObjectMapper();

	    for (Entry<Object, Map<Object, Object>> entry : us.entrySet()) {
	        if ("utilisateur".equals(entry.getKey())) {
	            u = objectMapper.convertValue(entry.getValue(), Utilisateur.class);
	        } else if ("articlefournisseur".equals(entry.getKey())) {
	            Map<Object, Object> aafa = objectMapper.convertValue(entry.getValue(), Map.class);
	            for (Entry<Object, Object> entry_ua : aafa.entrySet()) {
	                if ("article".equals(entry_ua.getKey())) {
	                    aa = objectMapper.convertValue(entry_ua.getValue(), Article.class);
	                } else if ("fournisseur".equals(entry_ua.getKey())) {
	                    fa = objectMapper.convertValue(entry_ua.getValue(), Fournisseur.class);
	                }
	            }
	        }
	    }

	    if (u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
	    Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
	    if (u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
	    if (!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
	    if (utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
	    return ResponseEntity.ok().body((GA.ajouterArticle(aa) && GAF.ajouterArticleFournisseur(new ArticleFournisseur(null, new Date(System.currentTimeMillis()), aa.getQuantite(), fa, aa))));
	}
	
	@DeleteMapping("/admin/supprimerArticle/{idArticle}")
	public @ResponseBody ResponseEntity<?> adminSupprimeArticle(@RequestBody Utilisateur u, @PathVariable int idArticle){
		if (u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
	    Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
	    if (u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
	    if (!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
	    if (utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
	    return ResponseEntity.ok().body(GA.supprimerArticle(idArticle));
	}
	
	@PutMapping("/admin/modifierArticle/{idArticle}")
	public @ResponseBody ResponseEntity<?> adminModifierArticle(@RequestBody Map<Object, Map<Object, Object>> us, @PathVariable int idArticle){
		Utilisateur u = null;
	    Article aa = null;
	    Fournisseur fa = null;

	    ObjectMapper objectMapper = new ObjectMapper();

	    for (Entry<Object, Map<Object, Object>> entry : us.entrySet()) {
	        if ("utilisateur".equals(entry.getKey())) {
	            u = objectMapper.convertValue(entry.getValue(), Utilisateur.class);
	        } else if ("articlefournisseur".equals(entry.getKey())) {
	            Map<Object, Object> aafa = objectMapper.convertValue(entry.getValue(), Map.class);
	            for (Entry<Object, Object> entry_ua : aafa.entrySet()) {
	                if ("article".equals(entry_ua.getKey())) {
	                    aa = objectMapper.convertValue(entry_ua.getValue(), Article.class);
	                } else if ("fournisseur".equals(entry_ua.getKey())) {
	                    fa = objectMapper.convertValue(entry_ua.getValue(), Fournisseur.class);
	                }
	            }
	        }
	    }
	    
	    if (u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
	    Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
	    if (u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
	    if (!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
	    if (utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
	    if(aa.getIdArticle() != idArticle) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked id");
		if(aa.getIdArticle() != GA.chercherArticle(idArticle).getIdArticle()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("introuvable");
		
	    
	    Article articleTrouver = GA.chercherArticle(idArticle);
	    int quantiteAjouter = aa.getQuantite();
	    aa.setQuantite(articleTrouver.getQuantite() + aa.getQuantite());
	    
		return ResponseEntity.ok().body((GA.modifierArticle(aa) && GAF.ajouterArticleFournisseur(new ArticleFournisseur(null, new Date(System.currentTimeMillis()), quantiteAjouter, fa, aa))));
	}
	
	
	
	
	@PostMapping("/admin/ajouterCommande")
	public @ResponseBody ResponseEntity<?> adminAjouteCommande(@RequestBody Map<Object, Map<Object, Object>> us){
		Utilisateur u = null;
		Utilisateur aa = null;
	    List<CommandeArticle> la = null;

	    ObjectMapper objectMapper = new ObjectMapper();

	    for (Entry<Object, Map<Object, Object>> entry : us.entrySet()) {
	        if ("utilisateur".equals(entry.getKey())) {
	            u = objectMapper.convertValue(entry.getValue(), Utilisateur.class);
	        } else if ("commandeutilisateurarticle".equals(entry.getKey())) {
	            Map<Object, Object> aafa = objectMapper.convertValue(entry.getValue(), Map.class);
	            for (Entry<Object, Object> entry_ua : aafa.entrySet()) {
	                if ("commandeutilisateur".equals(entry_ua.getKey())) {
	                    aa = objectMapper.convertValue(entry_ua.getValue(), Utilisateur.class);
	                } else if ("articles".equals(entry_ua.getKey())) {
	                	la = objectMapper.convertValue(entry_ua.getValue(), objectMapper.getTypeFactory().constructCollectionType(List.class, CommandeArticle.class));
	                }
	            }
	        }
	    }
	    
	    if (u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
	    Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
	    if (u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
	    if (!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
	    if (utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
	    
	    float prixTotal = 0;
	    
	    for(CommandeArticle ca : la) {
	    	prixTotal += ca.getQuantite() * ca.getArticle().getPrixUnitaire();
	    }
	    Commande c = new Commande(null, new Date(System.currentTimeMillis()), prixTotal, Utils.STATUS_EN_PREPARATION, aa, null);
	    
	    GC.ajouterCommande(c);
	    for(CommandeArticle ca : la) {
	    	Article amc = GA.chercherArticle(ca.getArticle().getIdArticle());
	    	amc.setQuantite((amc.getQuantite() - ca.getQuantite() < 0) ? 0 : amc.getQuantite() - ca.getQuantite());
	    	
	    	GA.modifierArticle(amc);
	    	GCA.ajouterCommandeArticle(new CommandeArticle(null, ca.getQuantite(), c, ca.getArticle()));
	    }

	    return ResponseEntity.ok().body(true);
	}
	
	@DeleteMapping("/admin/supprimerCommande/{idCommande}")
	public @ResponseBody ResponseEntity<?> adminSupprimeCommande(@RequestBody Utilisateur u, @PathVariable int idCommande){
		if (u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
	    Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
	    if (u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
	    if (!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
	    if (utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");

	    Commande ccc = GC.chercherCommande(idCommande);
	    for(CommandeArticle ca : ccc.getCommandeArticles()) {
	    	ca.getArticle().setQuantite(ca.getArticle().getQuantite() + ca.getQuantite());
	    }
	    
	    return ResponseEntity.ok().body(GC.supprimerCommande(idCommande));
	}
	
	@PutMapping("/admin/modifierCommande/{idCommande}")
	public @ResponseBody ResponseEntity<?> adminModifierCommande(@RequestBody Map<Object, Map<Object, Object>> us , @PathVariable int idCommande){
		Utilisateur u = null;
		Utilisateur aa = null;
	    List<CommandeArticle> la = null;

	    ObjectMapper objectMapper = new ObjectMapper();

	    for (Entry<Object, Map<Object, Object>> entry : us.entrySet()) {
	        if ("utilisateur".equals(entry.getKey())) {
	            u = objectMapper.convertValue(entry.getValue(), Utilisateur.class);
	        } else if ("commandeutilisateurarticle".equals(entry.getKey())) {
	            Map<Object, Object> aafa = objectMapper.convertValue(entry.getValue(), Map.class);
	            for (Entry<Object, Object> entry_ua : aafa.entrySet()) {
	                if ("commandeutilisateur".equals(entry_ua.getKey())) {
	                    aa = objectMapper.convertValue(entry_ua.getValue(), Utilisateur.class);
	                } else if ("articles".equals(entry_ua.getKey())) {
	                	la = objectMapper.convertValue(entry_ua.getValue(), objectMapper.getTypeFactory().constructCollectionType(List.class, CommandeArticle.class));
	                }
	            }
	        }
	    }
	    if (u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
	    Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
	    if (u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
	    if (!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
	    if (utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
	    if(la == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("article null");

	    Commande ccc = GC.chercherCommande(idCommande);
	    int statusCommande = ccc.getStatus();
	    for(CommandeArticle ca : ccc.getCommandeArticles()) {
	    	ca.getArticle().setQuantite(ca.getArticle().getQuantite() + ca.getQuantite());
	    }
	    
	    List<CommandeArticle> lcaa = GCA.afficherCommandeArticles().stream().filter(ca -> ca.getCommande().getIdCommande().equals(idCommande)).toList();
	    
	    for(CommandeArticle ca : lcaa) {
	    	GCA.supprimerCommandeArticle(ca.getIdCommandeArticle());
	    }
	    
	    float prixTotal = 0;
	    
	    
	    for(CommandeArticle ca : la) {
	    	prixTotal += ca.getQuantite() * ca.getArticle().getPrixUnitaire();
	    }
	    Commande c = new Commande(ccc.getIdCommande(), new Date(System.currentTimeMillis()), prixTotal, statusCommande, aa, null);
	    
	    GC.modifierCommande(c);
	    for(CommandeArticle ca : la) {
	    	Article amc = GA.chercherArticle(ca.getArticle().getIdArticle());
	    	amc.setQuantite(amc.getQuantite() - ca.getQuantite());
	    	
	    	GA.modifierArticle(amc);
	    	GCA.ajouterCommandeArticle(new CommandeArticle(null, ca.getQuantite(), c, ca.getArticle()));
	    }
	    return ResponseEntity.ok().body(true);
	}

	@PostMapping("/admin/modifierStatusCommande/{idCommande}")
	public @ResponseBody ResponseEntity<?> adminModifierStatusCommande(@RequestBody Utilisateur u , @PathVariable int idCommande){
		if (u == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NULL");
	    Utilisateur utilisateurTrouver = GU.chercherUtilisateur(u.getIdUtilisateur());
	    if (u.getRole().getIdRole() != utilisateurTrouver.getRole().getIdRole()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked role");
	    if (!u.getEmail().equals(utilisateurTrouver.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("faked email");
	    if (utilisateurTrouver.getRole().getIdRole() != Utils.ROLE_ADMIN) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ASDSA");
	    
	    if(GC.chercherCommande(idCommande) == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("null");
		if(idCommande != GC.chercherCommande(idCommande).getIdCommande()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("introuvable");
		
		Commande c = GC.chercherCommande(idCommande);
		
		if(c.getStatus() == Utils.STATUS_EN_PREPARATION) {
			c.setStatus(Utils.STATUS_EN_EXPEDITION);
		}
		else if(c.getStatus() == Utils.STATUS_EN_EXPEDITION) {
			c.setStatus(Utils.STATUS_LIVREE);
		}
		else if(c.getStatus() == Utils.STATUS_LIVREE) {
			c.setStatus(Utils.STATUS_EN_PREPARATION);
		}

		return ResponseEntity.ok().body(GC.modifierCommande(c));
	}
}
