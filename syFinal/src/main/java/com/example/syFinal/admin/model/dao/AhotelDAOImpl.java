package com.example.syFinal.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.host.model.dto.HotelDTO;

@Repository
public class AhotelDAOImpl implements AhotelDAO {

	@Autowired
	SqlSession sqlSession;


	 @Override
	    public List<HotelDTO> list(Map<String, Object> map) {
		 return sqlSession.selectList("admin.list", map);
	    }

	    @Override
	    public void updateHotelStatus(int ho_idx, int ho_status) {
	        Map<String, Object> paramMap = new HashMap<>();
	        paramMap.put("ho_idx", ho_idx);
	        paramMap.put("ho_status", ho_status);
	        sqlSession.update("admin.updateHotelStatus", paramMap);

	    }
	}