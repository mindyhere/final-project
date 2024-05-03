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
	private MultipartFile img;
	
	private int w_idx; 
	
	public MainDTO(int ho_idx,String ho_name,String ho_img){
		this.ho_idx=ho_idx;
		this.ho_name=ho_name;
		this.ho_img=ho_img;
	}
}
