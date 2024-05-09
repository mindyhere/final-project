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
public class ReservDTO {
	private int d_ho_idx;
	private String ho_name;
	private String ho_img;
	private String o_ckin;
	private String o_ckout;
	private String h_name;
	private int o_idx;
	private int h_idx;
	private String ho_address;
	
	private String o_orderdate;
	private int o_price;
	private int o_discount;
	private int o_finalprice;
	private int o_payment;
	private int o_reser;
	
	private String h_phone;
	private String h_profile;
	private String ho_check_in;
	private String ho_check_out;
	private int ho_x;
	private int ho_y;
	
	private int o_state;
	
	private int d_area;
	private String d_room_type;
	private int d_beds;
	private String d_non_smoking;
	
	
}
