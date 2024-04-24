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
}