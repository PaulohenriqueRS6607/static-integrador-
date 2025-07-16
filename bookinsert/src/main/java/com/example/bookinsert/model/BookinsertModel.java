package com.example.bookinsert.model;

import java.util.UUID;

import com.example.bookinsert.dto.TestedDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BookinsertModel {
  
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private String nome;
	private String autor;
	private String imagemUrl;

	
	public BookinsertModel() {
		super();
	}

	public BookinsertModel(TestedDto dto) {
		this.nome=dto.nome();
		this.autor=dto.autor();
		this.imagemUrl=dto.imagemUrl();
	}
   
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getAutor() {
		return autor;
	}
	public void setAutor(String autor) {
		this.autor = autor;
	}
	public String getImagemUrl() {
		return imagemUrl;
	}
	public void setImagemUrl(String imagemUrl) {
		this.imagemUrl = imagemUrl;
	}
    
	
}
