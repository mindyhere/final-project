package com.example.syFinal.guest.model.dao;

import java.util.List;

import com.example.syFinal.guest.model.dto.ReservDTO;

public interface ReservDAO {

	List<ReservDTO> list(int g_idx);

}