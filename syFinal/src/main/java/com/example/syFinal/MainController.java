package com.example.syFinal;

import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.guest.model.dao.MainDAO;
import com.example.syFinal.guest.model.dto.MainDTO;

@RestController
public class MainController {

	@Autowired
	MainDAO dao;
	
	@RequestMapping("/guest/main")
	public List<Map<String, Object>> list(@RequestParam(name="search",defaultValue="") String search) {
		List<MainDTO> main = dao.list(search);

		List<Map<String, Object>> list = new ArrayList<>();
		for(int i=0; i<main.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("HoIdx", main.get(i).getHo_idx());
			map.put("HoName", main.get(i).getHo_name());
			map.put("HoImg", main.get(i).getHo_img());
			map.put("search", search);
			//MainDTO dto = new MainDTO(i.getHoIdx(),i.getHoName(),i.getHoImg);
			list.add(map);
		}
		System.out.println("메인리스트====" + list);
		
		return list;
	}
	
	public List<String> dateBetween(String stDate, String etDate) {
		List<String> dates = new ArrayList<String>();
		String sDate = stDate.replace("-", "");
		String eDate = etDate.replace("-", "");
		String inputStartDate = stDate;
		String inputEndDate = etDate;
		Date startDate = new Date();
		Date endDate = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date currentDate = new Date();
		try {
			startDate = sdf.parse(inputStartDate);
			endDate = sdf.parse(inputEndDate);
			currentDate	= startDate;
			while (currentDate.compareTo(endDate) <= 0) {
				dates.add(sdf.format(currentDate));
				Calendar c = Calendar.getInstance();
				c.setTime(currentDate);
				c.add(Calendar.DATE, 1);
				currentDate = c.getTime();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dates;
	}
}
