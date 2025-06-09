package com.agarcia.crud_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agarcia.crud_springboot.model.ClientModel;


public interface ClientRepository extends  JpaRepository<ClientModel, Long>{
    
}
