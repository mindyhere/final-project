package com.example.syFinal.guest.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.MainDTO;

@Repository
public class WishDAOImpl implements WishDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public List<MainDTO> wishlist(int g_idx) {
		return sqlSession.selectList("wish.wishlist", g_idx);
	}
	
	@Override
	public String firstRecent(int idx) {
		return sqlSession.selectOne("wish.firstRecent", idx);
	}
	
	@Override
	public int countWish(int g_idx) {
		int count = sqlSession.selectOne("wish.countWish", g_idx);
		return count;
	}
	
	@Override
	public List<MainDTO> firstWish(int g_idx) {
		return sqlSession.selectList("wish.firstWish", g_idx);
	}
	
	@Override
	public String delete(int w_idx) {
		String result = "";
		try {
			sqlSession.delete("wish.delete", w_idx);
			result = "success";
		} catch (Exception e) {
			result = "error";
		}
		return result;
	}
}
