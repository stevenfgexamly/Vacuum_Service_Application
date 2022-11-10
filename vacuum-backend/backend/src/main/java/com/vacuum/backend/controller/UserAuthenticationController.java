package com.vacuum.backend.controller;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vacuum.backend.repo.RoleRepo;
import com.vacuum.backend.repo.UserRepo;
import com.vacuum.backend.entities.User;
import com.vacuum.backend.entities.ERole;
import com.vacuum.backend.entities.Role;
import com.vacuum.backend.security.CustomUserDetails;
import com.vacuum.backend.security.jwt.JwtUtils;
import com.vacuum.backend.structure.JwtResponse;
import com.vacuum.backend.structure.SignupRequest;
import com.vacuum.backend.structure.UpdateUser;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/auth")
public class UserAuthenticationController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepo userrepo;

	@Autowired
	RoleRepo rolerepo;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	String c;

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<?> badUser() {
		return ResponseEntity.ok(new JwtResponse("bad",
				1,
				"bad",
				null, "bad", "bad"));
	}

	@PostMapping("updateemail")
	public String updateEmail(@RequestBody UpdateUser u) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		User user = userrepo.findByUid(userDetails.getId()).get();
		if (userrepo.existsByEmail(u.getEmail()))
			return "exists";
		else {
			user.setEmail(u.getEmail());
			userrepo.save(user);
			return "success";
		}

	}

	@PostMapping("updatename")
	public String updateName(@RequestBody UpdateUser u) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		User user = userrepo.findByUid(userDetails.getId()).get();
		user.setName(u.getName());
		userrepo.save(user);
		return "success";
	}

	@PostMapping("updatepass")
	public String updatePass(@RequestBody UpdateUser u) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		User user = userrepo.findByUid(userDetails.getId()).get();
		if (encoder.matches(u.getOldpass(), user.getPass())) {
			user.setPass(encoder.encode(u.getNewpass()));
			userrepo.save(user);
			return "success";
		} else
			return "incorrect";
	}

	@PostMapping("deleteaccount")
	public String deleteAccount(@RequestBody UpdateUser u) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		User user = userrepo.findByUid(userDetails.getId()).get();
		if (encoder.matches(u.getOldpass(), user.getPass())) {
			userrepo.delete(user);
			return "success";
		} else
			return "incorrect";
	}

	@PostMapping("signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody User user) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPass()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt,
				userDetails.getId(),
				userDetails.getEmail(),
				roles, userDetails.getName(), "success"));
	}

	@PostMapping("signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest response_user) {
		if (userrepo.existsByEmail(response_user.getEmail())) {
			return ResponseEntity
					.ok(new String("exists"));
		}

		// Create new user's account
		User user = new User(response_user.getEmail(), encoder.encode(response_user.getPass()),
				response_user.getName());

		String strRoles;
		Set<Role> roles = new HashSet<>();

		if (response_user.getMasterpass() != "") {
			if (response_user.getMasterpass() != "1234")
				strRoles = "admin";
			else {
				return ResponseEntity.ok(new String("adminfail"));
			}

		} else
			strRoles = "user";

		if (strRoles == null) {
			Role userRole = rolerepo.findByRolename(ERole.ROLE_USER).get();
			// .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			// strRoles.forEach(role -> {
			switch (strRoles) {
				case "admin":
					Role adminRole = rolerepo.findByRolename(ERole.ROLE_ADMIN).get();
					// .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				default:
					Role userRole = rolerepo.findByRolename(ERole.ROLE_USER).get();
					// .orElseThrow(() -> new RuntimeException("Error: Role is not found.")
					roles.add(userRole);
			}
			// });
		}

		user.setRoles(roles);
		userrepo.save(user);

		return ResponseEntity.ok(new String("success"));
	}

	@GetMapping("sec")
	public List<String> check() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		return roles;

	}
}
