//package com.cyrix.nossoespaco.repository;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import com.cyrix.nossoespaco.model.Usuario;
//
//
//
//
//@Repository
//public interface Usuarios extends JpaRepository<Usuario, Long>{
//
//	public Optional<Usuario> findByEmailIgnoreCase(String email);
//
//	public List<Usuario> findByCodigoIn(Long[] codigos);
//	
//}