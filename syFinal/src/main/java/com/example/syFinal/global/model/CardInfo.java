package com.example.syFinal.global.model;

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
public class CardInfo {
	private String kakaopay_purchase_corp, kakaopay_purchase_corp_code;
    private String kakaopay_issuer_corp, kakaopay_issuer_corp_code;
    private String bin, card_type, install_month, approved_id, card_mid;
    private String interest_free_install, installment_type, card_item_code;
}
