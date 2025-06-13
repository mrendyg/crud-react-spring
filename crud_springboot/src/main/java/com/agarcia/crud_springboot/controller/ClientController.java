package com.agarcia.crud_springboot.controller;

import java.util.List;

import org.hibernate.query.results.complete.CompleteResultBuilderEntityValued;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agarcia.crud_springboot.model.ClientModel;
import com.agarcia.crud_springboot.repository.ClientRepository;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping("/clients")
public class ClientController {

    private final ClientRepository clientRepository;

    @GetMapping("/list")
    public List<ClientModel> getClientModels(){
        return clientRepository.findAll();
    }

    @GetMapping("/{id}")
    public ClientModel getIdClient(@PathVariable Long id){
        return clientRepository.findById(id).orElse(null);
    }

    @PostMapping("/create")
    public ClientModel createClient(@RequestBody ClientModel client){
        return clientRepository.save(client);
    }    

    @PutMapping("/update/{id}")
    public ClientModel updateClientModel(@PathVariable Long id, @RequestBody ClientModel clientModel){
        ClientModel updatedClient = clientRepository.findById(id).get();
        updatedClient.setEmail(clientModel.getEmail());
        updatedClient.setName(clientModel.getName());
        return clientRepository.save(updatedClient);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteClient(@PathVariable Long id){
        ClientModel deleteClient = clientRepository.findById(id).get();
        clientRepository.delete(deleteClient);
    }
    
}
