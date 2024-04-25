package com.example.syFinal.host.model.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HostDTO extends User {
	private int h_idx;
	private String h_email;
	private String h_passwd;
	private String h_name;
	private String h_phone;
	private int h_business;
	private int h_level;
	private String h_status;

	public HostDTO(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		this.h_email = username;
		this.h_passwd = password;
	}

	public HostDTO(String username, String password, Collection<? extends GrantedAuthority> authorities, String h_email,
			String h_passwd, String h_name, String h_status) {
		super(username, password, authorities);
		this.h_email = h_email;
		this.h_passwd = h_passwd;
		this.h_name = h_name;
		this.h_status = h_status;
	}

	public HostDTO(String username, String password, Collection<? extends GrantedAuthority> authorities, int h_idx,
			String h_email, String h_passwd, String h_name, String h_phone, int h_business, int h_level,
			String h_status) {
		super(username, password, authorities);
		this.h_idx = h_idx;
		this.h_email = h_email;
		this.h_passwd = h_passwd;
		this.h_name = h_name;
		this.h_phone = h_phone;
		this.h_business = h_business;
		this.h_level = h_level;
		this.h_status = h_status;
	}

}
