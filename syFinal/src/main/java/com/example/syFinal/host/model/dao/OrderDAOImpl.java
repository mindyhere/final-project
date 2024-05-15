package com.example.syFinal.host.model.dao;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.GuestDTO;

@Repository
public class OrderDAOImpl implements OrderDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public int confirm(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Map<String, Object>> getList(Map<String, Object> map) {
		List<Map<String, Object>> list = null;
		try {
			list = sqlSession.selectList("order.getList", map);
			if (list != null) {
				DecimalFormat df = new DecimalFormat("###,###");
				for (Map<String, Object> m : list) {
					String o_state = (String) m.get("o_state");
					// 상태 처리
					switch (o_state) {
					case "1":
						m.put("status", "예약대기");
						break;
					case "2":
						m.put("status", "예약취소");
						break;
					case "3":
						m.put("status", "예약확정");
						break;
					}
					// 금액 1000단위 포맷
					String o_price = df.format(m.get("o_price"));
					String o_discount = df.format(m.get("o_discount"));
					String o_finalprice = df.format(m.get("o_finalprice"));
					System.out.println("==> m? " + o_price + ", " + o_finalprice + ", " + o_discount);
					m.replace("o_price", o_price);
					m.replace("o_discount", o_discount);
					m.replace("o_finalprice", o_finalprice);

					String o_payment = (String) m.get("o_payment");

					switch (o_payment) {
					case "1":
						m.replace("o_payment", "Card");
						break;
					case "2":
						m.replace("o_payment", "KakaoPay");
						break;
					case "3":
						m.replace("o_payment", "Point");
						break;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<Map<String, Object>> getHotelList(int h_idx) {
		List<Map<String, Object>> hotels = null;
		try {
			hotels = sqlSession.selectList("order.getHotelList", h_idx);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return hotels;
	}

	@Override
	public int countRecord(Map<String, Object> map) {
		return sqlSession.selectOne("order.countRecord", map);
	}

	@Override
	public GuestDTO getGuestInfo(int g_idx) {
		return sqlSession.selectOne("order.getGuestProfile", g_idx);
	}

}
