package com.example.syFinal.guest.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class GuestDTO {
	private int g_idx;
	private String g_email;
	private String g_passwd;
	private String g_name;
	private String g_phone;
	private String g_url;
	private String g_profile;
	private int g_level;
	private int g_card;
	private String g_date;
	private int g_cvc;
	private int g_point;
	
}
