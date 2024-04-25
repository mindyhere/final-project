package com.example.syFinal.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HostDTO {
	private int h_idx;
	private String h_email;
	private String h_passwd;
	private String h_name;
	private String h_phone;
	private int h_business;
	private int h_level;
	private String h_status;

//	public HostDTO(String h_email, String h_passwd) {
//		super();
//		this.h_email = h_email;
//		this.h_passwd = h_passwd;
//		// this.h_business = h_business;
//	}

	public HostDTO(int h_idx, String h_email, String h_name, int h_business, String h_status) {
		super();
		this.h_idx = h_idx;
		this.h_email = h_email;
		this.h_name = h_name;
		this.h_business = h_business;
		this.h_status = h_status;
	}
}
