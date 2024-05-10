package com.example.syFinal.admin.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.admin.model.dto.AGuestDTO;

public interface AGuestDAO {
	List<AGuestDTO>  list(String searchkey, String search);
	Map<String, Object> detail(int g_idx);
	void delete(int g_idx);
	void update(Map<String, Object> map);
}
