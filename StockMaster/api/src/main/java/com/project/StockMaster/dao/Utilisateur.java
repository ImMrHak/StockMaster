package com.project.StockMaster.dao;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Entity
public class Utilisateur {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUtilisateur;
    private String nom, prenom, adresse, motpasse;
    @Column(unique=true)
    private String email;
    private int age;
    
    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.REMOVE) @JsonIgnore
    private List<Commande> commandes;

    @ManyToOne
    private Role role;
}