package com.example.bookinsert.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookinsert.dto.TestedDto;
import com.example.bookinsert.model.BookinsertModel;
import com.example.bookinsert.repository.BookRepository;

@RestController
@RequestMapping("book")
public class BookController {

	@Autowired
	private BookRepository repo;

	@GetMapping("/livro")
	public ResponseEntity<List<BookinsertModel>> listarTodos() {
        List<BookinsertModel> livros = repo.findAll();
        if (livros.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); 
        }
        return ResponseEntity.ok(livros); 
    }
	
	 @PostMapping("/livro")
	    public ResponseEntity<?> cBook(@RequestBody TestedDto book) {
	        BookinsertModel novoLivro = new BookinsertModel(book);
	        repo.save(novoLivro);
	        return ResponseEntity.status(HttpStatus.CREATED).body("Livro criado com sucesso!"); 
	    }

	   @PutMapping("/livro/{id}")
	    public ResponseEntity<?> updateBook(@PathVariable UUID id, @RequestBody TestedDto book) {
	        Optional<BookinsertModel> livroExistente = repo.findById(id);
	        
	        if (livroExistente.isPresent()) {
	            BookinsertModel livroAtualizado = livroExistente.get();
	            livroAtualizado.setNome(book.nome());
	            livroAtualizado.setAutor(book.autor());
	            repo.save(livroAtualizado);
	            return ResponseEntity.ok(livroAtualizado); 
	        }
	        
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Livro não encontrado!"); 
	    }
	   
	   @DeleteMapping("/livro/{id}")
	   public ResponseEntity<?> deleteBook(@PathVariable UUID id) {
		    Optional<BookinsertModel> livroExistente = repo.findById(id);
		    
		    if (livroExistente.isPresent()) {
		        repo.deleteById(id);
		        return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); 
		    }
		    
		    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Livro não encontrado!"); 
		}
	}


