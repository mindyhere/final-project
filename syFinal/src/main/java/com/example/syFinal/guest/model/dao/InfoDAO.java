package com.example.syFinal.guest.model.dao;

import java.util.Map;

public interface InfoDAO {
	int checkId(String g_email);
	
	String join(String g_email, String g_passwd, String g_name, String g_phone);
}
