package com.vacuum.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;


@EnableConfigurationProperties
// @EntityScan(basePackages = {"com.project.demo.model"})
// @SpringBootApplication(scanBasePackages={"com.example.demo.security"})
// @ComponentScan(basePackages = {"com.example.demo.security"})
@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
