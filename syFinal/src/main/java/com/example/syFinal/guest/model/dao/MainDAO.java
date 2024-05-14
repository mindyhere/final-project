package com.example.syFinal.guest.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.guest.model.dto.MainDTO;

public interface MainDAO {
	List<MainDTO> list(String search);

	int check(int ho_idx, int g_idx);

}
