package com.example.syFinal.global.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class KakaoPayApprovalDTO {
	private String aid; //요청 고유번호
	private String tid; //결제 고유번호
	private String cid; //가맹점 코드
	private String sid; //정기결제용
	private String partner_order_id; //가맹점 주문번호
	private String partner_user_id; //가맹점 회원id
	private String payment_method_type; //결제수단, card or money
	
	private String pg_token; //결제승인 요청을 인증하는 토큰
	
	private Amount amount; //결제 금액 정보
	private CardInfo card_info; //카드 정보
	
	private String item_name; //상품이름
	private String item_code; //상품코드
	private int quantity; //상품수량
	//tax_free_amount, vat_amount;
	private Date created_at; //결제 준비 요청 시각
	private Date approved_at; //결제승인 시각
	private String payload; //결제 승인 요청에 대해 저장한 값, 요청 시 전달된 내용
}
