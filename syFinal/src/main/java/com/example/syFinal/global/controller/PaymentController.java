package com.example.syFinal.global.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.guest.model.dao.GuestDAO;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class PaymentController {
//	private IamportClient iamportClient;

	// application.properties key입력하기
//	@Value("${imp.api.key}")
//    private String apikey;
//	
//	@Value("${imp.api.secretkey}")
//    private String secretkey;

	@Autowired
	GuestDAO dao;

	// 생성자를 통해 REST API 와 REST API secret 입력
	@PostConstruct
	public void init() {
		// this.iamportClient = new IamportClient(apikey,secretkey);
		// this.challengeService = challengeService;
		// this.participantService = participantService;
	}

	// 결제검증(결제 금액 비교)
	@ResponseBody
//    @PostMapping("/pay/{imp_uid}")
//    public IamportResponse<Payment> paymentByImpUid(@PathVariable(value= "imp_uid") String imp_uid) throws IamportResponseException, IOException {
//		//IamportResponse payment = iamportClient.paymentByImpUid(imp_uid);
//		return iamportClient.paymentByImpUid(imp_uid);
//    }

	// 결제취소검증
	// 이미 결제취소 된 건인지
	// 지불한 금액과 취소하려는 금액 체크

	// 예약요청
	@PostMapping("/pay/order")
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