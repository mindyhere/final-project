package com.example.syFinal.guest.model.dao;

import com.example.syFinal.guest.model.dto.GuestDTO;

public interface InfoDAO {
	int checkId(String g_email);
	
	String join(String g_email, String g_passwd, String g_name, String g_phone);
	
	GuestDTO detail(int g_idx);
	
	String update(GuestDTO dto);

	String delete(int g_idx);
}
