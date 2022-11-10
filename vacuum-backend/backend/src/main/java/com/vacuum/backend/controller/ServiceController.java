package com.vacuum.backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vacuum.backend.repo.BookedDatesRepo;
import com.vacuum.backend.repo.ReviewRepo;
import com.vacuum.backend.repo.ServiceRepo;
import com.vacuum.backend.entities.BookedDates;
import com.vacuum.backend.entities.Reviews;
import com.vacuum.backend.entities.Service;

@RestController
@RequestMapping(value = "/api/service")
@CrossOrigin(origins ="*",allowedHeaders = "*")
public class ServiceController {

    @Autowired(required = true)
    ServiceRepo servicerepo;

    @Autowired(required = true)
    ReviewRepo reviewrepo;

    @Autowired
    BookedDatesRepo bookrepo;

    @GetMapping(value = "/getAllServices")
    public List<Service> getAllServices() {

        return servicerepo.findAll();

    }

    @GetMapping(value = "/getService")
    public Service getService(@RequestParam("sid") int sid)
    {
       Service service = servicerepo.findBySid(sid);
       return service;
    }

    @GetMapping(value = "/getServiceBookings")
    public List<BookedDates> getBookings(@RequestParam("sid") int sid)
    {
        Service service = servicerepo.findBySid(sid);
        return service.getBookings();
    }

    @Transactional
    @GetMapping(value="admin/deleteService")
    public long deleteService(@RequestParam("sid") int sid)
    {
        long records = servicerepo.deleteBySid(sid);
        return records;
    }

    @PutMapping(value = "admin/updateService")
    public String updateService(@RequestBody Service service)
    {
        servicerepo.save(service);
        return "success";
    }

    @PostMapping(value = "admin/saveService")
    public String saveService(@RequestBody Service service)
    {
        Service service_duplicate = servicerepo.findBySid(service.getSid());

        if(service_duplicate!=null)
        {
            //return user already exists
            return "exists";
        }
        else
        {
            
            servicerepo.save(service);
            return "success";
        }
    }
    
}

