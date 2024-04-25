package com.example.syFinal.host.model.dto;

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
}
