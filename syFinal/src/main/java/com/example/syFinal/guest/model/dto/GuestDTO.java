package com.example.syFinal.guest.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class GuestDTO {
	private int g_idx;
	private String g_email;
	private String g_passwd;
	private String g_name;
	private String g_phone;
	private String g_url;
	private String g_profile;
	private String g_join_date;
	private int g_level;
	private String g_photo;
	private int g_card;
	private String g_date;
	private int g_cvc;
	private int g_point;
	private String d_img1;
	private int o_state;
	private String o_orderdate;
	private int o_payment;
	private String o_ckin;
	private String o_ckout; 
	private int o_finalprice;
	private String l_name;
}
