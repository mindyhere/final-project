package com.example.syFinal.guest.model.dto;

import org.springframework.web.multipart.MultipartFile;

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
public class MainDTO {
	private int ho_idx;
	private String ho_name;
	private String ho_img;
	
	private int w_idx; 
}
