package com.example.syFinal.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.admin.model.dto.ANoticeDTO;

@Repository
public class ANoticeDAOImpl implements ANoticeDAO {

	@Autowired
	SqlSession sqlSession;

	public List<ANoticeDTO> list(String searchkey, String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("searchkey", searchkey);
		map.put("search", search);
		System.out.println("DATIMPL : " + searchkey);
		return sqlSession.selectList("notice.list", map);
	}

	public ANoticeDTO detail(int n_idx) {
		return sqlSession.selectOne("notice.detail", n_idx);
	}

	public String delete(int n_idx) {
		String result = "";
		try {
			sqlSession.delete("notice.delete", n_idx);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}

	@Override
	public String update(ANoticeDTO dto) {
		String result = "";
		try {
			sqlSession.update("admin.ag_update", dto);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}

	@Override
	public String insert(ANoticeDTO dto) {
		return sqlSession.selectOne("notice.insert", dto);

	}

}
