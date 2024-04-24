package com.example.syFinal.host.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

public class LoginDAOImpl implements LoginDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public String login(String h_email, String h_passwd) {
		return null;
	}

	@Override
	public String checkPwd(String h_email) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void findId(String email, String h_name, int b_business) {
		// TODO Auto-generated method stub

	}

	@Override
	public String findPwd(String h_email, String h_name, int b_business) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setTempPwd(String tempPwd, String h_email, int b_business) {
		// TODO Auto-generated method stub

	}

}
