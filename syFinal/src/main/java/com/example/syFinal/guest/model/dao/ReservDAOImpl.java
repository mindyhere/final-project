package com.example.syFinal.guest.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.ReservDTO;

@Repository
public class ReservDAOImpl implements ReservDAO {
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<ReservDTO> list(int g_idx) {
		return sqlSession.selectList("reserv.list", g_idx);
	}
	
	@Override
	public ReservDTO lastDetail(int o_idx) {
		return sqlSession.selectOne("reserv.lastDetail", o_idx);
	}

}
