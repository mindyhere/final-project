//PaymentController

package com.example.syFinal.global.controller;

import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.syFinal.guest.model.dao.GuestDAO;
import com.siot.IamportRestClient.IamportClient;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class PaymentController {
	//private IamportClient iamportClient;

	
	@Autowired
	GuestDAO dao;
	
	private final String imp_key="3700142288466350";
	private final String imp_secret="0iQd24va2FuC19XXQVOYN24tiyt1Dh7rM21sVn1XT0Ih4ESW6ddawXG3bvB9vBER7JvRwFeWQS0vOpW1";
	
	RestTemplate restTemplate = new RestTemplate();
	
	HttpHeaders headers = new HttpHeaders();
	
	JSONObject body = new JSONObject();
	//생성자를 통해 REST API 와 REST API secret 입력
//	@PostConstruct
//    public void init() {
//        this.iamportClient = new IamportClient(imp_key,imp_secret);
//
//    }
	
	//토큰받아오기
	@RequestMapping("/confirmpay/{imp_uid}")
	public ResponseEntity<JSONObject> confirmpay(@RequestParam("imp_uid") String imp_uid) {
		
		headers.set("Content-Type", "application/json;charset=UTF-8");
		body.put("imp_key", imp_key);
		body.put("imp_secret", imp_secret);
		
		try {
			HttpEntity<JSONObject> entity = new HttpEntity<>(body,headers);
			ResponseEntity<JSONObject> token = restTemplate.postForEntity("https://api.iamport.kr/getToken",entity,JSONObject.class);
			System.out.println(token + "FULLtoken");
			return token;
		} catch(Exception e) {
			e.printStackTrace();
            System.out.println("gettoken에서 오류가 발생");
		}
		return null;
	}
	
	//결제검증(결제 금액 비교)
	//@ResponseBody
   // @PostMapping("/pay/{imp_uid}")
   // public Map<String,String> paymentByImpUid(@PathVariable(value= "imp_uid") String imp_uid) throws IamportResponseException, IOException {
		//IamportResponse payment = iamportClient.paymentByImpUid(imp_uid);
		//Map<String,String> payment = iamportClient.paymentByImpUid(imp_uid); //paymentDAO 생성
		//return payment;
   // }
	
	//결제취소검증
	//이미 결제취소 된 건인지
	//지불한 금액과 취소하려는 금액 체크
	
	//예약요청
	@PostMapping
	//("/pay/order")
	public void order(@RequestParam(name = "idx") int idx, @RequestParam(name = "dIdx") int didx,
			@RequestParam(name = "ckin") String ckin, @RequestParam(name = "ckout") String ckout,
			@RequestParam(name = "adult") int adult, @RequestParam(name = "pay") String pay,
			@RequestParam(name = "child") int child, @RequestParam(name = "baby") String baby,
			@RequestParam(name = "dprice") int dprice, @RequestParam(name = "fprice") int fprice) {
		Map<String, Object> map1 = new HashMap<>();
		map1.put("idx", idx);
		map1.put("didx", didx);
		map1.put("ckin", ckin);
		map1.put("ckout", ckout);
		map1.put("adult", adult);
		map1.put("child", child);
		map1.put("baby", baby);
		map1.put("pay", pay);
		map1.put("dprice", dprice);
		map1.put("fprice", fprice);
		// System.out.println("예약요청"+map1);
		dao.order(map1);
	}

}