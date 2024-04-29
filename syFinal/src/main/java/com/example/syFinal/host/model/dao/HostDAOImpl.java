package com.example.syFinal.host.model.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.host.model.dto.HostDTO;

@Repository
public class HostDAOImpl implements HostDAO {
	@Autowired
	SqlSession sqlSession;

	@Override // Host(사업자) 회원가입
	public void insert(Map<String, Object> map) {
		sqlSession.insert("host.insert", map);
	}

	@Override // 아이디 중복체크
	public int idCheck(String userId) {
		return sqlSession.selectOne("host.idCheck", userId);
	}

	@Override // Host 로그인
	public String login(Map<String, Object> params) {
		return null;
	}

	@Override // 암호화된 h_passwd
	public String pwdCheck(String userId) {
		return sqlSession.selectOne("host.pwdCheck", userId);
	}

	@Override // 로그인 성공 시 계정정보(쿠키) 가져오기
	public HostDTO getAccount(String userId) {
		return sqlSession.selectOne("host.getAccount", userId);
	}

	@Override // host 계정아이디 찾기
	public String findId(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("host.findId", map);
	}

	@Override // 비밀번호 찾기(이메일)
	public int findPwd(Map<String, Object> map) {
		return sqlSession.selectOne("host.findPwd", map);
	}

	@Override // 임시비밀번호로 업데이트
	public void setTempPwd(Map<String, Object> map) {
		sqlSession.update("host.setTempPwd", map);
	}

	@Override // Host 정보수정
	public void updateInfo(Map<String, Object> params) {
		sqlSession.selectOne("host.updateInfo", params);
	}

	@Override // Host 회원탈퇴
	public void deleteAccount(int h_idx) {
		sqlSession.delete("host.delete", h_idx);
	}

}
