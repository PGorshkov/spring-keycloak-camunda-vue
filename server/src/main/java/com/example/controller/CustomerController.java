package com.example.controller;

import com.example.model.Customer;
import com.example.repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping("/save")
    @RolesAllowed("admin")
    public String save () {
        Customer customer = new Customer();
        customer.setFirstName("Jack");
        customer.setLastName("Smith");
        customerRepository.save(customer);
        return "Done";
    }

    @GetMapping
    public List<Customer> findAll () {
        return customerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Customer findById (
            @PathVariable Long id
    ) {
        return customerRepository.findById(id).orElse(null);
    }

}
