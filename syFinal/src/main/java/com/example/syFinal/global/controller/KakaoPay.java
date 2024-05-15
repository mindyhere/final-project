package com.example.syFinal.global.controller;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.example.syFinal.global.model.KakaoPayApprovalDTO;
import com.example.syFinal.global.model.KakaoPayReadyDTO;

import lombok.extern.java.Log;


//@Repository
//@RestController
@Service
@Log
public class KakaoPay {
		private static final String HOST = "https://open-api.kakaopay.com";
		
		KakaoPayReadyDTO KakaoPayReadydto;
		
		KakaoPayApprovalDTO KakaoPayApprovaldto;
	
		public String kakaoPayReady() {
			RestTemplate restTemplate = new RestTemplate();
				
			
			// 서버로 요청할 Header
			HttpHeaders headers = new HttpHeaders();
			
			String auth = "SECRET_KEY " + "DEV8EE89A70B1064CFFE0AB3965B3982D09800D1";
			headers.set("Authorization", auth);
			headers.set("Content-Type", "application/json;charset=UTF-8");
		    
		    // 서버로 요청할 Body
		    MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		    params.set("cid", "TC0ONETIME");
		    params.set("partner_order_id", "1001");
		    params.set("partner_user_id", "testuser");
		    params.set("item_name", "test");
		    params.set("quantity", "1");
		    params.set("vat_amount", "1500");
		    params.set("total_amount", "2000");
		    params.set("tax_free_amount", "0");
		    params.set("approval_url", "https://developers.kakao.com/success");
		    params.set("cancel_url", "https://developers.kakao.com/fail");
		    params.set("fail_url", "https://developers.kakao.com/cancel");
		    
		    HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);
		    
		    System.out.println("body111111===="+body);
		    
		    try {
		    	KakaoPayReadydto = restTemplate.postForObject(new URI(HOST + "/online/v1/payment/ready"), body, KakaoPayReadyDTO.class);
		        
		        log.info("" + KakaoPayReadydto);
		        
		        return KakaoPayReadydto.getNext_redirect_pc_url();
		
		    } catch (RestClientException e) {
		        e.printStackTrace();
		    } catch (URISyntaxException e) {
		        e.printStackTrace();
		    }
		    
		    
		    return "/kakaopay";
		    
		}
		public KakaoPayApprovalDTO kakaoPayInfo(String pg_token) {
			 
	        log.info("KakaoPayInfoVO............................................");
	        log.info("-----------------------------");
	        
	        RestTemplate restTemplate = new RestTemplate();
	 
	        // 서버로 요청할 Header
	        HttpHeaders headers = new HttpHeaders();
	        
	        String auth = "SECRET_KEY " + "DEV8EE89A70B1064CFFE0AB3965B3982D09800D1";
			headers.set("Authorization", auth);
		    headers.set("Content-Type", "application/json;charset=UTF-8");
	 
	        // 서버로 요청할 Body
	        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
	        params.set("cid", "TC0ONETIME");
	        params.set("tid", KakaoPayReadydto.getTid());
	        params.set("partner_order_id", "1001");
	        params.set("partner_user_id", "testuser");
	        params.set("pg_token", pg_token);
	        params.set("total_amount", "2000");
	        
	        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);
	        
	        System.out.println("body222222===="+body);
	        
	        try {
	        	KakaoPayApprovaldto = restTemplate.postForObject(new URI(HOST + "/online/v1/payment/approve"), body, KakaoPayApprovalDTO.class);
	            log.info("" + KakaoPayApprovaldto);
	          
	            return KakaoPayApprovaldto;
	        
	        } catch (RestClientException e) {
	            e.printStackTrace();
	        } catch (URISyntaxException e) {
	            e.printStackTrace();
	        }
	        
	        return null;
	    }
		
}