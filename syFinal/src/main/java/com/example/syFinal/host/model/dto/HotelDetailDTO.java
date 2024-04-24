package com.example.syFinal.host.model.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HotelDetailDTO {
	private int d_idx;
	private int d_ho_idx;
	private int d_room_type;
	private int d_capacity;
	private int d_area;
	private int d_beds;
	private String d_non_smoking;
	private int d_price;
	private Date d_check_in;
	private Date d_check_out;
	private String d_img1;
	private String d_img2;
	private String d_img3;
}
