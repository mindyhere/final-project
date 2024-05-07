package com.example.syFinal.guest.model.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
	private int rv_idx;
	private String rv_writer;
	private String rv_content;
	private Date rv_date;
	private int rv_re_index;
	private double rv_star;
	private int rv_hd_idx;
}
