package com.example.syFinal.guest.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.guest.model.dto.GuestDTO;
import com.example.syFinal.guest.model.dto.ReviewDTO;

public interface GuestDAO {
	GuestDTO my(int g_idx);
	List<GuestDTO> paylist(int g_idx);
	void cardupdate(Map<String,Object> map);
	void carddelete(Map<String,Object> map);
	void order(Map<String,Object> map);
	ReviewDTO reviews(int g_idx);
	Map<String, Object> replys(int g_idx);
}
