package com.example.syFinal.guest.model.dao;

import java.util.List;

import com.example.syFinal.guest.model.dto.MainDTO;

public interface WishDAO {
	List<MainDTO> wishlist(int g_idx);

	String firstRecent(int idx);

	List<MainDTO> firstWish(int g_idx);

	int countWish(int g_idx);

	String delete(int w_idx);
}
