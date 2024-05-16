package com.example.syFinal.admin.model.dao;

import java.util.List;

import com.example.syFinal.admin.model.dto.ANoticeDTO;

public interface ANoticeDAO {
	List<ANoticeDTO> list(String searchkey, String search); //공지목록
	String insert(ANoticeDTO dto); //공지 등록
	String delete(int n_idx); // 공지삭제
	ANoticeDTO detail(int n_idx);
	String update(ANoticeDTO dto);
}
