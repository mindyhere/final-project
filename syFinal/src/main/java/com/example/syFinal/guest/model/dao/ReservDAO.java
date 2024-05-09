package com.example.syFinal.guest.model.dao;

import java.util.List;

import com.example.syFinal.guest.model.dto.ReservDTO;

public interface ReservDAO {

	List<ReservDTO> list(int g_idx);

	ReservDTO lastDetail(int o_idx);

	List<ReservDTO> reservReview(int g_idx);

}
