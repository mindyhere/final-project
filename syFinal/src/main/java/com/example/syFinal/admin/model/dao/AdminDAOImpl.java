package com.example.syFinal.admin.model.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AdminDAOImpl implements AdminDAO {

		@Autowired
		SqlSession sqlSession;

		@Override
		public String alogin(Map<String, Object> map) {
			return sqlSession.selectOne("admin.a_login", map);
		}


}
