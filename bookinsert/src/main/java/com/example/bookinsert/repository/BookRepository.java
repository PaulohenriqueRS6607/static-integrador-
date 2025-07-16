package com.example.bookinsert.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookinsert.model.BookinsertModel;


public interface BookRepository extends JpaRepository<BookinsertModel,UUID>{

	

}
