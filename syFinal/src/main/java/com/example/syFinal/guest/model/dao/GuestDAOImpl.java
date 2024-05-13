package com.example.syFinal.guest.model.dao;

import java.util.List;
import java.util.Map;

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
	
	@Override
	public List<GuestDTO> paylist(int g_idx) {
		return sqlSession.selectList("guest.paylist", g_idx);
	}
	
	@Override
	public void cardupdate(Map<String,Object> map){
		sqlSession.update("guest.cardupdate", map);
	}
	
	@Override
	public void carddelete(Map<String,Object> map){
		sqlSession.update("guest.carddelete", map);
	}
	
	@Override
	public void order(Map<String,Object> map){
		sqlSession.insert("guest.order",map);
	}
	
}