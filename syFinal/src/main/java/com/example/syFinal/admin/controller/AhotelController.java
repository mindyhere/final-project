package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.syFinal.admin.model.dao.AhotelDAO;
import com.example.syFinal.host.model.dto.HotelDTO;


@RestController
public class AhotelController {

	@Autowired
   AhotelDAO ahotelDao;

	@PostMapping("/admin/ahoList")
    public List<HotelDTO> list(
            @RequestParam(name = "searchkey", defaultValue = "") String searchkey,
            @RequestParam(name = "search", defaultValue = "") String search,
            @RequestParam(name = "status", defaultValue = "") String status) {
        
        Map<String, Object> map = new HashMap<>();
        map.put("searchkey", searchkey);
        map.put("search", search);
        map.put("status", status);

        return ahotelDao.list(map);
    }

    @PostMapping("/admin/approveHotel")
    public Map<String, Object> HotelStatus(
            @RequestParam(name = "ho_idx") int ho_idx,
            @RequestParam(name = "ho_status") int ho_status) {
        
        ahotelDao.updateHotelStatus(ho_idx, ho_status);

        Map<String, Object> response = new HashMap<>();
        response.put("ho_idx", ho_idx);
        response.put("ho_status", ho_status);
       
        return response;
    }
}  
