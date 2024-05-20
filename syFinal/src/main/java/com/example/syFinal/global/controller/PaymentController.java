//PaymentController

package com.example.syFinal.global.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.syFinal.global.model.PortoneResponse;
import com.example.syFinal.guest.model.dao.GuestDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.siot.IamportRestClient.IamportClient;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class PaymentController {
	//private IamportClient iamportClient;

	
	
	//private static final String import_token_url = "https://api.iamport.kr/users/getToken";
	//private final String imp_key="3700142288466350";
	private String apiSecret="8I6gk3CbU6dmSKZ5WDQDclFzYOMq8gnBJbtCRkEm7uloX27PRxKGjqnSYSaKzWJefLssINqMzO7OO35o";
//	URL url = new URL("https://api.portone.io/payments/"+paymentId+"/cancel");
	
//	@Transactional
//	@RequestMapping("/gettoken")
//    public String getAccessToken () {
//        RestTemplate restTemplate = new RestTemplate();
//        String requestUrl = "https://api.portone.io/login/api-secret";
//
//        Map<String, String> iamportKey = new HashMap();
//        //iamportKey.put("imp_key", imp_key); //발급받은 REST API key 값을 넣어주세요
//        iamportKey.put("apiSecret",apiSecret); //발급받은 REST API secret 값을 넣어주세요.
//
//        ResponseEntity<Object> responseData = restTemplate.postForEntity(requestUrl, iamportKey, Object.class);
//        LinkedHashMap responseBody = (LinkedHashMap) responseData.getBody();
//        LinkedHashMap responseBodyProps = (LinkedHashMap) responseBody.get("response");
//        String accessToken = (String) responseBodyProps.get("access_token");
//        System.out.println("전달받은 토큰값"+accessToken);
//        return accessToken;
//    }
	
	@Transactional
	@RequestMapping("/gettoken")
	private String getAccessToken() {
        String url = "https://api.portone.io/login/api-secret";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        
        //headers.set("Authorization", "PortOne "+apiSecret);
        headers.set("Content-Type", "application/json;charset=UTF-8");
        headers.set("Accept", "application/json;charset=UTF-8");
		//headers.set("Authorization", "PortOne "+apiSecret);
        
        //MultiValueMap<String, String> body = new LinkedMultiValueMap<String, String>();
        JSONObject body = new JSONObject();
        //Map<String, String> body = new HashMap<>();
        body.put("Authorization", "PortOne "+apiSecret);

        HttpEntity<JSONObject> entity = new HttpEntity<>(body,headers);
        ResponseEntity<PortoneResponse> Response = restTemplate.postForEntity(url, entity,PortoneResponse.class);

        Map<String, Object> responseBody = (Map<String, Object>) Response.getBody();
        String accessToken = (String) responseBody.get("accessToken");
        System.out.println("전달받은 토큰값"+accessToken);
        return accessToken;
    
    }
	
	
	// 포트원 인증(토큰)을 받아주는 함수 
    public String getToken(String secretKey) throws IOException { 
    	URL url = new URL("https://api.portone.io/users/getToken");
        HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
 
        // 요청 방식을 POST로 설정
        conn.setRequestMethod("POST");
 
        // 요청의 Content-Type과 Accept 헤더 설정
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
 
        // 해당 연결을 출력 스트림(요청)으로 사용
        conn.setDoOutput(true);
 
        // JSON 객체에 해당 API가 필요로하는 데이터 추가.
        JsonObject json = new JsonObject();
        //json.addProperty("imp_key", apiKey);
        json.addProperty("imp_secret", secretKey);
 
        // 출력 스트림으로 해당 conn에 요청
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
        bw.write(json.toString()); // json 객체를 문자열 형태로 HTTP 요청 본문에 추가
        bw.flush(); // BufferedWriter 비우기
        bw.close(); // BufferedWriter 종료
 
        // 입력 스트림으로 conn 요청에 대한 응답 반환
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        Gson gson = new Gson(); // 응답 데이터를 자바 객체로 변환
        String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();
        String accessToken = gson.fromJson(response, Map.class).get("access_token").toString();
        br.close(); // BufferedReader 종료
 
        conn.disconnect(); // 연결 종료
 
        log.info("Iamport 엑세스 토큰 발급 성공 : {}", accessToken);
        return accessToken;
    } 

	
	
	//토큰받아오기
	//@RequestMapping("/confirmpay")
//	public ResponseEntity<PortoneResponse> confirmpay(@RequestParam("paymentId") String paymentId) {
//		
////		headers.set("Content-Type", "application/json;charset=UTF-8");
////		body.put("imp_key", imp_key);
////		body.put("imp_secret", imp_secret);
////		headers.set("Authorization", "PortOne "+secretKey);
//		//headers.set("Content-Type", "application/json;charset=UTF-8");
//		
//		try {
//			HttpEntity<PortoneResponse> entity = new HttpEntity<>(headers);
//			ResponseEntity<PortoneResponse> token = restTemplate.postForEntity("https://api.portone.io/v2/signin/api-key",entity,PortoneResponse.class);
//			System.out.println(token + "FULLtoken");
//			return token;
//		} catch(Exception e) {
//			e.printStackTrace();
//            System.out.println("gettoken에서 오류가 발생");
//		}
//		return null;
//	}
	
	//결제검증(결제 금액 비교)
//	@ResponseBody
//    @PostMapping("/pay/{imp_uid}")
//    public Map<String,String> paymentByImpUid(@PathVariable(value= "imp_uid") String imp_uid) throws IamportResponseException, IOException {
//		IamportResponse payment = iamportClient.paymentByImpUid(imp_uid);
//		Map<String,String> payment = iamportClient.paymentByImpUid(imp_uid); //paymentDAO 생성
//		return payment;
//    }
//	
	//결제취소검증
	//이미 결제취소 된 건인지
	//지불한 금액과 취소하려는 금액 체크

}