package com.vacuum.backend.entities;
import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="roles")
public class Role {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int rid;

    @Enumerated(EnumType.STRING)
	@Column(length = 20)
	private ERole rolename;
}
