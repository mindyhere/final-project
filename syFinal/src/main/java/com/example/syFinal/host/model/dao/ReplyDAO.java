package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.host.model.dto.ReplyDTO;

public interface ReplyDAO {
	// host 회원 1명 당 작성한 답글 목록
	List<ReplyDTO> myReplyList(int h_idx);

	// 답글 작성
	void insertReply(Map<String, Object> map);

	// 답글 상세보기 → 후기글 번호와 매칭
//	ReplyDTO detailReply(ReplyDTO dto);

	// host → 작성한 답글 수정
	void editReply(ReplyDTO dto);

	// host → 작성한 답글 삭제
	void delete(Map<String, Object> map);

	void delete(int rp_idx);

	// 작성한 글 검색
	List<Map<String, Object>> search(Map<String, Object> map);

	List<Map<String, Object>> searchAll(String keyword);

}
