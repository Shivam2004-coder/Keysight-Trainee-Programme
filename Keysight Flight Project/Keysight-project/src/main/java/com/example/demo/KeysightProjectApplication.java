package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableDiscoveryClient
public class KeysightProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(KeysightProjectApplication.class, args);
	}

}
