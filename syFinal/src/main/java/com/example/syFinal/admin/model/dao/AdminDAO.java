package com.example.syFinal.admin.model.dao;

import com.example.syFinal.admin.model.dto.AdminDTO;

public interface AdminDAO {
	AdminDTO alogin(String a_id, String a_passwd);
}