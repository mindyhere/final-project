package com.example.syFinal.admin.model.dao;

import java.util.List;

import com.example.syFinal.admin.model.dto.AHostDTO;

public interface AhostDAO {
	List<AHostDTO> list(String searchkey, String search);
	void delete(int h_idx);
	//void update(Map<String, Object> map);
}
