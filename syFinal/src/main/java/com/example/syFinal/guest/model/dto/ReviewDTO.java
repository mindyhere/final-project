package com.example.syFinal.guest.model.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReviewDTO {
	private int rv_idx;
	private String rv_writer;
	private String rv_content;
	private Date rv_date;
	private int rv_re_index;
	private double rv_star;
	private int rv_hd_idx;
}
