package com.example.syFinal.host.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class HostDTO {
	private int h_idx;
	private String h_email;
	private String h_passwd;
	private String h_name;
	private String h_phone;
	private String h_business;
	private int h_level;
	private String h_status;
	private String h_regdate;
	private String h_profile;
	private String h_file;

//	public HostDTO(String h_email, String h_passwd) {
//		super();
//		this.h_email = h_email;
//		this.h_passwd = h_passwd;
//		// this.h_business = h_business;
//	}

	public HostDTO(int h_idx, String h_email, String h_name, String h_business, String h_status, String h_profile,
			String h_file) {
		super();
		this.h_idx = h_idx;
		this.h_email = h_email;
		this.h_name = h_name;
		this.h_business = h_business;
		this.h_status = h_status;
		this.h_profile = h_profile;
		this.h_file = h_file;
	}
}
