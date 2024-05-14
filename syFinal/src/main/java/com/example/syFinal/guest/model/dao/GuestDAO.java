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
	List<ReviewDTO> review(int g_idx);
	List<ReviewDTO> reply(int g_idx);
	ReviewDTO reviewcount(int g_idx);
	GuestDTO joindate(int g_idx);
}
