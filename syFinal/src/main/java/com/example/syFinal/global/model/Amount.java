package com.example.syFinal.global.model;

import java.util.Date;

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
public class Amount {
	private int total;
	private int tax_free;
	private int vat;
	private int point;
	private int discount;
	private int green_deposit;
}
