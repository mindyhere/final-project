package com.example.syFinal.global.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrdersDTO {
	private int o_idx;
	private int o_gidx;
	private int o_didx;
	private Date o_ckin;
	private Date o_ckout;
	private int o_reser;
	private String o_state;
	private String o_payment;
	private int o_price;
	private int o_discount;
	private int o_finalprice;
	private String o_benefit;
	private Date o_orderdate;
}
