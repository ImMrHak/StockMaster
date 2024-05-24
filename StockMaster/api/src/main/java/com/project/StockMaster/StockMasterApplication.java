package com.project.StockMaster;

import java.sql.Date;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.project.StockMaster.dao.Article;
import com.project.StockMaster.dao.ArticleFournisseur;
import com.project.StockMaster.dao.Commande;
import com.project.StockMaster.dao.CommandeArticle;
import com.project.StockMaster.dao.Fournisseur;
import com.project.StockMaster.dao.Role;
import com.project.StockMaster.dao.Utilisateur;
import com.project.StockMaster.services.GestionArticle;
import com.project.StockMaster.services.GestionArticleFournisseur;
import com.project.StockMaster.services.GestionCommande;
import com.project.StockMaster.services.GestionCommandeArticle;
import com.project.StockMaster.services.GestionFournisseur;
import com.project.StockMaster.services.GestionRole;
import com.project.StockMaster.services.GestionUtilisateur;
import com.project.StockMaster.services.Utils;

@SpringBootApplication
public class StockMasterApplication {
	private static GestionArticle GA;
	private static GestionArticleFournisseur GAF;
	private static GestionCommande GC;
	private static GestionCommandeArticle GCA;
	private static GestionFournisseur GF;
	private static GestionRole GR;
	private static GestionUtilisateur GU;

	public static void main(String[] args) {
		ApplicationContext ac = SpringApplication.run(StockMasterApplication.class, args);
		
		GA = ac.getBean(GestionArticle.class);
		GAF = ac.getBean(GestionArticleFournisseur.class);
		GC = ac.getBean(GestionCommande.class);
		GCA = ac.getBean(GestionCommandeArticle.class);
		GF = ac.getBean(GestionFournisseur.class);
		GR = ac.getBean(GestionRole.class);
		GU = ac.getBean(GestionUtilisateur.class);
		
		GR.ajouterRole(new Role(1, "USER", null));
        GR.ajouterRole(new Role(2, "ADMIN", null));
        
        GU.ajouterCustomUtilisateur(new Utilisateur(1, "Hakkou", "Mohamed", "Sala Al Jadida", "gtasanandreas123P", "hakkoumohamed23@gmail.com", 23, null, GR.chercherRole(Utils.ROLE_ADMIN)));
        GU.ajouterCustomUtilisateur(new Utilisateur(2, "Belouchi", "Yassine", "Sale", "yassinebelouchi", "belouchi2001@gmail.com", 23, null, GR.chercherRole(Utils.ROLE_ADMIN)));
        GU.ajouterCustomUtilisateur(new Utilisateur(3, "Laabdi", "Omar", "Rabat", "omarlaabdi123P", "omarlaabdi2001@gmail.com", 24, null, GR.chercherRole(Utils.ROLE_USER)));
        GU.ajouterCustomUtilisateur(new Utilisateur(4, "El Mansouri", "Fatima", "Casablanca", "fatimaelmansouri", "fatimaelmansouri@gmail.com", 25, null, GR.chercherRole(Utils.ROLE_USER)));
        GU.ajouterCustomUtilisateur(new Utilisateur(5, "Bouhadi", "Ahmed", "Marrakech", "ahmedbouhadi123P", "ahmedbouhadi@gmail.com", 22, null, GR.chercherRole(Utils.ROLE_USER)));
        GU.ajouterCustomUtilisateur(new Utilisateur(6, "Zeroual", "Nadia", "Fes", "nadiazeroual123P", "nadiazeroual@gmail.com", 27, null, GR.chercherRole(Utils.ROLE_ADMIN)));
        GU.ajouterCustomUtilisateur(new Utilisateur(7, "El Khammari", "Sara", "Tangier", "saraelkhammari123P", "saraelkhammari@gmail.com", 26, null, GR.chercherRole(Utils.ROLE_USER)));
        GU.ajouterCustomUtilisateur(new Utilisateur(8, "Benkhadda", "Youssef", "Agadir", "youssefbenkhadda123P", "youssefbenkhadda@gmail.com", 29, null, GR.chercherRole(Utils.ROLE_ADMIN)));
        GU.ajouterCustomUtilisateur(new Utilisateur(9, "Hamdi", "Hiba", "Oujda", "hibahamdi123P", "hibahamdi@gmail.com", 28, null, GR.chercherRole(Utils.ROLE_USER)));
        GU.ajouterCustomUtilisateur(new Utilisateur(10, "El Guerrouj", "Rachid", "Kenitra", "rachidelguerrouj123P", "rachidelguerrouj@gmail.com", 30, null, GR.chercherRole(Utils.ROLE_ADMIN)));

        
        
        GF.ajouterFournisseur(new Fournisseur(1, "1234567890", "Amazon", "support@amazon.com", null));
        GF.ajouterFournisseur(new Fournisseur(2, "9876543210", "Alibaba", "support@alibaba.com", null));
        GF.ajouterFournisseur(new Fournisseur(3, "1122334455", "eBay", "support@ebay.com", null));
        GF.ajouterFournisseur(new Fournisseur(4, "6677889900", "Walmart", "support@walmart.com", null));
        GF.ajouterFournisseur(new Fournisseur(5, "4433221100", "Best Buy", "support@bestbuy.com", null));
        GF.ajouterFournisseur(new Fournisseur(6, "9988776655", "Target", "support@target.com", null));

        
        
        GA.ajouterArticle(new Article(1, "Apple iPhone 13", 10, 999.99f, null, null));
        GA.ajouterArticle(new Article(2, "Samsung Galaxy S21", 15, 799.99f, null, null));
        GA.ajouterArticle(new Article(3, "Sony WH-1000XM4 Headphones", 20, 349.99f, null, null));
        GA.ajouterArticle(new Article(4, "Dell XPS 13 Laptop", 8, 1299.99f, null, null));
        GA.ajouterArticle(new Article(5, "Nintendo Switch", 25, 299.99f, null, null));
        GA.ajouterArticle(new Article(6, "Apple MacBook Pro", 5, 2399.99f, null, null));
        GA.ajouterArticle(new Article(7, "Google Pixel 6", 12, 599.99f, null, null));
        GA.ajouterArticle(new Article(8, "Sony PlayStation 5", 10, 499.99f, null, null));
        GA.ajouterArticle(new Article(9, "Microsoft Xbox Series X", 10, 499.99f, null, null));
        GA.ajouterArticle(new Article(10, "Bose QuietComfort 35 II", 18, 299.99f, null, null));

        
        
        GAF.ajouterArticleFournisseur(new ArticleFournisseur(1, new Date(System.currentTimeMillis()), 100, GF.chercherFournisseur(1), GA.chercherArticle(1)));
        GAF.ajouterArticleFournisseur(new ArticleFournisseur(2, new Date(System.currentTimeMillis()), 150, GF.chercherFournisseur(2), GA.chercherArticle(2)));
        GAF.ajouterArticleFournisseur(new ArticleFournisseur(3, new Date(System.currentTimeMillis()), 200, GF.chercherFournisseur(3), GA.chercherArticle(3)));
        GAF.ajouterArticleFournisseur(new ArticleFournisseur(4, new Date(System.currentTimeMillis()), 80, GF.chercherFournisseur(4), GA.chercherArticle(4)));
        GAF.ajouterArticleFournisseur(new ArticleFournisseur(5, new Date(System.currentTimeMillis()), 250, GF.chercherFournisseur(5), GA.chercherArticle(5)));
        GAF.ajouterArticleFournisseur(new ArticleFournisseur(6, new Date(System.currentTimeMillis()), 50, GF.chercherFournisseur(6), GA.chercherArticle(6)));
        GAF.ajouterArticleFournisseur(new ArticleFournisseur(7, new Date(System.currentTimeMillis()), 120, GF.chercherFournisseur(1), GA.chercherArticle(7)));
        GAF.ajouterArticleFournisseur(new ArticleFournisseur(8, new Date(System.currentTimeMillis()), 100, GF.chercherFournisseur(2), GA.chercherArticle(8)));
        GAF.ajouterArticleFournisseur(new ArticleFournisseur(9, new Date(System.currentTimeMillis()), 90, GF.chercherFournisseur(3), GA.chercherArticle(9)));
        GAF.ajouterArticleFournisseur(new ArticleFournisseur(10, new Date(System.currentTimeMillis()), 180, GF.chercherFournisseur(4), GA.chercherArticle(10)));

        
        
        GC.ajouterCommande(new Commande(1, new Date(System.currentTimeMillis()), 1799.98f, Utils.STATUS_EN_PREPARATION, GU.chercherUtilisateur(1), null));
        GC.ajouterCommande(new Commande(2, new Date(System.currentTimeMillis()), 1649.98f, Utils.STATUS_EN_EXPEDITION, GU.chercherUtilisateur(2), null));
        GC.ajouterCommande(new Commande(3, new Date(System.currentTimeMillis()), 2699.98f, Utils.STATUS_LIVREE, GU.chercherUtilisateur(3), null));
        GC.ajouterCommande(new Commande(4, new Date(System.currentTimeMillis()), 1099.98f, Utils.STATUS_EN_PREPARATION, GU.chercherUtilisateur(4), null));
        GC.ajouterCommande(new Commande(5, new Date(System.currentTimeMillis()), 799.98f, Utils.STATUS_EN_EXPEDITION, GU.chercherUtilisateur(5), null));
        GC.ajouterCommande(new Commande(6, new Date(System.currentTimeMillis()), 1799.98f, Utils.STATUS_EN_PREPARATION, GU.chercherUtilisateur(6), null));
        GC.ajouterCommande(new Commande(7, new Date(System.currentTimeMillis()), 1649.98f, Utils.STATUS_LIVREE, GU.chercherUtilisateur(7), null));
        GC.ajouterCommande(new Commande(8, new Date(System.currentTimeMillis()), 2699.98f, Utils.STATUS_EN_EXPEDITION, GU.chercherUtilisateur(8), null));
        GC.ajouterCommande(new Commande(9, new Date(System.currentTimeMillis()), 1099.98f, Utils.STATUS_EN_PREPARATION, GU.chercherUtilisateur(9), null));
        GC.ajouterCommande(new Commande(10, new Date(System.currentTimeMillis()), 799.98f, Utils.STATUS_EN_EXPEDITION, GU.chercherUtilisateur(10), null));

        
        
        GCA.ajouterCommandeArticle(new CommandeArticle(1, 1, GC.chercherCommande(1), GA.chercherArticle(1)));
        GCA.ajouterCommandeArticle(new CommandeArticle(2, 1, GC.chercherCommande(1), GA.chercherArticle(2)));
        GCA.ajouterCommandeArticle(new CommandeArticle(3, 1, GC.chercherCommande(2), GA.chercherArticle(3)));
        GCA.ajouterCommandeArticle(new CommandeArticle(4, 1, GC.chercherCommande(2), GA.chercherArticle(4)));
        GCA.ajouterCommandeArticle(new CommandeArticle(5, 1, GC.chercherCommande(3), GA.chercherArticle(5)));
        GCA.ajouterCommandeArticle(new CommandeArticle(6, 1, GC.chercherCommande(3), GA.chercherArticle(6)));
        GCA.ajouterCommandeArticle(new CommandeArticle(7, 1, GC.chercherCommande(4), GA.chercherArticle(7)));
        GCA.ajouterCommandeArticle(new CommandeArticle(8, 1, GC.chercherCommande(4), GA.chercherArticle(8)));
        GCA.ajouterCommandeArticle(new CommandeArticle(9, 1, GC.chercherCommande(5), GA.chercherArticle(9)));
        GCA.ajouterCommandeArticle(new CommandeArticle(10, 1, GC.chercherCommande(5), GA.chercherArticle(10)));
        GCA.ajouterCommandeArticle(new CommandeArticle(11, 1, GC.chercherCommande(6), GA.chercherArticle(1)));
        GCA.ajouterCommandeArticle(new CommandeArticle(12, 1, GC.chercherCommande(6), GA.chercherArticle(2)));
        GCA.ajouterCommandeArticle(new CommandeArticle(13, 1, GC.chercherCommande(7), GA.chercherArticle(3)));
        GCA.ajouterCommandeArticle(new CommandeArticle(14, 1, GC.chercherCommande(7), GA.chercherArticle(4)));
        GCA.ajouterCommandeArticle(new CommandeArticle(15, 1, GC.chercherCommande(8), GA.chercherArticle(5)));
        GCA.ajouterCommandeArticle(new CommandeArticle(16, 1, GC.chercherCommande(8), GA.chercherArticle(6)));
        GCA.ajouterCommandeArticle(new CommandeArticle(17, 1, GC.chercherCommande(9), GA.chercherArticle(7)));
        GCA.ajouterCommandeArticle(new CommandeArticle(18, 1, GC.chercherCommande(9), GA.chercherArticle(8)));
        GCA.ajouterCommandeArticle(new CommandeArticle(19, 1, GC.chercherCommande(10), GA.chercherArticle(9)));
        GCA.ajouterCommandeArticle(new CommandeArticle(20, 1, GC.chercherCommande(10), GA.chercherArticle(10)));

	}
}