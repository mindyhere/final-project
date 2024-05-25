package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;

public interface ChartDAO {
	JSONObject lastSales(int h_idx);

	JSONObject thisSales(int h_idx);

	List<Map<String, Object>> getHotelList(int h_idx);

}
