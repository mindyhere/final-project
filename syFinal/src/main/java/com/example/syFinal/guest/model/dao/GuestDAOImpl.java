package com.example.syFinal.guest.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.GuestDTO;

@Repository
public class GuestDAOImpl implements GuestDAO {
	
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public GuestDTO my(int g_idx) {
		return sqlSession.selectOne("guest.myguest", g_idx);
	}
}
