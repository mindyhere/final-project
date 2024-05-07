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
}
