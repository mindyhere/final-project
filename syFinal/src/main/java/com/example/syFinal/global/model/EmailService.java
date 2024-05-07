
package com.example.syFinal.global.model;

public interface EmailService {
	String sendMail(EmailDTO dto);

	String getTempPassword();

	EmailDTO prepareTempPwdEmail(String email, String randomPw);

}
