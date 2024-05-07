package com.example.syFinal.guest.model.dao;

import java.util.List;

import com.example.syFinal.guest.model.dto.GuestDTO;

public interface GuestDAO {
	GuestDTO my(int g_idx);
	List<GuestDTO> paylist(int g_idx);
}
