package com.example.syFinal.host.model.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HotelDTO {
	private int ho_idx;
	private String ho_name;
	private String ho_address;
	private int ho_level;
	private int ho_floor;
	private int ho_business;
	private int ho_single;
	private int ho_double;
	private int ho_family;
	private int ho_suite;
	private String ho_img;
	private int d_room_type;
	private int d_capacity;
	private int d_area;
	private int d_beds;
	private String d_non_smoking;
	private int d_price;
	private Date chk_in;
	private Date chk_out;
	private String d_img1;
	private String d_img2;
	private String d_img3;
}
