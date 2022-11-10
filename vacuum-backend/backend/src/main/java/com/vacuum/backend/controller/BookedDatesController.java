package com.vacuum.backend.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vacuum.backend.repo.BookedDatesRepo;
import com.vacuum.backend.repo.ReviewRepo;
import com.vacuum.backend.repo.RoleRepo;
import com.vacuum.backend.repo.ServiceRepo;
import com.vacuum.backend.repo.UserRepo;
import com.vacuum.backend.entities.User;
import com.vacuum.backend.entities.BookedDates;
import com.vacuum.backend.entities.ERole;
import com.vacuum.backend.entities.Reviews;
import com.vacuum.backend.entities.Role;
import com.vacuum.backend.entities.Service;
import com.vacuum.backend.security.CustomUserDetails;
import com.vacuum.backend.security.jwt.JwtUtils;
import com.vacuum.backend.structure.InBookDates;
import com.vacuum.backend.structure.JwtResponse;
import com.vacuum.backend.structure.ReviewPost;
import com.vacuum.backend.structure.SignupRequest;
import com.vacuum.backend.structure.UpdateUser;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/service/booked")
public class BookedDatesController {

    @Autowired
    ServiceRepo servicerepo;

    @Autowired
    BookedDatesRepo bookrepo;

    @PostMapping("postbooking")
	public String postBooking(@RequestBody InBookDates b) throws ParseException
	{
            BookedDates book = new BookedDates();
            Service service = servicerepo.findBySid(b.getSid());
            book.setDate(new SimpleDateFormat("yyyy-MM-dd").parse(b.getDate()));
            service.getBookings().add(book);
            servicerepo.save(service);

            return "posted";

	}

    // @GetMapping("getbookings")
    // public List<BookedDates> getBookings(@RequestParam("sid") int sid)
    // {
    //     return bookrepo.findServiceDates(sid);
    // }
    
}
