package com.example.syFinal.admin.model.dao;

import java.util.List;
import java.util.Map;


public interface ANoticeDAO {
	List<Map<String,Object>>list(String searchkey, String search); //공지목록
	void insert(Map<String, Object> map); // 공지등록
	void delete(int n_idx); // 공지삭제
	void update(Map<String, Object> map); 
	Map<String, Object> detail(int n_idx);
	Map<String, Object> ncheck(int n_idx, String n_writer);//관리자계정 확인 
}
